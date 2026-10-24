// Cloudflare Worker that reads Apps Court Farm's car boot notice twice a day.
//
// THIS VERSION WRITES NOTHING. It reads, parses and reports, and that is all.
// It exists to answer one question before any commit logic is built: does
// Cloudflare challenge a request coming from its own network?
//
// The background: appscourtfarm.com sits behind a Cloudflare managed
// challenge. A GitHub Actions runner driving a real Playwright Chromium was
// served "Just a moment..." with HTTP 403, while a plain curl from a
// residential IP got the full page with no JavaScript at all. So the block is
// IP reputation, not a browser requirement, and the only open question is
// which hosts are trusted. If this Worker is also challenged, the check needs
// a different home and nothing further should be built here.
//
// Once that is settled, the write path (commit src/data/apps-court-status.json
// via the GitHub API, which also triggers the Cloudflare Pages deploy) goes in
// as a separate change.

import { parseNotice } from './parse-notice.mjs';

const SOURCE_URL = 'https://www.appscourtfarm.com/carboot';

// The honest default: it names the site and links somewhere explaining what
// this is, so the farm can allow or block it deliberately rather than having
// to guess. A browser string is available to the test endpoint only, because
// whether an honest agent gets through is itself one of the things worth
// knowing -- and if it does, that is the posture to keep.
const USER_AGENTS = {
  bot: 'Mozilla/5.0 (compatible; WaltonOnThamesBot/1.0; +https://walton-on-thames.org/about/)',
  browser:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
};

const londonParts = (date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    weekday: 'short',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
    // "24" at midnight on some ICU versions, so normalise.
    hour: Number(get('hour')) % 24,
    weekday: get('weekday'),
  };
};

async function readNotice(userAgentKey = 'bot') {
  const startedAt = Date.now();
  const outcome = {
    sourceUrl: SOURCE_URL,
    userAgent: userAgentKey,
    httpStatus: null,
    ok: false,
    bytes: 0,
    elapsedMs: 0,
    parsed: null,
    error: null,
  };

  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        'User-Agent': USER_AGENTS[userAgentKey] ?? USER_AGENTS.bot,
        // Asking for what a browser asks for, without pretending to be one.
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
      // The notice changes at most a few times a week, but a cached copy would
      // defeat the entire point of checking twice a day.
      cf: { cacheTtl: 0, cacheEverything: false },
      redirect: 'follow',
    });

    outcome.httpStatus = response.status;
    const html = await response.text();
    outcome.bytes = html.length;
    outcome.ok = response.ok;
    outcome.parsed = parseNotice(html);
  } catch (error) {
    outcome.error = String(error && error.message ? error.message : error);
  }

  outcome.elapsedMs = Date.now() - startedAt;
  return outcome;
}

export default {
  // Cron fires at 03:00, 04:00, 18:00 and 19:00 UTC. Only two of those four
  // are 4am and 7pm in London, and which two depends on whether BST is in
  // effect -- hence the guard rather than four actions. Cloudflare cron is
  // UTC-only, and this page has already had one bug from a hardcoded offset.
  async scheduled(event, env, ctx) {
    const now = new Date(event.scheduledTime);
    const london = londonParts(now);
    const isTargetHour = london.hour === 4 || london.hour === 19;

    if (!isTargetHour) {
      console.log(
        JSON.stringify({
          action: 'skipped',
          reason: `London hour is ${london.hour}, not 4 or 19`,
          cron: event.cron,
          scheduledUTC: now.toISOString(),
        }),
      );
      return;
    }

    const outcome = await readNotice('bot');
    console.log(
      JSON.stringify({
        action: 'read',
        cron: event.cron,
        scheduledUTC: now.toISOString(),
        london,
        httpStatus: outcome.httpStatus,
        bytes: outcome.bytes,
        elapsedMs: outcome.elapsedMs,
        verdict: outcome.parsed?.verdict ?? null,
        bannerDayOfMonth: outcome.parsed?.bannerDayOfMonth ?? null,
        mainNotices: outcome.parsed?.mainNotices?.map((n) => n.text) ?? [],
        announcementNotices: outcome.parsed?.announcementNotices?.map((n) => n.text) ?? [],
        notes: outcome.parsed?.notes ?? [],
        error: outcome.error,
      }),
    );

    // Deliberately nothing else. No commit, no write, no notification: this
    // build is a read-only prover.
  },

  // Manual endpoint, so the Cloudflare question can be answered immediately
  // after deploying instead of waiting for a cron window. Returns the same
  // information the scheduled run logs.
  //
  //   GET /                -> read with the honest bot user-agent
  //   GET /?ua=browser     -> read with a browser user-agent, to separate
  //                           "this IP is blocked" from "this agent is blocked"
  //   GET /?ua=both        -> both, for a single-request comparison
  async fetch(request, env) {
    const url = new URL(request.url);

    // Gated only if a key has been set, so there is nothing to configure
    // before the first test, and a way to lock it down afterwards.
    if (env.CHECK_KEY && url.searchParams.get('key') !== env.CHECK_KEY) {
      return new Response('Not found\n', { status: 404 });
    }

    const requested = url.searchParams.get('ua') ?? 'bot';
    const keys = requested === 'both' ? ['bot', 'browser'] : [requested];
    const unknown = keys.filter((k) => !(k in USER_AGENTS));
    if (unknown.length) {
      return Response.json(
        { error: `Unknown ua ${JSON.stringify(unknown)}. Use bot, browser or both.` },
        { status: 400 },
      );
    }

    const results = [];
    for (const key of keys) results.push(await readNotice(key));

    return Response.json(
      {
        readOnly: true,
        note: 'This Worker reports only. It does not write the status file.',
        nowLondon: londonParts(new Date()),
        results,
      },
      { headers: { 'cache-control': 'no-store' } },
    );
  },
};
