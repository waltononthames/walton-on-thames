# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and dev commands

```bash
# PATH required on Windows/nvm-windows, prefix every Bash session:
export PATH="/c/nvm4w/nodejs:$PATH"

npm run dev      # local dev server at http://localhost:4321
npm run build    # production build → dist/ (prebuild fails the build if any [NEEDS VERIFICATION] marker exists in src/: see Content Verification Protocol Rule 3; postbuild runs Pagefind to index dist/ for site search)
npm run preview  # serve dist/ locally: required to test search; astro dev has no Pagefind index, /search/ shows a graceful "not available in preview" message instead
npm run check    # Astro type-check (run before pushing)
npm run content:stale-events  # advisory: flags recurring events whose date has lapsed (see Content-type requirements > Events listings below)
```

## Architecture

Astro v7 static site generator. All pages are pre-rendered at build time (`output: 'static'`). No server-side rendering.

**Content Collections (v2)** in `src/content/` (all glob-loaded markdown except `fixtures`):
- `businesses`, local business listings; `neighbourhood` is a free string (not enum) to support Weybridge/Shepperton/Esher
- `events`: one-off and recurring local events; past events are filtered out by the listing pages at build time (see Key constraints), not by the schema
- `places`, points of interest used on neighbourhood and visit pages
- `news`, editorial articles
- `history` / `hersham`: long-form local history articles; stricter schema than the rest: required `sources:` array (label + URL), `metaTitle` max 60 chars, `metaDescription` max 155, `publishDate`/`reviewedDate` as dates
- `fixtures`: Walton & Hersham FC fixtures, no markdown files: a custom loader (`src/loaders/fixtures-loader.ts`) fetches the club's official ECAL ICS feed live at build time and converts UTC kickoffs to Europe/London wall-clock time

(The former `neighbourhoods` collection was retired; its content was folded into the homepage, `/hersham/` and `/living/`.)

Schemas are in `src/content.config.ts`. Route pages live in `src/pages/` with `[slug].astro` dynamic routes powered by `getStaticPaths()`.

**Layouts and components:** `src/layouts/BaseLayout.astro` wraps every page. Key components: `Header.astro`, `Footer.astro`, `BusinessCard.astro`, `PlaceCard.astro`, `EventCard.astro`.

**Styles:** `src/styles/global.css` has brand tokens (CSS variables), shared utilities and card/grid classes. Component-scoped styles go inside each `.astro` file's `<style>` block. Vite/Astro compiles `max-width: 900px` to `width<=900px` (modern CSS), requires Safari 16.4+.

## Deployment

**Cloudflare Pages** auto-deploys on push to `main`. Build command: `npm run build`. Output directory: `dist`. No `wrangler.toml`: that file caused Cloudflare to run `npx wrangler deploy` (Workers mode) and fail. Do not recreate it.

**Daily rebuild:** `.github/workflows/daily-rebuild.yml` calls a Cloudflare deploy hook at 01:00 UTC so past events are filtered from the live site and the FC fixtures feed is re-fetched. The `CF_DEPLOY_HOOK` secret must be set in GitHub repository settings.

**Builds need network access:** the fixtures loader fetches a remote ICS feed during `astro build`/`astro sync`. If the fetch fails it logs an error and keeps previously synced entries (a cold build with no cache will simply have zero fixtures: it will not fail the build).

**Sitemap lastmod is committed, not derived:** Cloudflare clones at depth 1, so `git log -1 -- <file>` returns HEAD for every file and would stamp the whole sitemap with the deploy time. `scripts/generate-lastmod.mjs` runs in prebuild, writes `src/data/lastmod.json` from full history, and no-ops on a shallow clone. **Commit that file when it changes** or production dates will lag behind the content.

**Edge cache gotcha:** a Cloudflare dashboard-level Cache Rule (not in this repo, `public/_headers` only covers `/assets/*` and `/images/*`) caches HTML at the edge for up to 7 days. A successful deploy can therefore appear "not live" for days. If a verified deploy isn't showing, the fix is a manual "Purge Everything" in the Cloudflare dashboard, not a code change.

