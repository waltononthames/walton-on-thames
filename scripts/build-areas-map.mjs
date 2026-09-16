// Builds the map on /living/areas/ from open data. Nothing on the map is drawn
// by hand, and nothing is placed from memory.
//
//   npm run map:areas -- --fetch   download fresh data into .cache/areas-map/, then build
//   npm run map:areas              rebuild the map from the cached data
//
// Sources, all fetched by this script:
//  - OpenStreetMap via the Overpass API: streets, railway, stations, river,
//    reservoirs, parks and the named landmarks. ODbL, so the rendered map
//    carries "© OpenStreetMap contributors".
//  - planning.data.gov.uk conservation-area dataset: boundaries as supplied by
//    Elmbridge Borough Council and Spelthorne Borough Council. OGL.
//  - Environment Agency flood-monitoring API: the "River Thames at Walton"
//    flood-warning area polygon. OGL.
//
// The six areas are the editorial decision on this map, so the rule is
// deliberately mechanical and deliberately narrow: each area is drawn as a band
// along exactly the streets its published description on /living/ names, plus
// the landmarks it names. There is no hull and no shading between streets,
// because Walton has no official neighbourhood boundaries and filling the gaps
// would invent one.
//
// The script also reports which named streets fall inside each official
// overlay, measured on the street geometry itself. Page copy about
// conservation areas and the flood-warning area is written from that report.
//
// Outputs:
//  - public/images/maps/walton-areas-base.svg  streets, water, rail, parks
//  - public/images/maps/walton-areas-map.svg   the full annotated map, for opening at full size
//  - src/data/walton-areas-map.json            areas, overlays and labels for the page's inline layer
//  - public/images/maps/walton-areas-map-og.png 1200x630 social preview
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CACHE = join(ROOT, '.cache', 'areas-map');
const PUBLIC_MAPS = join(ROOT, 'public', 'images', 'maps');
const DATA_OUT = join(ROOT, 'src', 'data', 'walton-areas-map.json');

// Map frame. Covers every area plus Walton Bridge, Hersham station and the
// reservoirs, which readers use to orient themselves.
const FRAME = { south: 51.369, north: 51.401, west: -0.435, east: -0.386 };
const HEIGHT = 1000;
const BAND_WIDTH_M = 60;

// Overpass is a shared community service and its instances are often
// overloaded. Queries are small, tiled and sent one at a time.
const OVERPASS = [
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass-api.de/api/interpreter',
];
const USER_AGENT = 'walton-on-thames.org-map-build/1.0';
const QUERY_BBOX = '51.358,-0.450,51.407,-0.375';
const residentialTiles = [
  '51.358,-0.450,51.383,-0.4125',
  '51.358,-0.4125,51.383,-0.375',
  '51.383,-0.450,51.407,-0.4125',
  '51.383,-0.4125,51.407,-0.375',
];

const QUERIES = {
  'roads-major.json': `[out:json][timeout:200];way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified)$"](${QUERY_BBOX});out geom;`,
  ...Object.fromEntries(
    residentialTiles.map((bbox, i) => [
      `roads-minor-${i}.json`,
      `[out:json][timeout:200];way["highway"~"^(residential|living_street|pedestrian)$"](${bbox});out geom;`,
    ]),
  ),
  'features.json': `[out:json][timeout:200];(
    way["railway"="rail"](${QUERY_BBOX});
    node["railway"="station"](${QUERY_BBOX});
    way["waterway"~"^(river|canal)$"](${QUERY_BBOX});
    way["natural"="water"](${QUERY_BBOX});
    way["leisure"~"^(park|recreation_ground)$"](${QUERY_BBOX});
    node["place"](${QUERY_BBOX});
    nwr["name"~"The Heart of Walton|St Mary's Church|The Old Manor House|Xcel Leisure Centre|Walton Health Centre|Riverhouse Barn|Walton Library|Walton Bridge Road"](${QUERY_BBOX});
  );out geom;`,
};

async function fetchOverpass(query) {
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
  }
  throw new Error('Every Overpass endpoint failed. The cached data, if any, is unchanged. Try again later.');
}

