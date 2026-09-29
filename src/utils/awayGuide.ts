// Helpers for /walton-hersham-fc-away-fans-guide/. The fact shapes are defined
// in src/content/schemas/away-guide.ts; see that file for what each one means.
import mapData from '../data/away-guide-map.json';
import { project, type BaseMap, type LatLng } from '../components/gp/mapProjection';

// Bump after rebuilding the base map: /images/* is cached for 7 days.
export const AWAY_MAP_VERSION = '2026-09-29-3';

export const GUIDE_PATH = '/walton-hersham-fc-away-fans-guide/';

export type Source = { label: string; url?: string; basis: string; checked: string };
export type Fact<T> =
  | { value: T; source: Source }
  | { value: T; placeholder: true }
  | { unconfirmed: { ask: 'club' | 'venue' | 'operator' | 'site-visit'; question: string } };

export const isSourced = <T>(f: Fact<T>): f is { value: T; source: Source } => 'source' in f;
export const isPlaceholder = <T>(f: Fact<T>): f is { value: T; placeholder: true } => 'placeholder' in f;
export const isUnconfirmed = <T>(f: Fact<T>): f is Extract<Fact<T>, { unconfirmed: unknown }> => 'unconfirmed' in f;

/** The value to render, or undefined where production must show nothing. */
export function valueOf<T>(f: Fact<T>): T | undefined {
  return 'value' in f ? f.value : undefined;
}

/** Whether a row built around this fact should render at all. Unconfirmed
 * facts appear in `astro dev` only, as a visible question. */
export function shows<T>(f: Fact<T>): boolean {
  return 'value' in f || import.meta.env.DEV;
}

export const ASK_LABEL = {
  club: 'ask the club',
  venue: 'ask the venue',
  operator: 'ask the operator',
  'site-visit': 'site visit',
} as const;

// Data shapes, mirroring src/content/schemas/away-guide.ts, for pages that
// read the collections.
type Text = Fact<string>;
export interface GroundData {
  name: string; address: Text; postcode: Text; officialSite: Text; kickOffSaturday: Text; kickOffMidweek: Text;
  turnstilesOpen: Text; tickets: Text; parking: Text; segregation: Text; awayEnd: Text;
}
export interface RouteStep { id: string; title: string; text: string; lat: number; lng: number; photo?: string; history?: { href: string; label: string }; pubs?: { name: string; href?: string }[] }
export interface RouteData {
  variant: 'road' | 'towpath'; title: string; order: number; placeholder: boolean;
  bestFor: Text; surface: Text; lighting: Text; stepFree: Text; afterDark: Text; steps: RouteStep[];
}
export interface TrainData {
  direction: string; dayType: 'saturday' | 'weekday';
  departures: { times: string[]; timetableValidFrom: string; timetableValidTo: string } & ({ placeholder: true } | { source: Source });
}
export interface BusData {
  route: Text; operator: Text; boardAt: Text; alightAt: Text; journeyMins: Fact<number>; walkFromStopMins: Fact<number>;
  frequency: Text; lastFromGround: { saturday: Fact<string[]>; weekday: Fact<string[]> }; timetableValidTo?: string; operatorUrl: Text;
}
export interface TaxiData {
  rankAtStation: Text; pickupAtGround: Text;
  rideHailing: { name: string; note: Text }[];
  firms: { name: string; phone: string; url?: string; source: Source }[];
}

// ---------------------------------------------------------------- map

export const awayBase: BaseMap & typeof mapData = mapData;

export function projectAway(p: LatLng) {
  return project(awayBase, p);
}

export type RouteKey = keyof typeof mapData.routes;

/** How far along a route line a point sits, 0 to 1, from the nearest sampled
 * vertex. Used to draw the line up to the step being read. */
export function progressAlong(route: RouteKey, p: LatLng): number {
  const { x, y } = projectAway(p);
  let best = Infinity;
  let fraction = 0;
  for (const [sx, sy, f] of mapData.routes[route].samples) {
    const d = (sx - x) ** 2 + (sy - y) ** 2;
    if (d < best) { best = d; fraction = f; }
  }
  return fraction;
}

/** Bounding box of a route line in map pixels. */
export function routeBox(route: RouteKey) {
  const xs = mapData.routes[route].samples.map((s) => s[0]);
  const ys = mapData.routes[route].samples.map((s) => s[1]);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

// ---------------------------------------------------------------- time

/** "22:52" to "10.52pm", the site's house style for times. */
export function clock12(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}.${String(m).padStart(2, '0')}${suffix}`;
}

export function minusMinutes(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const total = (h * 60 + m - mins + 24 * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: undefined, day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London',
  });
}

/** Today in Europe/London as YYYY-MM-DD, for timetable expiry at build time. */
export function londonToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

/** Minutes allowed at the station to reach the platform. An editorial
 * allowance, stated on the page wherever it is used. */
export const PLATFORM_ALLOWANCE_MINS = 5;

// ---------------------------------------------------------------- whole-guide checks

/** True when any fact in the given records is still a placeholder. Walks the
 * data generically so a new field cannot be missed. */
export function containsPlaceholder(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsPlaceholder);
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if (o.placeholder === true) return true;
    return Object.values(o).some(containsPlaceholder);
  }
  return false;
}

/** Latest date any sourced fact was checked, for the "Last checked" line. */
export function latestChecked(value: unknown): string | undefined {
  let latest: string | undefined;
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>;
      if (typeof o.checked === 'string' && typeof o.basis === 'string' && (!latest || o.checked > latest)) latest = o.checked;
      Object.values(o).forEach(walk);
    }
  };
  walk(value);
  return latest;
}
