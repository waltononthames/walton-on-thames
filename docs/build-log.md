# Build log

## ⚠️ PRE-LAUNCH: site is currently noindexed — MUST REMOVE BEFORE LAUNCH
`public/_headers` sends `X-Robots-Tag: noindex, nofollow` on every response (added 2026-07-03), so the .org domain accumulates no search-engine index history before the site is ready to launch. `robots.txt` deliberately still `Allow: /` — crawling must stay allowed or bots will never see the noindex header and could index the URL anyway via external links, with no snippet. **Delete the `X-Robots-Tag: noindex, nofollow` line from `public/_headers` as the very last step before public launch.** Verify removal by checking response headers on the live domain (`curl -I https://walton-on-thames.org/` should NOT show `x-robots-tag`) before announcing/sharing the site anywhere.

Log of pages built against `walton-seo-blueprint.md` / `walton-history-hersham-extension.md`, in build order. One entry per page. Append only.

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

## Still open
`content/neighbourhoods/*` MERGE work is now fully resolved (see above) — no longer open. The only remaining open item from the entire project is `walton-charity`'s full version, which needs Darren's own archival material to move beyond the provisional public-facts page built above. The broader blueprint spoke pages outside the history/Hersham extension remain their own separate body of work, deliberately not started per the user's explicit "pause here" answer.