async function fetchAll() {
  // Fetch into memory first, so a failed run never leaves a half-updated cache.
  const downloads = {};
  for (const [file, query] of Object.entries(QUERIES)) {
    console.log(`Fetching ${file}`);
    downloads[file] = await fetchOverpass(query);
  }

  const frameWkt = `POLYGON((${FRAME.west} ${FRAME.south},${FRAME.east} ${FRAME.south},${FRAME.east} ${FRAME.north},${FRAME.west} ${FRAME.north},${FRAME.west} ${FRAME.south}))`;
  const caUrl = new URL('https://www.planning.data.gov.uk/entity.geojson');
  caUrl.search = new URLSearchParams({ dataset: 'conservation-area', geometry: frameWkt, geometry_relation: 'intersects', limit: '100' });
  console.log('Fetching conservation areas');
  downloads['conservation-areas.geojson'] = await (await fetch(caUrl)).text();

  console.log('Fetching flood-warning area');
  const floodBase = 'https://environment.data.gov.uk/flood-monitoring/id/floodAreas/061FWF23Walton';
  downloads['flood-area.json'] = await (await fetch(floodBase)).text();
  downloads['flood-area.geojson'] = await (await fetch(`${floodBase}/polygon`)).text();
  downloads['fetched.json'] = JSON.stringify({ fetched: new Date().toISOString() }, null, 2);

  mkdirSync(CACHE, { recursive: true });
  for (const [file, body] of Object.entries(downloads)) writeFileSync(join(CACHE, file), body);
}

// Projection. Over three kilometres an equirectangular projection scaled by
// the cosine of the frame's latitude is indistinguishable from Web Mercator.
const LAT0 = ((FRAME.north + FRAME.south) / 2) * (Math.PI / 180);
const METRES_PER_DEG_LAT = 111_320;
const SCALE = HEIGHT / (FRAME.north - FRAME.south);
const WIDTH = Math.round((FRAME.east - FRAME.west) * Math.cos(LAT0) * SCALE);
const UNITS_PER_METRE = HEIGHT / ((FRAME.north - FRAME.south) * METRES_PER_DEG_LAT);

const project = (lat, lon) => [(lon - FRAME.west) * Math.cos(LAT0) * SCALE, (FRAME.north - lat) * SCALE];

const metresBetween = (a, b) => {
  const dy = (a.lat - b.lat) * METRES_PER_DEG_LAT;
  const dx = (a.lon - b.lon) * METRES_PER_DEG_LAT * Math.cos(LAT0);
  return Math.hypot(dx, dy);
};

const MARGIN = 60;
const inView = ([x, y]) => x > -MARGIN && x < WIDTH + MARGIN && y > -MARGIN && y < HEIGHT + MARGIN;
const fmt = (n) => (Math.round(n * 10) / 10).toString();

// Douglas-Peucker for open lines.
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay);
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = len === 0
      ? Math.hypot(px - ax, py - ay)
      : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / len;
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist <= tolerance) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

// A closed ring starts and ends on the same point, which gives the open-line
// algorithm a zero-length baseline. Split it at its farthest point first.
function simplifyRing(points, tolerance) {
  if (points.length < 4) return points;
  let far = 1;
  let farDist = 0;
  points.forEach(([x, y], i) => {
    const d = Math.hypot(x - points[0][0], y - points[0][1]);
    if (d > farDist) {
      farDist = d;
      far = i;
    }
  });
  return [...simplify(points.slice(0, far + 1), tolerance).slice(0, -1), ...simplify(points.slice(far), tolerance)];
}

// Overpass returns null for nodes it could not place, so geometry is split
// into runs of real points before drawing.
function runs(geometry) {
  const out = [];
  let current = [];
  for (const p of geometry || []) {
    if (!p) {
      if (current.length) out.push(current);
      current = [];
      continue;
    }
    current.push(p);
  }
  if (current.length) out.push(current);
  return out;
}

const pathFromPoints = (pts, close = false) => `M${pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L')}${close ? 'Z' : ''}`;

