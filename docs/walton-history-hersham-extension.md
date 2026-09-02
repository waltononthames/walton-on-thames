# Walton-on-Thames.org Extension: History Cluster and Hersham Section

## Implementation specification for Claude Code

This document extends `walton-seo-blueprint.md`. It is written to be executed by Claude Code against the Astro repository. Each page specification is self-contained: slug, metadata, heading structure, verified facts, and sources. Build order is defined in Section 7.

---

## 1. Rules for Claude Code (read first, apply to every page)

1. **Facts discipline.** Use only the facts stated in each page spec below, plus material you verify from the listed sources. Do not invent dates, names or details. Where a spec says VERIFY, confirm against the named source before publishing; if unverifiable, omit the claim rather than hedge it.
2. **Register.** British English throughout. Measured, plain, precise. No hype adjectives (stunning, hidden gem, must-see). No em dashes anywhere; use commas, colons or full stops. Sentences short and controlled. Write as a knowledgeable local, first person plural sparingly.
3. **Word counts.** Entity pages 600 to 1,000 words. Hub pages 900 to 1,400. Never pad to hit a count.
4. **Every page ships with:** unique title under 60 characters; meta description under 155; one H1; breadcrumb; byline (Darren Bayley); last-reviewed date; sources block at the foot linking to primary references; at least three internal links (hub, one sibling, one cross-cluster link to a guide or directory page); one image slot per H2 with descriptive filename and alt text placeholders for Darren's own photography.
5. **Schema.** `Article` JSON-LD on every history page, `author` referencing the site's Person entity. Pages about a building or place additionally get `Place` or `LandmarksOrHistoricalBuildings`. The Hersham hub gets `Place`.
6. **No copying.** Never reproduce sentences from Wikipedia or any source. All copy original.

## 2. Astro implementation

### 2.1 Content collection

Add a `history` collection (and `hersham` collection, same schema) in `src/content.config.ts`:

```ts
const historySchema = z.object({
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  slug: z.string(),
  cluster: z.enum(['walton-history', 'hersham']),
  era: z.array(z.string()).optional(),      // e.g. ['victorian', 'ww1']
  entityType: z.enum(['place', 'person', 'event', 'institution', 'overview']),
  heroImage: z.string().optional(),
  heroAlt: z.string().optional(),
  publishDate: z.date(),
  reviewedDate: z.date(),
  sources: z.array(z.object({ label: z.string(), url: z.string().url() })),
  related: z.array(z.string()),             // slugs, drives the related block
});
```

### 2.2 Templates

- One `HistoryArticle.astro` layout: breadcrumb, H1, byline/date strip, prose, sources block, related-pages component (reads `related` frontmatter), hub back-link. Reuse for both clusters.
- A `HistoryTimeline.astro` component for the two hub pages: an ordered list of era links (Prehistory, Domesday, Tudor and Stuart, Georgian, Victorian, Film era, Wartime, Post-war), each anchoring to hub sections and linking to entity pages.
- JSON-LD emitted from frontmatter in the layout head, not hand-written per page.

### 2.3 Navigation changes

- Add "Hersham" as a top-level nav item.
- The /history/ hub gains an "Explore by topic" grid listing all entity pages.
- Footer gains a "Local history" column (six strongest history pages, rotate seasonally).

---

## 3. Walton history cluster: page specifications

Existing pages from the core blueprint (walton-bridge, film-studios, famous-residents, st-marys-church) remain; specs below add depth and the new entities. Target state: 20 entity pages plus the hub.

### 3.1 `/history/` hub (rewrite to full pillar page)

- **Title:** The History of Walton-on-Thames | From Caesar to Cinema
- **H1:** A history of Walton-on-Thames
- Restructure the existing hub copy around the `HistoryTimeline` component. Each era section: 100 to 150 words plus links to its entity pages. Close with a "Researching Walton" section pointing to Elmbridge Museum, Surrey History Centre, the Victoria County History for Surrey, and the National Library of Scotland historic OS maps, which positions the site as the gateway resource and earns librarian and society links.

### 3.2 `/history/cowey-stakes/`

- **Title:** Cowey Stakes: Did Julius Caesar Cross the Thames at Walton?
- **Primary query:** cowey stakes / julius caesar walton on thames
- **H2s:** The claim; Camden and the antiquarians; the stakes pulled from the river; what Elmbridge Museum says; visiting Cowey Sale today.
- **Verified facts:** William Camden identified Cowey Stakes as Caesar's crossing point on the second invasion (54 BC). A fisherman recovered iron-shod wooden stakes, sold to John Montagu, 5th Earl of Sandwich, at half a guinea each. Elmbridge Museum holds that evidence is limited to conflicting pre-twentieth-century secondary sources. Treat as tradition, not fact, and say so plainly; the honesty is the differentiator.
- **Sources:** Wikipedia (Walton-on-Thames), Elmbridge Museum.

### 3.3 `/history/domesday-and-origins/`

