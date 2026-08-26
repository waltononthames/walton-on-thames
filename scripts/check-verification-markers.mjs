// Content Verification Protocol, Rule 3: pages containing an unresolved
// [NEEDS VERIFICATION: ...] marker must never be built or published.
// This script runs as `prebuild` (locally and on Cloudflare Pages, which both
// invoke `npm run build`) and fails the build if any marker exists under src/.
//
// It also catches a second, looser failure mode found by the 16 July 2026
// external audit: The Heart Shopping Centre's "The Dining Room" listing had
// shipped with the sentence "Current trading status should be checked before
// publication": genuine unresolved-verification content, but phrased as
// free prose rather than the [NEEDS VERIFICATION] marker, so the original
// version of this script didn't catch it. PUBLICATION_STATUS_PHRASES below
// catches editorial/QA notes-to-self that should never reach committed
// content, regardless of exact wording. Keep this list narrow (meta-commentary
// about the draft's own readiness): it must never fire on legitimate
// historical hedging ("no verified register survives to confirm this") or
// reader-facing advice ("verify details with the organiser before attending"),
// both of which are required elsewhere in the protocol.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCAN_DIR = join(ROOT, 'src');
const MARKER = '[NEEDS VERIFICATION';
const PUBLICATION_STATUS_PHRASES = [
  'should be checked before publication',
  'should be checked before publishing',
  'needs to be verified before publishing',
  'not yet verified',
  'pending verification',
  'todo:',
  'fixme:',
  '[tbc]',
  '[placeholder]',
];
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
      const lower = line.toLowerCase();
      const hit = line.includes(MARKER)
        ? MARKER
        : PUBLICATION_STATUS_PHRASES.find(p => lower.includes(p));
      if (hit) {
        findings.push(`${path.slice(ROOT.length)}:${i + 1}  [${hit}]  ${line.trim().slice(0, 120)}`);
      }
    });
  }
}

walk(SCAN_DIR);

if (findings.length > 0) {
  console.error(`\nBUILD BLOCKED: ${findings.length} unresolved verification marker(s) or publication-status note(s) found (Content Verification Protocol, Rule 3):\n`);
  for (const f of findings) console.error(`  ${f}`);
  console.error('\nVerify each claim against a Tier 1/2 source and resolve the marker, or delete the claim. Do not soften the wording.\n');
  process.exit(1);
}

console.log('check-verification-markers: no unresolved [NEEDS VERIFICATION] markers or publication-status notes in src/.');
