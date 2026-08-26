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
// Scope was widened again at Darren's request: em dashes are unwanted
// anywhere, not only where a reader sees them, so this now covers src,
// scripts, .github, public/_redirects and CLAUDE.md.
//
// What is not checked: docs/, whose build log is a dated historical record
// that quotes em dash examples from previous cleanups, and the two code
// literals listed in PROTECTED.
//
// Run with `npm run content:em-dashes`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const EM = '—';
const ROOTS = ['src', 'scripts', '.github', 'public/_redirects', 'CLAUDE.md'];

// Two em dashes are code rather than prose: this file's own matcher, and a
// migration regex that parses source labels containing the character.
// Rewriting either would break the tool that depends on it.
const PROTECTED = [/const EM = /, /label\.match\(/];

// Nothing is skipped by context any more: comments, provenance fields and
// developer notes were cleaned along with everything else, so a dash
// reappearing in one is a regression worth reporting.
const SKIP_LINE = [];

function walk(dir, out = []) {
  try {
    if (statSync(dir).isFile()) return out.concat(dir);
  } catch {
    return out;
  }
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(astro|md|ts|js|mjs|json|ya?ml|txt)$/.test(e.name) || e.name === '_redirects') out.push(p);
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
      if (PROTECTED.some((re) => re.test(line))) return;
      console.log(`${file}:${i + 1}  ${line.trim().slice(0, 130)}`);
      hits += line.split(EM).length - 1;
    });
  }
}

if (hits > 0) {
  console.log(`\ncheck-em-dashes: ${hits} em dash(es) found. Replace with a comma, a colon or a full stop. A colon usually suits a clause or a list; a comma suits a short aside; paired dashes wrapping an aside often want brackets or a rewrite.`);
} else {
  console.log('check-em-dashes: none anywhere in src, scripts, .github, _redirects or CLAUDE.md.');
}
