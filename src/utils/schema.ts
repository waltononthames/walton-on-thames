// Shared JSON-LD identifiers.
//
// Search engines resolve a place from a graph of statements about it, not from
// one page's markup. Every page in the Hersham cluster therefore points at the
// same node id rather than describing "Hersham" again in its own words: twenty
// pages each declaring their own untyped Hersham are twenty weak signals, while
// twenty pages referencing one identified entity are one strong one.
//
// The id is a fragment on the hub because that is the page that defines the
// entity. Nothing else may define a node with this id.

export const SITE_ID = 'https://walton-on-thames.org/#website';
export const HERSHAM_PLACE_ID = 'https://walton-on-thames.org/hersham/#place';

const ORIGIN = 'https://walton-on-thames.org';

/**
 * A WebPage node declaring that this page is about the Hersham entity and is
 * part of this site. Use on Hersham pages that carry no Article schema of their
 * own; pages that do have an Article should add `about` to it instead of
 * emitting a second node.
 */
export function hershamWebPage({
  path,
  name,
  description,
}: {
  /** Absolute site path with leading and trailing slash, e.g. '/hersham/living/'. */
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${ORIGIN}${path}#webpage`,
    url: `${ORIGIN}${path}`,
    name,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': HERSHAM_PLACE_ID },
  };
}

/** The `about` reference on its own, for schema nodes that already exist. */
export const ABOUT_HERSHAM = { '@id': HERSHAM_PLACE_ID };
