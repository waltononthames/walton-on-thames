// Builds the locator map on /history/lost-breweries-of-walton-on-thames/.
//
//   npm run map:breweries -- --fetch   download fresh OpenStreetMap data, then build
//   npm run map:breweries              rebuild from the cached data
//
// The base (streets, buildings, the churchyard) is OpenStreetMap via the
// Overpass API, ODbL, so the map carries "© OpenStreetMap contributors".
//
// The two brewery positions are not from OpenStreetMap and not from memory.
// Each was read off a National Library of Scotland georeferenced Ordnance
// Survey sheet on 18 September 2026, at the point where the OS printed the
// brewery's name, and is recorded below with that sheet. St Mary's Church,
// drawn on the same sheets, sits within about 6 m (six-inch) and 9 m (25-inch)
// of its OpenStreetMap position, so alignment is good to roughly 10 m here.
//
// The larger uncertainty is which buildings made up each brewery: the sheets
// place a name on a yard or a block, not an outline. Each site is therefore a
// pin at the named spot plus a dashed ring showing the approximate extent.
// Do not shrink the rings to suggest survey-grade precision (Research and
// Editorial Standards §7.4, §10.5).
//
// Output: public/images/maps/lost-breweries-map.svg
//
// /images/* is cached for 7 days at the edge and in browsers (public/_headers),
// so a redrawn map keeps its old look until the URL changes. After rebuilding,
// bump the ?v= on both references in the article.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CACHE = join(ROOT, '.cache', 'brewery-map');
const CACHE_FILE = join(CACHE, 'osm.json');
const OUT = join(ROOT, 'public', 'images', 'maps', 'lost-breweries-map.svg');

// Town centre, from Bridge Street's west end to the Ashley site.
const FRAME = { south: 51.3839, north: 51.3887, west: -0.4234, east: -0.4150 };
const WIDTH = 1200;
const M_PER_DEG_LAT = 111_220;
const M_PER_DEG_LON = M_PER_DEG_LAT * Math.cos(((FRAME.north + FRAME.south) / 2) * Math.PI / 180);
const FRAME_W_M = (FRAME.east - FRAME.west) * M_PER_DEG_LON;
const FRAME_H_M = (FRAME.north - FRAME.south) * M_PER_DEG_LAT;
const HEIGHT = Math.round(WIDTH * FRAME_H_M / FRAME_W_M);
const PX_PER_M = WIDTH / FRAME_W_M;

const SITES = [
  {
    name: 'Ashley Brewery',
    note: 'named on the 1866–68 survey',
    // "Ashley Brewery" on Ordnance Survey Surrey Sheet XII, six-inch, surveyed
    // 1866-68, published 1871 (NLS 266664424), behind the east side of the
    // High Street.
    lat: 51.38546,
    lon: -0.41811,
    ringM: 40,
    colour: '#B5543C',
    labelSide: 'above',
  },
  {
    name: 'The Star Brewery, approximate location',
    note: 'labelled “Brewery” on the 1894 map',
    // "Brewery" on OS Middlesex Sheet XXV.13, 25-inch, revised 1894, published
    // 1896 (NLS 103658642): the yard behind the frontages on the north-east
    // side of Bridge Street, near Church Street. The 1912 revision, Surrey
    // XII.5 (NLS 103314202), still prints "Brewery" about 40 m to the west on
    // the same side of the street; the ring covers both. The sheets do not
    // name it: identifying it as the Star follows Tarplee (1998, p. 44), who
    // puts the Star on the east side of Bridge Street. The label states the
    // identification (Darren's editorial decision, 19 September 2026); the
    // page caption carries the inference, so keep the two together.
    lat: 51.38697,
    lon: -0.41992,
    ringM: 45,
    colour: '#3F5F8F',
    labelSide: 'above',
    labelDx: 70, // clears the Thames Street label
  },
];

const STREET_LABELS = ['Bridge Street', 'Church Street', 'High Street', 'Hepworth Way', 'Thames Street', 'New Zealand Avenue'];

