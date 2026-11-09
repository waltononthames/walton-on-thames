# Directory plan: from a list of businesses to a trusted local guide

**Status:** adopted 9 November 2026. Execution document for Claude Code sessions.
**Owner:** Darren. **Scope:** the `businesses` collection, `/directory/` and `/directory/<slug>/`, the topic pages built from the same records (`/food-and-drink/`, `/shopping/`, `/places-to-stay/`, `/living/*`), and how the directory connects to `organisations` (`/clubs/`) and the editorial guides.
**Governing documents (read first, every session):** `CLAUDE.md` (the Content Verification Protocol governs directory listings; they are current/practical content under `docs/historical-content-strategy.md`), `docs/walton-seo-blueprint.md` section 4.9, `docs/site-audit.md` before creating any page, `docs/gp-directory.md` (the model the rest of the directory should follow).

This plan is a checklist. Each session picks the next unchecked item in the lowest incomplete phase, does it completely, verifies it, ticks it here, and logs it in `docs/build-log.md`. Items marked **[Darren]** need a decision or an action only the owner can take; prepare everything up to that point and leave a handover note in the build log.

It combines two reviews made on 9 November 2026: one in a Claude Code session working from the repository and a production build, and an external editorial review (OpenAI) of the live site. Where they disagreed, the reasoning for the choice made is in **Principles** below.

---

## 0. Where we stand (audit, 9 November 2026)

**What is good, and should be extended rather than replaced:**

- The GP practice profiles (`docs/gp-directory.md`) are best in class: field-level sources with a basis and a checked date, registration and catchment links, NHS facilities, bus stops, entrances, nearby pharmacies, static SVG maps with no third-party requests.
- Every listing carries a `source` line. Free listings and no paid placement are stated plainly.
- `hub_page` already solves listing/guide duplication (The Heart, 29 September 2026), and topic pages read the same records rather than copying them.

**What the audit found** (counts from `src/content/businesses/`, 181 records, 180 built pages):

| Finding | Count / detail |
|---|---|
| Rest on the "Restaurant directory spreadsheet (owner-supplied)" but display "Last verified" | 43 (42 on the spreadsheet alone; The Anglers adds unspecified "address records") |
| Websites flagged dead or redirected in September and still linked | 3 (The George Inn, The Souvlaki, The Mogul; build log, away-guide phase notes) |
| Last checked in June or July 2026 | 103 (plus 1 in January) |
| Use the field-level `checks` record | 18 |
| Have any photograph | 10 (171 show the 🏪 placeholder) |
| Have coordinates | 109; restaurants 0 of 23, cafés 0 of 12, takeaways 0 of 12, pubs 4 of 8 |
| Body under 60 words | 120 (median 35); body repeats `description`, and the address appears in body and sidebar |
| Built pages with under 120 words in `<main>` (sidebar included) | 104 of 180 |
| Page titles over 60 characters | 11; pattern reads "Uzzal: Restaurants in Hersham" |
| Outside Walton, Hersham and Whiteley Village | 18 (Weybridge 7, Esher 6, Shepperton 4, Sunbury 1) |
| Venues covered by guides with no directory record | Cacao Route, Caffè Nero, Starbucks, Greggs, Riverhouse Barn café (all in `/food-and-drink/coffee-shops-working-walton-on-thames/`); Old Manor Inn (away guide) |

**Coverage by category:** shopping 47 (22 inside The Heart), healthcare 28, health and fitness 25, restaurants 23, accommodation 17 (4 in Walton or Hersham), takeaways 12 (9 pizza), cafés 12, pubs and bars 8, services 8 (6 post offices or parcel points), activities 1. **No records at all** for trades, hair and beauty, estate and letting agents, solicitors and accountants, vets and pet services, childcare, or motoring, although the blueprint names "plumber walton on thames" and "hairdresser walton" as target queries.

**Discovery:** one page of 181 cards, two dropdowns (category, area), client-side only, filter state not in the URL, subcategories unused, no keyword box. Pagefind already indexes every listing site-wide. `/directory/<category>/` hubs are logged as a NEW gap in `docs/site-audit.md`, but most categories already have a topic page elsewhere.

