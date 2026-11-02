// Check the canonical URL without cache-busting: readers may receive old HTML
// even after a successful deployment. Dependencies are injectable for tests.
//
// GitHub's runners cannot always see the page: the site's own Cloudflare Bot
// Fight Mode served every request a managed challenge (HTTP 403,
// cf-mitigated: challenge) on every publish from 28 October to 1 November
// 2026, so this step failed nine times running while each reading was live
// within minutes. Bot Fight Mode cannot be given exceptions on the free plan.
// So once the page challenges us, the next best evidence is Cloudflare
// Pages' own "Deployed successfully" check on the pushed commit. That proves
// the build went out, though not that the HTML cache has let it through, and
// the run says which of the two it actually confirmed.
import { appendFileSync, readFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

const isChallenge = (response) => response.status === 403 && response.headers?.get?.('cf-mitigated') === 'challenge';

// 'success', 'pending', or a failure description, from the Cloudflare Pages
// check run on one commit. No such check yet counts as pending.
export async function pagesDeployState(sha, { repo, token, request = fetch } = {}) {
  const response = await request(`https://api.github.com/repos/${repo}/commits/${sha}/check-runs?check_name=${encodeURIComponent('Cloudflare Pages')}`, {
    signal: AbortSignal.timeout(15000),
    headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!response.ok) throw new Error(`GitHub check-runs API returned HTTP ${response.status}.`);
  const run = (await response.json()).check_runs?.[0];
  if (!run || run.status !== 'completed') return 'pending';
  if (run.conclusion === 'success') return 'success';
  return `Cloudflare Pages reported ${run.conclusion}${run.output?.title ? `: ${run.output.title}` : ''}`;
}

// 40 tries 30s apart, about 20 minutes. Shorter windows kept failing correct
// publishes: on 28 October 2026 the Pages deploy reached readers just after a
// 4.5-minute window closed, and on 29 October a 23:09 UTC push was still not
// live when a 10-minute window closed but was by 23:25.
export async function verifyDeployment(verifiedAt, { request = fetch, pause = setTimeout, attempts = 40, deployState = null } = {}) {
  if (!verifiedAt) throw new Error('No successful verification timestamp to verify.');
  const expected = `data-verified-at="${verifiedAt}"`;
  // What the last attempt actually saw. Every run from 28 October to 1
  // November 2026 failed here even though the page was live within minutes,
  // and the bare "not verified" message gave no way to tell a slow deploy
  // from a refused request. Report it rather than guess.
  let lastSeen = 'no attempt completed';
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
      if (response.ok && html.includes(expected)) return 'page';
      if (isChallenge(response) && deployState) {
        // Retrying the page is pointless now; ask Pages instead.
        let state;
        try {
          state = await deployState();
        } catch (error) {
          state = 'pending';
          lastSeen = `page challenged by Bot Fight Mode; ${error.message}`;
        }
        if (state === 'success') return 'deploy';
        if (state !== 'pending') throw Object.assign(new Error(`Public deployment failed. ${state}.`), { final: true });
        if (!lastSeen.startsWith('page challenged')) lastSeen = 'page challenged by Bot Fight Mode; Cloudflare Pages deploy still pending';
        console.log(`Attempt ${attempt + 1}/${attempts}: ${lastSeen}`);
        lastSeen = 'page challenged by Bot Fight Mode; Cloudflare Pages deploy still pending';
        if (attempt < attempts - 1) await pause(30000);
        continue;
      }
      const found = html.match(/data-verified-at="([^"]*)"/)?.[1];
      const mitigated = response.headers?.get?.('cf-mitigated');
      lastSeen = `HTTP ${response.status}${mitigated ? `, cf-mitigated: ${mitigated}` : ''}, `
        + (found ? `page shows an older reading (${found})` : `no reading on the page (${html.length} bytes)`);
    } catch (error) {
      if (error.final) throw error;
      lastSeen = `request failed: ${error.message}${error.cause?.message ? ` (${error.cause.message})` : ''}`;
    }
    console.log(`Attempt ${attempt + 1}/${attempts}: ${lastSeen}`);
    if (attempt < attempts - 1) await pause(30000);
  }
  throw new Error(`Public deployment not verified. Last attempt: ${lastSeen}.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const status = JSON.parse(readFileSync('src/data/apps-court-status.json', 'utf8'));
  const { GITHUB_SHA_PUBLISHED: sha, GITHUB_REPOSITORY: repo, GITHUB_TOKEN: token, GITHUB_STEP_SUMMARY: summary } = process.env;
  const deployState = sha && repo ? () => pagesDeployState(sha, { repo, token }) : null;
  let confirmed;
  try {
    confirmed = await verifyDeployment(status.verifiedAt, { deployState });
  } catch (error) {
    // Also onto the run's summary page: the step log is 40 attempts long and
    // hard to find, and the summary is what a failure email links to.
    if (summary) appendFileSync(summary, `\n### Why the live-page check failed\n\n${error.message}\n`);
    throw error;
  }
  const message = confirmed === 'page'
    ? 'Canonical public page contains the expected verification timestamp.'
    : "Cloudflare Pages reports the publish deployed successfully. The public page itself could not be read from GitHub, because the site's Bot Fight Mode challenges GitHub's servers, so the HTML cache was not checked.";
  console.log(message);
  if (summary) appendFileSync(summary, `\n### Live-page check\n\n${message}\n`);
}
