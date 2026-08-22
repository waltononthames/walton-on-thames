// Build-time (non-blocking) check for stale annual-event dates.
//
// Per the Things to Do hub brief (section 4.2): a `confirmed` annual event
// whose nextStartDate has already passed should still build (the page-level
// date-label logic falls back to "Next date to be announced"), but the
// discrepancy must surface in the build log on every deploy rather than
// require a human to remember to check. Warns only; never fails the build.
//
// Runs automatically via the `prebuild` npm script.
import { readdirSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const EVENTS_DIR = join(ROOT, 'src', 'content', 'annual-events');

function parseRecord(raw, ext) {
  if (ext === '.json') return JSON.parse(raw);
  const data = {};
  for (const line of raw.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return data;
}

let files;
try {
  files = readdirSync(EVENTS_DIR);
} catch {
  files = [];
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const stale = [];

for (const name of files) {
  const ext = extname(name);
  if (!['.yaml', '.yml', '.json'].includes(ext)) continue;
  const raw = readFileSync(join(EVENTS_DIR, name), 'utf8');
  const data = parseRecord(raw, ext);
  if (data.dateStatus !== 'confirmed' || !data.nextStartDate) continue;

  const start = new Date(data.nextStartDate);
  if (start < today) {
    stale.push({ name, title: data.name, nextStartDate: data.nextStartDate });
  }
}

if (stale.length > 0) {
  console.log(`\ncheck-annual-events-dates: ${stale.length} confirmed annual event(s) with a lapsed nextStartDate — will render as "Next date to be announced" until re-dated:\n`);
  for (const s of stale) {
    console.log(`  src/content/annual-events/${s.name}  "${s.title}"  nextStartDate=${s.nextStartDate}`);
  }
  console.log('\nRe-verify against dateSourceUrl and update nextStartDate/nextEndDate, or set dateStatus to to_be_announced/completed.\n');
} else {
  console.log('check-annual-events-dates: no stale confirmed annual events found.');
}
