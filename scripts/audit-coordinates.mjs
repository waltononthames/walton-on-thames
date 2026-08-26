// One-off audit: re-geocodes every business/place with lat/lng against its
// own stored address via Nominatim, and reports any pair more than ~300m
// from what the address actually geocodes to. Respects Nominatim's 1req/s
// policy. Run with `node scripts/audit-coordinates.mjs [--fix]`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FIX = process.argv.includes('--fix');
const UA = 'walton-on-thames.org coordinate audit (contact via site contact form)';

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim().replace(/^"(.*)"$/, '$1');
    fm[key] = val;
  }
  return fm;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&countrycodes=gb&format=json&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name };
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function collectEntries(dir) {
  const entries = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const path = join(dir, file);
    const text = readFileSync(path, 'utf8');
    const fm = parseFrontmatter(text);
    if (!fm || !fm.lat || !fm.lng || !fm.address) continue;
    entries.push({ path, name: fm.name, address: fm.address, lat: parseFloat(fm.lat), lng: parseFloat(fm.lng) });
  }
  return entries;
}

const businesses = await collectEntries('src/content/businesses');
const places = await collectEntries('src/content/places').catch?.(() => []) ?? [];
// places.md doesn't have `address`, uses name+neighbourhood instead, handle separately.
const placesRaw = readdirSync('src/content/places').filter((f) => f.endsWith('.md'));
const placeEntries = [];
for (const file of placesRaw) {
  const path = join('src/content/places', file);
  const text = readFileSync(path, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm || !fm.lat || !fm.lng) continue;
  const q = `${fm.name}, ${fm.neighbourhood === 'walton-on-thames' ? 'Walton-on-Thames' : fm.neighbourhood}, Surrey`;
  placeEntries.push({ path, name: fm.name, address: q, lat: parseFloat(fm.lat), lng: parseFloat(fm.lng) });
}

const all = [...businesses, ...placeEntries];
console.log(`Auditing ${all.length} coordinate entries (this takes ~1s per entry due to Nominatim rate limits)...\n`);

const flagged = [];
for (const entry of all) {
  const geo = await geocode(entry.address);
  await sleep(1100);
  if (!geo) {
    console.log(`⚠ NO RESULT: ${entry.name} (${entry.address})`);
    continue;
  }
  const dist = haversine(entry.lat, entry.lng, geo.lat, geo.lng);
  const flag = dist > 300;
  console.log(`${flag ? '❌' : '✓'} ${entry.name.padEnd(40)} ${Math.round(dist)}m off  [${entry.path}]`);
  if (flag) {
    flagged.push({ ...entry, correctLat: geo.lat, correctLng: geo.lng, dist, geoDisplay: geo.display });
  }
}

console.log(`\n=== ${flagged.length} entries more than 300m from where their address actually geocodes ===\n`);
for (const f of flagged) {
  console.log(`${f.name}`);
  console.log(`  file: ${f.path}`);
  console.log(`  address: ${f.address}`);
  console.log(`  stored: ${f.lat}, ${f.lng}`);
  console.log(`  geocoded: ${f.correctLat.toFixed(4)}, ${f.correctLng.toFixed(4)} (${Math.round(f.dist)}m away)`);
  console.log(`  nominatim match: ${f.geoDisplay}`);
  console.log('');
}

if (FIX) {
  console.log('--fix passed: writing corrected coordinates...\n');
  for (const f of flagged) {
    const text = readFileSync(f.path, 'utf8');
    const newLat = f.correctLat.toFixed(4);
    const newLng = f.correctLng.toFixed(4);
    const updated = text
      .replace(/^lat:\s*[\d.-]+$/m, `lat: ${newLat}`)
      .replace(/^lng:\s*[\d.-]+$/m, `lng: ${newLng}`);
    writeFileSync(f.path, updated);
    console.log(`Fixed ${f.path}: ${f.lat},${f.lng} -> ${newLat},${newLng}`);
  }
}
