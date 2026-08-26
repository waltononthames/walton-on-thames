import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { fixturesLoader } from './loaders/fixtures-loader';

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
  sources: z.array(z.object({
    author: z.string(),
    year: z.string(),
    title: z.string(),
    publisher: z.string().optional(),
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

export const collections = {
  businesses, events, places, news, history, hersham, fixtures,
  attractions, 'annual-events': annualEvents,
};
