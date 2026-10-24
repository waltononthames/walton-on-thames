// Pure parser for Apps Court Farm's car boot notice. Takes the page's raw
// HTML and reports what it says, with no I/O and no DOM, so it runs unchanged
// in a Cloudflare Worker, in Node, and in a test.
//
// Why raw HTML rather than a DOM or HTMLRewriter: the page needs no JavaScript
// to render the notice (a plain curl from a residential IP returns the full
// 112KB page with the notice in the markup), and a string parser is the only
// version of this that can be unit-tested against fixtures without a runtime.
//
// THE IMPORTANT PART: the notice wording appears TWICE on the page.
//
//   * The block inside <main> is the weekly notice. It is the only one that
//     counts, and the verdict here comes from it alone.
//   * A site-wide strip (section.announcement, above the nav) carries
//     near-identical wording but is a stale reusable element. In September
//     2026 it read "THE CAR BOOT IS OPEN THIS SUNDAY" while linking to a 2025
//     Christmas shop product, so trusting it would have advertised a sale that
//     was not happening.
//
// Both are returned separately so they can never be conflated, and a
// disagreement between them is reported rather than resolved.
//
// The notice uses a small fixed vocabulary -- "IS OPEN", "IS NOT OPEN",
// "IS CLOSED" -- and since 24 October 2026 has also carried the day of the
// month ("THE CAR BOOT IS CLOSED THIS SUNDAY THE 25TH"). Anything outside
// that vocabulary returns verdict "unrecognised": the caller must then change
// nothing, because a wrong "on" sends people to a field for nothing.

const NOTICE_RE = /(?:THE\s+)?CAR\s+BOOT\s+IS\s+(NOT\s+OPEN|OPEN|CLOSED)[^<]*/gi;

// The notice always names the day it is about ("...IS CLOSED THIS SUNDAY THE
// 25TH"). Requiring a day reference is what separates the weekly notice from
// the page's standing prose about opening times, which includes the sentence
// "The car boot is closed from 1pm" -- a closing TIME, not a cancellation.
// Without this, that sentence reads as a call-off and the parser reports a
// conflict on every single run. Found by running this against the live page;
// no hand-written fixture would have contained it.
//
// A future notice that names a date without a weekday ("IS CLOSED THE 25TH")
// would fall outside this and be reported as unrecognised, which is the right
// failure: it stops and asks rather than guessing.
const DAY_REFERENCE_RE = /\b(SUNDAY|MONDAY|TODAY|TOMORROW)\b/i;

// Matched by position rather than by walking a tree. Only <section> is used
// for the announcement strip because that is the element the farm's theme
// actually uses; a class match on any other element is still caught by the
// ANNOUNCEMENT_ANY_RE guard below, which reports it instead of guessing.
const MAIN_OPEN_RE = /<main\b[^>]*>/i;
const MAIN_CLOSE_RE = /<\/main\s*>/i;

// Any element carrying an "announcement" class counts as the strip, whatever
// its tag. Keying on <section> alone was too narrow: the farm's theme also
// uses announcement-classed <nav> and <a> elements, and if the stale wording
// were ever moved into an announcement-classed <div> inside <main> it would
// otherwise be read as the weekly notice. Excluding too much is safe -- it
// ends in "unrecognised", which changes nothing -- while excluding too little
// risks publishing the stale strip's wording as fact.
const ANNOUNCEMENT_OPEN_RE =
  /<([a-z][a-z0-9-]*)\b[^>]*\bclass\s*=\s*["'][^"']*\bannouncement\b[^"']*["'][^>]*>/gi;

// Void elements never close, so a range for one would swallow the rest of the
// document and suppress the real notice.
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'source', 'track', 'wbr',
]);

const decode = (s) =>
  s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();

// Script and style bodies are blanked (not removed) so that every remaining
// index still lines up with the original string. Without this, a notice-like
// phrase inside inline JSON or JS would be read as the live notice.
const blankRawTextElements = (html) =>
  html.replace(
    /<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    (match) => ' '.repeat(match.length),
  );

