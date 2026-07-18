// One-off SEO hygiene audit script (not wired into the build). Run with
// `node scripts/audit-seo.mjs <check>` where <check> is one of:
// canonicals | sitemap | orphans | trailing-slash | robots | 404
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://walton-on-thames.org';
const DIST = 'dist';

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function toUrlPath(file) {
  const rel = relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');
  return '/' + rel;
}

const check = process.argv[2];

if (check === 'canonicals') {
  const files = walkHtml(DIST);
  console.log(`Total index.html files: ${files.length}`);
  let issues = [];
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)].map((m) => m[1]);
    const expectedPath = toUrlPath(file);
    const expectedURL = SITE + expectedPath;
    if (canonicals.length === 0) {
      issues.push(`${expectedPath} -> NO CANONICAL TAG`);
    } else if (canonicals.length > 1) {
      issues.push(`${expectedPath} -> MULTIPLE CANONICALS: ${canonicals.join(', ')}`);
    } else if (canonicals[0] !== expectedURL) {
      issues.push(`${expectedPath} -> MISMATCH: canonical=${canonicals[0]} expected=${expectedURL}`);
    }
  }
  console.log(`Issues: ${issues.length}`);
  issues.forEach((i) => console.log(' -', i));
}

if (check === 'sitemap') {
  const sitemapXml = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  const sitemapUrls = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const files = walkHtml(DIST);
  const builtUrls = new Set(files.map((f) => SITE + toUrlPath(f)));

  const inBuiltNotSitemap = [...builtUrls].filter((u) => !sitemapUrls.has(u));
  const inSitemapNotBuilt = [...sitemapUrls].filter((u) => !builtUrls.has(u));

  console.log(`Built pages: ${builtUrls.size}, sitemap entries: ${sitemapUrls.size}`);
  console.log(`\nBuilt but NOT in sitemap (${inBuiltNotSitemap.length}):`);
  inBuiltNotSitemap.forEach((u) => console.log(' -', u));
  console.log(`\nIn sitemap but NOT built (${inSitemapNotBuilt.length}):`);
  inSitemapNotBuilt.forEach((u) => console.log(' -', u));

  // does sitemap have lastmod?
  const hasLastmod = /<lastmod>/.test(sitemapXml);
  console.log(`\nHas <lastmod> entries: ${hasLastmod}`);
}

if (check === 'orphans') {
  const files = walkHtml(DIST);
  const urlToFile = new Map();
  for (const f of files) urlToFile.set(toUrlPath(f), f);

  const graph = new Map(); // url -> Set of linked urls (internal only)
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    const internal = new Set();
    for (let href of hrefs) {
      if (href.startsWith(SITE)) href = href.slice(SITE.length);
      if (!href.startsWith('/')) continue; // skip external, mailto, anchors, etc
      href = href.split('#')[0].split('?')[0];
      if (!href) href = '/';
      if (!href.endsWith('/') && !href.includes('.')) href += '/';
      internal.add(href);
    }
    graph.set(toUrlPath(f), internal);
  }

  // BFS from homepage
  const dist = new Map();
  dist.set('/', 0);
  let frontier = ['/'];
  let depth = 0;
  while (frontier.length > 0 && depth < 10) {
    const next = [];
    for (const u of frontier) {
      const links = graph.get(u) || new Set();
      for (const l of links) {
        if (!dist.has(l) && urlToFile.has(l)) {
          dist.set(l, depth + 1);
          next.push(l);
        }
      }
    }
    frontier = next;
    depth++;
  }

  const allUrls = [...urlToFile.keys()];
  const unreachable = allUrls.filter((u) => !dist.has(u));
  const beyond3 = allUrls.filter((u) => dist.has(u) && dist.get(u) > 3);

  console.log(`Total pages: ${allUrls.length}`);
  console.log(`Reachable from homepage: ${dist.size}`);
  console.log(`\nUNREACHABLE (${unreachable.length}):`);
  unreachable.forEach((u) => console.log(' -', u));
  console.log(`\nReachable but MORE than 3 clicks (${beyond3.length}):`);
  beyond3.sort((a, b) => dist.get(b) - dist.get(a)).forEach((u) => console.log(` - depth ${dist.get(u)}: ${u}`));
}

if (check === 'trailing-slash') {
  const files = walkHtml(DIST);
  let noTrailingSlashInternalLinks = new Map(); // source page -> list of bad hrefs
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
    const bad = hrefs.filter((h) => {
      if (h === '') return false;
      const clean = h.split('#')[0].split('?')[0];
      if (!clean) return false;
      if (clean === '/') return false; // homepage is fine
      if (clean.includes('.')) return false; // files (images, xml, etc) shouldn't have trailing slash
      return !clean.endsWith('/');
    });
    if (bad.length > 0) noTrailingSlashInternalLinks.set(toUrlPath(f), [...new Set(bad)]);
  }
  console.log(`Pages with internal links missing trailing slash: ${noTrailingSlashInternalLinks.size}`);
  for (const [page, hrefs] of noTrailingSlashInternalLinks) {
    console.log(` - ${page}:`, hrefs.slice(0, 5));
  }
}

if (check === '404') {
  const exists404 = existsSync(join(DIST, '404.html')) || existsSync(join(DIST, '404', 'index.html'));
  console.log('dist/404.html or dist/404/index.html exists:', exists404);
  console.log('dist/404.html exists:', existsSync(join(DIST, '404.html')));
  console.log('dist/404/index.html exists:', existsSync(join(DIST, '404', 'index.html')));
}
