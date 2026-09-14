// Regression tests for src/utils/eventDates.ts. Run with `npm run test:events`.
// Needs Node 23.6 or later, which imports TypeScript directly. Deliberately
// not part of prebuild, so the Cloudflare build never depends on that.
//
// Cases come from real listings. The Pantoland and Walton Art Club cases are
// the two event defects in the 14 September 2026 accuracy audit (H1, H2).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatEventDate, formatEventTime, isMultiDay, isOvernight } from '../src/utils/eventDates.ts';

test('a run of performances is a date range with no invented time span (audit H1)', () => {
  const start = '2026-12-17T19:30:00';
  for (const end of ['2026-12-20', '2026-12-20T16:30:00']) {
    assert.equal(isMultiDay(start, end), true);
    assert.equal(formatEventDate(start, end), 'Thursday 17 – Sunday 20 December 2026');
    assert.equal(formatEventDate(start, end, 'short'), 'Thu 17 – Sun 20 December');
    assert.equal(formatEventDate(start, end, 'compact'), '17–20 Dec 2026');
    assert.equal(formatEventTime(start, end), null);
  }
});

test('a multi-day exhibition shows its end date, not just its opening day (audit H2)', () => {
  const start = '2026-09-11T09:00:00';
  const end = '2026-09-20T17:00:00';
  assert.equal(formatEventDate(start, end), 'Friday 11 – Sunday 20 September 2026');
  assert.equal(formatEventDate(start, end, 'short'), 'Fri 11 – Sun 20 September');
  assert.equal(formatEventTime(start, end), null);
});

test('a range crossing a month names both months', () => {
  const start = '2026-09-15T10:00:00';
  const end = '2026-10-06T16:00:00';
  assert.equal(formatEventDate(start, end), 'Tuesday 15 September – Tuesday 6 October 2026');
  assert.equal(formatEventDate(start, end, 'compact'), '15 Sept – 6 Oct 2026');
});

test('a range crossing a year names both years in long and compact styles', () => {
  const start = '2026-12-31T20:00:00';
  const end = '2027-01-02T01:00:00';
  assert.equal(isMultiDay(start, end), true);
  assert.equal(formatEventDate(start, end), 'Thursday 31 December 2026 – Saturday 2 January 2027');
  assert.equal(formatEventDate(start, end, 'compact'), '31 Dec 2026 – 2 Jan 2027');
  assert.equal(formatEventDate(start, end, 'short'), 'Thu 31 December – Sat 2 January');
});

test('two consecutive evenings are multi-day, not overnight', () => {
  const start = '2026-09-25T19:30:00';
  const end = '2026-09-26';
  assert.equal(isOvernight(start, end), false);
  assert.equal(formatEventDate(start, end), 'Friday 25 – Saturday 26 September 2026');
  assert.equal(formatEventTime(start, end), null);
});

test('a next-day finish later on the clock is multi-day', () => {
  assert.equal(isMultiDay('2026-09-12T10:00:00', '2026-09-13T18:00:00'), true);
});

test('an evening that runs past midnight stays one occasion on its start day', () => {
  const start = '2026-12-19T20:00:00';
  const end = '2026-12-20T01:00:00';
  assert.equal(isOvernight(start, end), true);
  assert.equal(isMultiDay(start, end), false);
  assert.equal(formatEventDate(start, end), 'Saturday 19 December 2026');
  assert.equal(formatEventTime(start, end), '20:00 – 01:00');
});

test('a single day with a published finish shows both times', () => {
  const start = '2026-09-19T10:00:00';
  const end = '2026-09-19T12:00:00';
  assert.equal(formatEventDate(start, end), 'Saturday 19 September 2026');
  assert.equal(formatEventDate(start, end, 'compact'), '19 Sept 2026');
  assert.equal(formatEventTime(start, end), '10:00 – 12:00');
});

test('no end, date-only, and equal start and end times', () => {
  assert.equal(formatEventDate('2026-10-04T15:00:00'), 'Sunday 4 October 2026');
  assert.equal(formatEventTime('2026-10-04T15:00:00'), '15:00');
  assert.equal(formatEventTime('2026-09-19'), null);
  assert.equal(formatEventTime('2026-09-19T19:30:00', '2026-09-19T19:30:00'), '19:30');
});

test('an unrecognised date fails loudly rather than rendering nonsense', () => {
  assert.throws(() => formatEventDate('19 September 2026'), /Unrecognised event date/);
});
