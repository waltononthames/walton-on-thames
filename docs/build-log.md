# Build log

Log of pages built against `walton-seo-blueprint.md` / `walton-history-hersham-extension.md`, in build order. One entry per page. Append only.

## 2026-09-05: /hersham/hersham-green-shopping-centre/ (plan item 3.1)

The first Phase 3 spoke. 635 words, `entityType: place`, four sources, all Tier 1.

**The story is better than the plan assumed.** The plan expected the centre's early-1980s origin, its Waitrose anchor and the 2026 acquisition. What the sources actually support is a sequence of ownership changes: a Safeway that Morrisons acquired, gutted and reopened as Waitrose Hersham (branch 765) on 9 June 2005, a hybrid application to build homes on the car park refused by Elmbridge in October 2024, and then, in February 2026, the anchor tenant buying the freehold of the whole centre and becoming landlord to the other sixteen units.

**Sources, and what each carries.** The John Lewis Partnership's own announcement of 5 February 2026 gives the freehold purchase, the 54,000 square foot centre, the sixteen other units, the parking commitment and the wider investment programme. The Waitrose Memory Store, the Partnership's heritage archive, reproduces *The Gazette* of 18 June 2005 and gives the opening date, the branch number, the 22,000 square foot shop floor, the 230 space car park and the Safeway and Morrisons predecessor. Elmbridge Borough Council's planning record gives application 2024/0498 and its refusal on 23 October 2024, and that record already flows into this site through the live council feed behind `/hersham/development-and-planning/`.

**Three deliberate restraints, each worth recording.**

The construction date is not stated. "Built in 1985" and "thirteen retail units" circulate widely, but every route back from them ends at a directory site, which Rule 1 puts in Tier 3 and forbids as a sole source. The page says instead that the centre is older than its best-known tenant, which the Safeway predecessor establishes, and notes plainly that no source consulted records the year.

The two Partnership figures for the shop's size disagree: 27,000 square feet in the 2026 announcement against a 22,000 square foot shop floor in 2005. They may be measuring a total area against a trading floor. The page presents the disagreement rather than silently choosing, as the Standards require.

The sequence is reported without a causal claim. A refused scheme in 2024 followed by the tenant buying the ground sixteen months later invites an obvious inference, and no source states it. The page says the sources record both events and none links them.

The Partnership's framing of its own purchase, that it secures the store's future, is attributed to the Partnership rather than asserted, since it is an interested party describing its own deal.

**Verified:** builds, in the sitemap, carries the `about` reference the 2.2 rule requires, all three sources render, the hub's Village life grid links to it, `seo:validate` and `seo:links` clean, metaTitle 40 characters and metaDescription 147, no em dashes. Diffed the local build against the deployed sitemap to confirm the page count moved by exactly one and nothing was lost.

**Access note:** `johnlewispartnership.co.uk` fetches cleanly. `waitrosememorystore.org.uk` returns 403 to WebFetch but loads fine in the in-app browser. Surrey Live redirects to a paid-content proxy on a different host and was not followed; the council record covers the same ground at Tier 1.

## 2026-09-04: Hub FAQ taken to seven questions (plan item 2.4)

The five existing questions were kept unchanged. Two added, putting the block at the plan's seven-question cap.

**"Which council covers Hersham?"** Two-tier local government is a real source of confusion, and the fact box added in item 2.1 can only name the borough, not explain the split. The answer names Elmbridge Borough Council for bins, planning and parks, and Surrey County Council for schools, libraries and roads. Both halves rest on sources this site already uses for Hersham specifically: Elmbridge's own pages carry Hersham's parks and the planning records behind `/hersham/development-and-planning/`, and the Hersham Village ward appears in its councillor index; Surrey County Council runs Hersham Library, already cited for the library events in this repo.

**"How far is Hersham from London?"** Answered with a journey time rather than a distance, which is what people mean by the question. Thirty-three minutes to Waterloo, two trains an hour, and the reason there is no faster option: the two fast lines through the middle of the station have no platforms, so every London train is a stopping service. All of it verified against National Rail live departures on 26 August 2026 and already published with sources on `/hersham-railway-station/`, so the two pages cannot disagree.

**Declined the plan's third candidate, "What postcode is Hersham?"** The fact box now sits directly above the FAQ and already gives the postcode district. Adding a question that repeats an answer visible on the same screen pads the page without helping anyone, and the cap exists to stop exactly that.

**Verified:** seven visible questions, seven questions in the `FAQPage` schema, counts matching because both come from the same array. The parakeet follow-on paragraph is still correctly placed between its own answer and the population question. `seo:validate` clean, no em dashes.

## 2026-09-04: "Hersham Village" in the hub's body copy (plan item 2.3)

The phrase "Hersham Village" existed on the hub only in the title tag, the schema `alternateName` and an image alt attribute, never in visible prose. One sentence in the intro now carries it.

**Checked the photograph rather than the alt text.** The alt attribute claims the image shows a Hersham Village sign, but an alt attribute is an assertion by whoever wrote it, not evidence. Opened the image: an ironwork sign with a robin perched on top, reading HERSHAM VILLAGE over two lines, with a green roundel below it. The sentence is therefore verifiable from the site's own photograph.

**Deviated from the plan's proposed wording, deliberately.** The plan suggested "The sign on the green reads Hersham Village, and that is what most people call it." The second clause is an unverifiable claim about what local people say, which is precisely the plausible-sounding filler Rule 2 of the verification protocol prohibits, and no source supports it. The published sentence states only what can be seen: "The ironwork sign standing on the green puts it plainly: it reads Hersham Village."

**Verified:** the sentence renders in the intro, the phrase now appears four times in visible body text across the page, `seo:validate` clean, no em dashes.

## 2026-09-04: One Place entity for the whole Hersham cluster (plan item 2.2)

Before this, every Hersham page that mentioned the village in schema described its own unidentified "Hersham". Search engines resolve a place from a graph of statements about one identified thing, so twenty pages each inventing their own node is twenty weak signals rather than one strong one.

The hub now defines the entity and nothing else may: the `Place` carries `@id` `https://walton-on-thames.org/hersham/#place`, a `hasMap` built from the audited green coordinate already used by its `geo`, and a `WebPage` node tying the page to both the entity and the site's `WebSite` node.

Everything else points at it. Collection spokes get `about` added to the `Article` schema they already emit, done once in `HistoryArticle.astro` and keyed off `cluster === 'hersham'`, so the twenty-odd Walton history articles sharing that layout are untouched (verified: `/history/walton-bridge/` has no `about`). The four Hersham route pages that carry no Article of their own get a `WebPage` node from a small shared helper in the new `src/utils/schema.ts`, which is also where the ids live so no page hardcodes them.

`/things-to-do/hersham/` was included although it sits outside `/hersham/`. It is a page about the same village, and excluding it would have drawn the boundary around a URL prefix rather than around the entity, which is the opposite of the point.

**`scripts/seo-validate.mjs` now enforces both halves:** the hub must define a `Place` with that exact `@id` and a `hasMap`, and every page under `/hersham/` must carry a schema node declaring `about` that id. A page that starts describing its own Hersham again will now fail the build gate rather than quietly splitting the entity.

**Verified, and specifically verified as non-vacuous:** a check that silently applies to zero pages passes just as greenly as one that works. Counted directly against the built output: the rule applies to 15 pages under `/hersham/`, and all 15 declare the reference. Confirmed the hub's `@id`, `hasMap` and `WebPage` links, confirmed a collection spoke resolves through the layout, confirmed `/things-to-do/hersham/` is wired, and confirmed a Walton article is not. `npm run check` still reports 155 errors, the same count as before this change, so no new type errors were introduced. `seo:links` clean, no em dashes.

## 2026-09-04: Hersham at a glance fact box (plan item 2.1)

A compact definition list under the hub's hero carrying the administrative facts people search for directly: county, borough, borough ward, UK Parliament constituency, post town, postcode district, nearest stations, population, and links to the Wikipedia and Wikidata entities.

**The ward was the one that needed real work, and it is why this took sourcing rather than recall.** The obvious assumption, that Hersham sits in wards called Hersham North and Hersham South, is out of date: those were replaced by a single Hersham Village ward. Confirmed against Elmbridge Borough Council's own councillor index grouped by ward, which lists Hersham Village with three sitting councillors and shows neither of the old names. Wikipedia's own demographic tables still use the old ward names, which is exactly the trap the verification protocol exists to catch.

The constituency is Esher and Walton, in existence from 31 May 2024, per UK Parliament's own constituency record. The 2023 Boundary Commission review placed the Hersham Village ward in it, and `/living/` already publishes the same constituency for Walton, so the two pages agree.

Postcode district rather than a postcode: Hersham spans the KT12 4 and KT12 5 sectors, so a single postcode would be wrong. KT12 is corroborated by every Hersham business address already verified on this site. Population is the ONS Census 2021 built-up area figure already cited in the page intro, not a second source that might disagree with it.

**Nothing new was mirrored into the `Place` JSON-LD, deliberately.** Schema.org has no population property for a `Place`, `containedInPlace` already carried Elmbridge and Surrey, and a single `postalCode` would misstate a two-sector village. The entity graph work is item 2.2 and belongs there.

**Verified:** all nine rows render with the intended values, no prose was added so the hub stays inside its word band, `seo:validate` clean at 373 pages, `seo:links` clean, no em dashes.

**Source access note for later sessions:** `elmbridge.gov.uk` returns 403 to WebFetch and to the in-app browser on at least some pages, and its notice-of-poll PDFs cannot be rendered here without poppler. The council's committee system at `mygov.elmbridge.gov.uk` does fetch cleanly and is the better route to ward and councillor facts.

## 2026-09-04: Legacy URL decision and the Hersham hero image

