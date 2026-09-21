// Builds the base maps for the GP directory and practice profiles.
//
//   npm run map:gp -- --fetch   download fresh OpenStreetMap data, then build
//   npm run map:gp              rebuild from the cached data
//
// Outputs:
//   public/images/maps/gp-area-base.svg          roads, rail, river and place
//                                                names for Walton, Hersham and
//                                                the surrounding pharmacies
//   public/images/maps/gp-local-<key>.svg        streets and buildings around
//                                                each surgery building
//   src/data/gp-maps.json                        the frame and projection of
//                                                every base, so the pages can
//                                                place markers on top of them
//
// The bases carry no markers. Practice and pharmacy markers are drawn by
// src/components/gp/*.astro from the listing coordinates at build time, so a
// corrected coordinate moves its marker without a map rebuild, and marker
// numbers always come from the same ranking as the list beside them.
//
// Base map data is OpenStreetMap via the Overpass API (ODbL), credited on the
// page. Re-run with --fetch when a new practice or pharmacy falls outside the
// current frame; the script fails loudly if one does.
//
// /images/* is cached for 7 days (public/_headers). After a redraw, bump
// MAP_VERSION in src/components/gp/mapProjection.ts.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadHealthcare, ROOT } from './lib/healthcare-records.mjs';

const CACHE = join(ROOT, '.cache', 'gp-maps');
const OUT_DIR = join(ROOT, 'public', 'images', 'maps');
const META = join(ROOT, 'src', 'data', 'gp-maps.json');
const USER_AGENT = 'walton-on-thames.org-map-build/1.0';
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

const M_PER_DEG_LAT = 111_220;
const { practices, pharmacies } = loadHealthcare();

// Area frame: every practice and pharmacy, plus a margin.
const everything = [...practices, ...pharmacies];
const pad = 0.004;
const AREA = {
  south: Math.min(...everything.map((p) => p.lat)) - pad,
  north: Math.max(...everything.map((p) => p.lat)) + pad,
  west: Math.min(...everything.map((p) => p.lng)) - pad * 1.6,
  east: Math.max(...everything.map((p) => p.lng)) + pad * 1.6,
};

// Local frames: one per surgery building cluster. Practices within 150 m of
// each other share a base (Walton Health Centre and Walton Community Hospital
// are about 100 m apart on Rodney Road).
const LOCAL_HALF_M = 260;
const clusters = [];
for (const p of practices) {
  const near = clusters.find((c) => Math.hypot((c.lat - p.lat) * M_PER_DEG_LAT, (c.lng - p.lng) * M_PER_DEG_LAT * Math.cos(p.lat * Math.PI / 180)) < 150);
  if (near) { near.slugs.push(p.slug); near.lat = (near.lat + p.lat) / 2; near.lng = (near.lng + p.lng) / 2; }
  else clusters.push({ lat: p.lat, lng: p.lng, slugs: [p.slug] });
}
const localKey = (c) => c.slugs.includes('fort-house-surgery') || c.slugs.includes('red-practice-walton') ? 'rodney-road' : c.slugs[0];
const LOCALS = clusters.map((c) => {
  const dLat = LOCAL_HALF_M / M_PER_DEG_LAT;
  const dLng = LOCAL_HALF_M / (M_PER_DEG_LAT * Math.cos(c.lat * Math.PI / 180));
  return { key: localKey(c), slugs: c.slugs, frame: { south: c.lat - dLat, north: c.lat + dLat, west: c.lng - dLng * 1.35, east: c.lng + dLng * 1.35 } };
});

const bbox = (f, m = 0.002) => `${f.south - m},${f.west - m},${f.north + m},${f.east + m}`;
const QUERY = `[out:json][timeout:240];(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"](${bbox(AREA)});
  way["railway"="rail"](${bbox(AREA)});
  way["waterway"="river"](${bbox(AREA)});
  way["natural"="water"](${bbox(AREA)});
  node["place"~"^(town|village|suburb)$"](${bbox(AREA)});
  ${LOCALS.map((l) => `way["highway"](${bbox(l.frame, 0.001)});way["building"](${bbox(l.frame, 0.001)});way["amenity"="parking"](${bbox(l.frame, 0.001)});way["leisure"~"^(park|garden|common)$"](${bbox(l.frame, 0.001)});way["landuse"="grass"](${bbox(l.frame, 0.001)});`).join('\n  ')}
);out geom;`;

async function fetchOverpass() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const endpoint of OVERPASS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'User-Agent': USER_AGENT, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ data: QUERY }),
        });
        const text = await res.text();
        if (res.ok && text.trimStart().startsWith('{')) return text;
        console.warn(`  ${endpoint} returned ${res.status}, trying next`);
      } catch (err) {
        console.warn(`  ${endpoint} failed: ${err.message}`);
      }
    }
  }
  throw new Error('Every Overpass endpoint failed. The cached data, if any, is unchanged. Try again later.');
}

