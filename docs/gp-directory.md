# GP directory and practice profiles

How the GP pages work, what they rest on, and how to keep them right. Written 21 September 2026 when the six existing GP listings were upgraded into full profiles.

Classification (per `docs/historical-content-strategy.md`): **current/practical content**, governed by the Content Verification Protocol in `CLAUDE.md`. No historical claims are made on these pages.

## Inventory

All six GP listings existed before this work. Each keeps its URL, slug and record; none was merged, renamed or redirected.

| Practice | Record | URL | ODS | Premises | Type |
|---|---|---|---|---|---|
| Ashley Medical Practice | `src/content/businesses/ashley-medical-practice.md` | `/directory/ashley-medical-practice/` | H81663 | Own premises, 1A Crutchfield Lane, KT12 2QY | Practice |
| Fort House Surgery | `fort-house-surgery.md` | `/directory/fort-house-surgery/` | H81020 | Walton Community Hospital, Rodney Road, KT12 3LD | Practice in a hospital site |
| The Red Practice Walton | `red-practice-walton.md` | `/directory/red-practice-walton/` | H81094 | Walton Health Centre, Rodney Road, KT12 3LB | Practice, shared building |
| The White Practice | `white-practice-walton.md` | `/directory/white-practice-walton/` | H81131 | Walton Health Centre | Practice, shared building |
| The Yellow Practice | `yellow-practice-walton.md` | `/directory/yellow-practice-walton/` | H81095 | Walton Health Centre | Practice, shared building |
| Hersham Surgery | `hersham-surgery.md` | `/directory/hersham-surgery/` | H81065 | Own premises, Pleasant Place, KT12 4HT | Practice |

**Fort House is not in Walton Health Centre.** The old `/living/gp-surgeries/` intro said four practices shared the health centre, which contradicted Fort House's own listing. The NHS gives the two sites different postcodes (KT12 3LB and KT12 3LD) and OpenStreetMap maps them as separate buildings about 100 m apart. The pages now say so.

**Coverage check.** NHS Find a GP for KT12 3LB, and the 2-mile radius around KT12 4HT, returned no other practice with premises in Walton-on-Thames, Hersham or Whiteley Village (21 September 2026). Practices elsewhere cover some Walton postcodes (Littleton Surgery in Esher covers KT12 3LB, for example). They are not listed because the directory is organised by where a practice is, and a catchment is checked per postcode on the NHS website, which every profile links to.

**Whiteley Village** has no practice. The landing page carries the existing, sourced note that the Whiteley Homes Trust residents' handbook directs residents to Hersham Surgery. It was read on 18 July 2026; the handbook's text layer could not be extracted this session, so the page dates the claim to July.

### Corrections made during the audit

- **Ashley Medical Practice's pin was about 300 m out** (51.3830, -0.4092, near the north-east end of Crutchfield Lane). The practice's own map pin (51.380685, -0.413297) and its NHS pin (about 50 m away) both put it at the western end near Hersham Road. Now 51.3807, -0.4133.
- **Fort House Surgery's pin** (corrected 21 September 2026, after Darren spotted it) was the NHS profile pin, which sits at the eastern tip of the Walton Community Hospital building. It is now the centre of the building outline on OpenStreetMap (51.3799, -0.4064). Neither the practice nor the NHS says which part of the building the surgery occupies, and the page says so.
- **Walton Community Hospital and Walton Health Centre were missing from the local base map.** OpenStreetMap maps both as multipolygon relations, which the first map build ignored, so the pins sat on blank ground. `scripts/build-gp-maps.mjs` now draws building relations, with courtyards cut out.
- **Townsend Chemist's pin was about 200 m out.** Now the NHS pin, which matches the KT12 3LJ postcode centroid.
- **The White Practice's hours** showed its appointment times as its opening hours. Its site gives reception 8am to 6:30pm and appointments from 8:30am; both are now shown, labelled.
- **Ashley Medical Practice** had no hours; the practice's own figures are now shown, with the NHS profile's different figures noted.
- **"Currently accepting new patients"** was stated in every description as a permanent fact. It is now a dated statement in the body, sourced to the NHS search, with a warning that lists can close.
- **Hersham Surgery's list of clinics** (asthma, COPD, travel health and so on) was dropped: the practice's current site doesn't list services in that form, and clinical services are outside what these pages are for.

