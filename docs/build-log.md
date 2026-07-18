# Build log

Log of pages built against `walton-seo-blueprint.md` / `walton-history-hersham-extension.md`, in build order. One entry per page. Append only.

## 2026-07-18 — Site-wide map pin coordinate audit

Owner reported a wrong map pin on `/things-to-do/ashley-park/` and flagged it as a possible site-wide pattern rather than a one-off (this is the same class of bug fixed for The Heart Shopping Centre a few days earlier, whose root cause was never traced further at the time). Treated it as systemic and audited all 60 businesses/places with `lat`/`lng` — confirmed correct.

**Method:** two independent checks per flagged entry, not one — free-text address geocoding, then cross-checked against postcode-centroid geocoding, since the first method turned out to have a real failure mode of its own (confirmed: it mismatched "5 The Green, Hersham" against a similarly-named "The Green" in Whiteley Village for two businesses, which would have been *introduced* as a new error if applied blindly). Only entries where both methods agreed and diverged >300m from the stored value were treated as confirmed.

**Result:** 27 of 60 entries were genuinely wrong, several by 1-2.8km — including two used to build fresh new-page-navigation this session (Hersham Dental Practice and Philip J Adams Chemist were *not* wrong, despite an initial flag — see above). Fixed:
- 22 businesses via postcode-centroid re-geocoding (full list in the commit).
- Walton Library — the postcode itself was wrong in the source data (KT12 1DF doesn't exist; confirmed via the library's own listing that it's inside The Heart Shopping Centre, postcode KT12 1GH), not just the coordinates.
- 4 places with no postal address to geocode against (Ashley Park, Cowey Sale, Walton Bridge, Hersham Village Green) — verified individually via named-POI matches and, where available, the nearest real postcode for that specific green/park (not a street address, since these are open spaces).

Everything built this session with the postcode-centroid method from the start (the dentist/pharmacy/GP/post office listings) came back clean, confirming that approach is reliable — the bug was entirely in older data.

New reusable scripts: `scripts/audit-coordinates.mjs` (full free-text-address sweep with an optional `--fix` flag) and the two verification/apply scripts used for this pass. Kept in the repo for the next time this needs re-running, e.g. after a bulk content import.

## 2026-07-18 — Structured data extension, homepage rewrite, and SEO tooling (large multi-part task)

Owner supplied a large brief (schema extension, Lighthouse audit, homepage rewrite, plus two new-page requests). The two new-page requests (an SEO landing page and a long-form history article) were held back — both depended on inputs the owner said they'd supply (slug/query/PAA questions; source notes) that weren't in the brief itself. Everything else below was completed in this pass.

**Sitewide Organization schema + social profiles.** Owner supplied real, verified Instagram/X/Facebook URLs (Bluesky excluded — not created yet). Added `sameAs` to the Organization schema in `BaseLayout.astro`, upgraded `logo` to a proper `ImageObject` with dimensions, and cross-referenced `WebSite.publisher` → `Organization`. Added matching social icons to the footer (previously an empty placeholder) so schema and visible page content corroborate each other, per Google's guidelines. The owner explicitly excluded the Facebook *group* from `sameAs` (a community space, not an official profile) and asked for it to be linked from the Community page instead — no group URL was supplied, so that specific link is still outstanding.

**BreadcrumbList** added to the ~19 pages that had a visual breadcrumb but no matching JSON-LD (about, privacy-policy, terms, accessibility-statement, advertise-your-business, contact, getting-here, all of `/living/*`, all of `/shopping/*`, plus the dynamic `/whats-on/[slug]/` and `/community/news/[slug]/` detail pages, which previously only had breadcrumbs on their index pages).

**Event schema** already covered both hand-authored events and FC fixtures (confirmed via audit, not previously known). Added `performer` (both teams) and a correct `SportsOrganization` organizer for fixtures, replacing the generic site-organizer that was there before.

**Article schema**: history/hersham articles gained `publisher.logo` and `mainEntityOfPage` (author left untouched — see flagged item below). News articles gained `dateModified` (sourced from the article's own git commit history via the same resolver built for sitemap lastmod, since the schema has no dedicated field for it), `mainEntityOfPage`, `publisher.logo`, and a conditional author type (Organization vs Person) based on the actual byline rather than always Organization.

**LocalBusiness schema**: fixed a real semantic bug — `sameAs` was being populated with the business's own website, which is what `url` is for; `sameAs` is for alternate profile links (social, Wikipedia). Swapped the field. Added `openingHoursSpecification` for businesses with structured `hours` data (parses the site's existing "9am–5:30pm" text format into schema.org's 24-hour form, skipping anything that doesn't parse cleanly rather than guessing).

**New scripts**: `npm run seo:validate` (parses built HTML, fails non-zero if required schema fields are missing per page type — currently passes clean on all 263 pages) and `npm run seo:links` (maps the internal link graph: thin-inbound-link pages, anchor-text distribution for priority pages, broken internal links — currently zero broken links). Found and fixed a real gap this surfaced: the five `/living/*` health and services pages (GP surgeries, pharmacies, dentists, post offices, and by extension council-and-services) had only 1 inbound link each. Cross-linked them to each other and added them to the existing NHS & Health / Post & Deliveries sections of `/living/council-and-services/` — also caught and fixed a stale fact while editing that page: it still said "NHS Surrey Heartlands," which was already known to have been superseded by the NHS Surrey and Sussex ICB from 1 April 2026.

**Two more stale-content fixes found along the way** (not part of the original brief, but surfaced by working through these pages): `shopping/the-heart.astro` was a completely separate static page from the `the-heart-shopping-centre` business listing, and still had the fabricated "Vue Cinema" / "over 60 stores" claim and the wrong website domain that had already been corrected on the business listing itself days earlier — this page was never updated at the time. Rewritten to match the verified content.

**Homepage intro rewrite**: replaced the short hero paragraph with a 157-word encyclopedia-style opening covering location (Surrey, Borough of Elmbridge), river setting (south bank of the Thames, ~15 miles from central London — verified via Wikipedia after an initial draft used an unverified "17 miles"), population (~28,800, 2021 Census via ONS, cross-checked against a second independent source), rail connection (Waterloo, ~32 min, already-verified figure), and what the town is known for. Every fact traced to a source checked this session.

**Lighthouse**: no Lighthouse-running tool is available in this environment, so no literal scores were produced — flagged this honestly rather than inventing numbers. Instead, directly inspected the specific things named: font loading was already solid (self-hosted `@fontsource`, `font-display: swap`, unicode-range subsetting — confirmed `@import` gets flattened by Vite at build time, so the CSS-import-chain concern doesn't apply in production). Real find: `logo.png` (272KB, 400×400) was being served at 44×44/40×40 display size in the header and footer — generated a properly-sized `logo-small.webp` at 132×132 (8.5KB, a 97% reduction) and repointed both. Confirmed the site's only real content photos (the homepage hero, `hersham.jpg`, `whiteley-village.jpg`) — the latter two don't actually exist on disk (a known, previously-flagged gap requiring the owner's own photography; not fabricated). Responsive `srcset` isn't implemented anywhere (all images are plain `<img>` tags, not Astro's `<Image>` component) — flagged as a real gap but not attempted here, since it's a sitewide architectural change touching every card component, not a quick fix, and the current image count/sizes don't make it urgent.

**Flagged, not resolved:**
1. History/hersham articles' `author` field defaults to a named person ("Darren Bayley") in both the visible byline and schema, not a placeholder as initially assumed when asking the owner about it — the owner's answer ("keep it as Organization") may have been given without that context. Left as-is pending clarification, since changing only the schema would break the schema/visible-content match Google requires.
2. Facebook Group URL for the Community page — not supplied.
3. Responsive image srcset — architectural gap, not fixed.
4. Missing neighbourhood photography (`hersham.jpg`, `whiteley-village.jpg`) — requires the owner's own photos, per the site's no-stock-imagery policy.

## 2026-07-18 — SEO hygiene audit of the build output

Systematic audit against 6 criteria, checked programmatically against the actual built `dist/` output rather than spot-checked. New reusable diagnostic tool: `scripts/audit-seo.mjs` (`node scripts/audit-seo.mjs <canonicals|sitemap|orphans|trailing-slash|404>`).

