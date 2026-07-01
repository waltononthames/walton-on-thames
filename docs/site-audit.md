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
| `src/pages/visit/history-and-heritage.astro` | Blueprint 4.7 `/history/` hub + extension Section 3 entity pages | RETIRE | Single catch-all page with six shallow sections. Contains the "Hepworth Sculpture Walpole" error — confirmed dropped, not migrated (Decision 4). Remaining content is broken up into the hub plus dedicated entity pages. Redirect `/visit/history-and-heritage/` → `/history/`. |
| `content/news/walton-bridge-history.md` | `/history/walton-bridge/` | MERGE, redirect | Direct overlap — this article is essentially a draft of the spec'd page. |
| `content/news/birth-of-baseball-walton-on-thames.md` | `/history/origins-of-baseball/` (extension 3.14 — VERIFY flagged in spec) | MERGE, redirect | Extension requires verifying the Whitehall Evening Post citation before publishing; don't carry this over unverified. |
| `content/news/birds-eye-walton-court-history.md` | `/history/the-heart-and-town-centre/` (blueprint 3.17) | MERGE, redirect | |
| `content/news/julie-andrews-walton-on-thames.md` | `/history/famous-residents/` (summary) — extension explicitly names Julie Andrews as "first candidate" for her own child page | KEEP standalone + cross-link | No redirect needed; extension endorses exactly this structure. |
| — | Extension 3.2–3.17: `cowey-stakes`, `domesday-and-origins`, `film-studios` (expand), `walton-hop`, `mount-felix`, `walton-in-wartime`, `famous-residents` (expand), `monty-python-and-film-locations`, `hwm-and-motor-racing`, `ashley-park-estate`, `st-marys-church` (expand), `origins-of-baseball`, `walton-charity`, `river-thames-at-walton`, plus 3.17 briefs (`the-heart-and-town-centre`, `old-manor-house`, `oatlands-and-the-royal-connection`, `elmbridge-hundred`) | NEW | ~16 entity pages with no existing draft at all. |
| `src/content.config.ts` | Extension 2.1 `history` collection schema | NEW | Collection doesn't exist; must be added before any history page is built. |

## 7. Hersham section (new top-level, per extension — do not nest under Walton)

| Existing page | Spec target | Class | Notes |
|---|---|---|---|
| `content/neighbourhoods/hersham.md` | `/hersham/` hub (extension 4.1) | MERGE, redirect | Per Decision 2 — folds into the new dedicated `/hersham/` section (which per the extension must not nest under Walton pages). Redirect `/neighbourhoods/hersham/` → `/hersham/` once merged. |
| `content/news/hersham-village-guide.md` | `/hersham/` hub | MERGE, redirect | Draft-quality overlap with the hub copy already written in extension 4.1. |
| `content/news/whiteley-village-visiting-guide.md` | `/hersham/whiteley-village/` (extension 4.5) | MERGE, redirect | Third of the three duplicate Whiteley Village sources, all consolidating into one page (Decision 3) — no standalone deep-dive kept for this topic. |
| `content/news/william-lilly-hersham-english-merlin.md` | `/hersham/famous-residents/` (summary), cross-link to `/history/st-marys-church/` | KEEP standalone + cross-link | Same "promote to child page" pattern as Julie Andrews. |
| — | Extension 4.2–4.10: `/hersham/history/` hub, `hersham-green`, `sham-69`, `whiteley-village`, `famous-residents`, `parakeets`, `river-mole-walks`, `st-peters-church`, `food-and-drink`, `burhill-and-golf` | NEW | None built. |
| `src/content.config.ts` | Extension 2.1 `hersham` collection schema | NEW | Same schema as `history`, different `cluster` enum value — collection doesn't exist yet. |
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

## Redirect list (accumulate here as URLs actually migrate — none of these have been applied yet)

```
/visit/things-to-do/                              -> /things-to-do/
/visit/things-to-do/hersham-village-green/         -> /hersham/hersham-green/
/visit/things-to-do/whiteley-village/              -> /hersham/whiteley-village/
/visit/walks-and-the-river/                        -> /things-to-do/riverside-walks/
/visit/getting-here/                               -> /getting-here/
/visit/history-and-heritage/                       -> /history/
/eat-and-drink/                                    -> /food-and-drink/
/community/                                        -> /living/
/community/schools/                                -> /living/schools/
/community/clubs-and-groups/                       -> /living/community/
/community/news/walton-bridge-history/             -> /history/walton-bridge/
/community/news/birth-of-baseball-walton-on-thames/ -> /history/origins-of-baseball/
/community/news/birds-eye-walton-court-history/     -> /history/the-heart-and-town-centre/
/community/news/hersham-village-guide/              -> /hersham/
/community/news/whiteley-village-visiting-guide/    -> /hersham/whiteley-village/
/neighbourhoods/hersham/                            -> /hersham/
/neighbourhoods/walton-on-thames/                   -> /
/community/news/whiteley-village-visiting-guide/    -> /hersham/whiteley-village/
```

Decisions 1–4 are resolved (see Section 0). These redirects are ready to implement as each corresponding page is actually built and merged — add the `_redirects` entry in the same commit that retires the old URL, not before the replacement page exists.