const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const USER_AGENT = 'walton-on-thames.org-map-build/1.0';
const BBOX = `${FRAME.south - 0.001},${FRAME.west - 0.0015},${FRAME.north + 0.001},${FRAME.east + 0.0015}`;
const QUERY = `[out:json][timeout:180];(
  way["highway"](${BBOX});
  way["building"](${BBOX});
  way["landuse"~"^(grass|cemetery)$"](${BBOX});
  way["amenity"="grave_yard"](${BBOX});
  way["leisure"~"^(park|garden)$"](${BBOX});
  way["natural"="water"](${BBOX});
  nwr["amenity"="place_of_worship"]["name"="St Mary's Church"](${BBOX});
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

const x = (lon) => (lon - FRAME.west) * M_PER_DEG_LON * PX_PER_M;
const y = (lat) => (FRAME.north - lat) * M_PER_DEG_LAT * PX_PER_M;
const fmt = (n) => Number(n.toFixed(1));
const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function pathOf(geometry, close = false) {
  if (!geometry || geometry.length < 2) return '';
  return geometry.map((p, i) => `${i ? 'L' : 'M'}${fmt(x(p.lon))} ${fmt(y(p.lat))}`).join('') + (close ? 'Z' : '');
}

// A street label sits on the longest straight run of the longest way carrying
// that name, turned to read left to right.
function streetLabel(ways, name) {
  // Rough rendered half-width of the upper-case label at 22px with tracking,
  // so a label is never placed where it would run off the frame.
  const half = name.length * 8.5;
  let best = null;
  for (const w of ways.filter((w) => w.tags?.name === name)) {
    const g = w.geometry;
    for (let i = 1; i < g.length; i++) {
      const [x1, y1, x2, y2] = [x(g[i - 1].lon), y(g[i - 1].lat), x(g[i].lon), y(g[i].lat)];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const seg = Math.hypot(x2 - x1, y2 - y1) || 1;
      const dx = Math.abs(x2 - x1) / seg, dy = Math.abs(y2 - y1) / seg;
      if (mx - half * dx < 12 || mx + half * dx > WIDTH - 12 || my - half * dy < 12 || my + half * dy > HEIGHT - 12) continue;
      const len = Math.hypot(x2 - x1, y2 - y1);
      if (!best || len > best.len) {
        let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        if (angle > 90) angle -= 180;
        if (angle < -90) angle += 180;
        best = { len, x: mx, y: my, angle };
      }
    }
  }
  return best;
}

function generate() {
  const { elements } = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  const ways = elements.filter((e) => e.type === 'way' && e.geometry);
  const hw = (re) => ways.filter((w) => re.test(w.tags?.highway ?? ''));

  const buildings = ways.filter((w) => w.tags?.building).map((w) => pathOf(w.geometry, true)).join('');
  const green = ways.filter((w) => /^(grass|cemetery)$/.test(w.tags?.landuse ?? '') || w.tags?.amenity === 'grave_yard' || /^(park|garden)$/.test(w.tags?.leisure ?? ''))
    .map((w) => pathOf(w.geometry, true)).join('');
  const water = ways.filter((w) => w.tags?.natural === 'water').map((w) => pathOf(w.geometry, true)).join('');
  const major = hw(/^(primary|secondary|tertiary|unclassified)$/).map((w) => pathOf(w.geometry)).join('');
  const minor = hw(/^(residential|living_street|service|pedestrian)$/).map((w) => pathOf(w.geometry)).join('');
  const paths = hw(/^(footway|path|cycleway|steps)$/).map((w) => pathOf(w.geometry)).join('');

  const church = elements.find((e) => e.tags?.name === "St Mary's Church");
  // "out geom" gives a way its outline, not a centre, so average the outline.
  const churchAt = church?.geometry
    ? { lat: church.geometry.reduce((a, p) => a + p.lat, 0) / church.geometry.length, lon: church.geometry.reduce((a, p) => a + p.lon, 0) / church.geometry.length }
    : church?.lat ? { lat: church.lat, lon: church.lon } : null;
  if (!churchAt) throw new Error("St Mary's Church missing from the cached data: re-run with --fetch.");

  const halo = 'stroke="#F3F0E4" stroke-width="6" paint-order="stroke" stroke-linejoin="round"';
  const streets = STREET_LABELS.map((name) => ({ name, at: streetLabel(ways, name) })).filter((s) => s.at);
  const missing = STREET_LABELS.filter((n) => !streets.find((s) => s.name === n));
  if (missing.length) console.warn(`  No usable geometry for: ${missing.join(', ')} (label skipped)`);

  const sites = SITES.map((s) => {
    const cx = x(s.lon), cy = y(s.lat), r = s.ringM * PX_PER_M;
    // Labels sit beside the ring, or above it where the street names need the room.
    const above = s.labelSide === 'above';
    const tx = (above ? cx : s.labelSide === 'right' ? cx + r + 14 : cx - r - 14) + (s.labelDx ?? 0);
    const anchor = above ? 'middle' : s.labelSide === 'right' ? 'start' : 'end';
    const ty = above ? cy - r - 52 : cy - 8;
    // Teardrop pin, tip on the named spot.
    const pin = `M${fmt(cx)} ${fmt(cy)}c-4-9-17-19-17-31a17 17 0 1 1 34 0c0 12-13 22-17 31z`;
    return `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="${s.colour}" fill-opacity="0.12" stroke="${s.colour}" stroke-width="3" stroke-dasharray="10 7"/>
