# Research inbox

Findings from external research assistants (Grok, other AI tools, or people), waiting to be checked. **Nothing here is a source.** Under the Content Verification Protocol in `CLAUDE.md`, AI-generated research is Tier 3: a Claude Code session opens each page cited, checks the quotation against it, and only then changes a listing, recording the page itself, not this file, as the source.

How to use it:
- Paste each batch under a dated heading naming the brief it answers (for example `docs/grok-research-brief.md`, batch 1).
- When a session has checked a finding, it marks it **Confirmed** (and the listing is updated), **Rejected** (with the reason: page does not say that, URL dead, not the business's own site), or **Unresolved**.
- Keep rejected findings with their reason, so the same lead is not chased twice.

---

## Batch 1: Grok, received 9 November 2026 (answers docs/grok-research-brief.md)

Status: **checked 9 November 2026** (same evening). Each cited official page was fetched from this session and every quotation tested against it; the listing changes cite the pages themselves, not this report. Outcome by item:

- **Confirmed and applied** (quotations found on the page, listing updated in pass 2): #4 The Moondrop Cafe, #5 Squire's (as "Squire's Hersham Café Bar"), #6 The Boathouse (via waltonboathire.com), #8 The Anglers (new phone 020 4629 8317), #9 The Regent (branch page; no phone on it), #10 The Swan (swanwalton.com), #11 Babucci, #12 Buenasado, #13 Cappadocia, #15 Five Guys, #16 Full Moon, #18 Khao Sarn (khaosarn.co.uk), #19 La Terraza, #21 Nando's, #22 PizzaExpress, #23 Prima Fila, #24 Red Rose (phone added), #26 Sushi Wakyo, #28 Wagamama, #29 Basilo Pizza, #31 Fireaway, #32 KFC, #34 Olive Pizza Kitchen, #37 Pizza GoGo, #39 Joker Takeaway, #40 Tops Pizza; specific questions on The Swan, Sushi Wakyo and Babucci.
- **Confirmed dead links** (the proxy here could not reach the host, consistent with Grok's NXDOMAIN): theswanwalton.co.uk, khaosarnrestaurant.co.uk, cinnamonhersham.co.uk. All three removed or replaced.
- **Confirmed, not acted on:** #36 Perfect Pizza: perfect-pizza.uk lists Slough, Stevenage, Uxbridge and Walsall and no Walton. **One discrepancy:** Guildford, which Grok listed, is not on the page now. #28 Wagamama's "almost ready to welcome you back" is on the page; status left unchanged, for Darren. Postcode or number conflicts between the businesses' own sites and the FSA register (Babucci KT12 1AD v 1AA; Tops Pizza 27 v 27A) are recorded in each listing, register kept.
- **Unresolved, could not be checked from here:** #14 Cinnamon's two newer sites (429 rate limit, then connection reset); #17 IRO Sushi, #30 China Chef, #33 McDonald's, #35 Papa Johns (each refuses automated requests with 403; not worked around); #38 Pizza Hut and The Mogul (details load with JavaScript); #6 coffeeattheboathouse.com (http only); #7 The Surrey Coffee Company's expired domain (host not allowed).
- **No official source found, nothing to check** (Facebook, Just Eat and directories are Tier 3): #1 Archway Cafe, #2 Halfway Cafe, #3 Le Petit Cafe, #7 The Surrey Coffee Company, #20 Mañana, #25 Romaan, #27 Uzzal. These go to pass 3.

Pasted as delivered:

### Report: directory batch 1 (40 businesses + specific questions)

Checked on 9 November 2026, about 19:10–19:40 GMT. Researched by Grok Bot for Walton-on-Thames.org. Read-only: nobody was contacted, no forms were submitted and no accounts were made.

**How to read this report**
- Quotations are copied exactly from what the page showed. Where a page shows a value on several lines, ` / ` marks each line break. The slash is not part of the text.
- Some sites use styling to show text in capitals. Where I could see this in the page code, I quote the underlying text and say "(displayed in capitals)". A checker who copies from the page will get the quoted wording.
- `rendered page` means the text appears only after the page's JavaScript has run in a browser (headless Chrome). For those pages, a plain download of the HTML did not contain it, or was blocked (403). Pages without that label had the quoted text in their downloaded HTML too.
- **Environment caveat:** this research machine cannot load any plain `http://` site. Its outbound proxy returns "500" even for example.com. One site was http-only: coffeeattheboathouse.com. I read it through the public reader service `https://r.jina.ai/<url>`, which fetches the live page from another network, and labelled it that way. I did **not** treat an `http://` failure on its own as a sign that a site is dead. Where I report a dead domain, I also checked public DNS (dns.google). "NXDOMAIN" means the domain does not exist in DNS.
- I opened directories, Tripadvisor, the Food Standards Agency (FSA) hygiene register and similar sites only to find leads. Nothing from them is quoted as an answer.

---

#### 1 archway-cafe
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: NONE SEEN. The only page found is a Facebook page whose latest visible post is dated "Wednesday 28 December 2016" (https://www.facebook.com/mesutant55/). That shows the page is stale; it is not evidence that the café has closed.
- Other sites found: https://www.facebook.com/mesutant55/ (SOCIAL). It is titled "Archway cafe", shows "Walton-on-Thames, United Kingdom" with no street address, shows "01932 225165" and the intro line "FREE LOCAL DELIVERY". I reached it from https://www.facebook.com/profile.php?id=358281421176868, which redirects there.
- Checked on: 9 November 2026
- Notes: Searching found no own website. Guessed domain archwaycafe.co.uk does not exist (NXDOMAIN). A directory listing pointed to a Google Food ordering link, which I did not use.

#### 2 halfway-cafe
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: NONE SEEN
- Other sites found: https://www.just-eat.co.uk/restaurants-halfwaycafewaltononthames/menu (ORDERING PLATFORM). It shows "Halfway Cafe" and a delivery menu. No address was visible in the rendered menu page.
- Checked on: 9 November 2026
- Notes: halfwaycafe.co.uk is a **different business**. It is "176 Halfway Street, Sidcup DA15 8DJ" (https://halfwaycafe.co.uk/), so do not link it.

#### 3 le-petit-cafe
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: NONE SEEN
- Other sites found: https://www.facebook.com/profile.php?id=495214597174121 (SOCIAL). Facebook labels it "Unofficial Page" (auto-generated, "Page created – 11 August 2012"). It shows "2 Bridge Street KT12 1AA Walton-on-Thames" and "01932 252502", and links to isurrey.co.uk, which is a directory.
- Checked on: 9 November 2026
- Notes: There is no own site or business-run social page. The Facebook page is not run by the business, so it should not be treated as the café's own channel.

#### 4 moondrop-cafe
- Official URL: https://themoondropcafe.com/ (OWN SITE)
- Name as shown: "The Moondrop Cafe" (https://themoondropcafe.com/)
- Address as shown: "The Moondrop Cafe / 1 Esher Road / Hersham / Surrey, KT12 4JZ" (https://themoondropcafe.com/)
- Phone as shown: "01932260738" (https://themoondropcafe.com/)
- Offers (quoted): "Collection at 7:50 pm on November 9, 2026" (https://themoondropcafe.com/order-online/, rendered page). This is the online ordering slot picker, which offers collection.
- Hours page: NOT FOUND
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The phone appears in the site header as an unspaced link. The site title includes a self-description, which I left out. I found no opening hours on the site.

#### 5 squires-garden-centre-cafe
- Official URL: https://www.squiresgardencentres.co.uk/cafe_bars/hersham/ (CHAIN BRANCH PAGE). Also the centre page https://www.squiresgardencentres.co.uk/garden-centres/hersham/ (CHAIN BRANCH PAGE).
- Name as shown: "Hersham Café Bar" (https://www.squiresgardencentres.co.uk/cafe_bars/hersham/)
- Address as shown: "Café Bar Address / Burwood Road / Hersham / Surrey / KT12 4AR" (https://www.squiresgardencentres.co.uk/cafe_bars/hersham/)
- Phone as shown: "Tel 01932 247579" (https://www.squiresgardencentres.co.uk/cafe_bars/hersham/)
- Offers (quoted): "We do not take table bookings." (https://www.squiresgardencentres.co.uk/cafe_bars/hersham/); "Booking a table in advance for our delicious Afternoon Tea is required" (same page); "Dogs are however, welcome in the outdoor seating areas of our Café Bar." (https://www.squiresgardencentres.co.uk/garden-centres/hersham/); "All our centres have free parking, free Wi-Fi, disabled facilities, defibrillator and a Café Bar." (same page)
- Hours page: https://www.squiresgardencentres.co.uk/cafe_bars/hersham/
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The site calls the café "Hersham Café Bar", not "Squire's Garden Centre Cafe". The centre page shows the same address ("Garden Centre Address / Burwood Road / Hersham / Surrey / KT12 4AR") and the same phone.

#### 6 the-boathouse-coffee-boathire
- Official URL: http://www.coffeeattheboathouse.com/ (OWN SITE). The boat-hire side is https://waltonboathire.com/ (OWN SITE), which links to it.
- Name as shown: "The Boathouse - Coffee & Boathire" (page title, http://www.coffeeattheboathouse.com/, read via r.jina.ai); "The Boathouse" (section heading, https://waltonboathire.com/)
- Address as shown: "Walton Marina, Walton Bridge Rd, Walton-on-Thames KT12 1QW" (https://waltonboathire.com/ and https://waltonboathire.com/pages/contact-us). coffeeattheboathouse.com shows no address.
- Phone as shown: "Telephone: 01932 550980" (http://www.coffeeattheboathouse.com/, via r.jina.ai); "Tel: 01932 550980" (https://waltonboathire.com/)
- Offers (quoted): "We’re dog friendly too!" (http://www.coffeeattheboathouse.com/ via r.jina.ai, and https://waltonboathire.com/); "We are also fully licensed if you fancy a glass of wine, prosecco or beer!" (https://waltonboathire.com/); "We operate our day boats from Easter to October." (https://waltonboathire.com/)
- Hours page: http://www.coffeeattheboathouse.com/ (also shown on https://waltonboathire.com/)
- Closure or change: NONE SEEN. Note: the reader service reported coffeeattheboathouse.com's "Published Time: Mon, 11 Nov 2019", so that site may not have been updated since 2019.
- Other sites found: https://www.facebook.com/The-Boathouse-114764989915759 (SOCIAL, linked from both sites, not opened); https://tingdeneboating.com/activities/boat-hire/ (OTHER: the marina operator's page; nothing about The Boathouse was visible in the rendered text)
- Checked on: 9 November 2026
- Notes: coffeeattheboathouse.com is http-only. It fails from my machine because of the environment caveat above, not because the site is down; DNS resolves normally. A checker in a normal browser should be able to open it. waltonboathire.com is a Shopify site called "WALTON BOAT HIRE". Its "The Boathouse" menu link and "Find out more" button go to coffeeattheboathouse.com, so I treated them as the same business.

#### 7 the-surrey-coffee-company
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: The website listed on its Facebook page, http://www.thesurreycoffeecompany.co.uk/, now redirects to https://expireddomains.com/domain/thesurreycoffeecompany.co.uk, which says "Expired .co.uk domain for sale". The domain has lapsed. The Facebook page is still active: its latest post is dated "Saturday 17 October 2026 at 09:08".
- Other sites found: https://www.facebook.com/thesurreycoffeeco/ (SOCIAL). Its About page (https://www.facebook.com/thesurreycoffeeco/about) shows "The Surrey Coffee Company", "Unit 1 Wellington House, 60 Highstreet, Walton-on-Thames, United Kingdom, KT12 1FL" and the services "Outdoor seating · In-store collection", but no phone. https://www.instagram.com/thesurreycoffeeco/ (SOCIAL) goes to a login wall, so I could not read it.
- Checked on: 9 November 2026
- Notes: The business has no working own website. See Specific questions for the High Park Sports Ground question.

#### 8 the-anglers
- Official URL: https://www.anglerswalton.co.uk/ (OWN SITE; footer "© Morgan Pub Co. All rights reserved.")
- Name as shown: "The Anglers – Walton-on-Thames" (https://www.anglerswalton.co.uk/)
- Address as shown: "Riverside Cottages, Manor Rd, / Walton-on-Thames KT12 2PF" (https://www.anglerswalton.co.uk/visit). The footer shows it on one line: "Riverside Cottages, Manor Rd, Walton-on-Thames KT12 2PF".
- Phone as shown: "020 4629 8317" (https://www.anglerswalton.co.uk/visit)
- Offers (quoted): "Book your table" (https://www.anglerswalton.co.uk/visit)
- Hours page: https://www.anglerswalton.co.uk/visit
- Closure or change: Possible change. The home page says "The Riverview Restaurant." and "A brand-new riverside dining experience is on its way, featuring premium steak cuts, fresh seafood and the finest seasonal ingredients." (https://www.anglerswalton.co.uk/). There is a separate page, https://www.anglerswalton.co.uk/the-riverview-restaurant, with the same address.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The phone is a 020 (London) number, not 01932. The pub has not changed name; it is adding a restaurant.

#### 9 the-regent
- Official URL: https://www.craftunionpubs.com/pubs/regent-walton-on-thames (CHAIN BRANCH PAGE: Craft Union / Stonegate). Our linked URL, https://www.craftunionpubs.com/regent-walton-on-thames, redirects here.
- Name as shown: "Regent Walton Upon Thames" (displayed in capitals) (https://www.craftunionpubs.com/pubs/regent-walton-on-thames)
- Address as shown: "19 Church Street, Walton-On-Thames, Surrey, KT12 2QP, England" (FIND US section). Under the heading it shows "19 Church Street, Walton-On-Thames, KT12 2QP". Both are at https://www.craftunionpubs.com/pubs/regent-walton-on-thames.
- Phone as shown: NOT FOUND
- Offers (quoted): Facilities list: "Children Welcome", "Pet Friendly", "Outside Area", "Smoking Area", "Real Ale", "Pool Table" (https://www.craftunionpubs.com/pubs/regent-walton-on-thames)
- Hours page: https://www.craftunionpubs.com/pubs/regent-walton-on-thames
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The pub is called "Regent Walton Upon Thames", not "The Regent". The page has no phone number; the page data has an empty phone field. The "FOOD SERVING" section shows a key ("Food Serving" / "No Food Serving"), but I could not tell from the text whether food is served, so I have not reported food.

#### 10 the-swan
- Official URL: https://www.swanwalton.com/ (OWN SITE: the pub's own domain, run by Young's)
- Name as shown: "Welcome to The Swan" (https://www.swanwalton.com/)
- Address as shown: "50 Manor Rd, Walton on Thames, KT12 2PF" (https://www.swanwalton.com/)
- Phone as shown: "01932 225964" (https://www.swanwalton.com/, footer)
- Offers (quoted): "enjoy alfresco dining on the River Terrace and in our garden huts" (https://www.swanwalton.com/); "Dog-Friendly Pub in Walton-on-Thames" (same page); "BOOK A TABLE" (same page)
- Hours page: https://www.swanwalton.com/ (footer, "View all times")
- Closure or change: NONE SEEN for the pub. Our linked domain theswanwalton.co.uk is dead: www and the bare domain both return NXDOMAIN in public DNS (dns.google) and in the r.jina.ai reader, and my browser got ERR_CONNECTION_CLOSED.
- Other sites found: https://www.facebook.com/SwanWalton, https://www.instagram.com/theswanwalton/ and https://x.com/TheSwanWalton (SOCIAL, linked from the site, not opened)
- Checked on: 9 November 2026
- Notes: swanwalton.com redirects to www.swanwalton.com. The email shown is swanwalton@youngs.co.uk.

#### 11 babucci
- Official URL: https://babucci.net/ (OWN SITE; online ordering is "tech by menyu")
- Name as shown: "Babucci, Walton-On-Thames" (https://babucci.net/)
- Address as shown: "16/20 Bridge Street Walton On Thames Surrey, KT12 1AD" (https://babucci.net/)
- Phone as shown: "Tel: 01932 222364" (https://babucci.net/)
- Offers (quoted): "Walk-in welcome" (https://babucci.net/reservations); "Use the reservations form or if you prefer to reserve over the phone contact us during our opening hours on 01932 222364" (same page); "DELIVERY" and "COLLECTION" ordering options (https://babucci.net/order-online)
- Hours page: https://babucci.net/ (contact section)
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The home page text says "It is you, our guest, who create the atmosphere and make the Old Bengal." This is probably leftover template text; I could not tell whether it means a former name. We currently link /order-online. The home page is the better link.

#### 12 buenasado-argentine-steakhouse
- Official URL: https://www.buenasado.com/restaurants/walton-on-thames/ (CHAIN BRANCH PAGE: small group with Bluewater, Bristol, Reading and Walton)
- Name as shown: "Buenasado Argentine Steakhouse - Walton-On-Thames" (restaurant option in the booking box, https://www.buenasado.com/restaurants/walton-on-thames/)
- Address as shown: "6 The Heart Shopping Centre, / New Zealand Avenue, / Walton-on-Thames / KT12 1GH" (https://www.buenasado.com/restaurants/walton-on-thames/)
- Phone as shown: "T: 01932 242720" (https://www.buenasado.com/restaurants/walton-on-thames/)
- Offers (quoted): "BOOK A TABLE" (https://www.buenasado.com/restaurants/walton-on-thames/)
- Hours page: https://www.buenasado.com/restaurants/walton-on-thames/
- Closure or change: NONE SEEN
- Other sites found: https://www.opentable.co.uk/r/buenasado-argentine-steakhouse-walton-on-thames (ORDERING PLATFORM, from search; not opened)
- Checked on: 9 November 2026
- Notes: The site gives the unit as "6 The Heart Shopping Centre", without the word "Unit". The email shown is walton@barestaurant.com.

#### 13 cappadocia-restaurant
- Official URL: https://cappadociawalton.co.uk/ (OWN SITE)
- Name as shown: "Welcome to Cappadocia" (https://cappadociawalton.co.uk/); "Cappadocia Restaurant" (displayed in capitals) (https://cappadociawalton.co.uk/contact-us/)
- Address as shown: "64 High Street, Walton-on-Thames, KT12 1BU" ("Find us" section, https://cappadociawalton.co.uk/); "64 High Street, Walton-On-Thames, KT12 1BU" (https://cappadociawalton.co.uk/contact-us/)
- Phone as shown: "01932 259881" (https://cappadociawalton.co.uk/, "CALL 01932 259881"); "01932259881" (https://cappadociawalton.co.uk/contact-us/)
- Offers (quoted): "Walk-ins are always welcome, but on weekends, Thursday nights and throughout December we recommend booking ahead. Reserve online in seconds, give us a call, or order your favourites for collection." (https://cappadociawalton.co.uk/)
- Hours page: https://cappadociawalton.co.uk/contact-us/
- Closure or change: NONE SEEN
- Other sites found: https://www.facebook.com/cappadociawalton/ and https://www.instagram.com/cappadocia.walton/ (SOCIAL, linked from the site, not opened)
- Checked on: 9 November 2026
- Notes: The booking page is https://cappadociawalton.co.uk/booking-page/.

#### 14 cinnamon-restaurant
- Official URL: https://www.cinnamonindianrestaurent.co.uk/ (OWN SITE, probably; ordering is powered by ordere.com). See Notes: there is a second candidate.
- Name as shown: "Cinnamon Indian Restaurant" (https://www.cinnamonindianrestaurent.co.uk/)
- Address as shown: "90 Molesey Rd, Hersham / Walton-on-Thames, KT12 4RG" (https://www.cinnamonindianrestaurent.co.uk/)
- Phone as shown: "01932 219291" (https://www.cinnamonindianrestaurent.co.uk/)
- Offers (quoted): "Order Now" (https://www.cinnamonindianrestaurent.co.uk/). Everything else on the page is promotional, so I left it out.
- Hours page: https://www.cinnamonindianrestaurent.co.uk/
- Closure or change: Our linked domain cinnamonhersham.co.uk is dead (www and the bare domain are NXDOMAIN in public DNS). The new site shows a "Now Open" banner (displayed as "NOW OPEN", rendered page, https://www.cinnamonindianrestaurent.co.uk/). Together with the new Facebook profile it links (https://www.facebook.com/profile.php?id=61583774078177), this may mean a reopening or new management. I could not confirm that.
- Other sites found: https://cinnamonrestauranthersham.co.uk/contact-us (OWN SITE?, GoDaddy builder). It shows "Cinnamon", "90 Molesey Road, Hersham, Walton-On-Thames, KT12 4RG, United Kingdom", "01932 219 291", hours, and "Copyright © 2025 Cinnamon - All Rights Reserved.". Also https://www.facebook.com/profile.php?id=61583774078177 (SOCIAL, not opened).
- Checked on: 9 November 2026
- Notes: Two live sites claim the same address and phone, and I could not tell which one the business runs now. The "restaurent" spelling in the domain is the site's own. Both show different hours, so a checker should pick one.

#### 15 five-guys
- Official URL: https://restaurants.fiveguys.co.uk/greater-london/unit-8a (CHAIN BRANCH PAGE)
- Name as shown: "Five Guys Burgers and Fries Walton on Thames: Burgers & Fries in Walton on Thames" (page title, https://restaurants.fiveguys.co.uk/greater-london/unit-8a)
- Address as shown: "Unit 8a / Heart Shopping Centre / New Zealand Avenue KT12 1GH Walton on Thames" (https://restaurants.fiveguys.co.uk/greater-london/unit-8a)
- Phone as shown: "01932 320992" (https://restaurants.fiveguys.co.uk/greater-london/unit-8a)
- Offers (quoted): "SERVICES AVAILABLE" list: "Dine in", "Click & Collect", "Takeaway", "Delivery", "Outdoor seating" (https://restaurants.fiveguys.co.uk/greater-london/unit-8a)
- Hours page: https://restaurants.fiveguys.co.uk/greater-london/unit-8a
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The URL path says "greater-london", but the page's location data says Surrey.

#### 16 full-moon-chinese-restaurant
- Official URL: https://www.fullmoonhersham.co.uk/ (OWN SITE)
- Name as shown: "Full Moon Chinese Restaurant" (https://www.fullmoonhersham.co.uk/)
- Address as shown: "84 Molesey Road, Hersham, KT12 4RG" (header, https://www.fullmoonhersham.co.uk/); "Full Moon Chinese Restaurant / 84 Molesey Road / Hersham / Surrey / KT12 4RG" (https://www.fullmoonhersham.co.uk/contact/)
- Phone as shown: "Tel: 01932-225531" (header, https://www.fullmoonhersham.co.uk/); "Tel.: 01932 225531" (https://www.fullmoonhersham.co.uk/contact/)
- Offers (quoted): "To book a table, please call 01932 225531" (https://www.fullmoonhersham.co.uk/); "If you need a delivery outside our opening hours, please call us." (same page)
- Hours page: https://www.fullmoonhersham.co.uk/
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The site also has a "CAR PARKING FACILITIES" page (https://www.fullmoonhersham.co.uk/car-parking-facilities/), which I did not open.

#### 17 iro-sushi
- Official URL: https://www.irosushi.com/restaurant-locations/walton/ (CHAIN BRANCH PAGE)
- Name as shown: "IRO Sushi Walton" (for example the heading "IRO Sushi Walton FAQs", https://www.irosushi.com/restaurant-locations/walton/)
- Address as shown: "58 The Heart Shopping Mall, Walton-on-Thames KT12 1GH" (https://www.irosushi.com/restaurant-locations/walton/)
- Phone as shown: "01932 503294" (https://www.irosushi.com/restaurant-locations/walton/)
- Offers (quoted): "Eat in, takeaway and delivery" (https://www.irosushi.com/restaurant-locations/walton/)
- Hours page: https://www.irosushi.com/restaurant-locations/walton/
- Closure or change: Our linked URL is broken. https://irosushi.com/locations/walton-on-thames/ redirects to www and returns 404 "PAGE NOT FOUND!". The business itself shows no sign of change.
- Other sites found: https://www.irosushi.com/locations/ (CHAIN GENERIC store finder). It lists "Iro Sushi Walton / 58 The Heart Shopping Mall, Walton-on-Thames / London, KT12 1GH".
- Checked on: 9 November 2026
- Notes: The store finder adds "London" to the address; the branch page does not.

#### 18 khao-sarn
- Official URL: https://www.khaosarn.co.uk/ (OWN SITE)
- Name as shown: "Khao Sarn / Thai Cuisine" (https://www.khaosarn.co.uk/)
- Address as shown: "26 Bridge Street, / Walton-On-Thames / KT12 1AH" (https://www.khaosarn.co.uk/). Lower down the same page: "26 Bridge Street, Walton-On-Thames KT12 1AH".
- Phone as shown: "Tel: 01932 245005" (https://www.khaosarn.co.uk/)
- Offers (quoted): "Reservations and party bookings over the phone." (https://www.khaosarn.co.uk/); "We have a full bar and a fine selection of wines." (same page); "We also cater for private parties." (same page)
- Hours page: https://www.khaosarn.co.uk/
- Closure or change: Our linked domain khaosarnrestaurant.co.uk is dead (www and the bare domain are NXDOMAIN in public DNS). The business is live at khaosarn.co.uk.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Replace the link with https://www.khaosarn.co.uk/.

#### 19 la-terraza
- Official URL: https://laterraza.co.uk/ (OWN SITE)
- Name as shown: "La Terraza Tapas Bar and Restaurant" (https://laterraza.co.uk/contact/)
- Address as shown: "La Terraza Tapas Bar and Restaurant / 40 Hersham Road / Walton on Thames / Surrey / KT12 1JE" (https://laterraza.co.uk/contact/)
- Phone as shown: "01932 240 867" (https://laterraza.co.uk/contact/); also "+44 1932 240 867" (same page)
- Offers (quoted): "Booking is easy. To book a table, you can either call us at 01932 240 867 or make a reservation using the booking widget below." (https://laterraza.co.uk/)
- Hours page: https://laterraza.co.uk/contact/
- Closure or change: NONE SEEN
- Other sites found: https://www.sevenrooms.com/explore/laterrazauk/reservations/create/search/ (ORDERING PLATFORM: booking, linked from the site)
- Checked on: 9 November 2026
- Notes: None.

#### 20 manana-mexican-kitchen-cocktail-bar
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Searches found only directories, a job board and the FSA register, which call it "Manana" at 27 Bridge Street. None of these is evidence. One search summary mentioned a Linktree, but none was found; a guessed https://linktr.ee/mananawalton returned 404. Guessed domains (mananawalton.co.uk, mananawalton.com, manana-walton.co.uk, mananamexican.co.uk) do not exist in DNS. See Specific questions on 27 Bridge Street.

#### 21 nandos
- Official URL: https://www.nandos.co.uk/restaurants/walton-thames (CHAIN BRANCH PAGE)
- Name as shown: "Walton-on-Thames" (branch heading, https://www.nandos.co.uk/restaurants/walton-thames)
- Address as shown: "Unit 7, The Heart, New Zealand Ave / Walton-on-Thames, Surrey, / KT12 1GH" (https://www.nandos.co.uk/restaurants/walton-thames)
- Phone as shown: "0193 222 3610" (https://www.nandos.co.uk/restaurants/walton-thames)
- Offers (quoted): "We don’t take bookings for Eat-in online." (https://www.nandos.co.uk/restaurants/walton-thames); "At this restaurant" list: "Baby changing", "Wheelchair access", "Outdoor space", "Wi-fi", "Delivery", "Collection" (same page)
- Hours page: https://www.nandos.co.uk/restaurants/walton-thames
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The phone appears exactly as "0193 222 3610", the same spacing as in the page's structured data. It is the same digits as 01932 223610, but I have quoted it as shown.

#### 22 pizzaexpress
- Official URL: https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue (CHAIN BRANCH PAGE). Our linked https://www.pizzaexpress.com/walton-on-thames redirects here.
- Name as shown: "Walton On Thames The Heart" (displayed in capitals in the heading, https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue)
- Address as shown: "Unit 3, The Heart, / Walton-on-Thames KT12 1GH" (https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue)
- Phone as shown: "01932 243404" (https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue)
- Offers (quoted): Facilities: "Baby Facilities", "Disabled Access", "Disabled Toilet", "Outdoor Dining", "WiFi"; buttons "Book a table" and "Collection & Delivery" (https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue)
- Hours page: https://locations.pizzaexpress.com/walton-on-thames-new-zealand-avenue (includes Christmas and New Year hours)
- Closure or change: NONE SEEN. The page lists "Closed" for certain Christmas and New Year dates. These are holiday hours, not a closure.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Consider linking the redirect target directly.

#### 23 prima-fila
- Official URL: https://primafila.co.uk/ (OWN SITE)
- Name as shown: "Prima Fila" (https://primafila.co.uk/contact-us/)
- Address as shown: "Prima Fila / 14 Bridge Street / Walton-On-Thames / KT12 1AA" (https://primafila.co.uk/contact-us/)
- Phone as shown: "T: 01932 598711" (https://primafila.co.uk/contact-us/); "T: 01932 598 711" (footer, https://primafila.co.uk/)
- Offers (quoted): "Book early to secure your table | Book online or call us: 01932 598711" (https://primafila.co.uk/)
- Hours page: https://primafila.co.uk/contact-us/
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The hours on the site disagree with each other. The Friday and Saturday closing time differs between the body of the contact page and the footer, so treat the hours as unconfirmed.

#### 24 red-rose
- Official URL: https://redrosewalton.co.uk/ (OWN SITE)
- Name as shown: "Red Rose" ("Welcome to / Red Rose", https://redrosewalton.co.uk/)
- Address as shown: "29 Bridge Street, / Walton on Thames, KT12 1AF" (https://redrosewalton.co.uk/contacts.html). The footer has "29 Bridge Street, Walton on Thames, KT12 1AF" (displayed in capitals).
- Phone as shown: "Telephone: 01932 391 428" (https://redrosewalton.co.uk/contacts.html)
- Offers (quoted): "12PM TO 2PM SATURDAY TO THURSDAY, DINE IN ONLY" (lunch menu section, https://redrosewalton.co.uk/); "*OUTDOOR CATERING IS AVAILABLE, PLEASE ASK FOR DETAILS." (same page)
- Hours page: NOT FOUND (only the lunch-menu times appear)
- Closure or change: NONE SEEN
- Other sites found: https://app.redrosewalton.co.uk/menu and https://app.redrosewalton.co.uk/reservation (the site's own ordering and booking app; not opened)
- Checked on: 9 November 2026
- Notes: None.

#### 25 romaan
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: Possible sign, unconfirmed. On the Facebook page, a post dated "Friday 24 July 2026 at 10:38" has a comment from a member of the public asking "When are you reopening?" (https://www.facebook.com/people/Romaan-Kitchen/61555960537940/). The post's image did not load, so I could not see what the business posted.
- Other sites found: https://www.facebook.com/people/Romaan-Kitchen/61555960537940/ (SOCIAL; our linked https://www.facebook.com/profile.php/?id=61555960537940 lands here). It shows the name "Romaan Kitchen", "6 Bridge Street, Walton-on-Thames, United Kingdom", "01932 924366" and the services "Takeaway · Dine in".
- Checked on: 9 November 2026
- Notes: The Facebook name is "Romaan Kitchen", not "Romaan". No own site was found; guessed romaan.co.uk and romaankitchen.co.uk do not exist in DNS.

#### 26 sushi-wakyo
- Official URL: https://www.sushi-wakyo.com/ (OWN SITE)
- Name as shown: "Sushi Wakyo" (https://www.sushi-wakyo.com/, footer)
- Address as shown: "41 Bridge St., Walton-on-Thames KT12 1AF" (https://www.sushi-wakyo.com/)
- Phone as shown: "01932 267888" (https://www.sushi-wakyo.com/)
- Offers (quoted): "Dine In or Take Away" (https://www.sushi-wakyo.com/); "Make a reservation" (online booking form, https://www.sushi-wakyo.com/reservations)
- Hours page: https://www.sushi-wakyo.com/
- Closure or change: NONE SEEN for the restaurant. Our linked OpenTable page https://www.opentable.co.uk/r/sushi-wakyo-walton-on-thames returns 404: "We weren't able to find the page you're looking for."
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Replace the OpenTable link with the own site.

#### 27 uzzal
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: NONE SEEN on any official page. A search-engine summary said directory listings show it as closed, but I could not confirm that from any official source.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Searches found only directories and a 2014 blog post. Guessed uzzal.co.uk, uzzalhersham.co.uk and uzzalrestaurant.co.uk do not exist in DNS. I found no ordering-platform page. Its trading status needs checking on the ground.

#### 28 wagamama
- Official URL: https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames (CHAIN BRANCH PAGE)
- Name as shown: "wagamama walton-on-thames" (https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames)
- Address as shown: "new zealand ave, / the heart, / walton-on-thames, / KT12 1GH" (https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames)
- Phone as shown: "+441932260664" (https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames)
- Offers (quoted): "disabled toilet, 6 movable benches for easy dining inside plus 4 seats outside the restaurant" (https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames); "we take same day bookings for groups big + small." (same page); facilities "outside dining" and "free wifi" (same page)
- Hours page: https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames
- Closure or change: **Possible temporary closure or refit.** The branch page says "walton. we’re almost ready to welcome you back" (https://www.wagamama.com/restaurants/walton-on-thames/walton-on-thames). The same page also showed "open now" and normal hours, so I could not tell whether it is closed now.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Wagamama writes in lower case on purpose. The "welcome you back" line is styled to lower case, and the underlying text is the same. Worth checking on the ground.

#### 29 basilo-pizza
- Official URL: https://www.basilopizza.uk/waltononthames/contact-us.html (OWN SITE, on an ordering platform under its own domain). Home page: https://www.basilopizza.uk/waltononthames/.
- Name as shown: "Basilo Pizza - Walton on Thames" (https://www.basilopizza.uk/waltononthames/contact-us.html)
- Address as shown: "38 Church Street / Walton-On-Thames / Surrey / KT12 2QS" (https://www.basilopizza.uk/waltononthames/contact-us.html)
- Phone as shown: "01932 229998" (https://www.basilopizza.uk/waltononthames/contact-us.html)
- Offers (quoted): "We offer home delivery under the following order conditions:" (https://www.basilopizza.uk/waltononthames/contact-us.html); links "Order for Collection" and "Order for Home Delivery" (https://www.basilopizza.uk/waltononthames/)
- Hours page: https://www.basilopizza.uk/waltononthames/contact-us.html
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Contact details were in the page HTML. The map is a Google Maps embed.

#### 30 china-chef
- Official URL: https://www.chinachefhersham.co.uk/ (OWN SITE, with online ordering)
- Name as shown: "China Chef" (https://www.chinachefhersham.co.uk/)
- Address as shown: "ADDRESS: / 29 Molesey Road / Hersham / Surrey, KT12 4RN" (https://www.chinachefhersham.co.uk/)
- Phone as shown: "01932 243 888" (https://www.chinachefhersham.co.uk/)
- Offers (quoted): "Delivery Hours: 6pm – 10pm" (https://www.chinachefhersham.co.uk/)
- Hours page: https://www.chinachefhersham.co.uk/
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: None.

#### 31 fireaway-pizza
- Official URL: https://www.fireaway.co.uk/Store/Details?storeName=order-pizza-at-fireaway-walton-on-thames (CHAIN BRANCH PAGE, with ordering)
- Name as shown: "Fireaway Walton On Thames" (https://www.fireaway.co.uk/Store/Details?storeName=order-pizza-at-fireaway-walton-on-thames)
- Address as shown: "Bridge Street 39 / Kt12 1Af Walton On Thames" (https://www.fireaway.co.uk/Store/Details?storeName=order-pizza-at-fireaway-walton-on-thames)
- Phone as shown: "01932885337" (https://www.fireaway.co.uk/Store/Details?storeName=order-pizza-at-fireaway-walton-on-thames)
- Offers (quoted): "Opening hours for delivery" and "Opening hours for collection" (same page)
- Hours page: https://www.fireaway.co.uk/Store/Details?storeName=order-pizza-at-fireaway-walton-on-thames
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The address format really is "Bridge Street 39" and "Kt12 1Af" on the page. Do not normalise it. The phone is a visible tel: link.

#### 32 kfc
- Official URL: https://www.kfc.co.uk/kfc-near-me/walton-thames-high-street (CHAIN BRANCH PAGE)
- Name as shown: "Walton On Thames - High Street" (displayed in capitals) (https://www.kfc.co.uk/kfc-near-me/walton-thames-high-street)
- Address as shown: "39 High Street , KT12 1DG" (https://www.kfc.co.uk/kfc-near-me/walton-thames-high-street)
- Phone as shown: NOT FOUND
- Offers (quoted): "ORDER DELIVERY NOW", "ORDER COLLECTION NOW", "DELIVERING BETWEEN 10AM AND 1AM", "FREE WIFI" (https://www.kfc.co.uk/kfc-near-me/walton-thames-high-street)
- Hours page: https://www.kfc.co.uk/kfc-near-me/walton-thames-high-street
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The address has a space before the comma: "Street , KT12". The page has no phone number. It also shows a "DRIVE THRU" hours row, which looks like a template default for a High Street unit. I have not reported a drive-thru.

#### 33 mcdonalds
- Official URL: https://www.mcdonalds.com/gb/en-gb/location/walton-on-thames/walton-on-thames/57-high-street/8260149.html (CHAIN BRANCH PAGE)
- Name as shown: "Walton-On-Thames" (branch heading, rendered page, https://www.mcdonalds.com/gb/en-gb/location/walton-on-thames/walton-on-thames/57-high-street/8260149.html)
- Address as shown: "5/7 HIGH STREET / WALTON ON THAMES, KT12 1DG" (rendered page, same URL)
- Phone as shown: "01932 227310" (rendered page, same URL)
- Offers (quoted): "Order Delivery"; "Services available at this restaurant": "Mobile Ordering", "Wi-Fi" (rendered page, same URL)
- Hours page: https://www.mcdonalds.com/gb/en-gb/location/walton-on-thames/walton-on-thames/57-high-street/8260149.html
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Plain downloads are refused with 403, so a headless browser was used. The capitals are in the page text itself, not styling. The page's "Nearby Stores" list (Feltham and Hanworth) looks odd, but that does not affect this branch's details.

#### 34 olive-kitchen
- Official URL: https://olivepizzakitchen.co.uk/ (OWN SITE, minimal)
- Name as shown: "Olive Pizza Kitchen" (https://olivepizzakitchen.co.uk/)
- Address as shown: NOT FOUND
- Phone as shown: "Call 01932 220084 to place an order or complete the form below to send us your enquiry" (https://olivepizzakitchen.co.uk/)
- Offers (quoted): "We deliver" (https://olivepizzakitchen.co.uk/)
- Hours page: NOT FOUND
- Closure or change: The other domain the business has used, olive.kitchen (a search result was titled "Contact - Olive Pizza Kitchen"), is now parked. https://olive.kitchen/ and https://olive.kitchen/contact/ both redirect to https://olive.kitchen/lander, which says "olive.kitchen is parked free, courtesy of GoDaddy.com.".
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The site calls itself "Olive Pizza Kitchen", not "Olive Kitchen". It shows no street address, its footer says "Copyright © 2022", and its About, Menu, Jobs and Policies links are empty (they point to "http://"). It looks unmaintained, and the address cannot be confirmed from it.

#### 35 papa-johns
- Official URL: https://www.papajohns.co.uk/stores/walton (CHAIN BRANCH PAGE)
- Name as shown: "Papa Johns Walton - Store Information" (displayed in capitals, rendered page, https://www.papajohns.co.uk/stores/walton)
- Address as shown: "133 Hersham Road KT12 1RW" (rendered page, https://www.papajohns.co.uk/stores/walton)
- Phone as shown: "01932 224 333" (rendered page, https://www.papajohns.co.uk/stores/walton)
- Offers (quoted): "Collection" and "Delivery" (rendered page, https://www.papajohns.co.uk/stores/walton)
- Hours page: https://www.papajohns.co.uk/stores/walton
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: Plain downloads get 403, so I used a headless browser. The address line has no town name.

#### 36 perfect-pizza
- Official URL: NOT FOUND
- Name as shown: NOT FOUND
- Address as shown: NOT FOUND
- Phone as shown: NOT FOUND
- Offers (quoted): NOT FOUND
- Hours page: NOT FOUND
- Closure or change: Possible sign. The Perfect Pizza chain site https://www.perfect-pizza.uk/ asks visitors to "Please choose your local branch:" and lists only "Guildford", "Slough", "Stevenage", "Uxbridge" and "Walsall". Walton is not listed, and https://www.perfect-pizza.uk/walton/, /waltononthames/ and /walton-on-thames/ all redirect back to the home page. The domain a directory gave for it, https://www.perfectpizza.co.uk/, says "The website does no longer exist." A search-engine summary also said a directory lists it as closed; that is not evidence.
- Other sites found: https://www.perfect-pizza.uk/ (CHAIN GENERIC)
- Checked on: 9 November 2026
- Notes: I could not confirm from an official source whether the 99 Hersham Road shop is trading. It may have closed or left the chain. Needs checking on the ground.

#### 37 pizza-gogo
- Official URL: https://www.pizzagogo.co.uk/stores/walton-on-thames (CHAIN BRANCH PAGE)
- Name as shown: "Pizza GoGo Walton on Thames" (heading, displayed in capitals, https://www.pizzagogo.co.uk/stores/walton-on-thames)
- Address as shown: "3 Simpson House, New Zealand Avenue / KT12 1QB / United Kingdom" (https://www.pizzagogo.co.uk/stores/walton-on-thames)
- Phone as shown: "Telephone: 01932506641" (https://www.pizzagogo.co.uk/stores/walton-on-thames)
- Offers (quoted): "Order online or by phone for fresh & hot Pizza delivery direct to your door. For Takeaway visit us at:" (https://www.pizzagogo.co.uk/stores/walton-on-thames)
- Hours page: https://www.pizzagogo.co.uk/stores/walton-on-thames
- Closure or change: NONE SEEN
- Other sites found: https://www.ubereats.com/gb/store/pizza-gogo-walton-on-thames/eI1lYKftWYSpcELHWOwS4g (ORDERING PLATFORM, from search; not opened)
- Checked on: 9 November 2026
- Notes: None.

#### 38 pizza-hut-delivery
- Official URL: https://www.pizzahut.co.uk/huts/walton-on-thames-7589 (CHAIN BRANCH PAGE)
- Name as shown: "Pizza Hut Walton On Thames" (heading, displayed in capitals, rendered page, https://www.pizzahut.co.uk/huts/walton-on-thames-7589)
- Address as shown: "New Zealand Avenue / Walton-on-Thames, Surrey / KT12 1QB" (rendered page, https://www.pizzahut.co.uk/huts/walton-on-thames-7589)
- Phone as shown: "+441932240277" (rendered page, https://www.pizzahut.co.uk/huts/walton-on-thames-7589)
- Offers (quoted): "Deliver" and "Collect" (rendered page, same URL)
- Hours page: https://www.pizzahut.co.uk/huts/walton-on-thames-7589
- Closure or change: NONE SEEN
- Other sites found: https://www.pizzahut.co.uk/huts (CHAIN GENERIC store list, rendered: "Pizza Hut Walton On Thames / New Zealand Avenue, Walton-on-Thames, Surrey, KT12 1QB"); Uber Eats and Deliveroo pages from search (ORDERING PLATFORM, not opened)
- Checked on: 9 November 2026
- Notes: The branch page shows no unit number. Don't confuse it with "Pizza Hut Walton" (https://www.pizzahut.co.uk/huts/walton-8123), which is in Liverpool.

#### 39 pizza-joker
- Official URL: https://www.jokertakeaway.co.uk/waltononthames/contact-us.html (OWN SITE, on an ordering platform under its own domain). Home page: https://www.jokertakeaway.co.uk/waltononthames/.
- Name as shown: "Joker Takeaway - Walton-On-Thames" (https://www.jokertakeaway.co.uk/waltononthames/contact-us.html)
- Address as shown: "44D Terrace Road / Walton-On-Thames / Surrey / KT12 2SA" (https://www.jokertakeaway.co.uk/waltononthames/contact-us.html)
- Phone as shown: "01932 22 00 00" (https://www.jokertakeaway.co.uk/waltononthames/contact-us.html)
- Offers (quoted): "We offer home delivery under the following order conditions:" (https://www.jokertakeaway.co.uk/waltononthames/contact-us.html)
- Hours page: https://www.jokertakeaway.co.uk/waltononthames/contact-us.html
- Closure or change: Name difference. The business's own site uses "Joker Takeaway", not "Pizza Joker". I could not tell whether it has been renamed or "Pizza Joker" was only ever a directory name.
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: I matched it by address. The site describes itself as serving "Pizza, Chicken, Burgers and Kebabs".

#### 40 tops-pizza
- Official URL: https://topspizza.co.uk/walton (CHAIN BRANCH PAGE)
- Name as shown: "Walton" ("From: Walton", https://topspizza.co.uk/walton). The page title is "Store - Walton - Pizza Delivery, Takeaway And Deals In Britain | Order Online With Tops Pizza".
- Address as shown: "27 Bridge St, Walton-on-Thames / Elmbridge / KT121AF" (https://topspizza.co.uk/walton)
- Phone as shown: "0193 222 8666" (https://topspizza.co.uk/walton)
- Offers (quoted): "why not pop in for a takeaway pizza?" (https://topspizza.co.uk/walton)
- Hours page: https://topspizza.co.uk/walton
- Closure or change: NONE SEEN
- Other sites found: NONE
- Checked on: 9 November 2026
- Notes: The postcode is shown unspaced as "KT121AF". The phone is spaced as "0193 222 8666". Quote both as shown.

---

### Specific questions

**The Mogul, 66 Terrace Road** (https://www.themogulkt12.co.uk/, OWN SITE, checked 9 November 2026)
- "Find us" section: "66 Terrace Road, Walton-On-Thames, KT122SD, Surrey" (rendered page, https://www.themogulkt12.co.uk/)
- Under "Reservation": "01932 22 33 19, 01932 24 19 23" (rendered page, https://www.themogulkt12.co.uk/)
- Postcode: the page shows **KT12 2SD**, written unspaced as "KT122SD". It does not show KT12 2SA. The site's own ordering link uses the same postcode: https://www.themogulkt12.co.uk/rstm/resto/the-mogul-kt122sd-surrey.
- This section is JS-loaded. The downloaded HTML does not contain the address, but the rendered page does. Both values sit in visible paragraphs under the headings "Find us" and "Reservation", with no capital-letter styling.

**27 Bridge Street: Mañana (#20) and Tops Pizza (#40)**
- Tops Pizza: "27 Bridge St, Walton-on-Thames / Elmbridge / KT121AF" (https://topspizza.co.uk/walton, CHAIN BRANCH PAGE)
- Mañana: NOT FOUND. I found no own website or business-run social page, so I have no official address for it. Only directories, a job board and the FSA register put "Manana" at 27 Bridge Street, and those are not evidence. I could not tell whether the two share the building (for example, a different floor) or whether one listing is out of date.

**The Swan (#10): theswanwalton.co.uk, swanwalton.com, both or neither?**
- **swanwalton.com only.** https://www.swanwalton.com/ (OWN SITE, run by Young's) shows "50 Manor Rd, Walton on Thames, KT12 2PF" and "01932 225964". theswanwalton.co.uk does not exist in public DNS (NXDOMAIN for www and the bare domain, 9 November 2026), so it is dead.

**The Surrey Coffee Company (#7): own website? Same as "Surrey Coffee Company" at High Park Sports Ground?**
- Own website: **none working.** The site listed on its Facebook page, http://www.thesurreycoffeecompany.co.uk/, redirects to https://expireddomains.com/domain/thesurreycoffeecompany.co.uk, which says "Expired .co.uk domain for sale". Only Facebook is live: https://www.facebook.com/thesurreycoffeeco/ (SOCIAL), address "Unit 1 Wellington House, 60 Highstreet, Walton-on-Thames, United Kingdom, KT12 1FL" (https://www.facebook.com/thesurreycoffeeco/about).
- Same business as High Park Sports Ground: **I could not tell.** I found nothing from the business that mentions High Park, Burwood Road or Elm Grove Colts. The High Park record I found is in the FSA hygiene register, a search lead only (https://ratings.food.gov.uk/business/1778854), and it gives a different trading name, "Surrey Coffee Company", without "The". Its Instagram is behind a login wall.

**Romaan (#25), Sushi Wakyo (#26), Pizza Hut Delivery (#38), Babucci (#11): better links?**
- Romaan: **No own site or branch page found.** The Facebook page we link (now https://www.facebook.com/people/Romaan-Kitchen/61555960537940/, name "Romaan Kitchen") is the only official presence I found. Keep it, but see the possible "reopening" sign under #25.
- Sushi Wakyo: **Yes.** Its own site is https://www.sushi-wakyo.com/, with "41 Bridge St., Walton-on-Thames KT12 1AF" and "01932 267888". The OpenTable link we hold returns 404.
- Pizza Hut Delivery: **Yes.** Its branch page is https://www.pizzahut.co.uk/huts/walton-on-thames-7589 (rendered page), with "New Zealand Avenue / Walton-on-Thames, Surrey / KT12 1QB" and "+441932240277".
- Babucci: **Yes.** Its own home page is https://babucci.net/, with "16/20 Bridge Street Walton On Thames Surrey, KT12 1AD" and "Tel: 01932 222364". Our /order-online link is on the same own domain, but it is the ordering page.

---

### Businesses where I was unsure, and why

1. **#1 Archway Cafe:** The only official presence is a Facebook page with no street address and a latest visible post from 2016. I could not tell whether that page is still run by the current café.
2. **#2 Halfway Cafe:** The only official presence is Just Eat. The domain halfwaycafe.co.uk belongs to a different café in Sidcup.
3. **#3 Le Petit Cafe:** The only page is Facebook's auto-generated "Unofficial Page". The business has no presence of its own.
4. **#6 The Boathouse:** coffeeattheboathouse.com is http-only, so I read it through a reader service, and it may not have been updated since 2019. It shows no address; the address comes from the sister site waltonboathire.com, which I treated as the same business.
5. **#7 The Surrey Coffee Company:** Its website has expired, and I could not tell whether the High Park Sports Ground café is the same business.
6. **#8 The Anglers:** It is launching "The Riverview Restaurant". I could not tell whether this changes how the pub should be listed.
7. **#9 The Regent:** It is called "Regent Walton Upon Thames", has no phone on its branch page, and the food-serving status was unclear.
8. **#11 Babucci:** Template text mentions "the Old Bengal". I could not tell whether that is a former name or leftover template text.
9. **#14 Cinnamon:** Two live sites claim the same restaurant (cinnamonindianrestaurent.co.uk and cinnamonrestauranthersham.co.uk), our linked domain is dead, and there is a "Now Open" banner. I could not tell which site is current or whether there has been a change of ownership.
10. **#20 Mañana:** No official source was found, so its address, including the shared 27 Bridge Street address, is unconfirmed.
11. **#21 Nando's and #40 Tops Pizza:** Their phones are shown in unusual spacing ("0193 222 3610", "0193 222 8666"). I quoted them as shown and did not reformat them.
12. **#23 Prima Fila:** The site's own pages disagree on Friday and Saturday closing time.
13. **#25 Romaan:** Facebook only, with the name shown as "Romaan Kitchen". A public comment asks "When are you reopening?". It may be closed or paused, but I could not tell.
14. **#27 Uzzal:** No official source at all, and a search summary hinted that directories show it as closed. I could not tell whether it is trading.
15. **#28 Wagamama:** The branch page says "we’re almost ready to welcome you back" but also shows normal hours. It may be closed for a refit; I could not tell.
16. **#34 Olive Kitchen:** The only own site is a minimal, apparently unmaintained page with no address, and the other domain (olive.kitchen) is parked. The name on the site is "Olive Pizza Kitchen".
17. **#36 Perfect Pizza:** No branch page was found, the chain's branch list leaves out Walton, and the old domain says the website no longer exists. It may have closed; I could not tell.
18. **#39 Pizza Joker:** The own site says "Joker Takeaway". I could not tell whether it was renamed.
19. **#17 IRO Sushi:** The chain store finder adds "London" to the address; the branch page does not.
20. **The Mogul:** The postcode on the page is clear (KT122SD). I have not checked it against Royal Mail, which this brief does not ask for.
