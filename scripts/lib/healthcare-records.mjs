// Reads the GP practice and pharmacy records straight from their markdown
// frontmatter, for the route and map build scripts. The markdown stays the
// single source of truth: nothing here keeps a second copy of a coordinate.
//
// js-yaml is the parser Astro itself uses for frontmatter, so anchors and
// aliases in the GP records resolve exactly as they do on the site.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const DIR = join(ROOT, 'src', 'content', 'businesses');

function readAll() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const text = readFileSync(join(DIR, f), 'utf8');
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return m ? yaml.load(m[1]) : null;
    })
    .filter(Boolean);
}

const withPoint = (r) => typeof r.lat === 'number' && typeof r.lng === 'number';

export function loadHealthcare() {
  const all = readAll();
  const practices = all.filter((r) => r.subcategories?.includes('gp-surgery') && withPoint(r))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const pharmacies = all.filter((r) => r.subcategories?.includes('pharmacy') && withPoint(r))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  return { practices, pharmacies };
}

// The point a journey leaves from or arrives at, and why. A building
// coordinate is only a fallback, and says so, because a car cannot start
// inside a building and a router will snap it to whichever road is nearest.
export function departurePoint(practice, mode) {
  const explicit = mode === 'drive' ? practice.gp?.vehicle_departure : practice.gp?.entrance;
  if (explicit) return { lat: explicit.lat, lng: explicit.lng, basis: explicit.basis };
  return { lat: practice.lat, lng: practice.lng, basis: 'building point from the listing, snapped by the router to the nearest usable way' };
}

export function arrivalPoint(pharmacy, mode) {
  const explicit = mode === 'drive' ? pharmacy.vehicle_arrival : pharmacy.pedestrian_entrance;
  if (explicit) return { lat: explicit.lat, lng: explicit.lng, basis: explicit.basis };
  return { lat: pharmacy.lat, lng: pharmacy.lng, basis: 'listing point, snapped by the router to the nearest usable way' };
}
