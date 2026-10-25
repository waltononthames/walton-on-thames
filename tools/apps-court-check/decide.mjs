// A successful HTTP read is not proof that an undated notice applies now.
// Only a complete date in the authoritative notice can support publication.
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const londonDate = (now) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(now);
export const comingSundayISO = (now) => {
  const day = new Date(`${londonDate(now)}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + (7 - day.getUTCDay()) % 7);
  return day.toISOString().slice(0, 10);
};
const refuse = (reason) => ({ action: 'none', alert: true, reason });

export function decide({ parsed, now, current, readVia = 'a direct fetch' }) {
  if (!parsed || !['on', 'off'].includes(parsed.verdict) || parsed.mainNotices.length !== 1) {
    return refuse(`No unambiguous authoritative notice (${parsed?.verdict ?? 'missing'}). Nothing changed.`);
  }
  const notice = parsed.mainNotices[0].text;
  // Anchor the complete statement. Unknown qualifications and second dates
  // require review; accepting a familiar prefix is unsafe.
  const match = notice.match(/^(?:THE )?CAR BOOT IS (OPEN|NOT OPEN|CLOSED) (?:THIS |ON )?SUNDAY(?: THE)? (\d{1,2})(ST|ND|RD|TH)?(?: OF)? ([A-Z]+) (\d{4})[.!]?$/i);
  if (!match) return refuse('Notice does not state a complete supported Sunday date and decision. Nothing changed.');
  const [, wording, dayText, suffix, monthText, year] = match;
  const day = Number(dayText);
  const ordinal = day % 100 >= 11 && day % 100 <= 13 ? 'TH' : ({ 1: 'ST', 2: 'ND', 3: 'RD' }[day % 10] ?? 'TH');
  if (suffix && suffix.toUpperCase() !== ordinal) return refuse('Invalid ordinal date. Nothing changed.');
  const month = MONTHS.indexOf(monthText.toUpperCase()) + 1;
  const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const date = new Date(`${iso}T12:00:00Z`);
  if (!month || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso || date.getUTCDay() !== 0) {
    return refuse('Invalid date or weekday mismatch. Nothing changed.');
  }
  // This page answers the current/coming Sunday, not a different occurrence.
  if (iso !== comingSundayISO(now)) return refuse('Notice is stale or concerns another Sunday. Nothing changed.');
  const state = wording.toUpperCase() === 'OPEN' ? 'on' : 'off';
  if (state !== parsed.verdict) return refuse('Conflicting decision. Nothing changed.');
  const label = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date).replace(',', '');
  const verifiedAt = now.toISOString();
  const checkedLabel = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(now);
  const status = {
    ...current,
    $schema: 'Last successfully verified notice. Failed attempts are reported outside this file and never advance verifiedAt.',
    status: state,
    headline: `Last verified notice: ${state === 'on' ? 'open' : 'closed'} for ${label}`,
    detail: `Apps Court Farm stated: "${notice}". This records the notice at the verification time below. Check the official page before travelling; later changes may not be reflected here. This notice does not confirm any other date.`,
    eventDateISO: iso,
    noticeText: notice,
    verifiedAt,
    nextConfirmedDateISO: state === 'on' ? iso : null,
    nextConfirmedDateLabel: state === 'on' ? label : null,
    checkedDateISO: londonDate(now),
    checkedDateLabel: checkedLabel,
    sourceLabel: 'Apps Court Farm: Car Boot page',
    sourceUrl: 'https://www.appscourtfarm.com/carboot',
    lastCheckSucceeded: true,
    lastCheckNote: `Verified ${verifiedAt} via ${readVia}. Authoritative notice: ${notice}`,
  };
  return { action: 'write', alert: false, status,
    changed: Object.keys(status).filter((key) => JSON.stringify(status[key]) !== JSON.stringify(current[key])),
    reason: `Verified explicit notice for ${label}.` };
}