### Pharmacies

Seven pharmacy listings existed and were reused. Five were added because they are within 3.6 km (straight line) of at least one practice and the NHS lists them close to KT12 3LB or KT12 4HT: Oatlands Park Pharmacy and Church Pharmacy (Weybridge), Central Pharmacy and Boots (Esher), and Nebel Pharmacy (Sunbury-on-Thames). Every pharmacy record now carries `nhs_url` and `ods_code`, and `website` is the pharmacy's own site where its NHS listing gives one. It used to hold the NHS listing URL. Nebel's own site was a "coming soon" page, so it has none.

`/living/pharmacies/` lists the five as a separate "Just outside Walton and Hersham" group.

## How the pages are built

- **Profiles** keep the `/directory/<slug>/` route. `src/pages/directory/[slug].astro` hands any listing with a `gp` block to `src/components/gp/GpPracticeProfile.astro`; every other listing renders exactly as before.
- **Data** lives in each listing's frontmatter, in the `gp` block defined in `src/content.config.ts`. Every fact carries a `source` with `basis` (practice website, NHS profile, official data, editor observation, practice-confirmed) and a `checked` date. The profile's "Sources and checks" list is built from those, so it cannot drift from what the page says.
- **Directory landing page**: `/living/gp-surgeries/`, upgraded in place (no new URL). The location filter is CSS radio buttons, so it makes no extra URLs to index and every practice stays in the HTML.
- **Maps** are static SVG built from OpenStreetMap by `npm run map:gp` (`scripts/build-gp-maps.mjs`), the same approach as the brewery and areas maps: no tiles, no third-party requests at page load, no consent question. Markers are drawn at build time from the listing coordinates by `src/components/gp/mapProjection.ts`, so moving a coordinate moves its marker without a map rebuild. Only a new practice or pharmacy outside the current frame needs `npm run map:gp -- --fetch`, then bump `MAP_VERSION`.
- **Building versus entrance.** A listing's `lat`/`lng` is the building, with its source in `gp.building_point_source`. `gp.entrance` is separate, and filled only from an on-site observation or the practice. When it is set, the practice map puts its pin on the entrance and labels it "Surgery entrance", and walking routes start there. Fort House Surgery has one (51.38000, -0.40664), marked by Darren on 22 September 2026 and placed against the OpenStreetMap outline; the other five are still empty.

## Nearby pharmacies

`src/components/gp/NearbyPharmacies.astro`, ranking in `src/utils/pharmacyRanking.ts`, tests in `scripts/test-pharmacy-ranking.mjs` (`npm run test:pharmacies`).

- Candidates: every pharmacy within 3.6 km in a straight line. That only chooses what to route; it never orders a travel-time list.
- Order: routed duration, then road distance, then name. Walking is ranked from walking routes only.
- A missing or malformed route is "Travel time unavailable", listed after the routed ones with no rank and never treated as zero.
- Five show by default; the rest sit in a "Show more" disclosure. Map numbers are the list positions, and list and map switch together per mode.
- **With no routes at all (the current state)** the heading is plain "Nearby pharmacies", the list is ordered by straight-line distance and says so, and no time appears anywhere.

### Route provider: needs a decision

`src/data/pharmacy-routes.json` is empty. `scripts/build-pharmacy-routes.mjs` is ready and works with any OSRM-compatible Table service. It refuses to run until one is configured and never writes an estimate of its own. Run `npm run routes:pharmacies -- --dry-run` to see the 140 origin and destination pairs it would request (six practices, 11 or 12 candidate pharmacies each, two modes). That is 12 Table requests in total.

Options, in the order recommended:

