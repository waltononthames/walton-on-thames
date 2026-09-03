// Canonical host enforcement.
//
// Every hostname Cloudflare routes to this Pages project serves the same site.
// Until this rule landed, www.walton-on-thames.org returned the whole site with
// a 200 rather than a redirect, so every page existed twice and only the
// canonical tag told Google which copy to keep. Duplicates split ranking
// signals and waste crawl budget, so anything that is not the canonical host
// now 301s to it, preserving path and query.
//
// Built for docs/hersham-head-term-plan.md item 1.1.

const CANONICAL_HOST = 'walton-on-thames.org';

// The production pages.dev alias. A duplicate like any other, and redirected.
const PAGES_DEV_HOST = 'walton-on-thames.pages.dev';

// Per-deployment and per-branch previews are <hash>.walton-on-thames.pages.dev
// and <branch>.walton-on-thames.pages.dev. These must keep serving: redirecting
// them would bounce every preview deployment to production and make branch
// builds impossible to review. Note the leading dot, which is what separates a
// preview subdomain from the bare production alias above.
const PREVIEW_SUFFIX = '.walton-on-thames.pages.dev';

// wrangler pages dev runs these functions locally.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

function servesDirectly(hostname) {
  if (hostname === CANONICAL_HOST) return true;
  if (LOCAL_HOSTS.has(hostname)) return true;
  return hostname !== PAGES_DEV_HOST && hostname.endsWith(PREVIEW_SUFFIX);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (servesDirectly(url.hostname)) {
    return context.next();
  }

  url.hostname = CANONICAL_HOST;
  url.protocol = 'https:';
  // A non-default port would survive the hostname swap and produce
  // https://walton-on-thames.org:8788/... , which resolves nowhere.
  url.port = '';

  return Response.redirect(url.toString(), 301);
}
