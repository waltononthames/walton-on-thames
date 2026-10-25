import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('failed and inconclusive CLI checks leave published data byte-for-byte unchanged', () => {
  const original = readFileSync('src/data/apps-court-status.json');
  const temp = mkdtempSync(join(tmpdir(), 'carboot-test-'));
  try {
    for (const [http, text, code] of [
      [403, 'THE CAR BOOT IS OPEN THIS SUNDAY', 0],
      [200, 'THE CAR BOOT IS OPEN THIS SUNDAY', 0],
      [200, 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH', 0],
      [200, 'THE CAR BOOT IS OPEN THIS SUNDAY', 28],
    ]) {
      const response = `HTTP/1.1 ${http} Response\r\nContent-Type: text/html\r\nDate: ${new Date().toUTCString()}\r\n\r\n<main><p>${text}</p></main>\n${http}`;
      writeFileSync(join(temp, 'curl'), `#!/usr/bin/env node\nprocess.stdout.write(${JSON.stringify(response)}); process.exit(${code});\n`, { mode: 0o755 });
      const result = spawnSync(process.execPath, ['tools/apps-court-check/run-check.mjs', '--write'], {
        encoding: 'utf8', env: { ...process.env, PATH: `${temp}:${process.env.PATH}`, CARBOOT_FETCH_STRATEGY: 'direct' },
      });
      assert.equal(result.status, 1, result.stderr || result.stdout);
      assert.equal(JSON.parse(result.stdout).wrote, false);
      assert.deepEqual(readFileSync('src/data/apps-court-status.json'), original);
    }
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
