// Collections behind /walton-hersham-fc-away-fans-guide/. See
// docs/away-fans-guide-plan.md, sections 3 and 7.
//
// Every practical fact is a `fact`: one of three shapes, and nothing else.
//
//   { value, source }             checked against a source on a stated date
//   { value, placeholder: true }  prototype data, shown on preview builds with
//                                 a visible marker; scripts/check-away-guide.mjs
//                                 fails a production build while any remain
//   { unconfirmed: { ask, question } }
//                                 a question for the club, a venue, an operator
//                                 or a site visit; renders nothing in production
//
// The third shape replaces the brief's to-do strings for unchecked facts,
// which the verification-marker check would (rightly) refuse to build.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const clock = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

// checkedSource is passed in from content.config.ts so the guide uses the
// same source shape, and the same basis list, as the rest of the site.
export function awayGuideCollections(checkedSource: z.ZodTypeAny) {
  const unconfirmed = z.object({
    unconfirmed: z.object({
      ask: z.enum(['club', 'venue', 'operator', 'site-visit']),
      question: z.string(),
    }),
  });
  const fact = <T extends z.ZodTypeAny>(value: T) => z.union([
    z.object({ value, source: checkedSource }),
    z.object({ value, placeholder: z.literal(true) }),
    unconfirmed,
  ]);
  const text = fact(z.string());

  // One record: the ground and the answers the quick answers card needs.
  const ground = defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/away-guide/ground' }),
    schema: z.object({
      name: z.string(),
      address: text,
      postcode: text,
      officialSite: fact(z.string().url()),
      kickOffSaturday: text,
      kickOffMidweek: text,
      turnstilesOpen: text,
      tickets: text,
      parking: text,
      segregation: text,
      awayEnd: text,
    }),
  });

  const routes = defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/away-guide/routes' }),
    schema: z.object({
      variant: z.enum(['road', 'towpath']),
      title: z.string(),
      order: z.number().int(),
      // Route-level: the step points and wording have not been walked yet.
      placeholder: z.boolean().default(false),
      bestFor: text,
      surface: text,
      lighting: text,
      stepFree: text,
      afterDark: text,
      steps: z.array(z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        title: z.string(),
        text: z.string(),
        lat: z.number(),
        lng: z.number(),
        // Photo slot name, af-<chapter>-<subject>-<orientation>, from the shot list.
        photo: z.string().optional(),
        history: z.object({ href: z.string(), label: z.string() }).optional(),
      })).min(2),
    }),
  });

  // Last departures from Walton-on-Thames, one record per day type and
  // direction. The finder hides itself once timetableValidTo has passed.
  const departures = z.object({
    times: z.array(clock).min(1),
    timetableValidFrom: isoDate,
    timetableValidTo: isoDate,
  });
  const trains = defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/away-guide/trains' }),
    schema: z.object({
      direction: z.enum(['London Waterloo', 'Woking']),
      dayType: z.enum(['saturday', 'weekday']),
      departures: z.union([
        departures.extend({ source: checkedSource }),
        departures.extend({ placeholder: z.literal(true) }),
      ]),
    }),
  });

  const buses = defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/away-guide/buses' }),
    schema: z.object({
      route: text,
      operator: text,
      boardAt: text,
      alightAt: text,
      journeyMins: fact(z.number().int()),
      walkFromStopMins: fact(z.number().int()),
      frequency: text,
      // Last buses from the ground towards the station, for the finder.
      lastFromGround: z.object({
        saturday: fact(z.array(clock)),
        weekday: fact(z.array(clock)),
      }),
      timetableValidTo: isoDate.optional(),
      operatorUrl: fact(z.string().url()),
    }),
  });

  const taxis = defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/away-guide/taxis' }),
    schema: z.object({
      rankAtStation: text,
      pickupAtGround: text,
      rideHailing: z.array(z.object({ name: z.string(), note: text })).default([]),
      firms: z.array(z.object({
        name: z.string(),
        phone: z.string(),
        url: z.string().url().optional(),
        source: checkedSource,
      })).default([]),
    }),
  });

  return {
    'away-ground': ground,
    'away-routes': routes,
    'away-trains': trains,
    'away-buses': buses,
    'away-taxis': taxis,
  };
}
