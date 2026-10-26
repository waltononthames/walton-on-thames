# Apps Court car boot status check

Reads the farm's own notice and records whether this Sunday's sale is on, so
`/things-to-do/apps-court-car-boot-sale/` stays right without anyone checking
by hand.

```bash
node tools/apps-court-check/run-check.mjs            # read and report
node tools/apps-court-check/run-check.mjs --write    # ...and update the record
node --test tools/apps-court-check/*.test.mjs        # the rules, as tests
```

Exit 0 means the source was read and understood. Exit 1 means it was not, and
that **nothing was changed**: the status file is left byte-for-byte as it was.
A stale page is recoverable; telling someone a cancelled sale is going ahead,
when they will load a car at 6am and drive to a field, is not.

## What the farm actually publishes

Three shapes, observed over about a year:

```
THE CAR BOOT IS OPEN THIS SUNDAY
THE CAR BOOT IS NOT OPEN THIS SUNDAY
THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH
```

A previous version of `decide.mjs` required day **and** month name **and** year
("...SUNDAY THE 25TH OCTOBER 2026"). The farm has never published that, so the
check refused every real notice, including ones that were accurate and current,
and failed twice a day without ever being able to succeed. Demanding a format
the source does not produce is not caution. If this rule is ever tightened
again, check it against the three strings above first.

## How a conclusion is reached

| The notice | What happens |
| --- | --- |
| Names a day that **is** the coming Sunday | Published, with the date. Dated structured data is emitted. |
| Names a day that is **not** the coming Sunday | Refused. The farm routinely leaves last week's notice up for days. |
| Names **no** day | Published as the farm's current wording, with **no date claimed** and no dated markup. |
| Anything else: unknown qualifications, two notices, a challenge page, no notice | Refused. |

Where the farm gives a bare ordinal, the month and year come from the Sunday
being tested, and the result must *be* that Sunday — so an absent month can
never widen what is accepted.

An undated notice is a deliberate middle path. It has sat byte-identical for 36
days across four Sundays, so it cannot support a date claim; but it is still
the farm's live published position, and refusing to show it leaves this page
less useful than the source it summarises.

### Alerting

A refusal because the farm's notice is stale is **not** an alert unless nothing
has verified for more than 10 days. The farm habitually leaves the previous
Sunday's notice up until Friday, so alerting on it would mean a failure email
twice a day, most weekdays, for ever — which trains the reader to ignore the
alerts that matter. Unreadable, unrecognised, conflicting and malformed notices
always alert, because those mean something has actually changed or broken.

## Reading the source

`curl`, not Node's `fetch`. Measured from the same residential machine within
seconds of each other:

| Client | User-agent | Result |
| --- | --- | --- |
| `curl` | `WaltonOnThamesBot/1.0` (honest) | 200, full page |
| `curl` | Chrome | 200, full page |
| `curl` | none | 403 |
| Node `fetch` (undici) | either | 403, challenge |

So the zone weighs the client's TLS/HTTP fingerprint as well as its address,
and the honest user-agent is fine — nothing here needs to impersonate a
browser, and identifying ourselves means the farm can refuse us deliberately
if they ever want to.

Cache headers (`CF-Cache-Status`, `Age`) are **recorded, not enforced**. An
earlier version failed the whole check on a `HIT`, but the farm's site is
itself behind Cloudflare, so a HIT is the normal case and says nothing about
whether the *notice* is current. Staleness is judged from the farm's own stated
date, in `decide.mjs`.

## Where it can run

**Not on a GitHub runner, and not on a Cloudflare Worker.** Measured: six curl
variants from a runner (HTTP/2, HTTP/1.1, TLS 1.3, browser headers, no
user-agent), a real headless Chromium, and a Worker with two user-agents — all
served a Cloudflare challenge. Apex and `www` behave identically, as do
`/sitemap.xml` and `/robots.txt`, so the refusal is host-level, not about this
page. The same curl build returns 200 from a domestic connection.

Two routes that do work:

1. **Any always-on machine on a domestic connection.** No account, no third
   party, no monthly cost. Leave `CARBOOT_FETCH_STRATEGY` unset — direct is the
   default — and cron `run-check.mjs --write` twice a day.
2. **A fetch service that egresses residentially**, via two repository secrets:
   `CARBOOT_FETCH_TEMPLATE` (a URL with `{url}` and `{key}`) and
   `CARBOOT_FETCH_KEY`. This deliberately routes around protection the farm
   switched on, which is why it is off by default and has to be configured on
   purpose.

Until one is configured the workflow **exits cleanly with these instructions in
its log** rather than failing twice a day, and the page shows the age of its
last reading so readers are not misled meanwhile.

## The workflow

Four cron firings at 03:05, 04:05, 18:05 and 19:05 UTC; the first step keeps
the two that are 4am and 7pm in London and discards the rest. GitHub cron is
UTC-only — an earlier version used a `timezone:` key on the schedule entry,
which is not documented GitHub workflow syntax and would silently drift an hour
every summer if ignored.

On a conclusive read it builds the site, runs `verify-built.mjs` against the
rendered HTML **before** committing, then commits the status and a regenerated
`lastmod.json` and pushes both together. A racing push fails rather than
rebasing a verdict onto unseen content. `verify-live.mjs` then confirms the
public page actually carries the new timestamp, so a successful commit that
never reaches readers is still reported as a failure.

Note the 15-hour / 9-hour gap between the two daily runs, not 12.

## What the page shows

The panel distinguishes three things a reader cares about, and never leaks the
verification machinery into prose (CLAUDE.md Rule 3 — `verify-built.mjs`
enforces this with a banned-phrase list):

- A confirmed, dated position: "Going ahead on Sunday 1 November 2026".
- The farm's undated wording, attributed to them.
- Not confirmed — either the farm has not posted for the coming Sunday yet, or
  nothing has been checked for a while. The panel says which, and how old the
  last reading is.

Staleness is computed at build time; the 01:00 UTC daily rebuild keeps it at
most a day behind. After 8 days a reading is treated as spent, since at least
one Sunday has certainly passed.

Dated structured data is emitted **only** when the farm stated the date, the
check confirmed it against the calendar, and that date has not passed.
`eventStatus` follows the real position, so a called-off sale publishes as
`EventCancelled` rather than as scheduled.

## Still to confirm in the real world

- A conclusive end-to-end run from a host that can actually read the source.
  Everything below the fetch has been exercised against the live HTML; the
  fetch itself has only ever succeeded from a domestic connection.
- Whether a failed Actions run reliably emails you. A failed run alone is not a
  guarantee of delivery, and a *missed* run notifies nobody at all.
- The Cloudflare dashboard HTML cache rule (see CLAUDE.md). Its TTL can delay a
  correct deploy reaching readers; `verify-live.mjs` will report that rather
  than hide it.
- Whether the sale actually ran on the Sundays covered by the long-frozen
  September–October notice. That would settle how much an undated notice is
  worth.
