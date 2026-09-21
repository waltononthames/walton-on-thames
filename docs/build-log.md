# Build log

Log of pages built against `walton-seo-blueprint.md` / `walton-history-hersham-extension.md`, in build order. One entry per page. Append only.

## 2026-09-15: 34 verified shops for the Directory, and /shopping/ lists all of them

Darren asked why `/shopping/` showed only two shops, then asked for verified shop listings with pharmacies included. The page filtered on `category === 'shopping'`, which two of 131 listings carried, and the Directory had barely any shops to find, having grown from a restaurant spreadsheet plus the NHS pharmacy and Post Office lists.

**`/shopping/` now groups every shop by what it sells**, in ten sections with jump links. Pharmacies join through their `pharmacy` subcategory and keep their `healthcare` category, which `/living/pharmacies/` depends on. A listing lands in the first group any of its subcategories matches, and an "Other shops" fallback catches the rest; it is currently empty.

**Every one of the 34 was verified this session on the shop's own site or its operator's.** Twenty-two are tenants on The Heart's own store directory at heartshopping.co.uk, the venue's official site. Their descriptions paraphrase The Heart's own store pages and carry no brand claims from memory, and because no store page gives a unit number, each uses the centre address exactly as The Heart publishes it. Aveda and Serenity appear in that directory but are salons, so they are not listed as shops. Eight more were found through Love Walton, the BID's directory, and each confirmed at its postcode on its own website: 99 Bikes, Bridgman, Connect FMH Charity Shop, Country Carpets, Dreams, Hoops Walton, Love Me Do Brides and Slinky Pinks. Love Walton's phone numbers were wrong for two of them, 99 Bikes and Connect, and the shops' own numbers are used. In Hersham, Sue Ryder comes from its own shop page and Waitrose from the John Lewis Partnership's release of 5 February 2026.

**Two supermarkets rest on the Food Standards Agency register, because their own store pages refuse automated reading.** Tesco's Hersham Road store uses the register's address (business 1778391). For the Co-op on Terrace Road the register gives 58-62 and KT12 2SA while the Co-op's own store-finder address gives 56-62 and KT12 2SD, so the listing gives the street only rather than pick one.

**None of the 34 states opening hours.** The operators publish them, but chain hours change often, so each listing links to the shop instead.

Verified: build clean at 455 pages, `seo:validate` passes, `seo:links` reports zero links to non-existent pages, no em dashes, `astro check` down to 153 errors with none on the shopping page, and `/shopping/` renders 43 shops in ten sections.

## Still open
- **Held back because their own sites could not confirm them this session:** Artielli Goldsmiths (its site gives a phone number but no address), Fleur Jewellery and Zebra Boutique (both domains no longer resolve, which may mean they have closed), Rainbow Rising (absent from its charity's own site and from The Heart's directory), Warehouse Outlet and The Local Food & Wine (no website at all), and a second Tesco on Lyon Road (register only). A walk down the High Street, Bridge Street and Church Street would settle most of them.
- **Hersham Green Shopping Centre's other units are mostly unlisted.** Waitrose puts sixteen other retail units in the centre; Sue Ryder and Hersham Pharmacy are the only ones in the Directory.
- ~~`/shopping/the-heart/` still shows only the centre's own card.~~ Done the same day: the page now lists every Directory shop whose address is in the centre, the 22 tenants plus Brightlife Chemist, drawn from the collection so it cannot drift from `/shopping/`.
- **The Heart's tenant list will drift, and it is the only source for 22 listings.** Its store pages carry no dates. Re-check it when the next accuracy audit runs.

## 2026-09-18: Diggers article, obelisk photograph and the last three citations resolved

**Image.** The Soviet obelisk section now carries Darren's copy of the Alexander Garden monument photograph (Wikimedia Commons `File:Obelisque_alexander.jpg`, 17 August 2008, by Mitrius, released into the public domain). Converted to WebP at 900x1200, lazy-loaded with explicit dimensions. The caption gives the date, the 1918 redesign from the Romanov tercentenary monument, the pre-restoration state and the credit, and links the file page. The nineteen inscribed names follow as an ordered list, transcribed from the photograph, which independently confirms the article's "nineteen names" and puts Winstanley eighth, between Meslier and More. One sentence of my own interpretation about the company Winstanley keeps on the stone was written and then removed: it had no source.

**Citations.** Darren settled the three outstanding attributions and authorised the corrections:

- **Hessayon (2023)** added: *The Diggers' Song*, Notes and Queries 70(3), 189-193. The demolition citation is now (Hessayon, 2023, p. 192; Gurney, 2007).
- **Surrey Archaeological Society**: the year was 2001, not 2000. Added: *The Diggers' commemorative stone*, SAS Bulletin 346, 16-17. In-text now (Surrey Archaeological Society, 2001).
- **The miscarriage allegation** is *An Humble Request*, so the citation is now (Winstanley, 1650b/2009; Gurney, 2007). No page number was supplied and none was invented, and the qualification that this is Winstanley's allegation stands.

**The citation check now reports 127 linked and 0 unmatched**, the first build with nothing outstanding. Every reference entry is cited, all ids are unique, and each of the three fixed citations was confirmed to link to its own entry in the built HTML. The SAS bulletin PDF resolves; the Notes and Queries DOI returns 403 to automated requests, as OUP links do.

## 2026-09-18: Diggers article, editor's revision applied

Darren reviewed the full text himself, exported as a single markdown file, and returned an edited version. That text is now what the page carries. It came back markdown-escaped; the escaping was undone, and the tables and reference list were confirmed unchanged before the original table formatting was restored.

The body is about 9,600 words, down from about 10,000, with several passages cut (the Sermon of the Four Candles, the cross-dressing paragraph, the two Francis Drake paragraphs, the Wellingborough chronology paragraph, and a number of closing sentences). Eleven mechanical corrections were applied to the new wording: typos, a dropped word, a broken comparison, an ampersand that would have stopped a citation linking, and "St." normalised to "St". "No national Digger movement" contradicted its own section heading; that was flagged and changed to "organisation" on Darren's instruction. Publication and review dates set to 18 September 2026.

Two things the cuts left open were flagged and then fixed on Darren's instruction: the Francis Drake section had lost both its explanation and its only citations, so the manuscript's two paragraphs were restored as one in the manuscript's own wording, minus the two framing sentences cut in the same pass. That restores Gurney (2007) and Pulford (2000) to the section, leaving *An Humble Request* as the only uncited reference, which is pending the item 3.3 attribution question.

Checks after the revision: build clean including the em dash and marker gates; citation check 124 linked, same 3 unmatched as before; all 7 in-brief anchors resolve; `seo:links` 0 broken; `seo:validate` unchanged (the one pre-existing Ceramics Café failure). Body about 9,700 words. Still not committed or deployed.

## 2026-09-16: The Diggers in Walton-on-Thames and Elmbridge (`/history/diggers/`), implemented locally, not published

Built from Darren's researched manuscript (`diggers-walton-elmbridge-definitive-history.md`) under the accompanying publication brief. The brief makes this an editorial-preservation job, not new research. The manuscript's printed and archival sources were supplied by Darren and were not re-verified, which the brief says is not a blocker. The full record of changes, the citation check and the open questions is in **`docs/diggers-editorial-report.md`**.

**Architecture.** The page is a normal `history` collection entry, so it gets the hub, the sitemap, lastmod and related links like any other article. It sets `layout: longform`, and `[slug].astro` then renders it with the new `HistoryLongform.astro` instead of `HistoryArticle.astro`. The long-form layout adds a subtitle, a standfirst, sticky grouped contents on desktop and a `<details>` contents list on mobile, in-text citations linked to their references, a grouped APA 7 reference list with "back to text", and related reading. All the new schema fields are optional, so every existing article renders unchanged. `src/components/LinkedCitations.astro` and `src/utils/citations.ts` link author-date citations at build time and **log any citation with no reference entry on every build**, which gives the page a standing structural citation check.

**Content.** The manuscript text is preserved: a word-count comparison shows the only differences are the logged ones. Ten internal ChatGPT `filecite` markers were removed; nine resolved and one did not. Citation formatting fixes:
- the orphan suffix in 1649b was removed;
- two Winstanley 1650 citations were disambiguated to *A New-Yeers Gift*, after locating the passages in the Bill of Account in Berens (1906).

Other changes:
- one piece of second-person wording addressed to the editor was removed;
- eight part headings were added;
- "What remains uncertain" and the Conclusion were moved ahead of the tables.

Additions derived only from the manuscript: a "Diggers in brief" box and a "places in the story" table stating how precisely each place can be located. The table stands in for a map, because a drawn map would need coordinates the research does not establish.

**Cross-links.**
- **History hub:** the Tudor & Stuart section gains a sentence and a timeline entry.
- **St Mary's Church article:** new short section on Diggers held in the church, citing Berens (1906), which was read this session.
- **`/hersham/history/`:** corrected. It said the Diggers' story "belong[s] properly to Weybridge, not Hersham". The manuscript shows the Diggers placed George Hill in Walton parish, which then included Hersham. The sentence now gives that framing, without claiming the site is in modern Hersham, and links to the new page.

**Open VERIFY items (for Darren, detail in the report):**
- **Hessayon 2023:** missing reference entry.
- **Surrey Archaeological Society 2000:** missing reference entry.
- **Winstanley 1650/2009 (miscarriage allegation):** ambiguous between *New-Yeers Gift* and *Humble Request*, left unlinked.
- **Unresolved marker `turn44file14`:** the WWLHS bibliographies claim.
- **Quotation spellings:** "George-Hill" and "True Commonwealths Freedom" should be checked against Corns et al.; Berens modernises them.
- **Uncited table rows:** several chronology and key-people rows carry no citations.
- **Publication decisions:** dates set to the implementation date, byline, image rights, and the Section 20 sign-off.

**Checks.**
- `npm run build`: clean, including the em dash and verification-marker gates.
- Citation check: 128 linked, 3 unmatched (the three above).
- `seo:links`: 0 broken internal links.
- `seo:validate`: one failure, on `/directory/ceramics-cafe-hersham/`, unrelated and pre-existing.
- `astro check`: no errors from the new files; the 156 remaining errors are pre-existing collection-typing errors.
- Browser checks (`npm run preview`):
  - desktop and 375px mobile, with no page-level horizontal overflow and tables scrolling inside their own containers;
  - anchors clear the sticky header;
  - citation → reference → "back to text" works.
- A mobile overflow bug was found and fixed during the check.

`src/data/lastmod.json` has no entry for the page until it is committed.

## 2026-09-15: corrections from the 14 September 2026 accuracy audit

