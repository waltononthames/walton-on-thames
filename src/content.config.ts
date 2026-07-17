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
    images: z.array(z.string()).default([]),
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
  sources: z.array(z.object({ label: z.string(), url: z.string().url() })),
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

export const collections = { businesses, events, places, news, history, hersham, fixtures };
