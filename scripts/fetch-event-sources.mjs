// Fetches every events source for the daily events refresh, politely and the
// same way every run, so the routine spends its turns on editorial decisions
// rather than on improvising curl loops.
//
// Usage: npm run events:fetch [-- --out <dir>] [-- --no-state] [-- --max-riverhouse <n>]
//
// What it fetches, one request at a time:
//   - every source in scripts/event-sources.json;
//   - the source_url of every lapsed recurring event, so re-dating has fresh text;
//   - the Riverhouse Barn listing, then the event pages it links to that no
//     published event cites yet (new events) plus those cited by lapsed events,
//     about 8 seconds apart. Each page's JSON-LD (dates, prices) is extracted.
//
// What it writes to the output directory (default: <os tmpdir>/events-fetch):
//   - <source-id>.txt   the page as plain text, for reading;
//   - riverhouse-events.json   one record per Riverhouse event page fetched;
//   - status.json   the outcome for every URL.
// It also updates docs/events-refresh-state.json (unless --no-state), which
// remembers each source's last outcome and how many runs in a row it has been
// blocked, so "notify after two blocked runs" survives days with no commit.
//
// Fetching rules it enforces (see docs/events-sources.md, Fetching etiquette):
//   - a login wall, 401/403, Cloudflare challenge or ticketing waiting room is a
//     block: recorded, never worked round, and no more pages from that host;
//   - a connection fault (HTTP/2 protocol error, reset, timeout) gets one retry
//     over HTTP/1.1 and is otherwise recorded as unreadable;
//   - a 429 gets one retry after 20 seconds;
//   - a host the sandbox network refuses is recorded as needing to be allowed.
// It uses curl (not Node's fetch) so the cloud sandbox's HTTPS_PROXY is honoured.
//
// Exit code is 0 even when sources fail: failures are data for the report. The
// final NOTIFY lines say whether the run should send a push notification.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONFIG = JSON.parse(readFileSync(join(ROOT, 'scripts', 'event-sources.json'), 'utf8'));
const STATE_FILE = join(ROOT, 'docs', 'events-refresh-state.json');
const EVENTS_DIR = join(ROOT, 'src', 'content', 'events');
const UA = 'Mozilla/5.0 (compatible; walton-events-refresh; +https://walton-on-thames.org)';
const SAME_HOST_PAUSE = 3;

const args = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const OUT = argValue('--out', join(tmpdir(), 'events-fetch'));
const WRITE_STATE = !args.includes('--no-state');
const MAX_RIVERHOUSE = Number(argValue('--max-riverhouse', '40'));
mkdirSync(OUT, { recursive: true });

const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '');
const isExpectedFail = (url) => CONFIG.expectedFailHosts.some((h) => hostOf(url) === h || hostOf(url).endsWith('.' + h));

// ---------- published events ----------

function frontmatter(raw) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  if (!m) return data;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^"|"$/g, '');
  }
  return data;
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const events = readdirSync(EVENTS_DIR)
  .filter((n) => n.endsWith('.md'))
  .map((n) => ({ file: n, ...frontmatter(readFileSync(join(EVENTS_DIR, n), 'utf8')) }));
const lapsed = events.filter((e) => {
  if (e.recurring !== 'true' || !e.start) return false;
  const d = new Date(e.end || e.start);
  d.setHours(0, 0, 0, 0);
  return d < today;
});
const riverhouseIdsCited = new Set();
const riverhouseIdsLapsed = new Set();
for (const e of events) {
  const id = (e.source_url || '').match(/riverhousebarn\.co\.uk\/events\/(\d+)/)?.[1];
  if (!id) continue;
  riverhouseIdsCited.add(id);
  if (lapsed.includes(e)) riverhouseIdsLapsed.add(id);
}

// ---------- fetching ----------

const lastHit = new Map();
const blockedHosts = new Set();

function curl(url, file, http1) {
  const a = ['-sS', '-L', '--compressed', '--max-time', '40', '-A', UA, '-o', file, '-w', '%{http_code}'];
  if (http1) a.push('--http1.1');
  a.push(url);
  const r = spawnSync('curl', a, { encoding: 'utf8' });
  return { exit: r.status, code: Number(r.stdout) || 0, stderr: (r.stderr || '').trim() };
}

const CONNECTION_FAULTS = new Set([7, 16, 18, 28, 35, 52, 55, 56, 92]);

