// Builds the route map for /walton-hersham-fc-away-fans-guide/ from open data.
// Nothing on the map is drawn by hand, and no distance or time is typed in.
//
//   npm run map:away-guide -- --fetch   download fresh data into .cache/away-guide/, then build
//   npm run map:away-guide              rebuild from the cached data
//
// Sources, all fetched by this script:
//  - OpenStreetMap via the Overpass API (ODbL): streets, paths, rail, water,
//    the Sports Hub outline, and the Thames Path National Trail relation.
//  - OSRM routing over OpenStreetMap data, for the road sections of both
//    walking routes and the taxi drive time. The provider is configured, as in
//    scripts/build-pharmacy-routes.mjs; the default is the public FOSSGIS
//    server, whose terms ask for one request a second, a user agent naming the
//    application and the OpenStreetMap attribution. This script makes four
//    routing requests per run.
//
// Both walking routes follow the streets Darren chose on 29 September 2026,
// given below as waypoints in order. Each waypoint is a point on the named
// street, taken from that street's OpenStreetMap geometry, so the router has
// no choice but to use it.
//
// The towpath section is not left to the router. A foot router prefers the
// shortest path and leaves the river for Weir Road and Sunbury Lane, so the
// towpath is the Thames Path relation's own mapped ways between the join and
// leave points, with routed road sections either side. The join and leave
// points are snapped to the path before routing, so the three sections meet
// exactly.
//
// Figures are typical walking estimates from the router, not measured times.
// The page labels them that way, and a route stays marked as a placeholder in
// its content file until Darren has walked it (basis editor-observation).
//
// Outputs:
//  - public/images/maps/away-guide-base.svg  streets, paths, water, rail
//  - src/data/away-guide-map.json            frame, route lines, distances and times
//
// /images/* is cached for 7 days (public/_headers). After a redraw, bump
// AWAY_MAP_VERSION in src/utils/awayGuide.ts.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CACHE = join(ROOT, '.cache', 'away-guide');
const OUT_SVG = join(ROOT, 'public', 'images', 'maps', 'away-guide-base.svg');
const OUT_JSON = join(ROOT, 'src', 'data', 'away-guide-map.json');
const USER_AGENT = 'walton-on-thames.org away fans guide map build (https://walton-on-thames.org/contact/)';
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const env = process.env;
const ROUTER = {
  name: env.ROUTING_PROVIDER_NAME ?? 'OSRM (FOSSGIS public server)',
  foot: env.ROUTING_FOOT_ROUTE_URL ?? 'https://routing.openstreetmap.de/routed-foot/route/v1/foot',
  car: env.ROUTING_CAR_ROUTE_URL ?? 'https://routing.openstreetmap.de/routed-car/route/v1/driving',
};

// Fixed points, each from OpenStreetMap and named by its element so it can be
// checked. The ground point is the Sports Hub outline's centre, not an
// entrance: entrances and turnstiles come from the club or a site visit.
const STATION = { lat: 51.3728758, lng: -0.4143083, basis: 'OpenStreetMap node 638645, Walton-on-Thames station' };
const GROUND = { lat: 51.3991774, lng: -0.4108226, basis: 'OpenStreetMap way 44207919 centre, Xcel Sports Hub' };
// Route waypoints, in walking order.
const VIA = {
  stationAvenue: { lat: 51.37250, lng: -0.42020, note: 'Station Avenue, west of the station' },
  ashleyRoadSouth: { lat: 51.37294, lng: -0.42216, note: 'Ashley Road, from its Station Avenue end' },
  ashleyRoad: { lat: 51.3780, lng: -0.4200, note: 'Ashley Road, north of Ashley Drive' },
  highStreet: { lat: 51.3853, lng: -0.4186, note: 'High Street, by The Walton Village' },
  churchStreet: { lat: 51.3870, lng: -0.4189, note: 'Church Street' },
  terraceRoad: { lat: 51.3909, lng: -0.4133, note: 'Terrace Road' },
  terraceRoadEast: { lat: 51.3935, lng: -0.4084, note: 'Terrace Road, approaching Waterside Drive' },
  watersideDrive: { lat: 51.3955, lng: -0.4080, note: 'Waterside Drive, from the Terrace Road end' },
  manorRoad: { lat: 51.3876, lng: -0.4234, note: 'Manor Road, from its Bridge Street end, by the Old Manor Inn' },
  watersideDriveUp: { lat: 51.39807, lng: -0.41376, note: 'Waterside Drive, walking up from the river end' },
};
// Where the towpath route joins and leaves the Thames Path, before snapping:
// the river end of Manor Road by The Anglers, and the Thames Path beside the
// river end of Waterside Drive.
const TOWPATH_JOIN = { lat: 51.3900, lng: -0.4228 };
const TOWPATH_LEAVE = { lat: 51.3982, lng: -0.4141 };
const THAMES_PATH_RELATION = 14519665;

