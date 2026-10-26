import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, comingSundayISO } from './decide.mjs';
import { parseNotice } from './parse-notice.mjs';

const current = { status: 'on', headline: 'old', verifiedAt: '2026-10-18T03:00:00Z' };
// Saturday 24 October 2026, so the coming Sunday is the 25th.
const now = new Date('2026-10-24T18:00:00Z');
const check = (text, when = now) => decide({ parsed: parseNotice(`<main><p>${text}</p></main>`), now: when, current });

// The wordings the farm has actually published, over about a year of
// observation. An earlier version of decide.mjs required day + month name +
// year and therefore refused every one of these, including notices that were
// accurate and current, so the check could never succeed on real input. These
// three shapes are the contract.
test('the wordings the farm actually publishes are accepted', () => {
  const dated = check('THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH');
  assert.equal(dated.action, 'write');
  assert.equal(dated.status.status, 'off');
  assert.equal(dated.status.dateConfirmed, true);
  assert.equal(dated.status.eventDateISO, '2026-10-25');

  const undated = check('THE CAR BOOT IS OPEN THIS SUNDAY');
  assert.equal(undated.action, 'write');
  assert.equal(undated.status.status, 'on');
  assert.equal(undated.status.dateConfirmed, false);

  const notOpen = check('THE CAR BOOT IS NOT OPEN THIS SUNDAY');
  assert.equal(notOpen.action, 'write');
  assert.equal(notOpen.status.status, 'off');
});

// An undated notice is the farm's live position but cannot support a date.
// It has sat byte-identical for 36 days across four Sundays.
test('an undated notice publishes no date and no dated markup', () => {
  const r = check('THE CAR BOOT IS OPEN THIS SUNDAY');
  assert.equal(r.status.dateConfirmed, false);
  assert.equal(r.status.eventDateISO, null);
  assert.equal(r.status.nextConfirmedDateISO, null);
  assert.equal(r.status.nextConfirmedDateLabel, null);
  assert.match(r.status.detail, /does not say which Sunday/);
});

test('a confirmed open Sunday publishes its date; a confirmed closed one does not', () => {
  const on = check('THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH');
  assert.equal(on.status.nextConfirmedDateISO, '2026-10-25');
  // Cleared when off, so no downstream consumer can advertise a cancelled sale.
  const off = check('THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH');
  assert.equal(off.status.nextConfirmedDateISO, null);
  assert.equal(off.status.eventDateISO, '2026-10-25', 'the date is still recorded, for cancelled markup');
});

// The case that dogged the manual checks all autumn: the farm leaves a notice
// up after its Sunday has passed. The stated day must match the coming Sunday.
test('a notice whose stated date is not the coming Sunday is refused', () => {
  const before = JSON.stringify(current);
  for (const [text, when] of [
    // Monday 26 October: "THE 25TH" is yesterday, coming Sunday is 1 November.
    ['THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH', new Date('2026-10-26T09:00:00Z')],
    ['THE CAR BOOT IS OPEN THIS SUNDAY THE 18TH OCTOBER 2026', now],
    ['THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2025', now],
    ['THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH NOVEMBER 2026', now],
    ['THE CAR BOOT IS OPEN THIS SUNDAY THE 18TH', now],
  ]) {
    const r = check(text, when);
    assert.equal(r.action, 'none', text);
    // Whether this ALERTS depends on how long nothing has verified: see the
    // quiet-refusal test below. What matters here is that it never publishes.
    assert.ok(!r.status, text);
  }
  assert.equal(JSON.stringify(current), before, 'the caller\'s record must never be mutated');
});

test('malformed, impossible and qualified notices are refused', () => {
  for (const text of [
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 31ST FEBRUARY 2026',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25ST OCTOBER 2026',
    // Trailing qualifications change the meaning and must be read by a human.
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026 UNLESS IT RAINS',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026 BUT CANCELLED',
    'THE CAR BOOT IS OPEN THIS SUNDAY AND MONDAY',
  ]) {
    const r = check(text);
    assert.equal(r.action, 'none', text);
    assert.equal(r.alert, true, text);
  }
});

test('a fully spelled-out date is still accepted when it is the coming Sunday', () => {
  for (const [word, state] of [['OPEN', 'on'], ['NOT OPEN', 'off'], ['CLOSED', 'off']]) {
    const r = check(`THE CAR BOOT IS ${word} THIS SUNDAY THE 25TH OCTOBER 2026`);
    assert.equal(r.action, 'write');
    assert.equal(r.status.status, state);
    assert.equal(r.status.eventDateISO, '2026-10-25');
    assert.equal(r.status.verifiedAt, now.toISOString());
  }
});

