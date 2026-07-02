# Site audit: existing pages vs. blueprint/extension

Maps every page and content file currently in the repo against `walton-seo-blueprint.md` and `walton-history-hersham-extension.md`. No site code was changed to produce this audit.

**Classification key**
- **KEEP** — matches the spec's URL and intent closely enough to leave alone (content may still need a copy pass later, but it's not an architecture change).
- **ADAPT** — same URL stays, but content/structure needs rewriting to match the spec.
- **MERGE** — content here should be folded into a spec'd page that lives at a different URL. Needs a decision on whether the old URL 301s or stays as a standalone deep-dive.
- **RETIRE** — superseded outright; redirect to the replacement.
- **NEW** — spec calls for a page/collection that doesn't exist yet.

---

## 0. Decisions (resolved 2026-07-02)

1. **`/visit/` prefix vs. flat root URLs — DECIDED: migrate to flat root URLs.** The site will move to the blueprint's literal URL structure: `/visit/things-to-do/` → `/things-to-do/`, `/visit/getting-here/` → `/getting-here/`, `/visit/walks-and-the-river/` → `/things-to-do/riverside-walks/`, `/eat-and-drink/` → `/food-and-drink/`, `/community/schools|clubs-and-groups|council-and-services/` → folded into `/living/`. Every moved URL gets a 301 redirect (see the redirect list at the foot of this file). `/visit/` and `/community/` are retired as prefixes once their pages migrate.

2. **`/neighbourhoods/walton-on-thames/` and `/neighbourhoods/hersham/` vs. the homepage / `/hersham/` hub — DECIDED: fold in and redirect.** Content from both pages merges into the homepage + `/history/` + `/living/` hubs (Walton) and the new `/hersham/` hub (Hersham). Once merged, 301 `/neighbourhoods/walton-on-thames/` → `/` and `/neighbourhoods/hersham/` → `/hersham/`. `/neighbourhoods/` is retired as a public-facing concept for these two entries.

3. **Whiteley Village triplication — DECIDED: consolidate to one page.** Merge the best facts from `neighbourhoods/whiteley-village.md`, `places/whiteley-village.md`, and `news/whiteley-village-visiting-guide.md` into the single `/hersham/whiteley-village/` entity page specified in the extension. 301-redirect the other three source URLs to it once merged — no standalone deep-dive kept for this one (unlike Julie Andrews / William Lilly).

