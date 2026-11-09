// What a directory listing's details were checked against, in words a reader
// can use. Replaces the bare "Last verified: 2026-07-08" line, which showed
// the same date whether a field had been checked against the business's own
// website or merely copied from a spreadsheet. See docs/directory-plan.md, 1.3.
//
// Three cases, in order of strength:
//   1. Field-level `checks`: say which fields, against what, and when.
//   2. A free-text `source` and a `verified_date`: give the date in words and
//      the source as recorded, so the reader can judge it.
//   3. The July 2026 restaurant spreadsheet alone: say plainly that nothing
//      has been checked against an official source, rather than calling it
//      verified.

type Check = { fields: string[]; source: { label: string; url?: string; basis: string; checked: string } };

export interface ListingProvenance {
  // One line per source checked, newest first. Empty for cases 2 and 3.
  checks: { fields: string; label: string; url?: string; basis: string; date: string }[];
  // Case 2: the date in words. Case 3: the date the record was added.
  date?: string;
  // Case 2: the recorded source text, for a "what was checked" disclosure.
  sourceText?: string;
  // Case 3.
  uncheckedSpreadsheet: boolean;
  // Case 1 on a record that started in the spreadsheet: the fields not named
  // in `checks` still rest on it, and the page has to say so.
  restFromSpreadsheet: boolean;
}

// The prefix every record from the July 2026 spreadsheet carries in `source`.
// A re-checked record keeps the prefix while any field still rests on the
// spreadsheet, and drops it once every field it shows has been checked.
const SPREADSHEET_PREFIX = 'Restaurant directory spreadsheet';

const FIELD_LABELS: Record<string, string> = {
  name: 'name',
  address: 'address',
  postcode: 'postcode',
  phone: 'phone number',
  website: 'website',
  lat: 'map position',
  lng: 'map position',
  hours: 'opening hours',
  description: 'description',
  status: 'trading status',
  subcategories: 'services',
};

// How each basis reads after "checked against". Covers the shared vocabulary
// in src/content.config.ts (`factBasis`), not only the values listings use.
const BASIS_LABELS: Record<string, string> = {
  'business-website': "the business's own website",
  'business-confirmed': 'confirmed by the business',
  'official-data': 'an official register',
  'nhs-profile': 'its NHS profile',
  'practice-website': "the practice's website",
  'practice-confirmed': 'confirmed by the practice',
  'organisation-website': "the organisation's website",
  'organisation-confirmed': 'confirmed by the organisation',
  'editor-observation': 'our own visit',
  'openstreetmap': 'OpenStreetMap',
  'timetable': 'the published timetable',
  'routing-estimate': 'a route planner',
};

export function basisLabel(basis: string): string {
  return BASIS_LABELS[basis] ?? basis;
}

// "2026-07-08" -> "8 July 2026". Anything that is not a plain ISO date is
// returned unchanged rather than guessed at.
export function formatCheckDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// Fields that identify the source itself rather than describe the business:
// recorded in `checks` for re-checking, not repeated to the reader.
const UNSHOWN_FIELDS = new Set(['fhrs_id']);

function fieldList(fields: string[]): string {
  const words = [...new Set(fields.filter((f) => !UNSHOWN_FIELDS.has(f)).map((f) => FIELD_LABELS[f] ?? f.replace(/_/g, ' ')))];
  const list = words.length <= 1 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
  return list.charAt(0).toUpperCase() + list.slice(1);
}

export function listingProvenance(data: {
  checks?: Check[];
  source?: string;
  verified_date?: string;
}): ListingProvenance {
  const checks = [...(data.checks ?? [])]
    .sort((a, b) => b.source.checked.localeCompare(a.source.checked))
    .map((c) => ({
      fields: fieldList(c.fields),
      label: c.source.label,
      url: c.source.url,
      basis: basisLabel(c.source.basis),
      date: formatCheckDate(c.source.checked)!,
    }));

  const fromSpreadsheet = (data.source ?? '').startsWith(SPREADSHEET_PREFIX);
  if (checks.length > 0) {
    return { checks, uncheckedSpreadsheet: false, restFromSpreadsheet: fromSpreadsheet };
  }

  const uncheckedSpreadsheet = fromSpreadsheet;
  return {
    checks: [],
    date: formatCheckDate(data.verified_date),
    sourceText: uncheckedSpreadsheet ? undefined : data.source,
    uncheckedSpreadsheet,
    restFromSpreadsheet: false,
  };
}
