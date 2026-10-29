// Turns a parsed notice into either a new status record or a refusal.
// Pure: no I/O, and the clock is passed in, so every rule below is testable.
//
// THE RULE THAT MATTERS, and the one this file previously got wrong.
//
// An earlier version required the notice to state day, month name AND year
// ("...SUNDAY THE 25TH OCTOBER 2026"). The farm has never published that. In a
// year of observation it publishes exactly three shapes:
//
//   THE CAR BOOT IS OPEN THIS SUNDAY
//   THE CAR BOOT IS NOT OPEN THIS SUNDAY
//   THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH
//
// So that rule refused 100% of real input, including notices that were
// accurate and current, and the check could never succeed. Demanding a format
// the source does not produce is not caution; it is a system that never works
// while appearing principled.
//
// What actually separates a trustworthy notice from a stale one is whether the
// farm's stated day of the month matches the Sunday we are about to publish:
//
//   Dated, and the day matches the coming Sunday  -> publish, date confirmed.
//   Dated, and the day does NOT match             -> refuse. The notice is
//                                                    stale or about another
//                                                    Sunday. (This is the case
//                                                    that dogged the manual
//                                                    checks all autumn: the
//                                                    farm left "THE 25TH" up
//                                                    after the 25th had gone.)
//   Undated                                       -> publish what the farm
//                                                    currently says, but
//                                                    assert NO date: no
//                                                    confirmed date, no dated
//                                                    structured data. The page
//                                                    reports the notice as the
//                                                    farm's current wording
//                                                    and tells the reader to
//                                                    confirm before travelling.
//
// That last branch is the compromise. An undated "THIS SUNDAY" has sat
// byte-identical for 36 days across four Sundays, so it cannot support a date
// claim. But it is still the farm's live published position, and refusing to
// show it leaves the page less useful than the source it summarises.

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const londonDate = (now) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(now);

