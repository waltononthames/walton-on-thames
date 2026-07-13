// Known place names whose correct written form isn't recoverable by naive
// hyphen-to-space + title-case conversion (e.g. "Walton-on-Thames" keeps its
// hyphens; a slug like "walton-on-thames" must not become "Walton On Thames").
const PLACE_NAME_OVERRIDES: Record<string, string> = {
  'walton-on-thames': 'Walton-on-Thames',
};

/**
 * Formats a neighbourhood/place slug (e.g. from content collection frontmatter)
 * into its correct display form. Use this instead of ad hoc
 * `.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())` calls, which
 * incorrectly turn "walton-on-thames" into "Walton On Thames".
 */
export function formatPlaceName(slug: string): string {
  const normalised = slug.toLowerCase();
  if (PLACE_NAME_OVERRIDES[normalised]) {
    return PLACE_NAME_OVERRIDES[normalised];
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