**Redirects:** legacy URL migrations (old GoDaddy-era paths, `/visit/*`, `/community/*`, retired pages) live in `public/_redirects`. `functions/_middleware.js` 301s the `walton-on-thames.pages.dev` host to the canonical domain.

## Key constraints

**Mobile menu (Header.astro):** Uses `touchend` as the primary event and `click` as fallback (with a `tapped` dedup flag). `click` events are unreliable inside `position: fixed` elements on iOS Safari. The hamburger must be at least 44×44px and the script uses `is:inline` to avoid Astro module bundling. Do not switch back to a `hidden` attribute or `display:none`, visibility is toggled via `.is-open` class.

**Astro CSS scoping:** Component `<style>` blocks are scoped with `[data-astro-cid-xxx]` attributes at build time. Use `:global()` only when you need to target markdown-rendered content (e.g., inside `.prose`).

**Event date filtering:** Past events must be excluded by the pages that list them, not by the schema. The daily cron rebuild ensures the live site stays current without a code change.

**`is:inline` scripts:** Required for any script that must run before hydration or that interacts with the DOM immediately. Without it, Astro may defer/bundle the script and it will miss the `DOMContentLoaded` window.

**`getStaticPaths()` isolation:** Astro extracts `getStaticPaths()` into its own module chunk at build time. It cannot reference top-level frontmatter variables declared outside it, even in the same file: you get `X is not defined` at build time despite valid-looking JS. Declare anything it needs inside the function (duplicating a declaration at top level for the render body if both need it).

**Title suffix:** `BaseLayout.astro` appends `" | Walton-on-Thames.org"` to a `title` prop only when two things hold: the title does not already contain "Walton-on-Thames", and the result still fits inside 60 characters. Past that, Google truncates, and the brand would only displace words people search for. A long title is therefore emitted exactly as written, while a short one gains 23 characters: check the built output, not the source, when judging title length.

## Adding content

All content files are Markdown with YAML frontmatter. Match the schema in `src/content.config.ts` exactly, extra fields are ignored; missing required fields cause a build error.

- **New business:** `src/content/businesses/<slug>.md`: required: `name`, `slug`, `category`, `neighbourhood`, `description`
- **New event:** `src/content/events/<slug>.md`: required: `title`, `slug`, `start`, `neighbourhood`, `category`, `venue`; optional `end`
- **New place:** `src/content/places/<slug>.md`: required: `name`, `slug`, `category`, `neighbourhood`, `description`
- **New article:** `src/content/news/<slug>.md`: required: `title`, `slug`, `date`, `category`, `description`
- **New history/Hersham article:** `src/content/history/<slug>.md` or `src/content/hersham/<slug>.md`: required: `title`, `metaTitle` (≤60), `metaDescription` (≤155), `slug`, `cluster`, `entityType`, `publishDate`, `reviewedDate`, `sources` (array of label+URL, required by the Content Verification Protocol below), `related`
- **FC fixtures:** never add manually: they come from the live feed via `src/loaders/fixtures-loader.ts`

## SEO and structured data

`BaseLayout.astro` outputs `<meta>` tags from `title`, `description`, `image` props. Neighbourhood and place pages include JSON-LD BreadcrumbList. The sitemap is generated by `@astrojs/sitemap` (configured in `astro.config.mjs`), excluding `/contact/thank-you`.

## Site search