// "This Sunday" is today when today is Sunday, else the next one. Resolved on
// the London calendar date: during BST a UTC timestamp after 23:00 is already
// tomorrow in London, which would put the whole check a day out every summer
// evening.
export const comingSundayISO = (now) => {
  const day = new Date(`${londonDate(now)}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + ((7 - day.getUTCDay()) % 7));
  return day.toISOString().slice(0, 10);
};

const longLabel = (iso) => new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(`${iso}T12:00:00Z`)).replace(',', '');

const shortLabel = (iso) => new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(`${iso}T12:00:00Z`));

const refuse = (reason) => ({ action: 'none', alert: true, reason });

// How long a run of refusals may continue before it is worth telling a human.
// The farm routinely leaves last week's notice up until Friday, so a stale
// notice on a Tuesday is the normal course of business, not a fault: alerting
// on it would mean a failure email twice a day, most weekdays, for ever, which
// trains the reader to ignore the alerts that DO matter. Past this many days
// without a single successful reading, something has actually gone wrong --
// the farm has stopped posting, or changed the wording, or the fetch route has
// quietly died -- and that is worth knowing.
const QUIET_REFUSAL_DAYS = 10;

// A refusal that is expected rather than anomalous. Reported either way; it
// only escalates to an alert once nothing has been verified for a while.
const refuseQuietly = (reason, current, now) => {
  // verifiedAt is the precise timestamp; checkedDateISO is the older field and
  // carries the same information a day at a time, so a record written before
  // verifiedAt existed still ages correctly instead of looking infinitely old.
  const last = Date.parse(current?.verifiedAt ?? '')
    || Date.parse(current?.checkedDateISO ? `${current.checkedDateISO}T12:00:00Z` : '');
  const daysSince = Number.isFinite(last) ? (now.getTime() - last) / 86_400_000 : null;
  const overdue = daysSince === null || daysSince > QUIET_REFUSAL_DAYS;
  if (!overdue) return { action: 'none', alert: false, reason };
  const howLong = daysSince === null
    ? 'There is no record of a previous successful reading'
    : `Nothing has been verified for ${Math.floor(daysSince)} days, which is longer than expected`;
  return {
    action: 'none',
    alert: true,
    reason: `${reason} ${howLong}: check whether the farm has changed how it publishes the notice.`,
  };
};

// Anchored at both ends so unknown trailing qualifications ("...BUT OPEN ON
// MONDAY", a second date) fall through to a refusal rather than being read as
// a plain notice. Day, month and year are each optional, because the farm
// supplies them inconsistently.
const NOTICE_RE = new RegExp(
  '^(?:THE\\s+)?CAR\\s+BOOT\\s+IS\\s+(OPEN|NOT\\s+OPEN|CLOSED)'
  + '(?:\\s+(?:THIS|ON))?\\s+SUNDAY'
  + '(?:\\s+(?:THE\\s+)?(\\d{1,2})\\s*(ST|ND|RD|TH)?(?:\\s+OF)?'
  + `(?:\\s+(${MONTHS.join('|')}))?(?:\\s+(\\d{4}))?)?`
  + '\\s*[.!]?$',
  'i',
);

const ordinalFor = (day) =>
  (day % 100 >= 11 && day % 100 <= 13) ? 'TH' : ({ 1: 'ST', 2: 'ND', 3: 'RD' }[day % 10] ?? 'TH');

export function decide({ parsed, now, current, readVia = 'a direct fetch' }) {
  if (!parsed || !['on', 'off'].includes(parsed.verdict) || parsed.mainNotices.length !== 1) {
    return refuse(`No single unambiguous notice in the authoritative block (${parsed?.verdict ?? 'missing'}). Nothing changed.`);
  }

  const notice = parsed.mainNotices[0].text;
  const match = notice.match(NOTICE_RE);
  if (!match) {
    return refuse(`The notice is not in a form this check understands: ${JSON.stringify(notice)}. Nothing changed.`);
  }

  const [, wordingRaw, dayText, suffix, monthText, yearText] = match;
  const wording = wordingRaw.toUpperCase().replace(/\s+/g, ' ');
  const state = wording === 'OPEN' ? 'on' : 'off';
  if (state !== parsed.verdict) return refuse('The notice wording and the parsed verdict disagree. Nothing changed.');

  const sundayISO = comingSundayISO(now);
  let dateConfirmed = false;

  if (dayText !== undefined) {
    const day = Number(dayText);
    if (suffix && suffix.toUpperCase() !== ordinalFor(day)) {
      return refuse(`The notice's ordinal does not match its number (${dayText}${suffix}). Nothing changed.`);
    }

    // Month and year are used when the farm gives them, and otherwise taken
    // from the Sunday we are testing against. Either way the result must BE
    // that Sunday, so an absent month can never widen what is accepted.
    const month = monthText ? MONTHS.indexOf(monthText.toUpperCase()) + 1 : Number(sundayISO.slice(5, 7));
    const year = yearText ? Number(yearText) : Number(sundayISO.slice(0, 4));
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const date = new Date(`${iso}T12:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
      return refuse(`The notice states a date that does not exist (${iso}). Nothing changed.`);
    }
    if (iso !== sundayISO) {
      // Describe only what the farm actually wrote. When it gave a bare day,
      // the month and year above were inferred from the Sunday being tested,
      // so naming a full date here would attribute to the farm a date it
      // never stated -- the precise kind of invented specificity this check
      // exists to prevent.
      const stated = monthText
        ? longLabel(iso)
        : `day ${day} of the month`;
      // Quiet: the farm habitually leaves the previous Sunday's notice up for
      // several days before reposting. The page shows the age of its last
      // reading, so readers are not misled while this waits.
      return refuseQuietly(
        `The notice names ${stated} but the coming Sunday is ${longLabel(sundayISO)}. `
        + 'The notice is stale or concerns another Sunday. Nothing changed.',
        current,
        now,
      );
    }
    dateConfirmed = true;
  }

  const verifiedAt = now.toISOString();
  const checkedLabel = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(now);

  // Reader-facing wording. No machinery: a resident wants to know whether to
  // load the car, not how the verification pipeline classified the notice.
  // A dated headline names the date and avoids "this Sunday": if checking ever
  // stops, "this Sunday" silently becomes a lie while an explicit date merely
  // becomes old, which the panel's own staleness notice then explains. An
  // undated headline is reported speech, attributed to the farm, so the
  // relative phrasing is theirs rather than ours.
  const headline = dateConfirmed
    ? (state === 'on'
      ? `Going ahead on ${longLabel(sundayISO)}`
      : `Not taking place on ${longLabel(sundayISO)}`)
    : (state === 'on'
      ? 'Apps Court Farm says the sale is on this Sunday'
      : 'Apps Court Farm says the sale is not on this Sunday');

  const practical = state === 'on'
    ? 'Gates open at 7am for sellers and buyers and the sale closes at 1pm. Sellers turn up without booking; buyers pay £2 per vehicle to park, collected on the way out.'
    : 'The farm gives no reason for the call-off and says nothing about later Sundays.';

  const caution = dateConfirmed
    ? 'Sales are weather dependent and can be called off at short notice, so it is worth a last look at the farm\'s page before you set off. You can also call 01932 244 822 for a recorded message.'
    : 'Please confirm on the Apps Court page or by calling 01932 244822 before travelling.';

  const status = {
    ...current,
    $schema: 'Last successfully verified notice. Failed attempts are reported outside this file and never advance verifiedAt.',
    status: state,
    headline,
    detail: `Apps Court Farm's car boot page says "${notice}". ${practical} ${caution}`,
    noticeText: notice,
    // True only when the farm itself stated the day and it matched the Sunday
    // being published. Everything date-shaped downstream keys off this.
    dateConfirmed,
    eventDateISO: dateConfirmed ? sundayISO : null,
    verifiedAt,
    nextConfirmedDateISO: dateConfirmed && state === 'on' ? sundayISO : null,
    nextConfirmedDateLabel: dateConfirmed && state === 'on' ? longLabel(sundayISO) : null,
    checkedDateISO: londonDate(now),
    checkedDateLabel: checkedLabel,
    sourceLabel: 'Apps Court Farm: Car Boot page',
    sourceUrl: 'https://www.appscourtfarm.com/carboot',
    lastCheckSucceeded: true,
    lastCheckNote: dateConfirmed
      ? `Verified ${verifiedAt} via ${readVia}. The notice names day ${Number(dayText)}, which matches the coming Sunday, ${longLabel(sundayISO)}. Authoritative notice: ${notice}`
      : `Verified ${verifiedAt} via ${readVia}. The notice carries no date, so no date is published and no dated structured data is emitted. Authoritative notice: ${notice}`,
  };

  return {
    action: 'write',
    alert: false,
    status,
    changed: Object.keys(status).filter((key) => JSON.stringify(status[key]) !== JSON.stringify(current?.[key])),
    reason: dateConfirmed
      ? `Verified dated notice for ${longLabel(sundayISO)}: ${state}.`
      : `Recorded the farm's undated notice (${state}); no date published.`,
  };
}
