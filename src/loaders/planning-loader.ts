import type { Loader } from 'astro/loaders';

// Major planning applications near a named place, from the PlanIt open API
// (planit.org.uk). Specified in docs/walton-history-hersham-extension.md
// section 4.11; read that before changing anything here.
//
// Two design choices are load-bearing and must not be "simplified" away:
//
// 1. The query is SPATIAL (lat/lng/krad), never keyed on authority. PlanIt
//    accepts auth=Elmbridge, and it works today, but Elmbridge is abolished on
//    1 April 2027 and replaced by East Surrey Council. An authority-keyed query
//    would then return nothing, silently, and the page would quietly empty
//    itself. A spatial query survives the change untouched.
//
// 2. Only app_size=Large is fetched. Measured 31 August 2026, within 2km of
//    Hersham Green that is 18 schemes across four and a half years and catches
//    every one of public interest. Medium and Small are householder extensions
//    and tree works at named private addresses: public record, no search value,
//    and not something this site should be auto-publishing.

const API = 'https://www.planit.org.uk/api/applics/json';

// PlanIt rejects unidentified clients: no User-Agent returns 403 and a generic
// one such as "node" returns 503, which is what Node's default fetch sends.
// Verified 1 September 2026. Do not remove this header; the build will still
// succeed without it, but the page will quietly stop updating. Matches the
// convention already used in scripts/verify-coordinates-by-postcode.mjs.
const USER_AGENT = 'walton-on-thames.org planning listings (contact via site contact form)';

export interface PlanningCentre {
  name: string;
  lat: number;
  lng: number;
}

export interface PlanningSite {
  /** Display name for the grouped scheme, e.g. "Hersham Place Technology Park". */
  name: string;
  slug: string;
  /** Lowercase address substrings; any match assigns the application to this site. */
  match: string[];
}

export interface PlanningLoaderOptions {
  /** The place this page covers, and the centre of the search. */
  centre: PlanningCentre;
  /** Search radius in km. PlanIt caps krad at 100. */
  radiusKm: number;
  /**
   * Other places with their own planning page. Catchments overlap, so an
   * application nearer one of these is assigned there instead and dropped here.
   */
  otherCentres?: PlanningCentre[];
  /**
   * Editorial overrides for borderline sites, keyed by a lowercase address
   * substring. Waterloo Court sits 1.45km from Hersham Green and 1.51km from
   * The Heart: a 60m margin should be a recorded decision, not an accident of
   * arithmetic that flips when a coordinate is corrected upstream.
   */
  overrides?: Record<string, 'include' | 'exclude'>;
  /**
   * Drop records whose description begins "Consultation from ... Council".
   * Elmbridge logs applications on which it is a neighbouring consultee, and
   * PlanIt geocodes them to the logging authority, not the site. Measured
   * 2 September 2026: 12 of 29 records assigned to Walton were schemes
   * physically in West Byfleet, Woking and Ockham. Defaults to true.
   */
  excludeConsultations?: boolean;
  /**
   * Optional postal-town whitelist, matched case-insensitively against the
   * address. This is the OPPOSITE of the assignment rule and deliberately so.
   * Between our own two pages, addresses mislead (everything in Hersham reads
   * "Walton-on-Thames"), so assignment uses coordinates. Between post towns,
   * coordinates mislead: the Oatlands Drive sites carry Weybridge addresses
   * but sit 0.5km from The Heart, nearer than several genuine Walton sites, so
   * no radius separates them. There the postal town is the correct signal.
   */
  addressMustInclude?: string[];
  /** Named schemes. Applications are grouped under these; see section 4.11. */
  sites?: PlanningSite[];
  /** How many years back to fetch. Covers "recently decided" as well as live. */
  yearsBack?: number;
}

interface PlanItRecord {
  name?: string;
  reference?: string;
  address?: string;
  description?: string;
  app_state?: string;
  app_type?: string;
  app_size?: string;
  start_date?: string;
  decided_date?: string | null;
  url?: string;
  link?: string;
  postcode?: string;
  location?: { type?: string; coordinates?: [number, number] };
}

