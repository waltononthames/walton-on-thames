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
// Pass `--all` (`npm run content:stale-events -- --all`) to also list one-off
// events that have finished and should be deleted.
// Does not fail the build; recurring events that go stale are already
// filtered out safely by the existing date logic, they just go quietly
// missing rather than loudly wrong.
//
// "Lapsed" uses the same rule as the listing pages (src/pages/whats-on/index.astro):
// the calendar day of `end` (or `start` if there is no end) is before today.
// The earlier version measured whole days since `start` and skipped anything
// under a day old, which hid an event that lapsed yesterday afternoon.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const EVENTS_DIR = join(ROOT, 'src', 'content', 'events');
const SHOW_ALL = process.argv.includes('--all');

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

function dayOf(value) {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const stale = [];
const finished = [];

for (const name of readdirSync(EVENTS_DIR).sort()) {
  if (!name.endsWith('.md')) continue;
  const raw = readFileSync(join(EVENTS_DIR, name), 'utf8');
  const data = parseFrontmatter(raw);
  if (!data.start) continue;

  const lastDay = dayOf(data.end || data.start);
  if (lastDay >= today) continue;

  const ageDays = Math.round((today - lastDay) / 86400000);
  const entry = { name, title: data.title, start: data.start, end: data.end, ageDays };
  if (data.recurring === 'true') stale.push(entry);
  else finished.push(entry);
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

if (SHOW_ALL) {
  if (finished.length > 0) {
    console.log(`\ncheck-stale-events: ${finished.length} one-off event(s) that have finished:\n`);
    for (const s of finished) {
      console.log(`  src/content/events/${s.name}  "${s.title}"  ${s.end ? `end=${s.end}` : `start=${s.start}`}  (${s.ageDays} days ago)`);
    }
    console.log('\nThese are already hidden from the site. Delete the files (git rm) as part of the events refresh.\n');
  } else {
    console.log('check-stale-events: no finished one-off events found.');
  }
}
