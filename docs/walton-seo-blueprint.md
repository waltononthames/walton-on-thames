# Walton-on-Thames.org: Complete SEO Site Blueprint

Prepared for Darren Bayley. Purpose: win the number one organic ranking for "Walton on Thames" and own the surrounding local query space.

---

## 1. Competitive position

The current SERP for "Walton on Thames" is winnable. It is held by Wikipedia (informational authority), wotta.co.uk (the Trading Alliance site, deep but structurally dated), Tripadvisor (dominates "things to do" modifiers), Rightmove/estate agents (property intent), and Elmbridge Borough Council (civic queries). No single site serves all intents well. A fast, well-structured, regularly updated site with a named local author can become the canonical result Google prefers for the head term, because Google increasingly rewards sites that satisfy multiple intents behind an ambiguous query.

Strategy in one line: be the single best answer for every major intent behind "Walton on Thames", interlink those answers tightly, and demonstrate first-hand local expertise on every page.

## 2. Keyword and intent map

| Intent cluster | Representative queries | Target page |
|---|---|---|
| Head term | walton on thames, walton-on-thames surrey | Homepage |
| Things to do | things to do in walton on thames, walton on thames with kids, rainy day, free things to do | /things-to-do/ + spokes |
| River | walton on thames river walks, boat hire walton, walton bridge, desborough island | /things-to-do/riverside-walks/ etc |
| Food and drink | walton on thames restaurants, riverside pubs walton, pubs on the thames near walton, cafes walton | /food-and-drink/ + spokes |
| Events | whats on walton on thames, walton on thames events this weekend | /whats-on/ |
| Living | living in walton on thames, is walton on thames a nice place to live, moving to walton | /living/ + spokes |
| Schools | schools in walton on thames, best primary schools walton | /living/schools/ |
| Property | walton on thames property, house prices walton on thames | /living/property/ |
| Transport | walton on thames station, walton to waterloo, parking walton on thames | /getting-here/ |
| History | walton on thames history, hepworth studios, famous people from walton on thames | /history/ + spokes |
| Named entities | the heart walton, xcel leisure centre, everyman walton, riverhouse barn, cowey sale, ashley park | Entity pages and directory entries |
| Directory | plumber walton on thames, hairdresser walton, gyms walton (long tail) | /directory/ categories |

Priority order for build: Homepage, Things to Do hub, Food and Drink hub, What's On, History hub, Living hub, Getting Here, Directory, then spokes in descending search volume.

## 3. Site architecture

Flat, hub and spoke, nothing more than two clicks from home. Breadcrumbs on every page with BreadcrumbList schema.

```
/
├── /things-to-do/
│   ├── /things-to-do/riverside-walks/
│   ├── /things-to-do/parks-and-green-spaces/
│   ├── /things-to-do/with-kids/
│   ├── /things-to-do/rainy-day/
│   ├── /things-to-do/on-the-river/        (boat hire, kayaking, SUP)
│   └── /things-to-do/desborough-island/
├── /food-and-drink/
│   ├── /food-and-drink/riverside-pubs/
│   ├── /food-and-drink/restaurants/
│   └── /food-and-drink/cafes-and-coffee/
├── /whats-on/                              (automated events feed)
├── /living/
│   ├── /living/schools/
│   ├── /living/property/
│   ├── /living/areas/                      (Ashley Park, Rydens, Field Common, town centre)
│   └── /living/community/                  (clubs, societies, charities)
├── /history/
│   ├── /history/walton-bridge/
│   ├── /history/film-studios/              (Hepworth/Nettlefold/Walton Studios)
│   ├── /history/famous-residents/
│   └── /history/st-marys-church/
├── /getting-here/                          (station, parking, buses, road)
├── /directory/
│   └── /directory/{category}/{business}/
└── /about/
```

### URL and template rules