1. **Self-hosted OSRM.** No third-party terms beyond ODbL attribution. Needs Docker (not installed on this machine) and a Surrey extract from Geofabrik, processed once with the car and foot profiles. Then set `ROUTING_DRIVE_TABLE_URL=http://localhost:5000/table/v1/driving`, `ROUTING_WALK_TABLE_URL=http://localhost:5001/table/v1/foot`, `ROUTING_PROVIDER_NAME`, `ROUTING_ATTRIBUTION` and run the script.
2. **FOSSGIS public server** (`https://routing.openstreetmap.de/routed-car/table/v1/driving` and `.../routed-foot/table/v1/foot`). Free, car and foot profiles, one request a second. Its terms (fossgis.de/arbeitsgruppen/osm-server/nutzungsbedingungen, checked 21 September 2026) require the OpenStreetMap attribution and a fix-the-map link (the pages already carry both), a user agent naming the application (the script sends one) and **an operator email address easily visible on the website**, which the site does not currently show. The OSRM project describes the server as for **reasonable, non-commercial use**. Whether the site's paid enhanced listings make it commercial is Darren's call. Do not use it until both points are settled.
3. **A commercial routing API.** Would need an account, a key kept out of the repository and a check of the provider's caching terms. Not set up; no paid service was activated.

Whatever is chosen, the page shows the provider name and attribution next to the times, the calculation date, that times are typical rather than live traffic, and that driving times exclude parking and the walk from the car.

Departure and arrival points: until `gp.vehicle_departure`, `gp.entrance`, `vehicle_arrival` or `pedestrian_entrance` are recorded, the script routes from the building or listing point and records the point the router snapped to. That is honest but approximate, and worth replacing with observed points for the three multi-practice or shopping-centre sites (Walton Health Centre, Walton Community Hospital, The Heart for Brightlife Chemist).

## Photographs

None have been supplied yet: no GP, entrance, parking or prescription-box photographs exist in the repository or in `OneDrive/Pictures/Directory`. The template takes them through each listing's `images` list, and nothing renders while the list is empty (no placeholders). Each image takes:

```yaml
images:
  - src: /images/directory/hersham-surgery/hersham-surgery-entrance-800.webp
    alt: "What the visitor sees and what it helps them find, e.g. the glass door to the left of the car park, with the surgery sign above it"
    role: entrance        # exterior | entrance | signage | parking | step-free-route | prescription-box | reception | other
    caption: "Optional, shown under the photo"
    credit: "Photograph: Darren Bayley"   # only a real credit
    captured: "2026-09"                   # only a real date, YYYY, YYYY-MM or YYYY-MM-DD
    width: 800
    height: 600
```

The first image is the page's main photograph and Open Graph image; the rest form a lazy-loaded gallery. Priorities per practice: entrance and signage (especially at Walton Health Centre, where three practices share the building), parking, the step-free route, and the prescription drop-in box.

**Before publishing any photo:** check for identifiable patients, legible prescription slips, door or key-safe codes, and vehicle registrations. Blur or crop them (the Patels photos show the house method). A photographed box proves a box exists, not that it is in use or reachable after hours: the page states only what the practice's website says, until the practice confirms location and access. Record that with `prescription_box.location`, `access` and `location_source` (basis `practice-confirmed` or `editor-observation`).

## Review cycle

Every three months (next: December 2026), and whenever a practice changes premises:

1. **Contact details and hours**: each practice's own surgery-details page and NHS profile. Where they disagree, show both (`hours_conflict`).
2. **New-patient status**: NHS Find a GP for KT12 3LB and KT12 4HT. Update the dated statements.
3. **Registration, appointment and prescription links**: follow each; the NHS-template practice sites have moved pages before.
4. **Facilities**: note the NHS "last confirmed" date; if it moves, update the list and date.
5. **Pharmacy hours**: each NHS listing's contact page. Pharmacy lists change more often than GP lists.
6. **Coverage**: rerun both NHS searches for any new practice or pharmacy.
7. **Routes**: rerun `npm run routes:pharmacies` after any coordinate change or new pharmacy, and at least every six months while a provider is configured.
8. **Bus stops**: NaPTAN changes rarely; re-check stop codes yearly.

Nothing here is automated. No scheduled job or outreach to practices was set up.
