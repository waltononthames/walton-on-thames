import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchPage, buildTemplateUrl } from './fetch-page.mjs';

const now = Date.parse('2026-10-25T04:00:00Z');
const body = '<main><p>THE CAR BOOT IS OPEN THIS SUNDAY THE 25TH</p></main>';
const run = (status = 200, headers = '', responseBody = body) => fetchPage({
  now: () => now,
  execute: async () => ({
    stdout: `HTTP/1.1 ${status} Response\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\n${headers}\r\n${responseBody}\n${status}`,
  }),
});

test('non-200 bodies cannot become verification evidence', async () => {
  for (const status of [301, 403, 429, 500]) assert.equal((await run(status)).ok, false);
});

// An earlier version failed the whole check on CF-Cache-Status: HIT or any
// Age above zero. The farm's own site sits behind Cloudflare, so a HIT is the
// normal case and says nothing about whether the NOTICE is current: it turned
// ordinary successful reads into failures. Cache state is now recorded for
// diagnostics, and staleness is judged in decide.mjs from the farm's own
// stated date.
test('ordinary edge caching is recorded, not treated as failure', async () => {
  for (const [headers, expected] of [
    ['CF-Cache-Status: HIT\r\n', 'HIT'],
    ['CF-Cache-Status: MISS\r\n', 'MISS'],
    ['Age: 600\r\nCF-Cache-Status: HIT\r\n', 'HIT'],
  ]) {
    const result = await run(200, headers);
    assert.equal(result.ok, true, headers);
    assert.equal(result.cacheStatus, expected);
    assert.equal(result.html, body);
  }
});

test('fresh direct response accepted', async () => {
  const result = await run();
  assert.equal(result.ok, true);
  assert.equal(result.html, body);
});

test('partial body on timeout is never accepted', async () => {
  const result = await fetchPage({ execute: async () => { throw Object.assign(new Error('timeout'), { stdout: body }); } });
  assert.equal(result.ok, false);
  assert.equal(result.html, null);
});

test('an empty body is not a successful read', async () => {
  assert.equal((await run(200, '', '   ')).ok, false);
});

// Still guards a grossly replayed or long-cached response, but with enough
// slack that ordinary edge caching and clock skew do not trip it.
test('an implausibly old response date is refused, allowing for cache age', async () => {
  const dayLater = await fetchPage({
    now: () => now + 86400000,
    execute: async () => ({ stdout: `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\n\r\n${body}\n200` }),
  });
  assert.equal(dayLater.ok, false);

  // Ten minutes of skew is fine.
  const slightlyOld = await fetchPage({
    now: () => now + 600000,
    execute: async () => ({ stdout: `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\n\r\n${body}\n200` }),
  });
  assert.equal(slightlyOld.ok, true);

  // A long Age explains a correspondingly old Date, so it is not double-counted.
  const cachedButExplained = await fetchPage({
    now: () => now + 3600000,
    execute: async () => ({ stdout: `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nDate: Sun, 25 Oct 2026 04:00:00 GMT\r\nAge: 3500\r\n\r\n${body}\n200` }),
  });
  assert.equal(cachedButExplained.ok, true);
});

test('missing Date header is refused on a direct read', async () => {
  const result = await fetchPage({
    now: () => now,
    execute: async () => ({ stdout: `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n${body}\n200` }),
  });
  assert.equal(result.ok, false);
});

test('an unknown fetch strategy is refused rather than silently defaulting', async () => {
  assert.equal((await fetchPage({ strategy: 'proxy-please' })).ok, false);
});

test('a fetch template encodes the target and never leaks the key', async () => {
  const url = buildTemplateUrl('https://api.example.com/?api_key={key}&url={url}', 'SECRET123');
  assert.ok(url.includes('api_key=SECRET123'));
  assert.ok(url.includes(encodeURIComponent('https://www.appscourtfarm.com/carboot')));
  assert.throws(() => buildTemplateUrl('https://api.example.com/?api_key={key}', 'SECRET123'), /\{url\}/);

  // A failure must not echo the key back into a report or a log.
  const result = await fetchPage({
    strategy: 'template',
    template: 'https://api.example.com/?api_key={key}&url={url}',
    apiKey: 'SECRET123',
    execute: async () => { throw new Error('connect ECONNREFUSED https://api.example.com/?api_key=SECRET123'); },
  });
  assert.equal(result.ok, false);
  assert.ok(!result.error.includes('SECRET123'), result.error);
  assert.ok(result.error.includes('[REDACTED]'));
});
