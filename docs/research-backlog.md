# Clubs and societies: research backlog

Organisations found during the clubs hub build that are **not** published, and
published records that are thinner than they should be. Nothing here reaches
the site until a primary source confirms it, per the Content Verification
Protocol in CLAUDE.md.

Compiled 6 September 2026.

## Removed from the site as unverifiable

These were published on the old `/living/community/` page and did not survive
verification. They have been deleted rather than softened.

| Organisation | What we found |
| --- | --- |
| Hersham Sailing Club | No primary source exists under this or any near name. The page described "dinghy sailing on Bessborough Reservoir, Hersham": Bessborough is private land with no public access, forms part of a 63-hectare SSSI, and lies between Molesey and Walton rather than in Hersham. Treat as an invention until evidence appears. |
| Walton & Weybridge Music Club | No website, no Charity Commission entry, no listing anywhere. The organisation that does exist under a similar name is the Walton & Weybridge Amateur Operatic Society, charity 1169732, which is now published in its own right. |

## Corrections made to existing claims

| Claim on the old page | Corrected to |
| --- | --- |
| "Walton Cricket Club, Ashley Road" | Walton-on-Thames Cricket Club, The Pavilion, 197 Ashley Park Avenue KT12 1ET |
| "Walton & Weybridge Rotary Club" | The club is the Rotary Club of Walton-on-Thames. It is **not** published: see below. |
| Cecil Hepworth Playhouse listed as a club | It is a venue, not an organisation. It keeps its own page at `/things-to-do/cecil-hepworth-playhouse/`, and the two societies based there are now published instead. |

## Found, not published: needs a primary source

| Organisation | What is missing |
| --- | --- |
| Rotary Club of Walton-on-Thames | `waltonrotary.org.uk` no longer resolves in DNS. Search results still reference its pages and give a meeting place at Burhill Golf Club and a secretary's number, but with the site gone there is no live primary source and no way to confirm the club is still meeting. Check Rotary GB and Ireland's club finder before publishing. |
| Hersham family, social and military history group | A directory entry describes a group meeting on the fourth Tuesday of the month at the Hersham Centre for the Community, with speakers. No primary source found. |
| Kings Church Toddlers | Appears in Surrey County Council's family directory as a free under-5s playgroup at The Furrows. Needs the church's own confirmation that it is still running. |
| Walsingham Care | A Walton-based charity. Scope decision needed first: it looks like a care provider rather than a club or community group, in which case it belongs in the directory, not here. |
| Walton Community Allotment and Space to Grow | Run by Walton Charity and currently folded into that record. Both could justify records of their own if current session times can be sourced. |
| Walton & Hersham Foodbank | Same: currently inside the Walton Charity record, and strong enough to stand alone with a primary source for its four weekly sessions. |
| Preschool and early years groups | Happity and Red Kite Days list many across Walton, all secondary. Each needs its host church, hall or provider to confirm. |
| Dementia and carers' support groups | Elmbridge Borough Council runs dementia social clubs at the Walton centre. Needs the council's own service page rather than a news item. |

## Resolved 6 September 2026

**The scout groups are done.** Walton & Weybridge District publishes its full
list: seven groups, of which four are in our area. All four are now published.
1st Walton (Viking) Sea Scouts and 9th Walton (Viscount) Air Scout Group are
new, both with their own pages; 1st Hersham and 4th Walton gained the section
meeting nights from the district's own timings table, which neither group
publishes itself. The remaining three groups, 1st Weybridge, 4th Weybridge and
Oatlands, are Weybridge-based and out of scope for this directory.

Two source problems worth remembering. The district's link for the 9th
(`9thwaltonscouts.org.uk`) is dead; the live site is `9thwaltonscoutgroup.org`.
And Surrey Scouts' county page for the 9th gives its address as Bentley Copse,
Shere, which is the county campsite rather than the group's headquarters, and
its website as the county's own. County group pages here carry template
defaults, so do not take an address or a URL from one without corroboration.

**Elmbridge Youth Theatre is a "no", not a "not yet".** It is real and
registered, charity 1071866, and its stated activity is one major production a
year at the Playhouse plus one or two smaller ones at the Barn. But nothing
shows it is still running: Charity Commission reporting is overdue by 1,529
days, the last financial data on the register is for the year ending 31 August
2020, its Facebook page's most recent visible post is 4 February 2023, and the
domain that page gives, `elmbridgeyouththeatre.co.uk`, did not resolve from two
separate tools. It is on file as `src/content/organisations/elmbridge-youth-theatre.md`
with `status: uncertain`, so it does not render, and the record carries this
evidence in a comment. Publish it only when a current source appears. Darren
may know first-hand whether it is still going, which would settle it either way.

## Published, but thinner than it should be

| Organisation | What is missing |
| --- | --- |
| Walton Rowing Club | `waltonrowingclub.co.uk` failed a TLS handshake on every attempt this session, from two different tools, and British Rowing's club page redirects to its finder. The record is therefore published on our own verification of 22 August 2026 and carries that date rather than today's. Re-verify and expand to a full page when the site is reachable. |
| Girlguiding Hersham District | The district site confirms the district and its sections but gave up no unit list, meeting venue, nights or joining route. Card only until that exists. |
| Whiteley Village clubs and societies | The Trust's own wording is "a host of clubs to join". The often-quoted figure of more than twenty resident-run clubs is secondary, so it is not used. A resident-run club list from the Trust would turn this into a proper page. |
| Walton-on-Thames Bowling Club | The club's own site publishes no address for the green. Everything else is verified, so the record has no "Getting there" section. |
| Hersham Bowling Club | Charity number 220949 comes from Surrey County Council's directory. Cross-check against the Charity Commission register. |
| Esher Rugby | The ground postcode KT12 3PF comes from our own attraction record, verified 22 August 2026; the club's own directions page returns 404. |

## Site fix made in passing

`src/content/attractions/watch-esher-rugby-in-hersham.json` carried
`"internalUrl": "/things-to-do/walton-and-hersham-fc/"`, which sent readers
looking for the rugby club to the football club's page. The record has no
internal guide of its own, so the field has been removed rather than
repointed: `AttractionCard` then falls back to `officialUrl` and renders the
club's own site as an explicit external link. Fixed 6 September 2026.