- Lowercase, hyphenated, no trailing parameters. One canonical URL per intent.
- Every page: unique title tag (under 60 characters), meta description (under 155), single H1, descriptive H2s that mirror People Also Ask questions.
- Every hub links to all its spokes and at least two sibling hubs. Every spoke links back to its hub and to two related spokes. The homepage links to every hub.
- Images: local photographs wherever possible (a genuine ranking and trust differentiator over stock), descriptive filenames (walton-bridge-from-cowey-sale.jpg), alt text, compressed to WebP/AVIF. Astro's image pipeline handles this natively.

### Schema strategy

- Homepage: `Place` (Walton-on-Thames) plus `WebSite` with sitelinks searchbox.
- Directory entries: `LocalBusiness` with address, geo, opening hours.
- Events on /whats-on/: `Event` schema per listing (eligible for event rich results).
- History and guide pages: `Article` with `author` linked to your /about/ Person entity.
- FAQ blocks on hubs: `FAQPage` where questions match real PAA queries.

### E-E-A-T foundations

- /about/ names you as author and editor, with your local connection, LinkedIn, and editorial policy (how listings are selected, how often content is reviewed).
- Every article page carries a byline, a "last reviewed" date, and sources.
- Because the commercial model is undecided, keep the directory strictly editorial for now. If sponsorship comes later, label it clearly (CAP Code requires identifiable marketing) and keep sponsored placements out of editorial guide pages. This protects the site's trust profile, which is the asset that ranks.

---
## 4. Page-by-page copy

Copy below is written in a measured, plain English register, British spelling, no hype. Facts are drawn from Wikipedia, the Walton Studios record, Elmbridge sources and local heritage material; each page lists sources to cite on-page. Word counts are targets after you add photography captions and directory pulls.

---

### 4.1 Homepage `/`

**Title:** Walton-on-Thames: The Local Guide to the Town on the River
**Meta:** Everything you need to know about Walton-on-Thames, Surrey. Things to do, riverside pubs, what's on, local history and life in KT12, written by locals.
**H1:** Walton-on-Thames

**Copy (target 1,200 to 1,500 words; core text below, expand each section with a photograph and a link block):**

Walton-on-Thames is a market town on the south bank of the River Thames in north west Surrey, around 15 miles from central London. Known locally simply as Walton, it sits in the Borough of Elmbridge between Weybridge and Sunbury, with the river forming its northern edge. Around 23,000 people live here, and a fast train from Walton-on-Thames station reaches London Waterloo in roughly 25 minutes, which explains why the town has long been a favourite of commuters who want the river without the city.

This site is an independent local guide. It exists to answer, in one place, the questions people actually ask about Walton: what to do here, where to eat and drink, what is on this week, what it is like to live here, and how a quiet Surrey town came to play an outsized role in the history of British film.

**The river (H2)**
The Thames defines Walton. The towpath runs unbroken through the town, past Cowey Sale and under Walton Bridge, the sixth bridge to cross the river here since 1750. Canaletto painted the first; Turner painted the second. Today's bridge, opened in 2013, carries the A244 towards Shepperton. Downstream lies Sunbury Lock; upstream, the Desborough Cut of 1935 created Desborough Island, now one of the best circular walks in Elmbridge. Start with our guide to riverside walks. [link]

**Things to do (H2)**
Beyond the towpath, Walton has an Everyman cinema, the Xcel leisure complex with its pool and climbing wall, the Riverhouse Barn arts centre in a restored eighteenth-century barn near the river, boat hire and paddleboarding from the marina, and a run of parks from Ashley Park to Elmgrove Recreation Ground. Families are well served, and most of it works on a rainy day too. See the full guide. [link]

**Food and drink (H2)**
The Heart development anchors the town centre with restaurants and cafes, but Walton's real signature is its riverside pubs. The Anglers and The Swan sit on the water in the town itself, and a short towpath walk brings you to The Weir. Jerome Kern, who later wrote Ol' Man River, met his wife Eva at The Swan in 1909 and married her at St Mary's the following year. Our food and drink guide covers the lot. [link]

