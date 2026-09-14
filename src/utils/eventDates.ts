// Display helpers for event dates, shared by the event page and EventCard.
//
// Everything works on the raw ISO strings from the content files, never on
// Date objects, so a displayed day or time cannot shift with the build
// machine's time zone. A raw value without a "T" carries no clock time.
//
// Three shapes of event, which the display must not collapse into one:
//   single day  "2026-09-19T10:00:00" to "2026-09-19T12:00:00"
//   overnight   "2026-12-19T20:00:00" to "2026-12-20T01:00:00": one occasion
//               running past midnight, shown on its start day with times
//   multi-day   "2026-12-17T19:30:00" to "2026-12-20": an exhibition or a run
//               of performances, shown as a date range with no single
//               start-to-finish time, because no such interval exists

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// long:    "Thursday 17 December 2026", for the event page
// short:   "Thu 17 December", for cards, which never need the year
// compact: "17 Dec 2026", for the title tag
export type EventDateStyle = 'long' | 'short' | 'compact';

interface EventDateParts {
  year: number;
  month: number;
  day: number;
  weekday: number;
  time: string | null;
}

export function parseEventDate(raw: string): EventDateParts {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(raw);
  if (!m) throw new Error(`Unrecognised event date "${raw}"`);
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  return {
    year,
    month,
    day,
    weekday: new Date(Date.UTC(year, month - 1, day)).getUTCDay(),
    time: m[4] ? `${m[4]}:${m[5]}` : null,
  };
}

// Ends on the following calendar day, earlier on the clock than it started.
export function isOvernight(start: string, end?: string | null): boolean {
  if (!end) return false;
  const s = parseEventDate(start);
  const e = parseEventDate(end);
  if (!s.time || !e.time) return false;
  const next = new Date(Date.UTC(s.year, s.month - 1, s.day + 1));
  return e.year === next.getUTCFullYear()
    && e.month === next.getUTCMonth() + 1
    && e.day === next.getUTCDate()
    && e.time < s.time;
}

export function isMultiDay(start: string, end?: string | null): boolean {
  return !!end && end.slice(0, 10) > start.slice(0, 10) && !isOvernight(start, end);
}

function dayAndMonth(p: EventDateParts, style: EventDateStyle): string {
  if (style === 'compact') return `${p.day} ${MONTHS_SHORT[p.month - 1]}`;
  const weekday = style === 'long' ? WEEKDAYS[p.weekday] : WEEKDAYS_SHORT[p.weekday];
  return `${weekday} ${p.day} ${MONTHS[p.month - 1]}`;
}

export function formatEventDate(start: string, end?: string | null, style: EventDateStyle = 'long'): string {
  const s = parseEventDate(start);
  const withYear = style !== 'short';

  if (!end || !isMultiDay(start, end)) {
    return withYear ? `${dayAndMonth(s, style)} ${s.year}` : dayAndMonth(s, style);
  }

  const e = parseEventDate(end);

  if (s.year !== e.year) {
    return withYear
      ? `${dayAndMonth(s, style)} ${s.year} – ${dayAndMonth(e, style)} ${e.year}`
      : `${dayAndMonth(s, style)} – ${dayAndMonth(e, style)}`;
  }

  if (s.month !== e.month) {
    const range = `${dayAndMonth(s, style)} – ${dayAndMonth(e, style)}`;
    return withYear ? `${range} ${s.year}` : range;
  }

  // Same month: name it once, after the second day.
  if (style === 'compact') return `${s.day}–${e.day} ${MONTHS_SHORT[s.month - 1]} ${s.year}`;
  const wd = style === 'long' ? WEEKDAYS : WEEKDAYS_SHORT;
  const range = `${wd[s.weekday]} ${s.day} – ${wd[e.weekday]} ${e.day} ${MONTHS[s.month - 1]}`;
  return withYear ? `${range} ${s.year}` : range;
}

// Null for a multi-day event: its times belong to each day or performance,
// which the event's own copy lists, not to one span across the whole run.
export function formatEventTime(start: string, end?: string | null): string | null {
  if (isMultiDay(start, end)) return null;
  const s = parseEventDate(start).time;
  if (!s) return null;
  const e = end ? parseEventDate(end).time : null;
  return e && e !== s ? `${s} – ${e}` : s;
}
