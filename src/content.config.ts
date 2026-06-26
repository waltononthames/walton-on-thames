import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

const neighbourhoods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/neighbourhoods' }),
  schema: z.object({
    name: z.string(),
    slug: z.enum(['walton-on-thames', 'hersham', 'whiteley-village']),
    tagline: z.string(),
    description: z.string(),
    image: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

export const collections = { businesses, events, places, news, neighbourhoods };