Client-side search via [Pagefind](https://pagefind.app/): no backend, indexes `dist/` after every build (`postbuild` script). `BaseLayout.astro`'s `<main>` carries `data-pagefind-body={!noIndex}`, so a page is searchable exactly when it's indexable (the same `noIndex` prop already used for `<meta name="robots">`), no separate exclude list to maintain. `/search/` (`src/pages/search.astro`) mounts Pagefind's Default UI and reads an initial `?q=` param, which is what the homepage's JSON-LD `SearchAction` and the header search icon both link to. Pagefind's assets only exist after a real build: `astro dev` doesn't have them, so the search page shows a plain "not available in preview" fallback there; use `npm run preview` (or the `walton-preview` launch config, port 4322) to test search for real.

## Content strategy documents

The site strategy and page specifications live in `docs/walton-seo-blueprint.md` and `docs/walton-history-hersham-extension.md`. Before building any page, read the relevant numbered section plus Section 1 of the extension (editorial rules) and follow both exactly.

Check `docs/site-audit.md` before creating any page; never create a new page where an ADAPT or MERGE entry exists.

Log completed pages and open VERIFY items in `docs/build-log.md`.

**Hersham head-term work** is governed by `docs/hersham-head-term-plan.md`, a phased checklist for ranking `/hersham/` for "Hersham" and "Hersham Village". Take the next unchecked item in the lowest incomplete phase, or run `/hersham` which does the same. Cloudflare-side redirect configuration for the `hersham.org.uk` domain lives in `docs/hersham-org-uk-redirects.md`; it is applied in the Cloudflare dashboard, not from this repo.

**Before touching any page, classify it against `docs/historical-content-strategy.md`**: it governs which editorial standard applies:
- **Historical/heritage content** (local history, historic buildings/streets/estates, past residents and businesses, wartime/church/transport history, biographies, archaeology): governed in full by `docs/research-and-editorial-standards.md` (v1.0, adopted 1 August 2026). That document supersedes the Content Verification Protocol below for this content class: it's far more detailed (source-type-specific rules, evidence states, citation house style, a pre-publication checklist, and an Appendix C written directly for automated agents). Read Appendix C and Section 20 before publishing any history/heritage page. The Content Verification Protocol below remains a useful quick-reference summary, but where the two differ, the Standards document wins.
- **Current/practical content** (business listings, opening hours, event calendars, transport/parking info, directory pages), prioritise current accuracy against official sources and clear user journeys; do not dress this up with academic citations it doesn't need. Governed by the Content Verification Protocol below until a dedicated Current Information Standards document exists.
- **Hybrid pages** (e.g. a historic venue's page that also lists its current opening hours): apply both standards, one per content block. A building's opening date needs a historical source per the Standards document; today's opening hours just need to link to the venue's own site.
- If genuinely unsure which class a page falls into, treat it as historical/heritage: the stricter standard is always safe to over-apply, never the reverse.

Both documents are operational standards governed by *Our Charter* (published at `/charter/`, `src/pages/charter.astro`: there's no separate docs/ copy, that page is the source of truth). Neither may be read as overriding it; if they ever conflict, the Charter wins and the lower document needs amending.

# Content Verification Protocol

<!-- These rules are NON-NEGOTIABLE and override all other instructions in any session -->

## Core Principle

This site's entire value proposition is accuracy. A single invented pub, wrong opening time, or fabricated historical date destroys trust with residents and visitors and undermines our goal of ranking top for Walton-on-Thames searches. Google's helpful content systems reward demonstrable accuracy and first-hand expertise.

**The prime directive: if you cannot verify it, do not write it. No exceptions.**

## Rule 1: The Verification Standard

A fact is verifiable ONLY if it comes from one of these sources, checked in this session:

**Tier 1 (authoritative, cite directly):**

- Official websites of the business, venue, or organisation itself
- Elmbridge Borough Council and Surrey County Council official pages
- Companies House records
- National Rail / Real Time Trains data
- Historic England listings and the National Heritage List
- Walton Charity archival material provided by Darren
- Ordnance Survey data

**Tier 2 (acceptable with corroboration from a second source):**

- Established local press (Surrey Live, local BBC coverage)
- Google Business Profiles (for existence and address only, never opening hours)
- Published local history books with named authors, provided by Darren

**Tier 3 (NEVER acceptable as sole source):**

- Training data / model memory
- TripAdvisor, forums, Reddit, social media posts
- Other aggregator or directory sites
- AI-generated content found on the web

**Model memory is not a source.** Knowledge of Walton-on-Thames from training data must be treated as unverified rumour until confirmed against Tier 1 or Tier 2 sources within the current session.

## Rule 2: Prohibited Inventions

NEVER generate, under any circumstances:

- Names of pubs, restaurants, cafes, shops, or businesses not confirmed to exist via a Tier 1 or Tier 2 source
- Opening hours, prices, menus, or contact details from memory
- Specific historical dates, names, or events without a documented source
- Quotes attributed to any person, living or historical
- Statistics (population figures, visitor numbers, distances) without a source
- Event dates, times, or venues not confirmed by the iCal feed or organiser's own site
- Reviews, testimonials, or "local opinion" of any kind
- Plausible-sounding filler details ("the pub dates back to the 17th century", "a favourite with locals") unless documented

## Rule 3: The Flag-and-Stop Procedure

When a fact cannot be verified:

1. Insert the marker `[NEEDS VERIFICATION: description of the claim and what source is required]` at the exact point in the draft
2. Do NOT publish, commit, or build the page containing an unresolved marker
3. List all markers in a summary at the end of the session output
4. Never resolve a marker by softening the language ("reportedly", "it is said that"). Hedged fabrication is still fabrication. Either verify it or delete it.

**Never ship a QA note as prose either.** A 16 July 2026 audit caught a listing published with the sentence "Current trading status should be checked before publication": genuine unresolved-verification content, just not wearing the marker. `scripts/check-verification-markers.mjs` now also hard-blocks the build on a narrow set of editorial-meta-commentary phrases ("should be checked before publication", "not yet verified", "TODO:", "[TBC]", etc.) in addition to the literal marker. If you catch yourself writing a sentence *about* whether the content is ready to publish, that's the marker in disguise: use the real marker instead, don't just phrase it as a caveat.

## Rule 4: Content-Type Requirements

**Business and venue listings:**

- Confirm current existence via the business's own website or Google Business Profile checked this session
- Address must match the official source character for character
- Opening hours: link to the business's own site rather than stating hours; if hours must be stated, add a "correct as of [date]" line and source them from the official site only
- If a business appears to have closed, flag it; do not guess

**Local history articles (e.g. Walton Bridge):**

- Every date, name, and event must trace to a named source
- Maintain a source list at the foot of each article draft (author, title, year, page or URL)
- Where sources conflict, present the conflict openly rather than picking one silently
- Walton Charity archival material is our strongest asset; cite it explicitly to signal original research

**Events listings:**

- Only from the automated iCal feeds or the organiser's official page
- Never extrapolate recurring events ("the market runs every Saturday") without confirmation for the current period
- `recurring: true` events carry one hardcoded `start`/`end` date, not a rule: once it lapses the build-time filter (correctly) drops it from "Coming Up" rather than showing anything wrong, but the listing then just goes silently invisible until a human re-dates it. Run `npm run content:stale-events` at the start of any content session to see which ones need re-checking. When you do, re-verify against the live source before bumping the date: don't just add 7 days. A term-time-only session (school library storytimes etc.) can lapse into a school holiday; check school term dates before assuming "same day next week" still holds.

**Practical information (transport, parking, amenities):**

- National Rail data for train services, council pages for parking and amenities
- Never state fares, tariffs, or charges from memory

## Rule 5: Web Search and Fetch Discipline

- When search or fetch tools are available, verification searches are MANDATORY before writing any factual claim, not optional
- Record the URL and access date of every source used in a `sources:` block in the page frontmatter or a comment
- If tools are unavailable in a session, content generation is limited to: restructuring existing verified content, formatting, code, and drafts composed entirely of `[NEEDS VERIFICATION]` placeholders around a factual skeleton supplied by Darren

## Rule 6: Pre-Commit Checklist

Before any content commit, confirm and state explicitly:

1. Zero unresolved `[NEEDS VERIFICATION]` markers
2. Every named business, person, place, and organisation was verified this session
3. Every date and statistic has a traceable source recorded
4. No opening hours, prices, or contact details are stated from memory
5. Sources block is present and complete
6. Nothing has been softened with hedging language to smuggle in an unverified claim

If any item fails, do not commit. Report the failure instead.

## Rule 7: Honesty Over Completeness

A shorter, accurate page always beats a longer page padded with plausible inventions. If verified material only supports 300 words, write 300 words. Gaps are acceptable; fabrications are not. When in doubt, say so and ask Darren.
