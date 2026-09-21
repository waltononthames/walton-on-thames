// Builds src/data/pharmacy-routes.json: routed driving and walking times from
// each GP practice to its candidate pharmacies, for the "Nearby pharmacies"
// module. Run by hand after a practice or pharmacy moves, or on the review
// cycle in docs/gp-directory.md. Never at build time and never per visitor.
//
//   npm run routes:pharmacies -- --dry-run   list what would be requested
//   npm run routes:pharmacies                call the provider and write the file
//
// The provider is configured, not hard-wired. Any OSRM-compatible Table
// service works: a self-hosted OSRM, or a hosted one whose terms allow this
// use. Set, for example:
//
//   ROUTING_PROVIDER_NAME="OSRM (self-hosted)"
//   ROUTING_PROVIDER_URL="https://project-osrm.org/"
//   ROUTING_DRIVE_TABLE_URL="http://localhost:5000/table/v1/driving"
//   ROUTING_WALK_TABLE_URL="http://localhost:5001/table/v1/foot"
//   ROUTING_ATTRIBUTION="Routes: OSRM, road data © OpenStreetMap contributors (ODbL)"
//
// Read the provider's terms before pointing this at a hosted service. The
// public FOSSGIS server (routing.openstreetmap.de) caps use at one request a
// second, asks for a user agent naming the application, requires the
// OpenStreetMap attribution and a "fix the map" link, requires an operator
// email address visible on the site, and describes itself as for reasonable,
// non-commercial use. See docs/gp-directory.md before choosing it.
//
// What is recorded per route: provider, profile, mode, origin, destination,
// road distance, duration, the points the router actually snapped to, and
// when it was calculated. OSRM's figures are typical free-flow estimates,
// not live traffic, and the page says so.
//
// Failure is safe. A missing or failed route is simply absent from the file,
// and the page shows "Travel time unavailable" for it. Nothing is estimated
// or filled in.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadHealthcare, departurePoint, arrivalPoint, ROOT } from './lib/healthcare-records.mjs';
import { candidatesFor } from '../src/utils/pharmacyRanking.ts';

const OUT = join(ROOT, 'src', 'data', 'pharmacy-routes.json');
const USER_AGENT = 'walton-on-thames.org GP directory route build (https://walton-on-thames.org/contact/)';
const DRY_RUN = process.argv.includes('--dry-run');

const env = process.env;
const MODES = [
  { mode: 'drive', url: env.ROUTING_DRIVE_TABLE_URL, profile: env.ROUTING_DRIVE_PROFILE ?? 'car' },
  { mode: 'walk', url: env.ROUTING_WALK_TABLE_URL, profile: env.ROUTING_WALK_PROFILE ?? 'foot' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function table(url, origin, destinations) {
  const coords = [origin, ...destinations].map((p) => `${p.lng.toFixed(6)},${p.lat.toFixed(6)}`).join(';');
  const dest = destinations.map((_, i) => i + 1).join(';');
  const res = await fetch(`${url}/${coords}?sources=0&destinations=${dest}&annotations=duration,distance`, {
    headers: { 'User-Agent': USER_AGENT, Referer: 'https://walton-on-thames.org/living/gp-surgeries/' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  if (body.code !== 'Ok') throw new Error(`provider returned ${body.code}`);
  return body;
}

const { practices, pharmacies } = loadHealthcare();
const configured = MODES.filter((m) => m.url);

if (!DRY_RUN && configured.length === 0) {
  console.error('No routing provider configured. Set ROUTING_DRIVE_TABLE_URL and/or ROUTING_WALK_TABLE_URL (see the header of this file and docs/gp-directory.md).');
  console.error('The existing src/data/pharmacy-routes.json has not been touched.');
  process.exit(1);
}
if (!DRY_RUN && (!env.ROUTING_PROVIDER_NAME || !env.ROUTING_ATTRIBUTION)) {
  console.error('Set ROUTING_PROVIDER_NAME and ROUTING_ATTRIBUTION as well: the page shows both next to every journey time.');
  process.exit(1);
}

const routes = [];
const calculatedAt = new Date().toISOString();
for (const practice of practices) {
  const candidates = candidatesFor(practice, pharmacies);
  for (const { mode, url, profile } of DRY_RUN ? MODES : configured) {
    const origin = departurePoint(practice, mode);
    const dests = candidates.map((p) => ({ pharmacy: p, ...arrivalPoint(p, mode) }));
    if (DRY_RUN) {
      console.log(`${practice.slug} [${mode}] from ${origin.lat},${origin.lng} (${origin.basis}) to ${dests.length}: ${dests.map((d) => d.pharmacy.slug).join(', ')}`);
      continue;
    }
    try {
      const body = await table(url, origin, dests);
      dests.forEach((d, i) => {
        const duration = body.durations?.[0]?.[i];
        const distance = body.distances?.[0]?.[i];
        // null means no route was found. Leave it out rather than guess.
        if (duration == null || distance == null) {
          console.warn(`  no ${mode} route: ${practice.slug} -> ${d.pharmacy.slug}`);
          return;
        }
        const snap = body.destinations?.[i]?.location;
        routes.push({
          mode, origin: practice.slug, destination: d.pharmacy.slug,
          distance_m: Math.round(distance), duration_s: Math.round(duration),
          provider: env.ROUTING_PROVIDER_NAME, profile, calculated_at: calculatedAt,
          origin_point: body.sources?.[0]?.location ? { lat: body.sources[0].location[1], lng: body.sources[0].location[0] } : undefined,
          destination_point: snap ? { lat: snap[1], lng: snap[0] } : undefined,
          origin_basis: origin.basis, destination_basis: d.basis,
        });
      });
      console.log(`  ${practice.slug} [${mode}]: ${dests.length} destinations`);
    } catch (err) {
      console.warn(`  ${practice.slug} [${mode}] failed (${err.message}); its routes are left out`);
    }
    await sleep(1100); // one request a second at most, whatever the provider
  }
}

if (DRY_RUN) process.exit(0);

routes.sort((a, b) => a.origin.localeCompare(b.origin) || a.mode.localeCompare(b.mode) || a.destination.localeCompare(b.destination));
writeFileSync(OUT, JSON.stringify({
  generated_at: calculatedAt,
  provider: {
    name: env.ROUTING_PROVIDER_NAME,
    url: env.ROUTING_PROVIDER_URL ?? '',
    attribution: env.ROUTING_ATTRIBUTION,
    traffic: 'typical free-flow estimate, not live traffic',
  },
  routes,
}, null, 2) + '\n');
console.log(`Wrote ${routes.length} routes to ${OUT}`);