**A town that invented things (H2)**
Walton's history is stranger than its suburban streets suggest. Cecil Hepworth opened a film studio here in 1899 and in 1903 released the first film adaptation of Alice in Wonderland; by the First World War, Walton was one of the three major film studios in Britain. The Walton Hop, held in the old studio power house, is often cited as Britain's first disco. Julie Andrews was born on Rodney Road in 1935. And local tradition, going back to the antiquarian William Camden, holds that Julius Caesar forded the Thames at Cowey Stakes, though Elmbridge Museum will tell you the evidence is thin. Read the history. [link]

**Living in Walton (H2)**
Elmbridge regularly appears near the top of quality of life surveys, and Walton is one of its two largest towns. Schools, transport, neighbourhood character and the property market are covered in our living guide, written for people weighing up a move as much as for residents. [link]

**What's on (H2)**
Markets, live music, the arts centre programme, sport and community events, updated continuously. [link to /whats-on/]

**FAQ block (FAQPage schema; answer each in 40 to 60 words):**
- Is Walton-on-Thames a nice place to live?
- What is Walton-on-Thames famous for?
- How far is Walton-on-Thames from London?
- Does Walton-on-Thames have a market?
- What zone is Walton-on-Thames station in? (It is outside the Oyster zones; explain ticketing briefly.)

**Sources to cite:** Wikipedia (Walton-on-Thames; Walton Studios), Elmbridge Borough Council, National Rail.

---

### 4.2 Things to Do hub `/things-to-do/`

**Title:** Things to Do in Walton-on-Thames: A Local's Guide
**Meta:** The best things to do in Walton-on-Thames, from riverside walks and boat hire to family days out and rainy day options. Written and tested by locals.
**H1:** Things to do in Walton-on-Thames

**Copy (target 900 to 1,200 words):**

Walton rewards people who like being outdoors and near water. The best of the town is free: the towpath, the parks, the island. But there is enough indoors, from a boutique cinema to a climbing wall, to fill a wet Saturday without leaving KT12. This guide covers everything worth your time, organised by the way people actually plan a day out.

**On and along the river (H2)**
The riverside walk from Walton Bridge towards Sunbury Lock is the town's defining experience: flat, buggy-friendly and open all year. Cowey Sale, the meadow beside the bridge, is the natural starting point, with parking and a cafe. For something longer, the Desborough Island circuit crosses the 1935 cut onto an island of playing fields and quiet wooded bank, popular with dog walkers and birdwatchers. On the water itself, the marina area offers boat hire, and kayaking and paddleboarding operate seasonally. Full details in the riverside walks guide and on-the-river guide. [links]

**Parks and green spaces (H2)**
Ashley Park and Elmgrove Recreation Ground serve the town centre; the walled garden at Sunbury is a short hop. Each is covered, with facilities, parking and honest notes on what suits toddlers versus teenagers, in the parks guide. [link]

**Indoors and rainy days (H2)**
The Everyman cinema in The Heart brings food and drink to your seat. The Xcel leisure complex on Waterside Drive has a pool, gym, climbing wall and soft play, and Rock Up offers climbing for children's parties. The Riverhouse Barn arts centre runs exhibitions, live performance and workshops in a restored barn near the river. The rainy day guide ranks the options by age group. [link]

**With kids (H2)**
Summary paragraph pointing to /things-to-do/with-kids/, which covers playgrounds, the river safely, Xcel, Rock Up, and nearby big-ticket days out (Hampton Court Palace, Chessington, Thorpe Park, RHS Wisley, Mercedes-Benz World, all within an easy drive).

**Beyond the town (H2)**
Honest section on what is nearby: Hampton Court Palace downstream, Brooklands Museum and Mercedes-Benz World at Weybridge, RHS Wisley, Sandown Park racing at Esher. This section earns links and captures "near Walton on Thames" queries without pretending these attractions are in Walton.

**FAQ block:** free things to do; things to do with kids; is there anything to do when it rains; can you swim in the Thames at Walton (answer carefully: open water swimming risks, official guidance).

---

### 4.3 Spoke: Riverside Walks `/things-to-do/riverside-walks/` (full copy)

