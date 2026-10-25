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
