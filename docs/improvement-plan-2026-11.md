# Improvement plan, November 2026: Walton-on-Thames, Hersham and Whiteley Village

**Status:** research and planning only. No site content and no code was changed to produce it.
**Prepared:** 9 and 10 November 2026, against `main` at commit `3a4f250` (10 November 2026, 05:11 UTC).
**Owner:** Darren. **Goal:** be the best site on the internet for the three places, and reach Google UK's top 3 for their names and main variants where that is achievable.
**Governing documents:** `CLAUDE.md`, *Our Charter* (`/charter/`), `docs/research-and-editorial-standards.md`, `docs/historical-content-strategy.md`, `docs/site-audit.md`. This plan sits beside `docs/hersham-head-term-plan.md` and `docs/directory-plan.md` and does not replace either. Where an item is already planned there, this plan points to it.

## Read this first: what this plan is built on

Three of the four data sources the brief asked for could not be used in this session. That shapes everything below, so it is stated before anything else.

| Source the brief relied on | What happened | What it means |
|---|---|---|
| Search Console export, `docs/gsc/2026-11-09/` | **Not in the repository.** Checked the working tree, all 15 remote branches and the git history on 9 November, and again on 10 November. Nothing was uploaded to the session. | The only Search Console figures in this plan are the ones quoted in the brief. They are labelled **[B]**. Every task that needs the rows themselves is marked blocked. |
| Semrush, UK database | **Every tool returned `no_api_units`** on 9 November and again on 10 November: domain overview, organic research, keywords, backlinks, competitors, site audit, projects. The account has an active subscription but not enough API units. More units: https://www.semrush.com/mcp-access | No search volumes, keyword difficulty, UK ranking positions, backlink profile, keyword gap or backlink gap. |
| Live fetches of the site, Google and competitor pages | **Blocked by the cloud environment's network allowlist.** The proxy refused `walton-on-thames.org`, `www.walton-on-thames.org`, `google.co.uk`, `en.wikipedia.org`, `elmbridge.gov.uk`, `lovewalton.co.uk` and others (HTTP 403 on CONNECT; the fetch tool reported the same hosts as unresolvable). | No live check of the www redirect, no UK results pages, no reading of competitor pages. |
| The repository, its documents and a full production build | **Available and used in full.** Built twice (commits `b1ce661` and `3a4f250`) and audited with scripts, Lighthouse and a headless browser. | Sections 2.6 and 2.7, and the page-level parts of every other section, are measured. |

A general web search tool was available. It searches a US index that is not Google, returns titles and URLs only, and did not return `walton-on-thames.org` for any query. It is used here only to confirm that a page exists, never as a ranking.

**So this is a plan in two parts.** Part one is what the build and the documents prove, which is a good deal, and includes faults that are costing visitors today. Part two is the ranking, keyword and competitor analysis, which is specified exactly but cannot be completed until the inputs in Appendix A arrive. Section 4, Phase 0, is how to close that gap in one session.

### Labels used throughout

| Label | Meaning |
|---|---|
| **[M]** | Measured in this session. The tool or file is named. |
| **[B]** | A figure quoted in the brief from the Search Console export (17 July to 7 November 2026, web search, all countries). Not seen or checked by me. |
| **[D]** | Recorded in a repository document, named, and not re-verified this session. |
| **[W]** | A web search result in this session: US index, title and snippet only, page not fetched. URL given. |
| **[I]** | My inference. |

---

## 1. Summary

### Where we stand

| Place | Head term and position [B] | The page that has to rank | Its state today [M] |
|---|---|---|---|
| **Walton-on-Thames** | "walton on thames" 11.0 | Homepage `/` (assumed, see 2.0.1) | A portal of cards, not a page about the town. Title leads with the brand: "Walton-on-Thames.org \| Things to Do, Eat & Explore". H1 names three places. One paragraph of 191 words describes Walton. The section structure in blueprint 4.1 was never built. Fast and technically clean. |
| **Hersham** | "hersham" 10.6, "hersham village" 24 | `/hersham/` | The strongest hub on the site: about 1,080 words, fact box, linked `Place` entity, live events block. But only 24 pages link to it from body content, 14 of them inside `/hersham/`. All six internal-linking items in the Hersham plan (Phase 4) are still unticked, and none of the five outreach approaches drafted on 6 September is recorded as sent. |
| **Whiteley Village** | "whiteley village" 6.4 | `/hersham/whiteley-village/` | One 816-word page. Its title names the county but neither Hersham nor Walton-on-Thames. Two of its six sources are Wikipedia. It does not link to the site's own listings for the village café or post office. On a phone it lays out wider than the screen. |

After roughly four months in its present structure (every history and Hersham article carries a publish date between July and September 2026 [M]), the site sits between positions 6 and 11 for three of the four head terms [B]. That is a reasonable start. [I] The gap to the top 3 does not look like a shortage of content: the site has 420 indexable pages, and its best-built hub, `/hersham/`, is the one furthest from its target on "hersham village".

### The five actions that matter most

1. **Make the homepage the page about Walton-on-Thames.** It is the only candidate for the head term and it is the one hub that never received the treatment `/hersham/` got. Title, H1, a sourced "at a glance" box, the blueprint's section structure, and a proper place entity. (Backlog B1 to B3.)
2. **Send the outreach that is already written, then widen it.** `docs/outreach/hersham/README.md` states the Hersham plan's diagnosis in one line: the hub "can be beaten on links long before it is beaten on content". Five approaches were drafted on 6 September; the status table still shows all five as drafted and twelve targets as not started [D]. Nothing in this session could measure the site's links, which is itself the point: there is no evidence that any have been earned. (B20 to B23.)
3. **Finish the internal linking the site already planned, and extend it.** 4 of 37 Hersham and Whiteley Village listings link into `/hersham/`. None of the 97 event pages links to its venue's guide, although 46 are at Riverhouse Barn and 12 at the Playhouse. Four pairs of "visit" and "history" pages about the same place have no link in either direction, and two more link one way only. Three guides have no inbound link at all. (B8 to B12.)
4. **Give Whiteley Village a page that earns its position.** Give it a title that names the town, replace the Wikipedia sourcing with Historic England, the Trust and the council, connect it to the listings the site already holds, and send the approach to the Trust. Build spokes only where the data, once available, shows distinct demand. (B4 to B7.)
5. **Fix what is measurably broken on phones.** 52 pages, including the Apps Court page that is the site's top landing page [B], lay out wider than a 360px screen. The cause is three small CSS faults, proved by test. The two slowest photo pages tested take 5.2 and 8.8 seconds to show their main image in a mobile lab test. Three quarters of search traffic is mobile [B]. (B14 to B16.)

Before any of these: put the three missing inputs in place and re-run the blocked sections (Phase 0). Without them the order above is a judgement, not a ranking.

### What is realistically achievable

These are judgements, not forecasts. No results-page or backlink data was available, so each should be replaced after the Phase 0 re-run. None is a promise.

| Horizon | Walton-on-Thames | Hersham | Whiteley Village |
|---|---|---|---|
| **3 months** (February 2027) | Homepage rebuilt and re-indexed. "walton on thames" settles on page one rather than straddling pages one and two. *Confidence: low to medium.* | "hersham" holds page one. "hersham village" reaches page one from 24. The Hersham plan's own three-month target (top 3 by early December) will be missed. *Confidence: medium, then low.* | Page repaired and retitled. Position holds or improves slightly. *Confidence: medium.* |
| **6 months** (May 2027) | Mid page one, if the first links have arrived. *Confidence: low.* | "hersham village" top 5. "hersham" approaching the first result after Wikipedia. *Confidence: low to medium.* | Position 3 to 5. *Confidence: low to medium.* |
| **12 months** (November 2027) | Top 5 is plausible. **Top 3 is unlikely** unless the results page turns out to be weaker than expected. | "hersham village" top 3 is plausible. "hersham" at 2 to 4, behind Wikipedia. | **Position 3 is the realistic ceiling.** |

### Where top 3 is unrealistic, and why

