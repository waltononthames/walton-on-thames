# Events sources

The sources the events refresh checks, what each is good for, and how to fetch it. The refresh routine's prompt (`docs/events-refresh-prompt.md`) runs `npm run events:fetch`, which fetches the pages listed in `scripts/event-sources.json`. That file is the machine list; this one explains each source and the house policies. When a run finds a new useful source, add it to both in the same commit.

CLAUDE.md's Content Verification Protocol (Rule 4, Events listings) still governs what may be published. This file only records where to look and the house policies for cases the protocol leaves open.

## Before you start

- `npm run events:fetch` fetches every source below one request at a time, plus the source of every lapsed recurring event and the Riverhouse Barn feed. It applies the fetching etiquette below, saves each page as text, extracts Riverhouse JSON-LD, and updates `docs/events-refresh-state.json` with each source's outcome and run of blocks. Its `NOTIFY:` lines say whether a source problem needs a push notification.
- `npm run content:stale-events` lists recurring events whose date has lapsed. Re-verify each one against its source, then re-date it or delete it.
- `npm run content:past-events` lists the same and also one-off events that have finished. Delete those files: the listing pages already hide them, so this is housekeeping, not a fix.
- An event has lapsed when the calendar day of its `end` (or `start` if there is no `end`) is before today. This is the same rule `src/pages/whats-on/index.astro` uses.

## Fetching etiquette

- Fetch one page at a time from any single site, with a pause of a few seconds between requests. Never fire parallel requests at one host.
- A login wall, a 403, a Cloudflare challenge or a ticketing waiting room is a block. Record it in the run report and move on. Do not disguise requests to get past it: no browser user agents, proxy services, mirrors or caches. Our requests always identify themselves honestly.
- A site that refuses cloud servers outright may be read from a feed Darren's own machine publishes, at the same pace and with an honest user agent. Riverhouse Barn is read this way (see below). That is an ordinary visit from a home connection, not a disguise.
- A connection fault is not a block. An HTTP/2 protocol error (curl error 92), a reset or a timeout gets one retry with `curl --http1.1`; if that fails too, record the source as unreadable. Love Walton and Dramacube both failed this way on 8 November 2026.
- If a host does not resolve because the session's network policy blocks it, list it in the report as needing to be allowed. Don't investigate the sandbox's network or proxy.
- A source marked **intermittent** below sometimes blocks a run and reads fine the next day. Record the block in the report; `docs/events-refresh-state.json` counts blocked runs in a row, and `events:fetch` asks for a notification only from the second.

## Primary sources

### Riverhouse Barn Arts Centre
- **Read from:** the feed at https://github.com/waltononthames/riverhouse-feed, not the venue's site. `events:fetch` reads `events-latest.json` (and `status.json`) from it.
- **Cite:** the venue's event page, `https://www.riverhousebarn.co.uk/events/<id>`, as `source_url`, as before. The feed is a faithful copy of the venue's own pages, read daily.
- **Good for:** most concerts, comedy, talks, exhibitions and termly classes in Walton. This is the largest single source, with about half of all listings.
- **How the feed is made.** The venue has refused every cloud request since 8 November 2026 (HTTP 403, latterly even robots.txt). From 22 November 2026, Atlas runs `publish.py` daily between 03:15 and 03:30 UK time: about 114 requests, one at a time, at least 3 seconds apart, under the user agent `walton-events-refresh (+https://walton-on-thames.org)`. It commits to the feed repository's `main` as "Riverhouse feed YYYY-MM-DD" every day, even when nothing changed. The cloud run no longer requests the venue's site at all. The former home fetch (`--riverhouse-snapshot`, `data/riverhouse-snapshot/`) was retired the same day.
- **What `events:fetch` writes:**
  - `riverhouse-barn.txt`: every event in the feed, one line each (id, start, price, name), marked `published` where a listing already cites it. Use it to deduplicate.
  - `riverhouse-barn-<id>.txt`: the feed's record for each event not yet published, each one cited by a lapsed listing, and each published one the feed now contradicts. It gives name, start, end, price, on-sale and cancelled flags, tags, schedule and the description text.
  - `riverhouse-events.json`: the same events with `jsonld[0].startDate`, `endDate` and `offers`, in the shape the old JSON-LD extract used, plus the full feed record under `feed`.
  - `riverhouse-check.json`: published listings that are `cancelled` (delete them), `changed` (start or end moved: update them from the feed), or `notInFeed`.