<path d="${pin}" fill="${s.colour}" stroke="#FFFFFF" stroke-width="2.5"/>
<circle cx="${fmt(cx)}" cy="${fmt(cy - 31)}" r="6.5" fill="#FFFFFF"/>
<text x="${fmt(tx)}" y="${fmt(ty)}" font-size="34" font-weight="700" fill="${s.colour}" text-anchor="${anchor}" ${halo}>${escapeXml(s.name)}</text>
<text x="${fmt(tx)}" y="${fmt(ty + 32)}" font-size="26" fill="#0B242E" text-anchor="${anchor}" ${halo}>${escapeXml(s.note)}</text>`;
  }).join('\n');

  const scaleM = 100, scalePx = scaleM * PX_PER_M;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT + 56}" width="${WIDTH}" height="${HEIGHT + 56}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif">
<title>Where Walton's lost breweries stood</title>
<defs><clipPath id="frame"><rect width="${WIDTH}" height="${HEIGHT}"/></clipPath></defs>
<g clip-path="url(#frame)">
<rect width="${WIDTH}" height="${HEIGHT}" fill="#F3F0E4"/>
<path d="${green}" fill="#DCE5CF"/>
<path d="${water}" fill="#B9D3DA"/>
<path d="${buildings}" fill="#E2DAC6" stroke="#D2C8B0" stroke-width="1"/>
<path d="${paths}" fill="none" stroke="#C9BFA6" stroke-width="2" stroke-dasharray="5 4"/>
<path d="${minor}" fill="none" stroke="#D8CFB8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#D8CFB8" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#FFFDF5" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
${streets.map((s) => `<text x="${fmt(s.at.x)}" y="${fmt(s.at.y)}" transform="rotate(${fmt(s.at.angle)} ${fmt(s.at.x)} ${fmt(s.at.y)})" font-size="22" font-weight="600" letter-spacing="1" fill="#506571" text-anchor="middle" dominant-baseline="central" ${halo}>${escapeXml(s.name.toUpperCase())}</text>`).join('\n')}
<path d="M${fmt(x(churchAt.lon) - 7)} ${fmt(y(churchAt.lat))}h14M${fmt(x(churchAt.lon))} ${fmt(y(churchAt.lat) - 9)}v18" stroke="#0B242E" stroke-width="3.5"/>
<text x="${fmt(x(churchAt.lon) + 14)}" y="${fmt(y(churchAt.lat) + 7)}" font-size="24" fill="#0B242E" ${halo}>St Mary's Church</text>
${sites}
<g transform="translate(${WIDTH - 60} 70)"><path d="M0 -34 L13 8 L0 0 L-13 8 Z" fill="#0B242E"/><text y="30" font-size="20" font-weight="700" fill="#0B242E" text-anchor="middle" ${halo}>N</text></g>
<g transform="translate(28 ${HEIGHT - 34})"><rect x="-10" y="-30" width="${fmt(scalePx + 20)}" height="52" rx="6" fill="#F3F0E4" fill-opacity="0.85"/><path d="M0 0h${fmt(scalePx)}" stroke="#0B242E" stroke-width="4"/><path d="M0 -7v14M${fmt(scalePx)} -7v14" stroke="#0B242E" stroke-width="3"/><text x="${fmt(scalePx / 2)}" y="-11" font-size="18" fill="#0B242E" text-anchor="middle">${scaleM} m</text></g>
</g>
<rect y="${HEIGHT}" width="${WIDTH}" height="56" fill="#FFFEF4"/>
<text x="16" y="${HEIGHT + 24}" font-size="16" fill="#506571">Pins: where the Ordnance Survey printed each brewery's name. Dashed rings: approximate extent, not boundaries.</text>
<text x="16" y="${HEIGHT + 46}" font-size="16" fill="#506571">Walton-on-Thames.org · Base map © OpenStreetMap contributors (ODbL) · Sites from OS maps via the National Library of Scotland</text>
</svg>
`;
  mkdirSync(join(ROOT, 'public', 'images', 'maps'), { recursive: true });
  writeFileSync(OUT, svg);
  console.log(`Wrote ${OUT} (${WIDTH}x${HEIGHT + 56}, ${Math.round(svg.length / 1024)}KB). Scale ${PX_PER_M.toFixed(2)} px/m.`);
  console.log(`  Streets labelled: ${streets.map((s) => s.name).join(', ')}`);
}

if (process.argv.includes('--fetch')) {
  mkdirSync(CACHE, { recursive: true });
  console.log('Fetching OpenStreetMap data');
  const text = await fetchOverpass();
  writeFileSync(CACHE_FILE, text);
} else if (!existsSync(CACHE_FILE)) {
  throw new Error(`No cached data at ${CACHE_FILE}: run with --fetch first.`);
}
generate();