Darren supplied the weekly audit: thirteen findings, two High, ten Medium, one Low. Every finding was reproduced against `origin/main` before anything changed, and every replacement fact was fetched this session. Where a source could not be read, the claim was narrowed or left alone rather than rewritten from a search snippet.

**H1 and H2 were one defect.** `whats-on/[slug].astro` took the date from `start` and attached `end`'s clock time to it regardless of day, so Pantoland read "Thursday, 17 December 2026 · 19:30 – 16:30" and every exhibition showed only its opening day. `EventCard` never received `end` at all. Eleven listings on main end on a later day. The new `src/utils/eventDates.ts` works from the raw ISO strings, so no day can shift with the build machine's time zone, and it separates three shapes: a single day; an overnight occasion that ends the next day earlier on the clock (the Surrey Soul party, 20:00 to 01:00), shown on its start day with times; and a multi-day run or exhibition, shown as a date range with no single time span, the Times row pointing to the description. The event page, its title tag and all three `EventCard` call sites use it. `npm run test:events` runs ten regression cases taken from real listings, both audit examples among them. It needs Node 23.6 or later to import TypeScript, so it is deliberately not in prebuild, where Cloudflare's Node version would decide whether the site builds.

**The five Cecil Hepworth Playhouse runs carried invented finishing times.** Pantoland, The Shakespeare Revue, Robin Hood and the Babes in the Wood, Shrek the Musical and Hadestown each had an estimated closing time in `end` and a sentence admitting it. Their `end` is now date-only and the sentence is gone; each body already lists its performance times.

**M1, Stirling Moss.** Motor Sport (Hughes, 13 April 2020) supports the narrower claim: his Formula One World Championship debut at the 1951 Swiss Grand Prix in an HWM-Alta Formula Two car, eighth and first in the Formula Two class, after joining HWM's Formula Two team in 1950 and finishing third at Bari in a non-championship race. Corrected in the body, the section heading (no page links to its anchor), the metaDescription and the history hub. "A teenage Stirling Moss" went too: the page cites nothing for his age, and removing an unsourced word needs no source.

**M8, the 1864 hallmark.** The inference that the goblet's hallmark also dates its applied cartouche is removed from both pages that made it. The swan-symbol page had built a conclusion on it, that the goblet proved the swan was a regatta device eighty years before the 1946 grant of arms. That conclusion is withdrawn in the text itself, and both pages' evidence tables now list the cartouche's date among what the object does not establish.

**M9, the parakeets.** The title no longer claims "Britain's Loudest Roost", and the metaDescription, opening, roost paragraph and Hersham history hub no longer rank the colony. The mid-2000s figure of about 7,000 birds stays, now with its in-text citation. "No comparable published count has been made since" became "this research has found no comparable published count since then", because a negative claim needs a stated scope. The Guardian refuses fetching, so nothing new was taken from it.

**M10, M6 and M3.** Walton & Hersham United FC keeps its own figures, re-read on wahufc.com, and loses "the largest children's sports club in the area by some distance". The film-studios page and history hub lose "one of only three major" and "one of the first serious". On Walton Bridge only the superlative went. The audit's suggested replacement, that the bridge crosses the navigation channel without piers in the river, is not in the Surrey County Council committee report either. That report describes the scheme permitted in 2008 as an arch bridge with a suspended road deck and an approach viaduct on concrete piers across the floodplain, which is what the page now says, with the report cited.

**M7, Matt Brittin.** Every direct source was blocked: bbc.co.uk and bbc.com, the Guardian, Parliament's committee pages, and Variety and Deadline, which redirect to a paywall gateway. Two independent readable outlets agree: Variety through its Australian site (Yossman) and Fox News (Wulfsohn), both dated 25 March 2026. Both give the May start only as a plan, so the entry says he was appointed Director-General in March 2026 and does not say when he took office.

**L1, review dates.** The Walton Hop, Mount Felix Tapestry, Elmbridge Hundred and St Mary's New Zealand flag pages were all corrected in `52935e8` on 3 September, and the Queen Victoria page again in `468d4c1` on 6 September, without `reviewedDate` moving. They now show those dates. Pages whose audited claims were checked and amended on 14 September show that date, except Famous Residents (see below).

**`seo:validate` had been failing since 6 September, from this log's own change.** The Ceramics Café's `activities` category maps to `EntertainmentBusiness`, a genuine schema.org LocalBusiness subtype that the validator's list did not include. It does now.

**Le Petit Cafe, a separate request the same evening.** Darren's shopfront photograph, taken 12 September 2026 according to its EXIF, is `images[0]`, so it is the Directory tile, the listing hero and the og:image.

Verified: build clean at 421 pages, `seo:validate` passes, `seo:links` reports zero links to non-existent pages, `astro check` stays at the pre-existing 155 errors with none on changed lines, all ten event tests pass, no em dashes, and every retired phrase counts zero across `dist/`.

## Still open
- **Famous Residents keeps its 2 July review date on purpose.** Only the Brittin line was checked on 14 September. The page as a whole still rests on a single Wikipedia citation (audit M2), so moving "Last reviewed" would claim a review that has not happened. One `reviewedDate` field cannot say "one line amended"; the audit's suggestion of separate published, amended and fact-checked dates is the real fix, and a schema decision for the Editor.
- **No visible correction notes.** Standards 18.2 expects a notice for a factual correction and an explanation for a conclusion revision. The swan-symbol page's revised text explains itself, but the site has no correction-note mechanism, and the 3 September corrections added none either.
- **Research not attempted in this pass:** the residence evidence register (M2), the Cowey Stakes chain to Camden and the Surrey Historic Environment Record (M4), claim-level replacement of Wikipedia across nineteen pages (M5), the Walton Bridge chronology and £32.4 million cost (M3), and a recent parakeet count, where the September approach to Surrey Bird Club is the live lead.
- **The Andrew Champion page the audit found still live** ended on 6 September and is not built. A live copy is Cloudflare's HTML edge cache, not the code; a purge clears it.
- **An estimated finishing time on a single-day event would still display.** The five that existed were all runs. The habit of estimating `end` times should stop, since the renderer cannot tell an estimate from a published time.
- **`src/pages/index.astro` has uncommitted edits from another session in the shared tree.** This change adds one line there, the `end` prop on `EventCard`.

## 2026-09-07: Phase 6 outreach framework and the first batch (plan items 6.1 to 6.4)

Created `docs/outreach/hersham/` with the working rules, a status table covering seventeen targets, a press calendar of dated hooks, and five fully drafted approaches for September. Claude drafts, Darren sends; nothing goes out unread.

**The rules are the substance, not the drafts.** Offer a specific page the recipient's own readers would want, never a request to link. Disclose that Darren runs the site, in the first two sentences, every time. Invite correction before asking for anything, which is both the strongest opening and true. No paid links, no exchanges, no directory submissions, and never an edit to Wikipedia adding our own link. Log outcomes including silence, so nobody re-runs a dead approach next quarter. Five targets a month, because more reads as a campaign in a village this size.

**The five for September**, each chosen because there is something real to say: the Hersham Community Group, whose page we just published and who should get first refusal on correcting it; Surrey Bird Club, approached with a genuine question rather than a favour, since our roost figure is twenty years old and we would rather have a better one; Elmbridge Museum, as a research relationship first, citing the Surrey History Centre references already in the Hersham Lodge article; the Whiteley Homes Trust, on the visiting guidance rather than the history, because the village is somebody's home before it is anybody's day out; and a Wikipedia Talk note.

**The Wikipedia note leads with something that has nothing to do with us.** That article's external links are genuinely stale: one points at a 2016 Wayback capture of a dead site, the other at an organisation that merged away in 2025. Saying so is a service whether or not anything of ours is ever cited. The note also flags the uncited drill plough sentence and the dates that rule out its superlative. Our own pages are mentioned only as disclosure, and the decision is left to uninvolved editors.

**Verified:** all ten site URLs quoted in the drafts return 200, and every target organisation's site was requested this session. The Community Group's site returns 403 to automated requests but works in a browser, which is noted in the draft so a status check does not mislead.

## 2026-09-06: Quarterly source re-verification (plan item 3.7)

First pass of the standing quarterly check. All 41 source URLs across the twelve Hersham articles were requested.

**No dead links and no citation rot.** Six return 403 to automated clients, which is bot protection rather than absence: the Community Group's two pages, Exploring Surrey's Past, the SEC filing, UCL and AllTrails. One case looked like real rot and was not: the Imperial War Museums page on Odette Sansom appeared to redirect to a generic intelligence page, but a second client returns the correct article, so the redirect was a bot-handling artefact and nothing was changed.

**One factual gap found and fixed.** `burhill-and-golf` described the Hersham Village course without mentioning that its entire site is the subject of application 2023/3519, for 221 homes, a GP surgery, a cafe and a country park. Added with two sources. The council register still shows the application undecided, and the page says that rather than adopting secondary reporting that permission was granted in 2024, which is the kind of difference a Section 106 agreement routinely explains. The applicant's figures are attributed to the applicant.

**Exactly one reviewedDate was bumped**, on the one file that changed. The other eleven were checked and left alone. That is the rule this item sets, and it is the opposite of what a routine quarterly bump would do.

## 2026-09-06: Hersham news stream started (plan item 3.6)

**The item could not be done as written.** The `news` schema had no `neighbourhood` field, so both the monthly Hersham entry this item asks for and the hub block in item 2.6 that filters on it were impossible. Added it as an optional string, so the five existing articles stay valid.

First entry published: the four housing schemes registered with Elmbridge and awaiting a decision in Hersham, with what each proposes and where it stands, drawn from the council's own live planning data that this repo already fetches nightly for the development and planning page. Reportage with no position taken, per the editorial stance the item sets.

The three schemes that state a number come to 369 homes. Hersham Place Technology Park does not state one, because its second phase is outline with all matters reserved, and the article says so rather than implying a total, since Hersham housing figures get quoted loosely elsewhere.

This item stays open as a standing monthly commitment rather than being closed by one article.

## 2026-09-06: The drill plough claim, tested and corrected (plan item 3.5)

Item 3.5 was conditional: build the Weylands Farm page only if sources exist beyond Wikipedia, and never on a single Tier 2 source. Testing that condition turned up an accuracy problem in what the site was already publishing.

**There are no sources beyond Wikipedia, and Wikipedia does not have one either.** The sentence "King George III visited Weylands farm in Hersham where he saw the first drill plough" sits in that article's notable events section with **no citation attached**. Wikishire reproduces it. Under Appendix C rule 13, repeated copies of one account are not independent corroboration, so those two are a single uncited assertion. Searches for a county history, an archive record or a named local historian carrying it returned nothing; British History Online's Walton parish page could not be located at the URL tried, and Exploring Surrey's Past returns 403 to automated fetching, so the negative is scoped to the online records reached here rather than claimed as exhaustive.

