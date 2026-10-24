// Turns a parsed notice into either a new src/data/apps-court-status.json or a
// refusal to change anything. Pure: no I/O, no clock of its own (the caller
// passes `now`), so it is fully testable and runs wherever the check runs.
//
// The governing rule is that a wrong "on" is worse than a stale page. It sends
// someone to a field on a Sunday morning for nothing. So every uncertain
// outcome resolves to "change nothing and say why", never to a guess. This
// mirrors the standing instruction for the manual check: if the source does
// not state it, do not write it, and never roll a lapsed date forward to the
// next Sunday just because an old notice is still up.

const DAY_MS = 86_400_000;

const londonFields = (date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return {
    iso: `${get('year')}-${get('month')}-${get('day')}`,
    weekday: get('weekday'),
    hour: Number(get('hour')) % 24,
  };
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// "This Sunday" means today when it is Sunday, otherwise the next one. Worked
// out in London terms, because a UTC date can be a day behind during BST.
export const comingSundayISO = (now) => {
  const { iso, weekday } = londonFields(now);
  const idx = WEEKDAYS.indexOf(weekday);
  const ahead = idx === -1 ? 0 : (7 - idx) % 7;
  if (ahead === 0) return iso;
  // Step in UTC from the London calendar date at midday, so a BST boundary
  // cannot shunt the result into the wrong day.
  const base = new Date(`${iso}T12:00:00Z`);
  return londonFields(new Date(base.getTime() + ahead * DAY_MS)).iso;
};

// The comma Intl puts after the weekday is stripped: the existing status file
// and the page's own prose both read "Sunday 25 October 2026".
const longDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(new Date(`${iso}T12:00:00Z`))
    .replace(',', '');

const shortDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00Z`));

const dayOfMonth = (iso) => Number(iso.slice(8, 10));

// True when the clocks change on this date, which for a 7am-1pm sale means the
// page's own structured data would otherwise advertise the wrong start time.
// The page derives its offsets correctly now, but readers still need telling.
const clocksChangeOn = (iso) => {
  const offsetAt = (when) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', timeZoneName: 'longOffset' })
      .formatToParts(when)
      .find((p) => p.type === 'timeZoneName').value;
  const dayBefore = offsetAt(new Date(`${iso}T00:00:00Z`));
  const sameDay = offsetAt(new Date(`${iso}T23:00:00Z`));
  return dayBefore !== sameDay;
};

const PRACTICAL = {
  on: (iso) =>
    `Gates open at 7am for both sellers and buyers and the sale closes at 1pm.` +
    (clocksChangeOn(iso) ? ' Note that the clocks change at 2am that morning, so set off by the new time.' : '') +
    ` Sellers just turn up and are directed where to set up, with the pitch fee collected afterwards; buyers pay £2 per vehicle to park, collected on the way out to keep the entrance clear.` +
    ` Sales are weather dependent and the farm posts any bad-weather postponement at the top of its own car boot page, so it is worth a last look before you set off; you can also call 01932 244 822 for a recorded message confirming whether the sale is taking place.`,
  off: () =>
    `The farm gives no reason for the call-off and has not said anything about the Sundays after it, so do not assume the sale is either off or on beyond this date.` +
    ` Sales are weather dependent and the farm posts each week's notice at the top of its own car boot page, so check there before setting off; you can also call 01932 244 822 for a recorded message confirming whether a sale is taking place.` +
    ` Note too that the farm's own FAQ limits the season to "every Sunday from early March, through to the Autumn", so late-autumn and winter Sundays are not guaranteed even in good weather.`,
};

/**
 * @param {object} args
 * @param {object} args.parsed   result of parseNotice()
 * @param {Date}   args.now
 * @param {object} args.current  the existing apps-court-status.json contents
 * @param {string} args.readVia  how the page was fetched, for the audit note
 * @returns {{action: 'write'|'none', reason: string, alert: boolean, status?: object, changed?: string[]}}
 */