4. **"Hepworth Sculpture Walpole" on `/visit/history-and-heritage.astro` — DECIDED: drop, do not migrate.** Confirmed as an apparent conflation of Cecil Hepworth (Walton's film studio) with Barbara Hepworth (unrelated sculptor; her gallery, The Hepworth Wakefield, is in Yorkshire). Not present in either strategy doc. When this page's content is broken up into the new `/history/` section, this section is simply dropped rather than migrated. Cecil Hepworth's film studio gets its own proper treatment via `/history/film-studios/` (blueprint 3.4/4.7).

---

## 1. Homepage and core hubs

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/index.astro` | Blueprint 4.1 Homepage | ADAPT | Rewrite to the section structure in 4.1 (river, things to do, food and drink, "a town that invented things", living, what's on, FAQ). Same URL. |
| `src/pages/about.astro` | Blueprint 4.10 About | ADAPT | Structure matches already; still has placeholder owner bio (pre-existing open item). Same URL. |
| `src/pages/visit/index.astro` | No direct equivalent — blueprint has no `/visit/` hub | RETIRE | Per Decision 1, URLs move to root — this page's role folds away; becomes a redirect stub or is removed once all its children have migrated. |

## 2. Things to do

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/visit/things-to-do/index.astro` | Blueprint 4.2 `/things-to-do/` hub | ADAPT, URL change | Content needs rewrite to hub copy; move to `/things-to-do/` and redirect the old URL (Decision 1). |
| `src/pages/visit/things-to-do/[slug].astro` (places collection) | Blueprint 4.2/5 spoke pages | ADAPT | Template stays; individual entries route to Section 3 below. |
| `content/places/cowey-sale.md` | Spoke `/things-to-do/...` entry (visit angle) **and** `/history/cowey-stakes/` (extension 3.2, history angle) | MERGE | Split: keep practical/visit facts here, move the Caesar/Camden history narrative to the new history entity page. Don't duplicate the tradition-vs-fact framing in both. |
| `content/places/walton-bridge.md` | Spoke entry **and** `/history/walton-bridge/` (blueprint 3.6/4.7, extension expands with six-bridges detail) | MERGE | Same split as above — visit-facts vs. history-facts. |
| `content/places/ashley-park.md` | Spoke entry (`/things-to-do/parks-and-green-spaces/`) **and** `/history/ashley-park-estate/` (blueprint 3.12) | MERGE | Same pattern. |
| `content/places/hersham-village-green.md` | `/hersham/hersham-green/` (extension 4.3) | MERGE, URL change | Redirect `/visit/things-to-do/hersham-village-green/` → `/hersham/hersham-green/`. |
| `content/places/whiteley-village.md` | `/hersham/whiteley-village/` (extension 4.5) | MERGE, URL change | Per Decision 3 — one of three duplicate sources, consolidating into one page. Redirect once merged. |
| — | Blueprint 5 spokes: `/things-to-do/with-kids/`, `/rainy-day/`, `/on-the-river/`, `/parks-and-green-spaces/`, `/desborough-island/` | NEW | None of these exist yet. |
| `src/pages/visit/walks-and-the-river.astro` | Blueprint 4.3 `/things-to-do/riverside-walks/` (full copy already written in the blueprint) | ADAPT, URL change | Blueprint gives ready-to-use copy (three named walks). Redirect `/visit/walks-and-the-river/` → `/things-to-do/riverside-walks/`. |
| `content/news/thames-path-walton-to-weybridge.md` | Overlaps riverside-walks spoke | MERGE or KEEP standalone | Decision needed — fold facts into the spoke, or keep as a supplementary deep-dive cross-linked from it. |

## 3. Food and drink

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/eat-and-drink/index.astro` | Blueprint 4.4 `/food-and-drink/` | ADAPT, URL change | Redirect `/eat-and-drink/` → `/food-and-drink/`. |
| — | Blueprint 5 spokes: `/food-and-drink/riverside-pubs/`, `/restaurants/`, `/cafes-and-coffee/` | NEW | Blueprint gives full copy for riverside-pubs (4.3-equivalent section, Jerome Kern story). None built yet. |

## 4. Living

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/community/index.astro` | Blueprint 4.6 `/living/` hub | MERGE, URL change | Move to `/living/` and redirect the old URL (Decision 1). |
| `src/pages/community/schools.astro` | Blueprint 5 `/living/schools/` | MERGE, URL change | Redirect `/community/schools/` → `/living/schools/`. |
| `src/pages/community/clubs-and-groups.astro` | Blueprint 4.6 "Community" H2 → `/living/community/` | MERGE, URL change | Redirect `/community/clubs-and-groups/` → `/living/community/`. |
| `src/pages/community/council-and-services.astro` | Not explicitly spec'd | KEEP or fold into `/living/community/` | Blueprint is silent on council links as a standalone page; no strict redirect obligation, but logically belongs under `/living/` if nav restructures. |
| — | Blueprint 5 `/living/property/`, `/living/areas/` | NEW | Not built. |

## 5. Getting here

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/visit/getting-here.astro` | Blueprint 4.8 `/getting-here/` | ADAPT, URL change | Content is close to spec already (train times, road, station distance). Redirect `/visit/getting-here/` → `/getting-here/`. |

## 6. History (Walton cluster)

Biggest gap: the entire `/history/` section per blueprint Section 3/4.7 and extension Section 3 is effectively new. One existing page covers this ground badly.

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/visit/history-and-heritage.astro` | Blueprint 4.7 `/history/` hub + extension Section 3 entity pages | **RETIRED** (2026-07-02) | Deleted. The "Hepworth Sculpture Walpole" error was dropped, not migrated (Decision 4). Content rebuilt as `/history/` (full pillar page) plus dedicated entity pages. Redirect `/visit/history-and-heritage/` → `/history/` is live in `public/_redirects`. |
| `content/news/walton-bridge-history.md` | `/history/walton-bridge/` | **RETIRED** (2026-07-03) | Deleted, redirected to `/history/walton-bridge/`. Fixed the one remaining internal link (in `content/neighbourhoods/walton-on-thames.md`) that pointed at the old URL. |
| `content/news/birth-of-baseball-walton-on-thames.md` | `/history/origins-of-baseball/` (extension 3.14 — VERIFY flagged in spec) | MERGE, redirect — **not yet actioned** | `/history/origins-of-baseball/` is now built and fully verified (the Whitehall Evening Post citation checks out precisely). This older article still exists at its old URL; folding it in and redirecting is still open. |
| `content/news/birds-eye-walton-court-history.md` | `/history/the-heart-and-town-centre/` (blueprint 3.17) | MERGE, redirect — **not yet actioned** | `/history/the-heart-and-town-centre/` is now built. This article still exists separately; folding it in and redirecting is still open. |
| `content/news/julie-andrews-walton-on-thames.md` | `/history/famous-residents/` (summary) — extension explicitly names Julie Andrews as "first candidate" for her own child page | KEEP standalone + cross-link | `/history/famous-residents/` is now built and includes a Julie Andrews section; this standalone article remains separate, as the extension specifies. |
| **Built 2026-07-02 (Tranche 2)** | `/history/` hub, `/history/cowey-stakes/`, `/history/walton-bridge/`, `/history/st-marys-church/`, `/history/film-studios/`, `/history/famous-residents/` | **DONE** | See `docs/build-log.md`. |
| **Built 2026-07-02 (Tranche 4)** | `/history/mount-felix/`, `/history/walton-in-wartime/`, `/history/hwm-and-motor-racing/`, `/history/walton-hop/` (sensitive — handled per spec's explicit caution), `/history/monty-python-and-film-locations/` | **DONE** | See `docs/build-log.md` — several spec claims for the Monty Python page couldn't be verified and were dropped; the Walton Hop page required careful precision distinguishing Jonathan King's unconnected 2001 conviction from the 2018 Hop-connected trial that ended without conviction. |
| **Built 2026-07-02/03 (Tranche 5)** | `/history/domesday-and-origins/`, `/history/ashley-park-estate/`, `/history/origins-of-baseball/`, `/history/river-thames-at-walton/`, `/history/the-heart-and-town-centre/`, `/history/old-manor-house/`, `/history/oatlands-and-the-royal-connection/`, `/history/elmbridge-hundred/` | **DONE** | See `docs/build-log.md` — several spec facts corrected against sourcing found during research (Ashley Park demolition date, Lord Desborough's Thames Conservancy title). |
| — | `walton-charity` (extension 3.15) | **NOT BUILT — needs owner input** | The spec's own build note requires Darren's direct archival access via his Walton Charity trusteeship; deliberately not researched/written from public sources. The one page in the entire five-tranche build order not completed. |
| `src/content.config.ts` | Extension 2.1 `history` collection schema | **DONE** | Added 2026-07-02, along with the matching `hersham` collection. |

## 7. Hersham section (new top-level, per extension — do not nest under Walton)

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `content/neighbourhoods/hersham.md` | `/hersham/` hub (extension 4.1) | MERGE, redirect — **not yet actioned** | `/hersham/` is now built independently from the extension's own facts (not migrated from this file). This neighbourhood page still exists at its old URL; folding it in and redirecting per Decision 2 is still open. |
| `content/news/hersham-village-guide.md` | `/hersham/` hub | **RETIRED** (2026-07-03) | Deleted, redirected to `/hersham/`. |
| `content/news/whiteley-village-visiting-guide.md` | `/hersham/whiteley-village/` (extension 4.5) | **RETIRED** (2026-07-02) | Deleted per Decision 3, redirected to `/hersham/whiteley-village/`. |
| `content/places/whiteley-village.md` | `/hersham/whiteley-village/` (extension 4.5) | **RETIRED** (2026-07-02) | Deleted per Decision 3, redirected. Was previously routed at `/things-to-do/whiteley-village/`. |
| `content/neighbourhoods/whiteley-village.md` | `/hersham/whiteley-village/` (extension 4.5) | KEPT for now — scoping decision | Deliberately **not** retired alongside the other two duplicates. See the scoping note in `docs/build-log.md` (2026-07-02, whiteley-village entry) — retiring it ahead of the Walton-on-Thames and Hersham neighbourhood pages would leave `/neighbourhoods/` inconsistently migrated. Still counts as open Decision 2 work. |
| `content/news/william-lilly-hersham-english-merlin.md` | `/hersham/famous-residents/` (summary), cross-link to `/history/st-marys-church/` | KEEP standalone + cross-link | `/hersham/famous-residents/` is now built and links to this article, exactly as the extension specifies. |
| **Built 2026-07-02 (Tranche 3)** | `/hersham/` hub, `/hersham/history/` hub, `/hersham/hersham-green/`, `/hersham/sham-69/`, `/hersham/food-and-drink/` | **DONE** | See `docs/build-log.md`, including a genuine mobile-menu bug found and fixed while wiring up the new nav item. |
| **Built 2026-07-02 (Tranche 4)** | `/hersham/whiteley-village/`, `/hersham/famous-residents/`, `/hersham/parakeets/` | **DONE** | See `docs/build-log.md` — Whiteley Village consolidates the three duplicate sources above; corrected a factual error in the old source content (wrong managing organisation) and dropped an unverifiable "Registered Park and Garden" claim. |
| **Built 2026-07-02/03 (Tranche 5)** | `/hersham/river-mole-walks/`, `/hersham/st-peters-church/`, `/hersham/burhill-and-golf/` | **DONE** | See `docs/build-log.md` — river-mole-walks was written as a general orientation page rather than a first-hand-walked route guide, since the latter genuinely can't be produced remotely. This completes the entire extension Section 4 page list. |
| `src/content.config.ts` | Extension 2.1 `hersham` collection schema | **DONE** | Added alongside `history` on 2026-07-02. |
| `src/components/Header.astro` nav | Extension 2.3 "Add Hersham as a top-level nav item" | NEW (nav change) | Not built — current nav has no Hersham entry, only the generic "Neighbourhoods" item. |
| `src/layouts/*` | Extension 2.2 `HistoryArticle.astro` layout + `HistoryTimeline.astro` component | NEW | Neither exists; required before any history/Hersham entity page can ship per the extension's own build order. |

## 8. Neighbourhoods (existing collection — retiring per Decision 2)

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/neighbourhoods/index.astro` | No blueprint equivalent | RETIRE | Blueprint's intent-based architecture has no "neighbourhoods" concept as a public hub. Retires once both entries below have migrated. |
| `content/neighbourhoods/walton-on-thames.md` | Overlaps homepage (4.1) + `/history/` hub + `/living/` hub | MERGE, redirect | Per Decision 2 — content folds into the homepage + `/history/` + `/living/` hubs, then `/neighbourhoods/walton-on-thames/` 301s to `/`. |
| `content/neighbourhoods/whiteley-village.md` | `/hersham/whiteley-village/` | MERGE, redirect | Second of three duplicate sources, all consolidating into one page (Decision 3). |

## 9. Directory and What's On

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/whats-on/index.astro`, `[slug].astro` | Blueprint 4.5 `/whats-on/` | KEEP | URL and structure already match. Blueprint asks for an added evergreen "Annual events in Walton" section — content addition, not a structural change. |
| `src/pages/directory/index.astro`, `[slug].astro` | Blueprint 4.9 `/directory/` | KEEP (base) / NEW (category hubs) | Base directory matches spec. Blueprint's `/directory/{category}/` hub pages for long-tail queries don't exist yet. |

## 10. Shopping (no blueprint equivalent)

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `src/pages/shopping/index.astro`, `independent-shops.astro`, `the-heart.astro` | Not covered by either doc | KEEP | Blueprint folds The Heart into food-and-drink/homepage narrative rather than giving Shopping its own hub, but doesn't forbid one. No conflict, no redirect required. |

## 11. Utility and legal pages (no blueprint equivalent — all KEEP)

`404.astro`, `accessibility-statement.astro`, `contact.astro`, `privacy-policy.astro`, `terms-and-conditions.astro`, `advertise-your-business.astro` — none of these are addressed by either strategy document. No action.

## 12. Content not covered above

| Existing content | Notes |
|---|---|
| `content/news/gyms-yoga-fitness-walton-on-thames.md` | No blueprint/extension equivalent. KEEP as a standalone news article; the `businesses` collection's large fitness/yoga/pilates cluster (all4pilates, body-soul-yoga, etc.) is directory inventory, unaffected by either doc. |
| `content/news/welcome-post.md` | Site announcement, no spec equivalent. KEEP. |
| `content/events/*` | Events collection is orthogonal to both strategy docs (blueprint just says `/whats-on/` should carry `Event` schema, which it already does per BaseLayout/EventCard). No change. |
| `content/businesses/*` | Directory inventory, unaffected. Blueprint's directory category-hub structure (Section 9 above) is the only relevant gap. |

---

## Redirect list

Live in `public/_redirects` (2026-07-02):

```
/visit/things-to-do/                               -> /things-to-do/
/visit/things-to-do/*                              -> /things-to-do/:splat
/visit/walks-and-the-river/                        -> /things-to-do/riverside-walks/
/visit/getting-here/                                -> /getting-here/
/visit/places-to-stay/                              -> /places-to-stay/
/visit/history-and-heritage/                        -> /history/
/visit/*                                            -> /things-to-do/:splat   (fallback)
/visit/                                             -> /things-to-do/
/eat-and-drink/                                      -> /food-and-drink/
/eat-and-drink/*                                    -> /food-and-drink/:splat
/community/                                         -> /living/
/community/schools/                                 -> /living/schools/
/community/clubs-and-groups/                        -> /living/community/
/community/council-and-services/                    -> /living/council-and-services/

# Whiteley Village consolidation (Decision 3) — added 2026-07-02
/things-to-do/whiteley-village/                     -> /hersham/whiteley-village/
/community/news/whiteley-village-visiting-guide/     -> /hersham/whiteley-village/

# News articles superseded by Tranche 2/3 history pages — added 2026-07-03
/community/news/walton-bridge-history/              -> /history/walton-bridge/
/community/news/hersham-village-guide/               -> /hersham/
```

Not yet applied — still pending the corresponding MERGE work (see Sections 6–8 above):

```
/community/news/birth-of-baseball-walton-on-thames/ -> /history/origins-of-baseball/
/community/news/birds-eye-walton-court-history/      -> /history/the-heart-and-town-centre/
/neighbourhoods/hersham/                             -> /hersham/
/neighbourhoods/walton-on-thames/                    -> /
/visit/things-to-do/hersham-village-green/           -> /hersham/hersham-green/  (superseded — this path already 301s to /things-to-do/hersham-village-green/ under the live rules above; re-target once needed)
```

Decisions 1–4 are resolved (see Section 0). Add each remaining `_redirects` entry in the same commit that retires the old URL, not before the replacement page exists.