- **Feed fields.** `start_datetime` and `end_datetime` are Europe/London wall-clock times, as the site uses. `end_datetime` is the venue's own published end, so it may be used as `end`; where it is null, omit `end`. `price_min` and `price_max` cover the online ticket types, include booking fees and exclude free carer and companion tickets. They are null where nothing is on sale online (classes where you enrol by email, off-sale events): write `price: "See venue for details"` then, unless the description states one. Never leave `price` out: the schema defaults it to "Free", and the site then badges the event as free (an audit on 23 November 2026 found five listings shown as free this way). A range spans ticket types (adult, concession, child), so read the `tickets` list before writing it: state "£16 to £18" only as a range, never as the adult price, and leave out add-ons that are not admission, such as a cafe lunch. Any `price` beginning with "Free" is also badged as free, so write a range with a free ticket type as, for example, "£12 to £16, under-2s free". A `price_min` of 0 is a ticket type such as under-2s; say what the description says it is, or write "Up to £X". Where the description states a different price (for example a cash-on-the-door price for the RC Sherriff talks), the description wins, because it is the venue's own wording.
- **Freshness and failure.** A feed older than 36 hours is stale: `events:fetch` prints a `NOTIFY:` line and the run leaves the published Riverhouse listings untouched (no deletions, no re-dating) and says so in the report. `status.json` is written only when Atlas's run fails and is never deleted, so `events:fetch` treats it as current only when its `last_attempt` is later than the feed's `generated_at`; a current one gets a `NOTIFY:` line too.
- **Cancelled and withdrawn events.** A row with `is_cancelled` true: delete our listing if we have one, and do not add it. A published listing whose event is missing from a **complete** feed (on a day after the feed was written) has been withdrawn: `riverhouse-check.json` lists it under `notInFeed`, and the run deletes it and says so in the report.
- **Partial feeds (`complete: false`).** Use the events a partial feed contains: add and update from them as normal, since each is a fresh read of the venue's page. Delete nothing for being absent, because a partial scrape misses events for reasons of its own; `events:fetch` does not check absences against a partial feed, and prints a `NOTIFY:` line so Darren knows Atlas's run was partial. Say in the report that deletions were skipped.
- **Descriptions.** Write the description in our own words from the description text. Do not copy the venue's wording.
- **Classes and courses.** One listing per course; skip courses already under way (house policies below). A class's `start_datetime` is often the first session of the term, not the next one. Read the term dates from the description. Some classes have one record per block or per date (Our ArtClub, Riverhouse Poets, the Hummingbird sound baths); cite the record that carries the next date.
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

### The Heart Shopping Centre
- **Listing:** https://heartshopping.co.uk/whats-on/
- **Good for:** family events the centre runs itself (workshops, author visits, seasonal events such as Halloween and Christmas). It is the organiser's own page, so it beats Love Walton for these. Added 8 November 2026.
- **Quirks:**
  - It is a news feed of announcements, not a calendar. Each item links to a post at a relative path, `whats-on/YYYY/MM/DD/<slug>/`, which `events:fetch` keeps in the saved `the-heart.html` (the text file drops links). Open the posts that are new since the last run to find the event's own date, time and price.
  - Neither the date shown on the listing nor the date in the post's path is the event date, and the two can differ (Win a Shop: 14 September shown, 23 September in the path). Only publish the event date the post itself states.
  - Some posts are competitions or announcements, not events: skip them. Others cover events run by a shop in the centre (Rock Up's Mini Movers Club); cite the shop's own page where it has one.
  - Older posts run to `?page=41`; only the first page needs reading.
- **Venue string:** `The Heart Shopping Centre, New Zealand Ave, Walton-on-Thames, KT12 1GH`, as the centre's footer gives it.

### Walton Voices
- **Listing:** https://www.waltonvoices.co.uk/events.html ("Future Concerts and Events")
- **Good for:** the community choir's concerts and workshop days. Added 8 November 2026.
- **Walton-on-Thames and Hersham only.** The choir often performs outside the area. List an event only when its venue is in Walton-on-Thames or in Hersham (both are covered), and skip the rest without mentioning them in the report. This is the owner's decision of 8 November 2026: the 28 November 2026 concert at St Mary's Church, Sunbury-on-Thames was left out under it.
- **Quirks:** bookings go through TicketSource (www.ticketsource.co.uk/waltonvoices), which returns 403 to automated fetches, so this page is the source to cite. It gives dates and venues; state a time or price only where the page or a readable linked page publishes one.

### Other organiser pages cited by current listings
| Source | Listing | Notes |
|---|---|---|
| https://www.waltonbowlingclub.org.uk/ | Bowling club Tuesday roll-up | From 5pm, no finish time given. Love Walton's times contradict the club's. |
| https://www.achurchnearyou.com/church/8235/service-and-events/events/912783/ | Connections over-60s | Second Saturday of the month, noon for 1 hour 30 minutes. |
| https://repaircafewot.org.uk/ | Repair Cafe | Second Saturday of the month, 10am to 1pm, by appointment. The home page names extras for the next session. |
| https://www.rock-up.co.uk/locations/walton-on-thames | Mini Movers Club | Thursdays. From 13 November 2026 the page no longer mentions the club, so the listing cites Love Walton (dates and 9am to 12pm timing) and The Heart's July launch post. |
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
