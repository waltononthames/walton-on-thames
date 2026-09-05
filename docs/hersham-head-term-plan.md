# Hersham head-term plan: ranking `/hersham/` for "Hersham" and "Hersham Village"

**Status:** adopted 3 September 2026. Execution document for Claude Code (Opus) sessions.
**Owner:** Darren. **Target page:** `https://walton-on-thames.org/hersham/` (source: `src/pages/hersham/index.astro`).
**Governing documents (read first, every session):** `CLAUDE.md`, `docs/walton-history-hersham-extension.md` section 4.1 including the 2026-08-31 amendment, `docs/research-and-editorial-standards.md` Appendix C for any history content, `docs/site-audit.md` before creating any page.

This plan is a checklist. Each session picks the next unchecked item in phase order, does it completely, verifies it, ticks it here, and logs it in `docs/build-log.md`. Items marked **[Darren]** need an action only the owner can take (dashboards, photographs, emails); Opus prepares everything up to that point and leaves a clear handover note in the build log.

---

## 0. Where we stand (audit, 3 September 2026)

**The page itself is in good shape.** The hub was rebuilt on 31 August to compete for the head term: about 1,000 words of sourced prose, six H2s, a hub link grid covering 18 Hersham destinations, a live "What's on in Hersham" block, a `Place` entity with `alternateName` "Hersham Village", geo, `containedInPlace` and `sameAs` to Wikipedia and Wikidata `Q5744439`, plus `FAQPage` and `BreadcrumbList`. Title is "Hersham Village, Surrey | Walton-on-Thames.org" (47 characters). The Hersham corpus is 27 sitemap URLs and roughly 24,000 words.

