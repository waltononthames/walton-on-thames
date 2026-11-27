import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNotice } from './parse-notice.mjs';
const on = 'THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026';
const off = 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH OCTOBER 2026';
const page = (body) => `<main>${body}</main>`;
test('authoritative body wins over stale banner, ignores closing time', () => {
  const r = parseNotice(`<section class="announcement"><p>${on}</p></section>${page(`<h2>${off}</h2><p>The car boot is closed from 1pm.</p>`)}`);
  assert.equal(r.verdict, 'off');
  assert.equal(r.mainNotices.length, 1);
});
test('comments, attributes, scripts and hidden elements cannot provide a notice', () => {
  for (const body of [`<!-- <p>${on}</p> -->`, `<p title="${on}">Hello</p>`, `<script>${on}</script>`, `<div hidden><p>${on}</p></div>`, `<div class="announcement"><p>${on}</p></div>`]) {
    assert.equal(parseNotice(page(body)).verdict, 'unrecognised');
  }
});
test('inline formatting and entities preserve whole statement', () => {
  assert.equal(parseNotice(page('<p>THE&nbsp;CAR BOOT IS <strong>NOT OPEN</strong> THIS SUNDAY</p>')).verdict, 'off');
});
test('multiple notices, missing boundaries and changed structure fail closed', () => {
  assert.equal(parseNotice(page(`<p>${on}</p><p>${off}</p>`)).verdict, 'conflicting');
  assert.equal(parseNotice(page(`<p>${on}</p><p>${on}</p>`)).verdict, 'conflicting');
  assert.equal(parseNotice(`<main><p>${on}</p>`).verdict, 'unrecognised');
  assert.equal(parseNotice(page(`<div>${on}</div>`)).verdict, 'unrecognised');
});
test('challenge is blocked even with HTTP-success body', () => {
  assert.equal(parseNotice('<title>Just a moment...</title>').verdict, 'blocked');
});

// The closed-season notice, as published from November 2026: the season line
// and the return line are separate paragraphs, with a sign-off after them.
const season = '<h2>THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON.</h2><h2>WE WILL BE BACK IN MARCH 2027. THANK YOU ALL FOR YOUR CUSTOM.</h2><h2>SEE YOU NEXT YEAR!</h2>';
test('an end-of-season notice is recognised, with its return line', () => {
  const r = parseNotice(`<div class="announcement"><p>THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON. SEE YOU NEXT YEAR!</p></div>${page(season)}`);
  assert.equal(r.verdict, 'season-ended');
  assert.deepEqual(r.mainNotices.map(({ text }) => text), [
    'THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON.',
    'WE WILL BE BACK IN MARCH 2027. THANK YOU ALL FOR YOUR CUSTOM.',
  ]);
  assert.equal(parseNotice(page('<p>THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON.</p>')).verdict, 'season-ended');
});
test('an end-of-season notice alongside a weekly notice, or twice, fails closed', () => {
  assert.equal(parseNotice(page(`${season}<p>${on}</p>`)).verdict, 'conflicting');
  assert.equal(parseNotice(page(`${season}<p>THE CAR BOOT HAS FINISHED FOR THE 2025 SEASON.</p>`)).verdict, 'conflicting');
  assert.equal(parseNotice(page(`${season}<p>BACK IN APRIL 2027</p>`)).verdict, 'conflicting');
  assert.equal(parseNotice(`<div class="announcement"><p>THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON.</p></div><main></main>`).verdict, 'unrecognised');
});
