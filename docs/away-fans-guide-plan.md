# Away fans' guide: Phase 1 plan

Brief: `away-fans-guide-brief.md` (supplied by Darren, 28 September 2026).
Status: Phase 2 prototype built on `feature/away-fans-guide` (29 September 2026). See the build log for results. Phase 3 (research) next.

This plan is written against the repository as it stands on branch `directory/red-practice-photos` at `d419b82`. Work will start on a fresh branch from `main`.

---

## 1. Decisions (answered by Darren, 28 September 2026)

| # | Question | Decision |
|---|---|---|
| D1 | Unverified facts | **Agreed.** Structured `unconfirmed` records, not `TODO: verify` strings (section 3). Darren may confirm some facts himself, which is recorded with its own basis (section 3). |
| D2 | Map technology | **Agreed.** Build-time SVG maps from OpenStreetMap; MapLibre and OpenFreeMap only on tap (section 6). |
| D3 | Opening image on phones | **Agreed.** About 55% of the viewport on phones with the quick answers card above the fold; full-screen on desktop. |
| D4 | Existing `/things-to-do/walton-and-hersham-fc/` | **Agreed.** It stays as the residents' local-sport page and links to the guide, and the Things to Do card points at the guide. The new page is written for away fans only, built around the terms they search and checked for completeness against other clubs' away guides (section 14). |
| D5 | Site navigation | **Agreed.** No top-level nav item; linked from the homepage, Things to Do, the Walton-on-Thames station page, the existing FC page and home-fixture pages on What's On. |
| D6 | Satellite club pages | **Dropped.** No page per visiting club, and no `?club=` welcome line (brief sections 7.7 and 10 satellite pages are out of scope). The main guide ranks on its own. |
| D11 | Getting from the station to the ground | **Four options, all featured:** walk by road, walk by the towpath, bus, and taxi or Uber. The walk is long, so bus and taxi get equal billing (section 6). |
| D7 | Service worker | **Deferred** to Phase 4. |
| D8 | Test tooling | **Agreed.** `npx`, not added to `package.json`. |
| D9 | Hersham station | **Omitted entirely.** It is not a walking option. |
| D10 | Report a change | **Agreed.** Add a "Report a change to the away fans' guide" option to the subject list on `/contact/`. |

---

## 2. What already exists and will be reused

| Existing | Use in this guide |
|---|---|
| `BaseLayout.astro` | Wraps the page: title rule, canonical, OG and Twitter tags, `noIndex`, `preloadImage`, `structured-data` slot, Pagefind body. The proposed title (54 characters) is emitted as written, with no suffix. |
| `global.css` tokens | Navy, cream, slate, gold accent `#B8862E`; Fraunces headings, Inter body. No new fonts. |
| `fixtures` collection (live ECAL feed, daily rebuild) | Next home fixture, the visiting club's next visit, and `SportsEvent` markup. The feed is the club's own, so it meets the brief's condition of "verified and maintained". |
| `businesses` collection | The Weir (`the-weir-hotel.md`), 8 pubs and bars, 23 restaurants, 12 takeaways, 17 accommodation records. The guide references these records, not copies of them. |
| `checkedSource` / `factBasis` schema pattern (GP directory) | The model for every fact in the guide: label, URL, basis, date checked. |
| `scripts/build-areas-map.mjs`, `src/components/gp/mapProjection.ts` | OpenStreetMap-to-SVG pipeline via Overpass, with projection and attribution already solved. The route map extends this. |
| `scripts/build-pharmacy-routes.mjs` | Configurable OSRM routing, run by hand and never at build time. Walking routes and times come from the same pattern. |
| `AreasMap.astro` | CSS `:has()` checkbox layer toggles that work without JavaScript. The overview map's category toggles copy this. |
| `ThingsToDoStickyNav.astro`, `GuideContents.astro`, `HistoryLongform.astro` | Sticky navigation with a current-section highlight and reduced-motion handling. The chapter navigation follows the same pattern. |
| `attractions` schema's `image()` helper | Precedent for `astro:assets` with AVIF and WebP output. The guide's photography goes through `astro:assets`, not the hand-made WebP variants in `public/images/`. |
| `/contact/?subject=` preselect | "Report a change" links here. No new mechanism. |
| `functions/_middleware.js` | Branch previews at `<branch>.walton-on-thames.pages.dev` keep serving, so Phase 2 can be reviewed on a preview URL. |
| Prebuild checks | Em dash and marker checks already cover the new files. Nothing to add except the guide-specific check in section 3. |

