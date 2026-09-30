# Away fans' guide: sources and open questions

Research log for `/walton-hersham-fc-away-fans-guide/` (brief section 12). Every fact on the page appears here with its source and the date checked. The machine-readable copy of each source lives next to the value in `src/content/away-guide/`; this file is the human-readable log and the list of questions.

Researched 29 September 2026 by Claude for Darren Bayley.

---

## 1. Questions for the club (one conversation)

Ask Walton & Hersham FC, for example through ticketing@waltonhershamfc.com (the club's published ticketing contact). Each answer is recorded as `organisation-confirmed` with who confirmed it and when.

1. **Turnstiles.** What time do the turnstiles open for Saturday 3pm and Tuesday 7.45pm matches?
2. **Segregation.** Which matches are segregated this season, and where do visiting fans find out before travelling? (The admission prices page says away fans at segregated fixtures must buy tickets for admission; the last supporter notice we found is from March 2025.)
3. **The away end.** When segregated, where is the away end, which turnstiles serve it, is it covered, and which toilets and refreshments can away fans use? (March 2025 notice: behind the car-park-end goal, far-end turnstiles, own toilets, non-alcoholic refreshments. Needs re-confirming for 2026-27.)
4. **The bar.** Can away fans use the clubhouse bar before and after the match, and on segregated days?
5. **Ground rules.** Bags, flags and banners, drums, pyrotechnics, smoking and vaping, dogs, glass and alcohol brought in. (The codes of conduct page covers behaviour only. The March 2025 notice banned glass bottles, alcohol and pyrotechnics.)
6. **Children.** Is the under-13s-must-be-accompanied rule from the 2025 notice still in force?
7. **Away colours.** Is the "no away colours in home areas" rule still applied on segregated days?
8. **Capacity.** What is the ground's official capacity, and how much is covered? (Elmbridge Borough Council gives covered seating for over 500; no total capacity found.)
9. **Parking.** Does the free car park fill before kick-off, and is there a matchday overflow or a place for supporters' coaches?
10. **Taxis and Uber.** Where should cars pick up after a match?
11. **Accessibility.** Wheelchair viewing positions, accessible toilets, and how to book the free carer ticket.
12. **Programmes and the club shop.** Price, and where they are sold on matchdays.

## 2. Questions for a site visit (Darren)

1. **Walk both routes** and confirm each step's wording and position, then set `placeholder: false` in `src/content/away-guide/routes/road.yaml` and `towpath.yaml`.
2. **Lighting.** Which parts of each route are lit after dark? OpenStreetMap tags most of the Thames Path between Manor Road and Waterside Drive `lit=no`; that is a lead, not a fact.
3. **Surface and steps.** Surface on each route, and any steps, gates or ramps, especially between Manor Road and the towpath and between the towpath and Waterside Drive.
4. **Flooding.** Does the towpath stretch flood, and is it signed when closed?
5. **Taxi rank.** Where exactly is the rank at Walton-on-Thames station?
6. **Photographs** for each step (shot list in Phase 4).

---

## 3. Sources, by topic

Confidence: **High** = primary source, checked this session. **Medium** = official open data republished by a third party, corroborated. **Lead** = not publishable on its own.

### The ground

| Fact | Source | Checked | Confidence |
|---|---|---|---|
| Elmbridge Xcel Sports Hub, Waterside Drive, Walton-on-Thames, Surrey KT12 2JP | [Walton & Hersham FC, How to find us](https://waltonhershamfc.com/club/how-to-find-us/); [Places Leisure, Elmbridge Xcel Sports Hub](https://www.placesleisure.org/centres/elmbridge-xcel-sports-hub/) | 29 Sep 2026 | High. Settles plan R2: KT12 2JP is the Sports Hub; KT12 2JG in our Directory is the leisure complex record |
| Saturday home league matches kick off at 3pm (13 of 14; one at 5.30pm) | [Club fixtures calendar (ECAL feed)](https://ics.ecal.com/ecal-sub/6a590c1f9d270a000297ec85/Enterprise%20National%20League.ics) | 29 Sep 2026 | High |
| Tuesday home league matches kick off at 7.45pm (all four) | As above | 29 Sep 2026 | High |
| Prices 2026/27: adults £16, 65+ and concessions £13, 13 to 17 £8, 12 and under £3 | [Club, Admission prices](https://waltonhershamfc.com/club/admission-prices/) | 29 Sep 2026 | High |
| Disabled supporters pay concession price with up to one free carer | As above | 29 Sep 2026 | High |
| Cash, card and contactless at the gate; buy in advance on Fanbase | As above; [Club, Visiting supporter information](https://waltonhershamfc.com/matchday/) | 29 Sep 2026 | High |
| Season tickets not valid for cup games; prices may vary for all-ticket matches | [Club, Admission prices](https://waltonhershamfc.com/club/admission-prices/) | 29 Sep 2026 | High (not yet on the page) |
| Free car park | [Elmbridge Borough Council, Xcel Leisure Complex and Sports Hub](https://www.elmbridge.gov.uk/sports-and-health/sports-venues/xcel-leisure-complex-and-sports-hub); club says "Parking is available on site" | 29 Sep 2026 | High |
| Accessible parking available | [Places Leisure](https://www.placesleisure.org/centres/elmbridge-xcel-sports-hub/) | 29 Sep 2026 | High |
| Main pitch: floodlit 3G artificial turf | [Elmbridge Borough Council](https://www.elmbridge.gov.uk/sports-and-health/sports-venues/xcel-leisure-complex-and-sports-hub) | 29 Sep 2026 | High |
| Covered seating for over 500 | As above | 29 Sep 2026 | High |
| Hub managed by Places Leisure with Elmbridge Borough Council | As above | 29 Sep 2026 | High (not yet on the page) |
| Ticketing contact ticketing@waltonhershamfc.com | [Club, Basingstoke Town (H) supporter information](https://waltonhershamfc.com/2025/03/basingstoke-town-h-supporter-information/) | 29 Sep 2026 | Medium: from a 2025 post; confirm it is current |

### Trains from Walton-on-Thames

| Fact | Source | Checked | Confidence |
|---|---|---|---|
| Current timetable runs 17 May to 12 December 2026; next from 13 December 2026 | [National Rail, Timetable changes](https://www.nationalrail.co.uk/travel-information/timetable-changes/) | 29 Sep 2026 | High |
| Saturday departures 4.37pm to the last trains, 12.36am to London Waterloo and 12.40am towards Woking | [Realtime Trains, Saturday 3 October 2026](https://www.realtimetrains.co.uk/search/simple/gb-nr:WAL/2026-10-03/1630-2359) | 29 Sep 2026 | High for that date. Engineering work varies by weekend: the page says to check live times |
| Tuesday departures from 9.07pm; last 11.50pm to London Waterloo and 12.13am towards Woking | [Realtime Trains, Tuesday 6 October 2026](https://www.realtimetrains.co.uk/search/simple/gb-nr:WAL/2026-10-06/2100-0130) | 29 Sep 2026 | High for that date |
| Basingstoke and Guildford trains from Walton call at Woking | Realtime Trains "later call at Woking" filter, [Saturday](https://www.realtimetrains.co.uk/search/simple/gb-nr:WAL/to/gb-nr:WOK/2026-10-03/1630-0200) and [Tuesday](https://www.realtimetrains.co.uk/search/simple/gb-nr:WAL/to/gb-nr:WOK/2026-10-06/2100-0130) | 29 Sep 2026 | High |
| Station has a taxi rank | [South Western Railway, Walton-on-Thames station](https://www.southwesternrailway.com/travelling-with-us/at-the-station/walton-on-thames) | 29 Sep 2026 | High. Exact position: site visit |
| Step-free category B1 | [National Rail, Walton-on-Thames](https://www.nationalrail.co.uk/stations/walton-on-thames/); SWR as above | 29 Sep 2026 | High (not yet on the page; our station guide covers it) |

Realtime Trains shows an automatic browser check to scripted requests. It was read in the ordinary browser pane, not scripted around.

### Walking, taxi and bus times (generated, not typed)

From `scripts/build-away-guide-map.mjs`, OSRM routing over OpenStreetMap, fetched 29 September 2026. Typical estimates, labelled as such on the page.

| Figure | Value |
|---|---|
| Walk by road (Station Avenue, Ashley Road, High Street, Church Street, Terrace Road, Waterside Drive) | 4.4 km, about 58 minutes |
| Walk by the river (Station Avenue, Ashley Road, High Street, Bridge Street, Thames Street, Manor Road, Thames Path, Waterside Drive; Thames Street from 1 October 2026) | 4.2 km, about 56 minutes; 1.1 km on the Thames Path |
| Drive, station to ground | 3.7 km, about 7 minutes free-flow |
| Walk, Church Street bus stop to the station | 1.7 km, about 23 minutes |
| Walk, ground to the Xcel bus stop | 0.2 km, about 3 minutes |
| Full time after kick-off | About 110 minutes: two 45-minute halves, half-time of up to 15 minutes (IFAB Laws of the Game, Law 7), plus added time. Shown as "around" |

The club's own page gives "approximately 10 minutes by car or 50-minute walk" from Walton-on-Thames station. Our routed times follow Darren's chosen streets, which are longer than the shortest walk.

### Bus

| Fact | Source | Checked | Confidence |
|---|---|---|---|
| **No bus runs from Walton-on-Thames station to the ground.** Station stops are served by 458, 459, 663 and 881; none serves the Xcel stop | [bustimes.org, Walton-on-Thames](https://bustimes.org/localities/walton-on-thames); [stop 40004405264A](https://bustimes.org/stops/40004405264A) (564 only) | 29 Sep 2026 | Medium (Bus Open Data Service data) |
| 564, Falcon Buses, Hersham to Hersham via Walton town centre and the Xcel | [Falcon Buses, 564](https://www.falconbuses.co.uk/services/FALC/564); [club, How to find us](https://waltonhershamfc.com/club/how-to-find-us/) | 29 Sep 2026 | High |
| Church Street to the Xcel at 13 minutes past each hour, 9.13am to 6.13pm Saturday (8.08am first on weekdays); 10 minutes | [bustimes.org, 564 (valid from 8 September 2026)](https://bustimes.org/services/564-hersham-walton-on-thames-xcel-leisure-centre) | 29 Sep 2026 | Medium, corroborated by Falcon |
| Xcel to Church Street at 23 minutes past each hour, last 6.23pm; 7 minutes | As above; Falcon's page also gives 6.23pm as the last departure | 29 Sep 2026 | High |
| No evening or Sunday service | Falcon Buses, 564 | 29 Sep 2026 | High |
| 461 (Kingston to Addlestone) passes through Walton but serves neither the station nor the ground | [bustimes.org, 461](https://bustimes.org/services/461-kingston-upon-thames-weybridge-addlestone) | 29 Sep 2026 | Medium |

### Taxis and Uber

| Fact | Source | Checked | Confidence |
|---|---|---|---|
| UberX available in Walton-on-Thames | [Uber, Walton-on-Thames](https://www.uber.com/global/en/r/cities/walton-on-thames-eng-gb/); Darren Bayley | 29 Sep 2026 | High |
| Local taxi firms | None listed. Search results are mostly firms' own marketing sites with no independent confirmation; add only firms confirmed by Elmbridge licensing or Darren | 29 Sep 2026 | Open |

### Pubs on the walking routes

| Pub | Source | Checked | Details confirmed |
|---|---|---|---|
| The Walton Village, 29 High Street, KT12 1DG, 01932 254431 | [thewaltonvillage.com](https://thewaltonvillage.com/) | 29 Sep 2026 | Hours: bar Mon to Thu 12pm to 11pm, Fri 12pm to 12am, Sat 10am to 12am, Sun 10am to 11pm; kitchen to 9pm or 10pm. Shows TNT Sports |
| Old Manor Inn, 113 Manor Road, KT12 2NZ | Darren Bayley; OpenStreetMap; [CAMRA WhatPub](https://camra.org.uk/pubs/old-manor-inn-walton-on-thames-179844) | 29 Sep 2026 | Name and address only. No website of its own found. CAMRA mentions Sky Sports and TNT Sports: lead only |
| The Swan, 50 Manor Road, KT12 2PF, 01932 225964 | [swanwalton.com](https://www.swanwalton.com/) | 29 Sep 2026 | Open Mon to Thu 11am to 11pm, Fri and Sat 11am to 12am, Sun 11am to 11pm; food Mon to Sat 12pm to 9.30pm, Sun 12pm to 9pm; river terrace and garden huts; dog-friendly |
| The Anglers, Riverside Cottages, Manor Road, KT12 2PF | [anglerswalton.co.uk](https://www.anglerswalton.co.uk/) | 29 Sep 2026 | Name and riverside setting only; the site gives no address, hours or phone. Address from our Directory record |

### The Weir (pubs chapter feature, Phase 4)

| Fact | Source | Checked |
|---|---|---|
| The Weir Hotel, Towpath, Waterside Drive, Walton-on-Thames, KT12 2JB, 01932 784530 | [weirhotel.co.uk](https://www.weirhotel.co.uk) | 29 Sep 2026 |
| Open Mon to Sat 12pm to 11pm, Sun 12pm to 10.30pm; food Mon to Sat 12pm to 9.30pm, Sun 12.30pm to 7.30pm | As above | 29 Sep 2026 |
| Six rooms; free on-site parking for guests | As above | 29 Sep 2026 |
| "A welcoming place to have a pre-match drink or food", "a short walk from our ground" | [Club, How to find us](https://waltonhershamfc.com/club/how-to-find-us/) | 29 Sep 2026 |

---

### Phase 4 additions (29 September 2026)

| Fact | Source | Confidence |
|---|---|---|
| The Regent, 19 Church Street KT12 2QP; hours Mon to Wed 9am to 11pm, Thu 9am to midnight, Fri and Sat 9am to 1am, Sun 9am to 12.30am; Sky Sports and TNT Sports; outside area; children welcome; dog friendly | [Craft Union Pubs, Regent Walton Upon Thames](https://www.craftunionpubs.com/regent-walton-on-thames) | High |
| Nando's, Unit 7, The Heart KT12 1GH, 01932 223610; Mon to Wed 11.30am to 10pm, Thu to Sat 11.30am to 10.30pm, Sun 11.30am to 10pm | [Nando's Walton-on-Thames](https://www.nandos.co.uk/restaurants/walton-thames) | High |
| Wagamama, The Heart KT12 1GH, 01932 260664; Mon to Thu 11am to 10pm, Fri and Sat 11am to 11pm, Sun 11am to 10pm | [Wagamama Walton-on-Thames](https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames) | High |
| Five Guys, Unit 8a, The Heart KT12 1GH, 01932 320992 (no hours shown) | [Five Guys, Walton on Thames](https://restaurants.fiveguys.co.uk/greater-london/unit-8a) | High |
| McDonald's, 5-7 High Street KT12 1DG (hours not stated: the official page refused an automated read; aggregator hours not used) | [McDonald's location page](https://www.mcdonalds.com/gb/en-gb/location/walton-on-thames/walton-on-thames/57-high-street/8260149.html) | High for existence |
| Khyber Pass, Terrace Road KT12 2SA: eat in, takeaway, online ordering (hours not shown) | [khyberpassinwalton.co.uk](https://www.khyberpassinwalton.co.uk/) | High |
| Co-op, 56-62 Terrace Road; Aldi, 1-3 Bridge Street | Co-op and Aldi store finders, as linked from the Directory | High |
| Travelodge Walton-on-Thames Central, 20-32 Church Street KT12 2QS: limited free parking, double, family and accessible rooms | [Travelodge](https://www.travelodge.co.uk/hotels/692/Walton-on-Thames-Central-hotel) | High |
| Travelodge Walton-on-Thames, Ashley Park Road KT12 1JP: directly across from the station; limited free parking for guests | [Travelodge](https://www.travelodge.co.uk/hotels/488/Walton-On-Thames-hotel) | High |
| Club founded 1895 as Walton FC; amalgamated with Hersham FC in 1945; FA Amateur Cup at Wembley on 14 April 1973, 41,000 crowd, Roger Connell's late goal against Slough Town; left Stompond Lane at the end of September 2017 for the Sports Hub; nickname the Swans | [Walton & Hersham FC, History](https://waltonhershamfc.com/club/history/) | High |
| First team in the Enterprise National League South, 2026-27 | [Club, first team fixtures](https://waltonhershamfc.com/fixtures/first-team/) | High |
| St Peter's Hospital, Guildford Road, Chertsey KT16 0PZ: 24-hour A&E | [Ashford and St Peter's Hospitals NHS FT](https://www.ashfordstpeters.nhs.uk/accident-and-emergency) | High |
| 999 for emergencies, 101 for non-emergencies | [Surrey Police, Contact us](https://www.surrey.police.uk/contact/af/contact-us-beta/contact-us/) | High |
| Venue positions on the maps | OpenStreetMap, element recorded in each venue file | High for position |
| Hub outline and pitches on the site plan | OpenStreetMap way 44207919 and the pitch ways within it | High for shape; which pitch is the stadium pitch is a club question |

| BP HKS Halfway, Hersham Road KT12 5NR: Mon to Sat 6am to 11pm, Sun 7am to 11pm | [BP station finder](https://map.bp.com/en-GB/GB/petrol-station/walton-on-thames/hks-halfway/14261), read in the browser pane (30 Sep 2026) | High |
| BP Molesey Road Service Station, Molesey Road KT12 3PW: Mon to Sat 6am to 10pm, Sun 7am to 10pm | [BP station finder](https://map.bp.com/en-GB/GB/petrol-station/walton-on-thames/molesey-road-service-station/1953746048), read in the browser pane (30 Sep 2026) | High |
| Council town centre car parks include Ashley Park (off Ashley Park Avenue, KT12 1EP) and Drewitts Court (Bridge Street and Hepworth Way, KT12 1AE) | [Elmbridge Borough Council, Find a car park](https://www.elmbridge.gov.uk/parking-and-roads/car-parks/find-car-park) (30 Sep 2026) | High |

Other fuel stations mapped in OpenStreetMap near Walton (Texaco on Hersham Road and Esher Road, Esso at Walton Bridge crossroads, Shell on Oatlands Drive) are leads only; add any the operators confirm.

**Walton Casuals.** The brief mentions "the merger with Walton Casuals". No primary source found describes a merger: the club's history page does not mention Walton Casuals, and secondary sources (Wikipedia, a lead only) describe the two clubs sharing the Sports Hub until Walton Casuals folded in 2022. The guide says nothing about Walton Casuals until Darren decides what to say and a primary source supports it.

**Not yet researched:** late-opening pharmacies (the guide links our pharmacies page), programme prices and the club shop (club questions).

## 4. Corrections needed elsewhere on the site (outside this guide's scope)

- **The Weir Hotel** Directory listing places it "beside Walton Bridge" and "a 10 to 15 minute walk" from the station; it is beside the Sports Hub, about 4 km from the station. A separate task has been offered.
- **The Swan** Directory record gives www.theswanwalton.co.uk, which no longer resolves; its site is now https://www.swanwalton.com/.
- **The Swan and The Anglers** Directory records rest on the owner-supplied spreadsheet only.
- **Old Manor Inn** has no Directory listing.
- **The George Inn** Directory record gives www.georgeinnwaltononthames.co.uk, and **The Souvlaki** gives thesouvlaki.uk: neither domain resolves. Check both are still trading.
- **The Mogul**'s website now redirects to Just Eat.
- **The Watch Walton and Hersham FC attraction card** (Things to Do) repeats unsourced claims about the stand, bars and car park; the earlier task on the FC page should cover it too.

## 5. Still to research

Any restricted streets around the Hub (council), programme and club shop details (club), and price bands for hotels (dropped: no source gives stable prices).
