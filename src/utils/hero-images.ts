// Shared hero image definitions.
//
// A responsive hero has to be declared twice on a page: once on the <img> and
// once on the <link rel="preload"> that gets the browser fetching it before the
// stylesheet resolves. If those two disagree, the browser preloads one file and
// then downloads a different one, which is worse than no preload at all. Both
// pages that use a given hero therefore read it from here rather than writing
// the srcset out by hand.
//
// Variants are generated with sharp at quality 72. To add a width, add the file
// and the entry here, and both the img and the preload pick it up.

export interface HeroImage {
  /** Fallback for browsers that ignore srcset. The middle width, not the largest. */
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
}

// Used by /hersham/ and /things-to-do/hersham/. Full-bleed, so sizes is 100vw.
// The un-suffixed original stays on disk as the Open Graph image and is
// deliberately not referenced here: it is larger than any variant a visitor
// needs.
export const HERSHAM_GREEN_HERO: HeroImage = {
  src: '/images/hersham-green-village-sign-hero-1200.webp',
  srcset: [
    '/images/hersham-green-village-sign-hero-800.webp 800w',
    '/images/hersham-green-village-sign-hero-1200.webp 1200w',
    '/images/hersham-green-village-sign-hero-2048.webp 2048w',
  ].join(', '),
  sizes: '100vw',
  width: 2048,
  height: 768,
  alt: 'The Hersham Village sign on Hersham Green',
};
