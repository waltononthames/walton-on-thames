// Tests for decide.mjs. Run with: node tools/apps-court-check/decide.test.mjs
//
// The cases that matter most are the refusals. Every one of them is a scenario
// where a plausible-looking guess would have put a wrong date, or a wrong
// on/off, on a public page -- which for a Sunday morning car boot means a
// wasted journey.

import { decide, comingSundayISO } from './decide.mjs';

let failures = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL  ${name}\n      expected ${JSON.stringify(expected)}\n      actual   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok    ${name}`);
  }
};

const current = {
  status: 'on',
  headline: 'On this Sunday, 18 October 2026',
  detail: 'something older',
  nextConfirmedDateISO: '2026-10-18',
  nextConfirmedDateLabel: 'Sunday 18 October 2026',
  checkedDateISO: '2026-10-18',
  checkedDateLabel: '18 October 2026',
  sourceLabel: 'Apps Court Farm: Car Boot page',
  sourceUrl: 'https://www.appscourtfarm.com/carboot',
  lastCheckSucceeded: true,
  lastCheckNote: 'older note',
};

const parsedOf = (verdict, text, day = null) => ({
  verdict,
  mainNotices: text ? [{ text }] : [],
  announcementNotices: [],
  otherNotices: [],
  ignoredNotices: [],
  bannerDayOfMonth: day,
  bannerMonth: null,
  notes: [],
});

// --- "this Sunday" ---------------------------------------------------------
// 24 October 2026 is a Saturday; 25 October is the Sunday the clocks go back.
check('Saturday resolves to tomorrow', comingSundayISO(new Date('2026-10-24T22:00:00Z')), '2026-10-25');
check('Sunday resolves to today', comingSundayISO(new Date('2026-10-25T09:00:00Z')), '2026-10-25');
check('Monday resolves to the next Sunday', comingSundayISO(new Date('2026-10-26T09:00:00Z')), '2026-11-01');
check('Wednesday resolves to the coming Sunday', comingSundayISO(new Date('2026-10-21T09:00:00Z')), '2026-10-25');
// During BST, 23:30 UTC is already the next day in London: the London
// calendar date must win, or the check is a day out every summer evening.
check('late-evening BST uses the London date', comingSundayISO(new Date('2026-07-18T23:30:00Z')), '2026-07-19');

// --- the refusals ----------------------------------------------------------
{
  const r = decide({ parsed: parsedOf('blocked'), now: new Date('2026-10-24T22:00:00Z'), current });
  check('blocked: writes nothing', r.action, 'none');
  check('blocked: alerts', r.alert, true);
}
{
  const r = decide({ parsed: parsedOf('unrecognised'), now: new Date('2026-10-24T22:00:00Z'), current });
  check('unrecognised: writes nothing', r.action, 'none');
  check('unrecognised: alerts', r.alert, true);
}
{
  const r = decide({ parsed: parsedOf('conflicting'), now: new Date('2026-10-24T22:00:00Z'), current });
  check('conflicting: writes nothing', r.action, 'none');
}
{
  // The banner's own date disagreeing with the calendar is the stale-notice
  // case: the farm left "THE 25TH" up into November. Refuse.
  const r = decide({
    parsed: parsedOf('on', 'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH', 25),
    now: new Date('2026-11-04T09:00:00Z'),
    current,
  });
  check('banner date disagreeing with the calendar: writes nothing', r.action, 'none');
  check('banner date disagreeing with the calendar: alerts', r.alert, true);
  check('banner date disagreeing: reason names both', /day 25 of the month/.test(r.reason) && /8 November 2026/.test(r.reason), true);
}
{
  const r = decide({ parsed: null, now: new Date('2026-10-24T22:00:00Z'), current });
  check('no parse result at all: writes nothing', r.action, 'none');
}

// --- the live situation: off for Sunday 25 October -------------------------
{
  const r = decide({
    parsed: parsedOf('off', 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH', 25),
    now: new Date('2026-10-24T22:00:00Z'),
    current,
    readVia: 'a residential-proxy fetch',
  });
  check('off: writes', r.action, 'write');
  check('off: status', r.status.status, 'off');
  check('off: headline', r.status.headline, 'Not on this Sunday, 25 October 2026');
  check('off: date cleared (ISO)', r.status.nextConfirmedDateISO, null);
  check('off: date cleared (label)', r.status.nextConfirmedDateLabel, null);
  check('off: check date refreshed', r.status.checkedDateISO, '2026-10-24');
  check('off: quotes the notice', /"THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH"/.test(r.status.detail), true);
  check('off: explains why the date was cleared', /EventScheduled/.test(r.status.lastCheckNote), true);
  check('off: records how it was read', /residential-proxy fetch/.test(r.status.lastCheckNote), true);
  check('off: preserves unrelated fields', r.status.sourceUrl, current.sourceUrl);
}

// --- on, including the clock change ---------------------------------------
{
  const r = decide({
    parsed: parsedOf('on', 'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH', 25),
    now: new Date('2026-10-24T22:00:00Z'),
    current,
  });
  check('on: writes', r.action, 'write');
  check('on: date set', r.status.nextConfirmedDateISO, '2026-10-25');
  check('on: label', r.status.nextConfirmedDateLabel, 'Sunday 25 October 2026');
  // 25 October 2026 is the day the clocks go back, which this page has had a
  // real bug from: readers are told explicitly.
  check('on, clock-change Sunday: warns about the clocks', /clocks change at 2am/.test(r.status.detail), true);
}
{
  // An ordinary Sunday must NOT carry the clocks warning.
  const r = decide({
    parsed: parsedOf('on', 'THE CAR BOOT IS OPEN THIS SUNDAY', null),
    now: new Date('2026-07-18T09:00:00Z'),
    current,
  });
  check('on, ordinary Sunday: no clocks warning', /clocks change/.test(r.status.detail), false);
  check('on, ordinary Sunday: date set', r.status.nextConfirmedDateISO, '2026-07-19');
}
{
  // No date in the banner: taken as the coming Sunday, and the note says so
  // rather than implying the farm stated it.
  const r = decide({
    parsed: parsedOf('on', 'THE CAR BOOT IS OPEN THIS SUNDAY', null),
    now: new Date('2026-10-21T09:00:00Z'),
    current,
  });
  check('undated banner: date inferred', r.status.nextConfirmedDateISO, '2026-10-25');
  check('undated banner: note is explicit about inferring', /carries no explicit date/.test(r.status.lastCheckNote), true);
}

// --- an unchanged conclusion is still written -----------------------------
{
  const alreadyOff = {
    ...current,
    status: 'off',
    headline: 'Not on this Sunday, 25 October 2026',
    nextConfirmedDateISO: null,
    nextConfirmedDateLabel: null,
    checkedDateISO: '2026-10-24',
  };
  const r = decide({
    parsed: parsedOf('off', 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH', 25),
    now: new Date('2026-10-24T23:30:00Z'),
    current: alreadyOff,
  });
  check('unchanged conclusion: still writes', r.action, 'write');
  check('unchanged conclusion: says so', /Conclusion unchanged/.test(r.reason), true);
  check('unchanged conclusion: status held', r.status.status, 'off');
}

console.log(failures === 0 ? '\nAll decision tests passed.' : `\n${failures} test(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
