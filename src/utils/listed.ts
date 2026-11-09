// Which business listings appear in lists, grids, maps and counts.
//
// Decision D6 in docs/directory-plan.md (Darren, 9 November 2026): a
// permanently closed business keeps its own /directory/<slug>/ page, with the
// "This business has closed." notice, but drops out of every list. Twelve
// months after `closed_on` its URL is redirected to its category page in
// public/_redirects and the record removed; `npm run content:stale-listings`
// reports when that is due.
//
// Use as the filter argument: getCollection('businesses', isListed). The one
// place that must NOT use it is src/pages/directory/[slug].astro, which builds
// the pages themselves.
export function isListed(entry: { data: { status?: string } }): boolean {
  return entry.data.status !== 'permanently-closed';
}