**Legacy URLs (Hersham plan item 1.4).** Documentation only, but the live behaviour was re-checked first rather than assumed. The pre-Astro `/forum/viewtopic.php` threads return a true 404 with the site's own 404 page, and `/?page_id=84` returns 200 carrying a canonical to the homepage. Both are correct as they stand and both are being left alone: redirecting hundreds of unrelated forum threads to one surviving page is the soft-404 pattern Google discounts, and a canonical is the right mechanism for an ignored query parameter. Recorded in `docs/site-audit.md` under a new "Pre-Astro URLs still in Google's index" section, together with the one condition that would reopen it, so the question is not re-litigated on every audit.

**Hersham hero image (Hersham plan item 1.5).** The hero was a single 372KB 2048px WebP with no `srcset` and no preload, and it is the LCP element on both `/hersham/` and `/things-to-do/hersham/`. Generated 800, 1200 and 2048 variants with sharp at quality 72: 54KB, 109KB and 295KB. A 1200px viewport now fetches 109KB rather than 372KB, inside the plan's 120KB target.

The interesting part is where the `srcset` lives. It has to appear twice on the page, once on the `<img>` and once on the `<link rel="preload">`, and if the two disagree the browser preloads one file and then downloads a different one, which is worse than not preloading at all. Rather than write the string out twice across two page files, it is declared once in a new `src/utils/hero-images.ts` and read by both, on both pages. `BaseLayout.astro` gained an optional `preloadImage` prop to carry it.

The un-suffixed original stays on disk and is deliberately still the Open Graph image, so social cards are unaffected; no `<img>` references it any more, confirmed against the built output. Card images across the site already carried `loading="lazy"`, so that part of the plan item needed no change.

**Verified:** the emitted preload `imagesrcset` is byte-identical to the img `srcset`, both pages carry the responsive markup, `og:image` still points at the original, no built page requests the un-suffixed file as an image, `seo:validate` clean at 373 pages, `seo:links` reporting zero dead internal links. Width and height attributes still describe the 2048 variant's aspect ratio, which matches every variant, so there is no layout shift.

## 2026-09-04: Hersham Green merge and an FAQ fix

**Hersham Green merge (Hersham plan item 1.3).** `docs/site-audit.md` line 43 decided in July that `content/places/hersham-village-green.md` should merge into `/hersham/hersham-green/`; the merge never happened, so two pages competed for the same subject. Retired the places entry.

Compared both pages before deleting anything. Every fact the old page carried was already on the surviving page, sourced and in more detail: the period cottages and Victorian villas, the pond with its ducks and heron, the Barley Mow, the mile from Walton town centre via Queen's Road, and the ten-minute walk from the station. **Nothing was migrated, because nothing needed to be.** The old page's "serving locals for centuries" claim about the Barley Mow was unsourced and died with the file; the surviving page already words it more carefully.

Repointed nine links across five pages. The plan named four files; `things-to-do/walton-and-hersham-fc.astro` was a fifth it had missed. Retargeted the `attractions` card's `internalUrl`, which the things-to-do pages read. Added three rules to `public/_redirects`, with the legacy `/visit/` form deliberately placed above the `/visit/things-to-do/*` wildcard so it resolves in one hop rather than two: that closes a cosmetic note that had been open in the site audit since July.

**Two knock-on effects, both handled rather than left to break:**

1. The homepage renders exactly three featured places and the green was one of them, so removing it would have left two cards in a three-column grid. Promoted Walton Bridge to `featured`. It is a defensible replacement: a landmark rather than a third park, and already named in the homepage hero copy.
2. `things-to-do/riverside-walks.astro` filters places by category and was picking the green up as a park, so its meta description promised "green spaces in Hersham" that the page will no longer contain. Reworded the description to match what the page actually shows.

**History note.** A second session was working this repo at the same time and committed `776faba` (an events refresh) while this task was mid-flight. That commit picked up the already-staged deletion of `src/content/places/hersham-village-green.md`, so the file's removal is recorded under an events-refresh message that does not mention it. The end state is correct and the commit was left alone rather than rewritten. If you are ever tracing when that page died, it was plan item 1.3 on 4 September 2026, not an events change.

**Verified:** build drops from 375 to 374 indexed pages, `/things-to-do/hersham-village-green/` gone from both `dist/` and the sitemap, `/hersham/hersham-green/` still building, homepage showing three place cards, `seo:validate` clean at 373 pages, `seo:links` reporting zero dead internal links.

**FAQ fix on `/hersham/`, owner-requested.** The closing sentence pointing at the parakeets guide sat in its own paragraph after the last FAQ, where it read as a footnote to the population answer rather than to the parakeet one. Moved it into the parakeet answer.

It carries a link, and the `faqs` array feeds both the visible markup and the `FAQPage` JSON-LD, so a raw anchor in the answer string would have been escaped on the page. Held the answer as lead text, link and tail instead: the page renders the anchor, a small helper flattens the same three fields into the plain string the schema needs, and the two cannot drift apart. Confirmed in the built HTML that the visible answer and the schema answer now carry identical text, and that the orphaned paragraph is gone.

## 2026-09-04: Canonical host redirect (Hersham plan item 1.1)

`www.walton-on-thames.org` was serving the entire site with a 200 rather than redirecting to the apex, so every page on the site existed at two URLs with only the canonical tag to tell Google which to keep. `functions/_middleware.js` previously redirected only the bare `walton-on-thames.pages.dev` host, so nothing caught the www duplicate. Rewrote it to redirect any hostname that is not `walton-on-thames.org`, preserving path and query and forcing https.

**Deliberate deviation from the plan's wording.** Plan item 1.1 says "any hostname other than walton-on-thames.org". Taken literally that would also redirect Cloudflare Pages preview deployments (`<hash>.walton-on-thames.pages.dev`, `<branch>.walton-on-thames.pages.dev`), bouncing every branch build to production and making previews impossible to review. Preview subdomains are therefore exempt; the bare production `pages.dev` alias is still redirected as before. `localhost` and `127.0.0.1` are exempt too, so `wrangler pages dev` still works.

**Verified:** eleven-case local test of the host logic covering the apex, www, http-to-https upgrade, query-string preservation, the production pages.dev alias, hash and branch previews, localhost, and an unrelated custom domain. All pass. `npm run build` clean (374 pages), `npm run seo:validate` clean, `npm run seo:links` clean with zero dead internal links.

**Verified live later the same day**, once a concurrent session's push carried this commit to production. `www.walton-on-thames.org/hersham/` returns 301 to the apex, the apex still returns 200, and `?utm_source=test` survives the hop. No cache purge was needed.

One residual, noted not chased: `http://www.walton-on-thames.org/` takes two hops, upgrading to https on the www host first and only then moving to the apex. That first hop is Cloudflare's Always Use HTTPS firing at the edge before the middleware runs, so it cannot be collapsed from this repo; it would need a zone-level Redirect Rule. Https traffic, which is effectively all of it, is unaffected.

**Pre-existing, not introduced here:** `npm run check` reports 155 errors, all `ts(7006)` implicit-any and `ts(2339)` property-access in `.astro` pages under `src/`, none in the file this task touched. Worth its own task; it is not a regression from this change.

**Also committed:** `src/data/lastmod.json`. The 2 September accuracy-audit commit touched fourteen files without regenerating the manifest, so those pages were advertising stale sitemap dates. Regenerating it also dropped four event entries whose files are deleted in the working tree but not yet committed by an in-progress session; those four were restored by hand so the committed manifest matches the committed tree, and they will fall out naturally when that event work lands.

## 2026-07-26 — Em dash cleanup across history and hersham collections

Owner asked for the history section to be checked for em dashes and fixed per the site's rules. `docs/walton-history-hersham-extension.md` Section 1, Rule 2 (Register) already states this explicitly: "No em dashes anywhere; use commas, colons or full stops." Every file in both `src/content/history/` (22 files) and `src/content/hersham/` (9 files, governed by the identical rule) had violations — 125 instances total, none previously caught since no check for this existed.