**Structured data:** the whole address goes into `streetAddress` with no `postalCode`; healthcare falls back to `LocalBusiness`; all health and fitness records are `SportsActivityLocation`, including online coaches with no premises; no `ItemList` on the index.

**Network limits for verification sessions:** the Default cloud environment allows only a short list of hosts. On 9 November 2026 the FSA register (`api.ratings.food.gov.uk`, `ratings.food.gov.uk`), `developers.google.com` and almost every business website were refused, so a link check and the FSA lookups could not run. Phase 1 needs those hosts, or a session with wider network access.

---

## Principles

1. **Do not build another Google Maps.** Win on what it cannot do: dated, sourced facts; local practical detail (which entrance, where to park, step-free or not, nearest stop, "inside The Heart"); connections to events, history and guides on this site.
2. **Every field carries its source.** Generalise the GP pattern: each important fact has a basis and a checked date, and the page shows what was checked, not one bare date. Bases distinguish **business website**, **official register or data**, **business confirmed** and **editor observation**.
3. **No preferential ranking, including by accident.** Enhanced Listings have more text, so ranking by text relevance would lift them. Within any set of matches, sort alphabetically (or by distance where a location is given), and publish that rule on the index page.
4. **No reciprocal-link conditions.** The badge is optional (done, 0.1). Never make a link, badge or review a condition of any listing feature.
5. **No public star ratings or reviews.** Rule 2 forbids us writing reviews or local opinion, and hosting other people's brings fake-review risk, disputes and moderation work.
6. **No "open now" filter.** It needs reliable hours, including bank holidays, for every record, and the protocol prefers linking to a business's own hours over stating them. Show hours only where sourced and dated.
7. **Maps stay static.** Use the GP approach (SVG from OpenStreetMap at build time, no tiles, no consent question). Do not add a live tile map with clustered markers.
8. **Fix before growing.** Re-check and enrich existing records before adding categories; a larger directory of thin records is worse than a smaller good one.
9. **No new page without a site-audit check.** Link existing topic pages (`/food-and-drink/*`, `/shopping/*`, `/living/*`, `/places-to-stay/`) rather than duplicating them under `/directory/`. "Independent coffee shops" overlaps the working-cafés guide; "Pilates classes" overlaps `content/news/gyms-yoga-fitness-walton-on-thames.md`.

---

## Decisions needed [Darren]

- [ ] **D1. Home-based traders.** Many plumbers, electricians and mobile hairdressers have no public premises. Options: list by area served with no street address, verified against an official register (Gas Safe Register, Companies House) plus the trader's own site; or exclude them. Blocks Phase 4 trades work.
- [ ] **D2. Geographic scope.** Keep the 18 nearby records only where they serve local residents (pharmacies, hotels, specialist health), labelled "Nearby"; or widen the scope deliberately. Affects 1.1 (`area` field) and 2.2.
- [ ] **D3. Clubs and businesses.** One directory search across `businesses` and `organisations`, or two directories that link to each other. Affects 2.2 and 2.3.
- [ ] **D4. Analytics.** The Cloudflare Web Analytics tag is commented out in `BaseLayout.astro`. Check whether analytics are enabled in the Cloudflare Pages dashboard (which can add the beacon without the tag); either way, click and search tracking for Phase 6 needs more than page views. `/about/` says the site uses Cloudflare Web Analytics, so make sure that stays true.
- [ ] **D5. Network access for verification sessions.** FSA register: **done 9 November 2026**, `api.ratings.food.gov.uk` and `ratings.food.gov.uk` added to the Default environment and tested (the API answers with `x-api-version: 2`). Still open: business websites, either listed as each is checked or by running Phase 1 in an environment with wider access.

---

## Phase 0: quick fixes (9 November 2026)

