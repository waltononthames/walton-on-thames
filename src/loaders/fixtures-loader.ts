import type { Loader } from 'astro/loaders';

interface FixturesLoaderOptions {
  /** URL of the .ics calendar feed (https://, not webcal://) */
  url: string;
  /** Name of the local team as it appears in the feed's SUMMARY field, e.g. "Walton & Hersham" */
  teamName: string;
}

function unescapeIcsText(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    // Every string from the feed passes through here, so this is the one
    // place to normalise em dashes out of text nobody here writes. The
    // build check guards authored files only; without this, a team or
    // competition name carrying an em dash would either reach the page or,
    // if that check covered the built output, let the club's calendar break
    // our nightly deploy.
    .replace(/\s+—\s+/g, ', ')
    .replace(/—/g, '-');
}

// RFC 5545 line folding: continuation lines start with a space or tab.
function unfoldIcs(raw: string): string[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const unfolded: string[] = [];
  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && unfolded.length > 0) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else if (line.length > 0) {
      unfolded.push(line);
    }
  }
  return unfolded;
}

// This feed only uses floating UTC timestamps (YYYYMMDDTHHMMSSZ), not VALUE=DATE
// or TZID forms, so that's the only format handled here.
function parseIcsUtcDate(value: string): Date {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (!m) throw new Error(`Unrecognised ICS date format: ${value}`);
  const [, y, mo, d, h, mi, s] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s));
}

// Converts a UTC instant to the correct Europe/London wall-clock time (handling BST),
// returned as a naive local ISO string, matching the convention used by hand-authored
// events in src/content/events/ (no trailing Z, no offset).
function toLondonLocalIso(dt: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(dt);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

function parseVEventBlock(fields: Record<string, string>, teamName: string) {
  const uid = fields.UID;
  const summaryRaw = fields.SUMMARY;
  const dtstart = fields.DTSTART;
  const dtend = fields.DTEND;
  const locationRaw = fields.LOCATION;
  const descriptionRaw = fields.DESCRIPTION;

  if (!uid || !summaryRaw || !dtstart || !locationRaw) return null;

  // SUMMARY format observed in this feed: "⚽️ Team A vs Team B", home team first.
  const summary = unescapeIcsText(summaryRaw).replace(/^[^\w]+/, '').trim();
  const teams = summary.split(/\s+vs\s+/i);
  if (teams.length !== 2) return null;
  const [homeTeam, awayTeam] = teams.map((t) => t.trim());

  const teamNameLower = teamName.toLowerCase();
  const isHome = homeTeam.toLowerCase().includes(teamNameLower);
  const isAway = awayTeam.toLowerCase().includes(teamNameLower);
  if (!isHome && !isAway) return null;

  const venue = unescapeIcsText(locationRaw);
  const description = descriptionRaw ? unescapeIcsText(descriptionRaw) : '';
  const competitionMatch = description.match(/^([^,|]+)/);
  const competition = competitionMatch ? competitionMatch[1].trim() : 'National League South';
  const matchWeekMatch = description.match(/Match Week:\s*(\d+)/i);
  const matchWeek = matchWeekMatch ? Number(matchWeekMatch[1]) : undefined;

  const start = toLondonLocalIso(parseIcsUtcDate(dtstart));
  const end = dtend ? toLondonLocalIso(parseIcsUtcDate(dtend)) : undefined;
  const dateOnly = start.slice(0, 10);
  const opponent = isHome ? awayTeam : homeTeam;
  const slug = `whfc-${isHome ? 'vs' : 'at'}-${slugify(opponent)}-${dateOnly}`;

  return {
    id: uid,
    data: {
      homeTeam,
      awayTeam,
      homeAway: (isHome ? 'home' : 'away') as 'home' | 'away',
      competition,
      ...(matchWeek !== undefined ? { matchWeek } : {}),
      start,
      ...(end ? { end } : {}),
      venue,
      slug,
    },
  };
}

export function fixturesLoader(options: FixturesLoaderOptions): Loader {
  return {
    name: 'fixtures-loader',
    load: async ({ store, logger }) => {
      let raw: string;
      try {
        const res = await fetch(options.url);
        if (!res.ok) {
          logger.error(`fixtures-loader: HTTP ${res.status} fetching ${options.url}, keeping existing entries`);
          return;
        }
        raw = await res.text();
      } catch (err) {
        logger.error(`fixtures-loader: failed to fetch ${options.url}: ${(err as Error).message}, keeping existing entries`);
        return;
      }

      const lines = unfoldIcs(raw);
      store.clear();

      let current: Record<string, string> | null = null;
      let count = 0;

      for (const line of lines) {
        if (line === 'BEGIN:VEVENT') {
          current = {};
          continue;
        }
        if (line === 'END:VEVENT') {
          if (current) {
            const entry = parseVEventBlock(current, options.teamName);
            if (entry) {
              store.set(entry);
              count++;
            }
          }
          current = null;
          continue;
        }
        if (!current) continue;
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).split(';')[0];
        const value = line.slice(idx + 1);
        current[key] = value;
      }

      logger.info(`fixtures-loader: loaded ${count} fixtures from ${options.url}`);
    },
  };
}