/** Equirectangular approximation. Fine at these distances and avoids a dependency. */
function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dy = (aLat - bLat) * 111.32;
  const dx = (aLng - bLng) * 111.32 * Math.cos((aLat * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

export function planningLoader(options: PlanningLoaderOptions): Loader {
  const {
    centre,
    radiusKm,
    otherCentres = [],
    overrides = {},
    excludeConsultations = true,
    addressMustInclude,
    sites = [],
    yearsBack = 5,
  } = options;

  return {
    name: 'planning-loader',
    load: async ({ store, logger }) => {
      // Read what we already hold before touching the store, so a regression in
      // the feed can be detected rather than silently overwriting good data.
      const previous = store.entries();
      const previousLatest = previous.reduce((max: string, [, entry]: [string, any]) => {
        const d = entry?.data?.startDate ?? '';
        return d > max ? d : max;
      }, '');

      const end = new Date();
      const start = new Date(end);
      start.setFullYear(start.getFullYear() - yearsBack);
      const iso = (d: Date) => d.toISOString().slice(0, 10);

      const url =
        `${API}?lat=${centre.lat}&lng=${centre.lng}&krad=${radiusKm}` +
        `&app_size=Large&start_date=${iso(start)}&end_date=${iso(end)}` +
        `&pg_sz=100&sort=-start_date`;

      // PlanIt returned a transient 503 during development while the URL was
      // fine on retry, so a couple of attempts are worth it: without one, a
      // momentary blip costs a whole day of freshness until the next rebuild.
      let payload: { records?: PlanItRecord[]; total?: number; error?: string } | null = null;
      let lastProblem = '';

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
          if (res.ok) {
            payload = await res.json();
            break;
          }
          lastProblem = `HTTP ${res.status}`;
        } catch (err) {
          lastProblem = (err as Error).message;
        }
        if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000));
      }

      if (!payload) {
        logger.error(
          `planning-loader: PlanIt unreachable for ${centre.name} after 3 attempts (${lastProblem}), keeping existing entries`,
        );
        return;
      }

      if (payload.error) {
        logger.error(`planning-loader: PlanIt error for ${centre.name}: ${payload.error}, keeping existing entries`);
        return;
      }

      const records = payload.records ?? [];

      // An empty result where we previously held schemes is far more likely to
      // be a broken query or a changed API than every application vanishing.
      if (records.length === 0 && previous.length > 0) {
        logger.error(
          `planning-loader: PlanIt returned 0 records for ${centre.name} but ${previous.length} are held. ` +
            `Treating as a feed fault and keeping existing entries. Check the query and app_size filter.`,
        );
        return;
      }

      if (payload.total !== undefined && payload.total > records.length) {
        logger.warn(
          `planning-loader: ${centre.name} has ${payload.total} matching applications but only ${records.length} ` +
            `were returned. Paging is not implemented because the Large filter has never exceeded one page; add it.`,
        );
      }

      store.clear();

      let kept = 0;
      let assignedElsewhere = 0;
      let droppedConsultation = 0;
      let droppedOutsideTown = 0;
      const ungrouped: string[] = [];
      let latest = '';

      for (const r of records) {
        const ref = r.name ?? r.reference;
        const address = r.address ?? '';
        if (!ref || !address) continue;

        const addressLower = address.toLowerCase();

        if (excludeConsultations && /^\s*consultation from/i.test(r.description ?? '')) {
          droppedConsultation++;
          continue;
        }

        if (addressMustInclude && !addressMustInclude.some((t) => addressLower.includes(t.toLowerCase()))) {
          droppedOutsideTown++;
          continue;
        }

        // Editorial overrides win over the distance calculation.
        const override = Object.entries(overrides).find(([needle]) => addressLower.includes(needle));
        const forced = override?.[1];

        if (forced === 'exclude') {
          assignedElsewhere++;
          continue;
        }

        if (forced !== 'include' && otherCentres.length > 0) {
          const coords = r.location?.coordinates;
          if (coords && coords.length === 2) {
            const [lng, lat] = coords;
            const here = distanceKm(lat, lng, centre.lat, centre.lng);
            const nearerOther = otherCentres.some(
              (o) => distanceKm(lat, lng, o.lat, o.lng) < here,
            );
            // Deliberately NOT matched on the address string. Weylands, North
            // Weylands and Esher Rugby Club all read "Walton-on-Thames" or
            // "Esher" while sitting nearer Hersham Green.
            if (nearerOther) {
              assignedElsewhere++;
              continue;
            }
          }
        }

        const site = sites.find((s) => s.match.some((m) => addressLower.includes(m)));
        if (!site) ungrouped.push(address);

        const startDate = r.start_date ?? '';
        if (startDate > latest) latest = startDate;

        store.set({
          id: ref,
          data: {
            reference: ref,
            address,
            postcode: r.postcode ?? undefined,
            description: r.description ?? '',
            state: r.app_state ?? 'Unknown',
            type: r.app_type ?? 'Unknown',
            startDate,
            decidedDate: r.decided_date ?? undefined,
            councilUrl: r.url ?? undefined,
            planitUrl: r.link ?? undefined,
            place: centre.name,
            siteName: site?.name ?? undefined,
            siteSlug: site?.slug ?? slugify(address.split(',')[0] ?? address),
          },
        });
        kept++;
      }

      // A feed that still responds but has stopped moving forward looks healthy
      // and is not. Worth a loud line in the build output.
      if (previousLatest && latest && latest < previousLatest) {
        logger.error(
          `planning-loader: newest application for ${centre.name} is ${latest}, older than the ${previousLatest} ` +
            `previously held. The query or the upstream data may have changed.`,
        );
      }

      if (ungrouped.length > 0) {
        logger.warn(
          `planning-loader: ${ungrouped.length} application(s) near ${centre.name} match no named site in the ` +
            `config, so they will render ungrouped. Add them to section 4.11's site list if they are significant: ` +
            ungrouped.slice(0, 5).join(' | '),
        );
      }

      // Every drop is counted, not silent. A filter that quietly removes the
      // wrong things is the failure mode that matters here.
      const dropped = [
        assignedElsewhere > 0 ? `${assignedElsewhere} assigned to a neighbouring place` : '',
        droppedConsultation > 0 ? `${droppedConsultation} cross-boundary consultation record(s)` : '',
        droppedOutsideTown > 0 ? `${droppedOutsideTown} outside the postal town filter` : '',
      ].filter(Boolean);

      logger.info(
        `planning-loader: ${kept} major application(s) within ${radiusKm}km of ${centre.name}` +
          (dropped.length > 0 ? `, dropped ${dropped.join(', ')}` : ''),
      );
    },
  };
}