**The site was asserting it as fact in four places**: the Hersham hub, the history hub's opening line, the history hub's Royal glimpses section, and the Queen Victoria article's closing cross-reference. That is a Tier 3 claim published as unqualified fact, which Rule 1 does not permit.

**The checkable part of it is false.** Jethro Tull developed a seed drill in 1701 and a drill plough by about 1733. George III came to the throne on 25 October 1760. Whatever may or may not have been demonstrated at Weylands, it cannot have been the first drill plough, and the superlative fails the Section 20 test that "first", "last" and "only" wording must be justified.

**What was changed.** The claim is gone from the hub summary and from the Victoria article, which now refers to it as a widely repeated but untraced story. The history hub's opening swaps "a royal drill plough" for "a royal diary entry", which is the brush with royalty that is actually documented. Royal glimpses now leads with Victoria, then reports the George III story openly: that it circulates widely, that no source has been found in the records consulted, that it originates as an uncited sentence copied onward, and that the dates rule out the superlative. It closes by naming George Greenwood's *Hersham in Surrey*, cited elsewhere in the same Wikipedia article for other village claims but not for this one, as the obvious place to settle the visit itself.

That treatment follows the same pattern as the Queen Victoria page, which was built to keep an honest ambiguity rather than resolve it by assertion. A reader now learns more than the original sentence told them, and none of it is invented.

**Verified:** the phrase "first drill plough" survives in exactly one place, inside the passage that reports and refutes it. Build clean, `seo:validate`, `seo:links`, em dash and verification-marker checks all clean.

**Unrelated observation while checking the build.** The local build has three fewer pages than the live sitemap, and all three are correct: two events fell into the past overnight and were filtered as designed, and Walton Farmers' Market is a `recurring: true` listing whose hardcoded date of 5 September has lapsed, so it has silently dropped off the site until someone re-dates it. `npm run content:stale-events` separately flags Life Drawing Classes at Riverhouse Barn, five days stale. Neither was re-dated here: Rule 4 forbids advancing a recurring event without re-verifying it against the organiser, and Riverhouse Barn is documented in this log as unreachable by every route tried.

## 2026-09-05: Hersham in wartime, which became one memorial (plan item 3.4)

**No new page, and the reasoning matters more than the outcome.** Item 3.4 asked for a Hersham wartime page covering three things. Each was checked against what the site already holds before anything was written, as `docs/site-audit.md` requires.

*The 4 September 1940 Vickers raid is not a Hersham event.* It happened at Brooklands, which is in Weybridge. `/history/walton-in-wartime/` already tells it and explicitly frames it as Weybridge rather than claiming it, and `/hersham/history/` already mentions it. A third telling on a Hersham page would have duplicated existing coverage and quietly migrated the geography, precisely the error the extension warned about for St George's Hill and the Diggers.

*The industrial war work is already covered.* `/hersham/hersham-lodge-and-hersham-place/` runs to some 2,800 words on ABC Motors, its First World War aero-engine contracts, and Hackbridge and Hewittic on Molesey Road.

*"Hersham's memorial" did not resolve to a village war memorial.* The IWM War Memorials Register could not be searched, its results rendering client-side and returning nothing to either WebFetch or form interaction, and no general village memorial surfaced by other routes.

**What was added instead.** A stone plaque inside St Peter's Church to Flying Officer Michael Courtney Franklin Mee, killed off Narvik on 8 June 1940 aged 23. Mee flew with 46 Squadron and was one of eight of its pilots lost when HMS Glorious was sunk by Scharnhorst and Gneisenau. That belongs on `/hersham/st-peters-church/`, where the plaque physically is and where a page already existed, rather than on a new page assembled from other pages' material.

**Two pieces of honesty carried into the published text.**

The inscription is reproduced from the War Memorials Online register, not from the plaque or a photograph of it. Appendix C rule 18 requires transcriptions to be checked against the rendered original, and that has not been done, so the page says so plainly. Anyone visiting the church can close that gap.

The sources disagree on the date of the sinking. The plaque and most accounts give 8 June 1940; Wikipedia's article on 46 Squadron gives 9 June. Rather than choose silently, the page records the disagreement and reproduces the plaque's own date.

**What could not be reached.** The CWGC casualty search sits behind a bot check, which was not circumvented; an individual CWGC record does load directly if its id is known, so a later session can add that corroboration. `46squadron.org` fails TLS verification because its certificate covers only its host's wildcard domains.

**Verified:** build clean, the section renders, `seo:validate` and `seo:links` clean, no em dashes, review date restamped, two sources added.

## 2026-09-05: hersham.org.uk redirect closed as configured (plan item 1.2)

The owner reported the redirect set up and asked for the item to be closed. It was checked rather than taken on trust, and closed with the configured state recorded, because what is live is not what the item specified.

`hersham.org.uk` does reach the Hersham hub, which is the substance of what was wanted. Three differences from the specification remain, all confirmed by request on 5 September 2026: every path collapses to the hub, so `hersham.org.uk/parakeets/` lands on the hub rather than the parakeets page; the target is the www host, so a visitor takes two hops, the second supplied by the canonical host rule from item 1.1; and `www.hersham.org.uk` still returns a Cloudflare 522, because the DNS record item 1.2 called for was not added.

The practical consequences worth remembering: a deep hersham.org.uk URL should not be printed on anything, and anyone typing the www form reaches an error page. The rules that would fix both are already written in `docs/hersham-org-uk-redirects.md`.

## 2026-09-05: Schools, and a contradiction on the hub (plan item 3.3)

**No new page was built, deliberately.** Item 3.3 is conditional: build `/hersham/schools/` only if `/hersham/living/` does not already cover schools in depth. It does. That page carries all four schools with addresses, phases, their own websites and Ofsted report links, and a documented editorial policy of linking Ofsted judgements rather than restating them, on the sound reasoning that the inspections span 2012 to 2024 and Ofsted stopped issuing an overall effectiveness grade in September 2024. A separate spoke would have duplicated all of it and recreated precisely the cannibalisation item 1.3 was spent removing. Took the plan's other branch and improved the existing section instead.

**Rechecked every school against its own site before touching anything.** All four school sites and both Ofsted report links still resolve. Three corrections and additions followed:

*Three Rivers Academy.* Its own site gives the address as Bell Farm Way, **Hersham**, Walton-on-Thames, and our entry omitted Hersham, which understated the point for a parent wondering whether the secondary school is in the village. Added, along with its trust, The Howard Partnership Trust, and its opening in February 2018. The DfE register still lists the predecessor name Rydens, which is consistent with that opening date and is not an error in our copy.

*Cardinal Newman.* Added the postcode, KT12 4QT, which was missing. Also removed the words "voluntary aided": the school's own site and the DfE register do not agree on whether it is voluntary aided or an academy converter. Rather than assert either, the page now states what both support, that it is a Catholic primary in the Xavier Catholic Education Trust.

*Bell Farm.* Added The Hive, its on-site specialist centre for children with communication and interaction needs, which the school's own site describes and which is exactly the sort of thing a parent is looking for.

**A contradiction I introduced yesterday, found and fixed.** The hub FAQ answer written for item 2.4 said Hersham has two councils and listed what each does. It did not mention that both are abolished on 1 April 2027 and replaced by East Surrey Council. Four other pages on this site already say so: both development and planning pages, `/hersham/living/`, and the `/living/` fact table. So the hub was contradicting the rest of the site on a question it had only just started answering.

Verified the underlying fact rather than simply copying the site's own wording: the government confirmed the two-unitary model for Surrey on 28 October 2025, shadow elections were held on 7 May 2026, and the new authority takes power on 1 April 2027. The hub FAQ now says so, and the fact box gained a "Council from 2027" row mirroring the one `/living/` already carries.

**Lesson worth keeping:** when adding a fact to a hub, check whether the site already states it elsewhere. The FAQ answer was correct in isolation and wrong in context, and only reading a neighbouring page caught it.

**Verified:** build clean, fact box renders ten rows, the council answer carries the 2027 change in both visible text and schema, `seo:validate` and `seo:links` clean, no em dashes. Review date on the living page restamped to 5 September 2026 because every entry was rechecked.

## 2026-09-05: /hersham/community-groups/ (plan item 3.2)

599 words, `entityType: institution`, five sources, all Tier 1: the group's own site, the Electoral Commission's register, the sports club's own site and Surrey County Council.

**The merger is confirmed, but not by the page the plan expected.** The group's homepage says nothing about how it was formed. Its "community details" page does: the Hersham Community Group exists "following the merger of the Hersham Village Society (HVS) and the Hersham Residents Association (HRA)". That page also gives the constitution's revision date of 1 October 2025, the committee of nine, and the planning sites the group has engaged with.

**A date circulating widely was deliberately not used.** Several sources give 3 October 2025 as the merger date. Every route back from it ends at a directory site, which Rule 1 puts in Tier 3. The page therefore gives the constitution date, which the group itself publishes, and does not assert a merger date at all.

**The Electoral Commission record is the find.** The Hersham Village Society was a registered political party, PP1874, registered 21 February 2012, entitled to field candidates in England, and voluntarily deregistered on 30 June 2025. That is the mechanism by which a residents' association gets its name onto a ballot paper, and it makes the village's civic history considerably more concrete than "two groups merged". The deregistration precedes the merged constitution by a few months; the page reports both dates and states plainly that no record links them.

**Three deliberate omissions.**

*Hersham Churches Together* is named in the plan and was dropped. Its domain does not resolve at all, on either the apex or www. A dead domain is not evidence that an organisation has folded, but it is certainly not evidence that it is running, and nothing else consulted confirmed current activity.

*Hersham Baptist Church* was also left out. Its site is reachable, but the most recent activity on it appears to date from 2024. Naming it as an active village organisation on that basis would be asserting something the source does not support.

*Named individuals.* The Electoral Commission record lists two officers by name along with a residential address in Hersham, and the group's own site lists nine committee members. None of that is republished here. The address serves no reader and is somebody's home; the committee roster is reset at each annual general meeting and would be stale within a year. The page says there is a committee of nine and links to where the current list actually lives.

**Sourcing note:** `hershamcommunitygroup.co.uk/community-details/` returns 403 to curl but serves fine to WebFetch, so a bare status check will wrongly suggest it is gone. The Electoral Commission's registration pages render client-side and come back blank to WebFetch; the in-app browser reads them fine.

**Verified:** builds, carries the Hersham entity reference, five sources render, hub grid links to it, page count rose by exactly one to 374, `seo:validate` and `seo:links` clean, metaTitle 35 characters and metaDescription 150, no em dashes.

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

## 2026-09-05: a 1775 ticket puts "regatta" at Walton Bridge eighty-seven years before 1862

