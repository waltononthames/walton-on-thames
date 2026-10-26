// Checks the BUILT page before anything is pushed, so a bad status record can
// never reach readers as published HTML.
//
// The rule it enforces is about agreement, not absence. An earlier version
// asserted that no sub-event could ever appear and that EventScheduled could
// never appear anywhere. That is safe but blunt: it also forbids correctly
// publishing a sale the farm has confirmed for a named date, which is the
// single most useful thing this page can say. What actually matters is that
// the structured data never contradicts the panel, and never carries a date
// the farm did not state.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('dist/things-to-do/apps-court-car-boot-sale/index.html', 'utf8');
const status = JSON.parse(readFileSync('src/data/apps-court-status.json', 'utf8'));

const dateConfirmed = Boolean(status.dateConfirmed && status.eventDateISO);
const londonToday = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());
const datePassed = dateConfirmed && status.eventDateISO < londonToday;
const mayPublishDate = dateConfirmed && !datePassed;

const subEvents = [];
for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  const walk = (value) => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) return value.forEach(walk);
    if (value['@type'] === 'Event' && value.startDate) subEvents.push(value);
    Object.values(value).forEach(walk);
  };
  walk(JSON.parse(match[1]));
}

if (!mayPublishDate) {
  // No confirmed, unexpired date means nothing dated may be published at all.
  assert.equal(subEvents.length, 0,
    `Status has no publishable confirmed date, but ${subEvents.length} dated event(s) were emitted.`);
  assert.ok(!html.includes('https://schema.org/EventScheduled'),
    'EventScheduled must not appear when no date is confirmed.');
} else {
  assert.ok(subEvents.length <= 1, `Expected at most one dated sub-event, found ${subEvents.length}.`);
  for (const event of subEvents) {
    assert.ok(event.startDate.startsWith(status.eventDateISO),
      `Sub-event ${event.startDate} does not match the confirmed date ${status.eventDateISO}.`);
    // The whole point: a called-off sale must never be published as scheduled.
    const expected = status.status === 'on'
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventCancelled';
    assert.equal(event.eventStatus, expected,
      `Sub-event status ${event.eventStatus} contradicts the recorded status "${status.status}".`);
  }
}

// The panel must say something a reader can act on, and must not leak the
// verification machinery into reader-facing prose (CLAUDE.md Rule 3).
const BANNED = [
  'suitable for automatic confirmation',
  'not yet verified',
  'should be checked before publication',
  'fully dated notice',
];
for (const phrase of BANNED) {
  assert.ok(!html.includes(phrase), `Reader-facing page contains internal QA wording: "${phrase}"`);
}

if (status.verifiedAt) {
  assert.ok(html.includes(`data-verified-at="${status.verifiedAt}"`),
    'Built page is missing the verification timestamp the deployment check looks for.');
}

console.log(
  `Built page verified: ${mayPublishDate ? `dated sub-event for ${status.eventDateISO} (${status.status})` : 'no dated sub-event'}, `
  + `${subEvents.length} event block(s), no QA wording.`,
);
