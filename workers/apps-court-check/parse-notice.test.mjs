// Tests for parse-notice.mjs. Run with: node workers/apps-court-check/parse-notice.test.mjs
//
// These use hand-written fixtures rather than a saved copy of the farm's page,
// so they stay readable and keep testing the cases that actually matter --
// above all the one where the stale site-wide strip disagrees with the weekly
// notice inside <main>, which is the failure mode that would put wrong
// information on the live site.

import { parseNotice } from './parse-notice.mjs';

let failures = 0;

const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL  ${name}\n      expected ${JSON.stringify(expected)}\n      actual   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok    ${name}`);
  }
};

const page = ({ strip, main }) => `<!doctype html><html><head><title>CAR BOOT | Apps Court</title></head>
<body>
  ${strip ? `<section class="announcement sqs-announcement"><p>${strip}</p></section>` : ''}
  <nav><a href="/">Home</a></nav>
  <main id="page">
    ${main ? `<p>${main}</p>` : ''}
    <p>Apps Court hosts one of the largest car boot sales in the country.</p>
  </main>
  <footer><p>Call 01932 244 822</p></footer>
</body></html>`;

// --- the live wording on 24 October 2026 -----------------------------------
{
  const r = parseNotice(page({
    strip: 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH',
    main: 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH',
  }));
  check('closed, with day, both copies agreeing: verdict', r.verdict, 'off');
  check('closed, with day: day read', r.bannerDayOfMonth, 25);
  check('closed, with day: one notice in main', r.mainNotices.length, 1);
  check('closed, with day: one notice in strip', r.announcementNotices.length, 1);
  check('closed, with day: strip not double-counted as main', r.otherNotices.length, 0);
  check('closed, with day: no notes', r.notes, []);
}

// --- the three known wordings ---------------------------------------------
check('open', parseNotice(page({ main: 'THE CAR BOOT IS OPEN THIS SUNDAY' })).verdict, 'on');
check('not open', parseNotice(page({ main: 'THE CAR BOOT IS NOT OPEN THIS SUNDAY' })).verdict, 'off');
check('closed', parseNotice(page({ main: 'THE CAR BOOT IS CLOSED THIS SUNDAY' })).verdict, 'off');

// "NOT OPEN" must never be read as "OPEN": the substring is right there, and
// getting this backwards would advertise a cancelled sale.
check(
  'NOT OPEN is not misread as OPEN',
  parseNotice(page({ main: 'THE CAR BOOT IS NOT OPEN THIS SUNDAY THE 2ND' })).bannerDayOfMonth,
  2,
);

// --- the stale strip, which is the whole reason this parser exists ---------
{
  const r = parseNotice(page({
    strip: 'THE CAR BOOT IS OPEN THIS SUNDAY',
    main: 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH',
  }));
  check('strip says open while main says closed: main wins', r.verdict, 'off');
  check('strip says open while main says closed: disagreement recorded', r.notes.length, 1);
}
{
  // The reverse, which is the September 2026 situation: the strip advertised a
  // sale while the real notice called it off.
  const r = parseNotice(page({
    strip: 'THE CAR BOOT IS OPEN THIS SUNDAY',
    main: 'THE CAR BOOT IS NOT OPEN THIS SUNDAY',
  }));
  check('stale strip advertising a cancelled sale: still off', r.verdict, 'off');
}
{
  // A strip with no notice in <main> must NOT produce a verdict.
  const r = parseNotice(page({ strip: 'THE CAR BOOT IS OPEN THIS SUNDAY', main: null }));
  check('strip only, nothing in main: unrecognised', r.verdict, 'unrecognised');
  check('strip only: no main notices', r.mainNotices.length, 0);
}

// --- the fail-closed cases -------------------------------------------------
check('no notice anywhere', parseNotice(page({})).verdict, 'unrecognised');
check('empty string', parseNotice('').verdict, 'unrecognised');
check('undefined', parseNotice(undefined).verdict, 'unrecognised');
check(
  'cloudflare interstitial is reported as blocked, not unrecognised',
  parseNotice('<html><head><title>Just a moment...</title></head><body><script>window._cf_chl_opt={};</script></body></html>').verdict,
  'blocked',
);
{
  // Two different notices inside <main> is not something to pick between.
  const r = parseNotice(`<main><p>THE CAR BOOT IS OPEN THIS SUNDAY</p><p>THE CAR BOOT IS CLOSED THIS SUNDAY</p></main>`);
  check('two differing notices in main: conflicting', r.verdict, 'conflicting');
}

// --- things that must not be mistaken for the notice ----------------------
{
  // The FAQ prose discusses the sale being called off. It must not match.
  const r = parseNotice(page({
    main: 'THE CAR BOOT IS OPEN THIS SUNDAY',
  }).replace('</main>', '<p>If we know the Car Boot is likely to be called off we will give notice.</p></main>'));
  check('FAQ prose does not add a notice', r.mainNotices.length, 1);
  check('FAQ prose does not change the verdict', r.verdict, 'on');
}
{
  // A notice-like phrase inside inline JS or JSON is not the notice.
  const html = `<main><script>var t = "THE CAR BOOT IS OPEN THIS SUNDAY";</script><p>THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH</p></main>`;
  const r = parseNotice(html);
  check('phrase inside <script> is ignored: verdict', r.verdict, 'off');
  check('phrase inside <script> is ignored: only one notice', r.mainNotices.length, 1);
}
{
  // Entities and collapsed whitespace in the markup.
  const r = parseNotice('<main><p>THE&nbsp;CAR  BOOT\n IS\tCLOSED THIS SUNDAY THE 25TH</p></main>');
  check('entities and whitespace: verdict', r.verdict, 'off');
  check('entities and whitespace: text normalised', r.mainNotices[0].text, 'CAR BOOT IS CLOSED THIS SUNDAY THE 25TH');
}
{
  // An out-of-range day must be dropped, not written to the site.
  const r = parseNotice('<main><p>THE CAR BOOT IS CLOSED THIS SUNDAY THE 45TH</p></main>');
  check('out-of-range day is dropped', r.bannerDayOfMonth, null);
  check('out-of-range day is noted', r.notes.length, 1);
}
{
  // If the farm ever moves the notice to a non-section element, say so rather
  // than silently reading the strip as the weekly notice.
  const r = parseNotice('<div class="announcement"><p>THE CAR BOOT IS OPEN THIS SUNDAY</p></div><main><p>Nothing here.</p></main>');
  check('announcement on a <div> is treated as the strip', r.announcementNotices.length, 1);
  check('announcement on a <div> yields no verdict', r.verdict, 'unrecognised');
}

// --- the closing TIME, which is not a cancellation ------------------------
// Caught by running the parser against the live page: the standing prose
// "The car boot is closed from 1pm" matched the notice pattern and turned
// every run into a false "conflicting". It must be ignored entirely.
{
  const r = parseNotice(page({
    main: 'THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH',
  }).replace('</main>', '<p>The car boot is closed from 1pm.</p></main>'));
  check('closing time sentence does not conflict', r.verdict, 'off');
  check('closing time sentence is not a main notice', r.mainNotices.length, 1);
  check('closing time sentence is recorded as ignored', r.ignoredNotices.length, 1);
  check('closing time sentence adds no note', r.notes, []);
}
{
  // The closing time alone, with no weekly notice, must not yield a verdict.
  const r = parseNotice(page({}).replace('</main>', '<p>The car boot is closed from 1pm.</p></main>'));
  check('closing time alone: no verdict', r.verdict, 'unrecognised');
  check('closing time alone: no main notices', r.mainNotices.length, 0);
}
{
  // The farm's theme puts announcement-classed <a> and <nav> elements inside
  // the strip. Those must not warn, or every run carries the same noise.
  const html = '<section class="announcement"><nav class="announcement-bar-nav"><a class="announcement-bar-close" href="#">x</a></nav><p>THE CAR BOOT IS OPEN THIS SUNDAY</p></section><main><p>THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH</p></main>';
  const r = parseNotice(html);
  check('announcement elements inside the strip: only the disagreement is noted', r.notes.length, 1);
  check('announcement elements inside the strip: no structural warning', r.notes.filter((n) => /class "announcement"/.test(n)).length, 0);
  check('announcement elements inside the strip: main still wins', r.verdict, 'off');
}

// --- nesting, so the strip's range ends where it really ends ---------------
{
  // An announcement-classed <nav> wrapping a nested <nav>: a naive
  // "next </nav>" would end the range early and leak the strip's wording into
  // the <main> reading.
  const html = '<nav class="announcement-bar"><nav class="inner"><a href="#">x</a></nav><p>THE CAR BOOT IS OPEN THIS SUNDAY</p></nav><main><p>THE CAR BOOT IS NOT OPEN THIS SUNDAY</p></main>';
  const r = parseNotice(html);
  check('nested strip: wording stays in the strip', r.announcementNotices.length, 1);
  check('nested strip: main notice is the only main one', r.mainNotices.length, 1);
  check('nested strip: verdict from main', r.verdict, 'off');
}
{
  // A void element carrying the class must not swallow the document.
  const r = parseNotice('<img class="announcement" src="x.png"><main><p>THE CAR BOOT IS OPEN THIS SUNDAY</p></main>');
  check('void element with announcement class does not suppress the notice', r.verdict, 'on');
}

console.log(failures === 0 ? '\nAll parser tests passed.' : `\n${failures} test(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
