// Ranking for the "Nearby pharmacies" module on GP practice profiles.
//
// The rules, from the GP directory brief (docs/gp-directory.md):
//   - Straight-line distance only preselects candidates. It never decides
//     the order of a travel-time ranking.
//   - The order comes from routed journeys: duration, then road distance,
//     then name, so ties always resolve the same way.
//   - A pharmacy with no usable route is "Travel time unavailable". It is
//     listed after the ranked ones, carries no rank number and is never
//     treated as zero minutes away.
//   - Walking is ranked from walking routes, never from the driving order.
//
// Plain TypeScript with erasable syntax only, so scripts/test-pharmacy-ranking.mjs
// can import it straight into Node.

export type TravelMode = 'drive' | 'walk';

export interface Point {
  lat: number;
  lng: number;
}

export interface RouteRecord {
  mode: TravelMode;
  origin: string;
  destination: string;
  distance_m: number;
  duration_s: number;
  provider: string;
  profile: string;
  calculated_at: string;
  origin_point?: Point;
  destination_point?: Point;
}

export interface RouteMatrix {
  generated_at: string | null;
  provider: { name: string; url: string; attribution: string; traffic: string } | null;
  routes: RouteRecord[];
}

export interface Candidate {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}

export interface RankedEntry<T extends Candidate> {
  item: T;
  // 1-based position among routed pharmacies; null when the route is missing.
  rank: number | null;
  route: RouteRecord | null;
  straightLineM: number;
}

export interface Ranking<T extends Candidate> {
  mode: TravelMode;
  ranked: RankedEntry<T>[];
  unavailable: RankedEntry<T>[];
  // True only when at least one pharmacy has a routed time for this mode.
  hasRoutes: boolean;
  calculatedAt: string | null;
}

// Candidates within this straight-line radius of a practice are sent for
// routing. Wide on purpose: a pharmacy just over a town boundary, or across
// a bridge, can still be one of the quickest.
export const CANDIDATE_RADIUS_M = 3600;
export const DEFAULT_VISIBLE = 5;

export function straightLineMetres(a: Point, b: Point): number {
  const R = 6_371_000;
  const toRad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toRad;
  const dLng = (b.lng - a.lng) * toRad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toRad) * Math.cos(b.lat * toRad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, 'en-GB');

// Preselection: everything inside the radius, nearest first, so the routing
// script has a stable, reviewable candidate list.
export function candidatesFor<T extends Candidate>(origin: Point, pharmacies: T[], radiusM = CANDIDATE_RADIUS_M): T[] {
  return pharmacies
    .map((p) => ({ p, d: straightLineMetres(origin, p) }))
    .filter(({ d }) => d <= radiusM)
    .sort((a, b) => a.d - b.d || byName(a.p, b.p))
    .map(({ p }) => p);
}

function usable(route: RouteRecord | undefined): route is RouteRecord {
  return !!route
    && Number.isFinite(route.duration_s) && route.duration_s >= 0
    && Number.isFinite(route.distance_m) && route.distance_m >= 0;
}

export function rankPharmacies<T extends Candidate>(
  origin: { slug: string } & Point,
  mode: TravelMode,
  candidates: T[],
  routes: RouteRecord[],
): Ranking<T> {
  const lookup = new Map<string, RouteRecord>();
  for (const r of routes) {
    if (r.origin === origin.slug && r.mode === mode) lookup.set(r.destination, r);
  }

  const withRoutes: RankedEntry<T>[] = [];
  const without: RankedEntry<T>[] = [];
  for (const item of candidates) {
    const route = lookup.get(item.slug);
    const entry: RankedEntry<T> = { item, rank: null, route: usable(route) ? route : null, straightLineM: straightLineMetres(origin, item) };
    (entry.route ? withRoutes : without).push(entry);
  }

  withRoutes.sort((a, b) =>
    a.route!.duration_s - b.route!.duration_s
    || a.route!.distance_m - b.route!.distance_m
    || byName(a.item, b.item));
  withRoutes.forEach((e, i) => { e.rank = i + 1; });

  // Unrouted pharmacies stay useful: nearest first by straight line, which
  // the page labels as such, never as a journey time.
  without.sort((a, b) => a.straightLineM - b.straightLineM || byName(a.item, b.item));

  const times = withRoutes.map((e) => e.route!.calculated_at).sort();
  return {
    mode,
    ranked: withRoutes,
    unavailable: without,
    hasRoutes: withRoutes.length > 0,
    calculatedAt: times.length ? times[times.length - 1] : null,
  };
}

export function formatDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return minutes === 1 ? 'about 1 min' : `about ${minutes} min`;
}

export function formatDistance(metres: number): string {
  const miles = metres / 1609.344;
  return miles < 0.1 ? `${Math.round(metres)} m` : `${miles.toFixed(1)} miles`;
}
