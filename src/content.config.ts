import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { fixturesLoader } from './loaders/fixtures-loader';
import { planningLoader } from './loaders/planning-loader';

const businesses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/businesses' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    subcategories: z.array(z.string()).default([]),
    neighbourhood: z.string(),
    address: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    hours: z.record(z.string()).optional(),
    description: z.string(),
    // Listing photographs. The first entry is used as the page hero and as
    // the Open Graph image; the rest render as a gallery. Objects rather than
    // bare paths so that every image carries its own alt text.
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    // Shown once beneath the gallery, e.g. "Photographs supplied by X".
    image_credit: z.string().optional(),
    featured: z.boolean().default(false),
    verified_date: z.string().optional(),
    source: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    start: z.string(),
    end: z.string().optional(),
    venue: z.string(),
    neighbourhood: z.enum(['walton-on-thames', 'hersham', 'whiteley-village']),
    category: z.enum(['festival', 'market', 'sport', 'arts', 'community', 'family', 'music', 'food-drink', 'other']),
    recurring: z.boolean().default(false),
    price: z.string().default('Free'),
    image: z.string().optional(),
    description: z.string().optional(),
    source_url: z.string().url().optional(),
  }),
});

const places = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/places' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['riverside-walk', 'park', 'heritage', 'landmark', 'leisure', 'nature']),
    neighbourhood: z.enum(['walton-on-thames', 'hersham', 'whiteley-village']),
    lat: z.number().optional(),
    lng: z.number().optional(),
    description: z.string(),
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    author: z.string().default('Walton-on-Thames.org'),
    category: z.enum(['community', 'events', 'local-news', 'history', 'food-drink', 'travel', 'lifestyle']).default('community'),
    description: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    // Optional so the existing entries stay valid. Set it to scope an article
    // to one place, which is what lets /hersham/ show its own news rather than
    // the site-wide feed. Free string, matching the businesses collection,
    // because the site covers Weybridge and Shepperton too.
    neighbourhood: z.string().optional(),
  }),
});

const historySchema = z.object({
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  slug: z.string(),
  cluster: z.enum(['walton-history', 'hersham']),
  era: z.array(z.string()).optional(),
  entityType: z.enum(['place', 'person', 'event', 'institution', 'overview']),
  contributor: z.string().optional(),
  heroImage: z.string().optional(),
  heroAlt: z.string().optional(),
  publishDate: z.date(),
  reviewedDate: z.date(),
  // Harvard/APA-shaped. Web sources render as "Author (Year) 'Title'.
  // Available at: URL (Accessed: date).", year is "n.d." where no publication
  // date is known/verifiable (never guess one). See docs/build-log.md.
  // Print-only sources (no online record, e.g. an out-of-print local-history
  // booklet) omit url/accessed and render as "Author (Year) Title. Publisher."
  // instead: do not invent a URL to satisfy validation.
  //
  // The optional fields below carry fuller bibliographic detail for journal
  // articles, chapters in edited works and dated web items. They are additive:
  // an entry using only the six original fields renders exactly as it always
  // has. See HistoryArticle.astro for the assembly order.
  //   container  parent work of a chapter/entry, e.g. "Dictionary of National Biography"
  //   journal    periodical title; renders the volume(issue), pp. form
  //   editor     editor of the container, rendered "in Lee, S. (ed.)"
  //   volume     volume number, "vol. 45" inside a container, bare inside a journal
  //   issue      issue number, rendered as "(2)" against the volume
  //   pages      page range, rendered "pp. 141-164"
  //   place      place of publication, rendered "London: John Lane"
  //   date       day/month of a dated item, e.g. "30 August" (the year is separate)
  //   work       true for a standalone work (a book, an archival document) so the
  //              title is italicised rather than quoted. Without a url, an entry
  //              is treated as standalone anyway, which is why print-only sources
  //              never needed this flag.
  sources: z.array(z.object({
    author: z.string(),
    year: z.string(),
    title: z.string(),
    container: z.string().optional(),
    journal: z.string().optional(),
    editor: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    publisher: z.string().optional(),
    place: z.string().optional(),
    date: z.string().optional(),
    work: z.boolean().optional(),
    url: z.string().url().optional(),
    accessed: z.string().optional(),
  })),
  related: z.array(z.string()),
});

const history = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/history' }),
  schema: historySchema,
});

const hersham = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hersham' }),
  schema: historySchema,
});

