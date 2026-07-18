// Fetches the live sitemap and submits every URL to IndexNow's bulk endpoint
// (shared by Bing, Yandex, Seznam, Naver and Yep — Google does not participate).
// Run via `node scripts/submit-indexnow.mjs`. Requires Node 18+ (built-in fetch).

const HOST = 'walton-on-thames.org';
const KEY = 'd3c5876c6afa37f184974da2849bec30255de7ebd83770ec26aa5c7af602deaa';
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const sitemapRes = await fetch(SITEMAP_URL);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${sitemapRes.status}`);
  }
  const sitemapXml = await sitemapRes.text();

  const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    throw new Error('No URLs found in sitemap — aborting rather than submitting an empty list.');
  }
  console.log(`Found ${urlList.length} URLs in sitemap.`);

  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  const text = await res.text();
  console.log(`IndexNow response: HTTP ${res.status}`);
  if (text) console.log(text);

  // 200 = OK, 202 = Accepted (key received but not yet fully verified)
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow submission failed with HTTP ${res.status}`);
  }
  console.log('IndexNow submission successful.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
