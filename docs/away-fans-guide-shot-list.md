# Away fans' guide: shot list

Every photograph slot on `/walton-hersham-fc-away-fans-guide/`, 29 in all. Each slot currently shows a labelled placeholder at the right shape.

**How the files are used.** Slot names follow `af-<chapter>-<subject>-<orientation>`. Full-width images (the opening and the chapter breaks) need **two crops**: `-landscape` (3:2 or wider, for desktop) and `-portrait` (4:5, served to phones). Step photos need **landscape only** (3:2). Supply originals at least 2400 px on the long edge; the build makes AVIF and WebP at every size and strips GPS and camera data. iPhone HEIC is fine (it is converted first).

**Text space.** Chapter-break images carry the chapter title over the **bottom third**, on a dark gradient: keep the subject in the top two thirds and avoid important detail at the bottom. The opening image carries the title and standfirst over the **bottom half** on phones.

**People.** Avoid identifiable faces, especially children, unless you have their permission. Crowds from behind or at a distance are fine.

**No club branding.** Please avoid framing the club crest or badge prominently (brief section 15). Kit colours in a crowd are fine.

---

## Opening and chapter breaks (landscape and portrait)

| Slot | Subject | Time of day | Notes |
|---|---|---|---|
| af-opening-floodlights | The ground under floodlights, from a spot that shows the pitch and the stand | Dusk before an evening kick-off | The page's lead image and the social-media preview. Leave the bottom half calm (sky or turf) for the title |
| af-arrive-station | Walton-on-Thames station, Station Avenue entrance | Daytime, early afternoon on a Saturday | The start of every route |
| af-pubs-the-weir | The Weir on the towpath | Late afternoon, low sun on the river | Chapter 2 break and The Weir feature |
| af-ground-main-stand | The main stand from the pitch side or the far end | Matchday, before kick-off | Chapter 3. Not the crest |
| af-parking-hub-car-park | The Sports Hub car park | Matchday, an hour before kick-off | Chapter 4 |
| af-food-high-street | The High Street near The Walton Village or McDonald's | Early evening, shopfront lights on | Chapter 5 |
| af-home-station-night | The station at night, platforms lit | After dark | Chapter 6. The station night shot on our station guide is a good model |
| af-staying-town-centre | Church Street in the town centre | Daytime | Chapter 7 |
| af-dayout-thames | The Thames at Walton, towpath or Walton Bridge | Any time, good light | Chapter 8 |
| af-history-sports-hub | The Sports Hub's stand or entrance sign | Daytime | Chapter 9 |
| af-safety-station | Station forecourt or taxi rank | Daytime | Chapter 10 |
| af-faqs-floodlights | Floodlights against the evening sky | Dusk | Chapter 11 |

## Walk by road (landscape, 3:2)

Stand at the point each step describes, facing the direction of travel, so the photo shows what the reader will see next.

| Slot | Step | Where to stand |
|---|---|---|
| af-walk-road-step01 | Walton-on-Thames station | Outside the station exit, looking along Station Avenue |
| af-walk-road-step02 | Ashley Road | At the end of Station Avenue, looking up Ashley Road |
| af-walk-road-step03 | High Street | Turning into the High Street; The Walton Village in frame if possible |
| af-walk-road-step04 | Church Street | End of the High Street, looking into Church Street; St Mary's Church if visible |
| af-walk-road-step05 | Terrace Road | Where Church Street becomes Terrace Road |
| af-walk-road-step06 | Waterside Drive | The turn from Terrace Road into Waterside Drive |
| af-walk-road-step07 | Elmbridge Xcel Sports Hub | The Hub entrance or signs from Waterside Drive |

## Walk by the river (landscape, 3:2)

| Slot | Step | Where to stand |
|---|---|---|
| af-walk-river-step01 | Walton-on-Thames station | As road step 1 (can be the same photo) |
| af-walk-river-step02 | Ashley Road | As road step 2 |
| af-walk-river-step03 | High Street | As road step 3 |
| af-walk-river-step04 | Bridge Street | Carrying on from the High Street into Bridge Street |
| af-walk-river-step05 | Thames Street | The bend in Bridge Street, looking up Thames Street |
| af-walk-river-step06 | Manor Road | The top of Thames Street, turning into Manor Road; the Old Manor Inn or the Old Manor House in frame |
| af-walk-river-step07 | The Anglers and the Thames Path | Where Manor Road meets the river, The Anglers beside you |
| af-walk-river-step08 | Along the towpath | A typical stretch, downstream, showing the surface and any lighting |
| af-walk-river-step09 | Up Waterside Drive | Where the towpath meets the river end of Waterside Drive |
| af-walk-river-step10 | Elmbridge Xcel Sports Hub | As road step 7, or the approach from the river side |

## While you are there

The site visit can also settle the open questions in `docs/away-fans-guide-sources.md`, section 2: lighting on each route after dark, steps or gates, the towpath surface and flooding, the taxi rank's position, and the Old Manor Inn's address.

## Photos in place (1 October 2026)

From `OneDriveWalton-on-Thames and Hersham photosclubs-and-societieswalton-and-hersham-fc`. Cut with sharp (metadata, including GPS, stripped) into `src/assets/away-guide/`, and listed with alt text and framing in `src/data/away-guide-photos.ts`. A slot listed there shows its photo; every other slot keeps its placeholder.

| File | Slot | Crop |
|---|---|---|
| walton-and-hersham-fc-sept-26-corner.JPG | af-opening-floodlights | Landscape: whole frame. Portrait (phones): the right-hand 2400 by 3000, stand and players. Also the 1200 by 630 social image, `public/images/og/walton-hersham-fc-away-fans-guide.jpg` |
| walton-and-hersham-fc-sept-26-stand.HEIC | af-ground-main-stand | A wide strip (5712 by 1730 from the top) ending above the spectators at the pitchside rail, whose faces are recognisable. The seated crowd in the stand is too distant to identify |
| walton-and-hersham-fc-match-2.HEIC | af-history-sports-hub | Bottom edge trimmed to lose a spectator's cap |
| walton-and-hersham-fc-match.HEIC | af-faqs-floodlights | Whole frame, framed from the top so the floodlight head shows |

Not used: `pitch` (children's faces behind the goal), `sept-26-1` and `sept-26` (player close-ups that show little of the ground).
