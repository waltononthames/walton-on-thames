// Parses the built HTML and fails (exit 1) if required structured-data
// fields are missing for each page type. Run with `npm run seo:validate`
// (build first: this reads from dist/, it doesn't build).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('dist/ not found: run `npm run build` first.');
  process.exit(1);
}

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function toUrlPath(file) {
  return '/' + relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');
}

function getJsonLdBlocks(html) {
  const blocks = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      // malformed JSON-LD is itself a failure, represented by an empty object
      blocks.push({ __malformed: true });
    }
  }
  return blocks;
}

function findByType(blocks, type) {
  const all = [];
  for (const b of blocks) {
    const nodes = b['@graph'] ?? [b];
    for (const n of nodes) {
      if (n['@type'] === type) all.push(n);
    }
  }
  return all;
}

function hasPath(obj, path) {
  let cur = obj;
  for (const key of path.split('.')) {
    if (cur == null || !(key in cur)) return false;
    cur = cur[key];
  }
  return cur !== undefined && cur !== null && cur !== '';
}

const failures = [];

function fail(urlPath, msg) {
  failures.push(`${urlPath}, ${msg}`);
}

const files = walkHtml(DIST);

for (const file of files) {
  const urlPath = toUrlPath(file);
  if (urlPath === '/contact/thank-you/' || urlPath === '/404.html') continue;

  const html = readFileSync(file, 'utf8');
  const blocks = getJsonLdBlocks(html);
  if (blocks.some((b) => b.__malformed)) {
    fail(urlPath, 'contains malformed JSON-LD (failed to parse)');
    continue;
  }

  // Canonical: exactly one, self-referencing.
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1) {
    fail(urlPath, `expected exactly 1 canonical tag, found ${canonicals.length}`);
  } else if (canonicals[0] !== `https://walton-on-thames.org${urlPath}`) {
    fail(urlPath, `canonical does not self-reference (${canonicals[0]})`);
  }

  // BreadcrumbList required on every page except the homepage.
  if (urlPath !== '/') {
    const breadcrumbs = findByType(blocks, 'BreadcrumbList');
    if (breadcrumbs.length === 0) {
      fail(urlPath, 'missing BreadcrumbList schema');
    } else if (!breadcrumbs[0].itemListElement || breadcrumbs[0].itemListElement.length < 2) {
      fail(urlPath, 'BreadcrumbList has fewer than 2 items');
    }
  }

  // Homepage: WebSite + Organization with sameAs and logo.
  if (urlPath === '/') {
    const org = findByType(blocks, 'Organization')[0];
    if (!org) fail(urlPath, 'missing Organization schema');
    else {
      if (!hasPath(org, 'logo.url') && typeof org.logo !== 'string') fail(urlPath, 'Organization missing logo');
      if (!Array.isArray(org.sameAs) || org.sameAs.length === 0) fail(urlPath, 'Organization missing sameAs');
    }
    if (findByType(blocks, 'WebSite').length === 0) fail(urlPath, 'missing WebSite schema');
  }

  // Event pages (excluding the index).
  if (/^\/whats-on\/[^/]+\/$/.test(urlPath)) {
    const event = findByType(blocks, 'Event')[0];
    if (!event) {
      fail(urlPath, 'missing Event schema');
    } else {
      for (const field of ['name', 'startDate', 'eventStatus']) {
        if (!hasPath(event, field)) fail(urlPath, `Event missing ${field}`);
      }
      if (!hasPath(event, 'location.name')) fail(urlPath, 'Event missing location.name');
      if (!hasPath(event, 'location.address')) fail(urlPath, 'Event missing location.address');
    }
  }

  // History / Hersham articles and news articles: Article schema.
  // (hersham/food-and-drink/ and hersham/history/ are curated hub pages,
  // not content-collection articles, so they're excluded here.)
  const hubExceptions = new Set(['/hersham/food-and-drink/', '/hersham/history/']);
  if ((/^\/(history|hersham)\/[^/]+\/$/.test(urlPath) && !hubExceptions.has(urlPath)) || /^\/community\/news\/[^/]+\/$/.test(urlPath)) {
    const article = findByType(blocks, 'Article')[0];
    if (!article) {
      fail(urlPath, 'missing Article schema');
    } else {
      for (const field of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) {
        if (!hasPath(article, field)) fail(urlPath, `Article missing ${field}`);
      }
      if (!hasPath(article, 'publisher.logo')) fail(urlPath, 'Article publisher missing logo');
    }
  }

  // Directory business listings: LocalBusiness-family schema.
  // /directory/enhanced-listing/ sits under the same path but explains how to
  // submit a listing, so it has no business of its own to describe.
  const NON_LISTING_DIRECTORY_PAGES = new Set(['/directory/enhanced-listing/']);
  if (/^\/directory\/[^/]+\/$/.test(urlPath) && !NON_LISTING_DIRECTORY_PAGES.has(urlPath)) {
    const localBusinessTypes = [
      'LocalBusiness', 'Restaurant', 'FastFoodRestaurant', 'CafeOrCoffeeShop',
      'BarOrPub', 'LodgingBusiness', 'SportsActivityLocation', 'Store',
    ];
    const biz = blocks.flatMap((b) => b['@graph'] ?? [b]).find((n) => localBusinessTypes.includes(n['@type']));
    if (!biz) {
      fail(urlPath, 'missing LocalBusiness-family schema');
    } else {
      if (!hasPath(biz, 'name')) fail(urlPath, 'LocalBusiness missing name');
      if (!hasPath(biz, 'address.streetAddress')) fail(urlPath, 'LocalBusiness missing address.streetAddress');
    }
  }
}

console.log(`Checked ${files.length} pages.`);
if (failures.length > 0) {
  console.error(`\n${failures.length} SEO validation failure(s):\n`);
  failures.forEach((f) => console.error(' -', f));
  process.exit(1);
}
console.log('All SEO validation checks passed.');
