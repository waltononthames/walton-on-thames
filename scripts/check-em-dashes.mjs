// Advisory (non-blocking) check for em dashes, in two scopes.
//
// 1. Body prose in the history/hersham collections, per
//    docs/walton-history-hersham-extension.md Section 1, Rule 2 (Register):
//    "No em dashes anywhere; use commas, colons or full stops." That rule is
//    documented for these two collections only, and is deliberately not
//    claimed as a site-wide requirement for body prose.
//
// 2. Page metadata sitewide - every <title> and meta description the site
//    emits. These were cleared during the SEO pass (an em dash in a tag is a
//    character spent on punctuation Google may render inconsistently, in the
//    ~60 and ~155 characters that matter most), so the check keeps them clear.
//    Body prose outside history/hersham is deliberately not checked.
//
// Run manually or before a content-review session: `npm run content:em-dashes`.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const EM = '—';
const COLLECTION_DIRS = ['src/content/history', 'src/content/hersham'];

const METADATA_PATTERNS = [
  /\bdescription="([^"]{20,})"/,
  /\bdescription:\s*"([^"]{20,})"/,
  /\bmetaDescription:\s*"([^"]{20,})"/,
  /\bdescription=\{`([^`]{20,})`\}/,
  /\btitle="([^"]{10,})"/,
  /\bmetaTitle:\s*"([^"]{10,})"/,
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, out);
    else if (/\.(astro|md|ts)$/.test(entry.name)) out.push(path);
  }
  return out;
}

let bodyHits = 0;
for (const dir of COLLECTION_DIRS) {
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const path = join(dir, name);
    readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
      if (line.includes(EM)) {
        console.log(`${path}:${i + 1}  ${line.trim().slice(0, 120)}`);
        bodyHits++;
      }
    });
  }
}

let metaHits = 0;
for (const path of walk('src')) {
  readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('\n').forEach((line, i) => {
    for (const pattern of METADATA_PATTERNS) {
      const m = pattern.exec(line);
      if (!m) continue;
      if (m[1].includes(EM)) {
        console.log(`${path}:${i + 1}  [metadata]  ${m[1].slice(0, 120)}`);
        metaHits++;
      }
      break;
    }
  });
}

if (bodyHits + metaHits > 0) {
  if (bodyHits) console.log(`\n${bodyHits} em dash(es) in history/hersham body prose - replace with commas, colons or full stops per the Register rule.`);
  if (metaHits) console.log(`\n${metaHits} em dash(es) in page metadata - replace with commas or colons.`);
  process.exitCode = 0; // advisory
} else {
  console.log('check-em-dashes: none in history/hersham prose, none in page metadata.');
}
