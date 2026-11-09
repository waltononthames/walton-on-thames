// Advisory (non-blocking) report on directory listings that need re-checking.
// docs/directory-plan.md, item 1.2. Run at the start of every directory
// session: `npm run content:stale-listings`.
//
// It reports work; it never changes a listing. Re-checking means going back to
// an official source (the Food Standards Agency register, the business's own
// website, the NHS), per the Content Verification Protocol in CLAUDE.md.
//
// A listing's "last checked" date is the newest of its field-level `checks`
// dates and its `verified_date`. Note that `verified_date` on a record that
// rests only on the July 2026 restaurant spreadsheet is the date it was added,
// not a check, so those records are reported separately whatever their date.
//
// Options:
//   --links      also request each listing's website (needs network access to
//                the host; a refused connection is reported as "unreachable
//                from here", which is not the same as dead)
//   --months=N   staleness threshold, default 6
//   --all        list every listing under each heading (default: first 15)
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR = join(ROOT, 'src', 'content', 'businesses');
const SPREADSHEET_PREFIX = 'Restaurant directory spreadsheet';

const args = process.argv.slice(2);
const CHECK_LINKS = args.includes('--links');
const SHOW_ALL = args.includes('--all');
const MONTHS = Number((args.find((a) => a.startsWith('--months=')) ?? '--months=6').split('=')[1]);

const today = new Date();
const cutoff = new Date(today);
cutoff.setMonth(cutoff.getMonth() - MONTHS);
const isoDay = (d) => d.toISOString().slice(0, 10);

const records = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((file) => {
    const text = readFileSync(join(DIR, file), 'utf8');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return { file, data: m ? yaml.load(m[1]) : {} };
  });

function lastChecked(data) {
  const dates = (data.checks ?? []).map((c) => c.source?.checked).filter(Boolean);
  if (data.verified_date) dates.push(String(data.verified_date));
  return dates.sort().at(-1);
}

const groups = {
  spreadsheet: { title: 'Rest on the July 2026 restaurant spreadsheet alone (no field-level checks)', items: [] },
  stale: { title: `Last checked more than ${MONTHS} months ago (before ${isoDay(cutoff)})`, items: [] },
  noChecks: { title: 'No field-level `checks` yet (not counting the spreadsheet group)', items: [] },
  noGeo: { title: 'No map position (lat/lng)', items: [] },
  noWebsite: { title: 'No website and no NHS listing', items: [] },
  status: { title: 'Status other than active', items: [] },
  redirect: { title: 'Closed 12 months or more ago: redirect the URL to its category page in public/_redirects and remove the record (decision D6)', items: [] },
  links: { title: 'Website problems (--links)', items: [] },
};

for (const { file, data } of records) {
  if (data.hub_page) continue; // has its own guide page; checked there
  const path = `src/content/businesses/${file}`;
  const checked = lastChecked(data);
  const hasChecks = (data.checks ?? []).length > 0;
  const spreadsheetOnly = String(data.source ?? '').startsWith(SPREADSHEET_PREFIX) && !hasChecks;

  if (spreadsheetOnly) groups.spreadsheet.items.push(`${path}  "${data.name}"  dated ${checked ?? 'none'}`);
  else if (!checked || checked < isoDay(cutoff)) groups.stale.items.push(`${path}  "${data.name}"  last checked ${checked ?? 'never'}`);
  if (!hasChecks && !spreadsheetOnly) groups.noChecks.items.push(`${path}  "${data.name}"`);
  if (typeof data.lat !== 'number' || typeof data.lng !== 'number') groups.noGeo.items.push(`${path}  "${data.name}"  (${data.category})`);
  if (!data.website && !data.nhs_url) groups.noWebsite.items.push(`${path}  "${data.name}"`);
  if (data.status && data.status !== 'active') groups.status.items.push(`${path}  "${data.name}"  ${data.status}`);
  if (data.status === 'permanently-closed') {
    const recorded = data.closure_recorded ? new Date(`${data.closure_recorded}T00:00:00Z`) : null;
    const yearAgo = new Date(today); yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    if (!recorded) groups.redirect.items.push(`${path}  "${data.name}"  no closure_recorded date: add one`);
    else if (recorded <= yearAgo) groups.redirect.items.push(`${path}  "${data.name}"  closure recorded ${data.closure_recorded}`);
  }
}

if (CHECK_LINKS) {
  const targets = records.filter(({ data }) => data.website && !data.hub_page);
  for (const { file, data } of targets) {
    const path = `src/content/businesses/${file}`;
    try {
      const res = await fetch(data.website, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location') ?? '';
        const from = new URL(data.website).hostname.replace(/^www\./, '');
        let to = '';
        try { to = new URL(location, data.website).hostname.replace(/^www\./, ''); } catch { /* relative or malformed */ }
        if (to && to !== from) groups.links.items.push(`${path}  "${data.name}"  redirects off-site: ${data.website} -> ${location}`);
      } else if (res.status >= 400) {
        groups.links.items.push(`${path}  "${data.name}"  HTTP ${res.status}: ${data.website}`);
      }
    } catch (err) {
      const reason = err?.cause?.code ?? err?.name ?? 'error';
      const label = reason === 'ENOTFOUND' ? 'domain does not resolve' : `unreachable from here (${reason})`;
      groups.links.items.push(`${path}  "${data.name}"  ${label}: ${data.website}`);
    }
  }
}

const total = records.filter(({ data }) => !data.hub_page).length;
console.log(`check-stale-listings: ${total} listings (excluding those with a guide page), threshold ${MONTHS} months.`);
for (const g of Object.values(groups)) {
  if (g === groups.links && !CHECK_LINKS) continue;
  console.log(`\n${g.title}: ${g.items.length}`);
  const shown = SHOW_ALL ? g.items : g.items.slice(0, 15);
  for (const line of shown) console.log(`  ${line}`);
  if (shown.length < g.items.length) console.log(`  ... and ${g.items.length - shown.length} more (--all to list them)`);
}
console.log('\nRe-check against an official source before changing a listing; see docs/directory-plan.md, item 1.4.');