// Equirectangular projection at the frame's mid-latitude. Identical to
// src/components/gp/mapProjection.ts, which must stay in step with it.
function projector(frame, width) {
  const mPerDegLon = M_PER_DEG_LAT * Math.cos(((frame.north + frame.south) / 2) * Math.PI / 180);
  const pxPerM = width / ((frame.east - frame.west) * mPerDegLon);
  const height = Math.round((frame.north - frame.south) * M_PER_DEG_LAT * pxPerM);
  return {
    width, height, pxPerM,
    x: (lon) => (lon - frame.west) * mPerDegLon * pxPerM,
    y: (lat) => (frame.north - lat) * M_PER_DEG_LAT * pxPerM,
  };
}

const fmt = (n) => Number(n.toFixed(1));
const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const halo = 'stroke="#F3F0E4" stroke-width="6" paint-order="stroke" stroke-linejoin="round"';

function pathsOf(ways, P, close = false) {
  return ways.map((w) => {
    const g = w.geometry;
    if (!g || g.length < 2) return '';
    return g.map((p, i) => `${i ? 'L' : 'M'}${fmt(P.x(p.lon))} ${fmt(P.y(p.lat))}`).join('') + (close ? 'Z' : '');
  }).join('');
}

function inFrame(w, f) {
  return w.geometry?.some((p) => p.lat >= f.south && p.lat <= f.north && p.lon >= f.west && p.lon <= f.east);
}

// Longest straight run of a named street, kept inside the frame and away
// from labels already placed.
function streetLabels(ways, P, max, fontSize) {
  const byName = new Map();
  for (const w of ways) {
    const name = w.tags?.name;
    if (!name || !/^(primary|secondary|tertiary|unclassified|residential|living_street)$/.test(w.tags.highway ?? '')) continue;
    const g = w.geometry;
    for (let i = 1; i < g.length; i++) {
      const [x1, y1, x2, y2] = [P.x(g[i - 1].lon), P.y(g[i - 1].lat), P.x(g[i].lon), P.y(g[i].lat)];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const half = name.length * fontSize * 0.36;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      if (len < half * 1.4 || mx - half < 10 || mx + half > P.width - 10 || my < 20 || my > P.height - 20) continue;
      const best = byName.get(name);
      if (!best || len > best.len) {
        let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        if (angle > 90) angle -= 180;
        if (angle < -90) angle += 180;
        byName.set(name, { name, len, x: mx, y: my, angle });
      }
    }
  }
  const placed = [];
  for (const l of [...byName.values()].sort((a, b) => b.len - a.len)) {
    if (placed.length >= max) break;
    if (placed.some((p) => Math.hypot(p.x - l.x, p.y - l.y) < fontSize * 7)) continue;
    placed.push(l);
  }
  return placed.map((l) => `<text x="${fmt(l.x)}" y="${fmt(l.y)}" transform="rotate(${fmt(l.angle)} ${fmt(l.x)} ${fmt(l.y)})" font-size="${fontSize}" font-weight="600" letter-spacing="0.5" fill="#506571" text-anchor="middle" dominant-baseline="central" ${halo}>${escapeXml(l.name.toUpperCase())}</text>`).join('\n');
}

function scaleBar(P, metres, y) {
  const px = metres * P.pxPerM;
  const label = metres >= 1000 ? `${metres / 1000} km` : `${metres} m`;
  return `<g transform="translate(24 ${y})"><rect x="-10" y="-30" width="${fmt(px + 20)}" height="48" rx="6" fill="#F3F0E4" fill-opacity="0.85"/><path d="M0 0h${fmt(px)}" stroke="#0B242E" stroke-width="4"/><path d="M0 -7v14M${fmt(px)} -7v14" stroke="#0B242E" stroke-width="3"/><text x="${fmt(px / 2)}" y="-11" font-size="18" fill="#0B242E" text-anchor="middle">${label}</text></g>`;
}

function north(P) {
  return `<g transform="translate(${P.width - 44} 60)"><path d="M0 -30 L11 7 L0 0 L-11 7 Z" fill="#0B242E"/><text y="28" font-size="18" font-weight="700" fill="#0B242E" text-anchor="middle" ${halo}>N</text></g>`;
}

