const PAGES_DEV_HOST = 'walton-on-thames.pages.dev';
const CANONICAL_HOST = 'walton-on-thames.org';

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === PAGES_DEV_HOST) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
