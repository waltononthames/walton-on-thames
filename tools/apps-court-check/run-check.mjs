#!/usr/bin/env node
// The car boot check, end to end: fetch, parse, decide, and optionally write
// src/data/apps-court-status.json.
//
//   node tools/apps-court-check/run-check.mjs            # report only
//   node tools/apps-court-check/run-check.mjs --write    # write if warranted
//
// Configuration, all optional, from the environment:
//
//   CARBOOT_FETCH_STRATEGY   "direct" (default) or "template"
//   CARBOOT_FETCH_TEMPLATE   for "template": a URL with {url} and {key}
//   CARBOOT_FETCH_KEY        the fetch service's API key
//
// Exit codes, which is how the scheduled job decides whether to shout:
//   0  read and understood; the status file was written or needed no change
//   1  could not read or could not understand the source: NOTHING was changed
//   2  a bad invocation or an unexpected error
//
// Exit 1 is the important one. It means the page on the site is now older than
// it looks, and that is worth an alert -- but it is never a reason to write a
// guess. A stale "no sale confirmed" is recoverable; telling people a cancelled
// sale is going ahead is not.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { parseNotice } from './parse-notice.mjs';
import { decide } from './decide.mjs';
import { fetchPage, redact } from './fetch-page.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const STATUS_PATH = resolve(here, '../../src/data/apps-court-status.json');

const write = process.argv.includes('--write');

const say = (obj) => console.log(JSON.stringify(obj, null, 2));

let current;
try {
  current = JSON.parse(readFileSync(STATUS_PATH, 'utf8'));
} catch (error) {
  say({ result: 'error', message: `Could not read ${STATUS_PATH}: ${error.message}` });
  process.exit(2);
}

const apiKey = process.env.CARBOOT_FETCH_KEY || '';
const fetched = await fetchPage({
  strategy: process.env.CARBOOT_FETCH_STRATEGY || 'direct',
  template: process.env.CARBOOT_FETCH_TEMPLATE,
  apiKey,
});

// A failed fetch is reported and stops here. The status file is left exactly
// as it is: overwriting it with "could not check" would throw away a correct
// conclusion in favour of no conclusion.
if (!fetched.ok || !fetched.html) {
  say({
    result: 'unreadable',
    attemptedAt: new Date().toISOString(),
    wrote: false,
    httpStatus: fetched.httpStatus,
    readVia: fetched.readVia,
    error: fetched.error,
    message: 'The source could not be fetched. The status file was left untouched.',
  });
  process.exit(1);
}

const parsed = parseNotice(fetched.html);
const decision = decide({
  parsed,
  now: new Date(),
  current,
  readVia: fetched.readVia,
});

const report = {
  attemptedAt: new Date().toISOString(),
  httpStatus: fetched.httpStatus,
  bytes: fetched.bytes,
  readVia: fetched.readVia,
  verdict: parsed.verdict,
  mainNotice: parsed.mainNotices?.[0]?.text ?? null,
  cacheStatus: fetched.cacheStatus ?? null,
  parserNotes: parsed.notes,
  action: decision.action,
  reason: decision.reason,
};

if (decision.action === 'none') {
  say({ result: 'no-change', wrote: false, ...report });
  process.exit(decision.alert ? 1 : 0);
}

if (!write) {
  say({ result: 'would-write', wrote: false, ...report, changed: decision.changed });
  process.exit(0);
}

try {
  // Trailing newline, matching the file as committed.
  writeFileSync(STATUS_PATH, `${JSON.stringify(decision.status, null, 2)}\n`, 'utf8');
} catch (error) {
  say({ result: 'error', wrote: false, ...report, message: redact(error.message, apiKey) });
  process.exit(2);
}

say({ result: 'written', wrote: true, ...report, changed: decision.changed });
process.exit(0);
