// Check the canonical URL without cache-busting: readers may receive old HTML
// even after a successful deployment. Dependencies are injectable for tests.
import { readFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
// 40 tries 30s apart, about 20 minutes. Shorter windows kept failing correct
// publishes: on 28 October 2026 the Pages deploy reached readers just after a
// 4.5-minute window closed, and on 29 October a 23:09 UTC push was still not
// live when a 10-minute window closed but was by 23:25.
export async function verifyDeployment(verifiedAt, { request = fetch, pause = setTimeout, attempts = 40 } = {}) {
  if (!verifiedAt) throw new Error('No successful verification timestamp to verify.');
  const expected = `data-verified-at="${verifiedAt}"`;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await request('https://walton-on-thames.org/things-to-do/apps-court-car-boot-sale/', {
        signal: AbortSignal.timeout(15000), redirect: 'error',
        headers: { 'User-Agent': 'WaltonOnThamesBot/1.0 (+https://walton-on-thames.org/about/)' },
      });
      const html = await response.text();
      // Only the timestamp is checked here. Whether the structured data is
      // correct was already settled against the built HTML by
      // verify-built.mjs before the push; a blanket ban on EventScheduled
      // at this stage would fail every correctly published open Sunday.
      if (response.ok && html.includes(expected)) return;
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