**Title:** Riverside Walks in Walton-on-Thames: Routes, Parking, Pubs
**Meta:** Three tested riverside walks from Walton-on-Thames, with distances, parking, step-free notes and the right pub at the end of each.
**H1:** Riverside walks in Walton-on-Thames

The Thames Path runs straight through Walton, which means the town has some of the easiest and best riverside walking in Surrey. These three routes are the ones we actually do, with the practical details that other guides leave out.

**Walk 1: Cowey Sale to Sunbury Lock and back (H2)** (about 3.5 miles)
Start at Cowey Sale car park beside Walton Bridge. Head downstream with the river on your left, past the moorings and the rowing club, to Sunbury Lock. The towpath is flat and firm the whole way, fine for buggies and most mobility scooters in dry weather. The Weir Hotel, overlooking the weir itself, is the natural halfway stop and does a popular Sunday roast. Return the same way, or cut back through town.

**Walk 2: The Desborough Island circuit (H2)** (about 2.5 miles)
Cross either of the two bridges over the Desborough Cut, the channel dug in 1935 that created the island and shortened the navigation past Shepperton. The island is a loop of playing fields, rough meadow and wooded bank, with wide views over the river. No cafes, no facilities, which is exactly why the birdlife and the quiet are so good. Dogs welcome; keep them close near the rowing club.

**Walk 3: Walton Bridge to Hampton Court (H2)** (about 6 miles one way)
The committed option. Follow the Thames Path downstream through Sunbury and Molesey to Hampton Court Palace, then return by train (Hampton Court to Surbiton, connecting back to Walton) or retrace your steps. Allow half a day and check the palace gardens' opening times if you want to finish inside.

**Practical notes (H2):** parking at Cowey Sale and town centre car parks; flooding closes sections of the towpath after heavy rain, check the Environment Agency river conditions page; the path is unlit, so plan winter walks around daylight.

**Sources:** Thames Path National Trail, Environment Agency river conditions.

---

### 4.4 Food and Drink hub `/food-and-drink/`

**Title:** Food and Drink in Walton-on-Thames: Pubs, Restaurants, Cafes
**Meta:** Where to eat and drink in Walton-on-Thames, from riverside pubs on the Thames to the restaurants of The Heart and the best local coffee.
**H1:** Food and drink in Walton-on-Thames

**Copy (target 700 to 900 words):**

Walton's eating and drinking splits into two geographies: the river and the town centre. The riverside pubs are the reason visitors come; the town centre, anchored by The Heart, is where residents eat week to week. This guide covers both honestly, and the directory holds the full, maintained list of every venue.

**The riverside pubs (H2)**
The Anglers and The Swan sit directly on the water in Walton itself, both with gardens that fill early on summer weekends. A level towpath walk downstream brings you to The Weir, positioned above the weir with some of the best water views on this stretch. The Swan has a claim to musical history: the American composer Jerome Kern met Eva Leale, the landlord's daughter, here in 1909, and married her at St Mary's Church the following year. Full reviews, food styles and booking notes in the riverside pubs guide. [link]

**Restaurants (H2)**
The Heart and the surrounding streets (High Street, Church Street, Bridge Street) carry the town's restaurant weight, from familiar chains to independents. The restaurants guide is organised by cuisine and occasion, and every entry links to a maintained directory record with hours and contact details. [link]

**Cafes and coffee (H2)**
Where locals actually get coffee, which cafes suit laptops versus buggies, and the riverside options at Cowey Sale. [link]

**FAQ block:** best pub on the river; restaurants with outdoor seating; where to eat with children; dog-friendly pubs.

---

### 4.5 What's On `/whats-on/`

**Title:** What's On in Walton-on-Thames This Week
**Meta:** Events in Walton-on-Thames this week and beyond: markets, live music, the Riverhouse Barn programme, sport and community events, updated daily.
**H1:** What's on in Walton-on-Thames

**Static intro copy (150 to 250 words above the feed):**

