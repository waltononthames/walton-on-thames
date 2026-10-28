# Events sources

The sources the events refresh checks, what each is good for, and how to fetch it. The refresh routine's prompt (`docs/events-refresh-prompt.md`) says "check every source in this file", so this is the single list: when a run finds a new useful source, add it here in the same commit.

CLAUDE.md's Content Verification Protocol (Rule 4, Events listings) still governs what may be published. This file only records where to look and the house policies for cases the protocol leaves open.

## Before you start

- `npm run content:stale-events` lists recurring events whose date has lapsed. Re-verify each one against its source, then re-date it or delete it.
- `npm run content:past-events` lists the same and also one-off events that have finished. Delete those files: the listing pages already hide them, so this is housekeeping, not a fix.
- An event has lapsed when the calendar day of its `end` (or `start` if there is no `end`) is before today. This is the same rule `src/pages/whats-on/index.astro` uses.

## Fetching etiquette

- Fetch one page at a time from any single site, with a pause of a few seconds between requests. Never fire parallel requests at one host.
- A login wall, a 403, a Cloudflare challenge or a ticketing waiting room is a block. Record it in the run report and move on. Do not work round it with other user agents, mirrors, caches or scripts.
- If a host does not resolve because the session's network policy blocks it, list it in the report as needing to be allowed.

## Primary sources

### Riverhouse Barn Arts Centre
- **Listing:** https://www.riverhousebarn.co.uk/whatson?language=en
- **Event pages:** `https://www.riverhousebarn.co.uk/events/<id>?language=en`
- **Good for:** most concerts, comedy, talks, exhibitions and termly classes in Walton. This is the largest single source, with about half of all listings.
- **Quirks:**
  - **Rate limit.** Fetching event pages in parallel puts you in the venue's ticketing waiting room ("Position ... in the queue"). On 28 October 2026, 33 pages were queued, and clearing them took four rounds of slow retries. Fetch event pages one at a time, about 6 to 10 seconds apart. If a page still shows the queue, come back to it at the end of the run.
  - **Dates and prices.** The visible text often omits the date, time and price. Read them from the page's JSON-LD: `startDate`, `endDate`, and `offers` (`price`, or `lowPrice`/`highPrice` for an `AggregateOffer`). An `AggregateOffer` with `lowPrice` 0 usually means under-2s go free; the text says so.
  - **Classes and courses.** The visible text holds the term dates. A page's `startDate` is often the first session of the term, not the next one. Some classes have one page per block or per date (Our ArtClub, Riverhouse Poets, the Hummingbird sound baths); cite the page that carries the next date.
  - Some class pages (Life Drawing, Introduction to Jewellery Making, Dance Happy) are not on the what's on listing. Read them directly by id.
- **Venue string:** `Riverhouse Barn Arts Centre, Manor Road, Walton-on-Thames, KT12 2PF`. Gallery exhibitions use `Robert Phillips Gallery, Riverhouse Barn Arts Centre, Manor Road, Walton-on-Thames, KT12 2PF`. Love Walton spells the gallery "Phillip Roberts"; the site uses "Robert Phillips".

### Surrey County Council libraries
- **Walton:** https://www.surreycc.gov.uk/libraries/your-library/find-your-nearest/walton/events-and-activities
- **Hersham:** https://www.surreycc.gov.uk/libraries/your-library/find-your-nearest/hersham/events-and-activities
- **Good for:** the regular sessions (rhymetimes, storytimes, Bookchats, LEGO club, digital support) and a **Special events** section at the top of each page. That section held 10 events on 28 October 2026. Read it every run, not just the regular sessions.
- **Quirks:**
  - Pages carry a "Reviewed" date at the foot.
  - Some sessions are term time only. Check them against Surrey's term dates: https://www.surreycc.gov.uk/schools-and-learning/schools/term-dates. From September 2026 the autumn half term is two weeks (19 to 30 October 2026).
  - Love Walton re-lists the library sessions, but sometimes on the wrong weekday. The council page wins.

### Cecil Hepworth Playhouse
- **Listing:** https://www.cecilhepworthplayhouse.co.uk/whats-on (the homepage shows the same list).
- **Good for:** theatre and tribute shows at the playhouse. The page says more shows are announced weekly.
- **Quirks:**
  - Performing groups run their own box offices. Cite the group's TicketSource, Eventbrite or own page where the playhouse links one; otherwise cite the playhouse's what's on page.
  - The Box Office page links to a TicketSource search for every show at the venue. TicketSource returns 403 to automated fetches, so that list cannot be checked by a run. Shows listed only on TicketSource can't be re-checked either.

### Crafty Pots Cafe
- **Home:** https://www.craftypotscafe.com/ (the "What's on" menu links to the event pages)
- **Event pages seen so far:** `/copy-of-thursday-sip-paint-1` (the weekly Thursday Sip & Paint), `/thursday-sip-and-paint`, `/oasis`, `/baublesandbubbles`, `/xmas-sing-a-long`
- **Good for:** the weekly Sip & Paint and seasonal specials.
- **Quirks:** The site returns 429 when hit too quickly; wait and retry once. Page slugs change, so start from the home page's what's on menu.

