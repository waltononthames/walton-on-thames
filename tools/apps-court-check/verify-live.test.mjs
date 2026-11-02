import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyDeployment, pagesDeployState } from './verify-live.mjs';
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
  // A correctly published open Sunday legitimately carries EventScheduled;
  // whether that markup is right is verify-built.mjs's job, before the push.
  await verifyDeployment(stamp, options(html + 'https://schema.org/EventScheduled'));
});
test('failed deployment requests exhaust retries and fail visibly', async () => {
  let calls = 0;
  await assert.rejects(verifyDeployment(stamp, { attempts: 2, pause: async () => {}, request: async () => { calls++; throw Error('network'); } }));
  assert.equal(calls, 2);
});
test('a failure says what the last attempt saw', async () => {
  const quiet = console.log; console.log = () => {};
  try {
    await assert.rejects(verifyDeployment(stamp, options('<div data-verified-at="2026-10-01T00:00:00.000Z">')), /older reading \(2026-10-01/);
    await assert.rejects(verifyDeployment(stamp, options('Just a moment', false)), /no reading on the page/);
  } finally { console.log = quiet; }
});
const challenged = { ok: false, status: 403, headers: { get: (h) => (h === 'cf-mitigated' ? 'challenge' : null) }, text: async () => 'Just a moment' };
const quietly = async (fn) => { const q = console.log; console.log = () => {}; try { return await fn(); } finally { console.log = q; } };
test('a challenged page falls back to the Pages deploy check', async () => {
  const states = ['pending', 'success'];
  const result = await quietly(() => verifyDeployment(stamp, { attempts: 3, pause: async () => {}, request: async () => challenged, deployState: async () => states.shift() }));
  assert.equal(result, 'deploy');
});
test('a failed Pages deploy fails at once, and a never-finishing one still fails', async () => {
  let calls = 0;
  await assert.rejects(quietly(() => verifyDeployment(stamp, { attempts: 5, pause: async () => {}, request: async () => challenged, deployState: async () => { calls++; return 'Cloudflare Pages reported failure: Build failed'; } })), /Build failed/);
  assert.equal(calls, 1);
  await assert.rejects(quietly(() => verifyDeployment(stamp, { attempts: 2, pause: async () => {}, request: async () => challenged, deployState: async () => 'pending' })), /still pending/);
});
test('a challenge without a fallback still fails', async () => {
  await assert.rejects(quietly(() => verifyDeployment(stamp, { attempts: 2, pause: async () => {}, request: async () => challenged })), /cf-mitigated: challenge/);
});
test('pagesDeployState reads the Cloudflare Pages check run', async () => {
  const reply = (runs) => async () => ({ ok: true, json: async () => ({ check_runs: runs }) });
  assert.equal(await pagesDeployState('abc', { repo: 'o/r', request: reply([]) }), 'pending');
  assert.equal(await pagesDeployState('abc', { repo: 'o/r', request: reply([{ status: 'in_progress' }]) }), 'pending');
  assert.equal(await pagesDeployState('abc', { repo: 'o/r', request: reply([{ status: 'completed', conclusion: 'success' }]) }), 'success');
  assert.match(await pagesDeployState('abc', { repo: 'o/r', request: reply([{ status: 'completed', conclusion: 'failure', output: { title: 'Build failed' } }]) }), /failure: Build failed/);
});