Darren obtained the British Museum's record of two admission tickets to the Walton Bridge Regatta and supplied the image and credit line. This is the strongest single object on the page and the only contemporary primary source it carries.

**Verified against the museum's own catalogue, not the supplied description.** `britishmuseum.org` returns 403 to WebFetch, so the record was read in the Browser pane. It confirms every element: museum number C,2.1723-1724, Prints and Drawings, print made by William Darling, production date 1775, etching on paper, plate mark 160 x 213mm, "On the original mount", previous owner Sarah Sophia Banks, donated by Dorothea, Lady Banks. The inscription note transcribes the lettering and records "25 July 1775 / John Frederick" on the second ticket and "Thos Wood" plus a seal on the first.

**Reading the photograph adds three things the catalogue does not transcribe**, and the article says so explicitly rather than blending them into the museum's record: both tickets are numbered by hand, 6 and 12; the red wax seal survives on the first; and the mount carries a pencil annotation reading "July 18 1775". Each was confirmed by enlarging the supplied image rather than inferred. The engraver's line was checked the same way and matches the museum's "W. Darling ft Newport St London" exactly, which is also what resolved the signature: it is Darling, not Darly.

**The find creates a conflict, and the section presents it rather than smoothing it.** Stonebanks dates the Duke of Newcastle's Oatlands river entertainment to 7 August 1775. The tickets are dated to July, name Walton Bridge rather than Oatlands, and cover at least two separate days. Whether they are the same occasion, a distinct event at the bridge, or a short season of river occasions is unresolved by either source, and is now the page's first research lead.

**It does not move the foundation date, and the article says that in terms.** Nothing traces a line across the eighty-seven years to 1862, and Stonebanks, who knew about the eighteenth-century occasions, still dated the continuing regatta to 1862. Two regattas at the same bridge separated by most of a century are two regattas until evidence joins them. The evidence table carries a new July 1775 row whose "what it does not establish" column says exactly this, and the old 7 August 1775 row now disclaims the narrower question of whether it is the same event.