This page lists what is happening in and around Walton-on-Thames, updated continuously. It covers the Riverhouse Barn arts centre programme, markets, live music in the pubs, community and charity events, sport, and seasonal fixtures. Listings are checked before publication; organisers can submit events through the contact page.

**Build notes:** this is your automated/syndicated feed (per your existing pipeline plans). Each event gets `Event` schema. The page's freshness is a sitewide ranking signal, and it is the page most likely to earn repeat direct visits and local links (schools, churches, clubs linking to their own listings). Add a monthly evergreen section ("Annual events in Walton") covering recurring fixtures so the page ranks year-round, not just in-week.

---

### 4.6 Living hub `/living/`

**Title:** Living in Walton-on-Thames: An Honest Local Guide
**Meta:** What it is really like to live in Walton-on-Thames: schools, commuting, neighbourhoods, property and community, written for movers and residents alike.
**H1:** Living in Walton-on-Thames

**Copy (target 1,000 to 1,300 words):**

People move to Walton for a repeatable set of reasons: the river, the trains, the schools, and a town centre that still functions. This guide sets out the practical picture for anyone weighing up a move, and doubles as a reference for people already here.

**The short version (H2)**
Walton is one of the two largest towns in Elmbridge, a borough that consistently scores near the top of national quality of life surveys. It is around 15 miles from central London, with trains to Waterloo in roughly 25 minutes at best. The trade-off is the one common to all of prime Surrey: property prices well above the national average, and a station car park that fills early.

**Neighbourhoods (H2)**
Summary of the main areas with links to /living/areas/: the town centre and Heart-side apartments; the Ashley Park conservation-feel streets; Rydens towards Hersham; Field Common; the riverside roads. Character, housing stock and honest notes on each.

**Schools (H2)**
Point to /living/schools/, which lists state primaries and secondaries serving KT12 with links to their latest Ofsted reports and DfE performance data, plus nearby independents. Keep judgement out; keep data links current. This is one of the highest-intent pages on the site for movers.

**Getting around (H2)**
Cross-link to /getting-here/ for the station, road links (A3, M25, M3 all close), buses and cycling.

**Community (H2)**
Point to /living/community/: sports clubs, the cricket club (one of the oldest in Surrey), scouts and guides, churches, local charities, the Trading Alliance, volunteering routes.

**Property (H2)**
Point to /living/property/: housing stock overview, indicative price levels with a link to the Land Registry's official house price data rather than portal estimates, renting picture, new developments.

**FAQ block:** is Walton-on-Thames expensive; is it a nice place to live; is it in London or Surrey; what is the commute like.

---

### 4.7 History hub `/history/`

**Title:** The History of Walton-on-Thames: Caesar, Bridges and British Film
**Meta:** Walton-on-Thames history, from the Cowey Stakes legend and the Domesday Book to Hepworth Studios, the birthplace of British film, and the Walton Hop.
**H1:** A history of Walton-on-Thames

**Copy (target 1,200 to 1,500 words):**

Walton's name is older than England: it derives from the Old English for a settlement of Britons, the "Wealas", which suggests a Celtic community here before the Saxons arrived. The town appears in the Domesday Book of 1086 as Waletona, with a church, two mills and a fishery. That church, St Mary's, still stands at the highest point of the town, with Saxon material in its fabric and a tower whose oldest bell is dated 1606.

**Caesar at Cowey Stakes (H2)**
The antiquarian William Camden identified Cowey Stakes, by the modern Cowey Sale, as the point where Julius Caesar forded the Thames during his second invasion of Britain in 54 BC. Eighteenth-century accounts describe iron-shod wooden stakes pulled from the river and sold to the Earl of Sandwich for half a guinea apiece. Elmbridge Museum notes that the evidence rests on conflicting pre-twentieth-century sources, so the story remains a tradition rather than a fact. It is a very good tradition.

**Six bridges (H2)**
Summary paragraph and link to /history/walton-bridge/: the 1750 timber bridge painted by Canaletto in 1754; the 1788 stone bridge painted by Turner in 1805; the Victorian girder bridge damaged in the Second World War; the long "temporary" post-war crossings; and the current bridge, the sixth, opened in 2013.