**Not present, so not added:** dark mode (the site has none), a UI framework (so no React or Vue), a service worker, a test suite.

---

## 3. Unverified facts (D1)

**The conflict.** The brief asks for `TODO: verify` in the data files, shown only in development builds. `scripts/check-verification-markers.mjs` fails the build on any `todo:` in `src/`. That check exists because of the July 2026 audit, and weakening it would reopen that gap. Cloudflare preview builds also run `npm run build`, so the string would block the Phase 2 preview too.

**The proposal.** Every fact in the guide's data is one of two shapes:

```yaml
kickOffSaturday:
  value: "3pm"
  source: { label: "...", url: "...", basis: organisation-website, checked: 2026-10-02 }

segregation:
  unconfirmed: { ask: club, question: "Is the ground segregated for league matches, and how is it decided?" }
```

- A shared `<Fact>` component renders `value` normally. An `unconfirmed` fact renders nothing in production, and a dashed "Unconfirmed: ask the club" badge in `astro dev`. Surrounding copy is written to read correctly whether or not the fact is present.
- `ask` is one of `club`, `venue`, `operator`, `site-visit`.
- **Darren's own confirmations.** Where Darren confirms a fact himself, the source records how: `editor-observation` for something he has seen or walked (a turnstile, a lit path), or `organisation-confirmed` for something the club or a venue told him, with who confirmed it and the date in the label. Memory of how things used to be is not a confirmation, from Darren or from the model. The sources file groups the questions by `ask`, so Darren can clear all the club questions in one conversation.
- The Content Verification Protocol still applies in full: an `unconfirmed` record is a question, not a softened claim, and it never reaches the page.

**Prototype placeholders (Phase 2 only).** Placeholder coordinates and train times carry `placeholder: true`. A new prebuild script, `scripts/check-away-guide.mjs`, fails the build when `CF_PAGES_BRANCH` is `main` and any placeholder remains. On a preview branch it passes, and the page shows a fixed "Prototype data: these times and positions are not real" banner and is set to `noIndex`.

**Train times go stale.** Each `trains` record carries the timetable period it was checked against. When that period ends, the finder hides itself in production and only the National Rail link shows, in the same fail-safe way the pharmacy routes show nothing rather than an estimate. The same script prints an advisory warning a fortnight ahead.

---

## 4. URL and placement

- **URL:** `/walton-hersham-fc-away-fans-guide/`. Root-level, descriptive slugs are already the convention (`/walton-on-thames-railway-station/`, `/hersham-railway-station/`), and the site audit's Decision 1 moved URLs to the root. No conflict with `public/_redirects` or any existing route. No ADAPT or MERGE entry in `docs/site-audit.md`.
- **Overlap (D4):** `/things-to-do/walton-and-hersham-fc/` targets residents looking for local sport. The new guide targets visiting supporters. Their titles and intents differ enough to coexist, provided each links clearly to the other.
- **Links in:** homepage, `/things-to-do/` and `/things-to-do/sport-and-active/`, the existing FC page, the Walton-on-Thames station page, `/getting-here/` and `/getting-here/parking/`, home-fixture pages under `/whats-on/`, and the history pages on the walking route (chosen once the route is known).

---

## 5. File structure