function classify(r, body, url) {
  if (r.exit === 6 || /CONNECT tunnel failed|Could not resolve proxy|proxy.*(403|denied)/i.test(r.stderr)) {
    return { outcome: 'network-not-allowed', note: r.stderr.slice(0, 160) };
  }
  if (r.exit !== 0) return { outcome: 'connection-fault', note: `curl exit ${r.exit}: ${r.stderr.slice(0, 160)}` };
  if (/Position\s*[\d,]*\s*in the queue|queue-it|waiting room/i.test(body)) return { outcome: 'blocked', note: 'ticketing waiting room' };
  if (/Just a moment\.\.\.|cf-chl|challenge-platform/i.test(body) && r.code >= 400) return { outcome: 'blocked', note: 'Cloudflare challenge' };
  if (r.code === 401 || r.code === 403) return { outcome: 'blocked', note: `HTTP ${r.code}` };
  if (r.code === 429) return { outcome: 'rate-limited', note: 'HTTP 429' };
  if (r.code === 404 || r.code === 410) return { outcome: 'not-found', note: `HTTP ${r.code}` };
  if (r.code >= 500 || r.code === 0) return { outcome: 'unreadable', note: `HTTP ${r.code}` };
  // Login walls are only recognised on Facebook: ordinary sites have "Log in"
  // links too, and A Church Near You tripped a looser test.
  if (hostOf(url) === 'facebook.com' && /log in|log into facebook|you must log in/i.test(body) && !/"startDate"|event_time/i.test(body)) {
    return { outcome: 'blocked', note: 'login wall' };
  }
  if (body.trim().length < 200) return { outcome: 'unreadable', note: `HTTP ${r.code}, empty page` };
  return { outcome: 'ok', note: `HTTP ${r.code}` };
}

async function fetchPage(url, rawFile, pause = SAME_HOST_PAUSE) {
  const host = hostOf(url);
  if (blockedHosts.has(host)) return { outcome: 'skipped', note: 'host blocked earlier this run' };
  const since = (Date.now() - (lastHit.get(host) || 0)) / 1000;
  if (since < pause) await sleep(pause - since);

  let r = curl(url, rawFile, false);
  lastHit.set(host, Date.now());
  let body = existsSync(rawFile) ? readFileSync(rawFile, 'utf8') : '';
  let c = classify(r, body, url);

  if (c.outcome === 'connection-fault') {
    await sleep(pause);
    r = curl(url, rawFile, true);
    lastHit.set(host, Date.now());
    body = existsSync(rawFile) ? readFileSync(rawFile, 'utf8') : '';
    c = classify(r, body, url);
    c.note = `retried over HTTP/1.1: ${c.note}`;
    if (c.outcome === 'connection-fault') c.outcome = 'unreadable';
  } else if (c.outcome === 'rate-limited') {
    await sleep(20);
    r = curl(url, rawFile, false);
    lastHit.set(host, Date.now());
    body = existsSync(rawFile) ? readFileSync(rawFile, 'utf8') : '';
    c = classify(r, body, url);
    if (c.outcome === 'rate-limited') c = { outcome: 'blocked', note: 'HTTP 429 twice' };
  }
  if (c.outcome === 'blocked') blockedHosts.add(host);
  return { ...c, body };
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', pound: '£', rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', ndash: '-', mdash: '-', hellip: '...' };
function toText(html) {
  return html
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr|\/section|\/article)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .split('\n')
    .map((l) => l.replace(/[ \t ]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

function jsonLdEvents(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const d = JSON.parse(m[1]);
      for (const item of [].concat(d['@graph'] || d)) {
        if (!/Event/.test([].concat(item['@type']).join(' '))) continue;
        const offers = [].concat(item.offers || []).map((o) => ({
          type: o['@type'], price: o.price, lowPrice: o.lowPrice, highPrice: o.highPrice, currency: o.priceCurrency, availability: o.availability,
        }));
        out.push({ name: item.name, startDate: item.startDate, endDate: item.endDate, location: item.location?.name, offers });
      }
    } catch { /* malformed block: the text file still has the page */ }
  }
  return out;
}

// ---------- run ----------

const results = [];
function record(id, name, url, status, res, extra = {}) {
  const expected = isExpectedFail(url) || status === 'expected-fail';
  const outcome = res.outcome === 'ok' || !expected ? res.outcome : `${res.outcome} (expected)`;
  results.push({ id, name, url, status: expected ? 'expected-fail' : status || 'normal', outcome, note: res.note, ...extra });
  if (res.body && res.outcome === 'ok') writeFileSync(join(OUT, `${id}.txt`), `${url}\n\n${toText(res.body)}\n`);
}

