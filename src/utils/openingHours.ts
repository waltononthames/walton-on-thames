// Structured opening hours for the away guide's venues (plan 7.4). Pure, with
// no imports, so the same code runs at build time (the hours as text, and
// "open after a midweek match") and in the browser ("open now").
//
// Hours are one range per day, "HH:MM-HH:MM", as stored in
// src/content/away-guide/venues/*.yaml. A closing time at or before the
// opening time runs past midnight: "09:00-01:00" closes at 1am the next day.

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Hours = Record<Day, string>;
export const DAYS: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_NAMES: Record<Day, string> = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

function range(text: string): [number, number] {
  const [a, b] = text.split('-').map((t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; });
  return [a, b <= a ? b + 1440 : b];
}

/** Whether the venue is open at `mins` minutes after midnight on `day`,
 * including the tail of the previous day's late opening. */
export function isOpenAt(hours: Hours, day: Day, mins: number): boolean {
  const [o, c] = range(hours[day]);
  if (mins >= o && mins < c) return true;
  const prev = DAYS[(DAYS.indexOf(day) + 6) % 7];
  const [, pc] = range(hours[prev]);
  return pc > 1440 && mins < pc - 1440;
}

/** Now, in Europe/London, whatever the reader's device time zone. */
export function londonNow(date = new Date()): { day: Day; mins: number } {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = get('weekday').slice(0, 3).toLowerCase() as Day;
  return { day, mins: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}

const clock = (mins: number) => {
  const t = mins % 1440, h = Math.floor(t / 60), m = t % 60;
  if (t === 0) return 'midnight';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `.${String(m).padStart(2, '0')}` : ''}${h >= 12 ? 'pm' : 'am'}`;
};

/** "Monday to Thursday 12pm to 11pm; Friday 12pm to midnight; ..." with
 * consecutive days that share hours grouped together. */
export function hoursText(hours: Hours): string {
  const groups: { from: Day; to: Day; value: string }[] = [];
  for (const d of DAYS) {
    const last = groups.at(-1);
    if (last && last.value === hours[d]) last.to = d;
    else groups.push({ from: d, to: d, value: hours[d] });
  }
  return groups.map((g) => {
    const [o, c] = range(g.value);
    const span = DAYS.indexOf(g.to) - DAYS.indexOf(g.from);
    const days = span === 0 ? DAY_NAMES[g.from] : `${DAY_NAMES[g.from]} ${span === 1 ? 'and' : 'to'} ${DAY_NAMES[g.to]}`;
    return `${days} ${clock(o)} to ${clock(c)}`;
  }).join('; ');
}