### St Peter's Church, Hersham
- **Community Cafe:** https://stpetershersham.com/church-life384695/community-cafe/ (every Wednesday, 10am to 12pm)
- **Men's Group (SPAM):** https://stpetershersham.com/church-life384695/mens-group/ (second Monday of the month, from 8pm, at The Royal George)
- Each page shows a "Page last updated" date. Re-date from the stated pattern only while the page still states it.

### Other organiser pages cited by current listings
| Source | Listing | Notes |
|---|---|---|
| https://www.waltonbowlingclub.org.uk/ | Bowling club Tuesday roll-up | From 5pm, no finish time given. Love Walton's times contradict the club's. |
| https://www.achurchnearyou.com/church/8235/service-and-events/events/912783/ | Connections over-60s | Second Saturday of the month, noon for 1 hour 30 minutes. |
| https://repaircafewot.org.uk/ | Repair Cafe | Second Saturday of the month, 10am to 1pm, by appointment. The home page names extras for the next session. |
| https://www.rock-up.co.uk/locations/walton-on-thames | Mini Movers Club | Thursdays. The page gives no session times; Love Walton supplies 9am to 12pm. |
| https://www.hershamsportsandsocialclub.co.uk/tuesday-live-music-nights.html | Tuesday Live Music Club | Every Tuesday, acts from 8pm. |
| https://thewaltonvillage.com/thursdays-quiz-night | Thursday quiz | Every Thursday from 7:45pm. |
| https://www.surreymarkets.co.uk/walton-on-thames-market/ | Walton Farmers' Market | First Saturday of the month, 9:30am to 2pm. |
| https://mezzacraft.newzenler.com/ | Mezzacraft crochet courses at Riverhouse Barn | Each course page lists its week-by-week dates. |
| https://dramacube.co.uk/workshops/ | Dramacube holiday workshops | |

## Secondary sources

### Love Walton
- **Listing:** https://lovewalton.co.uk/whats-on/
- **Good for:** discovering events, and for events Walton BID itself organises (where it is the primary source; see CLAUDE.md).
- **Policy for Love Walton-only events.** Search for the organiser's page first. If none exists, add the event anyway: cite its named Love Walton page, and end the source line saying no organiser listing could be found. Do not skip the event because Love Walton is the only source. That is exactly the case CLAUDE.md's exception covers.
- **Links:** A named event page (`/event/annual-remembrance-service/`) is stable. A numbered one (`/event/ashley-park-school-cafe-public-cafe-3/`) is a single occurrence and redirects to the home page once it passes. For recurring events, link `/whats-on/` instead.

### Your Elmbridge
- **Listing:** https://yourelmbridge.co.uk/whats-on-in-elmbridge/
- **Good for:** dates the organiser publishes only on Facebook, notably the Hersham Village Market Friday and Sunday markets, which this listing gives month by month. It also corroborates the Live Music Club, Repair Cafe and Farmers' Market.
- Use it as a cited second source alongside the organiser, or as the dated source where the organiser's own page is unreadable. Do not add an event from it alone when the organiser has a readable page.

## Facebook: expected to fail

Facebook event search has returned a login wall to automated fetches since early October 2026. By 28 October 2026 event pages and page timelines also returned a login wall, an error page or no event details. Treat every Facebook URL as **expected to fail**: try it once, record "not readable" in the report, and move on.

Listings that depend on Facebook alone cannot be re-verified. Before one lapses, look for another source (the organiser's website, Love Walton, Your Elmbridge, the venue). Once it lapses, delete it rather than leave it hidden:

| Listing | Facebook source | Other source |
|---|---|---|
| Empty Chairs monthly meetup, The Walton Village (recurring, next 2 November) | event page | none found |
| Crochet meetup at St Erconwald's (2 November) | event page | none found |
| Surrey Soul Sensation, Walton Comrades (1 November) and Christmas party, Hersham (19 December) | event pages | none found |
| Hersham Village Friday Market | page | Your Elmbridge gives the dates |
| Walton Festival of Light (28 November) | event page | Walton BID organises it, so Love Walton is a primary source |

Yoga with Sonia was retired on 28 October 2026: its only source was a Facebook event, and no other listing could be found.

## House policies

- **Courses already under way.** Skip a course or class block that started before the run and is sold as a whole term or course (for example the Riverhouse Mixed Media course that began on 25 September 2026). List the next term or course when it is announced. Drop-in sessions with a stated weekly pattern are not courses: re-date them as usual.
- **End times.** Only state an `end` the source publishes. If the source gives a start time only, omit `end`. Never estimate an end time and add a sentence saying so: that is a hedged invention under Rule 3. If a file you touch has an estimated end, remove the `end` field and the sentence.
- **Finished courses.** When a course's listed dates have all passed and the source shows no further dates, delete the listing rather than re-dating it.
- **Two showings or dates on separate source pages.** Use one file for the first date. Mention the other date in the body and cite both pages in the source line.
