# Research brief for Grok: Walton-on-Thames.org directory, batch 2 (shops and services)

**Written:** 9 November 2026, for Darren to give to Grok. **Results go to:** `docs/research-inbox.md`, under a heading naming this batch. **Covers:** 55 listings that have no field-level source checks yet (`npm run content:stale-listings`), part of `docs/directory-plan.md` item 1.4.
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

For each of the 55 businesses in the table:

1. Find its official page: its own website, a chain's page for this branch, or an official register entry (see rule 4).
2. From that page, quote the business name, address and phone number exactly as shown.
3. Quote any short statement from that page that a visitor would want to know: services offered, booking arrangements, facilities, step-free access, parking. Exact words only, with the URL. Skip anything promotional.
4. Report any sign the business has closed, moved or changed name.

The table gives the name and address we hold, so you can identify the business, and the website we currently link, which may be wrong, dead or not the business's own. **Do not copy values from this table into your answer.** Report what the pages say. If a page disagrees with the table, that is exactly what we need to know.

| # | ID | Name we hold | Type | Address we hold | Website we link now |
|---|---|---|---|---|---|
| 1 | `ceramics-cafe-hersham` | Ceramics Café – Hersham | Activity (pottery-painting, creative-studio, family-activities) | On The Green, 1 Berry Lane, Hersham, Surrey, KT12 4HN | https://www.facebook.com/ceramicscafehersham/ |
| 2 | `ace-badminton-racquet-restringing` | Ace Badminton Club Racquet Restringing | Service (racquet-restringing) | Heathside Walton-on-Thames, Waterside Drive, Walton-on-Thames, KT12 2JP | (none) |
| 3 | `church-street-post-office` | Church Street Post Office | Service (post-office) | 7 Church Street, Walton-on-Thames, KT12 2QP | https://www.postoffice.co.uk/branch-finder/114023X/church-street |
| 4 | `hersham-post-office` | Hersham Post Office | Service (post-office) | 9 Molesey Road, Hersham, Walton-on-Thames, KT12 4RJ | https://www.postoffice.co.uk/branch-finder/1110233/hersham |
| 5 | `longmore-road-drop-and-collect` | Longmore Road Drop + Collect | Service (post-office) | 20-22 Longmore Road, Hersham, Walton-on-Thames, KT12 4NZ | https://www.postoffice.co.uk/branch-finder/4423518/Longmore |
| 6 | `molesey-road-drop-and-collect` | Molesey Road Drop + Collect | Service (post-office) | 319 Molesey Road, Walton-on-Thames, KT12 3PF | https://www.postoffice.co.uk/branch-finder/2633523/Molesey |
| 7 | `walton-library` | Walton Library | Service (library, community) | The Heart Shopping Centre, Walton-on-Thames, KT12 1GH | https://www.surreycc.gov.uk/libraries |
| 8 | `walton-on-thames-post-office` | Walton On Thames Post Office | Service (post-office) | 73 Hersham Road, Walton-on-Thames, KT12 1LN | https://www.postoffice.co.uk/branch-finder/0900230/walton-on-thames |
| 9 | `whiteley-village-post-office` | Whiteley Village Post Office | Service (post-office) | Circle Road, Whiteley Village, Hersham, Walton-on-Thames, KT12 4DT | https://www.postoffice.co.uk/branch-finder/1270230/whiteley-village |
| 10 | `99-bikes-walton-on-thames` | 99 Bikes | Shop (cycles) | Auckland House, New Zealand Ave, Walton-on-Thames KT12 1PL | https://www.99bikes.co.uk/pages/99-bikes-walton-on-thames |
| 11 | `accessorize-walton-on-thames` | Accessorize | Shop (accessories) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.accessorize.com/uk |
| 12 | `aldi-walton-on-thames` | Aldi | Shop (supermarket) | 1-3 Bridge Street, Walton-on-Thames, Surrey, KT12 1AE | https://www.aldi.co.uk/store-finder/l/walton-on-thames/1-3-bridge-street/k162 |
| 13 | `argos-walton-on-thames` | Argos | Shop (general-merchandise) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.argos.co.uk/ |
| 14 | `artielli-goldsmiths` | Artielli | Shop (jewellery) | 4A Bridge St, Walton-on-Thames, KT12 1AA | https://www.artielli.com/ |
| 15 | `boots-opticians-walton-on-thames` | Boots Opticians | Shop (optician) | 25 High Street, Walton-on-Thames, KT12 1DG | https://www.bootsopticians.com/stores/walton-on-thames-high-street-kt12-1dg-3257 |
| 16 | `bridgman-walton-on-thames` | Bridgman | Shop (furniture) | Brassey House, 22-24 New Zealand Avenue, Walton-on-Thames, Surrey, KT12 1QD | https://bridgman.co.uk/pages/showroom-appointment |
| 17 | `carmelo-castiglione-opticians` | Carmelo Castiglione Opticians | Shop (optician) | 52 High St, Walton-on-Thames, KT12 1BY | https://ccopticians.co.uk/ |
| 18 | `clarks-walton-on-thames` | Clarks | Shop (footwear) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.clarks.com/en-gb |
| 19 | `co-op-terrace-road-walton-on-thames` | Co-op, Terrace Road | Shop (convenience) | Terrace Road, Walton-on-Thames | https://www.coop.co.uk/store-finder/KT12-2SD/56-62-terrace-road |
| 20 | `connect-fmh-charity-shop-walton-on-thames` | Connect FMH Charity Shop | Shop (charity-shop) | 4 Church Street, Walton on Thames, KT12 2QS | https://www.cathja.org/shops.html |
| 21 | `country-carpets-walton-on-thames` | Country Carpets | Shop (carpets) | 19-23 Bridge Street, Walton on Thames, Surrey, KT12 1AE | https://www.country-carpets.co.uk/ |
| 22 | `dreams-walton-on-thames` | Dreams | Shop (beds) | Brassey House, 16/2 New Zealand Avenue, Walton-on-Thames, KT12 1QD | https://www.dreams.co.uk/store/walton-on-thames |
| 23 | `ee-walton-on-thames` | EE | Shop (mobile-phones) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://ee.co.uk/ |
| 24 | `eyeworks-optometrists` | Eyeworks Optometrists | Shop (optician) | 1 Church St, Town Centre, Walton-on-Thames, KT12 2QP | https://www.eyeworks.co.uk/ |
| 25 | `fleur-jewellery` | Fleur Jewellery | Shop (jewellery) | 1a High Street, Walton on Thames, Surrey, KT12 1DG | http://www.fleurjewellery.co.uk/ |
| 26 | `hersham-green-shopping-centre` | Hersham Green Shopping Centre | Shop (shopping-centre) | Hersham Green Shopping Centre, Molesey Road, Hersham, KT12 4HL | (none) |
| 27 | `holland-and-barrett-walton-on-thames` | Holland and Barrett | Shop (health-food) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.hollandandbarrett.com/ |
| 28 | `hoops-walton-on-thames` | Hoops Walton | Shop (cycles) | 12-14 Brassey House, New Zealand Avenue, Walton on Thames, Surrey, KT12 1QD | https://www.hoopsvelo.com/blog/stores/walton-on-thames-store/ |
| 29 | `lidl-hersham` | Lidl Hersham | Shop (supermarket) | 82 Molesey Road, Hersham, Walton-on-Thames, KT12 4RG | https://www.lidl.co.uk/s/en-GB/store-finder/hersham/molesey-road/ |
| 30 | `love-me-do-brides` | Love Me Do Brides | Shop (bridal) | Boutique 2, Simpson House, New Zealand Avenue, Walton-on-Thames, Surrey, KT12 1QB | https://www.lovemedobrides.com/ |
| 31 | `melin-walton-on-thames` | Melin | Shop (jewellery) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://melincollection.com/ |
| 32 | `monsoon-walton-on-thames` | Monsoon | Shop (fashion) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.monsoon.co.uk/ |
| 33 | `new-look-walton-on-thames` | New Look | Shop (fashion) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.newlook.com/uk/ |
| 34 | `next-walton-on-thames` | Next | Shop (fashion, homeware) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.next.co.uk/ |
| 35 | `o2-walton-on-thames` | O2 | Shop (mobile-phones) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.o2.co.uk/ |
| 36 | `patels-veg-and-more` | Patel's Veg and More | Shop (grocery, asian-groceries) | Unit C, Auckland House, New Zealand Avenue, Walton-on-Thames, KT12 1PL | https://patelsvegnmore.co.uk/ |
| 37 | `poundland-walton-on-thames` | Poundland | Shop (discount) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.poundland.co.uk/ |
| 38 | `roche-bobois-walton-on-thames` | Roche Bobois | Shop (furniture) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.roche-bobois.com/en-GB/ |
| 39 | `sainsburys-walton-on-thames` | Sainsbury's | Shop (supermarket) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.sainsburys.co.uk/ |
| 40 | `screwfix-hersham` | Screwfix | Shop (hardware) | 30 Lyon Road, Hersham Trading Estate, Walton-on-Thames, Surrey, KT12 3PU | https://www.screwfix.com/stores/TT4/walton-on-thames |
| 41 | `slinky-pinks` | Slinky Pinks | Shop (eveningwear) | 66 High Street, Walton-on-Thames, KT12 1BU | https://slinkypinks.co.uk/ |
| 42 | `smiggle-walton-on-thames` | Smiggle | Shop (stationery) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.smiggle.co.uk/shop/en/smiggleuk |
| 43 | `specsavers-walton-on-thames` | Specsavers | Shop (optician) | 22 High Street, Walton on Thames, Surrey, KT12 1DA | https://www.specsavers.co.uk/stores/waltononthames |
| 44 | `sports-direct-walton-on-thames` | Sports Direct | Shop (sportswear) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.sportsdirect.com/ |
| 45 | `sue-ryder-hersham` | Sue Ryder Hersham | Shop (charity-shop) | Unit 13, The Hersham Centre, Hersham, KT12 4HL | https://www.sueryder.org/shop-with-us/find-a-shop/hersham/ |
| 46 | `tapi-carpets-walton-on-thames` | Tapi Carpets & Floors | Shop (carpets) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.tapi.co.uk/ |
| 47 | `tesco-hersham-road-walton-on-thames` | Tesco, Hersham Road | Shop (convenience) | Unit A, Regents Place, Hersham Road, Walton-on-Thames, KT12 1FH | https://www.tesco.com/store-locator/walton-on-thames/143-hersham-rd |
| 48 | `the-fragrance-shop-walton-on-thames` | The Fragrance Shop | Shop (fragrance) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.thefragranceshop.co.uk/ |
| 49 | `the-tackle-exchange` | The Tackle Exchange | Shop (fishing-tackle) | 97 Terrace Road, Walton-on-Thames | https://www.facebook.com/p/The-Tackle-Exchange-LTD-100090044037098/ |
| 50 | `top-gift-walton-on-thames` | Top Gift | Shop (phone-accessories) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://top-gift.co.uk/ |
| 51 | `trespass-walton-on-thames` | Trespass | Shop (outdoor-clothing) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.trespass.com/ |
| 52 | `vision-express-walton-on-thames` | Vision Express | Shop (optician) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.visionexpress.com/ |
| 53 | `wmd-walton-on-thames` | W.M.D | Shop (sports-nutrition) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | (none) |
| 54 | `waitrose-hersham` | Waitrose Hersham | Shop (supermarket) | Hersham Green Shopping Centre, Molesey Road, Hersham, KT12 4HL | https://www.waitrose.com/ |
| 55 | `waterstones-walton-on-thames` | Waterstones | Shop (books) | The Heart Shopping Centre, Walton-on-Thames, Surrey, KT12 1GH | https://www.waterstones.com/ |

## Specific questions

- **The Heart Shopping Centre's own store directory** (its official site): for each business in the table whose address names The Heart, quote the unit number and name exactly as the centre's directory gives them, with the URL. Also list, by name and unit exactly as shown, any shop in that directory that is **not** in this table, so we can see what is missing.
- **Post offices** (Church Street, Hersham, Walton On Thames, Whiteley Village, and the two "Drop + Collect" points): use the Post Office's own branch finder. Quote each branch's name and address exactly, and say whether it is a full branch, a local branch or a Drop + Collect point, in the finder's own words.
- **Walton Library:** quote its address and phone from Surrey County Council's own libraries page.
- **Charity shops** (Connect FMH, Sue Ryder Hersham): use the charity's own shop finder or shop page.

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