function areaSvg(elements) {
  const P = projector(AREA, 1600);
  const ways = elements.filter((e) => e.type === 'way' && e.geometry && inFrame(e, AREA));
  const hw = (re) => ways.filter((w) => re.test(w.tags?.highway ?? ''));
  const major = pathsOf(hw(/^(motorway|trunk|primary|secondary)(_link)?$/), P);
  const mid = pathsOf(hw(/^(tertiary|tertiary_link|unclassified)$/), P);
  const minor = pathsOf(hw(/^(residential|living_street)$/), P);
  const rail = pathsOf(ways.filter((w) => w.tags?.railway === 'rail'), P);
  const river = pathsOf(ways.filter((w) => w.tags?.waterway === 'river'), P);
  const lakes = pathsOf(ways.filter((w) => w.tags?.natural === 'water' && w.geometry.length > 3 && w.geometry[0].lat === w.geometry.at(-1).lat), P, true);
  const riverWidth = Math.max(6, 60 * P.pxPerM);
  const places = elements.filter((e) => e.type === 'node' && e.tags?.place && e.tags?.name && e.lat >= AREA.south && e.lat <= AREA.north && e.lon >= AREA.west && e.lon <= AREA.east);
  const placeLabels = places.map((n) => {
    const big = n.tags.place === 'town';
    return `<text x="${fmt(P.x(n.lon))}" y="${fmt(P.y(n.lat))}" font-size="${big ? 34 : 26}" font-weight="${big ? 700 : 600}" fill="#0B242E" fill-opacity="0.55" text-anchor="middle" ${halo}>${escapeXml(n.tags.name)}</text>`;
  }).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${P.width} ${P.height}" width="${P.width}" height="${P.height}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif">
<rect width="${P.width}" height="${P.height}" fill="#F3F0E4"/>
<path d="${lakes}" fill="#B9D3DA"/>
<path d="${river}" fill="none" stroke="#B9D3DA" stroke-width="${fmt(riverWidth)}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${mid}" fill="none" stroke="#D8CFB8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${mid}" fill="none" stroke="#FFFDF5" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#CDBF9C" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#F6E7BE" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${rail}" fill="none" stroke="#7D8A90" stroke-width="3" stroke-dasharray="10 6"/>
${placeLabels}
${north(P)}
${scaleBar(P, 1000, P.height - 28)}
</svg>
`;
  return { svg, P };
}

function localSvg(elements, local) {
  const P = projector(local.frame, 1200);
  const f = local.frame;
  const ways = elements.filter((e) => e.type === 'way' && e.geometry && inFrame(e, f));
  const hw = (re) => ways.filter((w) => re.test(w.tags?.highway ?? ''));
  const buildings = pathsOf(ways.filter((w) => w.tags?.building), P, true);
  const parking = pathsOf(ways.filter((w) => w.tags?.amenity === 'parking'), P, true);
  const green = pathsOf(ways.filter((w) => /^(park|garden|common)$/.test(w.tags?.leisure ?? '') || w.tags?.landuse === 'grass'), P, true);
  const major = pathsOf(hw(/^(primary|secondary|tertiary|unclassified)$/), P);
  const minor = pathsOf(hw(/^(residential|living_street)$/), P);
  const service = pathsOf(hw(/^(service)$/), P);
  const paths = pathsOf(hw(/^(footway|path|cycleway|steps|pedestrian)$/), P);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${P.width} ${P.height}" width="${P.width}" height="${P.height}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif">
<defs><clipPath id="frame"><rect width="${P.width}" height="${P.height}"/></clipPath></defs>
<g clip-path="url(#frame)">
<rect width="${P.width}" height="${P.height}" fill="#F3F0E4"/>
<path d="${green}" fill="#DCE5CF"/>
<path d="${parking}" fill="#E9E4D6" stroke="#D2C8B0" stroke-width="1"/>
<path d="${buildings}" fill="#E2DAC6" stroke="#D2C8B0" stroke-width="1"/>
<path d="${paths}" fill="none" stroke="#C9BFA6" stroke-width="2" stroke-dasharray="5 4"/>
<path d="${service}" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#D8CFB8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#CDBF9C" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#F6E7BE" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
${streetLabels(ways, P, 7, 18)}
${north(P)}
${scaleBar(P, 100, P.height - 28)}
</g>
</svg>
`;
  return { svg, P };
}

if (process.argv.includes('--fetch')) {
  mkdirSync(CACHE, { recursive: true });
  console.log('Fetching OpenStreetMap data');
  writeFileSync(join(CACHE, 'osm.json'), await fetchOverpass());
} else if (!existsSync(join(CACHE, 'osm.json'))) {
  throw new Error(`No cached data in ${CACHE}: run with --fetch first.`);
}

const { elements } = JSON.parse(readFileSync(join(CACHE, 'osm.json'), 'utf8'));
mkdirSync(OUT_DIR, { recursive: true });

const area = areaSvg(elements);
writeFileSync(join(OUT_DIR, 'gp-area-base.svg'), area.svg);
console.log(`Wrote gp-area-base.svg (${area.P.width}x${area.P.height}, ${Math.round(area.svg.length / 1024)} KB)`);

const meta = {
  area: { src: '/images/maps/gp-area-base.svg', frame: AREA, width: area.P.width, height: area.P.height },
  local: {},
  practiceLocal: {},
};
for (const l of LOCALS) {
  const { svg, P } = localSvg(elements, l);
  const file = `gp-local-${l.key}.svg`;
  writeFileSync(join(OUT_DIR, file), svg);
  meta.local[l.key] = { src: `/images/maps/${file}`, frame: l.frame, width: P.width, height: P.height };
  for (const s of l.slugs) meta.practiceLocal[s] = l.key;
  console.log(`Wrote ${file} (${P.width}x${P.height}, ${Math.round(svg.length / 1024)} KB) for ${l.slugs.join(', ')}`);
}
writeFileSync(META, JSON.stringify(meta, null, 2) + '\n');
console.log(`Wrote ${META}`);