```
src/pages/walton-hersham-fc-away-fans-guide/
  index.astro                 the guide

src/components/away-guide/
  Opening.astro               hero picture, title, standfirst, byline, independence line
  QuickAnswers.astro          postcode, copy button, maps links, kick-offs, tickets, stations, parking
  ChapterNav.astro            sticky on desktop, four-link bottom bar on phones, progress bar
  ChapterBreak.astro          full-bleed photographic divider
  NeedToKnow.astro            the consistent icon/label/value panel
  Fact.astro                  renders a sourced fact, or nothing (see section 3)
  PhotoSlot.astro             placeholder block now, art-directed <picture> later
  RouteStory.astro            scroll-driven route map and steps
  OverviewMap.astro           filterable map plus the text list beneath it
  VenueList.astro             pubs and food, hours as text, "open now" as enhancement
  WeirFeature.astro
  GroundPlan.astro            illustrated SVG plan
  LastTrainFinder.astro       table in HTML, finder as enhancement
  MatchdayTimeline.astro      3pm and 7.45pm plans in HTML, custom kick-off as enhancement
  Faqs.astro                  visible Q&A plus FAQPage markup from one array
  PrintCard.astro             print-only matchday card

src/scripts/away-guide/       client modules, each loaded only when its section nears the viewport
  chapters.ts  route-story.ts  overview-map.ts  open-now.ts  last-train.ts
  timeline.ts  copy-postcode.ts  live-map.ts (MapLibre, on tap only)

src/content/away-guide/       YAML data (section 7)
src/content/schemas/away-guide.ts   Zod schemas, imported by content.config.ts
src/utils/openingHours.ts     structured hours and Europe/London "open now"
src/data/away-guide-map.json  generated map geometry
src/assets/away-guide/        photography (astro:assets)

scripts/build-away-guide-map.mjs   OSM base map and route geometry (npm run map:away-guide)
scripts/check-away-guide.mjs       prebuild: placeholder gate on main, timetable expiry

docs/away-fans-guide-plan.md       this file
docs/away-fans-guide-sources.md    Phase 3
docs/away-fans-guide-shot-list.md  Phase 4
```

**Islands.** The brief asks for Astro islands with `client:visible`. Those directives only exist for framework components, and the repository has no framework. The equivalent here is Astro's bundled `<script>` modules, each started by one shared IntersectionObserver when its section approaches, with `import()` for anything larger than a few kilobytes. Same behaviour, no framework runtime.

---

## 6. Maps (D2)

**Why not MapLibre on first load.** MapLibre GL JS is roughly 220 KB compressed before tiles and styles (to be measured in Phase 2), seven times the brief's 30 KB script budget. It also needs JavaScript to show anything, whereas the brief requires a complete static fallback. The site already renders maps as SVG from OpenStreetMap at build time, so the guide should too.

**Route map (7.2).**
- `build-away-guide-map.mjs` fetches streets, rail, river and landmarks for the area between Walton-on-Thames station and the ground via Overpass, as `build-areas-map.mjs` does, and writes one SVG base image plus a JSON file of route paths, step points, pub and history markers in the same coordinate space.
- Route geometry comes from OSRM foot routing, using the pharmacy-routes provider configuration. The router gives distance and time. Whether a route is lit, step-free and comfortable after dark is recorded as `editor-observation` from Darren walking it, or from OSM `lit` tags with basis `openstreetmap`. It is never inferred.
- Without JavaScript: the full route, numbered step markers and the written steps. Complete on its own.
- With JavaScript: the route path draws itself with `stroke-dashoffset` as each step card enters view, the SVG `viewBox` moves to frame that step, and pubs and history points fade in when reached. Under `prefers-reduced-motion` the view jumps between states. Estimated script: under 5 KB.
- Layout: two columns with the map pinned on desktop; on phones the map sits in a sticky top third and step cards scroll over the rest.
- Route toggle: radio buttons read by CSS `:has()`, so it works without JavaScript (see "Two route options" below).

