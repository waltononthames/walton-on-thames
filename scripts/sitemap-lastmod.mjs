// Resolves a lastmod date for each sitemap URL, used by astro.config.mjs's
// sitemap serialize() hook. Prefers the git commit date of the most relevant
// source file: the content-collection markdown file for content-driven
// routes, or the .astro route file itself for everything else (including
// fixtures, which have no markdown file - using the route/loader's own git
// history avoids a spuriously-changing "now" on every build).
//
// Where the date comes from, in order:
//   1. `git log -1 -- <file>`, but only when the clone has full history.
//   2. src/data/lastmod.json, the manifest written by scripts/generate-lastmod.mjs.
//   3. HEAD's own commit date.
//   4. Build time.
//
// Steps 2 and 3 exist because Cloudflare Pages clones at depth 1. With one
// commit in the repository `git log -1 -- <file>` returns HEAD for every
// file, so step 1 silently stamps the entire sitemap with the deploy
// timestamp. Step 4 is last because it changes on every rebuild, including
// the nightly one, which is exactly the signal lastmod must not send.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const HAS_FULL_HISTORY = (() => {
  try {
    return execSync('git rev-parse --is-shallow-repository', { encoding: 'utf8' }).trim() === 'false';
  } catch {
    return false; // not a git repo, or no git binary
  }
})();

const MANIFEST = (() => {
  try {
    return JSON.parse(readFileSync('src/data/lastmod.json', 'utf8'));
  } catch {
    return {};
  }
})();

const HEAD_DATE = (() => {
  try {
    return execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
})();

const BUILD_DATE = new Date().toISOString();

const gitDateCache = new Map();

function gitLastModified(relPath) {
  if (gitDateCache.has(relPath)) return gitDateCache.get(relPath);
  let iso = null;
  if (HAS_FULL_HISTORY && existsSync(relPath)) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, { encoding: 'utf8' }).trim();
      if (out) iso = out;
    } catch {
      // fall through to the manifest
    }
  }
  if (!iso) iso = MANIFEST[relPath] || HEAD_DATE || BUILD_DATE;
  gitDateCache.set(relPath, iso);
  return iso;
}

// Ordered list of {test, resolve} rules. First match wins.
const rules = [
  {
    test: (p) => /^\/directory\/([^/]+)\/$/.exec(p),
    resolve: (m) => `src/content/businesses/${m[1]}.md`,
  },
  {
    test: (p) => /^\/community\/news\/([^/]+)\/$/.exec(p),
    resolve: (m) => `src/content/news/${m[1]}.md`,
  },
  {
    test: (p) => /^\/hersham\/([^/]+)\/$/.exec(p),
    resolve: (m) => {
      const contentFile = `src/content/hersham/${m[1]}.md`;
      return existsSync(contentFile) ? contentFile : 'src/pages/hersham/[slug].astro';
    },
  },
  {
    test: (p) => /^\/history\/([^/]+)\/$/.exec(p),
    resolve: (m) => `src/content/history/${m[1]}.md`,
  },
  {
    test: (p) => /^\/whats-on\/([^/]+)\/$/.exec(p),
    resolve: (m) => {
      // Fixtures are generated live from the ECAL feed (no markdown file);
      // fall back to the loader's own git history so lastmod reflects when
      // the fixtures logic last changed, not a spuriously-changing "now".
      if (m[1].startsWith('whfc-')) return 'src/loaders/fixtures-loader.ts';
      return `src/content/events/${m[1]}.md`;
    },
  },
  {
    test: (p) => /^\/things-to-do\/([^/]+)\/$/.exec(p),
    resolve: (m) => {
      const contentFile = `src/content/places/${m[1]}.md`;
      return existsSync(contentFile) ? contentFile : 'src/pages/things-to-do/[slug].astro';
    },
  },
  {
    test: (p) => /^\/food-and-drink\/([^/]+)\/$/.exec(p),
    resolve: () => 'src/pages/food-and-drink/[category].astro',
  },
];

// Static-page fallback: map a URL path directly to its .astro route file.
const staticPageMap = {
  '/': 'src/pages/index.astro',
  '/about/': 'src/pages/about.astro',
  '/accessibility-statement/': 'src/pages/accessibility-statement.astro',
  '/advertise-your-business/': 'src/pages/advertise-your-business.astro',
  '/contact/': 'src/pages/contact.astro',
  '/directory/': 'src/pages/directory/index.astro',
  '/food-and-drink/': 'src/pages/food-and-drink/index.astro',
  '/getting-here/': 'src/pages/getting-here.astro',
  '/hersham/': 'src/pages/hersham/index.astro',
  '/hersham/food-and-drink/': 'src/pages/hersham/food-and-drink.astro',
  '/hersham/history/': 'src/pages/hersham/history/index.astro',
  '/history/': 'src/pages/history/index.astro',
  '/living/': 'src/pages/living/index.astro',
  '/living/community/': 'src/pages/living/community.astro',
  '/living/council-and-services/': 'src/pages/living/council-and-services.astro',
  '/living/dentists/': 'src/pages/living/dentists.astro',
  '/living/gp-surgeries/': 'src/pages/living/gp-surgeries.astro',
  '/living/pharmacies/': 'src/pages/living/pharmacies.astro',
  '/living/post-offices-and-post-boxes/': 'src/pages/living/post-offices-and-post-boxes.astro',
  '/living/schools/': 'src/pages/living/schools.astro',
  '/places-to-stay/': 'src/pages/places-to-stay/index.astro',
  '/privacy-policy/': 'src/pages/privacy-policy.astro',
  '/shopping/': 'src/pages/shopping/index.astro',
  '/shopping/independent-shops/': 'src/pages/shopping/independent-shops.astro',
  '/shopping/the-heart/': 'src/pages/shopping/the-heart.astro',
  '/terms-and-conditions/': 'src/pages/terms-and-conditions.astro',
  '/things-to-do/': 'src/pages/things-to-do/index.astro',
  '/things-to-do/riverside-walks/': 'src/pages/things-to-do/riverside-walks.astro',
  '/whats-on/': 'src/pages/whats-on/index.astro',
  '/community/news/': 'src/pages/community/news/index.astro',
};

export function resolveSourceFile(urlPath) {
  if (staticPageMap[urlPath]) return staticPageMap[urlPath];
  for (const rule of rules) {
    const m = rule.test(urlPath);
    if (m) return rule.resolve(m);
  }
  return null;
}

export function lastmodFor(fullUrl) {
  const urlPath = fullUrl.replace(/^https?:\/\/[^/]+/, '');
  const file = resolveSourceFile(urlPath);
  if (!file) return HEAD_DATE || BUILD_DATE;
  return gitLastModified(file);
}
