// Applies the coordinate fixes confirmed by two independent methods
// (free-text address geocode + postcode centroid, both agreeing within a
// few hundred metres of each other and far from the stored value).
import { readFileSync, writeFileSync } from 'node:fs';

const fixes = [
  { path: 'src/content/businesses/april-house-weybridge.md', lat: 51.3712, lng: -0.4564 },
  { path: 'src/content/businesses/body-and-brain-yoga-taichi.md', lat: 51.3866, lng: -0.4207 },
  { path: 'src/content/businesses/elmbridge-xcel.md', lat: 51.3987, lng: -0.4128 },
  { path: 'src/content/businesses/fitzen-pilates.md', lat: 51.3752, lng: -0.4080 },
  { path: 'src/content/businesses/hand-and-spear-weybridge.md', lat: 51.3622, lng: -0.4592 },
  { path: 'src/content/businesses/oatlands-chaser.md', lat: 51.3750, lng: -0.4280 },
  { path: 'src/content/businesses/oatlands-park-hotel.md', lat: 51.3755, lng: -0.4427 },
  { path: 'src/content/businesses/old-manor-house-bb-shepperton.md', lat: 51.4068, lng: -0.4585 },
  { path: 'src/content/businesses/origin-pilates.md', lat: 51.3853, lng: -0.4202 },
  { path: 'src/content/businesses/the-anglers.md', lat: 51.3901, lng: -0.4221 },
  { path: 'src/content/businesses/the-method-gym.md', lat: 51.3844, lng: -0.4175 },
  { path: 'src/content/businesses/three-sixty-gym.md', lat: 51.3866, lng: -0.4207 },
  { path: 'src/content/businesses/travelodge-walton-ashley-park.md', lat: 51.3735, lng: -0.4154 },
  { path: 'src/content/businesses/travelodge-walton-central.md', lat: 51.3869, lng: -0.4187 },
  { path: 'src/content/businesses/warren-lodge-hotel.md', lat: 51.3878, lng: -0.4538 },
  { path: 'src/content/businesses/west-end-lodge-esher.md', lat: 51.3640, lng: -0.3785 },
  { path: 'src/content/businesses/holiday-inn-shepperton.md', lat: 51.3918, lng: -0.4245 },
  { path: 'src/content/businesses/puregym-walton.md', lat: 51.3853, lng: -0.4202 },
  { path: 'src/content/businesses/sandown-park-lodge.md', lat: 51.3737, lng: -0.3628 },
  { path: 'src/content/businesses/the-ship-hotel-weybridge.md', lat: 51.3740, lng: -0.4562 },
  { path: 'src/content/businesses/the-weir-hotel.md', lat: 51.4016, lng: -0.4110 },
  { path: 'src/content/businesses/watermans-arms-hersham.md', lat: 51.3659, lng: -0.3994 },
];

for (const fix of fixes) {
  const text = readFileSync(fix.path, 'utf8');
  const before = text.match(/^lat:\s*[\d.-]+\nlng:\s*[\d.-]+/m)?.[0];
  const updated = text
    .replace(/^lat:\s*[\d.-]+$/m, `lat: ${fix.lat}`)
    .replace(/^lng:\s*[\d.-]+$/m, `lng: ${fix.lng}`);
  writeFileSync(fix.path, updated);
  console.log(`${fix.path}\n  before: ${before?.replace('\n', ' ')}\n  after:  lat: ${fix.lat} lng: ${fix.lng}`);
}
console.log(`\nApplied ${fixes.length} fixes.`);
