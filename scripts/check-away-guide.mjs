// Prebuild check for the away fans' guide (docs/away-fans-guide-plan.md, section 3).
//
// 1. Placeholder data must never reach production. Any `placeholder: true`
//    under src/content/away-guide/ fails the build when Cloudflare Pages is
//    building the production branch (CF_PAGES_BRANCH=main). Preview branches
//    and local builds pass with a warning, so the prototype can be reviewed;
//    the page itself is noindex while any placeholder remains.
//    Set AWAY_GUIDE_STRICT=1 to apply the production rule locally.
//
// 2. Timetables expire. Train and bus records carry the timetable period they
//    were checked against. An expired period does not fail the build (the
//    page hides the finder by itself), but it is reported, with a warning two
//    weeks ahead, so the times can be re-checked before they vanish.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR = join(ROOT, 'src', 'content', 'away-guide');
const production = process.env.CF_PAGES_BRANCH === 'main' || process.env.AWAY_GUIDE_STRICT === '1';

function walk(dir, out = []) {
  let names;
  try { names = readdirSync(dir); } catch { return out; }
  for (const name of names) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.ya?ml$/.test(name)) out.push(p);
  }
  return out;
}

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
const soon = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date(Date.now() + 14 * 864e5));

const placeholders = [];
const expiring = [];
for (const file of walk(DIR)) {
  const rel = relative(ROOT, file);
  readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (/^\s*placeholder:\s*true\s*$/.test(line)) placeholders.push(`${rel}:${i + 1}`);
    const m = line.match(/timetableValidTo:\s*"?(\d{4}-\d{2}-\d{2})"?/);
    if (m && m[1] < soon) expiring.push(`${rel}:${i + 1}  timetable ${m[1] < today ? 'expired' : 'expires'} ${m[1]}`);
  });
}

for (const e of expiring) console.warn(`check-away-guide: ${e}. Re-check against the current timetable.`);

if (placeholders.length && production) {
  console.error(`\nBUILD BLOCKED: ${placeholders.length} placeholder value(s) in the away fans' guide data. Placeholder data never ships to production:\n`);
  for (const p of placeholders) console.error(`  ${p}`);
  console.error('\nReplace each with a sourced value, or with an unconfirmed question, which renders nothing in production.\n');
  process.exit(1);
}

if (placeholders.length) {
  console.warn(`check-away-guide: ${placeholders.length} placeholder value(s) remain. Allowed on this branch; blocked on main.`);
} else {
  console.log('check-away-guide: no placeholder data in the away fans\' guide.');
}
