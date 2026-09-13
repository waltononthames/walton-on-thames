// Shared vocabulary for the clubs and societies hubs. The taxonomy is closed
// in src/content.config.ts, so every label here has exactly one schema value
// behind it: adding a category means editing both, which is the point. It
// stops a hub and an organisation page from ever describing the same record
// with two different words.

export type OrganisationCategory =
  | 'sport-and-recreation'
  | 'children-and-young-people'
  | 'uniformed-organisations'
  | 'arts-and-performance'
  | 'hobbies-and-interests'
  | 'faith-and-church-groups'
  | 'health-wellbeing-and-support'
  | 'older-people'
  | 'volunteering-and-service'
  | 'residents-and-civic';

export type OrganisationLocality =
  | 'walton' | 'hersham' | 'whiteley-village' | 'wider-elmbridge';

export type OrganisationAudience =
  | 'adults' | 'children' | 'young-people' | 'families' | 'older-people';

/**
 * The shape of one organisation record's frontmatter. Declared by hand rather
 * than inferred from the collection: `getCollection` resolves to `never` in
 * this project's TypeScript setup, so pages that rely on inference lose every
 * property. Annotating against this keeps the hubs and the organisation
 * template type-checked.
 */
export interface OrganisationData {
  name: string;
  slug: string;
  locality: OrganisationLocality[];
  audience: OrganisationAudience[];
  category: OrganisationCategory;
  subcategory?: string;
  shortDescription: string;
  fullDescription?: string;
  venue?: string;
  address?: string;
  ageRange?: string;
  meetingInformation?: string;
  website?: string;
  contactUrl?: string;
  images: { src: string; alt: string; caption?: string }[];
  imageCredit?: string;
  status: 'active' | 'uncertain' | 'closed';
  sources: { label: string; url: string; accessed: string }[];
  lastVerified: string;
  hasPage: boolean;
  internalUrl?: string;
  relatedOrganisations: string[];
}

// Display order for category headings and for the jump navigation. Not
// alphabetical: sport and children come first because that is what most
// people arrive looking for, and the civic material is the long tail.
export const CATEGORY_ORDER: OrganisationCategory[] = [
  'sport-and-recreation',
  'children-and-young-people',
  'uniformed-organisations',
  'arts-and-performance',
  'hobbies-and-interests',
  'faith-and-church-groups',
  'health-wellbeing-and-support',
  'older-people',
  'volunteering-and-service',
  'residents-and-civic',
];

export const CATEGORY_LABELS: Record<OrganisationCategory, string> = {
  'sport-and-recreation': 'Sport and recreation',
  'children-and-young-people': 'Children and young people',
  'uniformed-organisations': 'Uniformed organisations',
  'arts-and-performance': 'Arts and performance',
  'hobbies-and-interests': 'Hobbies and interests',
  'faith-and-church-groups': 'Faith and church groups',
  'health-wellbeing-and-support': 'Health, wellbeing and support',
  'older-people': 'Older people',
  'volunteering-and-service': 'Volunteering and service',
  'residents-and-civic': 'Residents and civic',
};

export const LOCALITY_LABELS: Record<OrganisationLocality, string> = {
  'walton': 'Walton-on-Thames',
  'hersham': 'Hersham',
  'whiteley-village': 'Whiteley Village',
  'wider-elmbridge': 'Wider Elmbridge',
};

export const AUDIENCE_LABELS: Record<OrganisationAudience, string> = {
  'adults': 'Adults',
  'children': 'Children',
  'young-people': 'Young people',
  'families': 'Families',
  'older-people': 'Older people',
};

// The two audience sections. An organisation genuinely serving both appears
// in both, which is why the hub counts unique slugs rather than cards: a
// cricket club that coaches five-year-olds and fields an over-40s side is
// one organisation, and saying otherwise would inflate the count.
export const AUDIENCE_SECTIONS = [
  {
    id: 'children-young-people-and-families',
    heading: 'For children, young people and families',
    matches: ['children', 'young-people', 'families'] as OrganisationAudience[],
  },
  {
    id: 'adults-and-older-people',
    heading: 'For adults and older people',
    matches: ['adults', 'older-people'] as OrganisationAudience[],
  },
];

/**
 * Structured-data type for an organisation, chosen by what it actually is
 * rather than by which rich result looks best. Sports clubs and youth sports
 * clubs are SportsOrganization; a council community building is a
 * CivicStructure; everything else is a plain Organization.
 */
export function schemaTypeFor(category: string, subcategory?: string): string {
  if (subcategory === 'Community hub') return 'CivicStructure';
  if (category === 'sport-and-recreation' || category === 'children-and-young-people') {
    return 'SportsOrganization';
  }
  return 'Organization';
}

/** "Information checked: September 2026" from a YYYY-MM-DD string. */
export function checkedLabel(lastVerified: string): string {
  return new Date(lastVerified + 'T00:00:00').toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
}
