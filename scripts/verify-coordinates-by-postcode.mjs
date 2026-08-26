// Second-pass verification for scripts/audit-coordinates.mjs's findings.
// Free-text address search can mismatch on ambiguous street names (confirmed:
// it did exactly this for two Hersham businesses, matching a "The Green" in
// Whiteley Village instead). Postcode-centroid lookup is a much more robust
// signal, so re-check every flagged entry that way before trusting a fix.
import { readFileSync } from 'node:fs';

const UA = 'walton-on-thames.org coordinate audit (contact via site contact form)';

const flagged = [
  { name: 'April House Weybridge', path: 'src/content/businesses/april-house-weybridge.md', postcode: 'KT13 8AJ' },
  { name: 'Body & Brain Yoga Taichi', path: 'src/content/businesses/body-and-brain-yoga-taichi.md', postcode: 'KT12 1AE' },
  { name: 'Elmbridge Xcel Leisure Complex', path: 'src/content/businesses/elmbridge-xcel.md', postcode: 'KT12 2JG' },
  { name: 'Fitzen Pilates', path: 'src/content/businesses/fitzen-pilates.md', postcode: 'KT12 1RW' },
  { name: 'Fort House Surgery', path: 'src/content/businesses/fort-house-surgery.md', postcode: 'KT12 3LD' },
  { name: 'Hand & Spear', path: 'src/content/businesses/hand-and-spear-weybridge.md', postcode: 'KT13 8TX' },
  { name: 'Hersham Dental Practice', path: 'src/content/businesses/hersham-dental-practice.md', postcode: 'KT12 4HW' },
  { name: 'The Oatlands Chaser', path: 'src/content/businesses/oatlands-chaser.md', postcode: 'KT13 9RW' },
  { name: 'Oatlands Park Hotel', path: 'src/content/businesses/oatlands-park-hotel.md', postcode: 'KT13 9HB' },
  { name: 'Old Manor House Bed & Breakfast', path: 'src/content/businesses/old-manor-house-bb-shepperton.md', postcode: 'TW17 0QG' },
  { name: 'Origin Pilates', path: 'src/content/businesses/origin-pilates.md', postcode: 'KT12 1GH' },
  { name: 'Philip J Adams Chemist', path: 'src/content/businesses/philip-j-adams-chemist.md', postcode: 'KT12 4HW' },
  { name: 'The Anglers', path: 'src/content/businesses/the-anglers.md', postcode: 'KT12 2PF' },
  { name: 'The Method Gym', path: 'src/content/businesses/the-method-gym.md', postcode: 'KT12 1DJ' },
  { name: 'Three Sixty Gym', path: 'src/content/businesses/three-sixty-gym.md', postcode: 'KT12 1AE' },
  { name: 'Travelodge Walton-on-Thames', path: 'src/content/businesses/travelodge-walton-ashley-park.md', postcode: 'KT12 1JP' },
  { name: 'Travelodge Walton-on-Thames Central', path: 'src/content/businesses/travelodge-walton-central.md', postcode: 'KT12 2QS' },
  { name: 'Warren Lodge Hotel', path: 'src/content/businesses/warren-lodge-hotel.md', postcode: 'TW17 9JZ' },
  { name: 'West End Lodge B&B', path: 'src/content/businesses/west-end-lodge-esher.md', postcode: 'KT10 8LB' },
  { name: 'Ashley Park', path: 'src/content/places/ashley-park.md', postcode: null }, // no postcode, area not address
  { name: 'Cowey Sale', path: 'src/content/places/cowey-sale.md', postcode: null },
  { name: 'Walton Bridge', path: 'src/content/places/walton-bridge.md', postcode: null },
];

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function currentCoords(path) {
  const text = readFileSync(path, 'utf8');
  const lat = parseFloat(text.match(/^lat:\s*([\d.-]+)/m)[1]);
  const lng = parseFloat(text.match(/^lng:\s*([\d.-]+)/m)[1]);
  return { lat, lng };
}

async function geocodePostcode(pc) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pc)}&country=UK&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

for (const entry of flagged) {
  const stored = currentCoords(entry.path);
  if (!entry.postcode) {
    console.log(`${entry.name}: NO POSTCODE (named place, not addressed): needs manual check, stored ${stored.lat},${stored.lng}`);
    continue;
  }
  const geo = await geocodePostcode(entry.postcode);
  await sleep(1100);
  if (!geo) {
    console.log(`${entry.name}: postcode lookup FAILED for ${entry.postcode}`);
    continue;
  }
  const dist = Math.round(haversine(stored.lat, stored.lng, geo.lat, geo.lng));
  console.log(`${entry.name.padEnd(38)} postcode ${entry.postcode.padEnd(9)} centroid ${geo.lat.toFixed(4)},${geo.lng.toFixed(4)}  stored ${stored.lat},${stored.lng}  diff=${dist}m`);
}
