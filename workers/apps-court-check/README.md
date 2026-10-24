# Apps Court car boot check (Cloudflare Worker)

Reads the car boot notice on `appscourtfarm.com/carboot` twice a day, so
`/things-to-do/apps-court-car-boot-sale/` can say whether this Sunday's sale is
on or off without anyone checking by hand.

**This version writes nothing**, and the host it was written for turned out not
to work. Keep this directory for `parse-notice.mjs` and its tests, which are
pure and host-agnostic; `worker.mjs` and `wrangler.deploy.toml` are kept only
as the record of a ruled-out option. See the result below before reaching for
them again.

## The question this exists to answer

`appscourtfarm.com` is behind a Cloudflare managed challenge, and whether a
given host gets through depends on the IP, not on the browser:

| Reading from | Result |
| --- | --- |
| Residential IP, plain `curl`, no JavaScript | HTTP 200, full 111,884-byte page, notice present |
| GitHub Actions runner, real Playwright Chromium | HTTP 403, `Just a moment...`, no page |

Even `robots.txt` is challenged from a datacentre IP, so there is no published
crawl policy to consult either way: the protection is blanket, not aimed at
this.

So GitHub Actions cannot host the read. A Cloudflare Worker was the next
candidate, because its requests originate inside Cloudflare's own network and
it needs no hardware and no third party.

## The answer: a Worker is blocked too

Tested 24 October 2026 by deploying this Worker to a temporary preview account
and calling `/?ua=both`:

| User-agent | Result |
| --- | --- |
| `WaltonOnThamesBot/1.0` (honest) | HTTP 403, challenge interstitial, 46ms |
| Chrome 131 (browser string) | HTTP 403, challenge interstitial, 3ms |

Both rejected identically, and the browser string in 3ms — Cloudflare is not
evaluating the agent at all, it is refusing the network. Being inside
Cloudflare's own network confers nothing against another zone's bot
management.

**Do not retry this route.** Three hosts have now been tested and the pattern
is consistent: residential egress works, datacentre egress does not,
regardless of browser or user-agent.

The remaining options are a machine on a residential connection (where a bare
`curl` already works), a cloud job routed through a residential-proxy fetch
service, or asking the farm for a feed or an allowance.

## Deploying it (for the record: this route is ruled out)

Needs `wrangler` authenticated against the Cloudflare account that hosts the
site (`npx wrangler login`).

```bash
npx wrangler deploy --config workers/apps-court-check/wrangler.deploy.toml
```

Note the explicit `--config`: the file is deliberately not called
`wrangler.toml`, because such a file in this repository once made Cloudflare
build the site in Workers mode and fail. See the comments in
`wrangler.deploy.toml`.

## How the question was answered

The deploy prints a `*.workers.dev` URL. Then, in one request:

```bash
curl "https://apps-court-check.<your-subdomain>.workers.dev/?ua=both"
```

Read `results[].httpStatus` and `results[].parsed.verdict`:

- `httpStatus: 200` with `verdict: "off"` (or `"on"`) — **the Worker can read
  the page.** Build the write path here.
- `verdict: "blocked"`, or a 403 — **Cloudflare challenges its own network
  too.** Stop; the check needs a different host. The remaining options are an
  always-on machine on a residential connection, or a cloud job routed through
  a residential-proxy fetch service.

`?ua=both` reads twice, once with an honest `WaltonOnThamesBot/1.0`
user-agent and once with a browser string, so a block on the agent can be told
apart from a block on the IP. If the honest agent works, that is the one to
keep.

To lock the endpoint down afterwards:

```bash
npx wrangler secret put CHECK_KEY --config workers/apps-court-check/wrangler.deploy.toml
```

With that set, the endpoint 404s unless called with `?key=<value>`. The
scheduled runs are unaffected.

## The scheduled runs

Cron is UTC-only, so all four of 03:00, 04:00, 18:00 and 19:00 UTC fire and the
Worker discards the two that are not 4am or 7pm in London. That keeps the
check at the right local time across the clock change, which this page has
already had one bug from.

Scheduled runs log a single JSON line each. With `[observability]` enabled they
are in the dashboard; live:

```bash
npx wrangler tail apps-court-check --config workers/apps-court-check/wrangler.deploy.toml
```

## The parser

`parse-notice.mjs` is pure and has no I/O, so it runs unchanged in the Worker,
in Node and in a test:

```bash
node workers/apps-court-check/parse-notice.test.mjs
```

The one thing to understand before changing it: **the notice wording appears
twice on the page.** The block inside `<main>` is the weekly notice and is the
only one that counts. A site-wide strip (`class="announcement"`, above the nav)
carries near-identical wording but is a stale reusable element — in September
2026 it read "THE CAR BOOT IS OPEN THIS SUNDAY" while linking to a 2025
Christmas shop product. The parser keeps the two apart, takes the verdict from
`<main>` alone, and records a disagreement rather than resolving it.

Two traps the tests pin down, both found against the live page rather than by
guessing:

- The standing prose **"The car boot is closed from 1pm"** is a closing *time*,
  not a cancellation. A notice must name a day to count, or that sentence turns
  every run into a false conflict.
- The theme uses announcement-classed `<nav>` and `<a>` elements inside the
  strip, so the strip is matched by class on any tag, with depth-aware nesting.

Anything outside the known vocabulary (`IS OPEN`, `IS NOT OPEN`, `IS CLOSED`)
returns `unrecognised`, and the caller must then change nothing. A wrong "on"
sends people to a field for nothing, which is worse than a stale page.
