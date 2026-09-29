// Pure time arithmetic for the away guide's last-train finder. Shared by the
// server render (LastTrainFinder.astro) and the browser script
// (src/scripts/away-guide/last-train.ts), so the table without JavaScript and
// the finder with it always agree. No imports: this ships to the browser.

/** Minutes after midnight, with the small hours counted as the same evening:
 * a 12.36am train sorts after an 11.51pm one. */
export function serviceMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h < 4 ? h + 24 : h) * 60 + m;
}

/** 1476 (minutes) to "12.36am"; 900 to "3pm". */
export function clockFromMinutes(mins: number): string {
  const t = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60), m = t % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `.${String(m).padStart(2, '0')}` : ''}${h >= 12 ? 'pm' : 'am'}`;
}

/** "3pm" or "7.45pm" to minutes after midnight. */
export function parseClock12(text: string): number | null {
  const m = text.trim().match(/^(\d{1,2})(?:\.(\d{2}))?\s*(am|pm)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === 'pm') h += 12;
  return h * 60 + Number(m[2] ?? 0);
}

/** Two 45-minute halves, a half-time interval of up to 15 minutes (IFAB Laws
 * of the Game, Law 7) and added time: full time is usually about this long
 * after kick-off. Shown on the page as "about", never as a fixed time. */
export const MATCH_LENGTH_MINS = 110;

export type Train = { time: string; direction: string };
export type Mode = 'road' | 'towpath' | 'taxi' | 'bus';
export interface FinderData {
  allowance: number;
  kickOff: Record<string, number | null>;
  walk: { road: number; towpath: number };
  driveMins: number;
  bus: { fromGround: Record<string, string[]>; fromGroundMins: number | null; groundToStop: number; stopToStation: number };
  trains: Record<string, Train[]>;
}
export interface Plan { train: Train; leaveBy: number; last: boolean }

/** The trains a fan can catch after full time on this day by this mode: the
 * first `count` reachable trains, plus the last train in each direction. */
export function plan(data: FinderData, day: string, mode: Mode, count = 6): { fullTime: number | null; rows: Plan[] } {
  const ko = data.kickOff[day];
  const fullTime = ko == null ? null : ko + MATCH_LENGTH_MINS;
  const trains = [...(data.trains[day] ?? [])].sort((a, b) => serviceMinutes(a.time) - serviceMinutes(b.time));
  const busDeps = (data.bus.fromGround[day] ?? []).map(serviceMinutes);

  const leaveFor = (dep: number): number | null => {
    if (mode === 'road') return dep - data.walk.road - data.allowance;
    if (mode === 'towpath') return dep - data.walk.towpath - data.allowance;
    if (mode === 'taxi') return dep - data.driveMins - data.allowance;
    if (data.bus.fromGroundMins == null) return null;
    // The latest bus that still gets you to the platform in time.
    const bus = busDeps
      .filter((b) => b + data.bus.fromGroundMins! + data.bus.stopToStation + data.allowance <= dep)
      .sort((a, b) => b - a)[0];
    return bus == null ? null : bus - data.bus.groundToStop;
  };

  const reachable: Plan[] = [];
  for (const train of trains) {
    const leaveBy = leaveFor(serviceMinutes(train.time));
    if (leaveBy == null || (fullTime != null && leaveBy < fullTime)) continue;
    reachable.push({ train, leaveBy, last: false });
  }
  // By bus, one row per bus and direction: the first train each bus makes.
  // No last-train rows: the last bus is hours before the last train.
  if (mode === 'bus') {
    const seen = new Set<string>();
    const rows = reachable.filter((r) => {
      const key = `${r.leaveBy} ${r.train.direction}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { fullTime, rows: rows.slice(0, count) };
  }
  const rows = reachable.slice(0, count);
  for (const direction of new Set(trains.map((t) => t.direction))) {
    const lastOfDirection = reachable.filter((r) => r.train.direction === direction).at(-1);
    if (!lastOfDirection) continue;
    lastOfDirection.last = true;
    if (!rows.includes(lastOfDirection)) rows.push(lastOfDirection);
  }
  rows.sort((a, b) => serviceMinutes(a.train.time) - serviceMinutes(b.train.time));
  return { fullTime, rows };
}
