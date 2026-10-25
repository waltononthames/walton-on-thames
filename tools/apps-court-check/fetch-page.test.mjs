import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchPage } from './fetch-page.mjs';
const now = Date.parse('2026-10-25T04:00:00Z');
const body = '<main><p>THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH OCTOBER 2026</p></main>';
const run = (status = 200, headers = '', responseBody = body) => fetchPage({ now: () => now,
  execute: async () => ({ stdout: `HTTP/1.1 ${status} Response\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\n${headers}\r\n${responseBody}\n${status}` }) });
test('non-200 bodies cannot become verification evidence', async () => {
  for (const status of [301, 403, 429, 500]) assert.equal((await run(status)).ok, false);
});
test('cached HTML is rejected', async () => {
  for (const headers of ['Age: 600\r\n', 'CF-Cache-Status: HIT\r\n', 'CF-Cache-Status: STALE\r\n']) {
    assert.equal((await run(200, headers)).ok, false);
  }
});
test('fresh direct response accepted without pretending notice itself is fresh', async () => {
  assert.equal((await run()).html, body);
});
test('partial body on timeout is never accepted', async () => {
  const result = await fetchPage({ execute: async () => { throw Object.assign(new Error('timeout'), { stdout: body }); } });
  assert.equal(result.ok, false);
  assert.equal(result.html, null);
});
test('stale response date refused', async () => {
  const result = await fetchPage({ now: () => now + 86400000, execute: async () => ({ stdout: 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\n\r\n'+body+'\n200' }) });
  assert.equal(result.ok, false);
});