1. **Canonicals** — all 263 pages have exactly one self-referencing canonical tag. Clean, no changes needed.
2. **Sitemap** — coverage exactly matches built pages (only deliberate exclusion: `/contact/thank-you/`). No pagination/tag-stub pages exist in this site's architecture at all (category filtering is client-side JS, not separate routes). Added `lastmod` dates, which the sitemap previously had none of — `scripts/sitemap-lastmod.mjs` maps each URL back to its most relevant source file (content-collection markdown for content-driven routes, the `.astro` route file otherwise) and uses that file's last git commit date. Fixtures pages use the loader's own git history rather than "now", since they have no markdown file and using build time would make lastmod change on every rebuild even when nothing about that specific fixture changed.
3. **robots.txt** — already correct (`Allow: /`, references the sitemap). No changes.
4. **Orphan check** — new BFS reachability check from the homepage across the full internal link graph found one real orphan: `/places-to-stay/` existed, was in the sitemap, but nothing on the site linked to it. Added it to the footer's "Explore" column, next to "Getting Here". (`/contact/thank-you/` is also unreachable by design — a post-submission confirmation page, already excluded from the sitemap — not a bug.)
5. **404 handling** — confirmed `dist/404.html` is correctly placed (Astro special-cases it to bypass the directory-format build), is `noIndex`, and live-tested returns a real HTTP 404, not a soft-200.
6. **Trailing slash** — confirmed every internal link site-wide consistently uses trailing slashes, and live-tested that Cloudflare Pages already 308-redirects bare paths to their trailing-slash canonical automatically (default platform behaviour for directory-format builds). No explicit redirect rules needed beyond the legacy-URL-specific ones already in `_redirects`.

## 2026-07-12 — SEO remediation pass (5-part task, 4 commits)
Structured task covering title tags, structured data, image hygiene, and entity-naming consistency. Full detail in commit messages `969d7fd`, `a623629`, `897662a`, `82b3308`; summary:

1. **Title tags**: homepage was ~93 chars and truncating; rewrote it and all 9 hub page titles to lead with keyword, drop em dashes for a pipe separator, and render under 60 chars. Caught a live bug doing this: `BaseLayout.astro` silently appends `" | Walton-on-Thames.org"` to any title lacking that literal phrase, which was pushing the Hersham hub's *rendered* title to 70 chars even though the source prop looked like 47 — fixed by working the phrase naturally into the title. Trimmed History's meta description (164→154, the only one over 160).
2. **Structured data**: FAQPage and WebSite/Organization schema already existed and were correct (no changes). Fixed a real bug in Event schema — `offers.price` was an empty string for every non-free event, which is invalid; now the `offers` block is omitted entirely when no real numeric price exists (true for every event in the current dataset), and only included for genuinely free events. Added missing Event/ItemList schema to the `/whats-on/` listing page (previously just a bare BreadcrumbList). Added category-based LocalBusiness subtypes (Restaurant, CafeOrCoffeeShop, BarOrPub, FastFoodRestaurant, LodgingBusiness, SportsActivityLocation, Store) instead of always emitting generic `LocalBusiness`.
3. **Entity naming**: root-caused the "Walton On Thames" bug to a `.replace(/-/g,' ').replace(/\b\w/g, toUpperCase)` pattern used for neighbourhood slugs across 4 call sites, which naively title-cases each word and destroys the hyphens. Added `src/utils/format.ts::formatPlaceName()` with a lookup override and replaced every call site with it (fixed at source, not per-page). Also found and fixed "Walton on Thames Bowling Club" missing its hyphens in event content — confirmed via the club's own website that the hyphenated form is their actual official name.
4. **Image hygiene**: renamed `hero.jpg` → `walton-bridge-river-thames-hero.jpg` (it's Walton Bridge) and gave it real alt text (previously empty, though deliberately so — kept the parent's `aria-hidden` since the H1 already conveys the same info to screen readers). Site-wide alt-text audit came back clean (verified via script, not just grep) except one deliberate `alt=""` on the footer logo. Converted all 13 real raster images sitewide to WebP via `sharp` (~20% additional size reduction). Left the many `<!-- IMAGE: foo.jpg -->` placeholder comments alone since those aren't real files yet.

**Flagged, not fixed (out of scope)**: the homepage's `WebSite` schema `SearchAction` target (`/directory/?q=`) isn't wired to actual search functionality on the directory page — building that would be a new feature, not a structured-data fix. `public/images/neighbourhoods/{hersham,whiteley-village}.jpg` and `og-default.jpg` are referenced but don't exist on disk — pre-existing photography gaps, not something to fabricate files for.

Verified: full build after every commit (zero errors), sitemap confirmed current (195 URLs, includes new pages), canonical tags spot-checked correct across 7 page types, zero remaining "Walton On Thames" instances anywhere in the built output.

## 2026-07-12 — Fixed /food-and-drink/ category tab 404s
Owner reported that filtering by category (e.g. Cafes) on `/food-and-drink/` led to a 404. The category tabs linked to `/food-and-drink/<category>/` but no route existed to handle those URLs — only `index.astro` existed in that directory. Added `src/pages/food-and-drink/[category].astro`, mirroring the index page's layout and filter logic (including the pub-with-rooms subcategory match for Pubs & Bars), with the active tab highlighted.

Hit an Astro-specific gotcha while building it: `getStaticPaths()` is extracted into its own isolated module chunk at build time and cannot reference other top-level frontmatter variables, even ones declared earlier in the same file — `categories is not defined` at build time despite being valid-looking JS. Fixed by declaring the categories array separately inside `getStaticPaths()` and again at top level for the render body, rather than sharing one declaration.

Had a general-purpose agent audit the rest of the site for the same pattern (a `.map()`-generated `href` with no matching route) — confirmed this was the only instance; every other card/link generator was checked against its matching `[slug].astro`/route and collection.

Verified: full build (197 pages), browser check of all 4 category pages (correct card counts, correct active-tab highlighting, "All" tab linking back to the index).