function linePath(geometry, tolerance = 0.8) {
  return runs(geometry)
    .map((run) => run.map((p) => project(p.lat, p.lon)))
    .filter((pts) => pts.length > 1 && pts.some(inView))
    .map((pts) => pathFromPoints(simplify(pts, tolerance)))
    .join('');
}

function ringPath(lonLatRing, tolerance = 0.8) {
  const pts = lonLatRing.map(([lon, lat]) => project(lat, lon));
  if (!pts.some(inView)) return '';
  return pathFromPoints(simplifyRing(pts, tolerance), true);
}

const isClosed = (geometry) => {
  const g = geometry || [];
  return g.length > 3 && g.every(Boolean) && g[0].lat === g[g.length - 1].lat && g[0].lon === g[g.length - 1].lon;
};

function loadElements(file) {
  const path = join(CACHE, file);
  if (!existsSync(path)) throw new Error(`Missing ${path}. Run with --fetch first.`);
  return JSON.parse(readFileSync(path, 'utf8')).elements;
}

// Some landmarks (Walton Health Centre, for one) are mapped as relations, whose
// geometry sits on their members rather than on the relation itself.
const allPoints = (el) => {
  if (el.lat) return [{ lat: el.lat, lon: el.lon }];
  if (el.geometry) return runs(el.geometry).flat();
  return (el.members || []).flatMap((m) => runs(m.geometry).flat());
};

const centroid = (points) => ({
  lat: points.reduce((a, p) => a + p.lat, 0) / points.length,
  lon: points.reduce((a, p) => a + p.lon, 0) / points.length,
});

function pointInRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const polygons = (geometry) => (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates);

const pointInGeometry = (p, geometry) =>
  polygons(geometry).some((poly) => pointInRing(p.lon, p.lat, poly[0]) && !poly.slice(1).some((hole) => pointInRing(p.lon, p.lat, hole)));

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;');

