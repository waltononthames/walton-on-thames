import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, delimiter } from 'node:path';
import { spawnSync } from 'node:child_process';

const STATUS_PATH = 'src/data/apps-court-status.json';

// A fake curl on PATH, so the CLI is exercised end to end without touching the
// network or the farm's site.
//
// POSIX only, and deliberately so. Node's execFile uses CreateProcess on
// Windows, which cannot run a .cmd or an extensionless shebang file, so a
// stubbed `curl` is always bypassed in favour of the real curl.exe. An earlier
// version did not know that: it hardcoded ':' as the PATH separator and wrote
// only a shebang file, so on Windows these tests quietly fetched the live
// website and passed for the wrong reason. The alternative, a fixture seam
// inside fetch-page.mjs, would mean production code carrying a switch that
// bypasses the network, which is a worse trade than skipping here. CI runs on
// ubuntu, so the coverage is real where it is enforced.
const POSIX_ONLY = process.platform === 'win32'
  ? 'POSIX only: Windows CreateProcess cannot execute a stubbed curl, so the real one would be used'
  : false;
const withFakeCurl = (response, exitCode, run) => {
  const temp = mkdtempSync(join(tmpdir(), 'carboot-test-'));
  try {
    const payload = `process.stdout.write(${JSON.stringify(response)}); process.exit(${exitCode});`;
    writeFileSync(join(temp, 'curl-stub.js'), `${payload}\n`);
    writeFileSync(join(temp, 'curl'), `#!/usr/bin/env node\n${payload}\n`, { mode: 0o755 });
    // cmd.exe resolves a bare `curl` to curl.cmd via PATHEXT.
    writeFileSync(join(temp, 'curl.cmd'), `@echo off\r\nnode "%~dp0curl-stub.js" %*\r\n`);
    return run(temp);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
};

// Guards the guard: if the stub is ever bypassed again, fail loudly rather
// than quietly testing the live website. The real page is ~112KB; every
// stubbed response here is a few hundred bytes.
const assertStubWasUsed = (report, label) => {
  assert.ok(
    report.bytes < 5000,
    `${label}: the fake curl was bypassed and the real source was fetched (${report.bytes} bytes).`,
  );
};

const respond = (http, text) =>
  `HTTP/1.1 ${http} Response\r\nContent-Type: text/html\r\nDate: ${new Date().toUTCString()}\r\n\r\n<main><p>${text}</p></main>\n${http}`;

const invoke = (temp, args = []) => spawnSync(
  process.execPath,
  ['tools/apps-court-check/run-check.mjs', ...args],
  {
    encoding: 'utf8',
    env: { ...process.env, PATH: `${temp}${delimiter}${process.env.PATH}`, CARBOOT_FETCH_STRATEGY: 'direct' },
  },
);

// The guarantee the whole design rests on: when the check cannot reach a sound
// conclusion it leaves the published record byte-for-byte as it was. A stale
// page is recoverable; telling people a cancelled sale is going ahead is not.
//
// Note what is NOT asserted per case here: the exit code. Whether a refusal
// also raises an alert depends on how long it has been since anything verified
// (see decide.mjs), which is a property of the committed record's age, not of
// the notice. Asserting an exit code for every case would make this suite fail
// by the passage of time alone -- which it did: a stale-notice case asserted
// exit 1, that refusal became quiet, and the suite then broke the scheduled
// job before it could even reach the source. Exit codes are asserted below,
// only for refusals whose alerting does not depend on the clock.
test('failed and inconclusive checks leave published data byte-for-byte unchanged', { skip: POSIX_ONLY }, () => {
  const original = readFileSync(STATUS_PATH);
  for (const [label, http, text, exitCode] of [
    ['source refuses the request', 403, 'THE CAR BOOT IS OPEN THIS SUNDAY', 0],
    ['curl itself fails', 200, 'THE CAR BOOT IS OPEN THIS SUNDAY', 28],
    ['notice names a Sunday that is not the coming one', 200, 'THE CAR BOOT IS OPEN THIS SUNDAY THE 18TH OCTOBER 2026', 0],
    ['notice carries an unknown qualification', 200, 'THE CAR BOOT IS OPEN THIS SUNDAY UNLESS WET', 0],
    ['no notice at all', 200, 'Welcome to the farm', 0],
  ]) {
    withFakeCurl(respond(http, text), exitCode, (temp) => {
      const result = invoke(temp, ['--write']);
      const report = JSON.parse(result.stdout);
      if (http === 200 && exitCode === 0) assertStubWasUsed(report, label);
      assert.equal(report.wrote, false, label);
      assert.equal(report.result === 'written', false, label);
      assert.deepEqual(readFileSync(STATUS_PATH), original, `${label} must not touch the record`);
    });
  }
});

// An unreadable source, or one whose notice cannot be understood at all, means
// something has broken or changed and is worth an email whatever the record's
// age. These must always exit non-zero.
test('unreadable and incomprehensible sources always exit non-zero', { skip: POSIX_ONLY }, () => {
  for (const [label, http, text, exitCode] of [
    ['source refuses the request', 403, 'THE CAR BOOT IS OPEN THIS SUNDAY', 0],
    ['curl itself fails', 200, 'THE CAR BOOT IS OPEN THIS SUNDAY', 28],
    ['notice carries an unknown qualification', 200, 'THE CAR BOOT IS OPEN THIS SUNDAY UNLESS WET', 0],
    ['no notice at all', 200, 'Welcome to the farm', 0],
  ]) {
    withFakeCurl(respond(http, text), exitCode, (temp) => {
      const result = invoke(temp, ['--write']);
      assert.equal(result.status, 1, `${label}: ${result.stderr || result.stdout}`);
    });
  }
});

// The counterpart, and the fault this suite previously missed entirely: a
// notice the farm really publishes must actually succeed. An earlier version
// required day + month + year, which the farm has never published, so the
// check could never write anything and failed twice a day indefinitely.
test('a real notice is read, understood and written', { skip: POSIX_ONLY }, () => {
  const original = readFileSync(STATUS_PATH);
  try {
    withFakeCurl(respond(200, 'THE CAR BOOT IS OPEN THIS SUNDAY'), 0, (temp) => {
      const result = invoke(temp, ['--write']);
      assert.equal(result.status, 0, result.stderr || result.stdout);
      const report = JSON.parse(result.stdout);
      assertStubWasUsed(report, 'real notice');
      assert.equal(report.wrote, true);
      assert.equal(report.verdict, 'on');

      const written = JSON.parse(readFileSync(STATUS_PATH, 'utf8'));
      assert.equal(written.status, 'on');
      assert.equal(written.lastCheckSucceeded, true);
      // Undated notice: the farm's position is recorded, no date is claimed.
      assert.equal(written.dateConfirmed, false);
      assert.equal(written.nextConfirmedDateISO, null);
    });
  } finally {
    writeFileSync(STATUS_PATH, original);
  }
});

test('without --write nothing is written even when the read succeeds', { skip: POSIX_ONLY }, () => {
  const original = readFileSync(STATUS_PATH);
  withFakeCurl(respond(200, 'THE CAR BOOT IS OPEN THIS SUNDAY'), 0, (temp) => {
    const result = invoke(temp);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assertStubWasUsed(report, 'report-only');
    assert.equal(report.wrote, false);
    assert.deepEqual(readFileSync(STATUS_PATH), original);
  });
});