// Things to Do hub. One YAML/JSON file per attraction; area is the actual
// place (may be outside Walton/Hersham: see locationBand), which the card
// component uses to prevent e.g. Hampton Court reading as "in Walton".
const attractions = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/attractions' }),
  // Uses the content-layer `image()` helper (unlike the site's other
  // collections, which reference plain /images/ paths) so photography under
  // src/assets/things-to-do/ gets AVIF/WebP + responsive srcset via Astro's
  // <Image> component, per the brief's performance budget (section 6.5/7).
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    area: z.enum([
      'Walton-on-Thames', 'Hersham', 'Sunbury', 'Shepperton', 'Weybridge',
      'East Molesey', 'West Molesey', 'Esher', 'Cobham', 'Hampton',
      'Kempton Park', 'Addlestone', 'Chertsey', 'Ashford', 'Fetcham',
      'Twickenham', 'Hounslow', 'Egham', 'Woking', 'Chessington',
    ]),
    locationBand: z.enum(['local', 'neighbouring', 'bigger-day-out']),
    summary: z.string().min(140).max(420),
    reasonToVisit: z.string().max(120),
    planningDetail: z.string().max(160),
    categories: z.array(z.enum([
      'free', 'families', 'rainy-days', 'on-the-water',
      'heritage-and-culture', 'parks-and-walks', 'sport-and-active', 'seasonal',
    ])).min(1),
    bestFor: z.array(z.string()).max(6),
    setting: z.enum(['indoor', 'outdoor', 'mixed']),
    costBand: z.enum(['free', 'free-entry-paid-activities', 'paid', 'variable']),
    seasonality: z.enum(['year-round', 'seasonal', 'selected-dates']),
    checkBeforeTravelling: z.boolean().default(false),
    bookingNote: z.string().optional(),
    // Optional, not required as the brief specifies: a handful of records
    // (open spaces, wharves, an informal car boot sale) genuinely have no
    // operator website, internalUrl is used instead for those.
    officialUrl: z.string().url().optional(),
    internalUrl: z.string().optional(),
    address: z.string().optional(),
    geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
    image: z.object({
      src: image(),
      alt: z.string().min(20),
      caption: z.string().optional(),
      credit: z.string().default('Walton-on-Thames.org'),
    }).optional(),
    schemaType: z.enum([
      'TouristAttraction', 'Museum', 'Park', 'PerformingArtsTheater',
      'MovieTheater', 'SportsActivityLocation', 'LandmarksOrHistoricalBuildings',
      'Church', 'LocalBusiness',
    ]).default('TouristAttraction'),
    lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    featured: z.boolean().default(false),
    sortWeight: z.number().int().min(0).max(100).default(50),
  }),
});

// Annual recurring events shown on the Things to Do hub's events section and
// /things-to-do/annual-events/. Distinct from the one-off `events` collection
// above: see the date-label logic in the date status enum below, which
// drives which build-time label a record renders instead of a hand-set string.
const annualEvents = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/annual-events' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    summary: z.string().min(120).max(420),
    usualTiming: z.string(),
    nextStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    nextEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dateStatus: z.enum([
      'confirmed', 'provisional', 'to_be_announced', 'cancelled', 'completed',
    ]),
    dateSourceUrl: z.string().url(),
    eventLocation: z.string(),
    eventUrl: z.string().url(),
    area: z.string(),
    image: z.object({
      src: image(),
      alt: z.string().min(20),
      caption: z.string().optional(),
      credit: z.string().default('Walton-on-Thames.org'),
    }).optional(),
    lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

// Walton & Hersham FC first-team fixtures, fetched live from the club's official
// ECAL calendar feed at every build. Home and away fixtures both included.
const fixtures = defineCollection({
  loader: fixturesLoader({
    url: 'https://ics.ecal.com/ecal-sub/6a590c1f9d270a000297ec85/Enterprise%20National%20League.ics',
    teamName: 'Walton & Hersham',
  }),
  schema: z.object({
    homeTeam: z.string(),
    awayTeam: z.string(),
    homeAway: z.enum(['home', 'away']),
    competition: z.string(),
    matchWeek: z.number().optional(),
    start: z.string(),
    end: z.string().optional(),
    venue: z.string(),
    slug: z.string(),
  }),
});