**The birthplace of British film (H2)**
Summary and link to /history/film-studios/. In 1899 Cecil Hepworth leased a house in Hurst Grove and built one of the country's first film studios and laboratories. In 1903 the studio released the first film adaptation of Alice in Wonderland. By 1914 Walton was one of the three major film studios in Britain. After Hepworth's 1923 bankruptcy, in which his entire negative catalogue was melted down for its silver, the site became Nettlefold Studios and later Walton Studios, closing in 1961. The surviving power house became a theatre in 1925 and later hosted the Walton Hop, often described as Britain's first disco.

**Mount Felix and New Zealand Avenue (H2)**
During the First World War, the No. 2 New Zealand General Hospital occupied Mount Felix House. The soldiers who died there are buried in the cemetery and remembered in an annual service at St Mary's, and in the name of New Zealand Avenue.

**Motor racing and the first Aston Martin dealership (H2)**
Hersham and Walton Motors, by Walton Bridge, was the first Aston Martin dealership in the world and in the early 1950s built its own racing cars; Stirling Moss drove his first Formula One Grand Prix in an HWM.

**Famous residents (H2)**
Summary and link to /history/famous-residents/: Julie Andrews, born on Rodney Road in 1935; Admiral George Brydges Rodney; Nick Lowe; Natascha McElhone; Madeleine Albright, who lived here during the Second World War; and Monty Python sketches filmed around the town centre.

**Sources:** Wikipedia (Walton-on-Thames; Walton Studios), Elmbridge Museum, Surrey History Centre, local heritage records.

---

### 4.8 Getting Here `/getting-here/`

**Title:** Getting to Walton-on-Thames: Trains, Parking, Buses
**Meta:** How to get to Walton-on-Thames by train, car, bus and bike, with honest notes on parking, the station and travel to London.
**H1:** Getting to and around Walton-on-Thames

**Copy (target 500 to 700 words):**

**By train (H2):** Walton-on-Thames station is on the South Western Railway main line, with fast services reaching London Waterloo in roughly 25 minutes. Note for visitors: the station sits south of the town centre, about a 20 to 25 minute walk or a short bus or taxi ride from the river. It is outside the Oyster/contactless zonal area historically associated with London; check current ticketing before travelling.
**By car (H2):** the A244 crosses Walton Bridge; the M25 (J10/J11), A3 and M3 are all within a few miles. Town centre parking sits in and around The Heart and several council car parks; Cowey Sale serves the riverside. Link to the council's live parking information rather than duplicating tariffs that go stale.
**By bus and bike (H2):** principal bus routes; the towpath as a cycling route; cycle parking.

**FAQ block:** how far is the station from the town centre; is there parking at the river; can you get to Hampton Court from Walton.

---

### 4.9 Directory `/directory/`

**Title:** Walton-on-Thames Business Directory
**Meta:** A curated, maintained directory of Walton-on-Thames businesses: food and drink, shops, trades, health, fitness and services, checked by locals.
**H1:** Walton-on-Thames directory

**Intro copy (200 to 300 words):**

This directory lists businesses operating in and around Walton-on-Thames. It is curated rather than exhaustive: every entry is checked before publication, and each record shows when it was last reviewed. Listings are currently free and editorial; no business can pay for inclusion or placement. If you run a local business and want to be listed, or spot an error, use the contact page.

**Build notes:** one page per business (`LocalBusiness` schema, NAP consistency, opening hours, map, link out). Category hubs (/directory/restaurants/, /directory/trades/, /directory/health-and-beauty/ etc) capture "x in walton on thames" long-tail queries at scale. This is your long-term traffic engine and, if you later choose sponsorship, your commercial surface; keeping it editorially clean now maximises its value either way.

---

### 4.10 About `/about/`

**Title:** About Walton-on-Thames.org
**Meta:** Who writes Walton-on-Thames.org, how listings are chosen, and how to get in touch.
**H1:** About this site

**Copy (250 to 350 words):**

