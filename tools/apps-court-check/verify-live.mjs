// Check the canonical URL without cache-busting: readers may receive old HTML
// even after a successful deployment. Dependencies are injectable for tests.
import { readFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
export async function verifyDeployment(verifiedAt, { request = fetch, pause = setTimeout, attempts = 10 } = {}) {
  if (!verifiedAt) throw new Error('No successful verification timestamp to verify.');
  const expected = `data-verified-at="${verifiedAt}"`;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await request('https://walton-on-thames.org/things-to-do/apps-court-car-boot-sale/', {
        signal: AbortSignal.timeout(15000), redirect: 'error',
        headers: { 'User-Agent': 'WaltonOnThamesBot/1.0 (+https://walton-on-thames.org/about/)' },
      });
      const html = await response.text();
      if (response.ok && html.includes(expected) && !html.includes('https://schema.org/EventScheduled')) return;
    } catch { /* bounded retry, then visible failure */ }
    if (attempt < attempts - 1) await pause(30000);
  }
  throw new Error('Public deployment not verified. Check Pages deployment and the HTML cache rule.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const status = JSON.parse(readFileSync('src/data/apps-court-status.json', 'utf8'));
  await verifyDeployment(status.verifiedAt);
  console.log('Canonical public page contains the expected verification timestamp.');
}
