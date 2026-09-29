// Advisory (non-blocking) check for meta description length.
//
// Root cause this addresses: Bing Webmaster Tools flagged 50 URLs on 28
// September 2026 for meta descriptions that were too short. Listings and
// events now top theirs up from page data (src/utils/metaDescription.ts),
// but hand-written descriptions on static pages and news articles have no
// length rule, and nothing stopped any page running past what search results
// display. This reads the built HTML, so it covers every page type including
// the template-generated ones.
//
// Runs after every build (postbuild) and on demand with
// `npm run seo:meta-descriptions` (build first: this reads dist/). It never
// fails the build: a 105-character description is not worth blocking the
// 01:00 rebuild over. Pages marked noindex are skipped, since search engines
// never show them.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const MIN = 110;
const MAX = 160;

if (!existsSync(DIST)) {
  console.error('dist/ not found: run `npm run build` first.');
  process.exit(1);
}

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function toUrlPath(file) {
  return '/' + relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');
}

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const missing = [];
const short = [];
const long = [];
let checked = 0;

for (const file of walkHtml(DIST)) {
  const html = readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  checked++;
  const url = toUrlPath(file);
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  if (!m || !m[1].trim()) {
    missing.push(url);
    continue;
  }
  const text = decodeEntities(m[1]);
  if (text.length < MIN) short.push([text.length, url, text]);
  else if (text.length > MAX) long.push([text.length, url, text]);
}

const report = (label, rows) => {
  if (rows.length === 0) return;
  console.log(`\n${label} (${rows.length}):`);
  for (const [len, url, text] of rows.sort((a, b) => a[0] - b[0])) {
    console.log(`  ${String(len).padStart(3)}  ${url}\n       ${text}`);
  }
};

const total = missing.length + short.length + long.length;
if (total === 0) {
  console.log(`Meta descriptions: all ${checked} indexable pages are ${MIN}-${MAX} characters.`);
} else {
  console.log(`\nMeta descriptions: ${total} of ${checked} indexable pages outside ${MIN}-${MAX} characters (advisory, build not failed).`);
  if (missing.length) console.log(`\nMissing (${missing.length}):\n${missing.map((u) => `  ${u}`).join('\n')}`);
  report(`Under ${MIN}`, short);
  report(`Over ${MAX}`, long);
}