- **Title:** Waletona: Walton-on-Thames in the Domesday Book and Before
- **H2s:** A Celtic name; the Saxon settlement; Waletona in 1086; the Elmbridge hundred; what survives.
- **Verified facts:** "Walton" derives from Old English weal(as) tun, settlement of Britons ("Wealas", foreigners/strangers), implying a pre-Saxon Celtic community. Domesday (1086) records Waletona held by Edward of Salisbury and Richard de Tonbrige, with 6 hides, a church (St Mary's), 2 mills worth £1 5s 0d, and a fishery worth 5s. Walton lay in the Anglo-Saxon Elmbridge hundred.
- **Sources:** Wikipedia, Victoria County History (Surrey), Open Domesday.

### 3.4 `/history/film-studios/` (expand existing brief to flagship page, 1,200+ words)

- **Title:** Hepworth Studios: How Walton-on-Thames Invented British Film
- **H2s:** Cecil Hepworth comes to Hurst Grove (1899); a hundred films a year; Alice in Wonderland, 1903; the 1907 fire; the Great War years; the 1923 bankruptcy and the melted negatives; Nettlefold and Walton Studios; closure in 1961; what remains: the Playhouse.
- **Verified facts:** Hepworth leased The Rosary, Hurst Grove, for £36 a year (sources vary 1896/1899; state 1899 per Wikipedia and note the variance). Company "Hepwix" with cousin Monty Wicks; early actualities; filmed Queen Victoria's funeral (1901). First film adaptation of Alice in Wonderland released 1903. Fire destroyed the studio in 1907, killing a technician. By 1914 one of Britain's three major studios; produced through WWI. 1923 bankruptcy: receiver melted the entire negative catalogue (about 2,000 films) for silver. Bought by Archibald Nettlefold 1926 (Nettlefold Studios), sound from early 1930s, "quota quickies"; renamed Walton Studios 1955; closed March 1961, equipment to Shepperton; buildings demolished, site sold for housing. Surviving power house converted to a theatre in 1925, now the Playhouse. Hepworth films are projected at The Heart's High Street entrance.
- **Link magnet actions:** offer to British film history sites, the BFI-adjacent blogs, silent film societies.
- **Sources:** Wikipedia (Walton Studios), Surrey Brass Hepworth timeline, wotta heritage pages.

### 3.5 `/history/walton-hop/`

- **Title:** The Walton Hop: Britain's First Disco
- **H2s:** The Playhouse; the Hop years; the bands that passed through; the claim to "first"; the building today.
- **Verified facts:** Held in the former studio power house (converted 1925); reputed to be the first disco in the UK; closed 1990. Jimmy Pursey's pre-Sham 69 band performed/mimed there. VERIFY any further performer claims against reputable press before inclusion; this topic attracts unsourced anecdote, and the Hop also has a documented dark chapter (Jonathan King prosecutions). Handle factually and briefly if at all, citing court-reported facts only; do not sensationalise.
- **Sources:** Beautiful England Photos, contemporary press archives (VERIFY).

### 3.6 `/history/walton-bridge/` (expand existing brief)

- **Verified facts to include:** six bridges since 1748-50; first timber bridge painted by Canaletto (1754), dismantled 1783; second (1788, brick and stone) painted by Turner (1805), lasted to 1859; third (1864) girder bridge damaged by WWII bombing (1940); fourth temporary bridge 1953; fifth 1999 (intended as temporary); current bridge opened 2013, carries the A244. The brick flood-plain viaduct from the third bridge still stands.
- **Sources:** Wikipedia, Kiddle summary cross-checked to Wikipedia.

### 3.7 `/history/mount-felix/`

- **Title:** Mount Felix: Walton's New Zealand Hospital
- **H2s:** The house; the No. 2 New Zealand General Hospital; the men who stayed; remembrance today; New Zealand Avenue.
- **Verified facts:** WWI: No. 2 New Zealand General Hospital at Mount Felix House. House demolished except stable block and clock tower. NZ graves in the cemetery; memorial in St Mary's with an annual remembrance service; commemorated in New Zealand Avenue, the Wellington pub (formerly The Kiwi), and a small memorial near the Homebase car park.
- **Link magnet actions:** New Zealand WWI heritage organisations and the NZ High Commission's community channels genuinely link to this material.
- **Sources:** Wikipedia, Surrey in the Great War, wotta.

### 3.8 `/history/walton-in-wartime/`

- **Title:** Walton-on-Thames at War
- **H2s:** The Great War and Mount Felix (summary, link to 3.7); the Blitz comes to Walton; Flight Sergeant Charles Sydney; the aircraft factories next door; memorials.
- **Verified facts:** WWII bombing owing to proximity of Brooklands aircraft factories. 27 September 1940: F/Sgt Charles Sydney (92 Squadron, RAF Biggin Hill) died when his Spitfire (R6767) crashed in Station Avenue. Vickers factory raid at Brooklands, 4 September 1940, killed nearly 90 (locate correctly: Brooklands/Weybridge, affecting local workers).
- **Sources:** Wikipedia (Walton-on-Thames; Hersham), Surrey in the Great War.

### 3.9 `/history/famous-residents/` (expand to indexed directory of people)

- Structure as one H2 per person, each 80 to 150 words, strictly factual, ordered by recognition: Julie Andrews (born Julia Elizabeth Wells, Rodney House maternity home, Rodney Road, 1 October 1935; youngest solo performer at a Royal Variety Performance, 1948); Madeleine Albright (lived in Walton during WWII); Admiral George Brydges Rodney (born 1718); Nick Lowe (born 1949); Natascha McElhone (born 1971); Ian Rank-Broadley (born 1952, designed British coinage portrait); Matthew Brittin (Google EMEA, born 1968); Samuel Croxall (Aesop's Fables editor); Susan Ertz; Bede Griffiths; Jerome Kern (met Eva Leale at The Swan, 1909; married at St Mary's, 1910).
- If any individual generates enough search volume, promote to a child page later (Julie Andrews first candidate).
- **Sources:** Wikipedia (Walton-on-Thames notable people section), cross-check each person's own Wikipedia entry.

### 3.10 `/history/monty-python-and-film-locations/`

- **Title:** Monty Python in Walton-on-Thames: Filming Locations
- **H2s:** Why Walton (Hepworth legacy, Shepperton proximity); the Python sketches (old town hall; the Nelson dummy at Wellington Close; the toilets by The Regent); Psychomania (1973); television since (Is It Legal?; Not Going Out aerials; Ashes to Ashes in Hersham, cross-link).
- **Sources:** Wikipedia (Walton-on-Thames; Hersham), wotta.

### 3.11 `/history/hwm-and-motor-racing/`

- **Title:** HWM: The World's First Aston Martin Dealership
- **H2s:** Hersham and Walton Motors; building their own racing cars; Stirling Moss's first Grand Prix; HWM today.
- **Verified facts:** HWM at Walton Bridge was the first Aston Martin dealership in the world; built its own F1 cars in the early 1950s; Moss contested his first Formula One Grand Prix in an HWM. Cross-links both clusters (the name itself is Hersham and Walton).
- **Sources:** Wikipedia, Beautiful England Photos, HWM's own history pages (VERIFY current trading details).

### 3.12 `/history/ashley-park-estate/`

- **Title:** The Lost Estate of Ashley Park
- **H2s:** The mansion and its owners; Viscount Shannon and the Roubiliac monument; demolition and subdivision (1920); the streets that replaced it; the golf club that came and went (Ashley Park GC, 1890s).
- **Verified facts:** Richard Boyle, 2nd Viscount Shannon, lived at Ashley Park; his monument (1755) by Roubiliac is in St Mary's north aisle; house demolished and estate subdivided 1920.
- **Sources:** Wikipedia, Exploring Surrey's Past (VERIFY estate detail).

### 3.13 `/history/st-marys-church/` (expand existing brief)

- **Verified facts to include:** Saxon material, 12th-century structure; flint tower with 19th-century brick buttress; ring of eight bells, oldest 1606; Roubiliac monument to Viscount Shannon; 1587 brass to John Selwyn, keeper of Oatlands Park, with wife and eleven children; the 17th-century scold's bridle, mentioned by Jerome K. Jerome; New Zealand memorial and annual service; graves of NZ soldiers in the churchyard/cemetery; Jerome Kern married here 1910.
- **Sources:** Wikipedia, church's own history page, National Churches Trust listing.

### 3.14 `/history/origins-of-baseball/`

- **Title:** Was Baseball First Played in Walton-on-Thames?
- **H2s:** The 1749 record; Frederick, Prince of Wales; what "bass-ball" was; the evidence and its limits; why it matters.
- **VERIFY before build:** the claim that the earliest recorded game of "bass-ball" (1749) involving Frederick, Prince of Wales took place in Walton-on-Thames. Confirm against the Whitehall Evening Post citation as reported by reputable sources (BBC, MCC, Project Protoball). If confirmed, this is a major international link magnet (American baseball history sites). If the venue attribution is contested, present the dispute itself as the story.
- **Sources:** BBC archive reporting, Protoball, SABR UK.

### 3.15 `/history/walton-charity/`

- **Title:** Walton Charity: Eight Centuries of Local Giving
- **H2s:** Medieval origins; the almshouse and land endowments; the charity through the centuries; the charity today; sources and records.
- **Build note:** Darren drafts or closely directs this page from primary archival material via his trusteeship. This is the site's single most defensible page: original research nobody can copy. Cite charity records, the Charity Commission register, and any NEF-informed strategy material that is public. Keep governance neutrality: the page is history and public information, not advocacy, and should note the author's trustee role as a transparency line.
- **Sources:** Charity Commission register, Walton Charity archives, Surrey History Centre.

### 3.16 `/history/river-thames-at-walton/`

- **Title:** The Thames at Walton: Locks, Cuts and Swan Upping
- **H2s:** The working river; Sunbury Lock; the Desborough Cut (1935, Thames Conservancy, named for Lord Desborough); the wharf; Swan Upping through Walton (VERIFY the route passes Walton in the annual ceremony); the river in flood.
- **Sources:** Wikipedia, Environment Agency, Royal Family/Swan Marker announcements for upping route.

### 3.17 Remaining Walton entity briefs (build last)

- `/history/the-heart-and-town-centre/` : redevelopment story, the Hepworth commemoration display, retail history including the Birds Eye building (VERIFY details via wotta and planning records).
- `/history/old-manor-house/` : the timber-framed manor house and its traditional association with the regicide John Bradshaw; VERIFY against Historic England listing before publishing any claim.
- `/history/oatlands-and-the-royal-connection/` : John Selwyn brass, proximity of Oatlands Palace; frame carefully as shared heritage with Weybridge.
- `/history/elmbridge-hundred/` : short explainer of the ancient hundred, linking outward to elmbridgehundred.org.uk (relationship-building link).

---
## 4. Hersham section: page specifications

Hersham gets its own top-level section targeting "Hersham" as a second head term. Do not nest it under Walton pages; the two clusters cross-link but stay topically distinct.

### 4.1 `/hersham/` hub (full copy below, adapt lightly)

**Title:** Hersham Village, Surrey  *(amended 2026-08-31, was "Hersham, Surrey: The Local Guide to the Village")*
**Meta:** A local guide to Hersham, Surrey: the green, food and drink, walks by the River Mole, history from the Domesday era to Sham 69, and village life.
**H1:** Hersham

**Copy (target 900 to 1,100 words; core text):**

Hersham is a village in the Borough of Elmbridge, Surrey, sitting between Walton-on-Thames to the north and Esher to the east, with the River Mole running along its edge. The 2021 census recorded 12,630 people in the Hersham built-up area, up from 11,260 in 2011. It is contiguous with Walton and shares its post town, but Hersham has kept a distinct identity: a proper village green, its own shopping parade, its own station on the main line to Waterloo, and a history that runs from Mesolithic flint finds to the punk band that put the village's name in the charts.

**The green (H2)**
Hersham Green, about three and a half acres at the centre of the village, hosts regular events through the year and is faced by the village's shops and restaurants. It is the natural starting point for any visit. [link to /hersham/hersham-green/]

**Food, drink and shopping (H2)**
The parade by the green carries the village's everyday shops and eating, with pubs distributed through the village and towards the Mole. Full listings live in the directory; the guide covers the notable venues honestly. [link to /hersham/food-and-drink/ and /directory/]

**Walks and green space (H2)**
Within a few minutes of the built-up centre you are in fields and meadow beside the River Mole, and much of the surrounding land is Metropolitan Green Belt, wooded or farmed. Two golf courses, Burhill and Hersham Village, sit within the village bounds. Hersham is also home to one of Britain's largest colonies of ring-necked parakeets, roosting near Esher Rugby Club in numbers estimated in the thousands. [links to /hersham/river-mole-walks/, /hersham/parakeets/]

**A short history (H2)**
Hersham appears in the twelfth century as Haverichesham, probably Haeferic's settlement, and only became a parish in its own right in 1851, carved out of Walton. Queen Victoria recorded seeing her first steam train here as a girl; George III visited Weylands Farm to see the first drill plough. In the twentieth century the village housed serious industry, from ABC Motors to Vickers-Armstrongs, and in 1975 it produced Sham 69, whose Hersham Boys reached the top ten and named the village to a generation. The full history section covers all of it. [link to /hersham/history/]

**Getting here and around (H2)**
Hersham station sits on the South Western Main Line with at least two trains an hour; Walton-on-Thames station also serves the west of the village. The A3 passes through, and the M25 is minutes away. [cross-link to /getting-here/]

**FAQ block:** Is Hersham part of Walton-on-Thames? (Distinct village, same post town; explain the 1851 parish and current borough arrangements.) Is Hersham a nice place to live? What is Hersham famous for? Where do the Hersham parakeets roost? What is the population of Hersham?

**Amendment, 2026-08-31.** The hub was built to this section and matched it (967 words, the six H2s in order). It has since been extended, deliberately, to compete for the "hersham" head term against a 5,300-word AI-generated Grokipedia article and against hershamvillage.co.uk, which holds an exact-match domain. The section now additionally specifies:

- **A hub link grid**, grouped as Village life / History and heritage / Outdoors and sport / Getting around, covering all eighteen Hersham destinations on the site. **Compact links, never cards.** The full card treatment belongs to the spokes (`/things-to-do/hersham/`, `/hersham/food-and-drink/`, `/hersham/history/`) under the duplication controls documented at the top of `things-to-do/hersham.astro`. A hub that reproduces its spokes' card grids cannibalises them.
- **A live "What's on in Hersham" block**, the next three Hersham-only events. `/whats-on/` is site-wide and unfiltered, so nothing else on the site owns this view. It is the hub's only genuinely fresh element and the reason the nightly rebuild changes this page at all, which neither competitor can match.
- **FAQPage JSON-LD**, generated from the same `faqs` array that renders the visible markup so the two cannot drift. Google requires FAQ content to be visible on the page; holding it in one place is what guarantees that.
- **An enriched `Place` entity**: `alternateName` "Hersham Village", `geo` from the audited coordinate in `content/places/hersham-village-green.md`, `containedInPlace` (Elmbridge, then Surrey), `image`, and `sameAs` to Wikipedia and Wikidata `Q5744439`. Entity disambiguation is the most direct lever available on a head-term query for a place.

**Word target revised:** prose stays at 900 to 1,100 words; the whole page now runs to roughly 1,400 including the link grid and event cards, which are navigational rather than prose. Do not pad the prose to reach the larger figure. Depth belongs in the spokes: the Hersham corpus already stands at roughly 23,800 words across twenty pages, four and a half times the Grokipedia article, and the architecture ("flat, hub and spoke, nothing more than two clicks from home") is the advantage. Grow the corpus by adding spokes, never by fattening the hub.

**Sources for the amended figures:** population from the Office for National Statistics, Census 2021 built-up areas (Hersham, `E63005239`), accessed 31 August 2026. Wikidata identifier confirmed against the Wikidata search API the same day.

### 4.2 `/hersham/history/` hub

**Title:** The History of Hersham: From Flint Tools to Hersham Boys
**H1:** A history of Hersham
**Structure:** same `HistoryTimeline` component as Walton.

**Copy core (target 1,000 to 1,300 words):**

**Before the village (H2):** Mesolithic flint instruments found in numbers beside the Mole at Southwood Manor Farm; around 200 BC a large defensive earthwork raised on St George's Hill, with Bronze and Iron Age burials on its slopes. (Note carefully: St George's Hill is also the 1649 Diggers site associated with Weybridge; mention Gerrard Winstanley's community briefly with a VERIFY on the precise parish boundary framing, and link outward to authoritative Diggers material rather than claiming the story for Hersham.)

**Haverichesham (H2):** twelfth-century record as Haverichesham, probably from a lost Old English "Haeferices ham". The manor known as Morehall alias Sylkesmore or Southwood; a court held at Hersham in 1272 by Reginald de Imworth. Timber from Southwood supplied Henry VIII's Nonsuch Palace (about eighty loads).

**Becoming a parish (H2):** ecclesiastical parish formed 1 August 1851 out of Walton; Holy Trinity chapel of ease (1839, demolished 1889) superseded by St Peter's. Kelly's Directory (1913) description; village hall by the green erected 1885, enlarged 1892 for the Working Men's Club. Population 4,306 in 1901.

**Royal glimpses (H2):** George III at Weylands Farm and the first drill plough; the young Princess Victoria's diary record of her first sight of a steam train at Hersham.

**Industry (H2):** ABC Motors (including the 1929 Fletcher-designed aeroplane, test flown from Brooklands, a casualty of the depression), Air Products, Hackbridge and Hewittic, Vickers-Armstrongs; coachbuilders Compton and Herman on Molesey Road in the 1920s. The 4 September 1940 daylight raid on the Vickers works at Brooklands that killed nearly 90.

**Whiteley Village (H2, summary linking to 4.5):** the planned retirement village in concentric octagons, endowed by the £1m bequest of department store founder William Whiteley.

**Hersham Boys (H2, summary linking to 4.4):** Sham 69, formed 1975.

**Sources:** Wikipedia (Hersham), Surrey in the Great War (Kelly's 1913), Victoria County History, Surrey History Centre.

### 4.3 `/hersham/hersham-green/`

- **H2s:** the green today; events through the year; the village hall story (1885); the shopping parade; practical notes.
- Combine history with live utility; pull upcoming green events from the /whats-on/ feed by tag.

### 4.4 `/hersham/sham-69/`

- **Title:** Sham 69: The Hersham Boys
- **H2s:** A band from the village; the name (graffiti reading "Walton and Hersham '69", celebrating Walton & Hersham FC's 1969 Athenian League title, partly faded to "sham 69"); the hits (If the Kids Are United, Hurry Up Harry, five UK top 20 singles; Hersham Boys reached number 6 in 1979); Jimmy Pursey and the Walton Hop connection (his earlier band performed there, cross-link to /history/walton-hop/); the band since.
- **Link magnet:** punk history sites and music press retrospectives link to well-sourced local pages. Original photography of relevant village locations strengthens it.
- **Sources:** Wikipedia (Sham 69; Hersham), Punk77, NME/Surrey Comet reporting.

### 4.5 `/hersham/whiteley-village/`

- **Title:** Whiteley Village: The Octagonal Retirement Village
- **H2s:** William Whiteley's bequest (£1m from the department store founder); the plan (concentric octagons); who lives there; visiting and respecting a private community; the village today.
- **VERIFY:** listed status and centenary details via Whiteley Homes Trust. Note it is a private residential community; frame access accordingly.
- **Sources:** Wikipedia, Whiteley Homes Trust.

### 4.6 `/hersham/famous-residents/`

- One H2 per person: John Profumo (family vault at St Peter's churchyard; Profumo Road; handle the 1963 scandal in one factual sentence and give equal weight to the Toynbee Hall charity work); Odette Sansom GC MBE (SOE agent, among the most decorated women of WWII, lived in the village; VERIFY residence detail via Wikipedia's citation); Jimmy Pursey; William Lilly (seventeenth-century astrologer, retired to an estate at Hersham, buried at Walton, cross-link to St Mary's page); Frederick Wicks (author and inventor, died in the village 1910).
- **Sources:** Wikipedia (Hersham; individual biographies).

### 4.7 `/hersham/parakeets/`

- **Title:** The Hersham Parakeets: Britain's Loudest Roost
- **H2s:** the colony near Esher Rugby Club (estimated around 7,000 birds by 2004); where ring-necked parakeets came from (present the documented explanations and the myths as myths); when and where to see the evening roost; the wider south east spread.
- Distinctive, shareable, genuinely searched. Local press links readily to this sort of page.
- **Sources:** Wikipedia (Hersham), contemporary local press, BTO/RSPB species accounts.

### 4.8 `/hersham/river-mole-walks/`

- **H2s:** the Mole at Hersham; a village-to-meadows circular; connecting to the Thames at Walton (cross-link to /things-to-do/riverside-walks/); wildlife; practical notes (mud, flooding, parking).
- Walk the routes before writing; distances and surfaces must be first-hand.

### 4.9 `/hersham/st-peters-church/`

- **H2s:** the parish church (successor to the 1839 Holy Trinity chapel); the building; the Profumo vault; the churchyard; services and visiting.
- **VERIFY:** architect and consecration date via the church's own history and Historic England.

### 4.10 `/hersham/food-and-drink/` and `/hersham/burhill-and-golf/`

- Food and drink: same template as the Walton food hub, scaled down; every venue linked to a directory record.
- Burhill: the estate history (Kelly's 1913 notes the club leasing Burhill Park from Viscount Iveagh; two 18-hole courses; club established 1907 per club history, VERIFY), the house as clubhouse, and honest visitor notes.

### 4.11 `/hersham/development-and-planning/`

**Added 2026-08-31.** Not part of the original extension. Written after a competitive review found this to be the one subject where the site's nearest rival, hershamvillage.co.uk, is genuinely stronger, and the one Hersham topic with recurring rather than one-off search demand.

**Title:** Hersham Development and Planning
**Meta:** What is being built in Hersham: current planning applications, the Green Belt, and how to have your say.
**H1:** Development and planning in Hersham

**Why this page exists.** Planning is the local subject residents search repeatedly, argue about and share. It earns return visits and referring domains in a way history articles do not. The rival's strength here is real but narrow: its coverage reads as advocacy, and it holds no structured record of what is actually proposed and at what stage. A neutral, sourced, current record is the gap.

**Scope.** Hersham only, defined as a 2km radius of Hersham Green (51.3662, -0.4002). Major schemes only, see the significance rule below.

**A Walton equivalent follows as 4.12, and the two stay separate pages.** Decided 2026-08-31. That has three consequences for how this one is built.

*Build it as a parameterised component, not a bespoke page.* The loader and the rendering take a centre point, a radius and a place name. Hersham is the first instance, Walton the second. Do not hard-code Hersham anywhere except its own page's content and frontmatter. The Walton anchor is The Heart Shopping Centre (51.3853, -0.4202), from the audited coordinate in `content/businesses/the-heart-shopping-centre.md`.

*The two catchments overlap, so schemes must be assigned, not just matched.* Hersham Green and The Heart are 2.54km apart, so 2km radii overlap across a wide band containing Weylands, North Weylands, Esher Rugby Club and the Mayfield Road sites. Without an assignment rule the same scheme appears on both pages, which is precisely the duplication the hub-and-spoke controls exist to prevent.

**Assignment rule.** PlanIt returns a GeoJSON `location` on every record, so assign each site to the **nearer of the two centres**, computed at build time. Two cautions, both observed in the 31 August 2026 sample:

- **Postal addresses mislead and must not be used.** Weylands Old Treatment Works, North Weylands Industrial Estate and Esher Rugby Football Club all carry "Walton-on-Thames" or "Esher" addresses while sitting nearer Hersham Green. Assign on coordinates, not on the address string.
- **Borderline cases need a manual override.** The Waterloo Court car park site on Mayfield Road is 1.45km from Hersham Green and 1.51km from The Heart, a 60m margin. Maintain a small explicit override map of site to page, checked before the distance calculation, so marginal calls are a recorded editorial decision rather than an accident of arithmetic that can flip when a coordinate is corrected upstream.

**Group by site, not by application.** A single scheme generates many applications over years: in the sample, Weylands appears four times, Hersham Place Technology Park twice, and Land south of Burwood Road twice, counting screening opinions, outline, hybrid, reserved matters and variations separately. Presenting each as a separate item would be both repetitive and misleading about how much is happening. Group applications under a named site, show the site's current overall stage, and list the individual references beneath it.

**Structure.**

- Intro: what is happening in Hersham in one paragraph, dated.
- **Current applications (H2).** One short subsection per live major scheme: what is proposed, where, who applied, current stage, and a link to the council's own record. Status lines carry a "as recorded on [date]" stamp.
- **Recently decided (H2).** Permitted, rejected and withdrawn majors, so the page answers "what happened to" queries as well as "what is happening".
- **The Green Belt (H2).** Why most land around Hersham cannot be built on, and where the exceptions apply. Durable content.
- **Who decides, and what changes in 2027 (H2).** Elmbridge Borough Council decides today. From 1 April 2027 Elmbridge is replaced by **East Surrey Council**, alongside Epsom and Ewell, Mole Valley, Reigate and Banstead and Tandridge, with shadow elections in May 2026. Verified against Elmbridge's own reorganisation page, 31 August 2026. Note for the record that an AI-generated source consulted during research stated Hersham would fall under a West Surrey authority; that was wrong, and is a live example of why Rule 1 puts AI-generated content at Tier 3.
- **How to have your say (H2).** Finding an application, commenting within the consultation window, and Elmbridge's own planning alerts email service. Practical, not campaigning.
- **FAQ block.** What is being built in Hersham? Can they build on the Green Belt? How do I object to a planning application? Who decides planning applications in Hersham after 2027?

**Data source, and the rule that makes the page maintainable.** Applications come from the PlanIt open API (planit.org.uk), queried spatially rather than by authority:

```
https://www.planit.org.uk/api/applics/json?lat=51.3662&lng=-0.4002&krad=2&app_size=Large&start_date=...&end_date=...
```

Two properties of that query matter. First, **it is authority-agnostic**: a spatial query keeps working when Elmbridge becomes East Surrey in April 2027, where a query keyed on `auth=Elmbridge` would silently return nothing. Second, **`app_size=Large` is the significance filter**. Measured 31 August 2026: within 2km of Hersham Green, `Large` returns 18 applications across four and a half years, roughly four a year, and captures every scheme of public interest. `Medium` and `Small` are householder extensions and tree works at named private addresses. Those are public record but have no search value, and publishing an automated list of residents' rear extensions is not what this site is for. **Never publish below `Large`.**

**Verification tiers.** PlanIt is an aggregator, therefore Tier 2, and never the authority. Every scheme must link to the council's own application page, and no claim may rest on PlanIt alone. Application descriptions may be quoted from the council record; do not paraphrase numbers of dwellings without checking the source document.

**Editorial stance, per the Charter.** The Charter permits coverage of contested local matters where relevant to the public record, but requires evidence to be distinguished from advocacy and opinion clearly labelled. This page therefore reports what is proposed and at what stage, links to the consultation so readers can respond themselves, and takes no position for or against any scheme. It does not characterise applicants, quantify local opposition, or reproduce campaign material.

**Currency.** A planning status is a fact that goes stale silently, the same failure mode `check-stale-events.mjs` exists to catch. Every status line is date-stamped. The build-time loader refreshes status on the nightly rebuild; the human-written narrative around each scheme needs review when a status changes and at least quarterly.

**Loader design.** Follow `src/loaders/fixtures-loader.ts`: fetch at build time, fail soft. If the API is unavailable, log and keep previously synced entries rather than failing the build or rendering an empty section. Add one guard the fixtures loader does not need: if the query returns records but **none newer than the most recent already held**, that is a plausible signal the feed or the query has broken, and it should log loudly rather than pass silently.

**Duplication controls.** The hub links here; it does not summarise the schemes. Nothing on this page duplicates `/hersham/`, `/hersham/history/` or `/things-to-do/hersham/`. Where a scheme touches a subject with its own page, for instance the golf club or the shopping parade, link rather than restate.

**Linking.** Per Section 5: back to the `/hersham/` hub, one Hersham sibling, and one Walton page where the subject genuinely crosses. The Weylands Treatment Works schemes sit in Walton and are the natural crossing point.

### 4.12 `/development-and-planning/` (Walton)

**Reserved 2026-08-31, to be built after 4.11.** The Walton equivalent, kept as a separate page rather than merged.

Everything in 4.11 applies unchanged except the centre point, which is The Heart Shopping Centre (51.3853, -0.4202), and the content, which is written fresh rather than adapted. Reuse the loader and the rendering component; share no prose. The assignment rule in 4.11 governs which page a scheme belongs to, and it is authoritative for both: a site assigned to Hersham does not also appear here, however its postal address reads.

**URL decided 2 September 2026: `/development-and-planning/`, at the top level.** The alternative was `/living/development-and-planning/`, matching the six existing `/living/` spokes, whose URLs are place-neutral and carry "Walton-on-Thames" in the title. Rejected on inspection: `/living/schools/` was titled "Schools in Walton-on-Thames & Hersham" and the `/living/` hub describes itself as covering "Walton-on-Thames, Hersham and Whiteley Village". `/living/` is the whole-area practical hub, not the Walton section, so a deliberately Walton-only page inside it would contradict the hub and produce a confusing pair against `/hersham/development-and-planning/`. Top level also matches the other Walton-scoped topic hubs, `/things-to-do/`, `/food-and-drink/` and `/getting-here/`, each of which sits beside a Hersham spoke rather than containing one. Walton has no place-namespace because Walton is the site. Blueprint Section 3's architecture list needs amending to record the new top-level entry.

**Two filters this page needs and Hersham does not.** Measured 2 September 2026: of 29 records the distance rule assigned to Walton, only 9 were actually in Walton.

- **Cross-boundary consultation records.** Elmbridge logs applications on which it is a neighbouring consultee, and PlanIt geocodes them to the logging authority rather than to the site, so schemes in West Byfleet, Woking and Ockham landed in the Walton catchment. Twelve of the 29. The loader drops any record whose description begins "Consultation from ... Council" (`excludeConsultations`, on by default for both pages).
- **A postal-town whitelist**, which is the reverse of the assignment rule and deliberately so. Between our two pages addresses mislead, because everything in Hersham reads "Walton-on-Thames", so assignment uses coordinates. Between post towns coordinates mislead: the Oatlands Drive sites carry Weybridge addresses but sit 0.50 to 1.07km from The Heart, nearer than Laurelwood Place (0.78km) and Brownacres (1.36km), which are genuinely Walton. No radius separates them, so `addressMustInclude` filters on the post town instead. Eight of the 29.

Every drop is counted and logged rather than silent. A filter that quietly removes the wrong things is the failure mode that matters here.

**Expect no live applications at first.** All nine Walton schemes were decided at first build. The component renders an explicit empty state rather than dropping the section, and live schemes appear automatically when they arrive. Walton is largely built up, so its majors are redevelopment of existing sites arriving in ones and twos, rather than the clustered edge-of-village housing pressure Hersham has.

---


### 4.13 `/hersham/living/`

**Added 1 September 2026.** Not in the original extension. Completes the Hersham cluster with the practical-intent content that the `/living/` section covers for Walton but has never covered for the village.

**Title:** Living in Hersham
**Meta:** Practical information for Hersham residents: schools, doctors and pharmacies, getting around, and council services.
**H1:** Living in Hersham

**Why this page exists.** `/living/` and its spokes (`schools`, `gp-surgeries`, `pharmacies`, `dentists`, `post-offices-and-post-boxes`, `council-and-services`) are all written for Walton. A Hersham resident searching "schools in hersham" or "doctors in hersham" currently lands on Walton pages or nothing. This is practical-intent content, which converts and is genuinely useful, and it completes the cluster the head-term work depends on.

**Content class.** Current/practical under `docs/historical-content-strategy.md`, so the Content Verification Protocol governs, not the Standards document. Do not dress it up with academic citations.

**Structure.**

- Intro, one paragraph, honest about what Hersham has and what it does not.
- **Schools (H2).** The genuinely new content, and the reason the page ranks. Name each school with its address, age range and type, and **link to its Ofsted record rather than restating a rating**. Ratings on the four Hersham schools currently span 2012 to 2024, and Ofsted stopped making an overall effectiveness judgement for state-funded schools in September 2024, so a bare "rated Good" is at best undated and at worst describes a framework that no longer exists. The same principle the Protocol applies to opening hours: link to the authority, do not restate volatile data.
- **Doctors, dentists and pharmacies (H2).** Link to the directory records, which are already verified. Do not restate addresses or hours; the directory is the single source and it is maintained.
- **Getting around (H2).** Hersham station gets its own page; link it. Buses serve the village but route numbers and operators change, so link to Surrey County Council's travel information rather than hard-coding routes. Roads: the A244 and A317 corridors.
- **Council services (H2).** Elmbridge for bins, council tax, parking and planning; Surrey County Council for schools admissions, highways and social care. Cross-link `/hersham/development-and-planning/` for planning, and cover the 1 April 2027 replacement of both by East Surrey Council.
- **Shops and everyday needs (H2).** Short, linking to `/hersham/food-and-drink/` and the directory. Do not duplicate either.
- **FAQ block.** What schools are in Hersham? Is there a doctor's surgery in Hersham? Which council covers Hersham? Is Hersham a good place to live with children?

**Duplication controls.** This page routes to the Walton `/living/` spokes where the subject is genuinely borough-wide, and owns only what is Hersham-specific. It must not restate directory records, and must not duplicate `/hersham/` hub copy. Schools are the exception: `/living/schools/` is Walton-scoped and the Hersham schools are genuinely uncovered, so they belong here in full.

**Verified for the first build, 1 September 2026.** Burhill Primary School, New Berry Lane, KT12 4HQ, nursery to Year 6 (school website). Bell Farm Primary School, Hersham Road, KT12 5NB, community primary with nursery, ages 3 to 11 (school website). Cardinal Newman Catholic Primary School, Arch Road, voluntary aided Catholic, two-form entry, serving the parishes of All Saints Hersham and St Erconwald's Walton, part of the Xavier Catholic Education Trust (school website). Three Rivers Academy, Bell Farm Way, KT12 5EJ, ages 11 to 18, 1,311 pupils, inspected 15 October 2024 with Good in all five categories (Ofsted).

**Open at first build:** bus routes are linked rather than named. Grokipedia claimed routes 515 and 715 serve the village; that source has already been wrong three times in this cluster and the claim is unverified. Name routes only after checking Surrey County Council or the operator directly.

## 5. Internal linking matrix (implement as component logic, not ad hoc)

- Every Walton history page links to: /history/ hub, two related Walton history pages (via `related` frontmatter), and one non-history page (guide or directory).
- Every Hersham page links to: /hersham/ hub, one Hersham sibling, and one Walton page where the subject genuinely crosses (HWM, Walton Hop/Sham 69, William Lilly/St Mary's, Julie Andrews family/Hersham years).
- The Walton homepage adds one sentence and link to /hersham/ in its opening section.
- /history/ and /hersham/history/ link to each other in their closing sections ("the neighbouring village/town").

## 6. Measurement targets

- Track "hersham" head term separately in Search Console from day one; expect movement faster than the Walton head term.
- History cluster KPI is referring domains earned, not traffic: target ten new linking domains in six months (film history, punk history, NZ heritage, baseball history are the four outbound pitches).

## 7. Build order for Claude Code

Execute as five tranches; each tranche is a coherent publishable unit.

1. **Tranche 1, infrastructure:** content collections, `HistoryArticle` layout, `HistoryTimeline` component, nav and footer changes, JSON-LD from frontmatter.
2. **Tranche 2, Walton flagships:** rewrite /history/ hub; build film-studios, cowey-stakes, walton-bridge, st-marys-church, famous-residents.
3. **Tranche 3, Hersham launch:** /hersham/ hub, /hersham/history/, hersham-green, food-and-drink, sham-69.
4. **Tranche 4, depth:** mount-felix, walton-in-wartime, hwm-and-motor-racing, walton-hop, monty-python-and-film-locations, whiteley-village, famous-residents (Hersham), parakeets.
5. **Tranche 5, completion:** domesday-and-origins, ashley-park-estate, river-thames-at-walton, origins-of-baseball (after verification), walton-charity (Darren-led), river-mole-walks, st-peters-church, burhill, remaining briefs from 3.17.

Per-page prompt template for Claude Code:

```
Build the page specified in walton-history-hersham-extension.md section {X.Y}.
Apply all rules in Section 1. Use only the verified facts listed plus facts
you confirm from the listed sources; mark anything you could not verify as an
HTML comment for editorial review rather than publishing it. Create the
content collection entry, populate frontmatter fully including related slugs,
and add the page to the hub's link grid.
```
