// Submits every URL in the sitemap to IndexNow's bulk endpoint (shared by
// Bing, Yandex, Seznam, Naver and Yep, Google does not participate).
// Run via `node scripts/submit-indexnow.mjs`. Requires Node 18+ (built-in fetch).
//
// Reads the sitemap from a local build (dist/sitemap-0.xml) when present, 
// Cloudflare 403s a live fetch of the sitemap from GitHub Actions runner IPs,
// so CI builds the site first and this reads that output directly. Falls
// back to fetching the live URL for ad-hoc manual runs without a local build.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'walton-on-thames.org';
const KEY = 'd3c5876c6afa37f184974da2849bec30255de7ebd83770ec26aa5c7af602deaa';
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const LOCAL_SITEMAP_PATH = join(process.cwd(), 'dist', 'sitemap-0.xml');

async function main() {
  console.log(`Node ${process.version}, fetch available: ${typeof fetch === 'function'}`);

  let sitemapXml;
  if (existsSync(LOCAL_SITEMAP_PATH)) {
    console.log(`Reading sitemap from local build: ${LOCAL_SITEMAP_PATH}`);
    sitemapXml = readFileSync(LOCAL_SITEMAP_PATH, 'utf8');
  } else {
    console.log(`No local build found, fetching live sitemap: ${SITEMAP_URL}`);
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: HTTP ${sitemapRes.status}`);
    }
    sitemapXml = await sitemapRes.text();
  }

  const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    throw new Error('No URLs found in sitemap, aborting rather than submitting an empty list.');
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
  console.error(err.stack || err.message);
  process.exit(1);
});