**What the SERPs look like today** (US-indexed search, so treat as indicative; Darren's Search Console is the truth):

| Query | Who ranks | What it means for us |
|---|---|---|
| "Hersham" | Wikipedia, Apple Maps, FamilySearch, Tripadvisor, Wikishire, hotel and travel aggregators. `walton-on-thames.org` not in the top ten. | Bare toponym. Wikipedia plus a knowledge panel will hold the top of the page. The realistic prize is **first result after Wikipedia**, and the largest share of clicks from people who want a guide rather than an encyclopaedia entry. |
| "Hersham Village" | hershamvillage.co.uk (exact-match domain, community directory with an Aug 2026 planning news post), Wikipedia, Wikishire, the Village Market and Village Society Facebook pages. | Winnable outright. The competitor is thin (about 1,200 words on the homepage, three news posts in eight months), built on a generic directory platform, and has no history or heritage content at all. |
| "living in Hersham" | Foxtons, Zoopla, Rightmove, area-guide affiliates, hershamvillage.co.uk. | `/hersham/living/` is the right spoke; it needs depth and inbound links. |
| "Hersham news" | Surrey Live, Ground News, Surrey Police, hershamvillage.co.uk/news, Elmbridge council. | We have no Hersham news stream. Freshness is the one signal the hub only gets from the events block. |

**Old site debris still in Google's index:** `walton-on-thames.org/forum/viewtopic.php?...` threads (three of them about Hersham) and `/?page_id=84`. The forum URLs 404, the query-string homepage returns 200 with a correct canonical. Neither harms the Hersham page; see 1.4.

**Technical faults found (fix first, they are cheap and real):**

1. `https://www.walton-on-thames.org/` **serves the whole site with a 200**, not a redirect. Every page exists twice; only the canonical tag tells Google which to keep. `functions/_middleware.js` only redirects the `pages.dev` host.
2. `hersham.org.uk` **301s to the www host**, `https://www.walton-on-thames.org/hersham/`, so a visitor lands on the duplicate, and after fix 1 it becomes a two-hop chain. Every path on hersham.org.uk collapses to the hub (`/parakeets/` does not reach `/hersham/parakeets/`). `www.hersham.org.uk` returns a Cloudflare 522 (no origin behind it).
3. **Cannibalisation on Hersham Green.** `/things-to-do/hersham-village-green/` (from `src/content/places/hersham-village-green.md`) is live, in the sitemap, linked from five things-to-do pages, and duplicates `/hersham/hersham-green/`. `docs/site-audit.md` line 43 already decided MERGE with a redirect; the merge never happened. The old copy also carries an unsourced claim ("serving locals for centuries") that the Standards would not pass.
4. The hero image is a single 380 KB, 2048 by 768 WebP with no `srcset` and no preload. It is the LCP element on the hub and on `/things-to-do/hersham/`.
5. Cloudflare Web Analytics is still commented out in `BaseLayout.astro`, so there is no on-site traffic data at all.

**Facts about the levers, so nobody wastes a session on them:**

- An exact-match domain has carried no meaningful ranking weight since Google's 2012 EMD update. `hersham.org.uk` is worth having for redirect hygiene, memorability and offline outreach, not for ranking by itself. A redirect passes the domain's own link equity, and it currently has none that we know of.
- `FAQPage` rich results have been restricted to government and health sites since August 2023. Keep the FAQ (it feeds People Also Ask and AI Overviews), but do not expect expandable results in the SERP.
- Nobody outranks Wikipedia for a bare English place name by writing more words. The extension amendment is right: the hub stays at 900 to 1,100 words of prose, and depth goes into spokes. **Never fatten the hub.**

---

## 1. Phase 1: technical hygiene (one session, week 1)

- [x] **1.1 Canonical host redirect.** **Done 4 September 2026** (commit `57a061c`), with pages.dev preview subdomains and localhost deliberately exempt so branch previews and `wrangler pages dev` keep working. **Verified live 4 September 2026:** `www.walton-on-thames.org/hersham/` 301s to the apex, the apex still returns 200, and path and query survive. One residual: an `http://www.` request takes two hops, because Cloudflare's Always Use HTTPS fires at the edge before the middleware and upgrades on the same host first. Https traffic is unaffected and a two-hop chain is harmless, so this is noted rather than chased. A zone-level Redirect Rule would collapse it if it ever matters.
  - Original specification: Extend `functions/_middleware.js` so any hostname other than `walton-on-thames.org` (www, pages.dev, anything else Cloudflare routes here) 301s to the apex with path and query preserved. Make the existing pages.dev behaviour a case of the general rule, not a second branch. Verify after deploy with `curl -sI https://www.walton-on-thames.org/hersham/` (expect 301, `Location: https://walton-on-thames.org/hersham/`) and confirm the apex still returns 200. Remember the edge cache: if the www host still 200s an hour after a green deploy, it is the dashboard Cache Rule, and the fix is "Purge Everything" **[Darren]**.
- [ ] **1.2 hersham.org.uk redirect map** **[Darren applies, Opus prepares].** The domain is a Cloudflare zone (server header confirms it), so the redirect lives in the dashboard, not this repo. The exact rules are written up in `docs/hersham-org-uk-redirects.md` (prepared 4 September 2026, includes a paste-ready brief for Cloudflare's dashboard AI assistant). Darren applies them:
  - Redirect Rule 1 (path map, static): for each Hersham slug on the site, `hersham.org.uk/<slug>` and `hersham.org.uk/<slug>/` go to `https://walton-on-thames.org/hersham/<slug>/` (301). Generate the list from the `hersham` collection plus `history`, `living`, `food-and-drink`, `development-and-planning`, `whiteley-village`, and two aliases: `station` to `/hersham-railway-station/`, `things-to-do` to `/things-to-do/hersham/`.
  - Redirect Rule 2 (catch-all): everything else to `https://walton-on-thames.org/hersham/` (301). Target the **apex**, never www.
  - DNS: add a proxied `AAAA 100::` (or `A 192.0.2.1`) for `www.hersham.org.uk` so the redirect rules fire instead of the 522. Enable "Always Use HTTPS" on the zone.
  - Add `hersham.org.uk` as a Domain property in Search Console **[Darren]** so any links pointing at it become visible.
  - Verify: `curl -sI https://www.hersham.org.uk/parakeets/` returns a 301 to `https://walton-on-thames.org/hersham/parakeets/`, one hop.
- [x] **1.3 Hersham Green merge. Done 4 September 2026.** Nothing needed migrating: every fact on the old page was already on `/hersham/hersham-green/` with sources. Nine links repointed across five pages (the plan listed four; `walton-and-hersham-fc.astro` was a fifth it missed). Two knock-on fixes: Walton Bridge promoted to `featured` so the homepage keeps three place cards, and the riverside-walks meta description no longer claims Hersham content the page no longer holds.
  - Original specification: Retire `src/content/places/hersham-village-green.md`. Before deleting, check `src/pages/things-to-do/[slug].astro` and `src/pages/things-to-do/hersham.astro` for anything that reads the *places* entry (the things-to-do page reads the separate `attractions` JSON, which stays). Move any verified fact the old page had that `/hersham/hersham-green/` lacks (the practical "getting there" lines, if sourced) into the hersham-green entry. Add `/things-to-do/hersham-village-green/ /hersham/hersham-green/ 301` to `public/_redirects`, and repoint the five internal links (`coronation-recreation-ground-hersham.astro`, `hersham-recreation-ground.astro`, `safari-adventure-golf.astro`, `things-to-do/index.astro`, and the attractions card href if it points at the old URL). Run `npm run seo:links` to confirm no dangling link. Log the retirement in `docs/site-audit.md` section 7.
- [x] **1.4 Legacy URLs: leave alone, note the decision. Done 4 September 2026.** Both classes re-checked live first: the forum threads return a true 404 with the site's own 404 page, and `/?page_id=84` returns 200 with a canonical to the homepage. Recorded in `docs/site-audit.md` under "Pre-Astro URLs still in Google's index", with the condition that would reopen it.
  - Original specification: The `/forum/*` threads should stay 404 (redirecting hundreds of unrelated threads to one page is a soft-404 pattern Google discounts). `/?page_id=84` is the homepage with a correct canonical; no action. Record this in `docs/site-audit.md` so nobody re-opens it.
- [x] **1.5 Hero image performance. Done 4 September 2026.** A 1200px viewport now fetches 109KB instead of 372KB. The srcset lives once in `src/utils/hero-images.ts` and is read by both the `<img>` and the preload link, because declaring it twice by hand is how a preload ends up fetching a file the img then ignores. Card images were already lazy, so no change was needed there. The un-suffixed original is kept, unreferenced by any `<img>`, as the Open Graph image.
  - Original specification: With sharp (already a dependency), generate 800, 1200 and 2048 px WebP variants of `hersham-green-village-sign-hero.webp` at quality 72 into `public/images/`, add `srcset`/`sizes` on both pages that use it, and add a `<link rel="preload" as="image" imagesrcset=... imagesizes=...>` for the hub via a new optional `preloadImage` prop on `BaseLayout.astro` (only the hub and things-to-do/hersham pass it). Confirm below-the-fold event card images carry `loading="lazy"`. Target: hero request under 120 KB on a 1200 px viewport.
- [ ] **1.6 Analytics** **[Darren supplies token].** Uncomment the Cloudflare Web Analytics beacon in `BaseLayout.astro` and set the token. Without this there is no way to see whether the hub's visitors go on to spokes.
- [ ] **1.7 Search Console baseline** **[Darren]**. Confirm the `walton-on-thames.org` Domain property exists and Bing Webmaster Tools is verified (blueprint section 12, items 2 and 8, has required this since launch). Export the last 3 months of the Performance report filtered to queries containing "hersham" and save the CSV as `docs/rank-log/2026-09-baseline.csv`. Opus then writes `docs/hersham-rank-log.md` with the baseline position and clicks for the query set in section 7.

Phase 1 gate: `npm run check`, `npm run build`, `npm run seo:validate`, `npm run seo:links` all clean; `src/data/lastmod.json` committed; the curl checks above pass on the live host.

---

## 2. Phase 2: hub refinements (one session, week 2)

The amendment's constraints hold: prose stays 900 to 1,100 words, links not cards, no new H2 that duplicates a spoke. These are precision changes.

- [x] **2.1 "Hersham at a glance" fact box. Done 4 September 2026.** Nine rows, each with its source recorded in a code comment. The ward needed real checking: Hersham North and Hersham South no longer exist and were replaced by a single Hersham Village ward, confirmed against Elmbridge Borough Council's own councillor index. Postcode district rather than postcode, because the village spans KT12 4 and KT12 5. **No new mirrors into the `Place` JSON-LD:** schema.org has no population property for a Place, `containedInPlace` already carried Elmbridge and Surrey, and a single `postalCode` would be wrong for a two-sector village. The graph work belongs to 2.2.
  - Original specification: directly under the hero, as a compact `<dl>`, not prose. Fields: county, borough, post town and postcode district, nearest stations, parliamentary constituency, council ward(s), population (2021 built-up area), Wikipedia and Wikidata links. Every value needs a Tier 1 source recorded in a code comment (ONS for population, Elmbridge council for wards, Parliament or the Boundary Commission for the constituency, which changed at the 2024 boundary review, so do not assume the old name). Mirror the same values into the `Place` JSON-LD where a property exists. This is the block that answers "what is Hersham" queries and feeds AI Overviews.
- [x] **2.2 Entity graph tightening. Done 4 September 2026.** All 15 pages under `/hersham/` now reference one `Place` node defined only on the hub, plus `/things-to-do/hersham/`, which is about the same village and would have been an arbitrary omission. `seo-validate` enforces both halves and was confirmed non-vacuous. Walton history articles are untouched, keyed off `cluster`.
  - Original specification: Give the `Place` an `@id` (`https://walton-on-thames.org/hersham/#place`), wrap the hub in a `WebPage` node with `about` pointing at that id and `isPartOf` pointing at `https://walton-on-thames.org/#website`, and have every Hersham spoke's `Article`/`WebPage` schema declare `about: {"@id": ".../hersham/#place"}` (implement once in `HistoryArticle.astro` and the Hersham route pages, keyed off `cluster === 'hersham'`). Add `hasMap` pointing at an OpenStreetMap URL for the green's coordinate. Extend `scripts/seo-validate.mjs` to assert the Place `@id` and the `about` reference on every URL under `/hersham/`.
- [x] **2.3 "Hersham Village" in the copy. Done 4 September 2026.** Verified against the photograph itself, not the alt text: the sign reads HERSHAM VILLAGE on ironwork with a robin on top. **Deviated from the specified wording.** The plan proposed "and that is what most people call it", which is an unverifiable claim about local usage, exactly the plausible filler Rule 2 forbids. The published sentence states only what the sign says.
  - Original specification: The sign in the hero photograph reads "Hersham Village"; say so in one sentence in the intro ("The sign on the green reads Hersham Village, and that is what most people call it") so the phrase exists in visible body text, not only the title and schema. That sentence is verifiable from the photograph itself. Do not repeat the phrase elsewhere.
- [x] **2.4 FAQ review against People Also Ask. Done 4 September 2026.** Now at the seven-question cap. Added "Which council covers Hersham?" and "How far is Hersham from London?". **Declined the plan's third candidate, "What postcode is Hersham?":** the fact box added in 2.1 sits directly above the FAQ and already states the postcode district, so an FAQ repeating it would duplicate an answer within a single screen. Both additions draw on sources already verified on this site rather than new claims.
  - Original specification: Keep the five existing questions. Consider adding, only where a Tier 1 source exists: "What postcode is Hersham?", "Which council covers Hersham?", "How far is Hersham from London?" (use a National Rail journey time, not a distance from memory). Cap at seven questions; the block must stay visible markup driven from the same `faqs` array.
- [ ] **2.5 Photography** **[Darren]**. The build log has flagged missing Hersham photography since July. Ask for a set of Darren's own photographs: the green and pond, St Peter's, the parade, the Mole meadows, the station, the parakeet roost at dusk. Opus converts to 1200 px WebP, adds them to the hub (two or three, captioned, `ImageObject` with `creator` and `copyrightNotice`) and to the matching spokes. Original photography is the one asset neither Wikipedia nor the competitor can copy, and it opens Google Images as a second entry route to the hub. Follow `docs/research-and-editorial-standards.md` on image permissions (the Walton Life mural precedent applies: no graphic works without permission).
- [ ] **2.6 Hersham news block on the hub**, gated on Phase 3.6 producing at least three items: the two most recent `news` entries with `neighbourhood: hersham`, as compact links under the events block, with a "More Hersham news" link to a static `/hersham/news/` index. Do not build the block before there is content for it.

Phase 2 gate: hub prose word count printed and confirmed between 900 and 1,100; Rich Results Test on the live URL **[Darren pastes result]** shows Breadcrumb and no errors; `seo:validate` extended and green.

---

## 3. Phase 3: grow the corpus with spokes (two spokes per month, ongoing)

Every spoke follows the standard Hersham content rules: `src/content/hersham/<slug>.md`, full frontmatter, `sources` block, 500 or more *verified* words (shorter is fine if that is all the sources support), links to `/hersham/`, one Hersham sibling and one Walton page where the subject crosses (extension section 5), and a link added to the hub's `exploreGroups` grid. Check `docs/site-audit.md` before creating any of these. Priority order:

- [x] **3.1 `/hersham/hersham-green-shopping-centre/`. Done 5 September 2026.** 635 words, four Tier 1 sources, no Tier 3 anywhere. The story turned out to be better than the plan assumed: a Safeway that Morrisons acquired, a Waitrose from 9 June 2005 opened by an Olympic sailor, a redevelopment of the car park refused in October 2024, then the anchor tenant buying the freehold in February 2026. **The centre's construction date is not stated:** the widely repeated "early 1980s" traces only to a directory site, and no Tier 1 or Tier 2 source consulted gives a year. Two Partnership figures for the shop's size disagree and the page says so rather than picking one.
  - Original specification: (entityType place). The centre, its early-1980s origin, the Waitrose anchor, and the 2026 acquisition by Waitrose that hershamvillage.co.uk reported in February. Sources: John Lewis Partnership or Waitrose press material, Elmbridge planning records, Companies House for the owning entity. This is the most searched current-affairs topic in the village and we have nothing on it.
- [x] **3.2 `/hersham/community-groups/`. Done 5 September 2026.** 599 words. The merger is confirmed by the group's own site; the Electoral Commission gives the Village Society's party registration and its voluntary deregistration on 30 June 2025. **Two organisations named in the plan were dropped:** Hersham Churches Together's domain does not resolve at all, and Hersham Baptist Church's site shows nothing newer than 2024, so neither could be said to be currently active. Committee members and the register's home address are deliberately not republished.
  - Original specification: (entityType institution). The Hersham Village Society and Hersham Residents Association merged into the Hersham Community Group in October 2025 (verify on hershamcommunitygroup.co.uk and the Electoral Commission de-registration record). Cover Hersham Churches Together, the Village Market, the Live Music Club, library groups. Every organisation named gets an outbound link, which is also the outreach list for Phase 6.
- [x] **3.3 Schools. Done 5 September 2026, and the answer was no new page.** `/hersham/living/` already covers all four schools in depth, with addresses, phases, their own sites, Ofsted links and a documented policy of linking ratings rather than restating them. A separate spoke would have duplicated it and recreated exactly the cannibalisation item 1.3 removed. Took the plan's other branch instead and corrected the existing section: added Bell Farm's specialist centre, added Cardinal Newman's postcode and dropped a contested governance label, added Three Rivers' trust, opening date and its Hersham address. **Found and fixed an inconsistency I introduced in 2.4:** the hub FAQ said Hersham has two councils without mentioning that both are abolished on 1 April 2027, which four other pages already state.
  - Original specification: if `/hersham/living/` does not already cover schools in depth; otherwise expand the living page section. Sources: Surrey CC school pages, Ofsted for existence and phase only (never quote ratings without a date).
- [ ] **3.4 `/hersham/hersham-in-wartime/`** (entityType event). The 4 September 1940 Vickers raid (named in the extension section 4.2 but not built as its own page), the industrial estates' war work, Hersham's memorial. Sources per the Standards: Surrey History Centre, Imperial War Museum memorials register, CWGC.
- [ ] **3.5 `/hersham/weylands-farm-and-the-drill-plough/`** (entityType event) if sources exist beyond Wikipedia; otherwise leave the sentence on the history hub as it is. Do not build a spoke on a single Tier 2 source.
- [ ] **3.6 Hersham news stream.** Commit to at least one `news` entry per month with `neighbourhood: hersham`, drawn only from Tier 1 sources: Elmbridge council news and planning decisions (the "Shaping Hersham" programme and the Hersham Place Technology Park redevelopment already have council pages), Surrey CC library and highways notices, Walton & Hersham FC official announcements. Reportage, not campaigning: the development-and-planning page's editorial stance applies (report what is proposed and at what stage; take no position). This is what gives the hub and `/hersham/development-and-planning/` a freshness signal the competitor's three posts a year cannot match.
- [ ] **3.7 Quarterly re-verification** of every existing Hersham spoke: re-check each `sources` URL, update facts that changed, bump `reviewedDate` only when something actually changed (a `dateModified` bump with no change is a signal Google discounts and a claim the Standards forbid).

Corpus target: from about 24,000 words to 35,000 by December 2026, entirely in spokes.

---

## 4. Phase 4: internal linking (one session, week 3, then per spoke)

Only eight source files link to `/hersham/` in body copy today; the rest is nav, footer and breadcrumbs. Component-level fixes, per extension section 5:

- [ ] **4.1 Directory pages.** In `src/pages/directory/[slug].astro`, when `neighbourhood` is `hersham` (or `whiteley-village`), render the neighbourhood badge as a link to `/hersham/` and add one closing sentence linking to `/hersham/food-and-drink/` for food categories or `/hersham/living/` for services. Seven Hersham listings gain contextual links to the hub immediately, and every future one inherits it.
- [ ] **4.2 Event pages and cards.** Where an event has `neighbourhood: hersham`, the event detail page links "in Hersham" to the hub and the venue line links to the venue's directory page where one exists.
- [ ] **4.3 Walton pages that mention Hersham.** Audit with `grep -rn "Hersham" src/content/history src/pages/history src/pages/things-to-do` and make the first mention on each page a link to the hub or the specific spoke (HWM, Walton Hop and Sham 69, William Lilly, the station pages, the FC page).
- [ ] **4.4 Anchor text variety.** Across the site use "Hersham", "Hersham village", "Hersham, Surrey", "our Hersham guide". Never the same phrase everywhere, never a keyword-stuffed anchor.
- [ ] **4.5 Extend `scripts/seo-links.mjs`** to print inbound body-link counts per URL under `/hersham/` and warn when any Hersham URL has fewer than three inbound links from outside nav, footer and breadcrumbs. Run it as part of the phase gate from now on.
- [ ] **4.6 Breadcrumbs.** Hersham-scoped things-to-do and directory pages could carry Home, Hersham, Page. Only do this if the visible breadcrumb and the JSON-LD change together and the site's breadcrumb pattern elsewhere stays consistent; otherwise leave as is.

---

## 5. hersham.org.uk: the decision

**Keep it as a 301 to the hub. Do not build a second site on it.**

Why: a standalone Hersham site would start with zero authority, split the link graph, and duplicate the content of a section that already ranks on a domain with a 26-year history. The exact-match domain gives no ranking credit. Everything the domain *can* give, it gives as a redirect: any link anyone ever points at hersham.org.uk flows to the hub, and it prints and reads far better than a subdirectory.

Use it for what it is good at:

- **The printed and spoken URL for Hersham.** Leaflets at Hersham Library and the Friday market, a card in the parade's shop windows, the Walton & Hersham FC matchday programme, the Hersham Community Group newsletter. People type it, land on the hub, and analytics shows the traffic as direct.
- **The URL you offer when asking for a link.** Local organisations are more willing to link "hersham.org.uk" than a long walton-on-thames.org path, and a mix of both link targets looks natural.
- **Outreach email identity** **[Darren]**: an `@hersham.org.uk` address for the Phase 6 emails reads as local, not as a Walton site asking for favours.

Revisit only if, after six months of Phases 1 to 6, Search Console shows the hub stuck below position 5 for "hersham village" while spokes rank well. That would suggest brand-name mismatch, and the remedy then would be a subdomain or section move, evaluated on the numbers, not now.

---

## 6. Phase 6: authority and links (ongoing, five targets per month)

Opus drafts; Darren sends. Every pitch offers a specific page that the target's readers would want, never "please link to our Hersham guide". Store drafts in `docs/outreach/hersham/` with a status table.

- [ ] **6.1 Local organisations (link and mention targets):** Hersham Community Group, Hersham Churches Together, Hersham Baptist Church, St Peter's Church, Hersham FC, Walton & Hersham FC (the fixtures feed we already carry is a natural reciprocal hook), Esher Rugby, Hersham Golf Club, Burhill Golf Club, Whiteley Village Trust, Hersham Library (Surrey CC), the Village Market, lovewalton.co.uk, Elmbridge Museum.
- [ ] **6.2 Topic pitches beyond the village:** the parakeets page to bird and wildlife groups and the Surrey Bird Club; Sham 69 to punk history sites and the Walton Hop coverage; Queen Victoria's first steam train to railway history societies and the Royal Collection Trust's diary project; Whiteley Village to Arts and Crafts and almshouse heritage bodies; Hersham Lodge and Hersham Place to industrial-archaeology and motoring history groups. The extension's KPI stands: ten new referring domains in six months.
- [ ] **6.3 Wikipedia.** Do not add links to our own site (conflict of interest, and it will be reverted). The article's two external links currently point to archived dead sites; the legitimate route is a note on the article's Talk page, disclosing the connection and suggesting the hub and specific sourced spokes as replacements, then leaving it to editors. Opus drafts the Talk note; Darren posts it **[Darren]**.
- [ ] **6.4 Local press.** Surrey Live has a Hersham section. Pitch dated hooks: the anniversary of Victoria's diary entry each February, the Vickers raid each 4 September, the parakeet roost in autumn, and any Waitrose or Shaping Hersham milestone. Each pitch links to the spoke, and the spoke links to the hub.
- [ ] **6.5 Social** **[Darren]**. The Organization schema lists Instagram, X and Facebook. Post every Hersham spoke and news item there and in the Hersham community Facebook groups, using the hersham.org.uk short URLs from 1.2.

---

## 7. Phase 7: measurement and cadence

**Query set** (track monthly in `docs/hersham-rank-log.md`, one row per query per month, position and clicks, landing URL): hersham; hersham village; hersham surrey; hersham green; things to do in hersham; hersham history; hersham parakeets; living in hersham; hersham station; hersham news; hersham shopping centre; is hersham a nice place to live; hersham village market.

**Monthly session** (Darren exports the CSV, Opus does the rest):

1. Update the rank log from the export.
2. Flag any query where two of our URLs both receive impressions (cannibalisation) and decide which one owns it; fix with a link, a title change, or a merge.
3. Flag any query at position 3 to 10 whose CTR is below the site average: rewrite that page's title and description, re-verify, redeploy, note the date.
4. Confirm the nightly rebuild is still changing the hub's events block (curl the live page and check the first event card against the events collection).
5. Pick the next two spokes from Phase 3 and the next five outreach targets from Phase 6.

**Milestones:**

| When | Expect |
|---|---|
| Week 1 | Phase 1 live; www and hersham.org.uk redirect chains single-hop; Hersham Green cannibalisation removed. |
| Week 3 | Phases 2 and 4 live; Rich Results Test clean; analytics reporting. |
| 3 months | "hersham village" top 3; "hersham" first page; at least six new spokes; three referring domains. |
| 6 months | "hersham village" position 1; "hersham" first non-Wikipedia organic result; ten referring domains; corpus 35,000 words. Review the hersham.org.uk decision against the numbers. |

If a milestone is missed, the monthly session diagnoses from the query report before anyone changes the hub. The most likely causes, in order: links not yet earned, spokes not yet indexed, a title that is not winning clicks. None of them is fixed by adding words to the hub.

---

## 8. Session prompt for Opus

```
Read CLAUDE.md, docs/hersham-head-term-plan.md, and the governing documents
it names. Take the first unchecked item in the lowest incomplete phase
(skip items marked [Darren] unless the owner has supplied what they need,
and say so). Do it completely, run npm run check, npm run build,
npm run seo:validate and npm run seo:links, commit src/data/lastmod.json
if it changed, tick the item in the plan, and append an entry to
docs/build-log.md. Any fact you cannot verify against a Tier 1 or Tier 2
source this session gets a [NEEDS VERIFICATION] marker and does not ship.
Never add prose to /hersham/ beyond the 900 to 1,100 word band.
```