**Walking routes start at Walton-on-Thames station only (Darren's decision, 28 September 2026).** There is no Hersham station route and no station toggle. Hersham station is omitted from the guide entirely (D9).

**Four ways from the station to the ground (Darren's decisions, 28 September 2026).** Everything starts at Walton-on-Thames station. The walk is long, so bus and taxi sit alongside the two walking routes as equals, not as a footnote:

- **Bus:** route number, where to board at or near the station, where to get off, journey time, the walk from the stop, how often it runs on Saturdays and weekday evenings, and the last buses back after full time. From the operator's or Surrey County Council's published timetable, with the timetable period recorded.
- **Taxi and Uber:** whether there's a rank at the station, verified local firms with numbers from their own sites or the council's licensing records, and Uber as an app-based option (Darren confirms it operates in Walton-on-Thames; recorded as his confirmation, with Uber's own coverage page added as a source in Phase 3). Also a typical drive time from the router, one agreed pickup point at the ground that suits both taxis and Uber, and advice to book or request early after evening matches, when many people leave at once. No fares or surge pricing stated; the reader checks the app or the firm. Other ride-hailing apps are added only if confirmed in the same way.
- **Walk by road** and **walk by the towpath**, as below.

The two walking routes:

- **By road**, the fastest walking route: the default, and the recommended way back after an evening match.
- **By the Thames towpath**, the riverside alternative.

How they are presented:

- **Comparison card** at the top of the chapter, showing all four options side by side: time, cost (bus fares only where the operator publishes them, with the date; never taxi fares), how often (bus), lighting and surface (walks), step-free status, and a short "best for" line. The chapter is titled for how people search, e.g. "Getting from Walton-on-Thames station to the ground", rather than "The walk". Every value is sourced or measured. The card is plain HTML and needs no JavaScript.
- **One map, both lines.** The route map draws both routes on the same base, with the selected route in the accent colour and the other muted. Radio buttons choose the route. They are read by CSS `:has()`, so switching works without JavaScript. Both sets of written steps stay in the HTML, which keeps them searchable.
- **Separate step stories.** Each route has its own step cards, photographs, pubs and history points. The towpath route is where our river history pages (`river-thames-at-walton`, `walton-bridge` and others on the route) belong. Pubs appear only on the route they're actually on.
- **After dark and in bad weather.** The towpath's lighting, surface, mud and flooding are recorded from Darren walking it (basis `editor-observation`), never assumed. If it is unlit, the guide says so plainly and recommends the road route after evening kick-offs. It also links to the Thames Path National Trail's closures and diversions page and the Environment Agency's river-level page, as links rather than live data, in line with the brief's first-release scope.

Routing: OSRM's foot profile always prefers the shortest path, so the towpath route is forced through recorded waypoints on the towpath. The waypoints are stored in the route file with their basis, so the route can be rebuilt and checked.

**Overview map (7.3).** Same SVG base, category toggles copied from `AreasMap.astro`, with the text list beneath it as the accessible alternative. Each marker links to its section anchor.

**Live map (optional).** An "Explore the live map" button loads MapLibre and OpenFreeMap vector tiles on tap, once, and shares the bundle between both maps. It is reported separately from the first-load budget, as the brief allows. OpenFreeMap needs no key and requires OpenStreetMap attribution. Leaflet (about 42 KB) is the fallback if we'd rather avoid WebGL.

No Google Maps embeds. The "Open in Google Maps" and "Open in Apple Maps" buttons are plain links.

---

## 7. Data model

Adapted from brief section 6 to the site's conventions. Every fact uses the `fact` shape from section 3, and every source uses the existing `checkedSource`, with three values added to `factBasis`: `organisation-website`, `organisation-confirmed` and `timetable`.

| Collection (loader) | Contents | Notes |
|---|---|---|
| `away-venues` (glob, one YAML per venue) | `business` (slug of an existing `businesses` record) **or** name, address, lat, lng; `type`; `onRoute`; `routeOrder`; `distanceFromRouteMins`; `awayFriendly`, `liveSport`, `food`, `family`, `garden` as facts; `openingHours` (structured, per day, sourced); `photo` slot | Identity lives in `businesses`, so the directory and guide never disagree about a name or address. Guide-specific facts live here. `lateOpening` is computed from hours, not typed in. |
| `away-stays` (glob) | `business` reference, `priceBand` (fact), `nearestStation`, `parking`, `groupFriendly` | Distance to the ground is computed from coordinates. **Price band needs a source rule:** published room rates on a stated date, or we drop it. No affiliate links. |
| `away-parking` (glob) | `name`, `type`, lat, lng, `spaces`, `cost`, `notes`, all facts | Charges link to the operator. We state a charge only with a "correct as of" date, per Rule 4. |
| `away-routes` (glob, one per route) | `variant` (`road` or `towpath`), `bestFor`, `viaWaypoints` (towpath only, each with basis), `steps` (text, photo slot, point id, optional history link), and `lit`, `stepFree`, `surface`, `afterDark`, `floodProne` as facts | Distance, duration and geometry are generated into `src/data/away-guide-map.json`, never typed in. Pubs are tied to a route through `away-venues.onRoute`, which becomes a list of variants (`road`, `towpath`). |
| `away-trains` (glob) | `station`, `direction`, `dayType`, `lastDepartures`, `timetableValidFrom`, `timetableValidTo`, source | See section 3 for expiry. |
| `away-ground` (single YAML file) | capacity, surface, turnstile times, kick-offs, prices, rules, accessibility, families: all facts | Most rule-type facts will begin as `unconfirmed: { ask: club }`. |
| `away-faqs` (single YAML file) | `question`, `answer`, `order` | Answers are written from facts already sourced elsewhere on the page. |
| `away-buses` (glob, one per route) | `routeNumber`, `operator`, `boardAt` and `alightAt` stops (name, indicator, NaPTAN ATCO code, as the GP directory records stops), `journeyMins`, `walkFromStopMins` (generated), `frequency` and `lastDepartures` by `dayType` and direction, `timetableValidFrom`, `timetableValidTo`, source | Same expiry rule as trains: when the timetable period ends, times hide and only the operator link shows. |
| `away-taxis` (single YAML file) | `rankAtStation` (fact), `pickupPointAtGround` (fact), `rideHailing` (list of apps, e.g. Uber, each a fact with source), `firms` (name, phone, url, each sourced from the firm's own site or the council's licensing record), `driveMins` (generated by the router, labelled as a typical free-flow estimate) | No fares stated. Firms listed only if verified as currently trading. |

**Opening hours** use a per-day list of `{ open, close }` in 24-hour time, with an optional `closesAfterMidnight`. `src/utils/hoursSummary.ts` already formats hours as text; the new `openingHours.ts` adds the Europe/London "open now" and "open after an evening match" calculation. A venue whose hours are unconfirmed shows no label.

---

## 8. Other components

- **Chapter navigation (7.1):** anchor links, so it works without JavaScript. Progress bar and current-chapter highlight via a shared IntersectionObserver. The phone bottom bar (Route, Pubs, Food, Home) is fixed at the bottom with safe-area padding, clear of the header's `touchend` menu handling noted in CLAUDE.md.
- **Last-train finder (7.5):** the plain table is the HTML. It covers Walton-on-Thames station only, because "leave the ground by" depends on the walking routes. The script adds day selection, a choice of how you're getting back to the station (bus, taxi, or either walking route), and "leave the ground by" (for the bus, the latest bus that connects), computed from the generated walking time. The checked date sits beside the heading, not in a footnote.
- **Matchday timeline (7.6):** 3pm and 7.45pm plans in HTML; a time input recalculates. Offsets come from walking times and sourced turnstile times, never from assumptions.
- **Print card (7.8):** `@media print` stylesheet and a "Save matchday card" button calling `window.print()`. Tested to fit one A4 page.
- **Service worker (D7):** if approved, a file at `/walton-hersham-fc-away-fans-guide/sw.js`, registered only by this page. That scope means it controls no other page. Network-first for the HTML so corrections always win, cache fallback when offline, `Cache-Control: no-cache` on the worker via `public/_headers`, and a kill-switch version ready to ship. Note that the Cloudflare edge cache can hold HTML for up to 7 days regardless (CLAUDE.md), which matters more for stale train times than the service worker does.
- **Report a change (7.9):** `/contact/?subject=...`. Adding a "Report a change to the away fans' guide" option to the subject list is a one-line change to the contact page, and I'll ask before making it.
- **Copy postcode (7.10):** Clipboard API with an `aria-live` confirmation; the postcode stays selectable text without JavaScript.

---

## 9. Visual design

- Site palette and type only. Gold accent throughout; any nod to the club's colours waits until they're sourced from the club, and never uses the crest.
- Body measure capped at about 68 characters; Fraunces headings at larger sizes than the rest of the site, to give the feature its own weight while it stays recognisably ours.
- Rhythm: full-bleed `ChapterBreak` photographs between calm cream reading sections.
- Need to know panels: white cards with inline SVG icons (no icon font), label above value, identical across chapters.
- Motion: slow CSS zoom on the opening image, section fades, the route line drawing. All disabled under `prefers-reduced-motion`.
- Text over photographs uses a gradient scrim sized for AA contrast. The memory note about cards crushing the lower half of photos applies here too, and the shot list will say where to leave space.
- Header interplay: the site header is fixed below 1200 px (`body` has `padding-top: var(--nav-height)`), so the opening is sized in `svh` minus the header, and anchor targets get `scroll-margin-top`.

---

## 10. Images

- Placeholders first: neutral blocks at the correct aspect ratio, labelled with the slot name, e.g. `af-opening-floodlights-landscape`.
- Pipeline: `astro:assets` from `src/assets/away-guide/`, AVIF and WebP with a JPEG fallback, responsive `srcset`, explicit dimensions, lazy loading below the fold, `fetchpriority="high"` on the opening image only.
- Art direction: Astro's `<Picture>` doesn't switch crops by media query, so `PhotoSlot` builds `<picture>` with `<source media>` from two `getImage()` results (portrait and landscape).
- EXIF: sharp drops metadata by default. I'll confirm on the first real batch by inspecting output for GPS tags.
- iPhone HEIC files need decoding through Windows WIC before sharp can read them (existing memory note).
- The opening image is preloaded through `BaseLayout`'s `preloadImage` prop, with the same srcset as the `<img>`, following `hero-images.ts`.
- OG image: 1200 by 630, cut from the opening photograph once supplied; the site default until then.

---

## 11. SEO and structured data

- Title "Walton & Hersham FC Away Fans' Guide | Xcel Sports Hub" (54 characters, emitted as written). H1 as briefed. Meta description drafted in Phase 5, under 155 characters.
- JSON-LD in one `@graph` with stable `@id`s: `Article` (author Darren Bayley, `datePublished`, `dateModified`), `StadiumOrArena` (address and geo, both sourced; see research note R2), `SportsTeam` linking the official site, `BreadcrumbList`, `FAQPage`, and `SportsEvent` for upcoming home fixtures from the `fixtures` collection.
- Sitemap: included automatically. `lastmod` comes from `src/data/lastmod.json`, which must be committed when it changes (CLAUDE.md).
- No satellite pages for visiting clubs (D6). The next home fixture from the `fixtures` feed appears on the main guide instead.

---

## 12. Performance budget, by estimate

| Item | Estimate (compressed) |
|---|---|
| HTML (long page, all chapters) | 35 to 50 KB |
| Site CSS plus guide CSS | 20 to 25 KB |
| Fonts (five existing Fontsource files) | about 100 KB, already cached from other pages |
| Opening image, mobile AVIF | under 150 KB target |
| Guide scripts before interaction | about 12 KB |
| Static map SVG (lazy) | 60 to 120 KB, depending on detail |
| MapLibre plus tiles (on tap only) | about 220 KB plus tiles, reported separately |

These are estimates; Phase 2 reports measured figures and Lighthouse scores at 390 px and 1440 px.

---

## 13. Research notes already raised by reading the repo

These go into `docs/away-fans-guide-sources.md` in Phase 3. None of them is a fact to publish yet.

- **R1.** The existing FC page's source comment says its matchday detail came partly from a Follow Away ground guide. Under the protocol that is a lead, not a source, so its claims (stand capacity, two bars, accessible toilet) must be re-confirmed from the club before the guide reuses them.
- **R2.** Postcodes differ: the brief gives the ground as KT12 2JP, while `businesses/elmbridge-xcel.md` gives the leisure complex as KT12 2JG. They may both be right for different buildings, but the sat-nav postcode is the single most important fact on the page, so it gets a primary source and a note on which entrance it reaches.
- **R3.** The Xcel business record's coordinates have no recorded source. The ground's coordinates will come from a sourced point, as the GP directory does it.
- **R4.** Walking distances from Walton-on-Thames station are unknown until routed. If the walk is long, the Arrive chapter should give buses equal billing with walking rather than presenting the walk as the default.
- **R5.** Hotel price bands need a sourcing rule (section 7).
- **R7. Walking time from the station.** The Dagenham & Redbridge away day guide (daggers.co.uk, published 12 August 2026) gives Walton-on-Thames station as "c. 10 minute drive or 50 minute walk". That is a secondary source, so it is a lead only, but if the routed figure is close to it, the walk is long for a matchday. Darren confirms the walk is long, so bus and taxi are now equal options (D11). The routed walking times are still to be measured in Phase 2 and confirmed in Phase 3.
- **R8. The club publishes per-match supporter information.** For example "Basingstoke Town (H): Supporter Information" (waltonhershamfc.com, 25 March 2025) covers segregation, the away end and its entry, online ticket cut-off, cash and card at turnstiles, an under-13 accompaniment rule, parking, away-end toilets and refreshments, cover, prohibited items and away colours in home areas. This is the primary source for the ground chapter, but it is 18 months old and from an earlier season, before promotion to National League South, so every point needs re-confirming for the 2026-27 season before use.
- **R9. OpenStreetMap leads from the Phase 2 map build.** OSM lists bus route 564 (Falcon Coaches) serving a stop named Xcel Leisure Centre (NaPTAN 40004405264A), and tags most Thames Path ways between Walton Bridge and the Sports Hub `lit=no`. Both are leads for the operator and a site visit, not facts to publish.
- **R6.** Towpath route: lighting, surface, gates or steps, flooding history and whether it is signed as part of the Thames Path all need a site visit or a primary source (Thames Path National Trail, Environment Agency). Photographs of each junction go on the shot list for both routes.

---

## 14. Search terms and completeness (D4)

Semrush was unavailable (the account has run out of API units), so no search volumes are given here. The terms below come from how the club, other clubs and the established ground-guide sites phrase things. Volumes can be added if units are topped up.

**Search terms to build the headings around.** Headings are phrased as questions or plain labels that match these, not as clever chapter titles.

| Intent | Terms |
|---|---|
| The guide itself | Walton & Hersham away fans guide; Walton and Hersham away end; away day guide Walton & Hersham; Walton & Hersham ground guide |
| The ground | Elmbridge Xcel Sports Hub; Xcel Sports Hub Walton; Walton & Hersham stadium; Walton & Hersham ground capacity; Waterside Drive Walton-on-Thames |
| Postcode and sat-nav | Xcel Sports Hub postcode; Walton & Hersham FC postcode; KT12 2JP (once confirmed, R2) |
| Travel | how to get to Walton & Hersham FC; nearest station to Walton & Hersham; Walton-on-Thames station to Xcel; bus to Xcel Sports Hub |
| Parking | Xcel Sports Hub parking; Walton & Hersham FC parking; parking near Elmbridge Xcel |
| Pubs and food | pubs near Walton & Hersham FC; pubs near Xcel Sports Hub; The Weir Walton-on-Thames; food near Elmbridge Xcel |
| Tickets and rules | Walton & Hersham tickets; Walton & Hersham ticket prices; pay on the gate; what can I bring |
| Getting home | last train Walton-on-Thames to Waterloo; trains from Walton-on-Thames after the match |

Variants to cover naturally in copy and alt text, since people type them: "&" and "and"; "Xcel" and the common misspelling "Excel" (in one natural sentence, never stuffed); "Elmbridge Xcel" and "Xcel Sports Hub"; the nickname "the Swans".

**What other away guides cover, and what that adds to ours.** Compared against official club guides (Exeter City, Oxford United, Luton Town, Manchester City, Aston Villa, Chelsea, West Ham) and ground-guide sites (Football Ground Guide, To The 92, Away Grounds), plus the club's own per-match supporter information and the Dagenham & Redbridge away day guide to this ground. Structure only; nothing is copied.

Topics every good guide has that the brief already covers: address and postcode, car, train, bus, parking, tickets and prices, pubs, food, accessibility, hotels, things to do nearby, a ground plan.

Topics to add or make more prominent:

- **The away end**, as its own heading: where it is, which turnstiles, standing or seated, covered or not, away-end toilets and refreshments, whether alcohol is served there. This is the section away fans look for first, and the club's supporter information (R8) shows it varies by match.
- **Segregated and unsegregated matches**: how the fan will know which applies, linking to the club's per-match notice rather than stating a blanket rule.
- **Ticket cut-offs and payment**: online sales closing time on matchday, cash and card at the turnstiles.
- **Entry conditions**: the under-13 accompaniment rule, prohibited items, away colours in home areas. Stated plainly and without judgement, per the brief's tone rules.
- **Programme** (price and where to buy), with the groundhopper chapter.
- **Supporters' coaches**: where they drop off and park. The Dagenham guide shows visiting supporters' clubs run coaches here.
- **Club contacts for visiting fans**: the club's ticketing email and the page where per-match supporter information appears, so readers check the latest notice.
- **Capacity and record attendance**, only from a primary source.
- **Buses and taxis** as full options from the station, not a short block (D11).

Left out deliberately: fan reviews and ratings (out of scope), "local rivals", and anything about past crowd incidents (brief section 3).

---

## 15. Phase 2 scope, restated

Opening, quick answers card, chapter navigation, the station-to-ground chapter with the four-option comparison card (bus and taxi details as `placeholder: true`) and the scroll-driven SVG route map (both the road and towpath routes from Walton-on-Thames station, `placeholder: true` coordinates), "Getting home" with the last-train finder (`placeholder: true` times), and placeholder images throughout. Built on `feature/away-fans-guide` from `main`, pushed to its Cloudflare preview, `noIndex` while any placeholder exists. Reported with Lighthouse mobile and desktop scores, measured weights, and screenshots at 390 px and 1440 px.

I won't push, open a pull request or merge without asking first.