- **Position 1 for any bare place name.** In this session's searches Wikipedia was the first result for "Walton-on-Thames", "Hersham" and "Whiteley Village" and the second for "Hersham Village" [W], and the Hersham plan recorded the same pattern in September [D]. A place-name query also draws a knowledge panel and map that no publisher controls [I]. The prize is the first independent guide result.
- **"whiteley village", positions 1 and 2.** The Whiteley Homes Trust's own site and Wikipedia are the natural first two [I]. The name is also shared: the retail centre at Whiteley, Hampshire, opened as "Whiteley Village" in 1999 before being rebuilt and renamed in 2013 [W: [portsmouth.co.uk](https://www.portsmouth.co.uk/retro/whiteley-shopping-centre-ghost-town-outlet-village-demolished-rebuilt-two-years-8555127), [en.wikipedia.org/wiki/Whiteley](https://en.wikipedia.org/wiki/Whiteley)]. Some of that term's impressions belong to another county.
- **Business-name queries in the directory.** Google answers these with the business's own profile and site [I]. See 2.0.3.
- **Property queries.** Every result set for "Walton on Thames" this session contained estate-agent area guides (Zoopla, Foxtons, Fine & Country, Sotheby's, Curchods) [W]. Portals own this intent and the blueprint's `/living/property/` page is not recommended.

---

## 2. Findings by research area

### 2.0 Search Console baseline

The export was not available, so this section answers each question as far as the build and the brief's figures allow, and says exactly which rows would finish the job.

#### 2.0.1 Head terms: which URL ranks, and what separates it from the top 3

| Query | Position [B] | Ranking URL | State of that URL [M] |
|---|---|---|---|
| whiteley village | 6.4 | Not determinable without the export. `/hersham/whiteley-village/` is the page about the village. Five other titles also contain the name: two listings, `/living/`, `/getting-here/` and a heraldry article. | See 2.5. |
| hersham | 10.6 | As above. `/hersham/` is the designed target. | Title "Hersham Village, Surrey \| Walton-on-Thames.org" (46 characters), H1 "Hersham", 9 H2s, 1,078 words in `<main>`. Lighthouse mobile 100. |
| walton on thames | 11.0 | As above. Almost certainly `/`. | See 2.0.2. |
| hersham village | 24 | As above. If this is not `/hersham/`, that is a finding in itself. | "Hersham Village" appears in the title, once in the body and in the fact box (the ward name). |

**To settle the ranking URL in two minutes:** Search Console, Performance, add a Query filter set to "Exact query", then open the Pages tab. Repeat for the four terms. If two URLs share a term's impressions, record both: that is cannibalisation and it changes the fix.

**What separates each from the top 3 cannot be measured in this session.** It needs the UK results page (Semrush or a live fetch). What can be said:

- [M] The on-page gaps are in 2.0.2, 2.5 and 2.6.
- [D] In September the Hersham plan found, on a US index, Wikipedia, Apple Maps, FamilySearch, Tripadvisor and Wikishire for "Hersham", and `hershamvillage.co.uk`, Wikipedia, Wikishire and two Facebook pages for "Hersham Village".
- [W] This session's search for "Hersham Village" returned Elmbridge Borough Council's Hersham Village conservation area page and its designation statement, Wikipedia, an estate agent's "Hersham & Whiteley Village" guide and a venue listing for Hersham Village Hall. For "Whiteley Village": Wikipedia, the council's conservation area page, a Historic England list entry, Triodos Bank's project page and a care-sector news item. For "Walton on Thames": Wikipedia, Visit South East England, Exploring Surrey's Past, Visit Thames, several estate-agent guides, and `wotta.co.uk`.
- [I] "hersham village" at 24 against "hersham" at 10.6 is the odd one. The likeliest reading is that Google treats "Hersham Village" as a name, and several things carry that exact name: a conservation area, a council ward, a golf club, a hall, a market, a community website. Our hub is a page about Hersham that mentions the phrase once. This is checkable as soon as a results page can be read.

#### 2.0.2 Why the homepage earns a 0.31% click rate on 27,660 impressions

27,660 impressions at 0.31% is about 86 clicks in 16 weeks [B, derived]. The Apps Court page earned 480 in the same period [B]: more than five times the homepage.

In order of likely weight:

1. **Position, first.** [I] If most of those impressions are the head term at an average of 11.0 [B], the homepage is appearing at the foot of page one or the top of page two of a results page that opens with Wikipedia, a knowledge panel and a map. A click rate of a few tenths of one percent is what that position earns. The lever is rank, and the snippet comes second.
2. **The snippet does not describe a place.** [M] The title is "Walton-on-Thames.org | Things to Do, Eat & Explore" (50 characters). It leads with the domain name. The page already carries `WebSite` markup naming the site "Walton-on-Thames.org" [M], which is what Google draws on for the site name it shows above a result's title [W: [Search Central, site names](https://developers.google.com/search/docs/appearance/site-names)], so the brand is likely to appear twice. The description lists site sections. A searcher who typed a town's name is shown a brand and a menu.
3. **The page is a portal.** [M] H2s are "Coming Up", "Things to Do", "Beyond the Town", "Local Highlights", "Local News & Stories", "Common Questions", "About This Site". The only prose about Walton is one 191-word paragraph in the hero. Blueprint 4.1 specified an H1 of "Walton-on-Thames" and sections on the river, things to do, food and drink, the town's history, living here and what's on, and `docs/site-audit.md` (line 30) classes the homepage ADAPT, with the note "Rewrite to the section structure in 4.1". That was not done. Compare `/hersham/`, which was rebuilt on 31 August for exactly this purpose.
4. **Query mix.** [I] The homepage probably also collects impressions for "walton on thames" plus a modifier, where a deeper page should rank. Only the page-filtered query list can confirm it.

What it is not [M]: speed (Lighthouse mobile 99, largest paint 1.9 s), indexability (self-referencing canonical, valid markup, in the sitemap), or phone layout (no overflow on this page).

**Rows needed:** Performance filtered to Page = `https://walton-on-thames.org/`, Queries tab, exported.

#### 2.0.3 What the directory is for

[B] 174 pages, 52,760 impressions, 233 clicks. Derived: a 0.44% click rate, about 303 impressions and 1.3 clicks per page in 16 weeks.

[M] The directory at `3a4f250`, counted from `src/content/businesses/` and the build:

| Measure | Count |
|---|---|
| Records / built listing pages | 181 / 180 |
| Body copy under 60 words (median 36) | 119 |
| Probable national-chain branches, by name | about 40 |
| With any photograph | 10 |
| GP practice profiles (1,900 to 2,400 words each) | 6 |
| Listing pages with a `MedicalClinic`, `Restaurant`, `Store` or similar node / with an image in it | 180 / 10 |

`docs/directory-plan.md`, adopted on 9 November, reached the same counts independently and already plans the remedy: field-level checks, a richer template, static maps, search, and "fix before growing". I do not repeat it. What this plan adds is the search-performance reading that plan does not contain.

**The directory is the data layer for the hub pages, and a home for the minority of listings where the site knows something the business's own profile does not.** It is not, on these figures, the "long-term traffic engine" blueprint 4.9 expected.

| Kind of listing | Can it win clicks? | Why |
|---|---|---|
| National-chain branches (about 40) | No [I] | A search for the branch returns the chain's own page and Google's business profile with hours, phone and directions. A short listing adds nothing to that. |
| Businesses with a good website of their own | Rarely [I] | Same reason. Our listing is a third or fourth result for the business's name. |
| Businesses with no website (23 records have no `website` field [M]) | Possibly [I] | For some of these we may be the best written source. The directory plan's pass 3 covers them. |
| Listings with original material: the 6 GP profiles, the 10 with Darren's photographs, closures recorded with a date | Most likely [I] | This is the Apps Court pattern on a small scale: sourced, dated detail the official source lacks. |
| The hub pages built from listings: `/food-and-drink/*`, `/shopping/*`, `/living/gp-surgeries/`, `/living/pharmacies/`, `/living/dentists/`, `/places-to-stay/` | Yes [I] | "restaurants in walton on thames" is a list query. Google cannot answer it with one business profile. |

**The triage that settles it, once the Pages export exists:** for every `/directory/` URL, record clicks, impressions and position, and whether Search Console's Page indexing report shows it as indexed or "Crawled, currently not indexed". Then:

- Clicks above a handful: keep, and enrich first in the directory plan's 1.4 queue.
- Impressions but no clicks, and a chain branch: keep the record for the hubs, and decide whether its page should stay indexable. Do not decide this before seeing the numbers.
- "Crawled, currently not indexed" in volume: Google has already judged the stubs. That would make directory plan 2.1 urgent rather than routine.

**One consequence for the directory plan:** its Phase 4 would add hair and beauty, estate agents, solicitors, vets, childcare, motoring and trades. On the figures above, each new category adds pages of the kind that earn about one click each in 16 weeks. Principle 8 there ("fix before growing") is right, and these figures strengthen it: do not start Phase 4 for search reasons until enriched listings have shown, in Search Console, that they earn clicks.

#### 2.0.4 The two Elmbridge Xcel URLs

[M] From the build:

| | `/things-to-do/elmbridge-xcel-leisure-centre/` | `/directory/elmbridge-xcel/` |
|---|---|---|
| Source | `src/content/places/elmbridge-xcel-leisure-centre.md` | `src/content/businesses/elmbridge-xcel.md` |
| Words in `<main>` | 1,879 | 239 |
| H2s | 20, including opening hours, swimming, membership, accessibility, FAQ | 4 |
| Title | "Elmbridge Xcel Leisure Complex: Things to Do in Walton-on-Thames" (64 characters, will truncate) | "Elmbridge Xcel Leisure Complex: Health And Fitness in Walton-on-Thames" (70) |
| Pages linking to it from body content | **1** (the homepage) | 4 |
| Links to the other | No | No |
| What it says about the pool | Two pools, a 25-metre main pool and a 20-metre teaching pool | "25-metre pool" |
| Last checked | July 2026, against Places Leisure | 27 June 2026, "Places Leisure website and local knowledge" |

Three further facts [M]. The homepage shows both as cards, one under "Things to Do" and one under "Local Highlights". The `/things-to-do/` hub does not link to the guide at all, because the Xcel entry in `src/content/attractions/` has no `internalUrl` and its card links only to Places Leisure. And two legacy redirects in `public/_redirects` (`/elmbridge-xcel/sports-hub` and its encoded form) point at the directory URL.

**Resolution:** the guide survives. Apply the mechanism built for The Heart on 29 September: set `hub_page: "/things-to-do/elmbridge-xcel-leisure-centre/"` on the business record, 301 `/directory/elmbridge-xcel/` to the guide, retarget the two legacy rules to the guide so they do not chain, add `internalUrl` to the attraction entry, and remove the second homepage card. Reconcile the pool statement against Places Leisure in the same session. Shorten the title so the name people use leads and it fits in 60 characters.

**Check before doing it:** which of the two URLs holds the clicks [B, not seen]. It does not change the direction, since a 301 carries either across, but it tells you what to expect.

The same pattern exists once more [M]: `/directory/hersham-green-shopping-centre/` (124 words) beside `/hersham/hersham-green-shopping-centre/` (794 words). The listing links to the article, the article does not link back. Lower priority, same remedy.

#### 2.0.5 What the Apps Court page does right, and whether it repeats

[B] 480 clicks: the site's top page. [M] What the page is:

| Feature | Detail |
|---|---|
| Title | "Apps Court Car Boot Sale: Times, Prices & Parking" (49 characters): the name, then the three things people need |
| The question answered first | A status panel above everything else: "Apps Court Farm says the sale is on this Sunday", with the farm's own wording quoted, checked 10 November 2026 at 01:55 against the farm's page |
| At a glance | A 15-row table: address, gates, closing, parking charge, pitch price, dogs, toilets, phone |
| Depth | 3,504 words and 34 H2s, each a separate question: "Is Apps Court Car Boot Sale on this Sunday?", "Seller pitch prices by vehicle type", "Parking charges and arrival advice" |
| Trust | Every fact dated and sourced, a plain statement that the site is not the organiser, and "go to the source" advice |
| Internal prominence | Linked from the footer of every page |
| Markup | `EventSeries`, `Place`, `FAQPage`, `WebPage`, breadcrumb |

[D] The official source is hard to use: the build log records that the farm's site answers automated requests with a challenge page, and the status lives in a banner.

[I] Why it wins: a question that recurs every week, an official answer that is awkward to find, a title that matches how the question is asked, and an answer at the top of the page that is visibly fresh. Nobody else publishes that combination.

**It can be repeated, with one hard condition.** A status that is wrong is worse than no page. `src/data/hersham-market-status.json` shows the risk [M]: it was last checked on 21 October 2026, still reads "On this Friday, 23 October", and no page on any branch reads it. The data for a second status page exists, the page does not, and the check has lapsed.

Candidates, ranked by how much already exists. Demand is unmeasured for all of them; the page-filtered queries from Search Console decide the order.

| Candidate | What exists [M] | What the pattern needs | Standard |
|---|---|---|---|
| **Riverhouse Barn** `/things-to-do/riverhouse-barn/` | A 643-word guide, and 46 of the 97 current event pages are at this venue (42 in the barn, 4 in its gallery). The guide does not link to `/whats-on/` and no event links to the guide. | A "What's on at Riverhouse Barn" block fed from the events collection, as `/hersham/` has. Almost free: the data is already maintained. | Protocol |
| **Cecil Hepworth Playhouse** | 678-word guide, 12 current events, same disconnection | Same block | Protocol, with a historical section under the Standards |
| **Elmbridge Xcel** | 1,879-word guide | The merge in 2.0.4, a title led by what people search, and the at-a-glance block moved to the top | Protocol |
| **Hersham Village Market** | Status data, events in the collection, no page. "hersham village market" is in the Hersham plan's tracked query set. | A page under `/hersham/`, and a weekly check that is actually running. Check `docs/site-audit.md` first. | Protocol |
| **Annual events** (12 records: Walton Fayre, Festival of Light, Heritage Festival, the regatta and others) | One 749-word page for all of them | A page per event only where the organiser publishes enough to fill it. Love Walton is the primary source for the BID's own events. | Protocol |
| **Walton & Hersham FC** | Fixtures feed, a guide, and the away fans' guide | Already largely done | Protocol |

**Before a second status page ships:** a build-time check that fails loudly when a status file is older than its event's cycle, in the manner of `content:stale-events`, so a lapsed check can never display as current.

#### 2.0.6 Does www redirect to the apex?

**I could not reach the live site from this session.** What the repository shows:

- [M] `functions/_middleware.js` redirects every hostname other than `walton-on-thames.org` to it with a 301, keeping path and query, and exempts preview subdomains and localhost.
- [D] Hersham plan item 1.1 records this as deployed on 4 September 2026 (commit `57a061c`) and verified live the same day. Before that date www served the whole site with a 200.
- [I] The export runs from 17 July, so about seven of its sixteen weeks fall before the fix. 74 www URLs in the Pages report [B] is what that would produce. It does not show the redirect has failed.

**Check it yourself:**

```bash
curl -sI https://www.walton-on-thames.org/ | head -5
```

```bash
curl -sI https://www.walton-on-thames.org/hersham/ | head -5
```

```bash
curl -sI https://walton-on-thames.pages.dev/ | head -5
```

Each should return `HTTP/2 301` with `location: https://walton-on-thames.org/...`. Then, in Search Console, set the Performance date range to 5 September onward and filter Page to "contains www.": impressions should be at or near zero. If they are not, inspect one www URL and read "Google-selected canonical".

**A related risk found while checking this.** [M] There is no `_routes.json` in `public/` or in the build. [W] Cloudflare's documentation says that without one, every request invokes the Function, that Functions requests count against a free allowance of 100,000 a day, and that when the allowance is spent the project either fails open (static files are served, so the redirect silently stops) or fails closed (visitors see an error) according to a dashboard setting ([routing](https://developers.cloudflare.com/pages/functions/routing/), [pricing](https://developers.cloudflare.com/pages/functions/pricing/)). [I] Every image, font and stylesheet request therefore counts, and the redirect that protects against duplicate hosts depends on staying inside the allowance. On the click figures in the brief, human traffic is nowhere near it. Crawler traffic is unknown, and the Cloudflare dashboard shows the real total. This is a thing to fix before growth, not an emergency. See B18.

#### 2.0.7 Quick wins: pages ranking 4 to 15 with over 800 impressions

**Blocked.** This list is a filter on the Pages export and cannot be reconstructed any other way. To produce it: Performance, Pages tab, export, then keep rows with position between 4 and 15 and impressions above 800. For each row, export its queries (Page filter, Queries tab).

What can be given now is the specific change for each page the brief named, and the patterns that will apply to whichever pages qualify.

| Page | Specific change | Evidence [M] |
|---|---|---|
| `/` | Retitle to describe the place, and rebuild to blueprint 4.1 (B1) | 2.0.2 |
| `/hersham/` | No change to title or copy. Raise inbound body links and send the outreach (B8, B20). Consider the "Hersham Village" exact-name spokes (B24). | 24 body-linking pages |
| `/hersham/whiteley-village/` | A title that names the town, fix phone overflow, replace Wikipedia sources, link the café and post office listings (B4) | 2.5 |
| The two Xcel URLs | Merge (B10) | 2.0.4 |
| `/things-to-do/apps-court-car-boot-sale/` | Fix phone overflow: the page renders 489px wide on a 360px screen (B14). Change nothing else. | 2.6.5 |
| Any listing page | Follow `docs/directory-plan.md` 2.1. Do not hand-tune titles for individual listings. | 2.0.3 |

Patterns [M]: 30 titles exceed 60 characters (16 are event pages, where "Title: date" pushes the date off the end; 11 are listings; 3 are others). 79 descriptions are under 140 characters, including hubs: `/whats-on/` (128), `/shopping/` (127), `/living/schools/` (119), `/hersham/living/` (115), `/development-and-planning/` (114), `/places-to-stay/` (132).

### 2.1 Baseline: rankings, traffic, ranking URLs, backlinks

**Blocked: Semrush has no API units.** No domain overview, no organic positions, no backlink profile, no site audit and no project list could be read. A site audit could not be run because the project list itself needs units.

What stands in for it:

| Question | Stand-in | Source |
|---|---|---|
| Current positions | The four head-term positions in the brief | [B] |
| Organic traffic | The page and section totals in the brief | [B] |
| Technical audit | Section 2.6: a full audit of the build, more detailed than a crawler's | [M] |
| Backlinks | None. The Search Console Links report (Appendix A) is the free and authoritative substitute, and should be exported whether or not Semrush returns. | |

### 2.2 Keyword universe

**Volume and difficulty are not available.** What follows is the cluster map, each cluster's intent (my classification), the URL that should own it and that URL's state in the build. Appendix B is the same list laid out for pasting into Semrush's bulk keyword tool, 100 at a time, once units are available.

Intent key: N navigational, I informational, L local or commercial, T transactional.

#### Walton-on-Thames

| Cluster | Example queries | Intent | Owner URL | State [M] | Gap? |
|---|---|---|---|---|---|
| Head | walton on thames, walton-on-thames, walton on thames surrey | N/I | `/` | Portal, brand-led title | Rebuild (B1) |
| Things to do | things to do in walton on thames, walton on thames with kids, rainy day, free | I/L | `/things-to-do/` and seven theme pages | 4,573 words, strong. Five theme pages have no H2. | No |
| Venues | xcel leisure centre walton, riverhouse barn, cecil hepworth playhouse, everyman walton, apps court car boot | N/I | Venue guides | Apps Court excellent. Xcel duplicated. Riverhouse and Playhouse guides disconnected from their events. | Fix (B10, B11) |
| Pubs | pubs in walton on thames, riverside pubs walton on thames | L | `/food-and-drink/pubs-and-bars/` | 306 words, no H2, a card list. Blueprint's `/food-and-drink/riverside-pubs/` was never built. | **Gap** |
| Restaurants, cafes | restaurants walton on thames, cafes, coffee shops | L | `/food-and-drink/restaurants/`, `/cafes/`, the working-cafes guide | Card lists of 219 to 462 words. The working-cafes guide (2,419 words) is the model. | Thin |
| What's on | whats on walton on thames, events this weekend, christmas lights | I/L | `/whats-on/`, `/things-to-do/annual-events/` | 97 events, refreshed daily. Description is 128 characters. | No |
| History | walton on thames history, walton bridge, hepworth studios, mount felix, famous people | I | `/history/` and 36 articles | Strong corpus. 24 articles overflow on phones. In 9, Wikipedia is half or more of the sources. | Fix (B14, B28) |
| Living | living in walton on thames, is walton on thames nice, moving to | I | `/living/` | 7,921 words. Title targets "Moving to", H1 is long. | No |
| Schools | schools in walton on thames, primary schools | I/L | `/living/schools/` | **274 words.** Seven schools named without a link to any school's site or Ofsted record. Blueprint calls this one of the highest-intent pages on the site. | **Thin** |
| Property | house prices, property for sale | T | None | Not built | Leave: portals own it |
| Health | gp surgery walton, dentist, pharmacy | L | `/living/gp-surgeries/`, `/dentists/`, `/pharmacies/` | GP page and profiles strong | No |
| Transport | walton on thames station, trains to waterloo, parking | I/L | Station guide, `/getting-here/`, `/getting-here/parking/` | Present. Parking has 2 inbound links. | Link |
| Walks, river | riverside walks walton, thames path walton, desborough island, boat hire | I | `/things-to-do/riverside-walks/` | **245 words** with unsourced superlatives. Blueprint 4.3 gave it three full walks. The cluster is spread over six URLs, two of them orphans. No Desborough Island page. | **Rebuild** (B13) |
| Shopping | the heart walton, shops | N/L | `/shopping/`, `/shopping/the-heart/` | Present | No |
| Questions | is walton on thames in london, what zone, how far from london, who is the mp | I | Homepage FAQ (5 questions), `/living/` | Three of the blueprint's five homepage questions are absent | With B1 |

#### Hersham

| Cluster | Example queries | Intent | Owner URL | State [M] | Gap? |
|---|---|---|---|---|---|
| Head | hersham, hersham surrey | N/I | `/hersham/` | Strong | Links |
| Exact name | hersham village | N | `/hersham/` | One body mention | Candidate spokes (B24) |
| Things to do | things to do in hersham | I/L | `/things-to-do/hersham/` | 1,285 words, 8 inbound | No |
| Food and drink | pubs in hersham, restaurants hersham | L | `/hersham/food-and-drink/` | **349 words**, no H2 | Thin |
| Living, schools | living in hersham, schools in hersham | I | `/hersham/living/` | 1,195 words. Description 115 characters. 6 inbound. | Link |
| History | hersham history, sham 69, parakeets | I | `/hersham/history/` and 11 spokes | Strong. 8 pages overflow on phones. In 5, Wikipedia is half or more of the sources; `sham-69` and `hersham-green` cite nothing else. | Fix |
| Station | hersham station | N/I | `/hersham-railway-station/` | Present, 5 inbound | Link |
| Market | hersham village market | L | None | Status data only | **Gap** |
| Planning, news | hersham planning, hersham news | I | `/hersham/development-and-planning/`, news | One Hersham news entry (6 September). The plan commits to one a month. | Behind |

#### Whiteley Village

| Cluster | Example queries | Intent | Owner URL | State [M] | Gap? |
|---|---|---|---|---|---|
| Head | whiteley village, whiteley village surrey, whiteley village hersham | N/I | `/hersham/whiteley-village/` | See 2.5 | Repair (B4) |
| History | william whiteley, whiteley village history, architects | I | Same | Covered in two H2s, partly sourced to Wikipedia | Deepen |
| Visiting | visiting whiteley village, whiteley village cafe, post office | I/L | Same, plus two listings | Not connected to the listings | Link |
| Living there | how to live at whiteley village, almshouses | I/T | `/living/`, and the Trust | Correctly deferred to the Trust | Keep deferring |
| Getting there | bus to whiteley village | I | `/getting-here/` | Present | Link |

### 2.3 Results-page teardown for each head term

**Blocked for Google UK.** Positions 1 to 10, page types and features (map pack, knowledge panel, AI Overview, People Also Ask, images) cannot be read without Semrush or a live fetch, and I have not filled the gap from memory.

What the session does support:

**What a town-information site can win on a bare place name.** [I]

- It can be the first result that is a guide rather than a reference entry, a council page or a portal. That is the position this plan aims at.
- It can supply the answers shown under "People also ask" and inside AI answers, if its facts are stated plainly, sourced and consistent. The Hersham fact box was built for that purpose [D] and the homepage has no equivalent [M].
- It can win image results with original photography. 10 of 180 listings carry a photograph, and 12 of 55 articles declare an image in their markup [M].
- It can win the long tail in aggregate: "things to do", venue names, "what's on", history topics. Apps Court proves it [B].

**What it cannot win.** [I]

- The knowledge panel and the map. Google builds them from its own data and Wikipedia.
- Position 1, while Wikipedia has an article on the place.
- Queries with booking or buying intent: hotels, property, restaurant reservations.
- Any query where the searcher wants one named business.

**A change to record against the blueprint.** [W] Blueprint section 3 asks for "`WebSite` with sitelinks searchbox". Google removed that feature on 21 November 2024 ([Search Central](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)). The markup on the homepage is harmless and still feeds the site name; nothing needs doing.

### 2.4 Competitor gap

**Blocked: keyword gap and backlink gap need Semrush.** The competitor set is assembled here so the exports can be run in one sitting.

| Domain | Type | Competes for | Basis |
|---|---|---|---|
| `en.wikipedia.org` | Reference | All four head terms | [W], [D] |
| `elmbridge.gov.uk` | Council | "Hersham Village", "Whiteley Village" (conservation area pages), civic queries | [W] |
| `lovewalton.co.uk` | Walton BID | What's on, the BID's own events | [D] `CLAUDE.md` |
| `hershamvillage.co.uk` | Community site on an exact-match domain | "Hersham Village", Hersham planning news | [D] Hersham plan |
| `thewhiteleyhomestrust.org.uk` | Official | "Whiteley Village" | [M] cited by our own page |
| `wotta.co.uk` | Trading alliance | "Walton on Thames", the Walton Trail | [W], [D] blueprint |
| `visitsoutheastengland.com`, `visitthames.co.uk`, `visitsurrey.com` | Tourism bodies | Head term, things to do | [W]; Visit Surrey named in the brief, not seen |
| `tripadvisor.co.uk` | Aggregator | Things to do | [D] blueprint; not seen this session |
| Estate-agent guides: `zoopla.co.uk`, `foxtons.co.uk`, `fineandcountry.co.uk`, `sothebysrealty.co.uk`, `curchods.com` | Portals | "Walton on Thames", living, property | [W] |
| Surrey Live | Local press | News | [D] Hersham plan |

**The referring domains competitors hold that we could earn cannot be listed** without the Backlink Gap export. Section 2.8 ranks opportunities from the site's own assets instead.

### 2.5 Whiteley Village

#### What the site has today [M]

| Asset | Detail |
|---|---|
| `/hersham/whiteley-village/` | 816 words, seven H2s (five of content, then Sources and Related reading), three photographs by Darren dated 13 September 2026, six sources |
| `/directory/whiteley-village-community-cafe/` | Listing with photographs. Links to the main page. The main page does not link back. |
| `/directory/whiteley-village-post-office/` | Listing. No link in either direction. |
| A clubs and societies record | In the organisations collection, listed on `/living/community/`. It has no page of its own. |
| Sections on other pages | "Whiteley Village" under `/living/`, "Getting to Whiteley Village" under `/getting-here/`, a summary on `/hersham/history/` |
| Site-wide | A footer link on every page; named in the homepage H1 |
| Inbound body links | 10 pages |

#### What is wrong with the page [M]

1. **The title names the county and nothing else:** "Whiteley Village: Surrey's Octagonal Almshouses" (47 characters). It does not say Hersham or Walton-on-Thames, and nothing in it answers "can I visit". [I] Which words to add should be chosen from the page's own query list once it is available.
2. **It overflows on phones:** 406px wide on a 360px screen, caused by an unbroken source URL (2.6.5).
3. **Its lead photograph is 140 KB with no `srcset` and no width or height,** and the page weighs 714 KB. Lighthouse mobile: largest paint 2.9 s.
4. **Two of six sources are Wikipedia** (the village article and William Whiteley's). The 2 November audit's item M5, "Wikipedia-led citations", is still open [D].
5. **Five judgements with no source,** which the Standards do not allow and the open superlatives sweep should have caught: "one of the more unusual planned settlements in England", "one of the largest single acts of philanthropic building in the Edwardian era", "a genuinely distinctive piece of Edwardian town planning", "in surroundings a great deal more beautiful than the bequest strictly required", "one of the most genuinely distinctive places in this part of Surrey".
6. **No place entity.** The page has `Article` and `LandmarksOrHistoricalBuildings` nodes, but nothing like the `Place` with `sameAs` that `/hersham/` carries.

#### Demand

One figure: position 6.4 [B]. No volume, no query list. The name is shared with a former retail centre in Hampshire [W], so the impression count overstates the audience.

#### What a credible hub would need

In two stages. The first is certain. The second waits for data.

**Stage 1: repair the page that ranks (B4).** Give it a title that names the town. Fix the overflow. Replace the Wikipedia citations with the Trust's own pages, Elmbridge Borough Council's conservation area designation statement, and Historic England's list entries: the page already says more than a hundred buildings are listed, and those entries are Tier 1 and individually citable [W: [conservation area](https://www.elmbridge.gov.uk/planning/conservation-areas/whiteley-village-conservation-area), [a list entry](https://historicengland.org.uk/listing/the-list/list-entry/1030243)]. Delete or source the five judgements. Link the café, the post office, the clubs record and the "getting there" section. Add a `Place` entity.

**Stage 2: spokes, only where Search Console shows distinct demand and the Trust is content (B6).** Candidates:

| Candidate | Sources | Standard | Caution |
|---|---|---|---|
| The architecture and its architects, building by building | Historic England list entries, the council's designation statement | Standards | A long page of listed-building summaries is only worth having if each entry adds a photograph and a plain description |
| William Whiteley, the bequest and the 1907 killing | Court and press records, the Trust's history | Standards | Already summarised. Deepen only with primary sources. |
| Visiting: what is open to the public, and how to behave | The Trust, confirmed in writing | Protocol | Do not publish anything about access the Trust has not confirmed |

`docs/site-audit.md` Decision 3 consolidated three overlapping Whiteley Village pages into one and kept no deep-dive. Spokes would partly reverse that, so they need Darren's decision recorded there first (question 5).

#### What is appropriate to cover

Whiteley Village is a private community of older residents run by a charity. The existing page's stance, that it is "somebody's home rather than a heritage attraction", is right, and the outreach draft to the Trust of 6 September leads with it.

- **Cover:** the history, the architecture seen from public roads, facilities the Trust says are open to visitors, how to get there, how to behave.
- **Link, do not restate:** who can apply to live there and how. That is the Trust's to say and it changes.
- **Do not cover:** individual residents, care provision or its quality, anything photographed where the Trust has not agreed, events not advertised to the public.
- **First step before any expansion:** send the drafted approach and ask the Trust to correct the page. A link from the Trust's site is also the single most valuable link available for this term [I].

### 2.6 Technical and on-page review of the build

All [M]: `npm run build` at `3a4f250` (426 pages), then a parse of every HTML file, Lighthouse 12 mobile on 22 templates against a local server with gzip, and headless Chromium at 360px on all 420 indexable pages. Three sections fetch live data at build time and could not here (Walton & Hersham fixtures, and both planning feeds), so those blocks rendered empty and are not assessed.

#### 2.6.1 What is sound

| Check | Result |
|---|---|
| Indexable pages / noindex | 420 / 6 |
| Missing or duplicate titles, missing or duplicate descriptions | 0 |
| Pages without exactly one H1 | 0 |
| Canonical not self-referencing | 0 |
| Broken internal links, links that hit a redirect, missing trailing slashes | 0 (the repository's own `seo:links` agrees) |
| Structured data that fails to parse / pages with none | 0 / 0 (`seo:validate` passes on 425 pages) |
| Click depth from the homepage | 44 pages at one click, 370 at two, none deeper |
| Third-party scripts | **None on any page.** Median inline script 1.5 KB. |
| Fonts | Self-hosted, subset by unicode range, `font-display: swap` |
| Map and video embeds | 128 pages, every iframe lazy-loaded |
| Lighthouse SEO and best-practices | 100 on all 22 pages tested |

The blueprint's claim that Core Web Vitals "will be a strength on Astro" holds for every text-led template.

#### 2.6.2 Titles, descriptions and headings against the clusters

| URL | Title | Length | Issue |
|---|---|---|---|
| `/` | Walton-on-Thames.org \| Things to Do, Eat & Explore | 50 | Brand-led; does not describe the place |
| `/hersham/whiteley-village/` | Whiteley Village: Surrey's Octagonal Almshouses | 47 | County only: no town, no purpose |
| `/things-to-do/elmbridge-xcel-leisure-centre/` | Elmbridge Xcel Leisure Complex: Things to Do in Walton-on-Thames | 64 | Truncates; the generic half is what survives |
| `/things-to-do/riverside-walks/` | Walks & the River Thames in Walton-on-Thames | 44 | Fine; the page is the problem |
| `/things-to-do/parks-and-walks/` | Walks in Walton-on-Thames | 25 | Competes with the page above |
| `/living/` | Moving to Walton-on-Thames, Hersham & Whiteley Village | 54 | "Living in" is absent from the title |
| `/living/schools/` | Schools in Walton-on-Thames | 27 | Fine; the page is thin |
| `/food-and-drink/pubs-and-bars/` | Pubs & Bars in Walton-on-Thames: Food & Drink | 45 | Fine; the page is a card list |
| Listings | "{Name}: Health And Fitness in Walton-on-Thames" | to 70 | Capitalised "And" in 33 titles (25 "Health And Fitness", 8 "Pubs And Bars"). Covered by directory plan 2.1. |

Fourteen indexable pages other than events and listings have no H2 at all: the food and drink hub and its four category pages, the directory index, `/hersham/food-and-drink/`, `/community/news/` and six things-to-do pages (annual events and five filter pages). Lighthouse flags heading order on `/directory/` and `/food-and-drink/`.

#### 2.6.3 Internal linking and orphans

| Finding | Detail |
|---|---|
| Orphans | 5 pages have no inbound link of any kind. Two are closed listings and are orphaned by design (directory plan D6). Three are not: `/things-to-do/brooklands-day-out/`, `/things-to-do/sunbury-ferry-walk/`, `/things-to-do/walton-to-hampton-court-walk/`. Each is in the sitemap and is 636 to 644 words. |
| Events to venues | 0 of 97 event pages link to any internal page other than `/whats-on/`. By venue: Riverhouse Barn 46 (42 in the barn, 4 in its gallery), the Playhouse 12, Walton Library 10, Hersham Library 6. |
| Venues to events | Neither venue guide links to `/whats-on/`. |
| Listings to the Hersham hub | 4 of 37 Hersham and Whiteley Village listings link into `/hersham/`. Hersham plan 4.1, unticked. |
| Events to the Hersham hub | 0 of 12 Hersham events. Hersham plan 4.2, unticked. |
| Visit and history pairs | No link in either direction: Walton Bridge (`/things-to-do/walton-bridge/` 240 words, `/history/walton-bridge/` 767), Cowey Sale and Cowey Stakes, Ashley Park and its estate history, The Heart and its history. One direction only: St Mary's, the Playhouse and the film studios. Extension section 5 requires every history page to link to a non-history page. |
| Attraction cards | 18 of 60 link to an internal guide. Xcel's does not, though a guide exists. |
| Thinly linked hubs | `/living/schools/` 3 body-linking pages, `/getting-here/parking/` 2, `/living/areas/` 1, `/shopping/` 2, `/about/` 175 (the new "How we check listings" link on every listing, a good pattern) |
| The homepage | 7 pages link to it from body content. Every page links to it from the header, which is enough. |

#### 2.6.4 Structured data

| Type | Pages | Gap |
|---|---|---|
| `Event` | 98 nodes | 96 have no `image`, 97 no `organizer`, 76 no `offers`, 12 no `endDate` |
| `Article` | 55 | 43 have no `image`. 48 name "Darren Bayley" with a URL of `/about/`, but `/about/` carries no `Person` node. 6 news articles name the organisation as author. |
| Business types | 180 | 170 no `image`, 153 no opening hours (deliberate: the Protocol prefers linking), 54 no `geo`. `url` is the business's own site. Covered by directory plan 2.1. |
| `Place` for Walton | Homepage | Nested under `WebPage.about` with no `@id`, no `alternateName`, and `containedInPlace` naming Surrey only. `/hersham/` has all three, and 20 pages carry or reference its `@id`. No Walton page references a Walton entity. The Wikidata identifier `Q2003600` could not be re-checked this session. |
| `Place` for Whiteley Village | None | |
| `/about/`, `/charter/`, `/contact/` | Breadcrumb only | No `AboutPage`, `Person` or `Organization` |
| `FAQPage` | 15 pages | Valid. Rich results are limited to government and health sites [W: [Search Central](https://developers.google.com/search/blog/2023/08/howto-faq-changes)], as the Hersham plan already notes. Keep, do not extend for its own sake. |
| Social image | | The default image is used on 389 of 420 pages |

#### 2.6.5 Mobile usability: 52 pages are wider than the screen

The most consequential technical finding. On a 360px-wide phone, 52 of 420 indexable pages lay out between 364 and 1,249 pixels wide. A phone then either shrinks the whole page, so text is smaller than designed, or lets it scroll sideways.

| Section | Pages | Width on a 360px screen |
|---|---|---|
| `/history/` | 24 | 368 to 1,249. `/history/walton-bridge/` and `/history/walton-before-the-suburbs/` are 1,249. |
| `/clubs/` | 11 | 366 to 504 |
| `/things-to-do/` | 9 | 364 to 544. **Includes Apps Court at 489.** |
| `/hersham/` | 8 | 406 to 553. Includes Whiteley Village at 406. |

Apps Court is 489px wide at every phone width tested from 320 to 430.

**Cause, established by injecting candidate fixes into the rendered page and re-measuring:**

| Cause | Pages | Fix |
|---|---|---|
| Source URLs printed as link text, with nothing allowing them to break. The single-column grid then grows to fit the longest one. On `/history/walton-bridge/` one URL measures 1,209px. | 38 | `overflow-wrap: anywhere` on citation links, with `minmax(0, 1fr)` on the grid as a guard. `src/layouts/HistoryLongform.astro` already does both (its lines 222 to 230 and 356, with a comment explaining why). The older templates do not: a bare `grid-template-columns: 1fr` rule is repeated in 34 files under `src/pages/` and `src/layouts/`, among them `HistoryArticle.astro` and 17 things-to-do files including the Apps Court page. |
| Tables with no scroll wrapper | 3 | Wrap in a horizontally scrolling container |
| The "Visit the … website" button on club pages has `white-space: nowrap`, so a long club name pushes the page wider | 11 | Allow the button to wrap |

All 52 are accounted for: the first rule alone fixes 38, the first two together 41, and the remaining 11 are the club button.

Lighthouse 12.8, as run here, has no audit for content wider than the screen, which is why clean Lighthouse scores on these templates did not reveal it. **A two-minute check on your own phone:** open the Apps Court page and see whether the text runs to both edges of the screen or the page can be dragged sideways.

Honest weighting: Google no longer runs a mobile usability report, so the direct ranking effect is probably small [I]. The effect on the people who arrive is not, and they are three quarters of the audience [B].

Other phone findings. The header is fixed and takes 72 of 740 pixels on every page. `/directory/` is 106 screens long with 179 cards, and its first card starts 1,068 pixels down, below the first screen (directory plan 2.2 addresses discovery). `/living/` is 62 screens, `/things-to-do/` 45, `/whats-on/` 36. In a sample of 177 pages taken at `b1ce661`, every H1 fell within the first screen, and 32 pages had tap targets under 24 pixels in one dimension, mostly card-title links 21 to 23 pixels tall.

#### 2.6.6 Performance and images

Lighthouse mobile, simulated throttling, local build. Laboratory figures: field data needs the live site (Search Console, Core Web Vitals).

| Page | Performance | Largest paint | Weight | What paints last |
|---|---|---|---|---|
| `/history/sidney-road/` | 75 | **8.8 s** | 2,223 KB | A 922 KB JPEG. The page also loads a 1,186 KB PNG. |
| `/directory/khyber-pass/` | 81 | **5.2 s** | 1,294 KB | A 207 KB photograph with no `srcset` |
| `/history/heraldry-walton-on-thames-hersham-whiteley/` | 89 | 3.8 s | 542 KB | |
| `/walton-on-thames-railway-station/` | 92 | 3.3 s | 480 KB | A 284 KB photograph |
| `/hersham/whiteley-village/` | 95 | 2.9 s | 714 KB | The lead photograph |
| `/directory/fort-house-surgery/` | 95 | 2.9 s | 325 KB | |
| The other 16 pages, including `/`, `/hersham/`, `/things-to-do/`, `/whats-on/`, `/directory/`, Apps Court, both Xcel pages | 98 to 100 | 1.3 to 2.0 s | 97 to 217 KB | Text |

Layout shift was 0.035 or less everywhere and blocking time was zero.

The risk is confined to pages with photographs, which are the pages carrying the site's most distinctive material:

- 639 images outside the header. **Only 2 have a `srcset`** (the Hersham hero, from plan item 1.5). 136 have no width and height (73 in `/history/`, 39 in `/directory/`).
- 65 image files over 150 KB are referenced directly by an `<img>`.
- On 9 pages the first large image is lazy-loaded, which delays it.

Accessibility: every page tested fails colour contrast (the footer, noted as outstanding in the build log on 5 October) and has redundant alt text on the logo.

#### 2.6.7 Sitemap, canonicals and redirects

- The sitemap lists 424 URLs. **Four are noindex:** `/accessibility-statement/`, `/privacy-policy/`, `/search/`, `/terms-and-conditions/`. Search Console will report each as "Submitted URL marked noindex". The filter in `astro.config.mjs` excludes only `/contact/thank-you`.
- Every URL has a `lastmod` from the committed manifest, spread across five months. Sound.
- 40 redirect rules. No internal link uses one. The two Xcel rules will need retargeting when B10 is done.
- `robots.txt` allows everything and names the sitemap. An IndexNow key and workflow are in place.

### 2.7 Authority and trust signals

How the site would look to someone assessing who is behind it and whether to believe it.

**Strong** [M]

- *Our Charter*: 2,751 words on purpose, independence, evidence, corrections and AI use, linked from every footer.
- Bylines and review dates on 35 of 37 history pages; sources on all 48 history and Hersham articles, 328 URLs in total.
- No advertising, no third-party scripts, free listings stated plainly.
- The new "What we checked" card on every listing, naming the field, the source and the date. Few local sites do this.
- A named editor with a photograph on `/about/`, online "since 2000".

**Weak** [M]

| Finding | Detail |
|---|---|
| The editor is named differently in different places | `/about/` says "I'm Darren". Bylines and structured data say "Darren Bayley". There is no surname in the prose, no `Person` markup, no link to any profile, and no mention of local roles. The blueprint asked for all four. |
| Two pages state something that is not currently true | `/about/` and `/privacy-policy/` both say the site uses Cloudflare Web Analytics. The beacon is commented out in `BaseLayout.astro`. Directory plan D4 and Hersham plan 1.6 both note this. On a site whose pitch is accuracy, the trust pages should be the most accurate. |
| Wikipedia is the single most cited source | 30 of 328 citations. 24 of 48 articles cite it. In 14 it is half or more of the sources. `hersham/sham-69` and `hersham/hersham-green` cite nothing else. 12 articles have two sources or fewer. Audit item M5, open since 2 November [D]. |
| Unsourced judgements remain | The five on the Whiteley Village page (2.5). `/things-to-do/riverside-walks/`: "one of Surrey's finest stretches of river", "the jewel of Walton's riverside", "the town's living room". The superlatives sweep is open [D]. |
| Guides and hubs carry no byline or date | A byline appears on 17 of 31 things-to-do pages, 1 of 9 under `/living/`, 1 of 6 under `/food-and-drink/`, and no event page. |
| No public record of corrections | The build log documents many: the drill plough claim, the trophy hallmark, a fabricated school removed, addresses corrected against the food hygiene register. None is visible to a reader. The Charter promises a corrections process (its section 7); nothing shows it working. |
| No public summary of method | `docs/research-and-editorial-standards.md` is 1,360 lines and private. |
| Everything is new | Every history and Hersham article has a publish date between July and September 2026. That is honest, and it means the site has no long record yet for anyone to judge. |

**Unknown:** what other sites say about this one. No backlink or mention data was available.

### 2.8 Off-site

#### Link opportunities, ranked by value and feasibility

No backlink data was available, so this ranking rests on what the site already holds that someone else's readers would want [I]. It follows the rules in `docs/outreach/hersham/README.md`: offer a specific page, disclose the connection, invite correction first, no exchanges.

| Rank | Target | What we offer | Value | Feasibility | State [D] |
|---|---|---|---|---|---|
| 1 | The Whiteley Homes Trust | The Whiteley Village page, with its visiting guidance | High for that term | Medium | Drafted 6 September, not recorded as sent |
| 2 | Walton & Hersham FC | The away fans' guide, which serves their visitors, and the fixtures feed | High | High | Not started |
| 3 | Riverhouse Barn | 46 of the 97 events listed here are theirs | High | High | Not on any list |
| 4 | Elmbridge Museum | The industrial history of Hersham Lodge, and the Walton corpus | High | Medium | Drafted, not recorded as sent |
| 5 | Hersham Community Group | A sourced page about them | Medium | High | Drafted, not recorded as sent |
| 6 | Surrey History Centre, Exploring Surrey's Past | Original research: the 1775 regatta ticket, the 1864 trophies | High | Medium | Not on any list |
| 7 | Wikipedia Talk pages | Stale links and an uncited claim on the Hersham article, with disclosure | High | Low to medium | Drafted, not recorded as posted |
| 8 | Subject bodies | Lost inns (it cites CAMRA 13 times), lost breweries, Mount Felix (New Zealand heritage bodies), Hepworth (film history), baseball origins | Medium to high | Medium | Listed in the extension; not started |
| 9 | Love Walton | Event cross-referencing | Medium | Medium | Not started |
| 10 | Churches, libraries, clubs with events or pages here | 33 organisations are listed and 18 have a page of their own | Medium | High | Not started |
| 11 | Surrey Live | Dated hooks from the press calendar | Medium | Low | Not started |
| 12 | Surrey Bird Club | The parakeet roost, with a real question | Low to medium | High | Drafted, not recorded as sent |

The Hersham plan allows five approaches a month. Two months have passed since the first batch was drafted.

#### Actions only Darren can take

| Action | Why |
|---|---|
| **Google Business Profile, Bing Places: do not create one for the site.** | [W] Google's eligibility rules require in-person contact with customers and list online-only businesses as ineligible ([Business Profile Help](https://support.google.com/business/answer/13763036?hl=en)). This confirms blueprint section 6, item 7. An ineligible profile risks suspension and gains nothing. |
| Search Console: confirm the Domain property, and export the Links report | Hersham plan 1.7, unticked. The Links report is the only free measure of referring domains. |
| Search Console: export the Page indexing report | Tells you how many listings Google has declined to index (2.0.3) |
| Search Console: re-export Performance filtered to United Kingdom | The export is all countries [B]. The goal is Google UK. The two positions can differ. |
| Search Console: turn on bulk data export, or use the API | The interface caps at 1,000 rows and cannot show query against page. Both of the brief's hardest questions need that table. |
| Bing Webmaster Tools: confirm verification and the sitemap | Blueprint requirement; no record that it was done |
| Cloudflare: read Functions usage and the fail-open setting | 2.0.6 |
| Cloudflare Web Analytics: enable it, or have the two statements removed | 2.7 |
| Send the five drafted approaches | 2.8 |
| Photography | Hersham plan 2.5, unticked. Original images are the one asset no competitor can copy. |

### 2.9 Against the existing documents

**Confirmed**

| Document | Claim | Evidence here |
|---|---|---|
| Hersham plan, section 7, and the outreach README | Links, not content, are the likeliest reason a milestone is missed | No approach is recorded as sent; "hersham village" is at 24 [B] with the page in good order [M] |
| Hersham plan, Phase 4 | Internal linking is thin | Quantified: 4 of 37 listings, 0 of 12 events, 24 body-linking pages |
| Hersham plan, section 0 | FAQ rich results are restricted | [W] |
| Blueprint 6.7 | A business profile does not apply | [W] |
| Directory plan, section 0 | 120 thin bodies, median 35 | Counted independently at `b1ce661`, before that plan was merged, with the same result: 120 and 35. At `3a4f250`: 119 and 36. |
| Build log, 5 October | Footer contrast is outstanding | Fails on all 22 pages tested |

**Contradicted**

| Document | Claim | Evidence here |
|---|---|---|
| `docs/site-audit.md`, closing note | "The only remaining open item in the entire project" is the Walton Charity page | The homepage (row 30, ADAPT to 4.1) was not rebuilt. `/things-to-do/riverside-walks/` (ADAPT, three named walks) is 245 words without them. The riverside-pubs, property and Desborough Island pages listed as NEW do not exist. |
| Blueprint 4.9 | The directory is "your long-term traffic engine" | 1.3 clicks per page in 16 weeks [B] |
| Blueprint 6.3 | Core Web Vitals "will be a strength" | True of text pages. Not of photo pages (5.2 to 8.8 s), and 52 pages overflow on phones. |
| Hersham plan, milestones | "hersham village" top 3 at three months, which falls in early December | An average of 24 over the period to 7 November [B] |
| Blueprint 3 | Sitelinks search box | Retired by Google in 2024 [W] |

**Untested, not contradicted:** blueprint section 1's belief that the head term is "winnable". The page it specified for the job was never built.

**Extended:** the phone overflow; the Xcel and Hersham Green Shopping Centre duplicates; events and venues as two unconnected halves; the Functions allowance behind the www redirect; the orphaned market status file; the Whiteley Village name clash; the UK filter on the export; the four noindex URLs in the sitemap.

---

## 3. Prioritised backlog

**P** is the priority. 1 is the five actions in section 1, in that order. 2 is cheap and certain, or needed before something else. 3 waits on data or on a decision. Within a priority, rows are in the order I would do them. IDs are labels used throughout this document, not ranks. Effort: S under a session, M one session, L several. Who: **C** Claude in the repository, **D** Darren, **C then D** Claude prepares and Darren acts. Standard: **T** technical only, **P** Content Verification Protocol, **S** Research and Editorial Standards, **H** hybrid.

| P | ID | Item | Cluster | URLs | Evidence | Effort | Expected effect and confidence | Who | Std |
|---|---|---|---|---|---|---|---|---|---|
| 1 | B1 | Rebuild the homepage as the page about Walton-on-Thames: H1, sourced "at a glance" box, blueprint 4.1 sections as short sourced prose, events block kept. Model: `/hersham/`. Re-verify every fact; do not copy the blueprint's draft text. | Walton head | `/` | 2.0.2 | L | The largest single on-page lever for the head term. *Medium confidence it helps, low on how much.* | C | H |
| 1 | B2 | Homepage title and description that describe the place, shipped ahead of B1 | Walton head | `/` | 2.0.2 | S | Better click rate at the current rank. *Medium.* | C | P |
| 1 | B3 | A Walton `Place` entity with `@id`, `alternateName`, `containedInPlace` and verified `sameAs`, referenced by Walton pages. Extend `seo-validate`. Mirror of Hersham plan 2.2. | Walton head | `/`, Walton pages | 2.6.4 | M | Entity clarity; feeds panels and AI answers. *Low to medium.* | C | T |
| 1 | B20 | Send the four remaining September approaches and post the Talk note | Hersham head |  | 2.8 | S | Referring domains. *Medium.* | D |  |
| 1 | B5 | Send the approach to the Whiteley Homes Trust | Whiteley head |  | 2.8 | S | The most valuable link for the term, and a correction of the page. *Medium.* | D |  |
| 1 | B21 | Draft a Walton batch: the football club, Riverhouse Barn, Elmbridge Museum, Surrey History Centre | Walton head | `docs/outreach/` | 2.8 | M | *Medium.* | C then D |  |
| 1 | B8 | Hersham plan Phase 4, items 4.1 to 4.5. Do them there and tick them there. | Hersham head | 37 listings, 12 events, history pages | 2.6.3 | M | More body links into the hub. *Medium.* | C | T |
| 1 | B9 | Events link to their venue's guide, and venue guides show their next events. Start with Riverhouse Barn (46) and the Playhouse (12). | What's on, venues | 97 events, venue guides | 2.6.3, 2.0.5 | M | Connects the freshest pages to the pages that should rank for the venue's name. *Medium.* | C | P |
| 1 | B10 | Merge the two Xcel pages with `hub_page`; retarget two redirects; add `internalUrl`; one homepage card; reconcile the pool count; shorter title | Venues | Both Xcel URLs | 2.0.4 | S | Removes a measured duplicate. *High confidence.* | C | P |
| 1 | B12 | Cross-link the six visit and history pairs in both directions; link the three orphans from their natural pages | History, things to do | Six pairs, three guides | 2.6.3 | S | Removes orphans; lets the history corpus support the visit pages. *Medium.* | C | T |
| 1 | B4 | Repair the Whiteley Village page: a title that names the town, overflow, sources, the five judgements, links to café, post office, clubs and transport, `Place` entity | Whiteley head | `/hersham/whiteley-village/` | 2.5 | M | Holds and may improve 6.4. *Medium.* | C | S |
| 1 | B14 | Fix the phone overflow: citation links, tables, the club button. Add a build check so it cannot return. | All | 52 pages | 2.6.5 | S | Certain benefit to phone users on the top landing page. Ranking effect small. *High confidence in the fault.* | C | T |
| 1 | B15 | Images: width and height on 136; `srcset` and size limits for article and gallery images; re-encode the two files on `/history/sidney-road/` | History, listings | Photo pages | 2.6.6 | M | Should bring the 5 to 9 s pages much closer to the 1.3 to 2.0 s of the text pages. *Medium to high.* | C | T |
| 2 | B17 | Remove the four noindex URLs from the sitemap |  | `astro.config.mjs` | 2.6.7 | S | Hygiene. *High.* | C | T |
| 2 | B19 | Analytics: enable it, or correct `/about/` and `/privacy-policy/` | Trust | Two pages | 2.7 | S | The trust pages become true. *High.* | D then C | P |
| 2 | B18 | Stop the redirect depending on the Functions allowance: read usage and the fail-open setting; add `_routes.json` excluding static paths, or move the www redirect to a zone rule |  | `functions/`, Cloudflare | 2.0.6 | S | Removes a way the duplicate host could return. *Medium.* | D then C | T |
| 2 | B16 | Footer contrast and logo alt text | All | Site-wide | 2.6.6 | S | Accessibility; outstanding since October | C | T |
| 2 | B25 | A status-staleness check for status files, before any second status page | Recurring events | `scripts/` | 2.0.5 | S | Prevents a stale "on this Friday". *High.* | C | T |
| 2 | B33 | Triage the directory against the Pages export | Directory | 180 listings | 2.0.3 | S | Tells the directory plan where to spend. *High, once the data exists.* | C | P |
| 2 | B23 | Export the Links report every quarter and log referring domains | All |  | 2.8 | S | The only measure of B20 to B22 | D |  |
| 2 | B7 | Record the Whiteley decision in `docs/site-audit.md` (Decision 3 said one page) | Whiteley |  | 2.5 | S | Enables B6 | D |  |
| 2 | B11 | The same for Hersham Green Shopping Centre, lower priority | Hersham | Listing and article | 2.0.4 | S | *Medium.* | C | H |
| 2 | B26 | `/about/`: full name, `Person` and `AboutPage` markup, roles Darren chooses to disclose, a short account of method | Trust | `/about/` | 2.7 | S | Who is responsible becomes unambiguous. *Medium.* | C then D | P |
| 2 | B30 | Bylines and review dates on guide and hub templates | Trust | things-to-do, living, food | 2.7 | S | *Low to medium.* | C | P |
| 2 | B28 | Replace Wikipedia-led sourcing on 14 articles, starting with the two that cite nothing else. Audit item M5. | History | 14 articles | 2.7 | L | Makes the corpus citable. *Medium.* | C | S |
| 2 | B29 | Finish the superlatives sweep | All | Site-wide | 2.7 | M | *Medium.* | C | S, P |
| 2 | B27 | A public corrections page, drawn from corrections already in the build log | Trust | New | 2.7 | M | Shows the Charter's promise working. *Medium.* | C then D | P |
| 3 | B6 | Whiteley Village spokes, only after B4, the Trust's reply and query data | Whiteley | New, under `/hersham/whiteley-village/` | 2.5 | L | Unknown until demand is measured. *Low.* | C then D | S |
| 3 | B24 | "Hersham Village" by name: a conservation area page from the council's designation statement, and the market page. Site-audit check first; build only if the results page supports the reading in 2.0.1. | Hersham Village | New, under `/hersham/` | 2.0.1, 2.0.5 | M each | *Low until the results page is read.* | C | S, P |
| 3 | B13 | Rebuild `/things-to-do/riverside-walks/` as the walks hub to blueprint 4.3; make it the parent of the five other walk pages; remove the superlatives. Needs routes walked. | Walks | Six URLs | 2.2 | L | Fills a specified page that was never built. *Medium.* | C then D | P |
| 3 | B31 | Rebuild `/living/schools/` to the blueprint: each school linked to its own site and Ofsted record, nothing restated | Schools | `/living/schools/` | 2.2 | M | *Medium.* | C | P |
| 3 | B32 | `/food-and-drink/riverside-pubs/` as specified in the blueprint; check site-audit first | Pubs | New | 2.2 | M | *Low until volumes exist.* | C | P |
| 3 | B22 | Draft the subject-body pitches the extension lists | History |  | 2.8 | M | *Low to medium.* | C then D |  |
| 3 | B34 | Structured data: images on articles and events, organisers on events |  | Templates | 2.6.4 | M | Small. *Low.* | C | T |
| 3 | B35 | Page-specific social images |  | Templates | 2.6.4 | M | Sharing only. *Low.* | C | T |

### Considered and left out

Each was tested against the data and failed, or cannot be tested yet.

| Idea | Why it is not in the backlog |
|---|---|
| Noindex the chain-branch listings | Plausible, but it needs the page-level export. Deciding blind could remove pages that earn clicks. See B33. |
| Start the directory plan's new categories for search reasons | 1.3 clicks per listing in 16 weeks [B] |
| `/living/property/` | Estate-agent guides appeared in every result set [W]; no demand data |
| A "this weekend" events page | No query data |
| More FAQ markup | Rich results are restricted [W] |
| Lengthening the Hersham hub, or the homepage beyond the Hersham model | The Hersham plan's rule stands: depth belongs in spokes |
| Rewriting all 79 short descriptions as a ranking measure | Low effect; the build already reports them. Do the hubs as they are touched. |
| A separate site on `hersham.org.uk` | Decided in the Hersham plan; nothing here reopens it |
| A Google Business Profile | Ineligible [W] |
| Per-event pages for all twelve annual events | Would be thin unless each organiser publishes enough. Case by case under 2.0.5. |

---

## 4. Phased roadmap

A checklist in the form of `docs/hersham-head-term-plan.md`. Each session takes the next unticked item in the lowest incomplete phase, does it completely, verifies it, ticks it here and logs it in `docs/build-log.md`. Items marked **[Darren]** need an action only the owner can take. Where an item belongs to another plan, do it there and tick both.

**[Darren] items do not wait for their phase.** 0.1 to 0.3, 4.1 and 6.1 can all be done today, and 6.1 is the second of the five actions in section 1.

### Phase 0: inputs and measurement (week 1)

- [ ] **0.1 Search Console export** **[Darren]**. Commit the files in Appendix A.1 to `docs/gsc/2026-11-09/`. Include a United Kingdom version.
- [ ] **0.2 Semrush** **[Darren]**. Add API units, or save the exports in Appendix A.2 to `docs/semrush/2026-11/`.
- [ ] **0.3 Network** **[Darren]**. Approve the hosts in Appendix A.3 for a research session, or start that session in an environment with full network access.
- [ ] **0.4 Re-run the blocked sections.** One session, once 0.1 to 0.3 are in place: complete 2.0.1, 2.0.7, 2.1, 2.3 and 2.4, add volumes to 2.2, replace the judgements in section 1, and re-rank the backlog. Remove any item the data does not support.
- [ ] **0.5 Check the www redirect** **[Darren]**, with the commands in 2.0.6. Record the result here.
- [ ] **0.6 Confirm properties** **[Darren]**: Search Console Domain property, Bing Webmaster Tools, and `hersham.org.uk`. This is Hersham plan 1.7.
- [ ] **0.7 Analytics decision** **[Darren]**: Hersham plan 1.6 and directory plan D4. Either supply the token or ask for the two statements to be corrected (B19).

Gate: `docs/gsc/` and either `docs/semrush/` or working Semrush tools exist; 0.4 has been run and this document amended.

### Phase 1: fix what is measurably broken (two sessions)

Nothing here waits on Phase 0.

- [ ] **1.1 Phone overflow (B14).** Follow `HistoryLongform.astro`. Put `overflow-wrap: anywhere` on citation and source links once, in `src/styles/global.css`, so it does not have to be repeated per template. Change the bare `grid-template-columns: 1fr` rule to `minmax(0, 1fr)` wherever a single-column grid holds prose: `grep -rln "grid-template-columns: 1fr;" src/pages src/layouts` lists the 34 files. Wrap article tables in a scrolling container. Let the club website button in `src/pages/clubs/[slug].astro` wrap. Verify with a headless browser at 360px that no indexable page has a `scrollWidth` above 360 (52 do today, Appendix C), and add that check to the phase gate.
- [ ] **1.2 Sitemap (B17).** Exclude the four noindex pages.
- [ ] **1.3 Xcel merge (B10).** As set out in 2.0.4. Check the pool statement against Places Leisure in the session. Log the retirement in `docs/site-audit.md`.
- [ ] **1.4 Orphans and pairs (B12).** Give Brooklands, the Sunbury ferry walk and the Hampton Court walk an inbound link from their natural pages. Cross-link the six visit and history pairs in both directions.
- [ ] **1.5 Trust pages (B19).** After 0.7, make `/about/` and `/privacy-policy/` say what is true.
- [ ] **1.6 Functions allowance (B18)** **[Darren reads the dashboard first]**. Then add `_routes.json`, or move the www redirect to a zone rule and keep the middleware for the pages.dev alias.
- [ ] **1.7 Contrast and alt text (B16).**
- [ ] **1.8 Images (B15).** Width and height on the 136 images that lack them. `srcset` and a size limit for article and gallery photographs, following `src/utils/hero-images.ts` from Hersham plan 1.5. Re-encode the 922 KB JPEG and the 1,186 KB PNG on `/history/sidney-road/`. Re-run Lighthouse mobile on the six slow pages in 2.6.6 and log the figures.

Gate: `npm run check`, `npm run build`, `npm run seo:validate`, `npm run seo:links` clean; the 360px check reports no page; `src/data/lastmod.json` committed.

### Phase 2: the homepage as the page about Walton (two sessions)

- [ ] **2.1 Title and description (B2).** Choose with Darren (question 4). Candidates within 60 characters that contain "Walton-on-Thames", so `BaseLayout.astro` adds no suffix: "Walton-on-Thames, Surrey: Independent Local Guide" (49), or the blueprint's "Walton-on-Thames: The Local Guide to the Town on the River" (58). Check the built output.
- [ ] **2.2 "Walton-on-Thames at a glance" (part of B1).** The Hersham plan 2.1 pattern: a `<dl>` with a Tier 1 source recorded for every value. `/living/` already has a section of this name; draw both from one data source so they cannot drift.
- [ ] **2.3 Sections (B1).** Blueprint 4.1's order, each a short sourced paragraph linking to its hub, with the card grids kept beneath as navigation. Prose in the band the Hersham amendment set, 900 to 1,100 words. Hybrid page: current facts under the Protocol, historical claims under the Standards. The blueprint's draft copy is a structure, not a source: the build log of 29 September records two of its statements as unsupported.
- [ ] **2.4 H1.** "Walton-on-Thames", with the three-place positioning moved to the standfirst, subject to question 4.
- [ ] **2.5 Walton entity (B3).** `Place` with `@id` `https://walton-on-thames.org/#place`. Verify the Wikidata identifier before publishing it. Reference it from Walton pages as Hersham plan 2.2 did for Hersham, and extend `scripts/seo-validate.mjs`.
- [ ] **2.6 FAQ.** Add the blueprint's missing questions only where a Tier 1 source answers them.
- [ ] **2.7 Rich Results Test on the live page** **[Darren pastes the result]**.

Gate: prose word count printed and inside the band; every new fact has a source recorded; phase 1 gate still green.

### Phase 3: internal linking (two sessions)

- [ ] **3.1 Hersham plan 4.1 to 4.5 (B8).** Tick them there.
- [ ] **3.2 Events to venues (B9).** A small map from venue string to guide or listing path, applied in `src/pages/whats-on/[slug].astro`, so the venue line links wherever a page exists. Start with Riverhouse Barn and the Playhouse, then St Peter's, the clubs with pages and the pubs with listings. The two libraries have no page to link to.
- [ ] **3.3 Venues to events (B9).** A "What's on at" block on the Riverhouse Barn and Playhouse guides, reusing the Hersham hub's component.
- [ ] **3.4 Hersham Green Shopping Centre (B11).**
- [ ] **3.5 Extend `scripts/seo-links.mjs`** to warn on any indexable page with no inbound body link, other than closed listings. This generalises Hersham plan 4.5.

Gate: no orphan other than closed listings; every event whose venue has a guide, a listing or a club page links to it, with the count logged (on today's mix that is about 60 of 97, since the two libraries have no page); the Hersham hub's body-linking pages counted and logged.

### Phase 4: Whiteley Village (two sessions, plus the Trust)

- [ ] **4.1 Send the approach to the Trust (B5)** **[Darren]**. The draft is in `docs/outreach/hersham/2026-09-batch.md`.
- [ ] **4.2 Repair the page (B4).** Standards document, Appendix C and section 20 first. Sources: the Trust, the council's designation statement, Historic England. Remove or source the five judgements.
- [ ] **4.3 Decide on spokes (B7)** **[Darren]**, in `docs/site-audit.md`, after 0.4 and the Trust's reply.
- [ ] **4.4 Build agreed spokes (B6),** one a session, each with its own sources.
- [ ] **4.5 Photography** **[Darren]**, only as the Trust agrees.

Gate: no fact on the page rests on Wikipedia alone; the page's phone width is 360; the Trust has seen the page.

### Phase 5: trust (two sessions)

- [ ] **5.1 `/about/` (B26)** **[Darren supplies what he is content to publish]**.
- [ ] **5.2 Corrections page (B27).** Check `docs/site-audit.md` first. Entries from the build log only, each with its date and what changed.
- [ ] **5.3 The two single-source articles (B28):** `hersham/sham-69`, `hersham/hersham-green`.
- [ ] **5.4 The other twelve Wikipedia-led articles (B28),** two a session.
- [ ] **5.5 Superlatives sweep (B29),** starting with `/things-to-do/riverside-walks/` and the food and drink cards.
- [ ] **5.6 Bylines and review dates on guide templates (B30).**

### Phase 6: links (monthly, five approaches a month)

- [ ] **6.1 Send the September batch (B20)** **[Darren]**, and update the status table with dates.
- [ ] **6.2 A Walton batch (B21).** Claude drafts into `docs/outreach/walton/`, Darren sends.
- [ ] **6.3 Subject-body pitches (B22).**
- [ ] **6.4 Links report (B23)** **[Darren]**, each quarter, saved under `docs/gsc/`.

### Phase 7: the Apps Court pattern, where the data supports it

- [ ] **7.1 Staleness check for status files (B25).** Before anything else in this phase.
- [ ] **7.2 Rank the candidates in 2.0.5** against page-filtered queries from 0.1.
- [ ] **7.3 Hersham Village Market (part of B24),** if 7.2 supports it and the weekly check is running again.
- [ ] **7.4 Walks hub (B13)** **[Darren walks the routes]**.
- [ ] **7.5 Schools (B31).**

### Session prompt

```
Read CLAUDE.md, docs/improvement-plan-2026-11.md and the governing documents
it names. Take the first unticked item in the lowest incomplete phase (skip
items marked [Darren] unless the owner has supplied what they need, and say
so). Where the item belongs to docs/hersham-head-term-plan.md or
docs/directory-plan.md, follow that plan and tick it in both. Classify the
page against docs/historical-content-strategy.md before touching it. Do the
item completely, run npm run check, npm run build, npm run seo:validate and
npm run seo:links, commit src/data/lastmod.json if it changed, tick the item
here, and append an entry to docs/build-log.md. Any fact you cannot verify
against a Tier 1 or Tier 2 source this session gets a [NEEDS VERIFICATION]
marker and does not ship.
```

---

## 5. Measurement

### Keywords to track

Monthly, one row per query: position, clicks, impressions and landing URL, from Search Console filtered to the United Kingdom. The Hersham set is already defined in Hersham plan section 7 and is not repeated.

| Group | Queries |
|---|---|
| Walton head | walton on thames; walton-on-thames; walton on thames surrey |
| Walton intents | things to do in walton on thames; pubs in walton on thames; restaurants walton on thames; whats on walton on thames; living in walton on thames; schools in walton on thames; walton on thames history; walton on thames station; parking walton on thames; riverside walks walton on thames |
| Venues | apps court car boot; elmbridge xcel; riverhouse barn; cecil hepworth playhouse; the heart walton |
| Whiteley Village | whiteley village; whiteley village surrey; whiteley village hersham; whiteley village cafe; william whiteley |
| Hersham | The thirteen in Hersham plan section 7 |

### Baseline

Everything known. The blanks are filled by step 0.4.

| Measure | Value | Source |
|---|---|---|
| Period | 17 July to 7 November 2026, web, all countries | [B] |
| "whiteley village" | 6.4 | [B] |
| "hersham" | 10.6 | [B] |
| "walton on thames" | 11.0 | [B] |
| "hersham village" | 24 | [B] |
| Homepage | 27,660 impressions, 0.31% click rate, about 86 clicks | [B], derived |
| Directory | 174 pages, 52,760 impressions, 233 clicks | [B] |
| Apps Court page | 480 clicks, the top page | [B] |
| www URLs in the Pages report | 74 | [B] |
| Share of traffic on mobile | About three quarters | [B] |
| United Kingdom positions for the four head terms | Not available | Needs 0.1 |
| Site totals: clicks, impressions | Not available | Needs 0.1 |
| Referring domains | Not available | Needs 0.1 (Links report) or 0.2 |
| Indexed pages of 420 | Not available | Needs 0.1 (Page indexing) |

Build baseline, measured at `3a4f250`, to re-measure after each phase:

| Measure | Value |
|---|---|
| Indexable pages | 420 |
| Pages wider than a 360px screen | 52 |
| Orphans, excluding closed listings | 3 |
| Event pages linking to a venue page | 0 of 97 |
| Hersham and Whiteley Village listings linking into `/hersham/` | 4 of 37 |
| Pages linking to `/hersham/` from body content | 24 |
| Images with `srcset` / without width and height | 2 / 136 |
| Lighthouse mobile, slowest three largest paints | 8.8 s, 5.2 s, 3.8 s |
| Articles where Wikipedia is half or more of the sources | 14 of 48 |
| Outreach approaches sent | 0 recorded of 5 drafted |
| noindex URLs in the sitemap | 4 |

### Cadence

- **Monthly,** with the Hersham plan's Phase 7 session: Darren exports, Claude updates the logs, flags any query where two of our URLs share impressions, and picks the next items.
- **Quarterly:** the Links report; the directory plan's 6.3 indicators; the Hersham plan's 3.7 re-verification, next due December 2026; a full re-run of the build audit in 2.6.
- **After every deploy that touches a template:** the 360px check from Phase 1.

---

## 6. Open questions for Darren

1. **Where is the Search Console export?** It is not in the repository on any branch. Can it be committed, with a United Kingdom version?
2. **Semrush:** add API units, or export by hand (Appendix A.2)?
3. **Network:** approve a research set of hosts, or run the follow-up in the environment that already has full access?
4. **The homepage.** May the title and H1 be about Walton-on-Thames alone, with Hersham and Whiteley Village moving to the standfirst? All three are in the H1 now, and I take that to be deliberate.
5. **Whiteley Village.** Was the September approach sent, and has the Trust replied? Are spokes acceptable, given Decision 3 in `docs/site-audit.md`? Are there limits on photography there?
6. **Outreach.** Were any of the five September approaches sent? The status table says drafted.
7. **Analytics.** Enable Cloudflare Web Analytics, or remove the two statements that say it is in use?
8. **Your name on the site.** `/about/` says "Darren"; bylines say "Darren Bayley". Are you content to be named in full there, with any local roles you choose to disclose and a profile link?
9. **Xcel.** Agreed that the guide survives and the listing redirects? Which of the two holds the clicks?
10. **Hersham Village Market.** A status file has been maintained and last checked on 21 October, but no page reads it. Was a page intended, and is the weekly check still running?
11. **The walks.** Blueprint 4.3 specifies three routes written from experience. Can you walk and photograph them?
12. **Cloudflare.** What do Functions usage and the fail-open setting show? Is a zone-level redirect rule for www acceptable?
13. **Search Console.** Is the Domain property verified, and is Bing Webmaster Tools? Hersham plan 1.7 is unticked.
14. **The relaunch date.** The export begins on 17 July. Is that when the present structure went live? It decides how to read every trend.
15. **Directory indexing.** How many `/directory/` URLs does the Page indexing report show as "Crawled, currently not indexed"?

---

## Appendix A: what to supply, exactly

### A.1 Search Console, into `docs/gsc/2026-11-09/`

1. **Performance, whole site:** Search type Web, 17 July to 7 November 2026, Export. This gives Queries, Pages, Countries, Devices, Search appearance and Dates.
2. **The same, filtered to Country: United Kingdom.**
3. **Page-filtered queries,** one export each, for: `/`, `/hersham/`, `/hersham/whiteley-village/`, `/things-to-do/elmbridge-xcel-leisure-centre/`, `/directory/elmbridge-xcel/`, `/things-to-do/apps-court-car-boot-sale/`, `/whats-on/`, `/things-to-do/`.
4. **Query-filtered pages,** one export each, exact query: "walton on thames", "hersham", "hersham village", "whiteley village".
5. **Indexing, Pages:** the summary, and the URL list for each reason shown.
6. **Links:** Top linking sites, Top linked pages (external), Top linking text.
7. **Experience, Core Web Vitals:** the mobile report.
8. Better than 3 and 4, and permanent: **Settings, Bulk data export** to BigQuery, which removes the 1,000-row limit and gives query against page.

### A.2 Semrush, UK database, into `docs/semrush/2026-11/`

Simplest: add units at https://www.semrush.com/mcp-access and ask for step 0.4. Otherwise, from the web interface:

1. Domain Overview for `walton-on-thames.org`.
2. Organic Research: Positions (all), Pages.
3. Backlink Analytics: Referring Domains, Backlinks, Anchors.
4. Keyword Magic Tool, broad match, for the seeds "walton on thames", "hersham", "whiteley village", and the Questions view for each.
5. Keyword Overview, bulk, for the list in Appendix B.
6. Keyword Gap and Backlink Gap against: `elmbridge.gov.uk`, `lovewalton.co.uk`, `hershamvillage.co.uk`, `wotta.co.uk`, `thewhiteleyhomestrust.org.uk`, `visitsoutheastengland.com`. Leave Wikipedia out: a domain that size says nothing useful in a gap report.
7. The results-page analysis for each of the four head terms.
8. A Site Audit project for the domain, and its export.

### A.3 Network, for the research session

`walton-on-thames.org`, `www.walton-on-thames.org`, `walton-on-thames.pages.dev`, `hersham.org.uk`, `www.google.co.uk`, `www.google.com`, `www.bing.com`, `html.duckduckgo.com`, `en.wikipedia.org`, `www.elmbridge.gov.uk`, `lovewalton.co.uk`, `www.thewhiteleyhomestrust.org.uk`, `hershamvillage.co.uk`, `www.hershamvillage.co.uk`, `wotta.co.uk`, `www.visitsurrey.com`, `www.visitsoutheastengland.com`, `www.getsurrey.co.uk`, `www.foxtons.co.uk`, `historicengland.org.uk`.

Search engines often refuse automated requests from data-centre addresses. If Google does, the session will say so and use Bing's United Kingdom results as the nearest substitute, labelled as such.

## Appendix B: keyword list for volume lookup

One per line when pasted. Grouped as in 2.2.

**Walton-on-Thames, head and questions:** walton on thames; walton-on-thames; walton on thames surrey; walton upon thames; where is walton on thames; is walton on thames in london; is walton on thames a nice place to live; what is walton on thames famous for; how far is walton on thames from london; walton on thames postcode; walton on thames population; walton on thames map

**Things to do and venues:** things to do in walton on thames; things to do in walton-on-thames; things to do near walton on thames; walton on thames with kids; free things to do walton on thames; rainy day walton on thames; apps court car boot; apps court car boot sale; is apps court car boot on this sunday; elmbridge xcel; xcel leisure centre walton; xcel walton swimming timetable; riverhouse barn; riverhouse barn whats on; cecil hepworth playhouse; everyman walton; rock up walton; walton boat hire; sunbury ferry; walton and hersham fc; walton and hersham fc away guide

**Food and drink:** pubs in walton on thames; riverside pubs walton on thames; pubs on the river walton on thames; restaurants walton on thames; best restaurants walton on thames; cafes walton on thames; coffee shops walton on thames; takeaway walton on thames; the anglers walton; the swan walton; the weir hotel walton

**What's on:** whats on walton on thames; what's on in walton on thames; events walton on thames; walton on thames this weekend; walton on thames christmas lights; walton festival of light; walton fayre; walton heritage festival; walton and weybridge regatta; walton farmers market

**History:** walton on thames history; walton bridge; walton bridge history; cowey stakes; hepworth studios; walton studios; mount felix walton; walton hop; julie andrews walton on thames; famous people from walton on thames; st marys church walton on thames; ashley park walton history

**Living:** living in walton on thames; moving to walton on thames; walton on thames areas; schools in walton on thames; primary schools walton on thames; secondary schools walton on thames; gp surgery walton on thames; dentist walton on thames; pharmacy walton on thames; walton on thames council tax; house prices walton on thames

**Transport and outdoors:** walton on thames station; walton on thames to waterloo; trains from walton on thames; parking walton on thames; walton on thames station parking; riverside walks walton on thames; thames path walton on thames; walton on thames to hampton court walk; desborough island; cowey sale; ashley park walton

**Shopping:** the heart walton; the heart shopping centre walton; shops in walton on thames

**Hersham:** hersham; hersham surrey; hersham village; hersham green; things to do in hersham; pubs in hersham; restaurants hersham; hersham history; hersham parakeets; sham 69 hersham; living in hersham; is hersham a nice place to live; schools in hersham; hersham station; hersham to waterloo; hersham news; hersham planning; hersham shopping centre; hersham village market; hersham village conservation area; hersham village hall; burhill golf club; river mole walk hersham; st peters church hersham

**Whiteley Village:** whiteley village; whiteley village surrey; whiteley village hersham; whiteley village walton on thames; whiteley village history; william whiteley; whiteley village cafe; whiteley village post office; visiting whiteley village; whiteley village almshouses; how to live in whiteley village; whiteley homes trust; whiteley village bus; whiteley village conservation area

## Appendix C: the 52 pages wider than a 360px screen

Width in pixels after the slug. Measured at `3a4f250`.

**`/history/` (24):** abc-motors-hersham 489, arthur-white 485, ashley-park-estate 455, charles-sydney-spitfire-crash-station-avenue 707, domesday-and-origins 368, elm-grove-walton-on-thames 405, elmbridge-hundred 549, film-studios 488, heraldry-walton-on-thames-hersham-whiteley 524, hwm-and-motor-racing 429, john-valentine-savage-walton-mineral-water-works 578, lost-breweries-of-walton-on-thames 576, mount-felix 485, mount-felix-tapestry 475, origins-of-baseball 443, sidney-road 521, st-marys-church-new-zealand-flag-anzac-day 398, swan-symbol-walton-on-thames 591, the-heart-and-town-centre 385, thomas-king-1668-walton-on-thames-halfpenny 455, walton-before-the-suburbs 1249, walton-bridge 1249, walton-hop 509, walton-regatta 686

**`/clubs/` (11):** 1st-walton-viking-sea-scouts 390, 4th-walton-on-thames-scout-group 431, 9th-walton-viscount-air-scouts 446, elmbridge-community-link 366, hersham-sports-and-social-club 404, walton-and-hersham-united-fc 379, walton-and-hersham-youth-fc 374, walton-and-weybridge-amateur-operatic-society 504, walton-on-thames-bowling-club 408, walton-on-thames-cricket-club 404, walton-on-thames-lawn-tennis-club 440

**`/things-to-do/` (9):** apps-court-car-boot-sale 489, brooklands-day-out 377, cecil-hepworth-playhouse 488, elmgrove-recreation-ground 369, riverhouse-barn 369, safari-adventure-golf 372, shepperton-cruise 364, st-marys-church 420, walton-trail 544

**`/hersham/` (8):** burhill-and-golf 491, community-groups 463, hersham-green-shopping-centre 496, hersham-lodge-and-hersham-place 553, parakeets 499, queen-victoria-first-steam-train 466, st-peters-church 424, whiteley-village 406

## Appendix D: method and limits

| What | How |
|---|---|
| Build | `npm ci`, `npm run build` at `b1ce661` (9 November) and again at `3a4f250` (10 November) after `main` moved. Figures are from the second build unless stated. The working tree was unchanged by either. |
| Page audit | Every HTML file in `dist/` parsed with `parse5`: title, description, canonical, robots, headings, links by region (header, footer, breadcrumb, main), images, scripts, styles, JSON-LD. Link graph and click depth computed from that. |
| Repository checks | `npm run seo:validate` and `npm run seo:links`, both clean |
| Lighthouse | Version 12, mobile, simulated throttling, 22 URLs, against a local static server with gzip. Laboratory data, not field data. |
| Phone layout | Headless Chromium, 360 by 740, mobile emulation, external requests blocked. `scrollWidth` compared with 360 on all 420 indexable pages. Causes confirmed by injecting CSS and re-measuring. |
| Directory profile | Frontmatter of the 181 records in `src/content/businesses/` |
| Web search | General web search, US index, title and URL only |
| Not done | Any live request to the site, to Google or to a competitor. Any Semrush report. Any reading of the Search Console export. Field Core Web Vitals. Anything inside the three blocks that fetch live data at build time. |

Three things in this plan rest on the brief alone and should be checked first when the export arrives: that the homepage is the URL ranking for "walton on thames", that `/hersham/` is the URL ranking for both Hersham terms, and that the 74 www URLs predate 4 September.