Walton-on-Thames.org is an independent local guide, written and edited by Darren Bayley, a Surrey resident [adjust to your preferred framing] with long-standing ties to the area through local charity and civic work. The site is not run by the council or any business group, and it carries no paid placements.

Editorial policy: every guide is researched against primary sources and checked on the ground where possible; every page shows a last-reviewed date; the directory is curated and free to join; corrections are actively welcomed via the contact page.

[Add: photograph, LinkedIn link, Person schema tied to your name, contact route. This page does more ranking work than its traffic suggests: it is what Google's quality systems and human raters use to establish who stands behind the site.]

---

## 5. Spoke briefs (build after the pages above)

Each brief: title, primary keyword, H2 outline. Write 700 to 1,000 words per page in the same register.

- **/things-to-do/with-kids/** "things to do in walton on thames with kids". H2s: under-5s; 5 to 11; teenagers; rainy day fallbacks; big days out nearby; eating with kids.
- **/things-to-do/rainy-day/** "rainy day walton on thames". H2s: Everyman; Xcel; Rock Up; Riverhouse Barn; The Heart; soft play; cafes that welcome campers.
- **/things-to-do/on-the-river/** "boat hire walton on thames". H2s: boat hire; kayaking and SUP; river cruises; safety and licences; seasons.
- **/things-to-do/parks-and-green-spaces/** H2s per park: Ashley Park; Elmgrove; Cowey Sale; walled garden; facilities table.
- **/things-to-do/desborough-island/** entity page. H2s: what it is; the 1935 cut; the walk; wildlife; access and parking.
- **/food-and-drink/riverside-pubs/** "pubs on the river walton on thames". One H2 per pub (The Anglers, The Swan, The Weir), honest notes, the Jerome Kern story, booking advice.
- **/food-and-drink/restaurants/** organised by cuisine; every entry links to its directory record.
- **/food-and-drink/cafes-and-coffee/** as above.
- **/living/schools/** state primaries; secondaries; independents; catchment cautions; links to Ofsted and DfE data.
- **/living/property/** stock; Land Registry data; renting; developments.
- **/living/areas/** one H2 per neighbourhood.
- **/living/community/** clubs; churches; charities; volunteering.
- **/history/walton-bridge/** the six bridges, Canaletto and Turner, the 2013 bridge.
- **/history/film-studios/** Hepworth to Nettlefold to Walton Studios; Alice in Wonderland 1903; the 1923 catalogue destruction; the Playhouse and the Walton Hop.
- **/history/famous-residents/** one section per person, strictly factual.
- **/history/st-marys-church/** Saxon origins; the bells; the scold's bridle; Roubiliac monument; the New Zealand connection.

## 6. Technical and launch checklist (Astro)

1. Static generation for all guide pages; content collections for the directory and history entities; the /whats-on/ feed built at deploy or via an endpoint, per your existing automation plans.
2. XML sitemap, robots.txt, canonical tags, and Search Console verified from day one. Bing Webmaster Tools too.
3. Core Web Vitals will be a strength on Astro; keep third-party scripts out until the commercial model is decided.
4. Internal linking implemented as reusable components (hub link blocks, "related pages" footers) so the lattice stays consistent as pages are added.
5. Launch sequence: homepage plus the four strongest hubs (things to do, food and drink, history, getting here) and /about/ in tranche one; /whats-on/ and /living/ in tranche two; directory and spokes rolling thereafter. Google rewards sites that launch coherent, not thin.
6. Link earning (the part no on-page work substitutes for): the history pages are your natural link magnets. Offer them to the Surrey history community, film history sites, and local societies. The events page earns links from every organiser you list. A well-made "media library" of your own Walton photography, free for local use with attribution, quietly earns links for years.
7. Set up Google Business Profile is not applicable (you are not a business location), but do claim the site in relevant local citations: Surrey directories, Elmbridge community pages, and the Trading Alliance if relations allow.
8. Measurement: Search Console query report monthly; track the head term, each hub's primary keyword, and directory long-tail growth separately.

