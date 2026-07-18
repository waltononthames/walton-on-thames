import { readFileSync } from 'node:fs';

const UA = 'walton-on-thames.org coordinate audit (contact via site contact form)';

const entries = [
  { name: 'Brightlife Chemist', path: 'src/content/businesses/brightlife-chemist.md', postcode: 'KT12 1GH' },
  { name: 'Hersham Pharmacy', path: 'src/content/businesses/hersham-pharmacy.md', postcode: 'KT12 4HL' },
  { name: 'Hersham Surgery', path: 'src/content/businesses/hersham-surgery.md', postcode: 'KT12 4HT' },
  { name: 'Holiday Inn London Shepperton', path: 'src/content/businesses/holiday-inn-shepperton.md', postcode: 'TW17 8NP' },
  { name: 'Longmore Road Drop + Collect', path: 'src/content/businesses/longmore-road-drop-and-collect.md', postcode: 'KT12 4NZ' },
  { name: 'Mulberry Dental', path: 'src/content/businesses/mulberry-dental.md', postcode: 'KT12 1HS' },
  { name: 'PureGym Walton-on-Thames', path: 'src/content/businesses/puregym-walton.md', postcode: 'KT12 1GH' },
  { name: 'Sandown Park Lodge', path: 'src/content/businesses/sandown-park-lodge.md', postcode: 'KT10 9AJ' },
  { name: 'The Heart Shopping Centre', path: 'src/content/businesses/the-heart-shopping-centre.md', postcode: 'KT12 1GH' },
  { name: 'The Ship Hotel', path: 'src/content/businesses/the-ship-hotel-weybridge.md', postcode: 'KT13 8BQ' },
  { name: 'The Weir Hotel', path: 'src/content/businesses/the-weir-hotel.md', postcode: 'KT12 2JB' },
  { name: 'Walton Library', path: 'src/content/businesses/walton-library.md', postcode: 'KT12 1DF' },
  { name: 'Walton Park Dental Practice', path: 'src/content/businesses/walton-park-dental-practice.md', postcode: 'KT12 3ET' },
  { name: 'The Watermans Arms', path: 'src/content/businesses/watermans-arms-hersham.md', postcode: 'KT12 5LT' },
  { name: 'Whiteley Village Post Office', path: 'src/content/businesses/whiteley-village-post-office.md', postcode: 'KT12 4DT' },
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
  try {
    const text = readFileSync(path, 'utf8');
    const latM = text.match(/^lat:\s*([\d.-]+)/m);
    const lngM = text.match(/^lng:\s*([\d.-]+)/m);
    if (!latM || !lngM) return null;
    return { lat: parseFloat(latM[1]), lng: parseFloat(lngM[1]) };
  } catch {
    return null;
  }
}

async function geocodePostcode(pc) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pc)}&country=UK&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

for (const entry of entries) {
  const stored = currentCoords(entry.path);
  if (!stored) {
    console.log(`${entry.name}: FILE/FIELD NOT FOUND at ${entry.path}`);
    continue;
  }
  const geo = await geocodePostcode(entry.postcode);
  await sleep(1100);
  if (!geo) {
    console.log(`${entry.name}: postcode lookup FAILED for ${entry.postcode}`);
    continue;
  }
  const dist = Math.round(haversine(stored.lat, stored.lng, geo.lat, geo.lng));
  console.log(`${entry.name.padEnd(32)} postcode ${entry.postcode.padEnd(9)} centroid ${geo.lat.toFixed(4)},${geo.lng.toFixed(4)}  stored ${stored.lat},${stored.lng}  diff=${dist}m`);
}