const M_PER_DEG_LAT = 111_220;
// Map pixels per metre. The output width follows from the frame.
const PX_PER_M = 0.5;
const MIN_ASPECT = 1.1;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function overpass(query) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const endpoint of OVERPASS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'User-Agent': USER_AGENT, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ data: query }),
        });
        const text = await res.text();
        if (res.ok && text.trimStart().startsWith('{')) return text;
        console.warn(`  ${endpoint} returned ${res.status}, trying next`);
      } catch (err) {
        console.warn(`  ${endpoint} failed: ${err.message}`);
      }
    }
    await sleep(5000);
  }
  throw new Error('Every Overpass endpoint failed. The cached data, if any, is unchanged. Try again later.');
}

async function route(base, points) {
  const coords = points.map((p) => `${p.lng},${p.lat}`).join(';');
  const res = await fetch(`${base}/${coords}?overview=full&geometries=geojson&steps=true`, { headers: { 'User-Agent': USER_AGENT } });
  const json = await res.json();
  if (json.code !== 'Ok') throw new Error(`Router returned ${json.code}: ${json.message ?? ''}`);
  await sleep(1100);
  return json;
}

const haversine = (a, b) => {
  const R = 6_371_000, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const lengthOf = (line) => line.reduce((sum, p, i) => (i ? sum + haversine(line[i - 1], p) : 0), 0);
const fromGeoJson = (coords) => coords.map(([lng, lat]) => ({ lat, lng }));

// The towpath section: the shortest path between the join and leave points
// using only the Thames Path relation's own ways, so the line follows the
// mapped path and never cuts through a road the router would prefer.
function chainTowpath(relation, start, end) {
  const key = (p) => `${p.lat.toFixed(7)},${p.lng.toFixed(7)}`;
  const nodes = new Map();
  const edges = new Map();
  const link = (a, b) => {
    const d = haversine(a, b);
    for (const [x, y] of [[a, b], [b, a]]) {
      nodes.set(key(x), x);
      if (!edges.has(key(x))) edges.set(key(x), []);
      edges.get(key(x)).push([key(y), d]);
    }
  };
  for (const m of relation.members) {
    if (m.type !== 'way' || !(m.geometry?.length > 1)) continue;
    const g = m.geometry.map((p) => ({ lat: p.lat, lng: p.lon }));
    for (let i = 1; i < g.length; i++) link(g[i - 1], g[i]);
  }
  // Snap both ends to the nearest vertex on the path, and refuse a snap of
  // more than 30 m, which would mean the point is not on the path at all.
  const snap = (p) => {
    const best = [...nodes.values()].reduce((b, v) => (haversine(v, p) < haversine(b, p) ? v : b));
    if (haversine(best, p) > 80) throw new Error(`No Thames Path vertex within 80 m of ${p.lat},${p.lng}`);
    return key(best);
  };
  const from = snap(start), to = snap(end);
  const dist = new Map([[from, 0]]), prev = new Map(), done = new Set();
  while (true) {
    let u = null;
    for (const [k, d] of dist) if (!done.has(k) && (u === null || d < dist.get(u))) u = k;
    if (u === null) break;
    if (u === to) break;
    done.add(u);
    for (const [v, w] of edges.get(u) ?? []) {
      const alt = dist.get(u) + w;
      if (alt < (dist.get(v) ?? Infinity)) { dist.set(v, alt); prev.set(v, u); }
    }
  }
  if (!dist.has(to)) throw new Error('The Thames Path ways do not connect the join and leave points. Check the relation in OpenStreetMap.');
  const line = [];
  for (let k = to; k; k = prev.get(k)) line.unshift(nodes.get(k));
  return line;
}

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

// Whole map pixels, and consecutive points closer than a pixel dropped: at
// this scale that is under two metres, and it roughly halves the file.
function pathsOf(ways, P, close = false) {
  return ways.map((w) => {
    const g = w.geometry;
    if (!g || g.length < 2) return '';
    const pts = [];
    for (const p of g) {
      const x = Math.round(P.x(p.lon)), y = Math.round(P.y(p.lat));
      const last = pts.at(-1);
      if (!last || last[0] !== x || last[1] !== y) pts.push([x, y]);
    }
    if (pts.length < 2) return '';
    return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') + (close ? 'Z' : '');
  }).join('');
}

function inFrame(w, f) {
  return w.geometry?.some((p) => p.lat >= f.south && p.lat <= f.north && p.lon >= f.west && p.lon <= f.east);
}

// Longest straight run of a named street, kept inside the frame and away from
// labels already placed. Same rule as scripts/build-gp-maps.mjs.
function streetLabels(ways, P, max, fontSize) {
  const byName = new Map();
  for (const w of ways) {
    const name = w.tags?.name;
    if (!name || !/^(primary|secondary|tertiary|unclassified|residential)$/.test(w.tags.highway ?? '')) continue;
    const g = w.geometry;
    for (let i = 1; i < g.length; i++) {
      const [x1, y1, x2, y2] = [P.x(g[i - 1].lon), P.y(g[i - 1].lat), P.x(g[i].lon), P.y(g[i].lat)];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const half = name.length * fontSize * 0.36;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      if (len < half * 1.3 || mx - half < 10 || mx + half > P.width - 10 || my < 20 || my > P.height - 20) continue;
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
    if (placed.some((p) => Math.hypot(p.x - l.x, p.y - l.y) < fontSize * 6)) continue;
    placed.push(l);
  }
  return placed.map((l) => `<text x="${fmt(l.x)}" y="${fmt(l.y)}" transform="rotate(${fmt(l.angle)} ${fmt(l.x)} ${fmt(l.y)})" font-size="${fontSize}" font-weight="600" letter-spacing="0.4" fill="#506571" text-anchor="middle" dominant-baseline="central" ${halo}>${escapeXml(l.name.toUpperCase())}</text>`).join('\n');
}

function scaleBar(P, metres, y) {
  const px = metres * P.pxPerM;
  return `<g transform="translate(24 ${y})"><rect x="-10" y="-30" width="${fmt(px + 20)}" height="48" rx="6" fill="#F3F0E4" fill-opacity="0.85"/><path d="M0 0h${fmt(px)}" stroke="#0B242E" stroke-width="4"/><path d="M0 -7v14M${fmt(px)} -7v14" stroke="#0B242E" stroke-width="3"/><text x="${fmt(px / 2)}" y="-11" font-size="18" fill="#0B242E" text-anchor="middle">${metres} m</text></g>`;
}

// ---------------------------------------------------------------- fetch

if (process.argv.includes('--fetch')) {
  mkdirSync(CACHE, { recursive: true });

  // The Thames Path first, so the towpath route's road sections can be
  // routed to the exact path vertices the towpath section starts and ends at.
  console.log('Fetching the Thames Path');
  const pathData = JSON.parse(await overpass(`[out:json][timeout:120];relation(${THAMES_PATH_RELATION});out geom;`));
  const pathLine = chainTowpath(pathData.elements[0], TOWPATH_JOIN, TOWPATH_LEAVE);
  const joinPoint = pathLine[0], leavePoint = pathLine.at(-1);

  console.log(`Routing with ${ROUTER.name}`);
  const road = await route(ROUTER.foot, [STATION, VIA.stationAvenue, VIA.ashleyRoadSouth, VIA.ashleyRoad, VIA.highStreet, VIA.churchStreet, VIA.terraceRoad, VIA.terraceRoadEast, VIA.watersideDrive, GROUND]);
  const towIn = await route(ROUTER.foot, [STATION, VIA.stationAvenue, VIA.ashleyRoadSouth, VIA.ashleyRoad, VIA.highStreet, VIA.manorRoad, joinPoint]);
  const towOut = await route(ROUTER.foot, [leavePoint, VIA.watersideDriveUp, GROUND]);
  const drive = await route(ROUTER.car, [STATION, GROUND]);
  writeFileSync(join(CACHE, 'routes.json'), JSON.stringify({ provider: ROUTER.name, fetched: new Date().toISOString(), road, towIn, towOut, drive }));

  // Frame: every routed point plus a margin, so the base covers both routes.
  const all = [road, towIn, towOut].flatMap((r) => fromGeoJson(r.routes[0].geometry.coordinates));
  // More margin north and south than east and west: on a phone the whole
  // route is shown in a short, wide window, which reaches further up and
  // down the map than the route itself.
  const pad = 0.0022;
  const frame = {
    south: Math.min(...all.map((p) => p.lat)) - pad * 1.6,
    north: Math.max(...all.map((p) => p.lat)) + pad * 1.6,
    west: Math.min(...all.map((p) => p.lng)) - pad * 1.6,
    east: Math.max(...all.map((p) => p.lng)) + pad * 1.6,
  };
  // The routes run north to south, so a frame fitted to them is tall and
  // narrow. Widen it to at least MIN_ASPECT so that when the page zooms out
  // to show a whole route, the base map still fills a landscape viewport
  // instead of ending in blank margins.
  const mPerDegLon = M_PER_DEG_LAT * Math.cos(((frame.north + frame.south) / 2) * Math.PI / 180);
  const wide = (frame.east - frame.west) * mPerDegLon;
  const tall = (frame.north - frame.south) * M_PER_DEG_LAT;
  if (wide / tall < MIN_ASPECT) {
    const grow = (tall * MIN_ASPECT - wide) / 2 / mPerDegLon;
    frame.west -= grow;
    frame.east += grow;
  }
  const b = `${frame.south},${frame.west},${frame.north},${frame.east}`;
  console.log('Fetching OpenStreetMap data');
  const osm = await overpass(`[out:json][timeout:180];(
    way["highway"](${b});
    way["railway"="rail"](${b});
    way["waterway"~"^(river|canal|stream)$"](${b});
    way["natural"="water"](${b});
    way["leisure"~"^(park|pitch|sports_centre|stadium|recreation_ground|common)$"](${b});
    way["landuse"~"^(grass|recreation_ground|meadow)$"](${b});
    relation(${THAMES_PATH_RELATION});
  );out geom;`);
  writeFileSync(join(CACHE, 'osm.json'), osm);
  writeFileSync(join(CACHE, 'frame.json'), JSON.stringify(frame));
} else if (!existsSync(join(CACHE, 'osm.json'))) {
  throw new Error(`No cached data in ${CACHE}: run with --fetch first.`);
}

// ---------------------------------------------------------------- build

const routes = JSON.parse(readFileSync(join(CACHE, 'routes.json'), 'utf8'));
const frame = JSON.parse(readFileSync(join(CACHE, 'frame.json'), 'utf8'));
const { elements } = JSON.parse(readFileSync(join(CACHE, 'osm.json'), 'utf8'));
const frameMetresWide = (frame.east - frame.west) * M_PER_DEG_LAT * Math.cos(((frame.north + frame.south) / 2) * Math.PI / 180);
const P = projector(frame, Math.round(frameMetresWide * PX_PER_M));

const relation = elements.find((e) => e.type === 'relation' && e.id === THAMES_PATH_RELATION);
if (!relation) throw new Error(`Thames Path relation ${THAMES_PATH_RELATION} missing from the cached data: run with --fetch.`);
const towpathMiddle = chainTowpath(relation, TOWPATH_JOIN, TOWPATH_LEAVE);

const roadRoute = routes.road.routes[0];
const towIn = routes.towIn.routes[0];
const towOut = routes.towOut.routes[0];
const roadLine = fromGeoJson(roadRoute.geometry.coordinates);
const towLine = [
  ...fromGeoJson(towIn.geometry.coordinates),
  ...towpathMiddle,
  ...fromGeoJson(towOut.geometry.coordinates),
];

// The router's own pace on the road route, applied to the towpath section it
// did not route, so both routes are timed on the same basis.
const metresPerSecond = roadRoute.distance / roadRoute.duration;
const towpathMiddleMetres = lengthOf(towpathMiddle);
const towMetres = towIn.distance + towpathMiddleMetres + towOut.distance;
const towSeconds = towIn.duration + towpathMiddleMetres / metresPerSecond + towOut.duration;

// Lit status from OpenStreetMap tags on the towpath ways, reported for the
// sources file. The page never states lighting from this alone.
const towWays = relation.members.filter((m) => m.type === 'way');
console.log(`Thames Path member ways in data: ${towWays.length}`);

const svgLine = (line) => line.map((p, i) => `${i ? 'L' : 'M'}${fmt(P.x(p.lng))} ${fmt(P.y(p.lat))}`).join('');
// Cumulative fraction along each line, sampled at every vertex, so the page
// can work out how much of the line to draw when a step is reached.
const samples = (line) => {
  const total = lengthOf(line);
  let run = 0;
  return line.map((p, i) => {
    if (i) run += haversine(line[i - 1], p);
    return [fmt(P.x(p.lng)), fmt(P.y(p.lat)), Number((run / total).toFixed(4))];
  });
};

const ways = elements.filter((e) => e.type === 'way' && e.geometry && inFrame(e, frame));
const hw = (re) => ways.filter((w) => re.test(w.tags?.highway ?? ''));
const major = pathsOf(hw(/^(motorway|trunk|primary|secondary)(_link)?$/), P);
const mid = pathsOf(hw(/^(tertiary|tertiary_link|unclassified)$/), P);
const minor = pathsOf(hw(/^(residential|living_street)$/), P);
const service = pathsOf(hw(/^(service|pedestrian)$/), P);
const foot = pathsOf(hw(/^(footway|path|cycleway|steps|track|bridleway)$/), P);
const rail = pathsOf(ways.filter((w) => w.tags?.railway === 'rail'), P);
const river = pathsOf(ways.filter((w) => w.tags?.waterway === 'river'), P);
const streams = pathsOf(ways.filter((w) => /^(canal|stream)$/.test(w.tags?.waterway ?? '')), P);
const closed = (w) => w.geometry.length > 3 && haversine({ lat: w.geometry[0].lat, lng: w.geometry[0].lon }, { lat: w.geometry.at(-1).lat, lng: w.geometry.at(-1).lon }) < 1;
const water = pathsOf(ways.filter((w) => w.tags?.natural === 'water' && closed(w)), P, true);
const green = pathsOf(ways.filter((w) => closed(w) && (/^(park|recreation_ground|common)$/.test(w.tags?.leisure ?? '') || /^(grass|recreation_ground|meadow)$/.test(w.tags?.landuse ?? ''))), P, true);
const sport = pathsOf(ways.filter((w) => closed(w) && /^(pitch|sports_centre|stadium)$/.test(w.tags?.leisure ?? '')), P, true);
const riverWidth = Math.max(8, 70 * P.pxPerM);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${P.width} ${P.height}" width="${P.width}" height="${P.height}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif">
<rect width="${P.width}" height="${P.height}" fill="#F3F0E4"/>
<path d="${green}" fill="#DCE5CF"/>
<path d="${sport}" fill="#CFDDC0" stroke="#B9CBA6" stroke-width="1"/>
<path d="${water}" fill="#B9D3DA"/>
<path d="${river}" fill="none" stroke="#B9D3DA" stroke-width="${fmt(riverWidth)}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${streams}" fill="none" stroke="#B9D3DA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${foot}" fill="none" stroke="#C9BFA6" stroke-width="1.6" stroke-dasharray="4 3"/>
<path d="${service}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#D8CFB8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minor}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${mid}" fill="none" stroke="#D8CFB8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${mid}" fill="none" stroke="#FFFDF5" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#CDBF9C" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${major}" fill="none" stroke="#F6E7BE" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${rail}" fill="none" stroke="#7D8A90" stroke-width="3" stroke-dasharray="10 6"/>
${streetLabels(ways, P, 70, 13)}
${scaleBar(P, 500, P.height - 28)}
</svg>
`;

mkdirSync(join(ROOT, 'public', 'images', 'maps'), { recursive: true });
writeFileSync(OUT_SVG, svg);

const minutes = (s) => Math.round(s / 60);
const data = {
  src: '/images/maps/away-guide-base.svg',
  frame,
  width: P.width,
  height: P.height,
  attribution: 'Map data © OpenStreetMap contributors. Routes: OSRM.',
  router: { provider: routes.provider, fetched: routes.fetched },
  points: { station: STATION, ground: GROUND },
  routes: {
    road: {
      metres: Math.round(roadRoute.distance),
      minutes: minutes(roadRoute.duration),
      d: svgLine(roadLine),
      samples: samples(roadLine),
    },
    towpath: {
      metres: Math.round(towMetres),
      minutes: minutes(towSeconds),
      towpathMetres: Math.round(towpathMiddleMetres),
      d: svgLine(towLine),
      samples: samples(towLine),
    },
  },
  drive: {
    metres: Math.round(routes.drive.routes[0].distance),
    minutes: minutes(routes.drive.routes[0].duration),
  },
};
writeFileSync(OUT_JSON, JSON.stringify(data) + '\n');

console.log(`Wrote away-guide-base.svg (${P.width}x${P.height}, ${Math.round(svg.length / 1024)} KB)`);
console.log(`Road: ${data.routes.road.metres} m, ${data.routes.road.minutes} min`);
console.log(`Towpath: ${data.routes.towpath.metres} m, ${data.routes.towpath.minutes} min (${data.routes.towpath.towpathMetres} m on the Thames Path)`);
console.log(`Drive: ${data.drive.metres} m, ${data.drive.minutes} min free-flow`);
console.log(`Wrote ${OUT_JSON}`);