// Depth-aware, so an announcement-classed <nav> containing a nested <nav>
// ends at its own closing tag rather than the inner one.
const closeIndexFor = (html, tag, openTagEndIdx) => {
  const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}\\s*>`, 'gi');
  re.lastIndex = openTagEndIdx;
  let depth = 1;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) return m.index;
    } else if (!m[0].endsWith('/>')) {
      depth += 1;
    }
  }
  return html.length;
};

const announcementRangesFor = (html) => {
  const ranges = [];
  ANNOUNCEMENT_OPEN_RE.lastIndex = 0;
  let open;
  while ((open = ANNOUNCEMENT_OPEN_RE.exec(html)) !== null) {
    const tag = open[1].toLowerCase();
    if (VOID_TAGS.has(tag) || open[0].endsWith('/>')) continue;
    ranges.push({
      from: open.index,
      to: closeIndexFor(html, tag, open.index + open[0].length),
    });
  }
  return ranges;
};

const within = (index, ranges) => ranges.some((r) => index >= r.from && index < r.to);

export function parseNotice(rawHtml) {
  const result = {
    verdict: 'unrecognised',
    mainNotices: [],
    announcementNotices: [],
    otherNotices: [],
    ignoredNotices: [],
    bannerDayOfMonth: null,
    bannerMonth: null,
    notes: [],
  };

  if (typeof rawHtml !== 'string' || rawHtml.length === 0) {
    result.notes.push('No HTML supplied.');
    return result;
  }

  // A Cloudflare interstitial is a successful-looking response with none of
  // the page in it, so it is detected explicitly rather than falling through
  // as "no notice found".
  if (/_cf_chl_opt|<title>\s*Just a moment/i.test(rawHtml)) {
    result.verdict = 'blocked';
    result.notes.push('Cloudflare challenge interstitial returned instead of the page.');
    return result;
  }

  const html = blankRawTextElements(rawHtml);

  const mainOpen = MAIN_OPEN_RE.exec(html);
  if (!mainOpen) {
    result.notes.push('No <main> element in the response.');
  }
  const mainCloseIdx = mainOpen ? html.slice(mainOpen.index).search(MAIN_CLOSE_RE) : -1;
  const mainRange = mainOpen
    ? {
        from: mainOpen.index,
        to: mainCloseIdx === -1 ? html.length : mainOpen.index + mainCloseIdx,
      }
    : null;
  if (mainOpen && mainCloseIdx === -1) {
    result.notes.push('<main> was never closed; treated as running to the end of the document.');
  }

  const announcementRanges = announcementRangesFor(html);

  NOTICE_RE.lastIndex = 0;
  let match;
  while ((match = NOTICE_RE.exec(html)) !== null) {
    const notice = {
      text: decode(match[0]),
      index: match.index,
      inMain: Boolean(mainRange) && within(match.index, [mainRange]),
      inAnnouncement: within(match.index, announcementRanges),
    };
    // Standing prose about opening times, not a notice about a given day.
    if (!DAY_REFERENCE_RE.test(notice.text)) {
      result.ignoredNotices.push(notice);
      continue;
    }
    if (notice.inAnnouncement) result.announcementNotices.push(notice);
    else if (notice.inMain) result.mainNotices.push(notice);
    else result.otherNotices.push(notice);
  }

  if (result.otherNotices.length) {
    result.notes.push(
      `${result.otherNotices.length} notice(s) sat outside both <main> and the announcement ` +
      `strip and were ignored: ${JSON.stringify(result.otherNotices.map((n) => n.text))}`,
    );
  }

  if (result.mainNotices.length === 0) {
    result.notes.push('No notice found inside <main>; nothing may be concluded.');
    return result;
  }

  const distinct = [...new Set(result.mainNotices.map((n) => n.text.toUpperCase()))];
  if (distinct.length > 1) {
    result.verdict = 'conflicting';
    result.notes.push(`<main> carried ${distinct.length} differing notices: ${JSON.stringify(distinct)}`);
    return result;
  }

  const text = distinct[0];
  if (/CAR\s+BOOT\s+IS\s+(NOT\s+OPEN|CLOSED)/i.test(text)) result.verdict = 'off';
  else if (/CAR\s+BOOT\s+IS\s+OPEN/i.test(text)) result.verdict = 'on';

  const day = text.match(/\b(\d{1,2})\s*(?:ST|ND|RD|TH)\b/i);
  if (day) {
    const n = Number(day[1]);
    if (n >= 1 && n <= 31) result.bannerDayOfMonth = n;
    else result.notes.push(`Ignored an out-of-range day of month in the notice: ${day[1]}`);
  }
  const month = text.match(
    /\b(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)\b/i,
  );
  if (month) result.bannerMonth = month[1].toUpperCase();

  // A disagreement with the stale strip is worth recording, but never changes
  // the verdict: <main> wins by design.
  const stripTexts = [...new Set(result.announcementNotices.map((n) => n.text.toUpperCase()))];
  if (stripTexts.length && !stripTexts.includes(text)) {
    result.notes.push(
      `The site-wide announcement strip disagreed with <main> and was ignored. ` +
      `<main>: ${JSON.stringify(text)}; strip: ${JSON.stringify(stripTexts)}`,
    );
  }

  return result;
}