async function generate() {
  const major = loadElements('roads-major.json');
  const minor = readdirSync(CACHE)
    .filter((f) => /^roads-minor-.+\.json$/.test(f))
    .flatMap(loadElements);
  const features = loadElements('features.json');
  const streets = [...major, ...minor].filter((e) => e.type === 'way' && e.tags?.highway);
  const fetched = JSON.parse(readFileSync(join(CACHE, 'fetched.json'), 'utf8')).fetched;
  const osmTimestamp = JSON.parse(readFileSync(join(CACHE, 'features.json'), 'utf8')).osm3s?.timestamp_osm_base;

  const firstNamed = (predicate, label) => {
    const el = features.find(predicate);
    if (!el) throw new Error(`Not found in OpenStreetMap data: ${label}`);
    return centroid(allPoints(el));
  };

  const landmarks = {
    station: firstNamed((e) => e.tags?.railway === 'station' && e.tags.name === 'Walton-on-Thames', 'Walton-on-Thames station'),
    hershamStation: firstNamed((e) => e.tags?.railway === 'station' && e.tags.name === 'Hersham', 'Hersham station'),
    stMarys: firstNamed((e) => e.tags?.name === "St Mary's Church" && e.tags.amenity === 'place_of_worship', "St Mary's Church"),
    oldManor: firstNamed((e) => e.tags?.name === 'The Old Manor House', 'The Old Manor House'),
    heart: firstNamed((e) => e.tags?.name === 'The Heart of Walton' && e.tags.building === 'shopping_mall', 'The Heart'),
    library: firstNamed((e) => e.tags?.name === 'Walton Library', 'Walton Library'),
    riverhouse: firstNamed((e) => e.tags?.name === 'Riverhouse Barn' && e.tags.amenity === 'arts_centre', 'Riverhouse Barn'),
    xcel: firstNamed((e) => e.tags?.name === 'Xcel Leisure Centre' && e.tags.building, 'Xcel Leisure Centre'),
    healthCentre: firstNamed((e) => e.tags?.name === 'Walton Health Centre', 'Walton Health Centre'),
    bridge: centroid(features.filter((e) => e.tags?.name === 'Walton Bridge Road' && e.tags.bridge).flatMap(allPoints)),
    hershamPlace: firstNamed((e) => e.tags?.place && e.tags.name === 'Hersham', 'Hersham place node'),
    knightReservoir: firstNamed((e) => e.tags?.name === 'Knight Reservoir', 'Knight Reservoir'),
    qe2Reservoir: firstNamed((e) => e.tags?.name === 'Queen Elizabeth II Reservoir', 'Queen Elizabeth II Reservoir'),
  };

  // A point on a named street is kept only near its anchor: there is a High
  // Street in Shepperton inside the query area, and several Church Streets.
  const keepPoint = ({ near, nearPoints, within }) => (p) =>
    (!near || metresBetween(p, landmarks[near]) <= within) &&
    (!nearPoints || nearPoints.some((q) => metresBetween(p, q) <= within));

  // The kept stretches of a named street, as runs of consecutive kept points.
  const streetRuns = (rule) => {
    const keep = keepPoint(rule);
    const out = streets
      .filter((e) => e.tags.name === rule.name)
      .flatMap((e) => runs((e.geometry || []).map((p) => (p && keep(p) ? p : null))));
    if (!out.length) throw new Error(`Street not found in OpenStreetMap data: ${rule.name}`);
    return out;
  };

  // Hersham Road runs from the town centre, through the Halfway, into Hersham.
  // The description places it in a station-side area "around Station Avenue,
  // the Halfway and the western part of Hersham Road", so only the stretch at
  // the Halfway is drawn. Drawing the whole western length would run the band
  // up to The Heart and imply the station area reaches the town centre.
  const HALFWAY_STRETCH_M = 250;
  const halfwayGreenPoints = streetRuns({ name: 'Halfway Green' }).flat();

  const AREAS = [
    {
      id: 'historic-centre',
      number: 1,
      name: 'The historic centre, Church Street and the riverside',
      shortName: 'Historic centre and riverside',
      colour: '#B8862E',
      streets: [
        { name: 'Church Street', near: 'stMarys', within: 500 },
        { name: 'Bridge Street', near: 'stMarys', within: 900 },
        { name: 'Manor Road', near: 'stMarys', within: 700 },
      ],
      landmarks: ['stMarys', 'oldManor'],
    },
    {
      id: 'town-centre',
      number: 2,
      name: 'Walton town centre and The Heart',
      shortName: 'Town centre and The Heart',
      colour: '#B5543C',
      streets: [
        { name: 'High Street', near: 'heart', within: 500 },
        { name: 'New Zealand Avenue', near: 'heart', within: 900 },
      ],
      landmarks: ['heart'],
    },
    {
      id: 'ashley-park',
      number: 3,
      name: 'Ashley Park',
      shortName: 'Ashley Park',
      colour: '#5E7F2E',
      streets: [
        { name: 'Ashley Park Road', near: 'station', within: 2000 },
        { name: 'Ashley Drive', near: 'station', within: 2000 },
        { name: 'Ashley Rise', near: 'station', within: 2000 },
      ],
      landmarks: [],
    },
    {
      id: 'station-halfway',
      number: 4,
      name: 'The station, Halfway and Hersham Road',
      shortName: 'Station and the Halfway',
      colour: '#6B4C9A',
      streets: [
        { name: 'Station Avenue', near: 'station', within: 900 },
        { name: 'Halfway Green' },
        { name: 'Hersham Road', nearPoints: halfwayGreenPoints, within: HALFWAY_STRETCH_M },
      ],
      landmarks: ['station'],
    },
    {
      id: 'cottimore',
      number: 5,
      name: 'Cottimore, Sidney Road and the east of the town',
      shortName: 'Cottimore and Sidney Road',
      colour: '#217A74',
      streets: [
        { name: 'Cottimore Lane', near: 'heart', within: 2500 },
        { name: 'Sidney Road', near: 'heart', within: 2500 },
      ],
      landmarks: [],
    },
    {
      id: 'walton-north',
      number: 6,
      name: 'Walton North and Waterside Drive',
      shortName: 'Walton North and Waterside Drive',
      colour: '#3F5F8F',
      streets: [{ name: 'Waterside Drive', near: 'xcel', within: 1000 }],
      landmarks: ['xcel'],
    },
  ];

  const conservation = JSON.parse(readFileSync(join(CACHE, 'conservation-areas.geojson'), 'utf8')).features;
  const floodGeometry = JSON.parse(readFileSync(join(CACHE, 'flood-area.geojson'), 'utf8')).features[0].geometry;
  const floodMeta = JSON.parse(readFileSync(join(CACHE, 'flood-area.json'), 'utf8')).items;

  // Landmark labels. On a phone the map shows at about a third of its drawn
  // size, so the page enlarges labels and hides the "minor" ones, which sit
  // too close to others to fit. Every one is still named in the page text.
  const point = (p) => project(p.lat, p.lon).map(Math.round);
  const MINOR = new Set(["St Mary's Church", 'Riverhouse Barn', 'Walton Health Centre']);
  const landmarkLabels = [
    ['Walton Bridge', landmarks.bridge],
    ["St Mary's Church", landmarks.stMarys],
    ['The Heart', landmarks.heart],
    ['Riverhouse Barn', landmarks.riverhouse],
    ['Xcel Leisure Complex', landmarks.xcel],
    ['Walton Health Centre', landmarks.healthCentre],
    ['Walton-on-Thames station', landmarks.station],
    ['Hersham station', landmarks.hershamStation],
  ].map(([text, p]) => {
    const at = point(p);
    const minor = MINOR.has(text);
    // Labels near the right edge read leftwards so they stay on the map.
    return { text, at, anchor: at[0] > WIDTH - 260 ? 'end' : 'start', minor };
  });

  // The space each label occupies, at the larger of its two display sizes:
  // mobile size for labels shown on phones, desktop size for minor ones.
  // Glyph width is estimated at 0.55em, which suits Inter.
  const labelBoxes = landmarkLabels.map((l) => {
    const charWidth = l.minor ? 9.4 : 16.5;
    const textWidth = l.text.length * charWidth + 10;
    const [x, y] = l.at;
    return {
      left: l.anchor === 'end' ? x - textWidth : x - 8,
      right: l.anchor === 'end' ? x + 8 : x + textWidth,
      top: y - (l.minor ? 16 : 26),
      bottom: y + (l.minor ? 10 : 12),
    };
  });
  const distanceToBox = ([x, y], b) => Math.hypot(Math.max(b.left - x, 0, x - b.right), Math.max(b.top - y, 0, y - b.bottom));
  // A marker is drawn with radius 21 and enlarged 1.6 times on phones.
  const MARKER_CLEARANCE = 38;

  const placedLabels = [];
  const areas = AREAS.map((area) => {
    const streetGeometry = area.streets.map((rule) => ({ name: rule.name, runs: streetRuns(rule) }));
    const landmarkPoints = area.landmarks.map((key) => landmarks[key]);
    const everyPoint = [...streetGeometry.flatMap((s) => s.runs.flat()), ...landmarkPoints];

    // Bands along the named streets, plus a dot for each named landmark.
    const d =
      streetGeometry
        .flatMap((s) => s.runs)
        .map((run) => run.map((p) => project(p.lat, p.lon)))
        .filter((pts) => pts.length > 1)
        .map((pts) => pathFromPoints(simplify(pts, 0.6)))
        .join('') +
      landmarkPoints
        .map((p) => project(p.lat, p.lon))
        .map(([x, y]) => `M${fmt(x)} ${fmt(y)}l0 0`)
        .join('');

    // Number marker: on the named street point nearest the area's centre that
    // keeps clear of every label and of the markers already placed. If no
    // point is fully clear, the one with the most room wins.
    const c = centroid(everyPoint);
    const clearance = (xy) =>
      Math.min(
        ...labelBoxes.map((b) => distanceToBox(xy, b) / MARKER_CLEARANCE),
        ...placedLabels.map(([px, py]) => Math.hypot(xy[0] - px, xy[1] - py) / (MARKER_CLEARANCE * 2)),
        Infinity,
      );
    const candidates = everyPoint
      .map((p) => ({ xy: project(p.lat, p.lon), dist: metresBetween(p, c) }))
      .filter((cand) => cand.xy[0] > 40 && cand.xy[0] < WIDTH - 40 && cand.xy[1] > 40 && cand.xy[1] < HEIGHT - 60)
      .sort((m, n) => m.dist - n.dist);
    const chosen =
      candidates.find((cand) => clearance(cand.xy) >= 1) ||
      candidates.reduce((best, cand) => (clearance(cand.xy) > clearance(best.xy) ? cand : best));
    const [lx, ly] = chosen.xy;
    if (clearance(chosen.xy) < 1) console.warn(`  marker ${area.number} could not be placed fully clear of labels`);
    placedLabels.push([lx, ly]);

    // Overlay report, measured on the street geometry and landmarks themselves.
    const inFlood = streetGeometry
      .map((s) => {
        const pts = s.runs.flat();
        return { street: s.name, share: pts.filter((p) => pointInGeometry(p, floodGeometry)).length / pts.length };
      })
      .filter((s) => s.share > 0);
    const conservationAreas = conservation
      .filter((f) => everyPoint.some((p) => pointInGeometry(p, f.geometry)))
      .map((f) => f.properties.name);
    const landmarksInFlood = area.landmarks.filter((key) => pointInGeometry(landmarks[key], floodGeometry));

    return {
      id: area.id,
      number: area.number,
      name: area.name,
      shortName: area.shortName,
      colour: area.colour,
      streets: area.streets.map((s) => s.name),
      d,
      marker: [Math.round(lx), Math.round(ly)],
      report: {
        conservationAreas,
        streetsInFloodWarningArea: inFlood.map((s) => ({ street: s.street, percentOfMappedPoints: Math.round(s.share * 100) })),
        landmarksInFloodWarningArea: landmarksInFlood,
      },
    };
  });

  const overlays = {
    conservationAreas: conservation
      .map((f) => ({
        name: f.properties.name,
        reference: f.properties.reference,
        // planning.data.gov.uk records the designation date as start-date.
        designated: f.properties['start-date'] || null,
        d: polygons(f.geometry).map((poly) => ringPath(poly[0], 0.5)).join(''),
      }))
      .filter((f) => f.d),
    floodWarningArea: {
      name: floodMeta.label,
      description: floodMeta.description,
      d: polygons(floodGeometry).map((poly) => ringPath(poly[0], 0.8)).join(''),
    },
  };

  // The river label sits beside the mapped centre line, turned to follow it.
  const thames = features
    .filter((e) => e.type === 'way' && e.tags?.waterway === 'river' && e.tags.name === 'River Thames')
    .flatMap((e) => runs(e.geometry))
    .map((run) => run.map((p) => project(p.lat, p.lon)))
    .filter((pts) => pts.length > 1);
  const target = [WIDTH * 0.3, HEIGHT * 0.14];
  let best = null;
  for (const pts of thames) {
    pts.forEach((pt, i) => {
      if (!inView(pt)) return;
      const dist = Math.hypot(pt[0] - target[0], pt[1] - target[1]);
      if (!best || dist < best.dist) best = { dist, pts, i };
    });
  }
  const a = best.pts[Math.max(0, best.i - 1)];
  const b = best.pts[Math.min(best.pts.length - 1, best.i + 1)];
  let angle = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  if (angle > 90) angle -= 180;
  if (angle < -90) angle += 180;
  const normal = ((angle - 90) * Math.PI) / 180;
  const riverLabel = {
    text: 'River Thames',
    at: [Math.round(best.pts[best.i][0] + 26 * Math.cos(normal)), Math.round(best.pts[best.i][1] + 26 * Math.sin(normal))],
    rotate: Math.round(angle),
  };

  const waterLabels = [
    ['Knight Reservoir', landmarks.knightReservoir],
    ['Queen Elizabeth II Reservoir', landmarks.qe2Reservoir],
  ]
    .map(([text, p]) => ({ text, at: point(p) }))
    .filter((l) => inView(l.at) && l.at[1] > 0 && l.at[0] < WIDTH);

  // Hersham's centre lies south of the frame. Point towards it from the edge
  // rather than label a stretch of map as Hersham.
  const [hx] = point(landmarks.hershamPlace);
  const hershamPointer = { text: 'Hersham, a separate village', at: [Math.min(Math.max(hx, 140), WIDTH - 140), HEIGHT - 22] };

  // Base layer: static and cacheable, and carries no claim the page relies on.
  const byClass = (predicate) => streets.filter((e) => predicate(e.tags.highway)).map((e) => linePath(e.geometry)).join('');
  const water = features
    .filter((e) => e.type === 'way' && e.tags?.natural === 'water' && isClosed(e.geometry))
    .map((e) => ringPath(e.geometry.map((p) => [p.lon, p.lat])))
    .join('');
  const rivers = features.filter((e) => e.type === 'way' && e.tags?.waterway).map((e) => linePath(e.geometry, 0.5)).join('');
  const parks = features
    .filter((e) => e.type === 'way' && /^(park|recreation_ground)$/.test(e.tags?.leisure || '') && isClosed(e.geometry))
    .map((e) => ringPath(e.geometry.map((p) => [p.lon, p.lat])))
    .join('');
  const rail = features.filter((e) => e.type === 'way' && e.tags?.railway === 'rail').map((e) => linePath(e.geometry, 0.5)).join('');
  const minorRoads = byClass((h) => /^(residential|living_street|pedestrian|unclassified)$/.test(h));
  const majorRoads = byClass((h) => /^(motorway|trunk|primary|secondary|tertiary)$/.test(h));

  const clip = `<clipPath id="frame"><rect width="${WIDTH}" height="${HEIGHT}"/></clipPath>`;
  const baseLayers = `<rect width="${WIDTH}" height="${HEIGHT}" fill="#F3F0E4"/>
<path d="${parks}" fill="#DCE5CF"/>
<path d="${water}" fill="#B9D3DA"/>
<path d="${rivers}" fill="none" stroke="#B9D3DA" stroke-width="${fmt(55 * UNITS_PER_METRE)}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${minorRoads}" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${majorRoads}" fill="none" stroke="#D8CFB8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${majorRoads}" fill="none" stroke="#FFFDF5" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${rail}" fill="none" stroke="#506571" stroke-width="3.5"/>
<path d="${rail}" fill="none" stroke="#F3F0E4" stroke-width="1.6" stroke-dasharray="8 8"/>`;

  const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" overflow="hidden">
<defs>${clip}</defs>
<g clip-path="url(#frame)">
${baseLayers}
</g>
</svg>
`;

  const bandWidth = fmt(BAND_WIDTH_M * UNITS_PER_METRE);
  const halo = 'stroke="#F3F0E4" stroke-width="4" paint-order="stroke" stroke-linejoin="round"';
  const legendRows = [areas.slice(0, 3), areas.slice(3)];
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT + 110}" width="${WIDTH}" height="${HEIGHT + 110}" overflow="hidden" font-family="Inter, system-ui, sans-serif">
<title>Practical local areas of Walton-on-Thames, approximate</title>
<defs>${clip}</defs>
<g clip-path="url(#frame)">
${baseLayers}
${areas.map((ar) => `<path d="${ar.d}" fill="none" stroke="${ar.colour}" stroke-opacity="0.55" stroke-width="${bandWidth}" stroke-linecap="round" stroke-linejoin="round"/>`).join('\n')}
<text x="${riverLabel.at[0]}" y="${riverLabel.at[1]}" transform="rotate(${riverLabel.rotate} ${riverLabel.at[0]} ${riverLabel.at[1]})" font-size="18" font-style="italic" fill="#3D6B78" text-anchor="middle" ${halo}>River Thames</text>
${waterLabels.map((l) => `<text x="${l.at[0]}" y="${l.at[1]}" font-size="15" font-style="italic" fill="#3D6B78" text-anchor="middle" ${halo}>${escapeXml(l.text)}</text>`).join('\n')}
${landmarkLabels.map((l) => `<circle cx="${l.at[0]}" cy="${l.at[1]}" r="5" fill="#0B242E"/><text x="${l.anchor === 'end' ? l.at[0] - 10 : l.at[0] + 10}" y="${l.at[1] + 6}" font-size="17" fill="#0B242E" text-anchor="${l.anchor}" ${halo}>${escapeXml(l.text)}</text>`).join('\n')}
<text x="${hershamPointer.at[0]}" y="${hershamPointer.at[1]}" font-size="17" font-weight="600" fill="#0B242E" text-anchor="middle" ${halo}>${escapeXml(hershamPointer.text)} ↓</text>
${areas.map((ar) => `<circle cx="${ar.marker[0]}" cy="${ar.marker[1]}" r="21" fill="#0B242E" stroke="${ar.colour}" stroke-width="5"/><text x="${ar.marker[0]}" y="${ar.marker[1] + 8}" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle">${ar.number}</text>`).join('\n')}
</g>
<rect y="${HEIGHT}" width="${WIDTH}" height="110" fill="#FFFEF4"/>
${legendRows
  .map((row, r) =>
    row
      .map((ar, i) => `<rect x="${16 + i * 318}" y="${HEIGHT + 14 + r * 30}" width="18" height="18" rx="3" fill="${ar.colour}"/><text x="${42 + i * 318}" y="${HEIGHT + 28 + r * 30}" font-size="14" fill="#0B242E">${ar.number} ${escapeXml(ar.shortName)}</text>`)
      .join(''),
  )
  .join('\n')}
<text x="16" y="${HEIGHT + 96}" font-size="13" fill="#506571">Bands follow the streets each area's description names. They are not boundaries. Walton-on-Thames.org · Map data © OpenStreetMap contributors (ODbL)</text>
</svg>
`;

  mkdirSync(PUBLIC_MAPS, { recursive: true });
  writeFileSync(join(PUBLIC_MAPS, 'walton-areas-base.svg'), baseSvg);
  writeFileSync(join(PUBLIC_MAPS, 'walton-areas-map.svg'), fullSvg);
  writeFileSync(
    DATA_OUT,
    `${JSON.stringify(
      {
        generatedFrom: { fetched, osmTimestamp, bandWidthMetres: BAND_WIDTH_M },
        width: WIDTH,
        height: HEIGHT,
        bandWidth: Number(bandWidth),
        areas,
        overlays,
        labels: { river: riverLabel, water: waterLabels, landmarks: landmarkLabels, hersham: hershamPointer },
      },
      null,
      2,
    )}\n`,
  );

  // Social preview. Networks do not accept SVG, so a 1200x630 PNG is cut from
  // the map around the six areas. The legend strip is left out: at preview
  // size it would be unreadable.
  const sharp = (await import('sharp')).default;
  const ogScale = 1200 / WIDTH;
  const mapOnly = fullSvg.replace(/<\/g>\n<rect y="\d+"[\s\S]*?(?=<\/svg>)/, '</g>\n');
  const areaYs = areas.map((ar) => ar.marker[1]);
  const midY = ((Math.min(...areaYs) + Math.max(...areaYs)) / 2) * ogScale;
  const top = Math.round(Math.min(Math.max(midY - 315, 0), HEIGHT * ogScale - 630));
  await sharp(Buffer.from(mapOnly), { density: 72 * ogScale })
    .resize(1200)
    .extract({ left: 0, top, width: 1200, height: 630 })
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC_MAPS, 'walton-areas-map-og.png'));

  console.log(`Map ${WIDTH}x${HEIGHT}. Base SVG ${Math.round(baseSvg.length / 1024)}KB, full SVG ${Math.round(fullSvg.length / 1024)}KB, page data ${Math.round(readFileSync(DATA_OUT).length / 1024)}KB`);
  console.log(`Overlays: ${overlays.conservationAreas.length} conservation areas in frame, flood-warning area path ${overlays.floodWarningArea.d.length} chars`);
  for (const ar of areas) {
    console.log(`  ${ar.number} ${ar.name}`);
    console.log(`      conservation areas: ${ar.report.conservationAreas.join(', ') || 'none'}`);
    console.log(`      streets in flood-warning area: ${ar.report.streetsInFloodWarningArea.map((s) => `${s.street} (${s.percentOfMappedPoints}%)`).join(', ') || 'none'}`);
    console.log(`      landmarks in flood-warning area: ${ar.report.landmarksInFloodWarningArea.join(', ') || 'none'}`);
  }
}

if (process.argv.includes('--fetch')) await fetchAll();
await generate();
