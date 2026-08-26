// Advisory (non-blocking) check for stale recurring events.
//
// Root cause this addresses: the 16 July 2026 external audit found "Baby
// Brunch Club" displayed under "Coming Up" a day after its dated occurrence
// had passed. The build-time date filter (src/pages/index.astro,
// src/pages/whats-on/index.astro) was already correct and did remove it on
// the next scheduled rebuild, but a `recurring: true` event only carries a
// single hardcoded `start` date, so once that date lapses the event simply
// vanishes from the site instead of showing its next real occurrence. The
// protocol deliberately forbids auto-generating future occurrences without
// re-confirming them against the organiser's own listing (Rule 4), so this
// can only be fixed by a human/AI editor periodically re-dating or retiring
// the listing: this script exists to surface that work, not to do it.
//
// Run manually or before a content-review session: `npm run content:stale-events`.
// Does not fail the build; recurring events that go stale are already
// filtered out safely by the existing date logic, they just go quietly
// missing rather than loudly wrong.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const EVENTS_DIR = join(ROOT, 'src', 'content', 'events');
const STALE_AFTER_DAYS = 1;

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^"|"$/g, '');
  }
  return data;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const stale = [];

for (const name of readdirSync(EVENTS_DIR)) {
  if (!name.endsWith('.md')) continue;
  const raw = readFileSync(join(EVENTS_DIR, name), 'utf8');
  const data = parseFrontmatter(raw);
  if (data.recurring !== 'true' || !data.start) continue;

  const start = new Date(data.start);
  const ageDays = Math.floor((today - start) / 86400000);
  if (ageDays > STALE_AFTER_DAYS) {
    stale.push({ name, title: data.title, start: data.start, ageDays });
  }
}

if (stale.length > 0) {
  console.log(`\ncheck-stale-events: ${stale.length} recurring event(s) with a lapsed date, will drop off "Coming Up" (if not already gone) and stop advertising a listing that likely still runs:\n`);
  for (const s of stale) {
    console.log(`  src/content/events/${s.name}  "${s.title}"  start=${s.start}  (${s.ageDays} days stale)`);
  }
  console.log('\nRe-verify against the organiser\'s current listing and update `start`/`end` to the next occurrence, or remove the file if it no longer runs.\n');
} else {
  console.log('check-stale-events: no stale recurring events found.');
}