## 2026-07-12 — /history/mount-felix-memorial-banner/ (third Mount Felix-linked article)
Owner asked for a dedicated article on the circa-1919 memorial banner (already covered briefly within `mount-felix-tapestry.md`'s "not the same as..." section), linking to Te Papa's own collection page for images: https://collections.tepapa.govt.nz/object/972921

Fetched the Te Papa collection record directly (dimensions 980×890×58mm, materials, "Gift of the New Zealand Army Department, 1961", registration GH017123) and Te Papa's own 2011 research blog post, which turned out to have much richer detail than what was used for the tapestry article: the full list of the 18 soldiers and 1 nurse named on the banner, confirmation that it was installed at St Mary's Church in January 1920 and carried to the graveside every Anzac Day until a brass tablet replaced it in 1932 (both dates were only in the owner's earlier unverified draft text until this fetch confirmed them directly from Te Papa), and a specific soldier's story (Private James Porter) to open the "nineteen names" section with.

Built at `/history/mount-felix-memorial-banner/`. Cross-linked in all directions: added to the `related` arrays of `mount-felix.md`, `mount-felix-tapestry.md`, and `st-marys-church.md`; replaced the tapestry page's inline description of the banner with a link to this new dedicated page; added the January 1920 / 1932 dates to `st-marys-church.md`'s and `mount-felix.md`'s existing brief mentions, which previously only said the church "holds a memorial" without dates.

Verified: full build (188 pages), browser check of the new page's 19-name list, sources, and related reading, plus all three cross-linking pages' updated body links and sidebars.

## 2026-07-11 — /history/mount-felix-tapestry/ (owner-supplied SEO draft, outside the extension build order)
Owner supplied a heavily-structured ~3000-word SEO draft (FAQPage JSON-LD, image plan, Harvard-style references, contextual-internal-link table, a full `@graph` schema block) for a second Mount Felix-linked article, this time about the Mount Felix Tapestry (the 2015–2017 community embroidery project, not to be confused with the older circa-1919 memorial banner held by Te Papa). Rebuilt rather than published as-is, same pattern as the Queen Victoria draft earlier in this project:

**Fact-checked every load-bearing claim.** Most of the draft held up well against primary sources (Elmbridge Museum, Canterbury Museum's own tapestry article, Te Papa's collection record, Riverhouse Barn's own project page): the 44 panels, Andrew Crummy as designer, April 2015–April 2017 project dates, 600+ volunteers and 6,000+ hours, the Edith Popplewell/Lorna Rattray/Hugh Acland *Marquette*-sinking story, the Alexander Grant/Ruth Rosewell romance, Henry Percy Pickerill, and the Te Papa banner's details (circa 1919, 19 names, the "Fox" embroidered as "Cox" error, 1961 acquisition) all checked out.

**Two claims did not hold up and were corrected:**
- Draft stated the royal visit (King George V, Queen Mary, Prince of Wales) was "13 August 1915, only 13 days after opening" — suspiciously neat arithmetic against the hospital's 31 July 1915 opening date, and Elmbridge Museum's own dated postcard record places the visit in **1917**. Used 1917, dropped the "13 days after opening" framing.
- Draft hedged the hospital's closure as "in stages between June 1919 and March 1920" — Elmbridge Museum states plainly it closed in **March 1920**, "six months after its counterpart at Oatlands Park." Used the confident date, matching what `mount-felix.md` already said.

**Dropped everything that doesn't match how this site actually works**, rather than publishing it: the FAQPage JSON-LD block and manual `@graph` schema (the shared `HistoryArticle` layout already emits Article/BreadcrumbList JSON-LD from frontmatter — a second hand-written schema block would just conflict), the "Recommended image plan" section (replaced with the site's normal one-`<!-- IMAGE -->`-placeholder-per-H2 convention), the "Contextual internal links" table (implemented as real inline links instead, the draft itself said not to publish this table visibly), the Harvard-style References list (replaced with the standard frontmatter `sources` array, using only the 5 sources actually fetched and checked, dropping unverified specifics like a book ISBN and an unconfirmed Historic England list-entry number), the "Interesting facts" numbered list and "Key facts"/"Timeline" tables (folded the genuinely load-bearing facts into prose instead).

**URL deviates from the draft's request.** Draft asked for a flat `/mount-felix-tapestry/`; built at `/history/mount-felix-tapestry/` instead to stay inside the existing `history` collection architecture (auto sources block, Related Reading sidebar, JSON-LD, breadcrumb) rather than a one-off page outside it.

Condensed from ~3000 words to a normal entity-page length. Cross-linked both directions with `mount-felix.md` and `arthur-white.md` (added to both `related` arrays); also added the 1966 fire / 1967 demolition detail — verified but previously missing — to `mount-felix.md`'s closing section.

Verified: full build (183 pages), browser check of the new page's content/sources/related-reading, and both cross-linking pages' updated related-reading sidebars and body links.

## 2026-07-11 — Illustrated /history/arthur-white/ with 11 images (family-supplied)
Owner supplied images one at a time over several turns, mostly by saving files directly into `public/images/history/` rather than pasting them in chat (no in-chat image → file path exists, so files on disk were the only way to get pixels into the repo). Final set: Arthur's portrait, his parents, the Mount Felix ward (with his specific bed noted), a wartime postcard to Ethel (source of the portrait photo), Ethel's portrait, The Hollies (Borrowash), St Werburgh's Church (Spondon), his Certificate of Service, British War Medal, Victory Medal, and a family photo in NZ Police uniform. No wedding-day photo existed, so that placeholder was removed rather than left unfilled.

**Recurring pattern worth remembering for the rest of this series:**
- Owner's file-save dialog kept producing double extensions (e.g. `foo.jpg.jpg`, `foo.jpg.png`) when renaming — always `ls` the actual filename before assuming it matches what was asked for.
- Several images were later replaced with AI-upscaled versions (owner has an upscaling tool with invisible SynthID watermarking) at 2–10MB PNG. Every one was compressed with `sharp` (already a transitive dependency of Astro, no install needed) via a one-off `node -e` script: resize to 1000–1400px wide (wider for the panoramic ward shot) + `.jpeg({ quality: 82, mozjpeg: true })`. Typical result: 2–10MB → 90–260KB.
- Every AI-upscaled image's caption discloses it in-page ("This photograph has been upscaled using AI..."), per owner's explicit confirmation each time and consistent with this site's stance against presenting AI-modified images as unaltered originals without saying so (same principle as declining the fabricated "1837 chronicle" framing on the Queen Victoria draft earlier).
- Original, non-upscaled photos supplied at reasonable size (20–150KB) were used as-is with no processing.
- The batch of 11 candidate images arrived pre-saved to disk in one go with random UUID filenames; going through them one at a time by owner instruction (rather than guessing captions from content alone) avoided any risk of mislabelling family members.
- One image was never identified: `d5d36c02-aa31-41d3-ab15-3e9ad88611dd.jpg`, a large house exterior with a tower and cedar tree, left untracked in `public/images/history/`. Strong resemblance to the clock tower described on `/history/mount-felix/` (which has no real photo yet, only a placeholder) — asked the owner to confirm before using it there. **Check this before starting the next soldier article**, since it may still be awaiting an answer.

Verified: full build after every single image addition (11 rebuilds total), browser check of `.prose figure` captions/src after each to confirm order and content before every commit+push.

## 2026-07-11 — /history/arthur-white/ (first of a soldiers' stories series linked to Mount Felix)
Owner is contributing a series of individual soldier profiles connected to Mount Felix / No. 2 New Zealand General Hospital, submitted by descendants. First one: Arthur White, contributed by his grandson Kevin Murphy.

**Schema/layout change required first:** `HistoryArticle.astro` hardcoded `By Darren Bayley` as the byline and JSON-LD author on every page. That's wrong for contributed family-history content — this piece wasn't researched/written by Darren, it's a family's own record. Added an optional `contributor` field to `historySchema` in `content.config.ts`; `HistoryArticle.astro` now shows `Contributed by {contributor}` and uses that name in the Article JSON-LD `author` when present, falling back to the original Darren Bayley byline otherwise. Verified no regression: `/history/mount-felix/` still shows "By Darren Bayley" after this change.

**Treated as contributed primary-source content, not independently fact-checked in the usual sense** (personal/family details like birth, marriage and death dates are taken on the family's authority, same as any genealogy contribution). Did spot-check the independently verifiable historical background woven through the account, all of which checked out: RMS Remuera and RMS Rimutaka were real New Zealand Shipping Company vessels of the right era; Grey Towers, Hornchurch was indeed the NZEF depot from 1916, consistent with Arthur's 28 June 1916 enlistment date; No. 2 New Zealand General Hospital at Mount Felix matches the existing page.

**Privacy call:** the owner's draft included Kevin Murphy's personal email address. Asked the owner before publishing it; decision was to not publish the raw address but add a line noting contact details are available on request via the site's `/contact/` page.

Built as `src/content/history/arthur-white.md` (`cluster: walton-history`, `entityType: person`, `related: [mount-felix]`). Restructured the supplied text into H2 sections with an image placeholder per section (owner is sending titled images next, to be slotted in). Cross-linked both directions: added `arthur-white` to `mount-felix.md`'s `related` array and a new sentence in its "The men who stayed" section pointing to the story and flagging it as the first of an ongoing series.

Verified: full build (169 pages), browser check of both pages confirming the contributor byline renders correctly on the new page and the standard byline is unchanged on Mount Felix.

## 2026-07-11 — Removed fabricated "Walton Carnival" event listing
Owner flagged `/whats-on/walton-carnival-2026/` as a suspected hallucination. Investigated and confirmed: its `source_url` (`waltonfestival.org.uk`) is a non-existent domain (DNS lookup fails outright), its stated venue "Stompond Lane Recreation Ground" was actually a sports ground demolished for housing in 2017, and no search turns up any real event by this name. Deleted `src/content/events/walton-carnival.md` entirely and swapped the passing mention in `src/content/news/welcome-post.md` ("from the annual Walton Carnival to weekly markets...") for the real Walton & Weybridge Regatta.

**While investigating, checked the other two original seed events** (same batch, created before this project's rigorous verification practice was established) for the same pattern — both contain the same "hedge language" tell ("check local notice boards for current dates", "exact dates confirmed in spring — check the website"):
- `farmers-market.md`: real market, but wrong location (file says Church Street; actually [The Heart Shopping Centre](https://www.surreymarkets.co.uk/walton-on-thames-market/)) and wrong day (file says Sunday; actually first Saturday of the month). **Not yet fixed** — flagged to owner, awaiting decision.
- `rowing-regatta.md`: real club (Walton Rowing Club, est. 1927), but wrong event name (file says "Walton Regatta"; the actual annual event is the [Walton & Weybridge Regatta](http://wandwregatta.org.uk/), run since 1862) and unverified date. **Not yet fixed** — flagged to owner, awaiting decision.

Verified: full build (168 pages, down from 169), no other references to the removed event anywhere in `src/`.

## 2026-07-11 — Corrected the other two seed events flagged above
Owner asked to also fix `farmers-market.md` and `rowing-regatta.md`.

- **`farmers-market.md` corrected**: venue → "New Zealand Avenue, outside The Heart Shopping Centre, Walton-on-Thames" (verified via [Surrey Markets](https://www.surreymarkets.co.uk/walton-on-thames-market/)), schedule → first Saturday of the month, 9:30am–2pm (was: Church Street, Sunday). Added `source_url`. Next occurrence set to 2026-08-01 (confirmed Saturday).
- **`rowing-regatta.md` deleted, replaced with `walton-and-weybridge-regatta.md`**: correct name "Walton & Weybridge Regatta" (annual since 1862, per [official site](http://wandwregatta.org.uk/)), correct 2026 date 6–7 June (file previously guessed 15–16 August), correct course/spectating detail (starts below Walton Marina, finishes near the clubhouse, free from the towpath between Felix Road and Sunbury Lane) replacing an unverified "Thames Street" address and an unverified Cowey Sale spectating claim. New slug `walton-and-weybridge-regatta-2026`. Also fixed a stray reference to the old wrong name/month ("Walton Regatta typically held in August") in `src/content/news/thames-path-walton-to-weybridge.md`.

**Note on the regatta's visibility:** its confirmed 2026 date (6–7 June) is already in the past relative to build time (11 July), and both `/whats-on/` and `/whats-on/[slug].astro` filter past events out of `getStaticPaths()` entirely, not just the listing — so the corrected page currently builds zero output and won't appear on the site until it's updated with a confirmed future date (the club hasn't announced 2027's date yet). This is the site's existing, correct behaviour for past events, not a bug; chose an accurate past date over fabricating a future one.

Verified: full build (168 pages), no other stray references to the old fabricated/incorrect event names or slugs anywhere in `src/`.

## 2026-07-11 — Redirect walton-on-thames.pages.dev to the custom domain
Added `functions/_middleware.js`, a Cloudflare Pages Function (separate from the Astro static build) that 301-redirects any request arriving via the exact host `walton-on-thames.pages.dev` to the equivalent `https://walton-on-thames.org` URL, preserving path and query string. Only the exact production `.pages.dev` alias is matched — preview-deployment subdomains (e.g. `<hash>.walton-on-thames.pages.dev`) are left untouched so branch previews still work if ever used.

Context: canonical link tags and the sitemap already only reference `walton-on-thames.org` (both derive from `site` in `astro.config.mjs` at build time, baked into the static HTML regardless of which hostname serves it), so duplicate-content risk from the `.pages.dev` URL being publicly reachable was already low. This closes the gap fully by making the `.pages.dev` URL never actually serve content — it always bounces to the real domain.

Verified: simulated the middleware's `onRequest` against three cases (production `.pages.dev` URL → redirects correctly with path/query preserved; custom domain → passes through; preview subdomain → passes through) via a local Node script, and confirmed a full `npm run build` still succeeds with `functions/` present (this directory isn't touched by the Astro build; Cloudflare Pages picks it up independently). Could not verify the live redirect itself pre-push since Pages Functions only run under Cloudflare's edge runtime, not `astro dev` — to be confirmed post-deploy with `curl -I https://walton-on-thames.pages.dev/`.

## 2026-07-11 — Removed pre-launch noindex header
`public/_headers` no longer sends `X-Robots-Tag: noindex, nofollow` (removed the line; header block otherwise unchanged). `robots.txt` was already `Allow: /`. Owner had just pointed the domain's DNS at Cloudflare and asked to remove the restrictions preventing search engines visiting the site. Confirmed in a fresh `npm run build` that `dist/_headers` no longer contains the tag. Note: the site still has no GitHub remote and isn't yet connected to a Cloudflare Pages project, so this change has no live effect until deployed — it just means the *next* deploy won't be noindexed.

## 2026-07-11 — /hersham/queen-victoria-first-steam-train/ (owner-supplied draft, outside the extension build order)
Owner supplied a full SEO-formatted draft (title/meta/keywords/body/FAQ/sources) plus an AI-generated "period engraving" image captioned as if published in an 1837 chronicle. Rewrote rather than published as-is:

**Fact-checked every specific claim before building anything**, since `/hersham/history/` and `/hersham/` already carried a brief, unsourced version of this same fact ("Victoria saw her first steam train while at Hersham"):
- Diary quote and February 1837 date: confirmed via [PBS Empires — Queen Victoria](https://www.pbs.org/empires/victoria/history/index.html).
- Age 17: correct (born 24 May 1819; she would not turn 18 until after this sighting and would not become queen until June 1837).
- Claremont/Leopold connection: confirmed, but Claremont sits under a mile south of **Esher**, not in Hersham itself ([Wikipedia — Claremont](https://en.wikipedia.org/wiki/Claremont_(country_house))). The draft's own title question ("at Hersham?") is the right framing — kept that honest ambiguity in the page rather than asserting the sighting happened at Claremont.
- First actual train journey was 13 June 1842, Slough–Paddington on the GWR (not the draft's implied later Scotland trip) — confirmed via [royal.uk](https://www.royal.uk/queen-celebrates-175th-anniversary-first-royal-train-journey).
- Hersham station didn't open until 28 September 1936, and the London and Southampton Railway's Nine Elms–Woking section didn't open to the public until May 1838 — both confirmed via Wikipedia, both correctly used in the draft to show the 1837 sighting predates public passenger service.
- Dropped the draft's "ReadOnlineFree" book-excerpt source (unidentifiable, not a citable publisher) and National Archives/Network Rail links (too generic to support specific claims); used PBS, royal.uk, and three Wikipedia articles instead.

**Declined the AI-generated image.** It was captioned "PUBLISHED IN A CHRONICLE OF THE DAY, 1837" with a fabricated quote overlay — presenting an AI illustration as genuine period material, which conflicts with this site's sourcing standards. Used the site's standard `<!-- IMAGE -->` placeholder convention instead, one per H2, for the owner's own photography/illustration later.

**Rewrote the body** to the site's measured house style (dropped the FAQ block, "Internal link opportunities" meta-section, and hedging SEO phrasing like "the safest conclusion is") and built as a proper `hersham` collection entry (`entityType: "event"`) rather than a standalone route, so it inherits the shared history layout, sources block, and Related Reading sidebar automatically.

**Updated the two existing brief mentions** on `/hersham/history/` (Royal Glimpses section) and `/hersham/` (short history section) to link through to the new page instead of duplicating/contradicting it.

Verified: full build (169 pages, up from 168), browser preview of the new page and both edited hub pages, confirmed the new entry appears correctly in the Hersham "Explore by topic" grid.

## 2026-07-08 — Bulk restaurant/cafe directory import (outside the extension build order)
Owner supplied `walton_hersham_whiteley_restaurant_directory.xlsx` (58 rows: 42 Walton, 15 Hersham, 1 Whiteley Village, with name/address/phone/description/source URL per business). This directly addresses a real gap: `/food-and-drink/` and `/hersham/food-and-drink/` had almost no listings and were showing empty-state messages.

**Removed a fabricated listing first (unrelated to the spreadsheet):** the owner flagged that "Campo de' Fiori" doesn't exist. Checked its `source` field — it was the only business in the whole collection tagged `"Local knowledge"` with no operator website, unlike every other entry. Deleted. Flagged two other weak-sourced entries (`sam-b-fit.md`, `impulse-on-pilates.md`) to the owner for their own review since neither is confirmed fake, just similarly thin on sourcing.

**Merges instead of duplicates (owner-confirmed):**
- `the-anglers.md` — spreadsheet gave a different address (Manor Road) than the existing listing (Riverside). Owner confirmed the correct address is "Riverside Cottages, Manor Road, Walton-on-Thames, KT12 2PF" — updated address, coordinates, phone.
- `the-weir-hotel.md` and `watermans-arms-hersham.md` — both already existed as accommodation-only listings; the spreadsheet described them as pub/restaurant venues at the same addresses. Rather than duplicate, added phone numbers, swapped Watermans Arms' website from the third-party OYO booking platform to its own official site, and updated `/food-and-drink/index.astro` + `/hersham/food-and-drink.astro` to also match businesses with `subcategories` containing `pub-with-rooms` (both already had this tag), so accommodation-categorised venues that are genuinely also pubs/restaurants now appear on the food pages without needing a second `category` value the schema doesn't support.

**55 new business files generated** via a script (`category`/`subcategories` mapped from the spreadsheet's `Type` column; `neighbourhood` matched to existing convention). Data-quality fixes applied before publishing:
- Excluded several `Source URL` values from the `website` field: one pointed to a recruitment site (jobtoday.com) instead of the restaurant, one row (McDonald's) had KFC's URL — a spreadsheet copy-paste error — and four rows pointed to generic directory *category* pages (cylex-uk.co.uk, yell.com) rather than the specific business, one of which was reused identically across three unrelated businesses. All left with address/phone only rather than a misleading or non-specific link.
- Fixed a script bug that was writing the literal string `"nan"` into the `source` field for the two rows with no source URL (Le Petit Cafe, Halfway Cafe).

**Bug found during verification, fixed before commit:** the `subcategories.includes('pub-with-rooms')` filter added to `/food-and-drink/index.astro` had no neighbourhood restriction, so it pulled in accommodation listings from Esher/Weybridge/Shepperton (e.g. The Albert Arms, Esher) that happen to share that subcategory tag — venues well outside the site's three core areas. Scoped the match to `walton-on-thames`/`hersham`/`whiteley-village` only. Caught by checking the actual rendered card count and names in the browser preview rather than just confirming the build succeeded.

**Cross-links added:** "the Swan Inn" (Jerome Kern story, mentioned in `/history/famous-residents/` and `/history/st-marys-church/`) and "the Barley Mow" (mentioned in `/hersham/hersham-green/` and `/hersham/food-and-drink/`) were previously plain text with no real listing to point to — now linked to their new `/directory/` pages.

Verified: full build (168 pages, up from 115), stale-link sweep, and browser preview confirming card counts on both food-and-drink pages before and after the neighbourhood-scope fix.

Format:

```
## YYYY-MM-DD — /url-path/
Spec: blueprint 4.x or extension 3.x/4.x
Status: built | ADAPT | MERGE (from <old-url>)
VERIFY: <any facts marked VERIFY in the spec that still need confirming, or "none">
```

---

## 2026-07-02 — /history/
Spec: blueprint 4.7 + extension 3.1 (full pillar-page rewrite)
Status: built
VERIFY: none outstanding. Old Manor House / John Bradshaw claim (mentioned in the Tudor & Stuart era section, sourced from extension 3.17 not this tranche) was verified against Village Matters / British History Online before publishing — correctly framed as tradition (Bradshaw leased, did not own, the house).

## 2026-07-02 — /history/cowey-stakes/
Spec: extension 3.2
Status: built
VERIFY: none outstanding. Earl of Sandwich detail corrected to 5th Earl (spec and Wikipedia agree; first draft mistakenly wrote 4th).

## 2026-07-02 — /history/walton-bridge/
Spec: blueprint 3.6/4.7 + extension expansion (six-bridges detail)
Status: built
VERIFY: none outstanding. All six-bridge facts (dates, Canaletto/Turner, 2013 cost and opening date) cross-checked against Wikipedia.

## 2026-07-02 — /history/st-marys-church/
Spec: extension 3.13
Status: built
VERIFY: none outstanding. Bells, Roubiliac monument, Selwyn brass, scold's bridle, Jerome Kern wedding date (25 October 1910) all independently verified.

## 2026-07-02 — /history/film-studios/
Spec: extension 3.4 (flagship, 1200+ words)
Status: built
VERIFY: none outstanding. Lease amount/date (£36/year, 1899), fire (1907), bankruptcy and negative-melting (1923), Nettlefold purchase (1926), closure (March 1961) all verified against Wikipedia's Walton Studios article.

## 2026-07-02 — /history/famous-residents/
Spec: extension 3.9
Status: built
VERIFY: Natascha McElhone's birth year corrected to 1971 (multiple independent sources) after Wikipedia's infobox was found to be an outlier at 1969 — flagging in case Wikipedia is later "corrected" to match its own infobox; 1971 is the better-supported figure.

## 2026-07-02 — /visit/history-and-heritage.astro retired
Status: deleted, replaced by /history/ hub + entity pages above
VERIFY: n/a — the page's "Hepworth Sculpture Walpole" section (conflating Cecil Hepworth's film studio with the unrelated sculptor Barbara Hepworth) was dropped per site-audit.md Decision 4, not migrated.

## 2026-07-02 — /hersham/hersham-green/
Spec: extension 4.3
Status: built
VERIFY: none outstanding. 3.4-acre figure, 1885/1892 village hall dates verified against Wikipedia.

## 2026-07-02 — /hersham/sham-69/
Spec: extension 4.4
Status: built
VERIFY: none outstanding. Chart positions and dates for all five top-20 singles verified against Wikipedia. Pre-punk band name ("Jimmy & The Ferrets") and the Walton Hop miming detail verified via independent search (punk77.co.uk-sourced), stronger than the extension's own vague description. Deliberately did not name Jonathan King on this page — the Walton Hop's fuller, more sensitive history (including his prosecutions) belongs on the not-yet-built /history/walton-hop/ page (extension 3.5), which the spec explicitly says to handle "factually and briefly... do not sensationalise."

## 2026-07-02 — /hersham/
Spec: extension 4.1 (hub, adapt lightly)
Status: built
VERIFY: population corrected to ~12,400 (2011 census, 12,414) rather than the spec's "~12,600" estimate — used the more precisely sourced figure. Parakeet colony (~7,000, near Esher Rugby Club, 2004 estimate), Burhill Old Course (established 1907) and Hersham Village Golf Club (9-hole, separate course) all verified.

## 2026-07-02 — /hersham/history/
Spec: extension 4.2 (hub, 1000-1300 words)
Status: built
VERIFY: Haverichesham etymology, 1851 parish formation, Holy Trinity (1839, demolished 1889) and St Peter's (1887, architect J. L. Pearson) all verified against Wikipedia. St George's Hill / Diggers 1649 content handled per the spec's explicit caution — framed as belonging to Weybridge, not Hersham, with an outbound link to Elmbridge Museum's own account rather than a claim written here.

## 2026-07-02 — /hersham/food-and-drink/
Spec: extension 4.10 (first half; Burhill/golf half not built)
Status: built
VERIFY: n/a. Hersham currently has zero businesses in the directory categorised as food/drink (one pub is categorised as accommodation). Built with an honest empty-state message rather than fake listings, mirroring the existing /food-and-drink/ page's own empty-state pattern.

## 2026-07-02 — Nav/footer wiring
Status: done
"Hersham" added as a top-level Header.astro nav item (9 items total). /history/ gained an "Explore by topic" card grid pulling live from the history collection. Footer.astro gained a "Local History" column (6 links) and its grid changed from a fixed 4-column layout to auto-fit so it accommodates 5 columns without hardcoded breakpoint overrides.

## 2026-07-02 — Bug found and fixed: mobile menu content was invisible on all browsers
Not spec'd — discovered while testing the nav addition above. `Header.astro`'s mobile breakpoint had a bare `nav { display: none }` selector meant to hide the desktop nav, but it also matched the `<nav>` wrapper inside `#mobile-menu` itself, hiding the mobile menu's own link list. The touchend/click toggle logic from the earlier Safari fix was working correctly (verified via aria-expanded and computed styles), but the menu content was always `display:none` regardless of device or browser — likely the actual root cause behind the repeated "mobile menu still doesn't work" reports from earlier in the project, which had been treated as a Safari-specific touch-event problem. Fixed by giving the desktop `<nav>` a `.primary-nav` class and scoping both the `margin-left: auto` rule and the `display: none` media-query rule to it specifically. Verified visually at 375px, 1024px and 1440px viewports post-fix.

## 2026-07-02 — /history/mount-felix/
Spec: extension 3.7
Status: built
VERIFY: none outstanding. Opening date (31 July 1915), 1916 renaming to No. 2 (when No. 1 opened at Brockenhurst), and ~27,000 patients treated (jointly with Oatlands Park) verified against Wikipedia's dedicated No. 2 New Zealand General Hospital article. "Wellington pub (formerly The Kiwi)" and "memorial near Homebase car park" claims from the spec were not independently verified and were dropped rather than published unverified.

## 2026-07-02 — /history/walton-in-wartime/
Spec: extension 3.8
Status: built
VERIFY: none outstanding. Charles Sydney's death (27 September 1940, Spitfire R6767, Station Avenue, 92 Squadron RAF Biggin Hill) and the Brooklands raid (4 September 1940, ~90 killed) both verified independently.

## 2026-07-02 — /history/hwm-and-motor-racing/
Spec: extension 3.11
Status: built
VERIFY: none outstanding. HWM founding (1938, John Heath; joined by George Abecassis 1946), Aston Martin franchise (1951), and Stirling Moss's Grand Prix debut (1951 Swiss GP, in an HWM, 8th place) all verified against Wikipedia.

## 2026-07-02 — /history/walton-hop/ (sensitive)
Spec: extension 3.5
Status: built
VERIFY: handled with particular care per the spec's explicit instruction to be factual, brief, and not sensationalise. Verified precisely via Wikipedia's Jonathan King article: his 2001 conviction (7 years) concerned offences unconnected to the Walton Hop; a separate 2018 trial specifically about Hop-connected allegations ended with no conviction — some not-guilty verdicts, and the remaining charges subject to a stay of proceedings after a judge found serious and repeated police failings (Surrey Police apologised). The page states plainly that no one has been convicted of an offence connected to the Walton Hop itself, since the earlier draft risk was conflating the two cases. Deliberately did not name Jonathan King on the /hersham/sham-69/ page (built in Tranche 3) — kept that detail confined to this page, where it has proper context.

## 2026-07-02 — /history/monty-python-and-film-locations/
Spec: extension 3.10
Status: built
VERIFY: several of the spec's specific claims (old town hall, a "Nelson dummy" at Wellington Close, toilets by The Regent) could not be verified and were dropped rather than published. What was verified and used instead: Monty Python filmed in Walton in July 1969 (Michael Palin rowing scene at Cowey Sale), Psychomania (1973, Hepworth Way and the Walton shopping centre), Is It Legal? (ITV, shot in Walton), Not Going Out series 8 (aerial views of Walton), and Ashes to Ashes series 2 (filmed in Hersham) — all independently confirmed.

## 2026-07-02 — /hersham/whiteley-village/ (Decision 3 consolidation)
Spec: extension 4.5
Status: built; content/places/whiteley-village.md and content/news/whiteley-village-visiting-guide.md deleted and redirected to this page
VERIFY: William Whiteley's murder (24 January 1907, by Horace Rayner) and the £1 million bequest verified. The "Registered Historic Park and Garden" claim, present in two of the three old source files, could not be verified after two separate searches (only Grade II listed buildings and a 1979 Conservation Area designation were confirmed) — dropped rather than carried forward. The "built 1911-1921" date range was softened to "first residents moved in from 1917" (the only precisely sourced date found) rather than repeating an unconfirmed range. Also corrected: the old places/ file claimed the village is "managed by Anchor Hanover" — actually the charitable Whiteley Homes Trust, per the Trust's own site.
Scoping note: `content/neighbourhoods/whiteley-village.md` was deliberately NOT retired in this pass, unlike the other two duplicate sources. Decision 3 says "no standalone deep-dive kept," but retiring only the Whiteley Village neighbourhood page ahead of its Walton-on-Thames and Hersham siblings (which are still open work under Decision 2) would leave /neighbourhoods/ in an inconsistent, half-migrated state — the index page and homepage grid both frame it as "three distinct communities." Deferred to whenever the broader Decision 2 neighbourhoods retirement happens, so all three get consistent treatment at once.

## 2026-07-02 — /hersham/famous-residents/
Spec: extension 4.6
Status: built
VERIFY: John Profumo (Toynbee Hall connection, burial at St Peter's Hersham) and Odette Sansom (SOE service, George Cross, burial at Burvale Cemetery) both verified — corrected the extension's implied Hersham residence for Sansom, who actually lived at Eriswell Road, Walton-on-Thames, and is buried in Hersham. Frederick Wicks (1840-1910, Wicks Rotary Typecasting Machine) fully verified via Wikipedia.

## 2026-07-02 — /hersham/parakeets/
Spec: extension 4.7
Status: built
VERIFY: the 2019 UCL geographic-profiling study debunking the Hendrix/African Queen/Syon Park escape myths was verified and used as the page's central "documented vs myth" framing, exactly as the spec asked for. The Great Storm 1987 theory is presented as plausible-but-partial, matching the study's own conclusion.

## Nav/cross-link follow-up (2026-07-02, Tranche 3/4)
Updated /history/ and /hersham/history/ era timelines and prose to link all ten history/hersham entries built across Tranches 2-4 (previously only the first five of each were wired in). Added an "Explore by topic" grid to /hersham/history/, mirroring the one already on /history/. Updated /hersham/index.astro's parakeet and Whiteley Village mentions from plain text to real links now that those pages exist.

## 2026-07-02/03 — Tranche 5 (completion) — 11 pages
Spec: extension Section 7 Tranche 5

**Walton history (8 pages):** domesday-and-origins (3.3), ashley-park-estate (3.12), origins-of-baseball (3.14), river-thames-at-walton (3.16), the-heart-and-town-centre, old-manor-house, oatlands-and-the-royal-connection, elmbridge-hundred (all four from 3.17 briefs).

**Hersham (3 pages):** river-mole-walks (4.8), st-peters-church (4.9), burhill-and-golf (4.10).

**VERIFY notes:**
- origins-of-baseball: fully verified, not merely plausible as the spec worried it might be — the exact Whitehall Evening Post quote (19 September 1749) was confirmed via SABR and Protoball, including that historian David Block discovered it in 2013. The Ashley Park venue attribution rests on the Sackville family's ownership rather than the newspaper naming the venue directly, stated as such rather than asserted as fact.
- ashley-park-estate: corrected the demolition date — the spec says "1920", but Wikipedia gives a 1923 sale with demolition roughly two years later; used the more precisely sourced 1923/mid-1920s figures. Golf club's exact closure date (May 1907, after 17 years) added, more precise than the spec's "before WWI".
- river-thames-at-walton: Lord Desborough's role corrected from the spec's "chairman" to "President" of the Thames Conservancy (1904-1937), per Wikipedia. Swan Upping route/dates deliberately kept general (year-to-year timing varies) rather than citing a single year's exact schedule.
- the-heart-and-town-centre: the Birds Eye building (Walton Court)'s flamingos/penguins detail and Grade II listing verified via Historic England's own list entry. Council approval for demolition was verified as having happened, but not attributed a specific date since none was confirmed — phrased to avoid asserting current physical status.
- old-manor-house: confirmed Grade I listed (not just "listed") and 14th-century origin (C14) with 16th-century alterations, per Historic England's list entry — more precise than what was used in the /history/ hub's earlier Tranche 2 mention.
- oatlands-and-the-royal-connection: Henry VIII's marriage to Katherine Howard at Oatlands (28 July 1540) and Elizabeth I's regular visits both verified. Framed explicitly as Weybridge's building with Walton's connection running through the Selwyn brass only, per the spec's own instruction to handle this carefully as shared heritage.
- river-mole-walks: the spec says "walk the routes before writing; distances and surfaces must be first-hand" — not possible to do remotely. Written deliberately as a general orientation page (geography, connection points, seasonal cautions) rather than inventing specific turn-by-turn distances or timings that would need first-hand verification.
- burhill-and-golf, st-peters-church, elmbridge-hundred, domesday-and-origins: no material discrepancies from spec; all facts cross-checked and confirmed.

## 2026-07-02/03 — walton-charity NOT built (needs owner input)
Spec: extension 3.15. The spec's own build note says: "Darren drafts or closely directs this page from primary archival material via his trusteeship. This is the site's single most defensible page: original research nobody can copy." This explicitly requires Darren's direct access to Walton Charity's archival records and his own trustee-derived knowledge — not something that can or should be researched from public web sources and written on his behalf under his byline. Deliberately skipped rather than fabricated. This is the one remaining page from the entire five-tranche build order.

## 2026-07-02/03 — Retired walton-bridge-history.md and hersham-village-guide.md
Both news articles' target pages (/history/walton-bridge/ and /hersham/) were built in Tranches 2-3, so both old articles are now deleted with 301 redirects added. Fixed the one remaining internal link to walton-bridge-history.md, in content/neighbourhoods/walton-on-thames.md, to point at /history/walton-bridge/ directly.

## Nav/cross-link follow-up (2026-07-02/03, Tranche 5)
Added the 8 new Walton pages and 3 new Hersham pages to the /history/ and /hersham/history/ era-timeline sidebars (the dynamic "Explore by topic" grids already picked them up automatically). Updated the Georgian-era timeline entry to link the new, deeper /history/ashley-park-estate/ page instead of the shorter /things-to-do/ashley-park/ visit-facts page.

## 2026-07-03 — Resolved the "still open" items from the previous entry

User was asked four clarifying questions and gave direct answers, resolving everything except the item that genuinely needs the user's own input:

**1. Retired all three `/neighbourhoods/` pages (Decision 2), folding content in first.**
- `content/neighbourhoods/walton-on-thames.md`, `content/neighbourhoods/hersham.md`, `content/neighbourhoods/whiteley-village.md`, and `src/pages/neighbourhoods/` (index + `[slug].astro`) all deleted.
- Removed the now-unused `neighbourhoods` collection from `src/content.config.ts`.
- Content fold: added a "Fast facts" civic/admin table (council, MP, police, fire, ambulance, NHS ICB, bus operators) to `/living/index.astro`, and a 5-question FAQ section (with `FAQPage` JSON-LD) to the homepage, both sourced from the retiring Walton page — this also finally delivers the FAQ block the original blueprint (4.1) always asked for on the homepage.
- Homepage's "Explore the Neighbourhoods" 3-card section became "Beyond the Town", a 2-card Hersham/Whiteley Village section (dropped the self-referential Walton card, since Walton content now IS the homepage).
- Header nav: swapped "Neighbourhoods" for "History" (History now has 10 built pages and deserved a top-level slot; nav item count stays at 9, already verified to fit at the 1200px+ breakpoint).
- Footer: "Neighbourhoods" column became "Hersham" (5 links: hub, green, food & drink, Whiteley Village, history).
- Fixed 5 inbound links across content/pages that pointed at the retiring `/neighbourhoods/*` URLs (things-to-do/[slug].astro's dynamic neighbourhood button, william-lilly, watermans-arms-hersham, history/famous-residents.md, and the neighbourhood pages' own cross-links, which are moot since deleted).
- Redirects added: `/neighbourhoods/walton-on-thames/` → `/`, `/neighbourhoods/hersham/` → `/hersham/`, `/neighbourhoods/whiteley-village/` → `/hersham/whiteley-village/`, `/neighbourhoods/` → `/`.

**2. Retired `birth-of-baseball-walton-on-thames.md` and `birds-eye-walton-court-history.md` — but only after merging in real content, not a plain delete.**
Before deleting, I read both articles in full and found they contained substantial verified-sounding detail my new pages were missing. Verified and folded in:
- Into `/history/origins-of-baseball/`: the 2019 blue plaque at Walton Cricket Club (exact wording, 7 July 2019, organised by BaseballSoftballUK/Walton Cricket Club/WoTTA/British Plaque Trust chairman Mike Read — the old article's claim that Bobby Davro and Bill Nankeville attended was NOT corroborated by any source found and was dropped), plus the fuller documentary lineage (1744 *A Little Pretty Pocket-Book*, the earliest print mention; 1755 William Bray diary, the earliest manuscript reference; 1749 Walton, the earliest record of a specific game played).
- Into `/history/the-heart-and-town-centre/`: confirmed via Wikipedia's dedicated "Walton Court, Walton-on-Thames" page — alligators (not just flamingos/penguins, corroborated independently by the Twentieth Century Society), precise architectural detail (curtain walling, enamel panels, reflecting pool, bronze bird sculpture by John McCarthy), Grade II listing (November 1995), and — resolving the uncertainty I'd flagged in Tranche 5 — confirmation the building was actually demolished (2019 onwards) and redeveloped as Walton Court Gardens (375 apartments, nine blocks), with publicly stated plans to reinstall the site's war memorial.
- Deliberately did NOT add the old article's Milly Dowler CCTV detail (also confirmed true via Wikipedia) — judged it tangential to a town-centre-redevelopment page and inappropriate tonally alongside "flamingos and alligators" content, unlike Walton Hop's Jonathan King material which was central to that page's own subject.
- Redirects added: `/community/news/birth-of-baseball-walton-on-thames/` → `/history/origins-of-baseball/`, `/community/news/birds-eye-walton-court-history/` → `/history/the-heart-and-town-centre/`. Fixed one inbound link in `content/places/ashley-park.md`.

**3. Built a minimal, clearly-provisional `walton-charity` page from public Charity Commission facts only.**
`/history/walton-charity/` now exists with registered charity number (1185959), registered purpose, and area of benefit (ancient parish of Walton-on-Thames, and Elmbridge more widely) — all from the public Charity Commission register, nothing invented. The page opens by stating plainly that it's a placeholder pending Darren's own archival material via his trusteeship, and includes a transparency note about that trustee relationship.

**4. Paused rather than continuing into the broader blueprint scope** (directory category hubs, `/living/` content depth beyond the new fast-facts table, food-and-drink/things-to-do spokes) — user's explicit choice, not started.

## 2026-07-16 — Content Verification Protocol audit (response to two ChatGPT-authored accuracy audits)

Owner added a new "Content Verification Protocol" to CLAUDE.md (Tier 1/2/3 sourcing rules, prohibited inventions, flag-and-stop markers) after catching a fabricated pub name in a previous draft. Two ChatGPT-generated accuracy audits of the live site were then supplied, with explicit instructions to independently re-verify every finding against the new protocol rather than act on the audit directly — audits themselves count as Tier 3 (AI-generated web content) and are never a sole source.

**Businesses/events (audit #1), confirmed and fixed:**
- `the-dining-room.md` deleted — Companies House (Tier 1) confirms the company dissolved 29 July 2014; the file had been published with an unresolved "should be checked" note still live, itself a protocol violation.
- `scottie-exhibition-riverhouse-barn-2026-07.md` deleted — originally sourced only from a Tier 3 aggregator; Riverhouse Barn's own site blocked direct fetch (403), so cancellation status is unverifiable at Tier 1/2 and the listing was removed rather than left ambiguous.
- `the-heart-shopping-centre.md` corrected — fabricated "Vue Cinema" and unsupported "over 60 stores" removed after checking the real official site (heartshopping.co.uk; the frontmatter had pointed at a non-existent domain). Replaced with amenities actually listed there (library, gym, car park).
- `khan-of-walton.md` and `hersham-cafe-restaurant.md` — both had TripAdvisor (explicitly Tier 3) as their "website" field. Khan of Walton fixed to its real official site (khanwalton.co.uk); Hersham Cafe & Restaurant has no findable official site, so the website field was dropped and the FSA ratings register (Tier 1, business 1778538) cited as the existence/address source instead.

**Historical claims (audit #2), independently re-verified against Tier 1 sources, not taken on the audit's word:**
- Canaletto "one of only two English subjects" (in both `history/index.astro` and `content/history/walton-bridge.md`) — confirmed false via Tate's own artist page and Wikipedia's "A View of Walton Bridge" article, both showing multiple other English works (Horse Guards ×2, Greenwich, Westminster Bridge views). Removed the false superlative in both places rather than substitute an unverified narrower claim ("one of two depictions of Walton Bridge specifically" was suggested by a WebSearch snippet but Dulwich Picture Gallery's own page 403'd on direct fetch, so it stays unwritten per Rule 7).
- Hepworth Studios 1923 negative destruction (`content/history/film-studios.md`) — the "silver content" motive turned out to be genuinely disputed even in specialist sources (Surrey Brass's Hepworth timeline: "some say silver content, others liquified to make water-proofing resin... whatever the reason"), so rewrote to present both accounts rather than assert one as fact, per Rule 4. The 80%-of-1900–1929-British-films figure is directly and consistently attributed to this one event by both Wikipedia and the Surrey Brass specialist site, so it wasn't struck, but reframed as "commonly cited" rather than flat assertion, and "entire negative catalogue" softened to "around two thousand films" (well-corroborated count, but "entire" claims more precision than the sources support). Added Surrey Brass and BFI's "Most Wanted" page as second/third sources — the article had been Wikipedia-only, which the audit correctly flagged as a Rule 5 sourcing gap.
- Homepage/`living/index.astro` "Current MP: Monica Harding, Liberal Democrat" — checked against UK Parliament's own member record and corroborating Surrey Live coverage of the July 2024 election; already correct, no change needed. (The audit's "wrong MP name" finding likely refers to Google's still-indexed cache of the pre-migration GoDaddy site, not current content — see below.)
- Homepage Directory tile wording "All local businesses" → "Local business listings" — the directory is a curated subset, not literally all businesses, so the absolute claim was dropped.
- `public/_redirects` — added a 301 for the old GoDaddy-era `/hotels-and-b%26bs/` (and unencoded `/hotels-and-bbs/`) URL to `/places-to-stay/`, which had no redirect and would 404. `/eat-and-drink/`, `/privacy-policy`, and `/` already redirect or already serve current, correct content — the audit's concern there is Google's index still surfacing old GoDaddy-hosted snapshots, which a code fix can't directly clear. **Outstanding, needs Darren:** request re-indexing of the old URLs via Google Search Console once DNS/deploy is confirmed stable, so Google drops the stale GoDaddy-era cache faster than an organic re-crawl would.

**Pre-commit checklist (protocol Rule 6):** zero unresolved `[NEEDS VERIFICATION]` markers introduced; every claim above traced to a Tier 1/2 source this session; no hours/prices/contact details stated from memory; sources blocks updated on both edited history articles; nothing hedged to smuggle in an unverified claim — the Canaletto "only two" claim was deleted outright rather than softened, per Rule 3.4.

**Still not done from this round:** `news` collection schema has no `sources:` field (unlike `history`/`hersham`) — a structural gap, not yet fixed. Tasks #44–47 and #49 (full protocol inventory across news/places/neighbourhoods collections and remaining static pages) remain open.

## 2026-07-17 — Walton & Hersham FC fixtures feed into What's On

Owner supplied the club's official ECAL calendar feed (`webcal://ics.ecal.com/ecal-sub/6a590c1f9d270a000297ec85/Enterprise%20National%20League.ics`) and asked for both home and away fixtures to appear in `/whats-on/`. This is exactly the kind of source the protocol wants for events (an organiser's own automated feed), so built it as a live build-time integration rather than a one-off import that would silently go stale mid-season.

**New `fixtures` content collection** (`src/content.config.ts`), populated by a custom Astro Content Layer loader (`src/loaders/fixtures-loader.ts`) that fetches the live ICS feed on every build — no committed markdown files to maintain, and the existing daily 01:00 UTC Cloudflare rebuild cron keeps it in sync automatically as the club's own schedule changes (postponements, rearranged kick-offs, etc.), the same way past events already drop off nightly.

Implementation notes:
- Hand-wrote the ICS parser (line unfolding, VEVENT extraction, `\,`/`\;`/`\\` unescaping) rather than add a new dependency — the feed only uses simple UTC timestamps, no RRULE/VALUE=DATE forms, so a full ical library wasn't needed.
- Home vs away is derived from SUMMARY's team order (home team listed first, per the feed's own convention), not guessed.
- **Caught and fixed a real timezone bug before shipping**: the feed's DTSTART/DTEND are UTC (`Z` suffix). A naive pass-through would have shown kickoffs an hour early during BST (e.g. a real 3pm Saturday kickoff, encoded as `14:00:00Z`, would render as "14:00" instead of "15:00"). Added a `toLondonLocalIso()` helper using `Intl.DateTimeFormat` with `timeZone: 'Europe/London'` to convert to correct local wall-clock time regardless of the build machine's own timezone, then verified against the live feed in the browser preview (confirmed both a BST fixture and an 18:45Z→19:45 BST fixture rendered correctly).
- Deliberately dropped the feed's own DESCRIPTION text (ticket links, social media promos, DAZN streaming plugs) rather than publish it verbatim — replaced with a short factual line built from the feed's own competition/match-week/home-or-away fields instead.
- Price is never stated as a number (protocol Rule 2) — fixtures show "See club for ticket prices," matching the existing "See venue for prices" convention already used for Baby Brunch Club.
- `/whats-on/index.astro` and `/whats-on/[slug].astro` now merge `events` and `fixtures` into one normalized shape for the card grid, sort, and JSON-LD — fixture detail pages skip the markdown `<Content />` render path (fixtures have no prose body) and instead show a structured summary plus an outbound link to `waltonhershamfc.com/fixtures/first-team/` (the club's own official fixtures page, confirmed via search — preferred per Rule 4 over linking straight to the raw ICS URL).

Verified: full build (233 pages, up from 189 — 46 fixture pages), `astro check` confirmed my changes didn't add net type errors (pre-existing baseline was 185 errors before this session touched anything; after cleanup it's 154, i.e. lower not higher), and browser-checked both the `/whats-on/` grid (fixtures correctly interleaved chronologically with hand-authored events) and an individual fixture detail page.

## 2026-07-17 — Build-time guard for unresolved verification markers

The Content Verification Protocol's Rule 3 ("do not publish, commit, or build a page containing an unresolved `[NEEDS VERIFICATION]` marker") was previously honour-system only — and the Dining Room listing proved the honour system fails: it went live with "should be checked before publication" in its published description. Now mechanical: `scripts/check-verification-markers.mjs` runs as npm's `prebuild` hook (so it gates both local builds and Cloudflare Pages deploys, which run `npm run build`), scans everything under `src/`, and exits non-zero listing file:line for each marker found. Tested both paths: clean run passes, a seeded marker in a temp content file blocks the build with a clear message. One portability fix along the way: the initial version broke on the repo path's space ("Claude Code") — switched to `fileURLToPath` rather than hand-parsing the module URL.

Also this session, prompted by owner review questions: CLAUDE.md brought back in sync with the codebase (retired `neighbourhoods` collection removed from docs, `history`/`hersham`/`fixtures` documented, event-filtering contradiction fixed, four operational gotchas captured), and a real structured-data bug fixed — Event JSON-LD hardcoded `addressLocality: Walton-on-Thames` for all listings including the 23 away fixtures at other clubs' grounds; away fixtures now use their venue string as the address. Owner also challenged the "National League South" competition label on fixtures; re-verified against the club's own fixtures page (Tier 1), which confirms the first team's 2026–27 competition is Enterprise National League South (their first season at that level following promotion from the Southern League — the likely source of the confusion). Label kept.

## 2026-07-18 — New history article: ABC Motors, Hersham

Owner supplied a lengthy pre-researched draft (`abc-motors-hersham-definitive-reassessment.md`, not committed to the repo) covering ABC Motors' aero-engine, motorcycle and light-car business, based at Hersham 1914–1971, and asked for it to become a page in `/history/`, explicitly "for review" rather than for direct publication. Per the Content Verification Protocol, an externally supplied research document is Tier 3 (no different from "AI-generated content found on the web") and cannot be a sole source, however well-cited it looks — so rather than transcribe it, independently fetched and cross-checked 6 of its 8 cited primary sources this session: the Aviation and Aerospace Archives Initiative record, D. A. Hales's own account on abcroadmotors.co.uk (WebFetch 403'd; retrieved via `curl` with a browser User-Agent instead), Museums Victoria's Dragonfly engine catalogue entry, Kingston Aviation's Sopwith day-by-day record, Elmbridge's own planning register for the Riverdene Business Park redevelopment (application 2014/5061), and Lidl's store finder for the current Molesey Road site.

Findings: the draft's central corrective claim — that "the Hersham factory" was actually two separate sites either side of Molesey Road (the original 1914 Hersham Works/Old Esher Road factory, and the separate Hersham Lodge site acquired by subsidiary Walton Motors Ltd) — held up under independent verification, including exact dates (August 1918 acquisition) that the primary source confirmed more precisely than the draft itself claimed. Vickers's acquisition (September 1951), the 1964/1971 dates, the Faulkner's Foundry identification, the Sopwith-built motorcycle volumes, and the 2015 Lidl redevelopment all corroborated cleanly.

Two claims were **not** independently confirmed and were written with appropriate hedging rather than dropped or overstated: the "~1,500 cars" light-car production estimate (attributed to the company's own historian, not asserted as fact) and the 1911-vs-1912 Brooklands move date (the draft's source for the narrower claim, a second abcroadmotors.co.uk page, also 403'd and wasn't retried, so the article states "around 1911–12" without over-specifying). The Hersham Place Consultation PDF the draft also cited (for the same 1918 date, independently confirmed anyway via Hales) failed text extraction and was excluded from the sources block rather than cited unread, per Rule 5.

Wrote `src/content/history/abc-motors-hersham.md` as flowing narrative prose (not the draft's table/audit-report scaffolding, which was a QA artifact, not publishable copy): `cluster: "walton-history"`, `entityType: "institution"` (matching `hwm-and-motor-racing.md`'s pattern for a company, not a place), `era` spanning edwardian through postwar. No images exist for this subject (site policy: no stock imagery) — used an `<!-- IMAGE: ... -->` placeholder comment per the established convention rather than the draft's list of unobtainable stock photos. Declined the draft's hand-written JSON-LD block in favour of letting `HistoryArticle.astro` auto-generate Article/BreadcrumbList schema, consistent with every other history page. `related` links to `hwm-and-motor-racing` (another Hersham/Walton motor-engineering institution already on the site) and `walton-in-wartime` (shared WWI/WWII industrial context).

Verified: full build (265 pages, up from 264) and `npm run seo:validate` (264 pages checked, all passed).

## Still open
`content/neighbourhoods/*` MERGE work is now fully resolved (see above) — no longer open. The only remaining open item from the entire project is `walton-charity`'s full version, which needs Darren's own archival material to move beyond the provisional public-facts page built above. The broader blueprint spoke pages outside the history/Hersham extension remain their own separate body of work, deliberately not started per the user's explicit "pause here" answer.
