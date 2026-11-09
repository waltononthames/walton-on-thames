# Research brief for Grok: Walton-on-Thames.org directory, batch 3 (health, fitness, accommodation, and food and drink)

**Written:** 9 November 2026, for Darren to give to Grok. **Results go to:** `docs/research-inbox.md`, under a heading naming this batch. **Covers:** 64 listings that have no field-level source checks yet (`npm run content:stale-listings`), part of `docs/directory-plan.md` item 1.4.
**Why this exists:** the same as batch 1 (`docs/grok-research-brief.md`): Grok's findings are leads, never sources. Every quotation is checked against its page in a Claude Code session before a listing changes, and the listing cites the page, not Grok.

Everything below the line is the brief. Paste it to Grok as it stands.

---

## Your role

You are a research assistant for Walton-on-Thames.org, an independent, not-for-profit local guide to Walton-on-Thames, Hersham and Whiteley Village in Surrey, England. The site's directory lists local businesses. Its rule is that every fact must come from an official source, checked on a known date.

Your job is to **find** those official sources and **report exactly what they say**. You are not writing anything for the site. Another assistant will open every page you cite and check it before anything is published, so a finding without a URL and an exact quotation cannot be used.

## Rules

1. **Report only what you saw on a page, this time.** Never fill a gap from memory, from what a business "usually" offers, or from what seems likely. If you did not find something, write `NOT FOUND`. A gap is useful; a guess is harmful.
2. **Quote exactly.** Copy addresses, phone numbers and business names character for character as the page shows them, inside quotation marks. Do not correct spelling, expand abbreviations, reformat phone numbers or add a postcode the page does not show. Where a page shows a value over several lines, mark each line break with ` / `.
3. **Give the exact URL** of the page where each quotation appears: the specific page (for example the contact or branch page), not just the home page.
4. **Say what kind of page it is.** Use one of these labels:
   - `OWN SITE`: the business's own website on its own domain
   - `CHAIN BRANCH PAGE`: a national chain's page for this specific branch
   - `OFFICIAL REGISTER`: a public body's or operator's own listing, such as the NHS website (nhs.uk) for a dentist, the Post Office's own branch finder, a council or Surrey County Council page, or a shopping centre's own store directory (for example The Heart's)
   - `CHAIN GENERIC`: a chain's home page or store finder, not this branch
   - `BOOKING OR ORDERING PLATFORM`: Booking.com, Expedia, Just Eat, Deliveroo, OpenTable, MINDBODY, ClassPass and so on
   - `SOCIAL`: Facebook, Instagram, X and so on
   - `OTHER`: anything else (say what)
   Only `OWN SITE`, `CHAIN BRANCH PAGE` and `OFFICIAL REGISTER` can be used as sources. Report the others if they are all you find, but label them honestly.
5. **Do not use** TripAdvisor, Yelp, Yell, Google Maps reviews, Reddit, forums, other directories or AI-generated pages as evidence. You may use them to *find* an official page, but never quote them as the answer.
6. **No reviews, ratings or opinions.** Do not report star ratings, testimonials, "award-winning", "best", "favourite" or similar, even where the business says it about itself. Leave them out entirely.
7. **Opening hours and prices:** do not copy them. Give the URL of the page that shows hours, if there is one.
8. **Instructors and services without premises** (Pilates or yoga teachers, personal trainers, mobile services): many teach at hired venues or online. Quote where the business itself says it holds classes (venue name and address as written) or which area it covers, and say so in Notes. Do not guess a home address, and do not report one even if you see it.
9. **Signs of closure or change:** if a page says the business has closed, moved or changed name, or a site is dead, parked or redirects somewhere unrelated, report that with the URL and the exact wording or what happened.
10. **Pages that load details with JavaScript:** report what a visitor sees after the page has fully loaded, and write `rendered page` beside the quotation.
11. **Date everything.** Give the date you looked at each page.

## The task

For each of the 64 businesses in the table:

1. Find its official page: its own website, a chain's page for this branch, or an official register entry (see rule 4).
2. From that page, quote the business name, address and phone number exactly as shown.
3. Quote any short statement from that page that a visitor would want to know: services offered, booking arrangements, facilities, step-free access, parking. Exact words only, with the URL. Skip anything promotional.
4. Report any sign the business has closed, moved or changed name.

The table gives the name and address we hold, so you can identify the business, and the website we currently link, which may be wrong, dead or not the business's own. **Do not copy values from this table into your answer.** Report what the pages say. If a page disagrees with the table, that is exactly what we need to know.

| # | ID | Name we hold | Type | Address we hold | Website we link now |
|---|---|---|---|---|---|
| 1 | `april-house-weybridge` | April House Weybridge | Accommodation (bed-and-breakfast) | 6 Springfield Meadows, Weybridge, KT13 8AJ | https://www.aprilhouseweybridge.co.uk |
| 2 | `hand-and-spear-weybridge` | Hand & Spear | Accommodation (pub-with-rooms, hotel) | Old Heath Road, Weybridge, KT13 8TX | https://www.handandspear.co.uk |
| 3 | `holiday-inn-shepperton` | Holiday Inn London Shepperton | Accommodation (hotel) | Felix Lane, Shepperton, TW17 8NP | https://www.ihg.com |
| 4 | `oatlands-park-hotel` | Oatlands Park Hotel | Accommodation (hotel) | 146 Oatlands Drive, Weybridge, KT13 9HB | https://www.oatlandsparkhotel.com |
| 5 | `old-manor-house-bb-shepperton` | Old Manor House Bed & Breakfast | Accommodation (bed-and-breakfast) | Squire's Bridge Road, Shepperton, TW17 0QG | (none) |
| 6 | `sandown-park-lodge` | Sandown Park Lodge | Accommodation (hotel) | Sandown Park Racecourse, Portsmouth Road, Esher, KT10 9AJ | https://www.sandown.co.uk |
| 7 | `splash-cottage-bb` | Splash Cottage Bed & Breakfast | Accommodation (bed-and-breakfast) | 91 Watersplash Road, Shepperton, TW17 | (none) |
| 8 | `albert-arms-esher` | The Albert Arms | Accommodation (pub-with-rooms, bed-and-breakfast) | 82 High Street, Esher, KT10 9QS | https://www.thealbertarmsesher.co.uk |
| 9 | `the-bear-esher` | The Bear Esher | Accommodation (pub-with-rooms, hotel) | 71 High Street, Esher, KT10 9RQ | https://www.bearesher.co.uk |
| 10 | `oatlands-chaser` | The Oatlands Chaser | Accommodation (hotel, inn) | 25 Oatlands Chase, Weybridge, KT13 9RW | https://www.innkeeperscollection.co.uk |
| 11 | `the-ship-hotel-weybridge` | The Ship Hotel | Accommodation (hotel) | 70 Monument Green, High Street, Weybridge, KT13 8BQ | https://www.shiphotel.co.uk |
| 12 | `watermans-arms-hersham` | The Watermans Arms | Accommodation (guest-house, pub-with-rooms) | 1 Queens Road, Hersham, Walton-on-Thames, KT12 5LT | (none) |
| 13 | `the-weir-hotel` | The Weir Hotel | Accommodation (pub-with-rooms, hotel) | Towpath, Waterside Drive, Walton-on-Thames, KT12 2JB | https://www.weirhotel.co.uk |
| 14 | `travelodge-walton-ashley-park` | Travelodge Walton-on-Thames | Accommodation (hotel) | Ashley Park Road, Walton-on-Thames, KT12 1JP | https://www.travelodge.co.uk |
| 15 | `travelodge-walton-central` | Travelodge Walton-on-Thames Central | Accommodation (hotel) | 20–32 Church Street, Walton-on-Thames, KT12 2QS | https://www.travelodge.co.uk |
| 16 | `warren-lodge-hotel` | Warren Lodge Hotel | Accommodation (hotel) | Church Square, Shepperton, TW17 9JZ | https://www.warrenlodgehotel.co.uk |
| 17 | `west-end-lodge-esher` | West End Lodge B&B | Accommodation (bed-and-breakfast) | 11 West End Lane, Esher, KT10 8LB | https://www.westendlodge.co.uk |
| 18 | `bean-on-the-green-bloomings-coffee` | Bean on the Green | Café | 1 The Green, Hersham, Walton-on-Thames KT12 4HW | https://www.facebook.com/BeanontheGreenhersham/ |
| 19 | `costa-coffee-hersham` | Costa Coffee Hersham | Café (chain) | Unit 10, The Hersham Centre, The Green, Hersham, KT12 4HL | https://www.costa.co.uk/stores/hersham |
| 20 | `esquires-coffee` | Esquires Coffee | Café | 67 High Street, Walton-on-Thames Surrey KT12 1DJ | https://esquirescoffee.co.uk/store/esquires-walton-on-thames/ |
| 21 | `hersham-cafe-restaurant` | Hersham Cafe & Restaurant | Café (british) | 19 Molesey Road, Hersham, Walton-on-Thames KT12 4RN | (none) |
| 22 | `whiteley-village-community-cafe` | Whiteley Village Community Cafe | Café | Whiteley Village Club, Octagon Road, Whiteley Village, Hersham, Walton-on-Thames KT12 4DN | https://www.thewhiteleyhomestrust.org.uk/community-and-activities/community-cafe |
| 23 | `ashley-dental` | Ashley Dental | Dentist (dentist) | 19 Ashley Road, Walton-on-Thames, Surrey, KT12 1JB | https://www.ashley-dental.co.uk/ |
| 24 | `cromwell-dental-practice` | Cromwell Dental Practice | Dentist (dentist) | 1 Cromwell Road, Walton-on-Thames, Surrey, KT12 3NL | https://cromwelldentalpractice.uk/ |
| 25 | `egodent-walton-on-thames` | EgoDent Dental and Medical Clinic | Dentist (dentist) | 6 Church Street, Walton-on-Thames, Surrey, KT12 2QS | https://clinics.egodent.co.uk/walton-on-thames/ |
| 26 | `hersham-dental-practice` | Hersham Dental Practice | Dentist (dentist) | 5 The Green, Hersham, Surrey, KT12 4HW | https://www.hershamdentalpractice.co.uk/ |
| 27 | `mulberry-dental` | Mulberry Dental | Dentist (dentist) | The Mulberry, 18 Ashley Road, Walton-on-Thames, Surrey, KT12 1HS | https://www.mulberrydental.co.uk/ |
| 28 | `oatlands-dental-lounge` | Oatlands Dental Lounge | Dentist (dentist) | Napier House, 62-64 Bridge Street, Walton-on-Thames, Surrey, KT12 1AP | https://oatlandsdentalweybridge.com/ |
| 29 | `white-house-dental-clinic` | The White House Dental Clinic | Dentist (dentist) | 18 Terrace Road, Walton-on-Thames, Surrey, KT12 2SB | https://www.whitehousedental-clinic.co.uk/ |
| 30 | `walton-dental-surgery` | Walton Dental Surgery | Dentist (dentist) | 71A Hersham Road, Walton-on-Thames, Surrey, KT12 1LL | https://waltondental.co.uk/ |
| 31 | `walton-park-dental-practice` | Walton Park Dental Practice | Dentist (dentist) | 2A Walton Park, Walton-on-Thames, Surrey, KT12 3ET | https://www.waltonparkdental.co.uk/ |
| 32 | `windsor-house-dental` | Windsor House Dental | Dentist (dentist) | Windsor House, 20 Queens Road, Hersham, Surrey, KT12 5LR | https://windsorhousedental.co.uk/ |
| 33 | `all4pilates` | All4Pilates | Health and fitness (pilates) | Hersham Baptist Church, Arch Road, Hersham, KT12 4QR | https://www.all4pilates.com |
| 34 | `better-body-pilates` | Better Body Pilates | Health and fitness (pilates) | All Saints Church Hall, Hersham, KT12 5LU | https://www.betterbodytraining.com |
| 35 | `body-and-brain-yoga-taichi` | Body & Brain Yoga Taichi | Health and fitness (yoga, martial-arts, wellness) | 37 Bridge Street, Walton-on-Thames, KT12 1AE | https://www.bodynbrain.co.uk |
| 36 | `body-soul-yoga` | Body Soul Yoga | Health and fitness (yoga, wellness) | 10 Berkeley Gardens, Walton-on-Thames, KT12 2PQ | https://www.bodysoulyoga.co.uk |
| 37 | `club-dancefit` | Club DanceFit | Health and fitness (dance-fitness, fitness-classes) | Three Rivers Academy, Hersham Road, Walton-on-Thames, KT12 5EJ | https://www.clubdancefit.co.uk |
| 38 | `dottie-fitness` | Dottie Fitness | Health and fitness (personal-training, nutrition, online-coaching) | 41 Russell Road, Walton-on-Thames, KT12 2LA | https://www.dottiefitness.com |
| 39 | `elmbridge-xcel` | Elmbridge Xcel Leisure Complex | Health and fitness (gym, swimming, fitness-classes, climbing) | Waterside Drive, Walton-on-Thames, KT12 2JG | https://www.placesleisure.org |
| 40 | `emily-ann-pilates` | Emily Ann Pilates | Health and fitness (pilates, personal-training) | York Gardens, Walton-on-Thames | https://www.emilyannpilates.com |
| 41 | `fitzen-pilates` | Fitzen Pilates | Health and fitness (pilates) | 125 Hersham Road, Walton-on-Thames, KT12 1RW | https://www.fitzenstudio.co.uk |
| 42 | `impulse-on-pilates` | imPULSE on PILATES | Health and fitness (pilates) | 44–46 Terrace Road, Walton-on-Thames, KT12 2SD | (none) |
| 43 | `inferno-fitness` | Inferno Fitness | Health and fitness (gym, personal-training, sports-therapy, yoga, pilates) | Unit 6, The Ember Centre, Lyon Road, Hersham, KT12 3PU | https://www.inferno.fitness |
| 44 | `kayalin-yoga` | Kayalin Yoga | Health and fitness (yoga) | St Andrew's Church, Hersham Road, Walton-on-Thames, KT12 1LG | https://www.kayalinyoga.com |
| 45 | `lean-personal-training` | Lean Personal Training | Health and fitness (personal-training, bootcamp, corporate-fitness) | Ashley Road, Walton-on-Thames, KT12 1HL | https://www.leanpersonaltraining.co.uk |
| 46 | `nulifit` | NuLiFit | Health and fitness (personal-training, fitness-classes, nutrition) | 62 Thames Street, Walton-on-Thames, KT12 2PS | https://www.nulifit.com |
| 47 | `origin-pilates` | Origin Pilates | Health and fitness (pilates, yoga, barre) | 43 The Heart, Walton-on-Thames, KT12 1GH | https://www.theoriginpilates.com |
| 48 | `puregym-walton` | PureGym Walton-on-Thames | Health and fitness (gym, fitness-classes, personal-training) | 2nd Floor, Unit 52, The Heart, Walton-on-Thames, KT12 1GH | https://www.puregym.com |
| 49 | `sam-b-fit` | Sam B Fit | Health and fitness (personal-training, fitness-classes) | Cambridge Road, Walton-on-Thames, KT12 2DR | (none) |
| 50 | `sonya-b-fitness` | Sonya B Fitness | Health and fitness (fitness-classes, bootcamp, boxing-fitness) | The Guide Hut, Faulkners Road, Hersham, KT12 5JB | https://www.sonyabfitness.co.uk |
| 51 | `the-method-gym` | The Method Gym | Health and fitness (gym, functional-fitness, hyrox, strength) | 57–59 High Street, Walton-on-Thames, KT12 1DJ | https://www.themethodgym.co.uk |
| 52 | `three-sixty-gym` | Three Sixty Gym | Health and fitness (gym, personal-training, martial-arts, physiotherapy) | 17a Bridge Street, Walton-on-Thames, KT12 1AE | https://www.threesixtygym.co.uk |
| 53 | `vern-yoga` | VernYoga | Health and fitness (yoga, dance-fitness) | Centre for the Community, 7 Queens Road, Hersham, KT12 5LU | https://www.vernyoga.com |
| 54 | `wellness-all-around` | Wellness All Around | Health and fitness (yoga, wellness, coaching) | 22 Esher Avenue, Walton-on-Thames, KT12 2TA | https://www.wellnessallaround.co.uk |
| 55 | `yoga-elephant` | Yoga Elephant | Health and fitness (yoga) | Esher Rugby Club, 369 Molesey Road, Hersham, KT12 3PF | https://www.yogaelephant.co.uk |
| 56 | `yoga-gently` | Yoga Gently | Health and fitness (yoga) | 13 Queens Road, Hersham, KT12 5LU | https://www.friendsofyoga.co.uk |
| 57 | `zone-in-yoga` | Zone In Yoga | Health and fitness (yoga) | Hersham, KT12 4JH | https://www.zoneinyoga.co.uk |
| 58 | `the-barley-mow` | The Barley Mow | Pub (food) | 67 Molesey Road, Hersham, Walton-on-Thames KT12 4RS | https://www.barleymowhersham.co.uk/ |
| 59 | `the-bricklayers-arms` | The Bricklayers Arms | Pub (food) | 6 Queens Road, Hersham, Walton-on-Thames KT12 5LS | https://www.thebricklayersarmshersham.co.uk/ |
| 60 | `the-royal-george` | The Royal George | Pub (food) | 130 Hersham Road, Walton-on-Thames, KT12 5QL | https://www.royalgeorgepub.co.uk/ |
| 61 | `the-walton-village` | The Walton Village | Pub (food) | 29-31 High Street, Walton-on-Thames KT12 1DG | https://thewaltonvillage.com/ |
| 62 | `khan-of-walton` | Khan of Walton | Restaurant (indian) | 3 Simpson House, New Zealand Avenue, Walton-on-Thames KT12 1QB | https://www.khanwalton.co.uk/ |
| 63 | `khyber-pass` | Khyber Pass | Restaurant (indian) | 54 Terrace Road, Walton-on-Thames KT12 2SA | https://www.khyberpassinwalton.co.uk/ |
| 64 | `laffamato` | L'Affamato | Restaurant (italian) | 111 Hersham Road, Walton-on-Thames KT12 1RN | https://www.laffamatowaltononthames.com/ |

## Specific questions

- **Dentists:** for each dental practice in the table, also quote its name, address and phone from its NHS website page (nhs.uk, "Find a dentist"), with the URL, as well as from its own site. If the NHS page says whether it is accepting new NHS patients, quote that sentence and its date.
- **Accommodation:** for each hotel, inn or B&B, quote the address and phone from its own site, and any statement of how many rooms it has. Do not use Booking.com or similar as the source.
- **New businesses to find** (not yet in our directory). For each, find its official page and report it in the same block format, numbered N1 to N6:
  - N1 Cacao Route, Walton-on-Thames
  - N2 Caffè Nero, Walton-on-Thames
  - N3 Starbucks, Walton-on-Thames
  - N4 Greggs, Walton-on-Thames
  - N5 the café at Riverhouse Barn, Manor Road, Walton-on-Thames
  - N6 The Old Manor Inn, Manor Road, Walton-on-Thames
- **Khan of Walton** (in the table): we hold "3 Simpson House, New Zealand Avenue", but the FSA register gives Unit 3, Simpson House to Pizza GoGo. What address does Khan of Walton's own site give?
- **Walton BBQ**, 99 Hersham Road, Walton-on-Thames: does it have an official page? Report it in the same block format as N7.

## How to report

Return one block per business, in table order, exactly in this form. Use `NOT FOUND` for anything you could not find; do not leave a field out.

```
### <#> <ID>
- Official URL: <url> (<page-type label>)
- Name as shown: "<exact quotation>" (<url of page>)
- Address as shown: "<exact quotation>" (<url of page>)
- Phone as shown: "<exact quotation>" (<url of page>)
- Offers (quoted): "<exact quotation>" (<url>); or NOT FOUND
- Hours page: <url>; or NOT FOUND
- Closure or change: <what you found, with url>; or NONE SEEN
- Other sites found: <url> (<label>); or NONE
- Checked on: <date>
- Notes: <anything uncertain; say what you could not confirm and why>
```

Then a section headed **Specific questions** answering each one in the same style: quotation plus URL, or `NOT FOUND`.

Finish with a list of every business where you were unsure, and why. Saying "I could not tell" is always better than a confident guess. If you run out of room, stop at the end of a complete block and say where you stopped, so the rest can be asked for in a second message.
