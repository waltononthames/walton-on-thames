import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('dist/things-to-do/apps-court-car-boot-sale/index.html', 'utf8');
const status = JSON.parse(readFileSync('src/data/apps-court-status.json', 'utf8'));
for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  const data = JSON.parse(match[1]);
  function walk(value) {
    if (!value || typeof value !== 'object') return;
    assert.ok(!('subEvent' in value), 'Dated sub-events must not be published');
    assert.notEqual(value.eventStatus, 'https://schema.org/EventScheduled');
    Object.values(value).forEach(walk);
  }
  walk(data);
}
assert.ok(html.includes('Last verified notice'));
if (status.verifiedAt) assert.ok(html.includes(`data-verified-at="${status.verifiedAt}"`));
else assert.ok(html.includes('Current sale date not confirmed'));
console.log('Built status panel and structured data verified.');
