// Maps internal links across the built site. Run with `npm run seo:links`
// (build first — this reads from dist/, it doesn't build). Reports:
//   1. Pages with fewer than 3 internal inbound links
//   2. Anchor text distribution for a set of priority pages
//   3. Any internal links pointing at a URL with no matching built page (a 404)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://walton-on-thames.org';
const DIST = 'dist';

// Same "priority pages" list used for the Lighthouse audit round, since no
// separate roadmap/priority list exists in the repo — see build-log.md.
const PRIORITY_PAGES = [
  '/',
  '/things-to-do/',
  '/food-and-drink/',
  '/whats-on/',
  '/history/',
  '/directory/',
  '/hersham/',
];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
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

const files = walkHtml(DIST);
const knownPaths = new Set(files.map(toUrlPath));

// inbound[targetPath] = [{ from, anchor }]
const inbound = new Map();
for (const p of knownPaths) inbound.set(p, []);

const brokenLinks = []; // { from, href }

for (const file of files) {
  const fromPath = toUrlPath(file);
  const html = readFileSync(file, 'utf8');
  // Grab href + the text content of the anchor (non-greedy, no nested tags handled simply)
  for (const m of html.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)) {
    let href = m[1];
    const anchorHtml = m[2];
    const anchorText = anchorHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    if (href.startsWith(SITE)) href = href.slice(SITE.length);
    if (!href.startsWith('/')) continue; // external, mailto, tel, anchors-only
    href = href.split('#')[0].split('?')[0];
    if (!href) href = '/';
    if (!href.endsWith('/') && !href.includes('.')) href += '/';

    if (href.includes('.')) continue; // asset link (image, xml, etc), not a page

    if (!knownPaths.has(href)) {
      brokenLinks.push({ from: fromPath, href });
      continue;
    }
    if (href === fromPath) continue; // don't count self-links

    inbound.get(href).push({ from: fromPath, anchor: anchorText || '(no text)' });
  }
}

// 1. Pages with fewer than 3 inbound links
const thin = [...inbound.entries()]
  .filter(([path]) => path !== '/contact/thank-you/')
  .map(([path, links]) => ({ path, count: links.length }))
  .filter((x) => x.count < 3)
  .sort((a, b) => a.count - b.count);

console.log(`\n=== Pages with fewer than 3 internal inbound links (${thin.length}) ===`);
thin.forEach((x) => console.log(` - [${x.count}] ${x.path}`));

// 2. Anchor text distribution for priority pages
console.log(`\n=== Anchor text distribution for priority pages ===`);
for (const p of PRIORITY_PAGES) {
  const links = inbound.get(p) ?? [];
  const counts = new Map();
  for (const l of links) counts.set(l.anchor, (counts.get(l.anchor) ?? 0) + 1);
  console.log(`\n${p} — ${links.length} inbound link(s)`);
  [...counts.entries()].sort((a, b) => b[1] - a[1]).forEach(([anchor, n]) => console.log(`   "${anchor}" x${n}`));
}

// 3. Broken internal links
console.log(`\n=== Internal links to non-existent pages (${brokenLinks.length}) ===`);
brokenLinks.forEach((b) => console.log(` - ${b.from} -> ${b.href}`));

console.log('');
if (brokenLinks.length > 0) process.exit(1);