// If checking ever stops, a dated headline goes stale visibly rather than
// silently: "this Sunday" would become a lie, an explicit date just gets old.
test('a dated headline names the date rather than saying "this Sunday"', () => {
  const r = check('THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH');
  assert.match(r.status.headline, /Sunday 25 October 2026/);
  assert.ok(!/this Sunday/i.test(r.status.headline));
});

// CLAUDE.md Rule 3: never ship a sentence about our own verification state as
// reader-facing prose.
test('reader-facing prose carries no verification machinery', () => {
  for (const text of ['THE CAR BOOT IS OPEN THIS SUNDAY', 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH']) {
    const { status } = check(text);
    for (const phrase of ['suitable for automatic confirmation', 'fully dated notice', 'not yet verified', 'parsed verdict']) {
      assert.ok(!status.headline.includes(phrase) && !status.detail.includes(phrase), `${phrase} in ${text}`);
    }
    assert.match(status.detail, /01932 244 822/, 'readers are always given the recorded-message number');
  }
});

test('a blocked or unreadable source changes nothing', () => {
  for (const parsed of [null, { verdict: 'blocked', mainNotices: [], notes: [] }, { verdict: 'unrecognised', mainNotices: [], notes: [] }]) {
    const r = decide({ parsed, now, current });
    assert.equal(r.action, 'none');
    assert.equal(r.alert, true);
  }
});

test('same-day recheck advances the verification timestamp', () => {
  const text = 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH';
  assert.notEqual(check(text).status.verifiedAt, check(text, new Date('2026-10-24T19:00:00Z')).status.verifiedAt);
});

test('London calendar across BST and GMT boundaries', () => {
  // During BST, 23:30 UTC is already the next day in London.
  assert.equal(comingSundayISO(new Date('2026-07-18T23:30:00Z')), '2026-07-19');
  assert.equal(comingSundayISO(new Date('2026-10-25T00:30:00Z')), '2026-10-25');
  assert.equal(comingSundayISO(new Date('2026-10-26T00:30:00Z')), '2026-11-01');
});

// The farm habitually leaves last Sunday's notice up for days. Alerting on
// that would email a failure twice a day, most weekdays, for ever, and train
// the reader to ignore the alerts that matter. It escalates only once nothing
// has been verified for an unexpectedly long time.
test('a routinely stale notice refuses quietly, but escalates when nothing verifies for long enough', () => {
  const monday = new Date('2026-10-26T09:00:00Z');
  const text = 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH';

  const recent = decide({
    parsed: parseNotice(`<main><p>${text}</p></main>`),
    now: monday,
    current: { ...current, verifiedAt: '2026-10-24T18:00:00Z' },
  });
  assert.equal(recent.action, 'none');
  assert.equal(recent.alert, false, 'two days without a reading is normal');

  const longQuiet = decide({
    parsed: parseNotice(`<main><p>${text}</p></main>`),
    now: monday,
    current: { ...current, verifiedAt: '2026-10-01T18:00:00Z' },
  });
  assert.equal(longQuiet.action, 'none');
  assert.equal(longQuiet.alert, true, '25 days without a reading is a fault worth reporting');
  assert.match(longQuiet.reason, /longer than expected/);

  // Never verified at all is also worth reporting.
  const never = decide({ parsed: parseNotice(`<main><p>${text}</p></main>`), now: monday, current: {} });
  assert.equal(never.alert, true);
});

// Anomalies are never quiet: these mean something has actually changed or
// broken, and are actionable.
test('unreadable, unrecognised and malformed notices always alert', () => {
  const now2 = new Date('2026-10-24T18:00:00Z');
  const fresh = { ...current, verifiedAt: '2026-10-24T06:00:00Z' };
  assert.equal(decide({ parsed: { verdict: 'blocked', mainNotices: [], notes: [] }, now: now2, current: fresh }).alert, true);
  assert.equal(decide({ parsed: { verdict: 'unrecognised', mainNotices: [], notes: [] }, now: now2, current: fresh }).alert, true);
  assert.equal(decide({ parsed: parseNotice('<main><p>THE CAR BOOT IS OPEN THIS SUNDAY UNLESS WET</p></main>'), now: now2, current: fresh }).alert, true);
});