- [x] **0.1 Enhanced Listing badge made optional.** `/directory/enhanced-listing/` required businesses to add the badge, linked to their listing, to qualify, while our listing pages link back to their websites with a plain followed link (no `nofollow` or `sponsored`): a required reciprocal link. Qualification now depends only on the submitted material passing editorial checks; the page says descriptions may be edited and unsourced awards or rankings left out; the badge is described as optional with no effect on placement. A code comment records why, so the condition is not reintroduced.
- [x] **0.2 The Surrey Coffee Company.** Removed the unsourced "Multi award winning" description (Rule 2, and the open site-wide superlatives sweep from the 2 November audit). Address tidied from "60 Highstreet, Walton-on-Thames, United Kingdom" to "60 High Street, Walton-on-Thames". No new facts were added and `verified_date` was not moved; the record still rests on the spreadsheet and is in the 1.4 queue.

---

## Phase 1: data model and re-verification, in one pass

Each existing record is opened once: re-checked, moved onto the new fields, and enriched. Do not do the schema migration and the re-checking as separate sweeps.

- [ ] **1.1 Schema.** In `src/content.config.ts`, all additive and optional so unconverted records stay valid:
  - `status`: `active` | `temporarily-closed` | `permanently-closed` | `pending-review`, default `active`. Listing pages for closed records stay up with a clear notice, or redirect, per a rule written into this item before use; never silently delete a URL.
  - Structured address: keep `address` as the display string (character for character from the official source), add `postcode`. Feeds `PostalAddress.postalCode`.
  - `area`: `core` | `nearby` (per D2), so "Nearby" labelling does not depend on a list of town names in each page.
  - `tags`: a controlled vocabulary in one file (for example `src/data/directory-tags.ts`) with labels and synonyms, replacing free-form `subcategories` over time. Synonyms feed search (2.2).
  - Generalise `factBasis`: add `business-website`, `business-confirmed`, `official-register` alongside the GP values, so `checks` can be used on every listing.
  - Optional practical fields, each with a `source`: step-free access, accessible toilet, parking, nearest station and bus stop (reuse the GP `bus_stops` shape), "inside" relationship (already derived from `hub_page`).