**The image** was converted to webp at 1100px (218KB, larger than this site's usual history images, deliberately: the lettering and the manuscript dates are the point and readers will zoom). The British Museum JPEG is retained unaltered at `public/images/history/Walton Regatta/1612984393.jpg`.

The `metaDescription` now leads on the 1775 tickets rather than the 1924 crew, and `reviewedDate` moved to 5 September 2026.

Verified: build clean at 374 pages, `seo:validate` passed, `seo:links` zero broken links, five figures render, no em dashes, metaDescription 134 characters.

## Still open
- **The CC BY-NC-SA licence is a decision for the Editor, not for this log to settle.** The British Museum shares the image under a NonCommercial ShareAlike licence. This site carries a business directory and an "advertise your business" page, and the Charter's section 9 contemplates sponsorships and paid placements, so whether the site's use is "non-commercial" within the licence is a legal judgement rather than an editorial one. The credit line Darren supplied is carried verbatim in the caption and a rights-record comment sits above the figure. Flagged rather than decided, per Standards Appendix C rule 21.
- **The ShareAlike condition** attaches to adapted copies. The webp is a format conversion and resize of the museum's image, so if SA is read strictly the derived file should be offered under the same licence. Worth a line in the site's image credits policy rather than a per-page fix.
- **The page title still says "Since 1862".** Defensible, since that is the modern event's own claim and the article supports it as institutional continuity, but the page now opens with a 1775 object. If the title changes, the slug should not: the URL is live and indexed.
- Page locators for Stonebanks (1980) and Hughes (2003), unchanged.

## 2026-09-06: Clubs, societies and community groups hub

Rebuilt `/living/community/` as a filterable directory, added `/hersham/clubs-and-societies/` as its Hersham child hub, and created a flat `/clubs/<slug>/` namespace for organisation pages. New `organisations` content collection with a closed, typed taxonomy; every record carries a `sources` array with access dates and a `lastVerified` date, and only `status: active` records render.

**30 organisations published, 16 with their own page.** The rest render as cards without a link, which is the honest treatment for an organisation confirmed to exist but not yet describable in depth. Three organisations that already had pages elsewhere (Walton & Hersham FC, Hersham Community Group, and the FC's Things to Do guide) point at those rather than getting a duplicate under `/clubs/`.

**Two listings on the old page did not survive verification and were deleted.** "Hersham Sailing Club" has no primary source under that or any near name, and the reservoir it was placed on is private land with no public access, in neither Hersham nor a sailing venue. "Walton & Weybridge Music Club" has no website, no Charity Commission entry and no listing anywhere; the organisation that does exist under a similar name is the Walton & Weybridge Amateur Operatic Society, now published in its own right. Two further corrections: the cricket ground is Ashley Park Avenue, not Ashley Road, and the Rotary club is the Rotary Club of Walton-on-Thames, not "Walton & Weybridge".

**The Rotary club is not published at all.** `waltonrotary.org.uk` no longer resolves in DNS, so there is no live primary source and no way to confirm the club still meets. Recorded in `docs/research-backlog.md`, which is new and holds every organisation found but not published, plus the published records that are thinner than they should be.

**Walton Rowing Club carries `lastVerified: 2026-08-22`, not today's date.** Its site failed a TLS handshake from two separate tools this session and British Rowing's club page redirects to its finder, so the record rests on our own earlier verification and says so.

`seo-validate.mjs` gained `/hersham/clubs-and-societies/` in its `hubExceptions` set: it is a curated CollectionPage, not a content-collection article, like the food and drink and history hubs before it. The hub references `HERSHAM_PLACE_ID` rather than describing a second, unidentified Hersham.

Verified: build clean at 394 pages, `seo:validate` passes, `seo:links` reports zero broken internal links, `npm run check` adds no new errors (155 before and after, all pre-existing in other files). No horizontal overflow at 375px, 768px or 1280px, measured as `scrollWidth === clientWidth` with zero elements past the viewport edge. Filters, the result count, the empty state and the reset control were all exercised in the browser; the page carries all 28 organisations in static HTML and works with JavaScript disabled.

**Addendum, same day: the scout groups and Elmbridge Youth Theatre.** Walton & Weybridge District publishes its full list of seven groups, four of them in our area. 1st Walton (Viking) Sea Scouts and 9th Walton (Viscount) Air Scout Group are now published with their own pages, and 1st Hersham and 4th Walton gained section meeting nights from the district's timings table, which neither group publishes itself. Elmbridge Youth Theatre is on file as `status: uncertain` and does not render: charity reporting is overdue by 1,529 days, the last register data is for the year ending 31 August 2020, its Facebook page has been silent since February 2023 and its own domain does not resolve. Two source traps recorded in the backlog: the district's link for the 9th is dead, and Surrey Scouts' county group pages carry template defaults, giving the 9th the county campsite's address and the county's own website.

**Closed:** `src/content/attractions/watch-esher-rugby-in-hersham.json` had `internalUrl` pointing at `/things-to-do/walton-and-hersham-fc/`, sending rugby readers to the football club. Field removed, so the card falls back to `officialUrl` and links the club's own site as an external link.

## 2026-09-06 (later): the Watermans Arms listing gets its own photography

Darren supplied four photographs taken outside the pub that morning, staged as HEIC at `public/images/history/Directory/Pubs/Watermans Arms`. Converted and published to `public/images/directory/watermans-arms-hersham/` as webp at 158-283KB, matching the range the Khyber Pass and Patel's sets already sit in. The frontage close-up is `images[0]`, so it is the tile on `/directory/`, the hero on the listing page and the Open Graph image, as Darren asked.

**Sharp cannot decode HEIC in this repo's build of libvips.** It reads the metadata happily and then fails on decode with "Support for this compression format has not been built in". No ImageMagick, ffmpeg or `heif-convert` on this machine either. What works with no new dependency is WIC through WPF's `System.Windows.Media.Imaging.BitmapDecoder` from PowerShell, which picks up the Microsoft HEIF Decoder that Windows 11 already has: HEIC to lossless PNG there, then the usual sharp resize and webp encode. Worth remembering, since every photograph Darren takes on an iPhone will arrive this way.

**The photographs settled a fact the desk research had wrong by omission.** The building carries two fascias, Watermans Arms over the bar and The Lodge over the rooms, with a central panel reading "Eat, Drink, Sleep". The listing now says so in its second paragraph. A visitor sent to "the Watermans Arms" for a booked room could reasonably walk past the door marked The Lodge, and no source consulted in July mentioned it.

**They also produced an internal link the site should have had.** A green plaque on the pub's front wall commemorates Sham 69, formed in Hersham in 1975, listing "Hersham Boys", "Hurry Up Harry" and "If the Kids Are United". The listing now carries the photograph and links to `/hersham/sham-69/`, which had no inbound link from the Directory at all.

**The operator's website is gone and the field was removed rather than left to rot.** `watermansarmshersham.com`, recorded in the July 2026 listing, now returns NXDOMAIN on both the apex and www. No replacement was found: `facebook.com/watermansarmshersham` is a personal profile ("Profile - Digital creator"), not the pub's business page, so it is not a substitute for an official site in a directory field. Existence, name and address were re-confirmed against the Food Standards Agency register (business 1779048, "The Watermans Arms", Pub/bar/nightclub, 1 Queens Road, Hersham, KT12 5LT), which matches the listing character for character. The `source` field records both the photography and the dead domain.

**One sentence was removed as collateral.** The listing said "Bookings are made through the OYO website or app", which traces to the owner-supplied spreadsheet of July 2026 and could not be re-verified this session now that the operator's own site is gone. It now says rooms and tables are booked by telephone, which the listing's own phone number supports.

## Still open
- **Two phone numbers are in circulation.** The listing carries 01932 254580, from the owner-supplied spreadsheet. Several aggregators give 01932 501571. Both are Tier 3 or owner-supplied, neither is a Tier 1 source, and the listing was left unchanged. The number on the pub door would settle it in ten seconds on the next visit.
- **The category is probably wrong now.** The listing is `accommodation` with `guest-house` and `pub-with-rooms` subcategories, which is how it was filed in July when it came in as an OYO entry. The FSA register classifies it as Pub/bar/nightclub, and the frontage advertises pool, darts and televised sport. Moving it to `pubs-and-bars` would read truer, but it would also drop out of wherever accommodation is surfaced, so this is an Editor's call rather than a tidy-up.
- **The hanging sign is a heraldry lead.** It carries a shield of a boat on wavy bars with two silver sea-creature supporters and the motto "At Command Of Our Superiors". The photograph is published and the motto is transcribed, but no attribution is made on the page, because none has been verified. If it is the Worshipful Company of Watermen and Lightermen's arms, `heraldry-walton-on-thames-hersham-whiteley` wants a paragraph and this photograph.
- **`/hersham/sham-69/` still has no photograph of its own.** The plaque image is now in the repo and the page carries none. It is a history page, so it needs a caption and rights record under the Standards document rather than a copy-paste from the Directory.
**Camera originals are now git-ignored, and the earlier note in this entry overstated the problem.** `public/images/history/Directory/` is 471MB of staged HEIC plus one 65MB MOV, and Astro does copy all of it into `dist/`. It was never reaching production: not one of those files is tracked, and Cloudflare Pages builds from the git clone, so the bloat has only ever been local. The live risk was a future `git add -A` sweeping them in, which is a real hazard while another session is committing against a shared index. `.gitignore` now carries `*.HEIC` / `*.heic` / `*.MOV` / `*.mov` under a comment explaining that Cloudflare builds from the clone and that `git add -f` is the deliberate override. Nothing in `src/` references either extension: pages use the webp derivatives under `public/images/directory/`. The staging tree is now invisible to `git status`, which also makes the untracked list readable again.

Moving the staging tree out of `public/` altogether is still the tidier end state, since it would stop the local `dist/` carrying half a gigabyte it never serves. Not urgent now that nothing can be committed by accident.

## 2026-09-14: Whiteley Village gets photography, and the café the page said wasn't there

Darren supplied three photographs taken at Whiteley Village on 13 September 2026, staged as HEIC at `public/images/history/Whiteley Village/`. Decoded through WIC as before, published as 1200x900 webp to `public/images/history/` (137-246KB). The almshouse is the hero and Open Graph image and a captioned figure under "The plan"; the two café photographs sit under "Visiting". Its tile on the homepage "Beyond the Town" section is a tighter 800x600 crop (79KB) at `public/images/neighbourhoods/whiteley-village-arms-house.webp`, framed so the roof and twisted porch columns clear the card's dark gradient. That closes the missing `whiteley-village.jpg` gap flagged in the earlier audits.

**Image record (Standards §10.1).** Original photographs by Darren Bayley / Walton-on-Thames.org, 13 September 2026, owner's own copyright, credited in every caption. Not retouched. The article's almshouse figure is cropped to trim flat grey sky, the tile more tightly; the café pair are full-frame. EXIF, including iPhone GPS, is stripped by the encode.

**The photographs contradicted the page.** It said "There are no visitor facilities on site". The Whiteley Homes Trust's own café page and its news item of 28 July 2025 say the Whiteley Community Café, in the Clubhouse on Octagon Road, opened on 21 July 2025 and is open to residents, the local community and anyone visiting the area. Sentence replaced, both Trust pages added to `sources`, `reviewedDate` moved to 14 September 2026. Hours are linked, not stated (Content Verification Protocol, Rule 4).

## Still open
- **"Almshouse" is Darren's own identification as photographer**, not a documentary source. The caption first read "almshouse range" from the file name `arms-house`; on 15 September 2026 he asked for "almshouse". Which building it is and who designed it are unrecorded, and a Grade II list entry would settle both.
- **Café hours disagree between sources.** The Trust's undated café page gives Mon-Thu 10am-4pm, Fri-Sat 10am-8pm, Sun 10am-4pm; search-result summaries repeat an older Mon-Fri 10am-4pm. The page links to the Trust rather than stating either, so nothing to fix, but don't copy hours from anywhere but the Trust.
- **`<!-- IMAGE: whiteley-village-central-green.jpg -->` is still unfilled.** None of the three photographs shows the central green.

## 2026-09-15: the Whiteley Village Community Cafe listing gets its photographs

Darren asked for the two café photographs from 13 September on `/directory/whiteley-village-community-cafe/`, with one featured as the directory image. Encoded from the HEIC originals rather than the article's 1200px copies, into `public/images/directory/whiteley-village-community-cafe/`. The entrance, 1400x1050 at 294KB, is `images[0]`, so it is the `/directory/` card, the listing hero and the Open Graph image; the steps, 1200x900 at 237KB, form the gallery. First encodes came out at 460KB and 324KB because the brickwork is dense, and dropping resolution, not quality, brought them into the range the other photographed listings sit in. `featured` stays false: that flag is the editorial "Local highlight", not the choice of image.

Also on `/hersham/whiteley-village/`, the almshouse caption now reads "An almshouse" rather than "An almshouse range", at Darren's request.

**Re-verified while the listing was open.**
- Name, address and postcode match the Food Standards Agency register: FHRSID 1833403, "Whiteley Village Community Cafe", Whiteley Village Club, Octagon Road, KT12 4DN, rated 5 on 11 March 2026. The listing name was left as registered; the door sign and the Trust's page both say "The Whiteley Community Café", which the body now mentions so a visitor recognises it.
- The recorded website, `whiteleyvillage.org.uk/community-cafe/`, is dead. The domain still resolves, to 83.223.116.101, but refuses connections on 443 and timed out from a second network. Replaced with the Whiteley Homes Trust's café page.
- 01932 842360 appears on the Trust's café page as the Trust's general enquiries line, not a café line. Kept, and labelled as such in the body.
- Hours are linked, not stated. `verified_date` moved to 2026-09-15 and `source` rewritten to record all of the above.

## 2026-09-15 (later): /food-and-drink/coffee-shops-working-walton-on-thames/

Status: built from Darren's draft (`best-coffee-shops-working-walton-on-thames-hersham-whiteley-village.md`), not yet published. Current/practical content, so the Content Verification Protocol governs. New static page at `src/pages/food-and-drink/coffee-shops-working-walton-on-thames.astro`, with BreadcrumbList and FAQPage JSON-LD, a visible sources block, and a link from the Food & Drink hub. Title shortened to "Coffee Shops for Working in Walton-on-Thames: Wi-Fi Guide" (57 characters); the draft's SEO title was 63.

**Checked on 15 September 2026.** Every address against the FSA register (Cacao Route 1778977, Costa The Heart 1778172, Costa Hersham 1778580, Starbucks 1778229, Caffe Nero 1778178, Esquires 1778942, Greggs 1806203, Riverhouse Barn Cafe 1778698, The Walton Village 1778682, Bean on the Green 1779085, Whiteley Village Community Cafe 1833403). Official pages for: Cacao Route (menu, contact, and 2022 Walton opening from its About page), Starbucks (Google Wi-Fi, 7am Monday to Saturday), Greggs (6am Monday to Saturday), Esquires (address only), Riverhouse Barn café, The Walton Village (a pub; opens midday weekdays, 10am weekends), and the Whiteley Homes Trust café page and news item (meetings, free Wi-Fi, power points, Lobby, Lounge, terrace, menu, hours, 21 July 2025 reopening after redevelopment).

**Corrected from the draft.** Costa Hersham was "Molesey Road, The Green"; the register has Unit 10, The Hersham Centre, The Green, KT12 4HL. Whiteley's postcode was KT12 4BF, the Trust's head office at Huntley House; the café is KT12 4DN. Greggs opens at 6am Monday to Saturday, not "most weekdays". The Walton Village was framed as an all-day workspace; it opens at midday on weekdays, which the page now says.

**Removed from the draft, unverifiable this session.** Costa's branch Wi-Fi listings and "free" customer Wi-Fi at both branches: costa.co.uk accepts a TCP connection and never responds, from this machine and from WebFetch. Esquires' 7am weekday opening: its store page gives no hours, only aggregators do. The Walton Village's "free Wi-Fi listed among facilities": its site lists no Wi-Fi. Cacao Route's "customer review published in July 2026": a review is Tier 3 and barred by Rule 2. Bean on the Green's website: `beanonthegreen.co.uk` no longer resolves, so the page links the directory listing instead.

**Kept as Darren's first-hand assessments, written as such.** Wi-Fi quality at Cacao Route, Caffè Nero, Esquires, Greggs, Riverhouse Barn, The Walton Village and Bean on the Green; Cacao Route being larger inside than it looks and short of sockets; Starbucks having the most room; Greggs' café seating and plenty of sockets; atmosphere at Riverhouse, The Walton Village and Bean on the Green; the rankings and the absence of known laptop time limits.

## Still open
- ~~Darren to confirm the first-hand list above before publication.~~ Closed 16 September 2026: Darren previewed the built page locally and approved it to go live.
- **Costa Wi-Fi.** If the branch pages can be read from another network, the Wi-Fi mention for both Costas can go back in. The Costa store URLs from the draft are also left off the page until a page can actually be loaded.
- **Overlaps the blueprint's planned `/food-and-drink/cafes-and-coffee/` spoke** (site-audit line 54, NEW, unbuilt), whose brief includes "which cafes suit laptops". Decide whether that spoke absorbs this page, links to it, or is dropped.
- **Existing directory listings disagree with the FSA register.** Costa Hersham (`10 Queens Road`, and its website points at the Walton branch), Esquires (description says "in The Heart"; it is at 67 High Street), and The Walton Village (`29 High Street`; register has 29-31). Fixed in the next entry.

## 2026-09-15 (later still): four directory listings brought into line with the FSA register

Follow-up to the coffee shops guide, which turned up listings that disagreed with the Food Standards Agency food hygiene register. Each was re-queried by FHRSID through `api.ratings.food.gov.uk/Establishments/{id}` (header `x-api-version: 2`) on 15 September 2026, and websites were retested the same day. Slugs are unchanged throughout, so no redirects are needed and the existing inbound links still resolve, including `/hersham/hersham-green-shopping-centre/` to the Costa listing.

**`costa-coffee-hersham`.** Address was "10 Queens Road, The Hersham Centre, Hersham, Walton-on-Thames KT12 4HL"; the register (1778580) gives "Unit 10, The Hersham Centre, The Green, Hersham, KT12 4HL", now used in the frontmatter and the body. The website pointed at `costa.co.uk/stores/walton-on-thames`, which Costa's own site indexes under the title "Walton On Thames", a separate branch from the one it indexes as "Hersham" at `costa.co.uk/stores/hersham`. Corrected to the Hersham page on that evidence. costa.co.uk still accepts a connection and never responds from this machine, so neither page was actually loaded.

**`esquires-coffee`.** The description, in both frontmatter and body, said "in The Heart"; the cafe is at 67 High Street (register 1778942 and its own store page), so it now says "on Walton High Street". The phone was stored as `1932223960`, missing its leading zero, which made the listing's `tel:` link and its LocalBusiness telephone wrong; the store page gives 01932223960, now `01932 223960`. The address already matched the store page character for character and was left alone.

**`the-walton-village`.** Address changed from "29 High Street" to "29-31 High Street", per the register (1778682). The two official sources genuinely differ: the pub's own website gives "29 High St". The register's fuller numbering is used because it describes the whole premises and does not contradict the pub's; the `source` field records both. Name, phone (01932 254431) and website confirmed against thewaltonvillage.com, which loads.

**`bean-on-the-green-bloomings-coffee`.** Name changed from "Bean on the Green / Bloomings Coffee" to "Bean on the Green", which is what the register (1779085) carries at 1 The Green, KT12 4HW. "Bloomings Coffee" (also spelt "Blooming Coffee") turns up only on third-party directories and social pages for the same address and the same phone number, which reads as a predecessor business rather than a second current name; no current official source supports it. The listing links the Facebook page, not the dead `beanonthegreen.co.uk`, so there was no website to remove.

**`verified_date` moved to 2026-09-15 on all four**, and each `source` now names exactly which fields were re-verified against what. Fields not re-verified are named as coming from the July 2026 owner-supplied spreadsheet.

## Still open
- **Phone numbers at Costa Hersham (01932 269553) and Bean on the Green (01932 225260)** are still spreadsheet-sourced. Bean's number is the one third-party sites attach to Bloomings Coffee, so it may predate the current business.
- **Costa's own address wording may differ from the register's.** A search summary quoted "Molesey Road, The Green, Hersham" for the Hersham store, which is also what Darren's coffee guide draft had. That wording comes from a summary, not a page, so it was not used; worth reading Costa's store page from a network where costa.co.uk responds.
- **Descriptions on all four** remain as supplied in July 2026 apart from the Esquires location fix. The Walton Village's "Sunday-style pub options" in particular has no source.

## 2026-09-15 (later): /history/lost-breweries-of-walton-on-thames/

Status: built from Darren's draft (`lost-breweries-of-walton-on-thames.md`), not yet committed. Historical content, so the Research and Editorial Standards govern. Added to the Victorian era list on `/history/`; it appears in "Explore by topic" automatically. `metaTitle` 55 characters, `metaDescription` 147.

**Checked on 15 September 2026.**
- Brewery History Society wiki, "Brandon's Brewery Ltd" (last modified 17 July 2026): "Registered July 1896 to acquire A.J.Brandon Ltd. and Jason Gurney's Star Brewery, Walton-on-Thames", and "Acquired by Mann, Crossman & Paulin Ltd in 1920". That corroborates Gurney's name and the 1920 takeover, and the July 1896 registration now appears in the text beside the draft's note that accounts differ.
- Engine River Brew Co's own site calls itself a "nano-brewery" on the banks of the Engine River and the fields of the Old Dairy farm in Weybridge, and is trading.

**Changed from the draft.**
- Engine River was "a microbrewery ... on the border of Walton and Weybridge". Its site says a nano-brewery in Weybridge, so the text now says that. The sentence "It is great to see a small microbrewery operating locally..." was removed: Standards §9.7 requires opinion to be labelled and kept apart from historical conclusions.
- "Both breweries appear to have stopped production" now reads "had both stopped brewing". Tarplee (p. 44), as the draft itself cites him, supports that directly, so the hedge was unnecessary (Protocol Rule 3).
- The draft's map placeholder and NLS credit line were removed at first because no image had been supplied. The map was added later the same session (below).
- The body "References" list moved into the `sources` frontmatter, which the layout renders as the Sources block. Martin's editor, edition and paper number are carried in the title field, because the layout's `editor` field renders as "in X (ed.)" for a container.

**Not checked this session.** Martin (1999), Tarplee (1998) and Hughes (2003) are print works supplied by Darren and were not examined here. Every date, name and locator from them is as drafted.

**Map added (Standards §10.1 image record).** Darren supplied the image on 15 September 2026, staged as a 1846x1260 PNG (3.3MB) at `public/images/history/breweries/`. Published as a 1400x956 webp (133KB) at `public/images/history/ashley-brewery-map-walton-on-thames-1871.webp`, resized only, and placed after the introduction where the draft's placeholder was. It's not the hero image, because map lettering wouldn't survive the hero overlay.
- **Source:** Ordnance Survey, Six-inch England and Wales, 1842-1952, Surrey Sheet XII, surveyed 1866 to 1868, published 1871, map 61 x 92 cm. Viewed at https://maps.nls.uk/view/266664424 on 15 September 2026; the title and dates match the details Darren supplied. Added to `sources`, cited in the caption as (Ordnance Survey, 1871).
- **Rights:** the NLS viewer gives the licence as "CC-BY (NLS)" with the credit "Reproduced with the permission of the National Library of Scotland". Its copyright page asks online publications to link to the Map Images site. The caption carries the credit and links to the NLS sheet.
- **Crop:** Darren's crop shows Ashley Brewery by name beside the High Street, with Church Street, St Mary's and Elm Grove. Bridge Street and the Star Brewery are outside it, so the caption names only Ashley.
- **Evidence value:** the map shows Ashley Brewery named on a survey of 1866 to 1868. That fits Tarplee's 1850s foundation, but it is a snapshot and says nothing about when brewing started or stopped (Standards §7.2).
- **The staged PNG is not for commit.** Nothing references it. It stays local as the retained original; commit only the webp.

## Still open
- **Brandon's date conflict.** The page says the accounts differ but doesn't give Hughes's or Tarplee's dates. Stating them would satisfy Standards §2.5 better than a bare "differ".
- **Tarplee p. 44 is carrying a lot.** Walton, Ditton and Cobham breweries all cite that one page. Worth confirming against the book.

## 2026-09-16: /living/ rebuilt as the Living pillar page

Status: built, not committed. Hybrid page under `docs/historical-content-strategy.md`: the
area histories (Ashley Park 1923, Stonebanks on Cottimore) are historical content and keep
their print citations; everything else is current/practical content governed by the Content
Verification Protocol. Editorial source was Darren's approved Harvard-referenced guide
(`walton-on-thames-living-guide-final-harvard.md`) plus its implementation notes.

Structure follows the notes: the existing service-card grid stays directly under the
introduction (it is why residents come to `/living/`), with the relocation guide below it.
URL unchanged. `ThingsToDoStickyNav` is reused for the contents control rather than a second
copy of the same pattern. No `FAQPage` schema: Google restricts FAQ rich results to
government and health sites, so the markup would describe content that will not be shown.
`WebPage` + `BreadcrumbList` only, both validated as parsing JSON.

**Verified on 16 September 2026** (every figure re-checked against its source this session,
not taken from the draft): Elmbridge Band D 2026/27 £2,556.87; ONS Elmbridge £744,000
June 2026 provisional, down 2.1%, first-time buyers £500,000, movers £948,000, rent £1,867
July 2026 and the four bedroom-count averages; Census 2021 BUA E63005192 population 28,837;
National Rail 140 parking spaces, step-free, cycle storage; Surrey CC bus routes 400/813,
458, 459, 461; EA "River Thames at Walton" warning area covering Desborough Island, Walton
Bridge and Elmbridge Leisure Centre; St Peter's 24-hour A&E; Walton Community Hospital lists
no A&E; the four GP practice addresses; Xcel on Waterside Drive; regatta "annually since
1862"; Rightmove Walton-on-Thames results carrying Hersham addresses (Southdown Road, Vaux
Crescent, Queens Road), data to 25 August 2026; GIAS Rydens closed 31 August 2016 and Three
Rivers Academy opened 1 September 2016; Ofsted inspection 15 October 2024, published
21 November 2024.

**Corrected against the draft rather than published as drafted.**
- Council Tax: the draft said the total included "the relevant county and policing elements".
  The Elmbridge table publishes only combined totals with no authority breakdown, so the
  claim was removed rather than hedged.
- St Peter's: the draft cited the A&E page for Walton being served. That page says only
  "parts of Elmbridge". The trust's St Peter's Hospital page does name Walton on Thames among
  the main centres of population, so that page was added as reference 2026b and cited for
  that specific claim.
- Conservation areas: the draft credited both designations to Elmbridge. The council's own
  page gives Church Street/Bridge Street as designated by Surrey County Council in 1974 and
  Riverside by Elmbridge in 1975; both are now named with their designating body.
- Schools admissions: the draft's "catchment, feeder schools, siblings and other categories"
  could not be confirmed (the secondary booklet is a PDF that would not parse and the
  criteria are not on the landing page). Reworded to what Surrey's page does support:
  arrangements are set per school in the admission booklets, and the school map shows
  distance and whether a school has a catchment area.
- The Heart: "apartments" and "public space" are not supported by any Heart source reachable
  this session. Replaced with the verified mix (shops, eating places, gym, Walton Library,
  anchors including Sainsbury's, Next and Waterstones), cited to heartshopping.co.uk rather
  than the 2023 PDF, which would not parse.
- Thames Path reference: reviewed date is 3 September 2026, not 16 February 2026.
- Whiteley Village/KT12: the draft's Royal Mail URL returns 403. Replaced with Whiteley Homes
  Trust's own address (Octagon Road, Walton on Thames, KT12 4EH) plus the Rightmove Hersham
  KT12 evidence.
- The draft's "Editorial note before publication" about the schools page was not published as
  prose (Protocol Rule 3). The schools page was corrected instead.

**Other pages changed.** `/living/schools/`: Rydens Enterprise School replaced with Three
Rivers Academy, per GIAS. `/living/council-and-services/`: gained the civic basics table (MP,
future unitary, police, fire, ambulance, ICB, bus operators) moved off `/living/`, where it
was crowding out the relocation summary. Waterloo journey wording standardised on the
homepage hero, homepage FAQ and `/getting-here/`, which all said "around 32 minutes", to the
station guide's verified "22 to 25 minutes fastest, 30 to 35 stopping". Contextual links back
to `/living/` added from the station guide, the schools page and the GP page.

## Still open
- **SWR journey times could not be re-confirmed from source this session.** The SWR page
  renders times client-side, so it returned no durations. The 22 to 25 / 30 to 35 range rests
  on the station guide's August 2026 check against National Rail and SWR. Re-check at the next
  timetable change.
- **`src/data/lastmod.json` is stale for these pages** because the changes are uncommitted.
  Run the prebuild and commit the regenerated file, or production dates will lag.
- ~~`/images/og-default.jpg` does not exist~~ Closed 19 September 2026, see below., so the BaseLayout default Open Graph image
  404s on every page that does not pass its own. `/living/` now passes the Walton Bridge hero.
  Worth fixing site-wide.
- **Hersham living page says Three Rivers Academy "opened in February 2018"**; GIAS gives
  1 September 2016 (the 2018 date may be the current building). Needs one source, then a fix.
- **Walton Bridge hero is only 640x427** and is the only riverside photograph on the site.
  Original photography of the river, Cowey Sale, The Heart and the High Street is the biggest
  single gap on this page.

## 2026-09-16 (later): /living/areas/ with an annotated map

Status: built, not committed. Blueprint section 5 spoke ("one H2 per neighbourhood"). Hybrid
page, same split as `/living/`. `/living/` now links to it from its areas section.

**The map is generated, not drawn.** `scripts/build-areas-map.mjs` (`npm run map:areas`,
add `-- --fetch` to refresh data) builds it from OpenStreetMap (Overpass API, ODbL),
planning.data.gov.uk conservation areas (OGL) and the Environment Agency flood-monitoring
API polygon for 061FWF23Walton (OGL). Raw downloads live in `.cache/areas-map/`, which is
gitignored; the generated files are committed: `public/images/maps/walton-areas-base.svg`,
`walton-areas-map.svg` (full size), `walton-areas-map-og.png`, and
`src/data/walton-areas-map.json`.

**How the six areas are drawn.** No official neighbourhood boundaries exist, so each area is
a 60-metre band along exactly the streets its `/living/` description names, plus the
landmarks it names. A first version used padded convex hulls; it was discarded because the
hulls claimed territory no description names (the Cottimore hull became a large rectangle,
and the Ashley Park and station hulls sat on top of each other). Street names that repeat in
neighbouring towns (High Street, Church Street) are taken only near their Walton anchor.

**Editorial judgements to confirm.**
- "The western part of Hersham Road" in the approved guide is ambiguous: literally it is the
  town-centre end. Only the stretch within 250 metres of Halfway Green is drawn, because
  drawing the whole western length ran the station-side band up to The Heart. The page says so.
- Field Common is named in the guide but OpenStreetMap holds only a NaPTAN bus-stop record of
  that name, with no location. It is not placed, and the page says why.
- Cowey Sale has no mapped open-space polygon, so it is not labelled.

**"On the official layers" statements were measured, not assumed.** The script tests the
street geometry itself (not the drawn bands) against both overlays. An earlier hull-based
test wrongly reported the town centre inside the flood-warning area; the point test shows 0%
of High Street and New Zealand Avenue inside it. Published results: Bridge Street 10% and
Manor Road 5% of mapped points inside the warning area; Waterside Drive 12%, and the Xcel
building, which matches the EA's own description naming Elmbridge Leisure Centre. St Mary's
Church sits in Walton Church Street-Bridge Street, the Old Manor House in Walton Riverside,
matching Elmbridge's page. Designation dates (11 November 1974, 1 December 1975) come from
the dataset's `start-date` and match Elmbridge; the page now fails the build if a date is
missing.

**Data notes.** The main Overpass instance was overloaded all session; `maps.mail.ru` worked
intermittently. The committed map was built from same-session fetches seeded into the cache
after the scripted `--fetch` run timed out on two residential tiles. OpenStreetMap is not on
the Protocol's source tiers: it is used only for geometry (where streets run), never for a
claim the text relies on without an official source alongside.

**Checked.** Build passes (markers, em dashes); no type errors in the new files; both JSON-LD
blocks parse; 48 internal links resolve; no broken anchors; in the sitemap. Layer toggles are
CSS-only (`:has()`) and verified switching; no console errors; no horizontal overflow at
375px; legend and toggle tap targets at least 44px. Markers are placed clear of label text at
mobile size, where three minor labels are hidden.

## Still open
- The map would benefit from a named-street index or search for people checking one address;
  deliberately not built, because the map must not be read as settling which area a property
  is in.

**Resolved before going live (16 September 2026).** The Riverhouse Barn sentence on `/living/` cited the venue's What's On page, which returned 403, so it had not been re-checked. It now says only what this site's Riverhouse Barn page (reviewed 22 August 2026, with its own sources) supports: theatre, music, comedy, exhibitions and arts and crafts classes. "Community events" was dropped, because no source checked supports it. The citation now points to that page.

## 2026-09-18: a locator map for the lost breweries

Darren asked for a map with pins at the former sites of Ashley Brewery and the Star Brewery. Added `scripts/build-brewery-map.mjs` (`npm run map:breweries`, `-- --fetch` to refresh), modelled on the `/living/areas/` map: an OpenStreetMap base via Overpass (ODbL, credited in the SVG and caption) with the two sites drawn on top, output as a single static SVG at `public/images/maps/lost-breweries-map.svg`. No JavaScript, no third-party tiles. Placed after the article's introduction, directly after the 1871 detail (Darren's choice of order after previewing); `reviewedDate` moved to 18 September 2026.

**How the sites were placed (Standards §10.5).** Both positions were read off the National Library of Scotland's georeferenced Ordnance Survey layers on 18 September 2026 (tiles stitched and converted pixel by pixel, not eyeballed from a screenshot), at the point where the OS printed each brewery's name. Sheet details come from the NLS sheet index (WFS), not from memory.
- **Ashley Brewery:** "Ashley Brewery" on Surrey XII, six-inch, surveyed 1866-68, published 1871 (NLS 266664424), behind the east side of the High Street. Pin at 51.38546, -0.41811; ring 40 m.
- **Bridge Street:** "Brewery" on Middlesex XXV.13, 25-inch, 2nd edition, revised 1894, published 1896 (NLS 103658642): a yard behind the frontages on the north-east side of Bridge Street near Church Street. The 1912 revision, Surrey XII.5, published 1914 (NLS 103314202), still prints "Brewery", about 40 m to the west on the same side. Pin at 51.38697, -0.41992; ring 45 m covers both labels.
- **Alignment:** St Mary's Church on those sheets sits about 6 m (six-inch) and 9 m (25-inch) from its OpenStreetMap position. The rings are wider than that on purpose: the sheets name a yard, not the buildings that made up the brewery.

**Stated as inference, not fact.** Neither 25-inch sheet names the Bridge Street brewery. The page calls it "probably the Star", and the caption says the identification is ours, from Tarplee's placing of the Star on the east side of Bridge Street and the 1894 revision predating Brandon's July 1896 acquisition of Gurney's Star Brewery (Brewery History Society). The 1912 "Brewery" label is reported with Tarplee's depot account beside it, so it isn't read as brewing continuing.

**Negative result, recorded so it isn't searched again.** The first-edition six-inch sheet covering Bridge Street (Middlesex XXV, surveyed 1864-70) names no brewery there.

## Still open
- **Ashley Terrace.** On the 1894 revision no brewery is labelled at the Ashley site, and a street named Ashley Terrace runs across roughly the same ground. Tarplee dates Ashley's demolition to around 1900. That is a possible conflict, or a georeferencing or naming coincidence; it is not on the page. Worth checking against the 1894 sheet itself and a local directory before saying anything.
- **The Star's buildings.** A larger-scale plan (a 1:500 town plan, if Walton has one, or a sale plan) would let the ring shrink to real outlines.

## 2026-09-19: default Open Graph image added

`/images/og-default.jpg` was referenced by `BaseLayout.astro` as the fallback social image but had never existed, so 395 of the 417 built pages advertised a 404 as their share image. It is now a 1200x630 JPEG (52KB): the site logo, "Walton-on-Thames.org" and the site's own WebSite schema description ("An independent community guide to Walton-on-Thames, Hersham & Whiteley Village") on brand navy with a gold rule. A branded card rather than a photograph, because no Walton photograph on disk is large enough (the Walton Bridge hero is 640px wide) and the fallback has to suit Hersham and Whiteley pages too. Pages that pass their own `image` are unaffected. Generated with sharp; Georgia stands in for Fraunces because sharp's SVG renderer cannot load the webfont.

## 2026-09-19: the Star's map label

At Darren's request the Bridge Street pin now reads "The Star Brewery, approximate location" instead of "Brewery, probably the Star". This is his editorial decision to state the identification on the map; the evidence is unchanged. Neither 25-inch sheet names the brewery, and the caption still says reading it as the Star is our inference from Tarplee. The sub-label changed with it, from "named on the 1894 revision" to "labelled "Brewery" on the 1894 map", because the 1894 sheet did not name it the Star. Alt text updated to match. The label is nudged 70 px right to clear Thames Street.
Once deployed, the plain SVG URL still served the old label from Cloudflare's edge (cf-cache-status HIT, max-age 604800 from `public/_headers`). The article now references `lost-breweries-map.svg?v=20260919`, a new cache key, rather than needing a dashboard purge. A first attempt, `?v=2`, failed: a pre-deploy poll had already requested that URL, so the edge cached the old map under it. The build script's header now says to use the date and not to request the URL before the deploy lands.

## 2026-09-19: /living/ rebuilt as the moving and living guide

Built to Darren's "Definitive Moving & Living Guide" brief. The page keeps its URL,
its service-card hub and the September research; what changed is who it is written
for and how it is navigated.

**Structure.** H1 is now a reader question rather than a place name, followed by
three reader journeys (considering a move, newly arrived, already here) that anchor
into the guide instead of duplicating it. Sections run: at a glance, explore the
areas (Walton, Hersham, Whiteley Village, what counts as Walton), housing and the
real cost of living, getting around, schools nurseries and childcare, everyday life,
meeting people, weighing it up, before choosing a property, your first month,
common questions, research notes, references. Nothing verified was deleted: the old
sections were moved and re-levelled, and the dropped community block's Riverhouse
Barn and news links were folded into meeting people.

**Contents navigation.** `ThingsToDoStickyNav` (horizontal) is replaced by the
Diggers sidebar pattern, extracted from `HistoryLongform.astro` into
`src/components/GuideContents.astro` (sidebar and mobile variants, shared
active-section observer). The Diggers article now renders that component: its
contents output is byte-identical to before the extraction, checked link by link
against a pre-refactor snapshot. One fix was needed during extraction: the sidebar
renders before the article, so the observer had to wait for DOMContentLoaded or it
was handed an empty target list.

**Navigation label.** Main nav now reads "Moving & living here", route unchanged.
No overflow at 1280px. The homepage hero now links to the guide, which nothing on
the homepage did before.

**New material, all verified 19 September 2026.**
- Whiteley Village: 264 almshouse cottages plus Huntley House (51 extra-care flats),
  charitable almshouse tenure, not for sale or private rent (Whiteley Homes Trust,
  n.d.b). Eligibility stated as published: 65+ male, 60+ female, net income no more
  than £25,000 single or £40,000 couple, capital no more than £30,000 or £50,000,
  five consecutive years' UK residence, a defined housing need, and applications not
  currently accepted from people with a dementia diagnosis (Whiteley Homes Trust, n.d.c).
- Childcare: Surrey's Family Information Service childcare pages (Surrey County
  Council, 2026d) and the government's Best Start in Life service, which replaced
  childcarechoices.gov.uk (301 to beststartinlife.gov.uk). Funded hours quoted only
  as the service states them, "15 and 30 hours support" for children "aged between 9
  months and 4 years", with the checker linked as the live source (Best Start in
  Life, 2026a; 2026b).