const queue = CONFIG.sources.map((s) => ({ ...s }));
const seen = new Set(queue.map((s) => s.url));
for (const e of lapsed) {
  const url = e.source_url;
  if (!url || seen.has(url) || /riverhousebarn\.co\.uk\/events\//.test(url)) continue;
  seen.add(url);
  queue.push({ id: `lapsed-${e.file.replace(/\.md$/, '')}`, name: `Source for lapsed event: ${e.title}`, url });
}

for (const s of queue) {
  const res = await fetchPage(s.url, join(OUT, `${s.id}.html`));
  record(s.id, s.name, s.url, s.status, res);
  process.stdout.write(`${res.outcome.padEnd(20)} ${s.id}\n`);
}

// Riverhouse Barn: listing, then event pages one at a time.
const rh = CONFIG.riverhouse;
const rhEvents = [];
const listing = await fetchPage(rh.listing, join(OUT, `${rh.id}.html`), rh.pauseSeconds);
const listingIds = listing.outcome === 'ok' ? [...new Set([...listing.body.matchAll(/riverhousebarn\.co\.uk\/events\/(\d+)/g)].map((m) => m[1]))] : [];
record(rh.id, `${rh.name} listing`, rh.listing, rh.status, listing, { eventIdsOnListing: listingIds.length });
process.stdout.write(`${listing.outcome.padEnd(20)} ${rh.id} (${listingIds.length} event links)\n`);

const newIds = listingIds.filter((id) => !riverhouseIdsCited.has(id));
const toFetch = [...new Set([...riverhouseIdsLapsed, ...newIds])].slice(0, MAX_RIVERHOUSE);
const skippedForCap = [...new Set([...riverhouseIdsLapsed, ...newIds])].length - toFetch.length;
for (const id of toFetch) {
  const url = rh.eventUrl.replace('{id}', id);
  const res = await fetchPage(url, join(OUT, `${rh.id}-${id}.html`), rh.pauseSeconds);
  const reason = riverhouseIdsLapsed.has(id) ? 'cited by a lapsed event' : 'not yet published';
  const jsonld = res.outcome === 'ok' ? jsonLdEvents(res.body) : [];
  record(`${rh.id}-${id}`, `${rh.name} event ${id}`, url, rh.status, res, { reason });
  rhEvents.push({ id, url, reason, outcome: res.outcome, note: res.note, jsonld });
  process.stdout.write(`${res.outcome.padEnd(20)} ${rh.id}-${id} (${reason})\n`);
}
writeFileSync(join(OUT, 'riverhouse-events.json'), JSON.stringify(rhEvents, null, 2) + '\n');

// ---------- state and summary ----------

const SOURCE_KEY = (r) => (r.id.startsWith(`${rh.id}-`) ? rh.id : r.id);
const byKey = new Map();
for (const r of results) {
  const k = SOURCE_KEY(r);
  const prev = byKey.get(k);
  // A source counts as blocked if any of its pages was blocked this run.
  if (!prev || /^blocked/.test(r.outcome)) byKey.set(k, r);
}

const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : { sources: {} };
const runDate = new Date().toISOString().slice(0, 10);
const notify = [];
for (const [k, r] of byKey) {
  if (r.id.startsWith('lapsed-')) continue;
  const prev = state.sources[k] || {};
  const blocked = /^blocked/.test(r.outcome);
  const consecutiveBlocks = blocked ? (prev.lastRun === runDate ? prev.consecutiveBlocks || 1 : (prev.consecutiveBlocks || 0) + 1) : 0;
  state.sources[k] = {
    lastRun: runDate,
    outcome: r.outcome,
    note: r.note,
    consecutiveBlocks,
    lastOk: r.outcome === 'ok' ? runDate : prev.lastOk || null,
  };
  if (blocked && r.status === 'normal') notify.push(`${k} was blocked (${r.note}) and is not marked intermittent or expected-fail`);
  if (blocked && r.status === 'intermittent' && consecutiveBlocks >= 2) notify.push(`${k} has been blocked on ${consecutiveBlocks} runs in a row (${r.note})`);
  if (r.outcome === 'network-not-allowed') notify.push(`${k} needs allowing in the cloud environment's network settings`);
}
state.updated = runDate;
if (WRITE_STATE) writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
writeFileSync(join(OUT, 'status.json'), JSON.stringify({ runDate, results, riverhouse: { listed: listingIds.length, fetched: toFetch.length, skippedForCap } }, null, 2) + '\n');

const counts = results.reduce((m, r) => ((m[r.outcome] = (m[r.outcome] || 0) + 1), m), {});
console.log(`\nfetch-event-sources: ${results.length} URLs, ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ')}.`);
console.log(`Riverhouse Barn: ${listingIds.length} events on the listing, fetched ${toFetch.length} (${newIds.length} not yet published, ${riverhouseIdsLapsed.size} cited by lapsed events)${skippedForCap ? `, ${skippedForCap} left for a later run by --max-riverhouse` : ''}.`);
console.log(`Lapsed recurring events: ${lapsed.length}. Text files, riverhouse-events.json and status.json are in ${OUT}`);
for (const r of results.filter((x) => x.outcome !== 'ok')) console.log(`  ${r.outcome}: ${r.id} ${r.url} (${r.note})`);
console.log(notify.length ? notify.map((n) => `NOTIFY: ${n}`).join('\n') : 'NOTIFY: none needed for sources.');
if (WRITE_STATE) console.log(`State written to docs/events-refresh-state.json: commit it even when no listing changed.`);