- [ ] **1.2 `npm run content:stale-listings`.** Advisory script, modelled on `content:stale-events`: lists records whose newest check is older than six months, records resting only on the spreadsheet, records with no website and no official source, records with no coordinates, and (when run with network) websites that fail or redirect off-domain. Run it at the start of every directory session.
- [ ] **1.3 Show what was checked.** Replace "Last verified: 2026-07-08" with a readable date and basis built from `checks` (for example "Address and phone checked against the business's website, 15 September 2026"). Records with no `checks` show the `verified_date` with the `source` basis in plain words, never a bare ISO date. Update `/about/`'s "Each listing shows a last verified date" sentence to match.
- [ ] **1.4 Re-verify existing records,** in this order, each against Tier 1 sources this session (FSA register for food businesses; the business's own site; NHS for health; Companies House where useful), recording per-field `checks`, coordinates (OpenStreetMap building or FSA geocode, with basis), `status`, `postcode`, `tags`, and a body that adds something rather than repeating `description`:
  1. The George Inn, The Souvlaki, The Mogul (dead or redirected websites).
  2. The 43 spreadsheet-sourced records: cafés, takeaways, restaurants, pubs. The Swan and The Anglers are already noted in the build log as needing their own sites checked. The Default cloud environment allows `swanwalton.com` and `georgeinnwalton.co.uk`, which differ from the domains on The Swan's and The George Inn's listings: an earlier session may have found newer sites; confirm before changing either. The Surrey Coffee Company's Facebook link needs confirming as the business's own page.
  3. The 103 June and July records, then the January one.
  4. Everything else, oldest check first.
  A record that cannot be confirmed is flagged to Darren, not kept on trust and not quietly deleted.

---

## Phase 2: listing template and search

- [ ] **2.1 Listing page.** In `src/pages/directory/[slug].astro`:
  - Stop rendering `description` twice and the address twice; the body must be its own content.
  - Category-specific sections drawn from sourced fields only (café: seating, Wi-Fi only where the business states it; pub: food, garden; bike shop: repairs and servicing; mobile service: area covered).
  - "More nearby" and "More like this", from coordinates and tags, plus links to guides that mention the record (2.3).
  - Breadcrumb gains the category level.
  - Title from the most specific tag, singular: "Uzzal, Indian restaurant in Hersham". Check built titles against the 60-character rule in `CLAUDE.md`.
  - Structured data: `PostalAddress` with `postalCode`; `Dentist`, `Pharmacy`, `Physician` (or `MedicalClinic`) for healthcare; no `SportsActivityLocation` or address for a record with no premises.
  - Replace the OpenStreetMap iframe with a static map, per Principle 7.
  - Direct actions where sourced: Website, Call (`tel:` normalised to +44), Directions, Menu, Book.
- [ ] **2.2 Directory index.**
  - A keyword box built on Pagefind (already site-wide): add `data-pagefind-filter` for category, tag and area to listing pages, and mount a scoped search on `/directory/`. Synonyms from the tag vocabulary.
  - Filter state in the URL (`?category=&area=&tag=`), with the canonical staying `/directory/` so filtered views do not become indexable duplicates.
  - Tag chips under the category filter; "Nearby" labelled; result count kept.
  - Alphabetical within matches, rule stated on the page (Principle 3).
  - `ItemList` structured data.
- [ ] **2.3 Connect the directory with the guides.**
  - A build-time check (advisory, like the meta-description check) that lists businesses named in guide pages that have no directory record, and directory links in guides that point at records that do not exist.
  - Each listing shows the guides that link to it.
  - Cross-link with `/clubs/` per D3.

---

## Phase 3: fill the known gaps

- [ ] **3.1 The five café-guide venues:** Cacao Route, Caffè Nero, Starbucks, Greggs, Riverhouse Barn café. Each verified this session against its own site or the FSA register; then link each from the working-cafés guide, as Esquires and The Walton Village already are.
- [ ] **3.2 The Old Manor Inn** (named on the away-guide route; confirmed by Darren and OpenStreetMap, still needs an official source).
- [ ] **3.3 Whatever 2.3's check reports** across the rest of the site.

---

## Phase 4: new categories, one at a time

- [ ] **4.1 Coverage ledger.** Create `docs/directory-coverage.md`: one row per category recording the official register or source used to find businesses, its reuse terms, the date checked, how many were found, how many listed, and why any were left out. A category is "covered" only when it has a row.
- [ ] **4.2 Order by need and demand.** Pull search volumes for "<category> walton on thames" (Semrush) and set the order. Provisional order: hair and beauty; estate and letting agents; solicitors and accountants; vets and pet services; childcare and nurseries; motoring; trades (after D1); more pubs and independent cafés (FSA register sweep of KT12).
- [ ] **4.3 Per category:** sweep the official source, verify each record, add tags, then decide in `docs/site-audit.md` whether the category earns a hub page (one with original editorial context that meets a real need) or is served by the index filter alone.

---

## Phase 5: contributions from businesses

- [ ] **5.1 Structured submission form.** Replace "send us your details" on `/advertise-your-business/` with a form whose fields mirror the schema (Formspree, like the contact form, unless a Cloudflare Function is needed), with a photograph permission statement and a duplicate check against existing slugs and names. Submissions become drafts for review; nothing publishes automatically.
- [ ] **5.2 Confirm this listing.** An owner confirmation recorded as a `business-confirmed` check on the fields they confirmed. Owners can correct facts; they do not control editorial text.
- [ ] **5.3 Yearly reconfirmation.** Driven by 1.2's report; a contact who does not answer leaves the record as it was, with its existing check dates.

---

## Phase 6: measure usefulness

- [ ] **6.1** After D4, track website, call and directions clicks from listing pages, and searches with no results.
- [ ] **6.2 Task tests [Darren].** Ask a few residents to find, without Google, bike repairs, a beginner Pilates class, and a café to work in near Hersham Green; note where they get stuck. Repeat after Phase 2.
- [ ] **6.3 Indicators,** reported in the build log each quarter: share of records meeting the 1.4 standard, share with a check older than six months, coverage ledger rows, business-submitted corrections, organic traffic to listings and topic pages.
