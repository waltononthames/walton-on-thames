import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyDeployment } from './verify-live.mjs';
const stamp = '2026-10-25T04:00:00.000Z';
const html = `<div data-verified-at="${stamp}">Last verified notice</div>`;
const options = (body, ok = true) => ({ attempts: 2, pause: async () => {},
  request: async (url) => {
    assert.equal(new URL(url).search, '');
    return { ok, text: async () => body };
  } });
test('deployment succeeds only when the canonical page shows this verification', async () => {
  await verifyDeployment(stamp, options(html));
  await assert.rejects(verifyDeployment(stamp, options('old cached page')));
  await assert.rejects(verifyDeployment(stamp, options(html, false)));
  await assert.rejects(verifyDeployment(stamp, options(html + 'https://schema.org/EventScheduled')));
});
test('failed deployment requests exhaust retries and fail visibly', async () => {
  let calls = 0;
  await assert.rejects(verifyDeployment(stamp, { attempts: 2, pause: async () => {}, request: async () => { calls++; throw Error('network'); } }));
  assert.equal(calls, 2);
});
