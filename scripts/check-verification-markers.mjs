// Content Verification Protocol, Rule 3: pages containing an unresolved
// [NEEDS VERIFICATION: ...] marker must never be built or published.
// This script runs as `prebuild` (locally and on Cloudflare Pages, which both
// invoke `npm run build`) and fails the build if any marker exists under src/.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCAN_DIR = join(ROOT, 'src');
const MARKER = '[NEEDS VERIFICATION';
const SKIP_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.svg', '.woff', '.woff2']);

const findings = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (SKIP_EXTENSIONS.has(extname(name).toLowerCase())) continue;
    const lines = readFileSync(path, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes(MARKER)) {
        findings.push(`${path.slice(ROOT.length)}:${i + 1}  ${line.trim().slice(0, 120)}`);
      }
    });
  }
}

walk(SCAN_DIR);

if (findings.length > 0) {
  console.error(`\nBUILD BLOCKED — ${findings.length} unresolved [NEEDS VERIFICATION] marker(s) found (Content Verification Protocol, Rule 3):\n`);
  for (const f of findings) console.error(`  ${f}`);
  console.error('\nVerify each claim against a Tier 1/2 source and resolve the marker, or delete the claim. Do not soften the wording.\n');
  process.exit(1);
}

console.log('check-verification-markers: no unresolved [NEEDS VERIFICATION] markers in src/.');