// Major planning applications near Hersham, from the PlanIt open API.
// Specified in docs/walton-history-hersham-extension.md section 4.11.
// The Walton equivalent (section 4.12) gets its own collection with the same
// loader, The Heart as its centre, and Hersham in its otherCentres.
const hershamPlanning = defineCollection({
  loader: planningLoader({
    centre: { name: 'Hersham', lat: 51.3662, lng: -0.4002 },
    radiusKm: 2,
    otherCentres: [{ name: 'Walton-on-Thames', lat: 51.3853, lng: -0.4202 }],
    overrides: {
      // 1.45km from Hersham Green against 1.51km from The Heart. Too close to
      // leave to arithmetic; Mayfield Road is the Hersham side of the railway.
      'waterloo court': 'include',
    },
    // Order matters: the first match wins, so the more specific name goes first.
    sites: [
      { name: 'Hersham Place Technology Park', slug: 'hersham-place-technology-park', match: ['hersham place technology park'] },
      { name: 'Land east of Molesey Road', slug: 'land-east-of-molesey-road', match: ['land east of molesey road'] },
      { name: 'Land south of Burwood Road', slug: 'land-south-of-burwood-road', match: ['131 to 147 burwood road'] },
      { name: 'Waterloo Court car park, Mayfield Road', slug: 'waterloo-court-car-park', match: ['waterloo court'] },
      { name: 'Hersham Green Shopping Centre', slug: 'hersham-green-shopping-centre', match: ['hersham green shopping centre'] },
      { name: 'Hersham Village Golf Club', slug: 'hersham-village-golf-club', match: ['hersham village golf club'] },
      { name: 'Burhill Kennels', slug: 'burhill-kennels', match: ['burhill kennels'] },
      { name: 'Burhill Golf Club', slug: 'burhill-golf-club', match: ['burhill golf club'] },
      { name: 'Esher Rugby Club', slug: 'esher-rugby-club', match: ['esher rugby'] },
      { name: 'North Weylands Industrial Estate', slug: 'north-weylands-industrial-estate', match: ['north weylands'] },
      { name: 'Weylands Treatment Works', slug: 'weylands-treatment-works', match: ['weylands'] },
      { name: 'Clarence House, Queens Road', slug: 'clarence-house-queens-road', match: ['clarence house'] },
      { name: '3 Lyon Road', slug: '3-lyon-road', match: ['3 lyon road'] },
      // Station Avenue is the Walton side of the railway. The distance rule puts
      // it here; revisit when the Walton page (section 4.12) exists, as it is a
      // candidate for reassignment or an explicit override.
      { name: 'Walton Court, Station Avenue', slug: 'walton-court-station-avenue', match: ['walton court'] },
    ],
    yearsBack: 5,
  }),
  schema: z.object({
    reference: z.string(),
    address: z.string(),
    postcode: z.string().optional(),
    description: z.string(),
    state: z.string(),
    type: z.string(),
    startDate: z.string(),
    decidedDate: z.string().optional(),
    councilUrl: z.string().optional(),
    planitUrl: z.string().optional(),
    place: z.string(),
    siteName: z.string().optional(),
    siteSlug: z.string(),
  }),
});

// Major planning applications near Walton town centre, extension section 4.12.
// Same loader as Hersham, different centre, and two filters Hersham does not
// need. Measured 2 September 2026: of 29 records the distance rule assigned to
// Walton, only 9 were actually in Walton. Twelve were cross-boundary
// consultation records that Elmbridge logs for Woking, Guildford and Surrey
// County Council, geocoded to Elmbridge rather than to the site, and the rest
// were Weybridge, Shepperton and Kingston.
const waltonPlanning = defineCollection({
  loader: planningLoader({
    centre: { name: 'Walton-on-Thames', lat: 51.3853, lng: -0.4202 },
    radiusKm: 2,
    otherCentres: [{ name: 'Hersham', lat: 51.3662, lng: -0.4002 }],
    overrides: {
      // Claimed by the Hersham page; see the note on its collection above.
      'waterloo court': 'exclude',
    },
    // No radius separates Weybridge here: the Oatlands Drive sites sit 0.50 to
    // 1.07km from The Heart, nearer than Laurelwood Place (0.78km) and
    // Brownacres (1.36km), which are genuinely Walton. Between post towns the
    // address is the correct signal, which is the reverse of the Hersham split.
    addressMustInclude: ['walton-on-thames', 'walton on thames'],
    sites: [
      { name: 'Former Homebase, New Zealand Avenue', slug: 'former-homebase-new-zealand-avenue', match: ['site of homebase'] },
      { name: 'Auckland House, New Zealand Avenue', slug: 'auckland-house-new-zealand-avenue', match: ['auckland house'] },
      { name: 'Brownacres Sports Ground', slug: 'brownacres-sports-ground', match: ['brownacres'] },
      { name: 'Laurelwood Place, Felix Road', slug: 'laurelwood-place-felix-road', match: ['laurelwood place'] },
      { name: '25 to 29 The Grove', slug: '25-to-29-the-grove', match: ['25 to 29 the grove'] },
      { name: '12 to 16 High Street', slug: '12-to-16-high-street', match: ['12-16 high street'] },
      { name: '9 to 21a High Street', slug: '9-to-21a-high-street', match: ['9-21a high street'] },
      { name: '71 High Street', slug: '71-high-street', match: ['71 high street'] },
    ],
    yearsBack: 5,
  }),
  schema: z.object({
    reference: z.string(),
    address: z.string(),
    postcode: z.string().optional(),
    description: z.string(),
    state: z.string(),
    type: z.string(),
    startDate: z.string(),
    decidedDate: z.string().optional(),
    councilUrl: z.string().optional(),
    planitUrl: z.string().optional(),
    place: z.string(),
    siteName: z.string().optional(),
    siteSlug: z.string(),
  }),
});

export const collections = {
  businesses, events, places, news, history, hersham, fixtures,
  attractions, 'annual-events': annualEvents,
  'hersham-planning': hershamPlanning,
  'walton-planning': waltonPlanning,
};
