// Advisory (non-blocking) check for em dashes in anything a reader sees.
//
// The register rule in docs/walton-history-hersham-extension.md Section 1,
// Rule 2 ("No em dashes anywhere; use commas, colons or full stops") was
// originally scoped to the history and hersham collections, on the grounds
// that it was not stated as a site-wide requirement. That scope was widened
// deliberately: the rule now covers all user-facing content and metadata.
//
// What is checked: body prose in every collection, page copy and JSX text in
// src/pages, src/components and src/layouts, every <title> and meta
// description, and the JSON content files behind the attraction cards.
//
// What is not: JS/TS comments, JSDoc, the `source:` provenance field and the
// `$schema` note, none of which reach a reader. Log messages in src/loaders
// are developer output and are left alone too.
//
// Run with `npm run content:em-dashes`.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const EM = '—';
const ROOTS = ['src/content', 'src/pages', 'src/components', 'src/layouts', 'src/data'];

const SKIP_LINE = [
  /^\s*(\/\/|\*\s|\/\*|\*\/)/, // JS/TS comment or JSDoc continuation
  /^\s*<!--/,                  // HTML comment
  /^\s*source:/,               // provenance, never rendered
  /^\s*"\$schema"/,            // developer note in JSON
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(astro|md|ts|js|mjs|json)$/.test(e.name)) out.push(p);
  }
  return out;
}

let hits = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('\n');
    lines.forEach((line, i) => {
      if (!line.includes(EM)) return;
      if (SKIP_LINE.some((re) => re.test(line))) return;
      console.log(`${file}:${i + 1}  ${line.trim().slice(0, 130)}`);
      hits += line.split(EM).length - 1;
    });
  }
}

if (hits > 0) {
  console.log(`\ncheck-em-dashes: ${hits} em dash(es) in user-facing content. Replace with a comma, a colon or a full stop. A colon usually suits a clause or a list; a comma suits a short aside; paired dashes wrapping an aside often want brackets or a rewrite.`);
} else {
  console.log('check-em-dashes: none in user-facing content or metadata.');
}