export function decide({ parsed, now, current, readVia = 'a direct fetch' }) {
  const checkedISO = londonFields(now).iso;
  const checkedLabel = shortDate(checkedISO);
  const whenLabel = longDate(checkedISO);

  // --- the refusals ---------------------------------------------------------
  if (!parsed || parsed.verdict === 'blocked') {
    return {
      action: 'none',
      alert: true,
      reason:
        'The source could not be read: a Cloudflare challenge was returned instead of the page. ' +
        'The status file is left exactly as it is rather than overwritten with a guess.',
    };
  }
  if (parsed.verdict === 'unrecognised') {
    return {
      action: 'none',
      alert: true,
      reason:
        'The page was read but carried no notice inside <main> in the known wording ' +
        '("IS OPEN", "IS NOT OPEN", "IS CLOSED" with a day). Nothing may be concluded, so nothing was changed. ' +
        `Notes: ${JSON.stringify(parsed.notes ?? [])}`,
    };
  }
  if (parsed.verdict === 'conflicting') {
    return {
      action: 'none',
      alert: true,
      reason:
        'The page carried more than one differing notice inside <main>, which is not something to pick between. ' +
        `Notes: ${JSON.stringify(parsed.notes ?? [])}`,
    };
  }
  if (parsed.verdict !== 'on' && parsed.verdict !== 'off') {
    return { action: 'none', alert: true, reason: `Unknown verdict ${JSON.stringify(parsed.verdict)}.` };
  }

  const targetISO = comingSundayISO(now);

  // The notice names its own date more often than not now. When it does, it
  // must agree with the calendar: a banner reading "THE 25TH" when the coming
  // Sunday is the 1st is either stale or about some other date, and either way
  // is not something to publish.
  if (parsed.bannerDayOfMonth !== null && parsed.bannerDayOfMonth !== undefined) {
    if (parsed.bannerDayOfMonth !== dayOfMonth(targetISO)) {
      return {
        action: 'none',
        alert: true,
        reason:
          `The notice names day ${parsed.bannerDayOfMonth} of the month but the coming Sunday is ` +
          `${longDate(targetISO)}. The two disagree, so the notice is stale or refers to another date ` +
          'and nothing was changed.',
      };
    }
  }

  // --- the write ------------------------------------------------------------
  const isOn = parsed.verdict === 'on';
  const noticeText = parsed.mainNotices?.[0]?.text ?? '';
  const datedByFarm = parsed.bannerDayOfMonth !== null && parsed.bannerDayOfMonth !== undefined;

  const status = {
    ...current,
    status: isOn ? 'on' : 'off',
    headline: isOn ? `On this Sunday, ${shortDate(targetISO)}` : `Not on this Sunday, ${shortDate(targetISO)}`,
    detail: isOn
      ? `Apps Court Farm's car boot page says "${noticeText}", so the sale is going ahead on ${longDate(targetISO)}. ${PRACTICAL.on(targetISO)}`
      : `Apps Court Farm's car boot page says "${noticeText}", so there is no sale on ${longDate(targetISO)}. ${PRACTICAL.off()}`,
    // Cleared when off: the page's structured-data sub-event is emitted for a
    // date whatever the status and hardcodes EventScheduled, so keeping the
    // date here would publish a cancelled sale as a scheduled one.
    nextConfirmedDateISO: isOn ? targetISO : null,
    nextConfirmedDateLabel: isOn ? longDate(targetISO) : null,
    checkedDateISO: checkedISO,
    checkedDateLabel: checkedLabel,
    lastCheckSucceeded: true,
    lastCheckNote:
      `Source read successfully on ${whenLabel} via ${readVia}. The notice block inside <main> reads ` +
      `"${noticeText}", which ${datedByFarm
        ? `names day ${parsed.bannerDayOfMonth} of the month and agrees with the coming Sunday, ${longDate(targetISO)}`
        : `carries no explicit date, so it is taken to mean the coming Sunday, ${longDate(targetISO)}`}. ` +
      (isOn
        ? 'There is no postponement or cancellation notice anywhere on the page.'
        : 'nextConfirmedDateISO and nextConfirmedDateLabel are cleared rather than kept: the page\'s structured-data sub-event hardcodes eventStatus EventScheduled, so keeping the date would publish a cancelled sale as a scheduled one.') +
      ` The verdict comes from the <main> notice alone; the site-wide section.announcement strip is never relied on, as it is a stale reusable element that has previously advertised an open sale while linking to a 2025 shop product.` +
      (parsed.notes?.length ? ` Parser notes: ${JSON.stringify(parsed.notes)}` : '') +
      ' Written by the automated twice-daily check.',
  };

  const watched = [
    'status', 'headline', 'detail', 'nextConfirmedDateISO',
    'nextConfirmedDateLabel', 'checkedDateISO', 'lastCheckSucceeded',
  ];
  const changed = watched.filter((k) => JSON.stringify(current?.[k]) !== JSON.stringify(status[k]));
  const substantive = changed.filter((k) => k !== 'checkedDateISO' && k !== 'detail' && k !== 'headline');

  return {
    action: 'write',
    alert: false,
    status,
    changed,
    // A refreshed check date is information in its own right: it lets a reader
    // tell a standing "no sale this week" from a page nobody has looked at for
    // a fortnight. So an unchanged conclusion is still written.
    reason: substantive.length
      ? `Status is now "${status.status}" for ${longDate(targetISO)} (changed: ${substantive.join(', ')}).`
      : `Conclusion unchanged ("${status.status}"); the check date was refreshed to ${checkedLabel}.`,
  };
}
