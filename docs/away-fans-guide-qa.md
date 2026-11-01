# Away fans' guide: QA (Phase 6)

Checked 5 October 2026 on branch `feature/away-fans-guide`, after merging `main`, against the brief's section 14 acceptance checks and section 11 budgets. Local production build served by `astro preview`; the structured data was also tested on the branch preview URL.

The guide is still a prototype: 9 placeholder values wait on the site visit, so the page is `noindex` and the build blocks `main`. Re-run the starred checks (*) once those are filled and the remaining photos are in.

## Results

| Check | Result |
|---|---|
| Lighthouse mobile, all four categories 95+ * | Performance 97 (three runs, all 97), Accessibility 96, Best Practices 100, SEO 69. SEO is low only because the page is `noindex` while placeholders remain; without that one audit it scores 100. Accessibility 96 is the site-wide footer (below) |
| Lighthouse desktop * | Performance 100, Accessibility 96, Best Practices 100, SEO 69 (same reason) |
| Budgets (mobile, simulated 4G) | LCP 2.4 s (target under 2.5 s; the aim of 1.8 s is not met: the LCP is now the opening photograph). CLS 0.017 to 0.023 (under 0.05). TBT 0 ms. JavaScript on first load 6 KB compressed (budget 30 KB). Page weight 320 KB mobile, 357 KB desktop (budget 500 KB) |
| Map library, loaded only on tap | MapLibre GL JS 270 KB compressed (1.0 MB raw), its stylesheet 10 KB compressed, plus OpenFreeMap tiles as the reader pans |
| Screenshots at 360, 390, 768, 1024, 1440 px | No horizontal scrolling at any width, no console errors. The site has no dark mode, so light only |
| Readable and navigable without JavaScript | All chapters, the walking steps, the timetable tables, the matchday timeline and every fact are in the HTML (3,178 words without JavaScript, 3,265 with: the difference is the "open now" labels, the train finder's results and the button labels). Every in-page link resolves |
| axe (WCAG 2.2 AA and best practice), phone and desktop | Nothing in the guide. Two site-wide issues remain in the shared footer and header: 11 footer text colours below 4.5:1 (#677980 on #01202C, 3.71:1) and the logo's alt text repeating the site name. Both affect every page and were split off as a separate task |
| Keyboard-only walkthrough | Every control reachable with a visible focus ring, none hidden behind the sticky header, the phone bottom bar or the pinned route map. Each component works from the keyboard: skip link, copy postcode (announced), chapter menu, route choice (arrow keys), "open now" filters, map category toggles, last-train finder, matchday timeline, save card, live map (focus moves into the map, which pans with the arrow keys) |
| `prefers-reduced-motion` | No running animations, no smooth scrolling, the route map jumps between steps without transitions |
| Structured data | Schema.org validator: 0 errors, 0 warnings (BreadcrumbList, Article, three SportsEvents, FAQPage, with StadiumOrArena and SportsTeam inside). Google Rich Results Test: every item valid (Article, Breadcrumbs, 3 Events, Local business, Organization). Google cannot crawl the preview because Cloudflare marks previews `noindex`; re-test on the live URL * |
| Print card | One A4 page |
| No placeholder or to-do text in production | The build blocks `main` while any placeholder remains, and while the publication date is unset (below). Unconfirmed facts render nothing in production |
| Em and en dashes | None in the page text, metadata or alt text |
| British spelling | No American spellings found; dates and times in British form |
| Every fact in the sources file | Yes. Data facts carry a source in their records (the schema refuses them otherwise); the page's own statements of position were added to the sources file on 5 October; the day-out cards are the site's attraction listings, each with its official site and a verified date |
| Independence notice | At the top and in the footer of the page |
| Other pages unaffected | Full build passes (431 pages). Outside the guide the branch only adds links to six pages, a "Report a change" option on the contact form and three source types. `astro check`: 148 errors, all older and elsewhere; none in the guide's files |
| External links | All resolve. Hampton Court Palace refuses automated requests (403) but loads in a browser. The Regent's link updated to its current address |

## Fixed in this phase

- Each "Need to know" panel now has its own accessible name ("Need to know: parking"), so they can be told apart in a landmark list.
- Keyboard focus and chapter links stay clear of the sticky header, the phone bottom bar and the pinned route map (WCAG 2.4.11, focus not obscured).
- The pinned route map on desktop, with its key and credit, now fits inside the window.
- The route story switches to its scroll-driven layout while the page loads, not when the reader reaches it, so nothing below moves and links to later chapters land in the right place.
- The pinned phone map no longer pokes 8 px past the screen edge (which made the page scroll sideways).
- Focus moves into the live map once it loads; the kick-off time input has a focus ring; no smooth scrolling under reduced motion.
- Empty photo slots lose their labels in a production build (the labels stay on previews).
- Structured data: author linked to the About page; each fixture has a description, image, organiser and teams; the stadium has an image.

## Launch, 21 October 2026

Published at Darren's request before the site visit and before the remaining photographs.

- The 9 placeholder values became unconfirmed site-visit questions, so production shows none of them: the routes' best for, surface, lighting and after-dark notes. A route's "Need to know" panel is left out while it has nothing confirmed to show.
- The walking directions are published: they follow the streets Darren specified on 29 September and 1 October, checked against the OpenStreetMap geometry. The "Sample" tags are gone.
- `published: "2026-10-21"` set in `info.yaml` (the Article's `datePublished`).
- Production build checked with `CF_PAGES_BRANCH=main`: no noindex, no prototype banner, no Sample tags, no slot labels, no unconfirmed questions; in the sitemap and the site search. No horizontal scrolling at five widths, print card one page, axe clean apart from the site-wide footer. Lighthouse mobile SEO 100, Best Practices 100, Accessibility 96; Performance 94 to 95 with LCP 2.9 to 3.0 s, measured while this machine benchmarked at about half its 5 October speed (same page weight as then, when LCP was 2.4 s). Re-measure on the live URL.

## Still to do

1. Site visit: answer the route questions (lighting, surface, steps, after dark, best for), and the taxi rank's position. (Old Manor Inn's address: done, 31 October 2026.) Each answer shows on the page as soon as it is recorded with its source.
2. Club answers to the questions in the sources file (section 1). Unanswered ones do not show.
3. Remaining photographs from the shot list (25 slots). An empty chapter header keeps a plain dark background and an empty step photo is left out.
4. Fix the site-wide footer contrast and logo alt text.
5. After launch: PageSpeed Insights and the Rich Results Test on the live URL, then request indexing in Search Console.
