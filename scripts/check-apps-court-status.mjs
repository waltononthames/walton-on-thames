// Reads Apps Court Farm's car boot page and reports whether the sale is on or
// off for the coming Sunday. Report-only for now: it prints a JSON verdict and
// never writes src/data/apps-court-status.json. The write path is deliberately
// a separate change, so this can be proved against the live site first.
//
// Two things make this page awkward, and both are handled below.
//
// 1. The page is behind a Cloudflare challenge, so a plain fetch() gets an
//    interstitial rather than the page. It needs a real browser engine, which
//    is why this uses Playwright rather than fetch + a parser.
//
// 2. The wording appears TWICE. The block inside <main> is the weekly notice
//    and is the only one that counts. A separate site-wide strip
//    (section.announcement, above the nav) carries near-identical wording but
//    is a stale reusable element: in September 2026 it read "THE CAR BOOT IS
//    OPEN THIS SUNDAY" while linking to a 2025 Christmas shop product. Both
//    are reported separately here so they can never be confused, and the
//    verdict is taken from the <main> one alone.
//
// The notice uses a small fixed vocabulary -- "IS OPEN", "IS NOT OPEN",
// "IS CLOSED" -- and since 24 October 2026 it has also carried the date
// ("THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH"). Anything outside that
// vocabulary is reported as "unrecognised" rather than guessed at.

import { chromium } from 'playwright';

const SOURCE_URL = 'https://www.appscourtfarm.com/carboot';
const NOTICE_RE = /CAR\s+BOOT\s+IS\s+(NOT\s+OPEN|OPEN|CLOSED)/i;

const browser = await chromium.launch();
const context = await browser.newContext({
  locale: 'en-GB',
  timezoneId: 'Europe/London',
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();

const report = {
  checkedAtISO: new Date().toISOString(),
  checkedLondon: new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short',
  }).format(new Date()),
  sourceUrl: SOURCE_URL,
  fetchOk: false,
  httpStatus: null,
  challenged: null,
  pageTitle: null,
  mainNotices: [],
  announcementNotices: [],
  verdict: 'unrecognised',
  bannerDayOfMonth: null,
  bannerMonth: null,
  notes: [],
};

try {
  const response = await page.goto(SOURCE_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  report.httpStatus = response ? response.status() : null;

  // Cloudflare's managed challenge resolves itself after a moment; give it a
  // chance rather than declaring the source unreachable on the interstitial.
  await page.waitForTimeout(5_000);
  try {
    await page.waitForSelector('main', { timeout: 20_000 });
  } catch {
    report.notes.push('No <main> element appeared within 20s of load.');
  }

  report.pageTitle = await page.title();

  const scraped = await page.evaluate((reSource) => {
    const re = new RegExp(reSource, 'i');
    const isAnnouncement = (el) =>
      Boolean(el.closest('section.announcement, .announcement, [class*="announcement" i]'));

    // Leaf elements only, so a verdict is never taken from a wrapper that
    // happens to contain the whole page's text.
    const leaves = Array.from(document.querySelectorAll('body *'))
      .filter((el) => el.children.length === 0)
      .filter((el) => re.test((el.textContent || '').replace(/\s+/g, ' ')));

    const describe = (el) => ({
      text: (el.textContent || '').replace(/\s+/g, ' ').trim(),
      tag: el.tagName.toLowerCase(),
      inMain: Boolean(el.closest('main')),
      inAnnouncement: isAnnouncement(el),
    });

    const all = leaves.map(describe);
    return {
      all,
      bodyHasChallengeText: /just a moment|checking your browser|enable javascript and cookies/i
        .test(document.body.innerText || ''),
    };
  }, NOTICE_RE.source);

  report.challenged = scraped.bodyHasChallengeText;
  report.mainNotices = scraped.all.filter((n) => n.inMain && !n.inAnnouncement);
  report.announcementNotices = scraped.all.filter((n) => n.inAnnouncement);

  const unplaced = scraped.all.filter((n) => !n.inMain && !n.inAnnouncement);
  if (unplaced.length) {
    report.notes.push(
      `${unplaced.length} notice-like element(s) matched outside both <main> and the announcement strip: ` +
      JSON.stringify(unplaced.map((n) => n.text)),
    );
  }

  report.fetchOk = !scraped.bodyHasChallengeText && Boolean(report.pageTitle);

  // The verdict comes from the <main> notice only.
  if (report.mainNotices.length === 0) {
    report.notes.push('No notice matched inside <main>; verdict left unrecognised.');
  } else {
    const texts = [...new Set(report.mainNotices.map((n) => n.text.toUpperCase()))];
    if (texts.length > 1) {
      report.verdict = 'conflicting';
      report.notes.push(`<main> carried ${texts.length} differing notices: ${JSON.stringify(texts)}`);
    } else {
      const text = texts[0];
      if (/CAR\s+BOOT\s+IS\s+(NOT\s+OPEN|CLOSED)/i.test(text)) report.verdict = 'off';
      else if (/CAR\s+BOOT\s+IS\s+OPEN/i.test(text)) report.verdict = 'on';

      const day = text.match(/\b(\d{1,2})\s*(?:ST|ND|RD|TH)\b/i);
      if (day) report.bannerDayOfMonth = Number(day[1]);
      const month = text.match(/\b(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)\b/i);
      if (month) report.bannerMonth = month[1].toUpperCase();
    }
  }
} catch (error) {
  report.notes.push(`Threw while reading the source: ${error.message}`);
} finally {
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));

// Report-only: a failed read is reported, not thrown, so the probe always
// publishes its findings. The scheduled job that eventually writes the status
// file is the thing that must fail closed.