**Pattern:** the large majority (99 of 125) were two mechanical, unambiguous forms: source-label lines (`- label: "Publisher — Title"`) and `<!-- IMAGE: file.jpg — alt: "..." -->` comments, both fixed by script to colon and comma respectively. The remainder were `metaTitle`/`metaDescription` frontmatter (fixed to colon, matching the "Subject: elaboration" pattern already used elsewhere on the site) and two body-prose instances in `film-studios.md` and `walton-charity.md` (fixed individually by hand, to colon/comma/full stop depending on the clause relationship, per the rule's own list of approved replacements).

**Verified in the actual build output**, not just the source markdown: rebuilt and confirmed zero em dashes remain inside `<article>` content on spot-checked pages. Three em dashes per page do remain in the built HTML, but all three are shared site chrome (`aria-label="Walton-on-Thames.org — Home"` in Header.astro/Footer.astro, plus an invisible `<!-- Cloudflare Web Analytics — ... -->` comment) that renders identically on every page of the entire site, not history-specific content, and isn't covered by this rule as documented — left alone and flagged to the owner rather than changed unilaterally.

New advisory script `scripts/check-em-dashes.mjs` (`npm run content:em-dashes`), scoped to these two collections only, so future content additions get caught rather than silently reintroducing the same drift.

Files: 22 history + 9 hersham content files, `scripts/check-em-dashes.mjs` (new), `package.json` (`content:em-dashes` script).

## 2026-07-26 — Second external accuracy audit (OpenAI): re-verified, all findings already fixed; two gaps in the safety net closed

Owner supplied `factual-audit.md`, an external audit dated 16 July 2026, attributed to OpenAI, flagging: The Dining Room (Hersham) still live in food listings despite dissolution; a fabricated Vue cinema and unsupported "over 60 stores" claim on The Heart Shopping Centre; a cancelled Riverhouse Barn exhibition still shown as "Coming Up"; a past-dated Baby Brunch Club card still shown as "Coming Up"; and the same "over 60 stores" claim flagged again separately.

**This is the same audit already actioned.** Git history shows an identically-dated commit (`a4d5764`, 16 July 2026, "Act on external accuracy audit: fix verified factual errors") that fixed these exact five items in response to what its own message calls "an external audit (ChatGPT)" — same date, same five findings, same wording almost throughout. Rather than assume the supplied file was stale, re-verified all five independently against the live site today: Dining Room absent from both food-and-drink pages, Heart Shopping Centre copy has no cinema/store-count claim (last verified 2026-07-16 against heartshopping.co.uk directly), no Scottie or Baby Brunch Club card on the homepage, and the one live multi-day exhibition on "Coming Up" (Mark Beaumont Photography, 22–26 July) is correctly still showing because its `end` date, not its `start` date, is what the filter checks. All five confirmed already fixed; no content changes needed for the audit's own findings.

**Root cause of the original errors (why they shipped in the first place):** both stemmed from content written before the Content Verification Protocol existed (site launched 26 June 2026; protocol added 16 July 2026, in direct response to the *first* audit). The Dining Room listing had literally shipped with the sentence "Current trading status should be checked before publication" — an unresolved QA note published as if it were finished copy. The build-time `[NEEDS VERIFICATION]` marker gate (added the same day) would not have caught that specific phrasing, since it only matches the literal bracket marker.

**Corrective actions taken this session, beyond re-confirming the fixes:**
1. `scripts/check-verification-markers.mjs` now also hard-blocks the build on a narrow set of editorial/QA meta-commentary phrases ("should be checked before publication", "not yet verified", "TODO:", "[TBC]", etc.) — the exact failure class that let the Dining Room text through. Deliberately kept narrow to avoid false-positiving on legitimate epistemic hedging about historical facts (which the protocol requires) or reader-facing "verify with the organiser" disclaimers (which every event listing carries on purpose). Confirmed both: caught the pattern when tested against wording matching the original incident, and did *not* fire on the About page's "we aim to verify each listing before publishing" policy copy.
2. New non-blocking `scripts/check-stale-events.mjs` (`npm run content:stale-events`) flags any `recurring: true` event whose `start` date has lapsed — the systemic version of the Baby Brunch Club finding. The build-time date filter (in place since 27 June, commit `215c179`) was already correctly hiding lapsed events from "Coming Up"; the actual gap is that a `recurring: true` event only ever carries one hardcoded date, so once it lapses the listing goes silently invisible rather than showing its real next occurrence — nobody was ever told to go re-date it. First run surfaced **9** stale recurring events, not just the one the audit happened to catch.
3. Re-verified and re-dated 7 of those 9 against their live source before committing: Baby Brunch Club, Bowling Club Turn up Tuesdays, Free Community Cinema, Sip & Paint, Thursday Quiz Night and Weekly Quiz Night at The Bear (all confirmed still running via lovewalton.co.uk/whats-on/, same day/time/venue, advanced to their next occurrence) and Pebble Rhymetime at Hersham Library (confirmed via surreycc.gov.uk). **Deliberately left two un-redated**, both correctly per protocol Rule 4 rather than by omission: Storytime at Hersham Library is explicitly term-time-only, and Surrey schools broke up for summer on 22 July 2026 — advancing its date to the next Tuesday would have *created* a new live error (advertising a session that isn't running), the same mistake this whole audit is about. Walton & Weybridge Regatta is an annual fixture already correctly hedged in its own body copy ("Check the official regatta site for next year's dates once announced") — nothing to fix.

**Outstanding:** Storytime at Hersham Library needs re-verifying and re-dating once term resumes (1 September 2026) — it will stay correctly hidden from the live site until then, so this is a content-freshness follow-up, not a live error.

Files: `scripts/check-verification-markers.mjs`, `scripts/check-stale-events.mjs` (new), `package.json` (`content:stale-events` script), 7 event files re-dated.

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

## 2026-07-23 — Apps Court Car Boot Sale visitor guide

New standalone page (not a `places` collection entry — the schema and generic `[slug].astro` template don't support a status panel, pitch-price table, or FAQ, so it's a page-local build following the `riverside-walks.astro` precedent for one-off `/things-to-do/*` pages). Owner's brief was very long (SEO/LLM-optimisation blueprint) but the site's Content Verification Protocol overrides it — treated the brief as a structural template only and independently verified every factual claim this session.

**New file:** `src/pages/things-to-do/apps-court-car-boot-sale.astro`. **New component:** `src/components/EventStatusPanel.astro` — reusable status/last-checked panel (props: status, headline, detail, checkedDate, sourceLabel, sourceUrl) intended for reuse on other recurring-event pages, since none existed before.

**Sources checked this session** (all noted in the page's own "Sources and last-checked information" section too):
- `appscourtfarm.com/carboot`, `/contact`, `/about` — live-fetched via the browser tool (WebFetch returns 403 on this domain). Confirmed current status ("not open this Sunday the 26th of July... on the following week (2nd August)"), gate times (7am–1pm), pitch prices by vehicle class, parking fee (£2), rubbish/prohibited-goods/dogs/accessibility rules, address (Hurst Road, Walton upon Thames, KT12 2EG), phone (01932 244 822) and email (community@appscourtfarm.com).
- Victoria County History (`british-history.ac.uk/vch/surrey/vol3/pp467-475`) and Surrey Archaeological Society — manor ownership history, the 1898–99 demolition/reservoir, the All Souls' Day charity dispute, the "four or five British urns... about 1900" find, and the 1988–89 buried river-channel finding (Surrey County Archaeological Unit).
- `bustimes.org` / Traveline data — found a "APPS" Cardinal Buses route (Hampton Court ↔ Apps Court Farm) but no scheduled journeys and it's absent from Cardinal Buses' own current route list, so it's presented on the page as unconfirmed rather than a reliable transport option.

**Deliberately left unverified / flagged on the page rather than stated as fact:** Apps Court Farm's own "80 acres," "King John visited in the 1200s," and "American army used the land ahead of D-Day" claims — these are the venue's own marketing copy, not corroborated by an academic or archival source found this session, so the page attributes them explicitly to Apps Court Farm rather than asserting them as independently verified history. No lat/lng coordinates were fabricated for the sidebar map — a first draft embedded an unverified OpenStreetMap marker position and was corrected to a plain address + search link.

**Structured data:** BreadcrumbList, WebPage, Place, EventSeries (with one `subEvent` Event only for 2 August 2026, the one date Apps Court Farm's own site currently confirms — no schema generated for unconfirmed future Sundays), FAQPage. All 5 blocks validated by parsing the built HTML with `JSON.parse` — clean.

**Internal links added:** footer "Explore" column, and a callout card at the top of `/things-to-do/index.astro` (that page's `.info-card` class wasn't previously defined locally, so a small scoped style block was added there too).

Verified: `npm run check` (pre-existing unrelated type errors on other pages were caused by a `.astro/content-assets.mjs.tmp` rename race — resolved by rerunning `astro sync`, not a real regression) and `npm run build` (266 pages, up from 265, zero `[NEEDS VERIFICATION]` markers). Page content spot-checked in the browser via `get_page_text` against the dev server.

## Still open
- Apps Court Car Boot Sale page: Cardinal Buses "APPS" route status is genuinely unclear (see above) — worth a follow-up phone check with Cardinal Buses if this page's transport section needs firming up later.
- No images added for the new page (entrance, field, stalls) — the brief asked for original/licensed photography, which the owner would need to supply or commission; none exist in the repo for this venue.
- The "80 acres / King John / D-Day" history claims from Apps Court Farm's own site are flagged on the page but not resolved either way — would need a proper archival/Historic England source to confirm or drop.

## 2026-07-26 — Daily automated status check for Apps Court Car Boot Sale

Owner asked how to keep the car boot on/off status current without a manual daily edit. Two things landed:

**Refactor:** pulled the status panel's data (status, headline, detail, next confirmed date, checked date, source) out of `apps-court-car-boot-sale.astro` and into `src/data/apps-court-status.json`. The page now imports that file and derives its `EventStatusPanel` props and the `EventSeries` JSON-LD's single `subEvent` from it (still gated on a confirmed date existing and status being `on`/`off` — never generated for a guessed date). The page's own permanent content (prices, rules, history, contact info) keeps a separate static `PAGE_VERIFIED_DATE` constant so an automated status update can't silently imply the whole page was re-verified when only the status was.

**Why not a build-time fetch like the FC fixtures loader:** tested a plain `curl` and WebFetch against `appscourtfarm.com/carboot` — both return a Cloudflare "Just a moment..." bot-challenge page (403/JS challenge), not the real HTML. A scripted fetch (which is what any GitHub Actions cron, including the existing `daily-rebuild.yml`, would have to use) cannot get past this. Deliberately did not attempt to script around the challenge, since that crosses into bot-detection bypass.

**What was built instead:** a scheduled Claude Code task (`apps-court-carboot-status-check`, daily at 6:07am local) that uses the Browser pane tools to load the page like a normal visitor (which passes the Cloudflare challenge the same way any real browser does), reads the status banner, and — only on a confident read — updates `src/data/apps-court-status.json`, commits, and pushes to `main` (triggering the existing Cloudflare Pages auto-deploy). Owner explicitly chose "fully automatic" over a review-first alternative. Safeguard built into the task prompt: on a failed/ambiguous read, only `lastCheckSucceeded`/`lastCheckNote` are touched — the last good status, headline and dates are never overwritten with a guess or blank.

Verified: `npm run check` and `npm run build` clean after the refactor (266 pages), all 5 JSON-LD blocks on the page still parse. Unrelated in-progress files in the working tree (`src/content/history/abc-motors-hersham.md`) were left uncommitted, as before.

## Still open
- The scheduled task's first live run hasn't happened yet — worth checking its first day or two of output to confirm the browser-based read and git push both work end-to-end unattended.
- If Apps Court Farm ever changes the wording/structure of their status banner significantly, the task relies on the model reading it sensibly rather than a fixed pattern — no code to update, but worth a spot-check occasionally.

## 2026-08-23: Not-for-profit positioning, Featured Listing renamed to Enhanced Listing, new Enhanced Listing page

Owner's brief: make the directory's and events section's not-for-profit, community purpose unmistakable, rename the "Featured Listing" tier to "Enhanced Listing", and publish a page explaining how to submit one. No listing or event submission may read as a paid service anywhere on the site. The site is explicitly *not* to be described as a charity (it is not one), only as independent and not for profit.

**Positioning.** `/advertise-your-business/` previously carried a "Featured Listing" tier whose note read "Pricing to be announced, contact us for early-adopter rates", plus a sidebar line saying "Featured listings are promoted within the directory UI". Both are gone. Standard and Enhanced now both carry a FREE badge, and a callout above the tier cards states plainly that there is no charge, that the site is independent and not for profit, that Enhanced will always be free, and that every submission is manually reviewed. The "About the directory" sidebar copy was replaced verbatim with the wording the owner supplied. The URL was deliberately left unchanged: the owner chose to preserve it for SEO, and no visible heading or link text on the site says "advertise" any more.

**Featured vs Enhanced.** The `featured` boolean on the `businesses` collection was never sold. It is Darren's own editorial pick and drives the homepage "Local Highlights" section plus a per-card badge. Renaming it to mean the new tier would have handed Enhanced Listings homepage promotion and preferential placement, which directly contradicts the brief's rule that Enhanced gets no ranking advantage. So the flag keeps its name and its data (7 businesses, untouched), and only the visible badge label changed from "Featured" to "Local highlight" in `BusinessCard.astro` and `directory/[slug].astro`. No schema change, no migration, no content edits to any business file. `places` and `attractions` also carry an unrelated `featured` flag; neither renders a "Featured" label, so both were left alone.

**Scope decision.** Copy and the new information page only. The `businesses` schema has no fields for custom video, review or booking links, and no business has applied for an Enhanced Listing yet, so adding and rendering those fields would have been speculative. Agreed with the owner to defer until there is a real application to render. See "Still open".

**New page:** `src/pages/directory/enhanced-listing.astro` at `/directory/enhanced-listing/`. Static route, so it takes precedence over the sibling `[slug].astro` dynamic route (no business slug collides with `enhanced-listing`). Carries its own title, meta description and BreadcrumbList JSON-LD. Explains what is included, how to qualify via the reciprocal badge, that the badge must link to the individual listing rather than the homepage, a worked HTML example, and an application checklist. It states explicitly that Standard Listings and event submissions never need the badge.

**Badge assets:** the three supplied variants in `OneDrive/Pictures/logo` were re-encoded with sharp into `public/images/badges/`. Full-size PNGs are kept at their original pixel dimensions (1254x1254 for blue and transparent, 1262x1246 for mono, no crop or resize) and offered as downloads, dropping from 1.2 to 1.8 MB each to 269 to 431 KB through compression alone. A proportionally resized 560px WebP of each is used for the on-page preview. Badge wording is untouched: "Featured" is still correct on the artwork, it is just no longer the name of the tier.

**Free events.** `/whats-on/` gained an `id="submit-event"` anchor and its CTA now leads with "List your local event for free" and the owner's supplied wording. Linked from the footer, the homepage about strip, `/about/` and `/advertise-your-business/`.

**Contact form.** The submission route is unchanged (the existing Formspree form). Two subject options were added, "List my business (free)" and "Enhanced Listing application", and "Advertising / list my business" was retired. A small `is:inline` script now reads the `?subject=` query parameter and preselects the matching option. Links across the site have been passing that parameter for a long time and nothing was reading it, so those CTAs were silently landing on "General enquiry". The script also maps the listing pages' existing `?subject=Listing edit: <name>` format onto the "Suggest a listing edit" option and prefills the message box.

**One real bug found and fixed:** the shared `.btn` rule in `global.css` is `white-space: nowrap`. The new "Learn how to submit an Enhanced Listing" CTA is much longer than the "Get in touch" label it replaced, so it could not wrap and pushed `/advertise-your-business/` 30px wider than a 375px viewport. Fixed with a scoped `white-space: normal` on `.tier-card .btn` plus `min-width: 0` on the grid children, rather than by weakening the global button rule or shortening the CTA the brief specifies. Verified 0px horizontal overflow at 320, 375, 414, 768 and 1280px on all seven affected pages.

Verified: `npm run check` clean, `npm run build` clean (prebuild verification-marker and annual-events checks both pass, `/directory/enhanced-listing/index.html` generated). Checked in the browser against the dev server: heading order valid with no skipped levels, all 8 focusable elements on the new page are native anchors with tabindex 0 and distinct accessible names, all three badge images load at their original dimensions with no distortion, alt text is "Featured on Walton-on-Thames.org" on all three, and no console errors. Pre-existing in-progress Things to Do work in the tree was left uncommitted and untouched.

## Still open
- Enhanced Listing content is described but not yet renderable. When the first application arrives, `businesses` will need optional fields (custom description, extra photos, video embed or link, review and booking URLs) and `directory/[slug].astro` will need to render them. Deliberately deferred, not forgotten.
- The site carries em dashes in a lot of older copy. The brief bans them, but rewriting untouched paragraphs was out of scope, so only new and amended copy is em dash free. Worth a separate sweep if the rule is meant site wide.
- `/advertise-your-business/` keeps its URL by choice. If it is ever renamed for semantics, six internal links plus a 301 in `public/_redirects` would need updating.

## 2026-08-26: Photographs added to /walton-on-thames-railway-station/

The page was text-only. Darren supplied ten of his own photographs of the station in `OneDrive/Pictures/Walton Station`, and nominated `walton-on-thames-station-from-footbridge-night.jpeg` as the header image. Eight of the ten are now on the page; the two omissions are near-duplicate second frames (`walton-on-thames-station-sign-platform-2.jpeg` is the same totem shot as `walton-on-thames-station-sign.jpeg`, and `walton-on-thames-station-platform-2-footbridge-view.jpeg` was taken two seconds after `walton-on-thames-station-platform-2-footbridge.jpeg` from the same spot).

**Assets.** Re-encoded with sharp into `public/images/station/`, original basenames kept, WebP q78 (hero q80). Sources were 1.9 to 4.6 MB JPEGs at up to 5712x4284; outputs are 53 to 284 KB at 1000 to 2048px wide. The header image is a separate 16:9 crop (`-hero` suffix, 2048x1152) taken from the 4:3 night frame so it works both as a `cover` background and as the Open Graph image. The `underpass` source carried EXIF orientation 6 and is baked upright via `.rotate()`.

**Header.** `.page-hero` was replaced with a `.station-hero` block modelled on the existing `.hersham-hero` pattern in `things-to-do/hersham.astro`: absolutely positioned `object-fit: cover` image, navy gradient overlay, content above it. The overlay is lighter than Hersham's (0.45 to 0.82 rather than 0.55 to 0.88) because the night photograph is already dark. `object-position: center 62%` keeps the platform band, not the sky, in frame when the hero is short. The page also now sets the BaseLayout `image` prop, so it has a real social card instead of `og-default.jpg`.

**Breadcrumb contrast fix.** `.breadcrumbs` in `global.css` is slate on the assumption of a light background, which was already marginal on the solid-navy `.page-hero` and would have been unreadable over a photograph. Overridden to white at 80% inside `.station-hero-content` only, rather than changing the global rule.

**Placement.** One figure per major section rather than a gallery: the National Rail totem in the intro, Platform 2 under "Platforms and destinations", a train at the platform under "Trains", the subway under "Station entrances and layout" (directly beneath the sentence saying it is not the accessible route), the footbridge and lifts under "Accessibility", Platform 1 viewed across the out-of-use centre platform under "History", and the footbridge mid-construction under "The 2024 Access for All project".

**Captions are dated from EXIF, and two of them changed what the caption could claim.** `walton-on-thames-station-platform-2-footbridge.jpeg` is 23 December 2023 and `walton-on-thames-station-footbridge-from-platform-2.jpeg` is 23 March 2024, both before the Access for All scheme was formally opened on 30 August 2024. Contractors' fencing is visible in the December frame. Neither caption therefore describes the lifts as in service; the March one says explicitly that it predates the opening by five months. Alt text describes only what is visible in each frame. Platform numbering was checked against the blue "2" sign legible in the night photograph rather than taken from the filenames alone.

Verified: `npm run check` shows no errors in this file (the 200 repo-wide errors are pre-existing elsewhere and untouched), `npm run build` clean, all eight WebPs present in `dist/images/station/`, all eight `<img>` elements resolve and decode in the browser, `og:image` renders as an absolute URL. Zero horizontal overflow at 375px and 1280px; every `<img>` carries `width`/`height` so the figures reserve their space before the lazy load resolves.

## Still open
- Two supplied photographs are unused (`walton-on-thames-station-sign-platform-2.jpeg`, `walton-on-thames-station-platform-2-footbridge-view.jpeg`). They are near-duplicates, not rejects; if a second station page ever needs art, they are the obvious source.
- The two footbridge photographs are now 20 and 32 months old and show the structure before opening. A current shot of the finished bridge and lifts in service would let the Accessibility figure show the facility as it actually is today.

## 2026-08-26: New page, /hersham-railway-station/

Hersham had no station page. Darren supplied a research draft; this entry records what was published from it, and what was not.

**Placement.** `src/pages/hersham-railway-station.astro`, mirroring `walton-on-thames-railway-station.astro` rather than sitting under `/hersham/`, so the two station guides are siblings at the same level. `docs/site-audit.md` carries no ADAPT or MERGE entry for a Hersham station page, so this is a genuine new page rather than a rebuild.

**What the sources actually supported.** Verified this session against Tier 1 sources: step-free category C with no step-free access anywhere on the station, ticket office hours, part-time staffing with assistance from the guard rather than station staff, no car park, no toilets, four unsheltered cycle spaces with CCTV, smartcard issue and loading, no Oyster and no contactless validation, and the full postal address (National Rail and South Western Railway station pages). Walton Park car park detail, 147 spaces including three accessible bays, charging hours, free Blue Badge parking and no bank holiday charge, came from Elmbridge Borough Council. The bus table, stop letters, frequencies, the 15 to 20 minute walk to the village centre and the absence of a taxi rank came from the National Rail onward travel poster (V16.0, data correct November 2025), read directly rather than taken from the draft.

**The draft's bus table was wrong in two places** and the poster corrected it: Field Common estate is served by 514 *and* 564, not 514 alone, and Hersham Village is served by 514 *and* 564 from stop B, not 564 alone.

**Usage figures went back to source.** The draft's ORR numbers were right but traceable only to Wikipedia, which the Content Verification Protocol rules out as a sole source. Pulled ORR Table 1410 and Table 1415 directly: 722,278 entries and exits in 2024/25 confirmed, plus three things the draft did not have. Hersham ranks 694th nationally; London Waterloo accounts for 363,658 of its journeys, roughly half; and the 2018/19 figure of 857,684 is the highest in the series back to 1997/98, leaving 2024/25 still about 16 per cent below pre-pandemic use. The page now leads the section on that recovery gap rather than on a bare total.

**History is Tier 2, sourced and attributed in the copy.** Opening on 28 September 1936 rests on *The Railway Magazine*, November 1936, and G. T. Moody's *Southern Electric, 1909-1979*, via kentrail.uk, corroborated by Wikipedia; the same source gives 15 miles 73 chains from Waterloo, the timber 550-foot platforms, and electrification (trial 1 November 1936, full public service 4 July 1937). Exploring Surrey's Past returns 403 and could not be used.

**Deliberately omitted: journey times, platform-by-direction allocation and service frequency.** The draft carried all three. None could be verified in this session, because the work ran overnight and National Rail returned no services within two hours; Real Time Trains is behind a bot check. Rather than hedge unverified numbers into the copy, the page says plainly that it does not print them and sends readers to the live journey planner, the same stance the Walton page takes on first and last trains. This is the single biggest gap and the first thing to fix.

**Internal links.** `/hersham/` had the sentence "Hersham station sits on the South Western Main Line" with no link on it; it now links here, and the "Walton-on-Thames station" link in the same sentence was pointing at `/getting-here/` rather than the station guide, which is fixed. `/getting-here/` gains a Hersham station link alongside the Walton one. Both new links carry the no-step-free-access caveat, because sending an unwarned reader to this station is the main way this page could do harm.

Verified: `npm run check` shows no errors in the new file (only the same `astro(4000)` JSON-LD warnings the Walton station page produces; the 200 repo-wide errors are pre-existing and untouched), `npm run build` clean, `npm run seo:validate` all checks passed across 378 pages, `npm run seo:links` reports zero links to non-existent pages, page present in `dist/sitemap-0.xml`, and TrainStation, BreadcrumbList and FAQPage JSON-LD all render. No em dashes in the published copy.

## Still open
- **Journey times, platform allocation and frequency are absent.** Verify against National Rail or Real Time Trains during running hours and add them. Until then the page is noticeably thinner than the Walton one on the question most readers arrive with.
- **Seating is genuinely disputed between official sources.** SWR lists a seating area; National Rail lists both seating and a sheltered waiting area as unavailable. The page says so openly rather than picking a side. A site visit settles it.
- **Toilets need a look on the ground.** SWR states plainly that there are none, and the page follows SWR. National Rail's facilities list is ambiguous when read automatically, so this is worth eyeballing at the same time as the seating.
- **No photographs.** `OneDrive/Pictures/Walton Station` holds ten images, all of Walton-on-Thames. A Hersham shoot should prioritise the stair-only entrances, since the accessibility limitation is the page's most important fact and is currently carried entirely by text.
- **Tap2Go is not claimed.** The draft said Tap2Go works at Hersham; SWR's station page does not mention it, so the page says nothing about it rather than asserting it.

## 2026-08-26: Journey times and platforms added to /hersham-railway-station/

Closes the biggest gap left by this morning's build. The page shipped without journey times, platform allocation or frequency because the overnight session could not verify them: National Rail returned no services within two hours, and Real Time Trains sits behind a bot check. Re-checked at 09:30 on Wednesday 26 August 2026, with trains running.

**Verified from National Rail live departures and service details**, covering the 09:19 to 11:21 departures in both directions. Platform 1 is the London direction, Platform 2 the Woking direction, both confirmed on the board rather than inferred. Waterloo trains leave at roughly 19 and 49 minutes past and take 33 minutes, calling at Esher 3, Surbiton 8, Wimbledon 16, Earlsfield 19, Clapham Junction 23, Vauxhall 28. Woking trains leave at roughly 21 and 51 minutes past and take 17 to 18 minutes, calling at Walton-on-Thames 3, Weybridge 6, Byfleet &amp; New Haw 9, West Byfleet 12. Two trains an hour each way. Every observed Woking service terminated at Woking.

**The draft's "fastest journeys around 26 minutes" is not supported and has not been published.** Every Waterloo service on the board ran 33 minutes with an identical seven-stop calling pattern. That is structural rather than a quirk of the morning: the two fast lines through Hersham have no platforms, so a fast train physically cannot call here. The page now says so, which turns an absence into an explanation.

**Also updated.** `/getting-here/` and `/hersham/` both carried "at least two trains an hour to London Waterloo", which was vague where it can now be exact; both now give the frequency and the 33 minute journey. The `/getting-here/` Hersham card gains a step-free warning and a link to the station guide, which it lacked.

First and last train times are still not stated, consistent with the Walton page.

Verified: `npm run check` no errors in the changed files, `npm run build` clean, `npm run seo:validate` passed, `npm run seo:links` zero broken internal links. No em dashes in the new copy.

## Still open
- **Seating and toilets still need a site visit.** Unchanged from this morning: SWR lists a seating area, National Rail lists seating and sheltered waiting as unavailable, and the toilet position is worth eyeballing at the same time.
- **Still no photographs of Hersham.** The stair-only entrance remains the most important fact on the page and is carried entirely by text.
- **The pattern was sampled on one weekday morning.** It held across every service on the board, and the copy says as much rather than implying a timetable-wide guarantee, but evening and Sunday patterns have not been checked.

## 2026-08-27: Khyber Pass listing photographs, and image support across the directory

Khyber Pass supplied ten photographs and replacement copy for `/directory/khyber-pass/`. Nine are now on the page. The tenth, `P1195619.RW2`, was withdrawn from the source folder mid-session.

**The directory had no image support at all.** `images` existed on the `businesses` schema but `directory/[slug].astro` contained no image markup and every listing had `images: []`, so nothing had ever exercised it. `BusinessCard.astro` was the exception: it already rendered `images[0]` as a card thumbnail, falling back to a 🏪 placeholder.

**Schema.** `images` changed from `string[]` to objects carrying `src` and `alt`, plus an optional `caption`, because a bare path array cannot hold alt text and these are photographs, not decoration. Added `image_credit`, rendered once beneath the gallery. Only the `businesses` collection changed; `places` still carries `string[]`.

**That change broke the card thumbnails, and it would have shipped.** `BusinessCard` does `images[0]` and passes the result straight to `src`. With objects that renders `src="[object Object]"` — a broken image, not the placeholder. The component is used on ten pages and is fed `businesses` images from six of them and `places` images from two, so the two shapes now coexist by design. The fix normalises both (`typeof first === 'string' ? first : first?.src`) rather than forcing `places` to migrate, and takes the opportunity to use the image's own alt text instead of the business name, which was a weak description of a photograph. Caught only because Darren asked whether the directory thumbnail would update.

**RAW files.** Two of the supplied images were Panasonic `.RW2` at ~32 MB, including the shopfront and the sign. sharp cannot decode RW2 and no converter is installed. Both carry a full-resolution 6000x4000 JPEG as an embedded preview, extracted by scanning for the JPEG SOI/EOI markers and taking the largest stream, so nothing needed installing and no quality was lost. Worth remembering for future owner-supplied RAWs.

**Header image.** The sign was nominated first, then rejected on sight. The reason was legible once candidates were rendered with the actual overlay composited: the sign and the shopfront both carry large lettering of their own, so the H1 lands on a second wordmark. The dishes photograph fails differently, its white background flattening to grey under the navy gradient. The wider dining room shot won because its left third is dark and uncluttered, which is exactly where the heading, badges and breadcrumbs sit. Its 16:9 crop is the hero and the OG image; the uncropped duplicate was dropped from the gallery so the same frame does not appear twice.

**Copy and facts.** The owner's copy claims "Recognised as Contemporary Indian Restaurant of the Year by the Southern Curry Awards", while the certificate in the awards photograph reads FINALIST. Both are true and the claim stands: Surrey Live reports the restaurant was named Contemporary Indian Restaurant of the Year at that ceremony, held 4 May, and the certificate dates it to 2026. Citation recorded in the listing's `source` field. The closing social-media line ("📍 Walton-on-Thames | Award-Winning Indian Dining | ...") was dropped as out of register; the location and category already render as hero badges.

**Dead link fixed.** `website` pointed at `khyberpasswalton.co.uk/terms`. That domain does not resolve at all, so the listing had a dead outbound link. Corrected to `https://www.khyberpassinwalton.co.uk/`, confirmed with the owner.

**Type fix, beyond scope but caused by touching the file.** `Astro.props` in `directory/[slug].astro` inferred as `never`, so every `biz.data.*` reference reported ts(2339) and the seven references this work added made it worse. A `Props` type plus a `ListingImage` annotation took that file from 46 errors to 1 (the remaining one is pre-existing, inside `getStaticPaths`), and the repo from 200 to 155.

Verified: `npm run build` clean, `npm run seo:validate` passes on all 378 pages, nine images ship to `dist/`, no `[object Object]` anywhere in the output, 128 directory cards render as 1 photograph and 127 placeholders, and the thumbnail also appears on `/food-and-drink/` and `/food-and-drink/restaurants/`. No horizontal overflow at 375px or 1280px. Listings without images emit byte-identical markup to before.

## Still open
- Only Khyber Pass has photographs. Every other listing is one frontmatter block away from the same treatment, with no template work needed.
- The gallery crops to a uniform 4:3 with `object-fit: cover`, which keeps the grid level across mixed portrait and landscape sources but crops the two vertical kitchen shots hard. A lightbox, or per-image natural ratios, would recover them if photograph-heavy listings become common.
- `award` is not expressed in the `Restaurant` JSON-LD. Now that an award is verified and sourced, an optional `awards` field on the schema would make it eligible for rich results.

## 2026-08-31: The Swan of Walton, and fuller bibliographic detail in the sources block

`/history/swan-symbol-walton-on-thames/` published from Darren's drafted text: the recurrence of the swan in Walton from Humphrey de Bohun's counter-seal of 1301, through an 1864 regatta trophy and the 1946 Walton and Weybridge arms, to Rydens School, HWM, the two clubs and Walton Business Group. The central claim is recurrence, not continuity, and the evidence table exists to keep it that way.

**The sources schema could not carry the article's references.** The draft cited DNB entries with editors and volume numbers, journal articles with issues and page ranges, books with places of publication, and news items dated to the day. `sources` held only author, year, title, publisher, url and accessed, and Zod strips unknown keys silently, so the build would have passed while dropping every one of those fields from the rendered list. Added `container`, `journal`, `editor`, `volume`, `issue`, `pages`, `place`, `date` and a `work` boolean, all optional, and moved Harvard assembly out of the template into `sourceParts()` in `HistoryArticle.astro`.

**The italic/quoted decision is the awkward part.** Harvard italicises a standalone work and quotes a part of a larger one, and no combination of the existing fields distinguishes Fox-Davies's *Heraldic Badges* on archive.org from a council web page that happened to record a publisher. Hence the explicit `work` flag. The fallback, `!url && !container && !journal`, reproduces the old print-only behaviour exactly, which is why no existing article needed the flag added.

**Backward compatibility was verified, not assumed.** `sidney-road.md` turned out to hold nine sources carrying both a url and a publisher, plus one carrying neither, so the imprint is suppressed unless the entry is standalone or sits in a container. Six existing articles' sources blocks were diffed byte-for-byte before and after: all identical. One latent bug fixed on the way, a publisher ending in a stop ("Smith, Elder & Co.") rendering a doubled full stop.

**The trophy photographs beat the auction catalogue.** Invaluable describes "a swan above crossed oars". The supplied photographs show the swan inside a roundel lettered WALTON ON THAMES REGATTA with the oars crossed behind it, and, more usefully, an inscription reading LOCAL GIGS above and the winning crew below: E. R. Kennedy and F. A. Stringer, with A. Payne as cox. That moves the object from "silver of the right period" to a prize actually competed for and awarded. It still carries no year, so the caveat against tying it to the 1864 regatta stands, and the hallmark still dates only the silver.

**Images.** Six supplied files converted to webp (the Barons' Letter plate 4.0 MB to 83 KB). Attribution sits in the figcaption, following the precedent set by the Mount Felix photographs. The originals stay in `public/images/history/Swan/` but are deliberately untracked, so they neither reach the remote nor deploy; that folder also holds a file explicitly named do-not-use, which is exactly the sort of thing that should not become a public URL.

Verified: `npm run build` clean, 375 pages, all eight images 200 in the dev preview with no console errors, 35 sources rendering with volumes, editors and page ranges intact.

## Still open
- **The club badge montage has no image.** Walton AC and Walton & Hersham FC logos need permission; the slot is an HTML comment in the body, and that comment ships in the page source.
- **The Rydens School badge is to be supplied.** The section currently carries no illustration of the swan-and-eagle badge it describes.
- **Walton Business Group's logo rests on its Facebook page.** Darren confirms it first-hand and the company was dissolved in 2023, but no independent record of the logo has been located.

## 2026-08-31: Hersham hub rebuilt to compete for the head term

Darren's goal: rank first for "hersham", "hersham village" and "hersham surrey", and make the hub and the content leading from it more comprehensive than the Grokipedia article on Hersham.

**Search Console baseline, recorded before deploying (query contains "hersham", last 3 months to 31 August 2026):** 1,760 impressions, 8 clicks, 0.5% CTR, average position 18.6. The reading is that demand and visibility already exist and position is the constraint: 18.6 is page two, where a 0.5% click rate is unremarkable rather than a presentation failure. Note the filter is a *contains* match, so it pools "hersham station", "hersham library" and similar alongside the head term; the head term alone is likely worse than 18.6. Re-measure against this in four to six weeks. Extension Section 6 predicts the Hersham head term moves faster than the Walton one, and this is the figure that tests it.

**Diagnosis.** The hub was a faithful build of extension 4.1 and not neglected: 967 words, the six specified H2s in order. The gap was structural. It carried no dynamic content, linked to twelve of the site's twenty Hersham pages, and sat on a corpus of roughly 23,800 words across those pages, four and a half times the 5,302-word Grokipedia article. Surfacing, not depth.

**What the competitive check found.** Grokipedia's article is AI-generated and self-described as "fact-checked by Grok 7 months ago", which makes it Tier 3 under Rule 1 and never usable as a source; its 89 references are a useful map to primary sources and nothing more. The real rival is hershamvillage.co.uk, which holds an exact-match domain for "hersham village" and publishes actively on local planning. Its events calendar reads "Coming Soon", which is the gap this work takes.

**Rejected approach, recorded because it nearly shipped.** The first plan was to make the hub work like the site homepage, with card grids of attractions, businesses and history articles. Darren asked whether that would sit coherently against the homepage, and checking the docs showed it would not: the full card treatment belongs to the spokes under the five duplication controls documented at the top of `things-to-do/hersham.astro`, so a homepage-style hub would have cannibalised `/things-to-do/hersham/`, `/hersham/food-and-drink/` and `/hersham/history/`. The hub routes; the spokes hold the cards. Extension 4.1 now says so explicitly.

**Built:** a grouped link grid covering all eighteen Hersham destinations, which surfaced two pages the hub had never linked (Hersham Lodge and Hersham Place, and the ABC Motors article); a Hersham-only upcoming events block, the one genuinely fresh element and a view nothing else on the site offers since `/whats-on/` is unfiltered; FAQPage JSON-LD and the visible FAQ markup now generated from a single array; and an enriched `Place` entity with `alternateName`, `geo`, `containedInPlace`, `image` and `sameAs` to Wikipedia and Wikidata Q5744439.

**One bug caught mid-build.** A fifth FAQ was added to the data while the visible markup still held four hardcoded questions, which would have published FAQPage schema containing a question absent from the page. Both now render from the same array, which is the only reliable guard.

**Factual correction.** The page claimed "around 12,400 people live here, according to the 2011 census". ONS Census 2021 built-up area data for Hersham (E63005239) gives 12,630 in 2021 and 11,260 in 2011, so the figure was wrong on both the number and the year. Extension 4.1 carried "around 12,600" and has been corrected too.

**Internal linking audited, no action needed.** Extension Section 5 requires every Hersham page to link back to the hub. All eighteen do, with a contextual link on top of breadcrumb and nav on the feature articles.

Verified: build clean, `seo:validate` passes on 374 pages, all nineteen grid links return 200, FAQ count matches between markup and schema, no horizontal overflow at 375px or 1280px.

## Still open
- **`/hersham/development-and-planning/`** is the next spoke and the highest-value one: Berkeley's Technology Park scheme, Shaping Hersham, Hersham Park, Green Belt constraints, and the April 2027 unitary reorganisation. It is the ground the exact-match-domain rival is strongest on. No spec section exists for it, so extension 4.11 must be written before the page, and every figure needs Elmbridge and Surrey County Council sources rather than the Grokipedia summary. The Charter already settles the editorial stance: contested local matters may be covered, but evidence must be distinguished from advocacy and opinion clearly labelled.
- **`/hersham/living/`** second: schools with Ofsted ratings, GP and pharmacy, buses 515 and 715, council services. Much of it exists but is Walton-scoped.
- Live planning statuses go stale silently, the same failure mode `check-stale-events.mjs` exists to catch. Date-stamp every status line and put the page on a review cadence.
- The hub's `Place` entity could add `containsPlace` for Burwood Park and Whiteley Village.

## 2026-09-01: A second 1864 regatta trophy

Bishop and Miller Auctioneers' photograph of a second Walton-on-Thames Regatta prize added to `/history/swan-symbol-walton-on-thames/`. **Permission granted by the auctioneers**, credited in the figcaption as "Photograph courtesy of Bishop and Miller Auctioneers" and cited in the sources block. This is the one third-party image on the page that is cleared rather than public domain or our own; the club badges remain withheld for want of exactly this.

**The object is not another view of the jug, it is a different trophy.** A silver goblet raised on a figural stem, its bowl mounted with an applied cartouche rather than carrying an engraving. Enlarging the cartouche resolves it beyond doubt: a swan in a roundel lettered WALTON ON THAMES REGATTA with a pair of oars crossed behind, which is the arrangement engraved on the jug.

**That upgrades the argument rather than decorating it.** One engraved cup only shows what a single silversmith or committee thought suitable on a single occasion. The same device applied to a second trophy of entirely different manufacture points to a badge the regatta used, so the section now concludes that the swan in its lettered roundel was the regatta's own emblem. A new evidence-table row carries the claim and its limits.

**The goblet is not dated here.** The filename and Darren both give 1864, but no hallmark has been read and the lot record was not available, so the prose asserts only the device. The auctioneers' homepage stands in for the lot URL in the sources block.

## Still open
- **The Bishop and Miller lot record.** Its URL would let the goblet be dated and the citation pointed at the lot rather than the firm's homepage.
- **Club badges.** Unchanged: Walton AC and Walton & Hersham FC both need permission, and the FC photograph is held outside the repository.

## 2026-09-01 (later): the 1864 hallmark was on the wrong trophy

Darren supplied the Bishop and Miller lot description: "Victorian silver Walton on Thames Regatta trophy, London 1864, maker EM JM **the goblet trophy** with a crest above the branch column and a gentleman standing with an oar, 19.5cm high, 10.4oz". The URL is the Invaluable link the article had cited since publication.

**That citation was attached to the wrong object.** Invaluable aggregates auction listings, so that record is the Bishop and Miller sale of the goblet. The article had been reading it as the catalogue entry for the jug, and had therefore given the jug a London 1864 hallmark, a maker's mark of EM/JM, and a place "securely belonging to the regatta's early Victorian era". None of that was ever evidenced for the jug. The error was in five places: the standfirst, the opening of the regatta section, the jug's figcaption, the evidence table and the timeline.

**The jug is now undated here.** Its photographs show no hallmark that has been read, so the section says so explicitly rather than borrowing the goblet's date. What the jug still carries, uniquely, is the LOCAL GIGS engraving and the winning crew, which is evidence of a different kind: a prize actually competed for and awarded.

**The correction strengthens the article rather than weakening it.** The swan on the goblet is cast into an applied cartouche, part of the cup's manufacture, so the hallmark dates the device and not merely the metal. That is a firmer 1864 than an engraving could ever be, and it retires the old hedge that the object "cannot by itself prove that the association predates 1946". It now does: the swan, the lettered roundel and the crossed oars are documented more than eighty years before the grant of arms.

Verified: `npm run build` clean, 371 pages, ten images on the page, and none of the three stale phrasings survive in the built output.

## Still open
- **The jug's hallmark.** Reading it from the object would date the second trophy and is now the single most useful outstanding check on this page.
- **Club badges.** Unchanged: Walton AC and Walton & Hersham FC both need permission.

## 2026-09-01: /hersham/development-and-planning/ built to extension 4.11

The first new Hersham spoke since the hub rebuild, and the one identified as highest value: planning is the local subject residents search repeatedly and share, and it is the only ground on which hershamvillage.co.uk was genuinely ahead.

**Built in two halves, deliberately.** The volatile half is machine-maintained: 20 major applications grouped into 14 named sites, refreshed by `src/loaders/planning-loader.ts` on the nightly rebuild. The durable half is written once: the Green Belt position, who decides, how to comment. That split is what makes the page maintainable by one person, and it is why the loader was built and proven before a word of prose was written.

**What the data shows on first publication.** Seven applications awaiting a decision across six sites, including 284 dwellings on land east of Molesey Road, 62 on land south of Burwood Road, the Hersham Place Technology Park hybrid application, and 23 units at the Waterloo Court car park. Recently decided includes the Hersham Green Shopping Centre redevelopment, refused in 2024, which answers a "what happened to" query nobody else covers.

**The context nobody had.** Elmbridge has no up-to-date Local Plan. An inspector found the draft Elmbridge Local Plan 2037 unsound and offered a six-month pause for further evidence; the council instead withdrew it following a Full Council decision on 26 February 2025. A replacement is scheduled for 2025 to 2028, and Elmbridge, Runnymede and Spelthorne have been awarded government funding to procure a joint Green Belt review, with consultants still being appointed. That is the frame every one of these applications sits in, and it was absent from every earlier note in this session.

**Corrections to earlier working assumptions, all from the same bad source.** Research notes taken from the Grokipedia article had said Hersham would fall under a West Surrey unitary authority (it is East Surrey), that Berkeley proposed 280 homes at the Technology Park (that figure belongs to a different site, land east of Molesey Road, and is 284), and that a "Hersham Park" scheme of 221 homes was approved in March 2025 (no such application appears in four and a half years of Large applications within 2km). Three headline claims, none of which survived contact with the council record. Tier 3 in Rule 1 is not a formality.

**Editorial stance.** Per the Charter, the page reports what is proposed and at what stage, links to the council record for every application and to the consultation route, and takes no position. It does not characterise applicants, quantify local opposition or reproduce campaign material. The "how to have your say" section is the most practically useful part: it sets out Elmbridge's own list of material considerations against the things the council explicitly cannot take into account, including perceived loss of property value, which is the objection residents most often waste.

**One validator change.** `scripts/seo-validate.mjs` requires Article schema on any `/hersham/<slug>/` page, with an exception list for curated hubs. This page joins `food-and-drink` and `history` in that list: it has editorial prose but no publishDate or author in the content-collection sense, and an Article `dateModified` would move every night whether or not anything changed. Its freshness signal is the dated status stamp on the page instead.

Verified: build clean, `seo:validate` passes on 371 pages, no new type errors, 3,177 rendered words, 20 applications each linking to the council's own record, FAQ count matches between markup and schema, linked from the hub's Explore grid.

## Still open
- Walton Court on Station Avenue currently assigns to Hersham on the distance rule, but Station Avenue is the Walton side of the railway. Flagged in `content.config.ts` as a candidate for reassignment or an explicit override once the Walton page (section 4.12) exists.
- Applicant names are not shown. PlanIt does not return them and verifying twenty of them against the council record was out of scope for this pass; each application links to the record where the applicant is named. Worth adding for the live schemes only.
- Section 4.12, the Walton equivalent, is specified but unbuilt. Its URL is undecided: Walton has no section parent, so it may belong under `/living/`.

## 2026-09-02: /hersham/living/ built to extension 4.13

Completes the Hersham cluster. `/living/` and its six spokes are all written for Walton, so a resident searching "schools in hersham" or "doctors in hersham" previously landed on Walton pages or nothing.

**Schools are the reason the page exists.** They are the one genuinely uncovered subject: the health, post office and shopping content already sits in the directory and is linked rather than restated, per the duplication controls. All four schools verified this session against their own websites or Ofsted: Bell Farm Primary (Hersham Road, KT12 5NB, community primary with nursery, ages 3 to 11), Burhill Primary (New Berry Lane, KT12 4HQ, nursery to Year 6), Cardinal Newman Catholic Primary (Arch Road, voluntary aided, two-form entry, serving All Saints Hersham and St Erconwald's Walton, part of the Xavier Catholic Education Trust), and Three Rivers Academy (Bell Farm Way, KT12 5EJ, ages 11 to 18, 1,311 pupils, inspected 15 October 2024, Good in all five categories).

**Ofsted ratings are linked, never restated, and the page says why.** Inspections across the four span 2012 to 2024, so any single word would be undated. More significantly, Ofsted's own report for Three Rivers states that from September 2024 it no longer makes an overall effectiveness judgement for state-funded schools. An older "Good" and a newer one are therefore not describing the same thing, and a local guide repeating either without that context would mislead. Same principle the Protocol applies to opening hours: link to the authority, do not restate volatile data.

**Bus routes deliberately not named.** The Grokipedia article claimed routes 515 and 715 serve the village. That source has now been wrong on three separate claims in this cluster, the routes were not verified against Surrey County Council or the operator, and route numbers change. The page links to Surrey County Council's travel information instead. Naming routes is a worthwhile enhancement once checked directly.

**Grokipedia error count for this cluster now stands at four:** West Surrey rather than East Surrey; 280 homes attributed to the Technology Park rather than the separate Molesey Road site; a "Hersham Park" scheme that does not appear in the council record at all; and Three Rivers Academy placed on Hersham Road where Ofsted gives Bell Farm Way. Every one would have shipped as fact had the article been treated as a source rather than a coverage checklist.

Verified: build clean, `seo:validate` passes on 369 pages, no new type errors, 1,611 rendered words, all eight outbound school and council URLs return 200, seven internal directory links, FAQ count matches between markup and schema, linked from the hub's Explore grid. Joins the two other curated Hersham hubs in the `seo-validate` Article-schema exception list for the same reason.

## Still open
- Bus routes serving Hersham are linked rather than named. Verify against Surrey County Council or the operator, then name them.
- Ofsted provider URLs are direct for Bell Farm and Three Rivers, but Burhill and Cardinal Newman link to an Ofsted search rather than a provider page, because their URNs were not established this session.
- Section 4.12, the Walton planning page, remains specified and unbuilt, with its URL undecided.

## 2026-09-02: /development-and-planning/ (Walton), and a fabricated school removed

**A non-existent school was live on the site.** `/living/schools/` carried a section headed "Primary Schools (Hersham)" whose sole entry was "Hersham Primary School, Community school, Ages 4-11". No school of that name exists. The three primaries serving Hersham are Bell Farm, Burhill and Cardinal Newman, with Three Rivers Academy as the secondary, all verified against their own websites and Ofsted the previous day. That entry was the site's entire Hersham schools coverage, so anyone searching for Hersham schools was being given a name that does not exist. Removed and replaced with a correct summary linking to `/hersham/living/`, and the page retitled to Walton, handing the Hersham detail to the village page as agreed.

**The rest of that page has not been verified and should be.** It also lists Rydens Enterprise School as a secondary while omitting Three Rivers Academy, which is what Rydens became; and Heathside, Manby Lodge and Esher Church of England High School read as Weybridge and Esher schools rather than Walton ones. None of those were checked in this session and none were changed: one confirmed fabrication is grounds for auditing the page, not for rewriting entries on suspicion. Treat the whole page as unverified until someone works through it.

**URL decision for the Walton planning page: `/development-and-planning/`, top level.** `/living/development-and-planning/` was the obvious choice and was rejected on inspection, because `/living/` describes itself as covering "Walton-on-Thames, Hersham and Whiteley Village" and `/living/schools/` was titled for both. `/living/` is the whole-area practical hub, not the Walton section, so a deliberately Walton-only page inside it would contradict its own hub. Top level matches `/things-to-do/`, `/food-and-drink/` and `/getting-here/`, each of which sits beside a Hersham spoke rather than containing one. Recorded in extension 4.12; blueprint Section 3's architecture list still needs the new entry.

**The Walton catchment needed two filters Hersham did not.** Of 29 records the distance rule assigned to Walton, only 9 were actually in Walton. Twelve were cross-boundary consultation records that Elmbridge logs for Woking, Guildford and Surrey County Council, which PlanIt geocodes to the logging authority rather than the site, putting schemes in West Byfleet, Woking and Ockham inside the Walton radius. Eight more were Weybridge, Shepperton and Kingston. Without both filters the page would have listed schemes in six places that are not Walton.

**The postal-town filter is the reverse of the assignment rule, deliberately.** Between our own two pages addresses mislead, because every Hersham address reads "Walton-on-Thames", so assignment uses coordinates. Between post towns coordinates mislead: the Oatlands Drive sites carry Weybridge addresses but sit 0.50 to 1.07km from The Heart, nearer than Laurelwood Place at 0.78km and Brownacres at 1.36km, both genuinely Walton. No radius separates them. Every drop is counted and logged in the build output rather than being silent.

**Rendering extracted to `PlanningSchemes.astro`**, per 4.11's "parameterised component, not a bespoke page". Both pages now share the loader and the rendering and no prose.

**Walton has no live applications.** All nine schemes were decided at first build, so the component shows an explicit empty state rather than dropping the section. That is itself informative: Walton is built up, so its majors are redevelopment of existing sites arriving singly, against Hersham's clustered edge-of-village housing pressure.

Verified: build clean, `seo:validate` passes on 370 pages, no new type errors, 2,015 words on the Walton page, 8 schemes and 9 applications each linking to the council record, zero occurrences of Weybridge, Woking, Ockham, Shepperton, Byfleet or Kingston in the output, Hersham page unchanged at 20 applications after the refactor, reciprocal links between the two pages, and a card added to the Living hub.

## Still open
- **Audit the rest of `/living/schools/`.** Seven entries remain unverified after one was found fabricated.
- Blueprint Section 3's architecture list does not yet include `/development-and-planning/`.
- Bus routes on `/hersham/living/` are still linked rather than named.

## 2026-09-03: /history/walton-regatta/ built from Darren's research paper

Darren supplied a Harvard-cited draft on Walton Regatta. Rather than reformatting it, every online source in it was re-fetched this session and the article rewritten around what those sources actually say. Three claims changed as a result, and two sources were dropped.

**The draft repeated an error this site had already corrected.** It described the auctioned 1864 trophy as "a tall silver presentation cup" and gave the jug's crew as "E. R. Kennedy and F. M. Stringer". The 1 September correction on `/history/swan-symbol-walton-on-thames/` established that the hallmarked object is a goblet, 19.5cm on a figural stem with an applied cartouche, and that the jug's engraving reads E. R. Kennedy and F. A. Stringer with A. Payne as cox. The new page follows the corrected position and links to the swan article rather than restating the object argument.

**Team GB was dropped as a source.** Its Townend biography is rendered client-side and returns no biography text to a fetch, so it could not be checked. Olympedia's own John Townend page carries the same Townend Cup claim and is cited instead. The draft's Environment Agency claim that Walton Reach Regatta runs on the Sunbury reach was thin in the summary notice but is stated exactly in the full notice: "Sunbury reach, Walton Rowing Club to the Black Swan Sea Cadets".

**Two findings are new to the site, from primary material the draft cited but had not read.** The 1949 *Thames Rowing Club Journal* is a scanned PDF with a text layer; extracting it and checking the two relevant pages against rendered images gives the 11 June 1949 programme, the six cups Thames entered, and the margins (beat Westminster Bank by 1¼ lengths, lost to Quintin by 3 feet), all on p. 9. Page 23 explains where one of those cups came from: Thames had begun lending its own club plate to regattas, and "a second and very handsome silver-gilt cup has been loaned to Walton Regatta to be used as a cup for the Senior Pairs". A Walton challenge cup on loan from a London club's silver safe is not in any secondary account of the regatta. The TRC archive also yields exact photograph labels and reference codes for 1920, 1921 and 1934, which is firmer than the draft's paraphrase, and the TRC-RAC-1-3 file turns out to hold booklets for only four years within its 1949-1975 span.

**Walton Rowing Club's own site fails TLS negotiation for WebFetch** (`TLSV1_ALERT_INTERNAL_ERROR` on both www and apex). The Browser pane loads it without complaint, and the club's history page was read there: 1927 formation with Steve Fairbairn as president, and the 1951 lease of the Sunbury Lane plot from the Miskin family trust. That last detail sits beside the Miskin Challenge Cup in the 1949 programme; the page raises the coincidence as a question and explicitly declines to assert a connection.

**Conflicts are shown, not resolved silently.** Weybridge Rowing Club's own 1924 page gives the crew as Joe Barnsley, Vince Bovington, Harry Monk, Jack Townend and Bernard Croucher, against Olympedia's Harry Barnsley, Vince Boveington, Thomas Monk, John Townend and Bernard Croucher. The article follows Olympedia and names the disagreement. The club's stronger claims (first NARA crew selected for the Olympics, subsequent exclusion from Leander) are attributed to the club in the sentence that carries them, since it is writing about its own members.

**The organisers' "held annually since 1862" is treated as institutional continuity, not an unbroken run**, because Stonebanks records lapses before it settled and the Skiff Racing Association records both wars interrupting it. Saying so is the honest reading and costs the page nothing.

Verified: `npm run build` clean at 367 pages, `seo:validate` all checks passed, `seo:links` reports zero links to non-existent pages, no em dashes, metaTitle 40 characters and metaDescription 149, all twenty source entries render correctly through the Harvard assembler. Hub integration: added to the Victorian era list and the Victorian prose on `/history/`, and reciprocally linked with the swan article.

`npm run check` reports 155 pre-existing type errors across the repo (implicit `any` in map callbacks, `never` on news collection entries). None are in the new file or the two files touched; the baseline was already dirty.

## Still open
- **Page locators for Stonebanks (1980) and Hughes (2003).** Both are print, both are Darren's, and neither citation carries a page number. `sidney-road.md` shows the house style with locators; this page should match once the books are to hand. Every Stonebanks-sourced claim on the page depends on it: Walton Town Regatta, River House, Sullivan, the 1897 fête and the moveable finishing line.
- **The 1862 meeting itself.** No contemporary account traced. Surrey and London newspapers for the weeks around it are the next search.
- **The 1924 meeting's formal title.** Olympedia says "the Walton-on-Thames Regatta" under NARA auspices, which is not the same as Walton Amateur Regatta under ARA rules. NARA records at The London Archives (GB 0074 A/NAR) are the best prospect.
- **The change of name.** In use by June 2007; the date and reason are unevidenced.
- **No images.** The page ships without any, because nothing suitable is cleared. Hughes's c. 1908 Mount Felix view and the TRC archive's 1920/1921 prints are both third-party and would need permission.

## 2026-09-03 (later): four images added to /history/walton-regatta/

Darren supplied four images already published elsewhere on the site, with the captions to use. All four are now on the regatta page, and the page is no longer image-free.

**The three trophy photographs** carry the same captions and alt text as on `/history/swan-symbol-walton-on-thames/`, deliberately: they are the same objects making the same argument, and divergent captions for one photograph across two pages is how a caption quietly becomes wrong on one of them. The goblet keeps its "Photograph courtesy of Bishop and Miller Auctioneers" credit, and a rights-record comment now sits above that figure recording the 1 September permission. Bishop and Miller was added to the sources block, which it needed anyway: the article had been citing Invaluable alone for a photograph that is the auctioneers'.

**The aerial photograph's caption had to be adapted.** Darren's text came from `walton-before-the-suburbs.md`, where it reads "the vintage photograph this article is about". That is true there and false here, so the caption now says "a vintage photograph", keeps the original publisher's title and the circa-1920s estimate verbatim, and carries the cross-link to `/history/walton-before-the-suburbs/` that was the point of including it. `walton-before-the-suburbs` was also added to `related`.

**It sits in "Why the river, and why then", the section about the reach itself.** A 1920s photograph illustrating a paragraph about 1862 is a conflation risk, so the caption states its date plainly rather than letting the placement imply one. The alternative placement, "War, and the return of racing", would date better against the 1920 and 1921 Thames RC photographs but would bury the only establishing view of the river two thirds of the way down the page.

Verified: build clean at 367 pages, `seo:validate` passed, `seo:links` zero broken links, all four `<figure>` blocks render with alt text and captions intact, all four files present under `public/images/history/`.

## Still open
- **The aerial photograph has no rights record on either page.** `walton-before-the-suburbs.md` publishes it with no provenance comment and no sources entry, and this page now inherits that gap. It reads as a published vintage view, but the basis for reproduction is undocumented in the repo, which Standards 11.2 requires. Worth fixing at source rather than here.
- Page locators for Stonebanks (1980) and Hughes (2003) remain the largest outstanding item on this page.

## 2026-09-03 (later still): aerial caption reworded on the regatta page

Darren's wording, applied as given: the caption now opens `"Walton-on-Thames and the Walton Mile from the Air": the vintage photograph from around the 1920s.` The descriptive sentence and the cross-link to `/history/walton-before-the-suburbs/` are unchanged.

**Two things about it are worth recording rather than quietly absorbing.** The quoted phrase is no longer the original publisher's caption. The printed caption on the photograph reads "Walton-on-Thames from the Air"; "and the Walton Mile" is our addition, and it now sits inside quotation marks, which Standards 8.5 reserves for the source's own wording. The `alt` attribute still describes the photograph as captioned "Walton-on-Thames from the Air", which is accurate to the object but no longer matches the visible caption, so a screen-reader user gets one title and a sighted reader another. Both are fixed by moving our words outside the quotation marks.

"Walton Mile" also now appears on the page for the first time. It was deliberately kept out of the body text at publication because no source consulted attests it as the reach's name; the draft's "the reach traditionally known as the Walton Mile" was cut for that reason. It is plainly current local usage and the owner's own term, so it stands, but the page still does not introduce or evidence it anywhere in the prose.

## Still open
- **Source the name "Walton Mile."** A club, regatta or navigation document using it would let the term be introduced properly in the body rather than appearing only in a caption.
- The aerial photograph's missing rights record, unchanged from the previous entry.