- Property checks: Ofcom mobile and broadband checker (Ofcom, n.d.), Elmbridge "Find
  or comment on a planning application" (Elmbridge Borough Council, n.d.c), plus the
  existing Environment Agency and Surrey admissions sources.
- Hersham is framed as a neighbouring village with its own centre, station and guide,
  never as a Walton neighbourhood.

**Citations.** The page's 25 hand-written citation links were replaced by the shared
`linkCitations` helper, so all 84 in-text author-dates link to their own reference,
grouped ones included. Two backwards-compatible fixes to that helper: it no longer
splits a citation group on the semicolon inside an HTML entity (which broke "St
Peter's"), and it carries the author across a bare continuation year ("2026a; 2026b").
Diggers still links 129 citations with 0 unmatched. The research notes had lost every
citation group when the page was first built; they are restored from the approved
guide, along with the flood-risk note's dropped second sentence. Department for
Education (n.d.b) was removed from the reference list: it supported only the
pre-publication editorial note about Rydens, which was never published, so nothing
cited it.

**QA run 19 September 2026.** Build clean. `seo:validate` passes on 417 pages.
`seo:links` reports zero internal links to non-existent pages. No broken in-page
anchors, no heading-level skips, every reference cited. Mobile 375px: no horizontal
scroll, sidebar hidden, contents disclosure shown, summary 55px tall, all sub-24px
links are inline text rather than standalone targets. `astro check` reports 156
errors against 153 on main; the three-error gap is in `shopping/` pages this
checkout has not yet pulled, not in anything changed here.

## Still open
- **Anchor scrolling could not be exercised in the embedded browser.** Scripted hash
  changes and synthetic clicks did not move the page there. Verified structurally
  instead: every contents link resolves to an id that exists, and scroll-margin-top
  computes to 136px, clearing the 72px sticky header. Worth one manual check.
- **Active-section highlighting only marks a heading while it sits in the observer's
  band.** Landing between headings marks nothing. The live Diggers page behaves
  identically, so this is inherited, not introduced, but it is worth revisiting.
- **Darren's resident interview** is still to come. No placeholder box was published
  and no quotation invented; the meeting-people and areas sections are where it will go.
- **The Whiteley Village history page cites Wikipedia twice** (Protocol Tier 3,
  never acceptable as a sole source). Out of scope here, but it needs replacing with
  the Trust's own material or a published history.
- **Hersham living page still says Three Rivers Academy "opened in February 2018"**;
  GIAS gives 1 September 2016. Unchanged from the last session.

## 2026-09-20: two cross-page corrections alongside the living guide

**Three Rivers Academy on `/hersham/living/`** said "It opened in February 2018",
which conflated the school with its building. Get Information about Schools records
Rydens Enterprise School and Sixth Form College as closed on 31 August 2016 and Three
Rivers Academy as opened on 1 September 2016 as its successor, so the entry now says
that. The February 2018 building date, which construction-industry pages and Wikipedia
carry, is left out: the school's own site does not date the building, and no Tier 1 or
Tier 2 source checked on 20 September 2026 supports it.

**`/living/areas/` now links back into the guide.** Its opening paragraph names the
guide by its new title, and a short "Working out where to live" section before the
references points to housing and costs, getting around, and the property checks. The
two pages keep separate jobs: areas explains where each one is, the guide explains
what living there involves.

## 2026-09-20: /living/ made location-aware for all three communities

Built to Darren's location-aware brief. No new routes: he chose not to build
static `/living/walton-on-thames/`, `/living/hersham/` or
`/living/whiteley-village/` pages, which also avoids a collision with
`docs/hersham-head-term-plan.md`, where `/hersham/living/` is the designated
"living in Hersham" spoke and item 1.3 deleted a duplicate for that reason.

**How the filtering works.** Every guide section, contents entry, comparison
card and FAQ carries explicit metadata, never keyword matching:
`data-areas` (where it appears), `data-primary` (what it is about) and
`data-relevance` (primary or shared). The area keys are the site's existing
taxonomy from `src/content.config.ts`, the same vocabulary the clubs directory
filters on. A small inline script reads `?place=` (accepting `?area=` as an
alias for consistency with the directory), hides what does not apply, labels
what remains as "In X", "Nearby in X" or "Shared across ...", updates the
sidebar so it never points at a hidden section, and announces the change in a
live region. Links are real hrefs, history uses pushState, and back and forward
were tested. Without JavaScript every section is visible, which is the honest
default rather than an empty page.

**Whiteley Village is a separate journey**, not a filtered Walton page: what it
is, who can apply, how to apply, accommodation and terminology, life and
facilities, healthcare accessed outside the village, the 459, and costs with a
list of what to ask the Trust. It states plainly that it is not open-market
housing and that the borough price and rent figures do not describe it, and it
says the eligibility rules are the Trust's, not ours.

### Source and verification log, all checked 20 September 2026
- **ONS, Elmbridge (E07000207), last updated 16 September 2026.** House price
  £748,000 July 2026 provisional, up 1.9%; first-time buyers £501,000; home
  movers £956,000; average private rent £1,891 August 2026, up 2.6% from
  £1,843; rents by bedroom £1,264 / £1,589 / £1,937 / £2,884. The page had
  carried the June/July figures; all were updated together, and the provisional
  wording is now explicit.
- **Fort House Surgery** (NHS, H81020): Walton Community Hospital, Rodney Road,
  KT12 3LD. Added to the healthcare paragraph, which now defers to the
  maintained GP directory rather than presenting a fixed list.
- **Whiteley Homes Trust**: 264 almshouse cottages on the cottages page and the
  same figure on Living at Whiteley, plus Huntley House at 51 extra-care flats.
  Published as "more than 250" per the brief's cautious wording. Cottages are
  unfurnished and residents arrange their own service contracts. Eligibility,
  forms and the dementia exclusion from the apply page. Shop and Post Office
  hours, and the community cafe open to everyone, from their own pages.
- **Hersham station** (National Rail, HER; this site's station guide): South
  West Main Line, two trains an hour each way, all stopping, about 33 minutes
  to Waterloo, no lift and no step-free platform access.
- **Bus 459** (Surrey County Council): Staines, Laleham, Shepperton, Walton,
  Hersham and Whiteley Village.

### Corrections made
- **"Its own railway station on a different line"** was wrong: Hersham is on the
  same South West Main Line. Replaced with the stopping-pattern and frequency
  distinction.
- **Cross-page contradiction fixed:** `/walton-on-thames-railway-station/` said
  Hersham "has a separate station on the branch towards Hampton Court", which
  contradicted this site's own Hersham station page. Corrected.
- **"Register with a pharmacy"** became choosing a pharmacy and nominating it
  for electronic prescriptions.
- **Unsupported superlatives:** "the main cultural venue" is now "runs a
  year-round programme"; "the nearest major retail centre" is now Kingston
  "about seven miles away ... the retail centre most people here name".
- **"What to consider before moving to Walton-on-Thames"** is now "Choosing
  between the three communities".

### QA
Build clean. `seo:validate` passes on 467 pages. `seo:links`: zero links to
non-existent pages. `astro check`: 153 errors, identical to clean main, none
from these files. One H1, no duplicate ids, no broken anchors, no hidden links
reachable by keyboard. At 390px: no horizontal scroll, 46px selector targets,
cards stacked, contents disclosure filtered. Canonical on every `?place=` view
is the clean `/living/` URL, so the query states are not separately indexable;
no FAQ schema is emitted, so nothing is claimed for hidden questions.

## Still open
- **Whiteley facilities: only what the Trust publishes.** The brief listed a
  library, church, activity centre, allotments and clubs; the Trust's community
  pages name only the shop and Post Office, community cafe, swimming pool and
  volunteering. Darren's decision, 20 September 2026: state only what we have
  evidence for. The page names those four and sends readers to the Trust for
  anything else, and a sentence reporting what residents "describe" was removed
  for the same reason. Still worth asking the Trust for a citable list.
- **The residents' handbook could not be re-read.** It is an image-based PDF and
  no text could be extracted, so the statement that it directs residents to
  Hersham Surgery is carried from this site's GP surgeries page rather than
  re-verified against the handbook itself.
- **Charges are off the page entirely.** Darren's decision, 20 September 2026:
  do not mention a weekly maintenance contribution at all, and direct readers to
  the Whiteley Homes Trust for what living there costs. The costs section says
  the Trust sets this out, and links its Living at Whiteley and Contact Us pages
  (both checked, HTTP 200, 20 September 2026).
- **Darren's resident interview** is still outstanding and unaffected by this work.

## 2026-09-20: LinkedIn added to the footer and the Organization schema

Darren supplied the new company page, `linkedin.com/company/walton-on-thames-org`, which returns 200. Added in the two places the site's social profiles live, so they cannot drift apart:

- `Footer.astro`, a fourth badge after Facebook, same 36px target and 20px glyph as the others, same `rel="me noopener noreferrer"`, `aria-label="Walton-on-Thames.org on LinkedIn"`. The footer is in `BaseLayout`, so the badge is on every page.
- `BaseLayout.astro`, appended to the Organization node's `sameAs`. That array is what tells search engines the profiles belong to the same entity, and it had the other three already.

Note for future edits: `Footer.astro` is LF throughout and `BaseLayout.astro` is CRLF throughout. A scripted edit that assumes one will silently fail to match in the other.

The Bluesky placeholder comment in the footer was left for an account that did not exist yet; filled the next day, see below.

## 2026-09-21: Bluesky added to the footer and the Organization schema

Darren supplied the account, `bsky.app/profile/walton-on-thames.org`. A 200 from bsky.app proves nothing, since it is a JavaScript app that serves the same shell for any path, so the account was checked through Bluesky's public API instead: `app.bsky.actor.getProfile` returns handle `walton-on-thames.org`, DID `did:plc:d7lydwjkdj5xox7gmavgsutc`, display name "Walton-on-Thames.org", 29 posts.

- `Footer.astro`: the badge replaces the `<!-- Bluesky to be added here once the account exists -->` placeholder, so it sits first, before Instagram, as that comment specified. Same 36px target, 20px glyph, `rel="me noopener noreferrer"` and aria-label pattern as the other four.
- `BaseLayout.astro`: appended to the Organization node's `sameAs`, which now lists all five profiles.

**The handle depends on DNS, not on this repo.** `walton-on-thames.org` is a domain handle, and Bluesky verifies it through the TXT record `_atproto.walton-on-thames.org` = `did=did:plc:d7lydwjkdj5xox7gmavgsutc`. The alternative method, a file at `/.well-known/atproto-did`, is not used: the live site returns 404 there and the repo has no `public/.well-known/`. So no deploy can break the handle, but deleting that TXT record in the Cloudflare DNS dashboard would, and the account would drop back to a `.bsky.social` handle.
