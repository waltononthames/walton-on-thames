// Advisory (non-blocking) check for em dashes in the history/hersham
// collections, per docs/walton-history-hersham-extension.md Section 1,
// Rule 2 (Register): "No em dashes anywhere; use commas, colons or full
// stops." Scoped to these two collections only — that's where the rule is
// documented; it isn't stated as a site-wide requirement.
// Run manually or before a content-review session: `npm run content:em-dashes`.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIRS = ['src/content/history', 'src/content/hersham'];
let totalHits = 0;

for (const dir of DIRS) {
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const path = join(dir, name);
    const lines = readFileSync(path, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes('—')) {
        console.log(`${path}:${i + 1}  ${line.trim().slice(0, 120)}`);
        totalHits++;
      }
    });
  }
}

if (totalHits > 0) {
  console.log(`\ncheck-em-dashes: ${totalHits} em dash(es) found in history/hersham content — replace with commas, colons or full stops per the Register rule.`);
} else {
  console.log('check-em-dashes: no em dashes in src/content/history or src/content/hersham.');
}
