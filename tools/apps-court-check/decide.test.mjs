import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, comingSundayISO } from './decide.mjs';
import { parseNotice } from './parse-notice.mjs';
const current = { status: 'on', headline: 'old', verifiedAt: '2026-10-18T03:00:00Z' };
const now = new Date('2026-10-24T18:00:00Z');
const check = (text, when = now) => decide({ parsed: parseNotice(`<main><p>${text}</p></main>`), now: when, current });
test('never fills in missing dates or rolls stale notices forward', () => {
  const before = JSON.stringify(current);
  for (const text of [
    'THE CAR BOOT IS OPEN THIS SUNDAY',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH',
    'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH OCTOBER',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 18TH OCTOBER 2026',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2025',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 31ST FEBRUARY 2026',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH NOVEMBER 2026',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026 UNLESS IT RAINS',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026 BUT CANCELLED',
    'THE CAR BOOT IS OPEN THIS SUNDAY THE 25ST OCTOBER 2026',
  ]) {
    const r = check(text);
    assert.equal(r.action, 'none', text);
    assert.equal(r.alert, true);
  }
  assert.equal(JSON.stringify(current), before);
});
test('full explicit date supports on/off without future extrapolation', () => {
  for (const [word, state] of [['OPEN', 'on'], ['NOT OPEN', 'off'], ['CLOSED', 'off']]) {
    const r = check(`THE CAR BOOT IS ${word} THIS SUNDAY THE 25TH OCTOBER 2026`);
    assert.equal(r.action, 'write');
    assert.equal(r.status.status, state);
    assert.equal(r.status.eventDateISO, '2026-10-25');
    assert.equal(r.status.nextConfirmedDateISO, state === 'on' ? '2026-10-25' : null);
    assert.equal(r.status.verifiedAt, now.toISOString());
    assert.ok(!r.status.headline.includes('this Sunday'));
  }
});
test('same-day recheck advances verification timestamp', () => {
  const text = 'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026';
  assert.notEqual(check(text).status.verifiedAt, check(text, new Date('2026-10-24T19:00:00Z')).status.verifiedAt);
});
test('London calendar across BST and GMT boundaries', () => {
  assert.equal(comingSundayISO(new Date('2026-07-18T23:30:00Z')), '2026-07-19');
  assert.equal(comingSundayISO(new Date('2026-10-25T00:30:00Z')), '2026-10-25');
  assert.equal(comingSundayISO(new Date('2026-10-26T00:30:00Z')), '2026-11-01');
});
