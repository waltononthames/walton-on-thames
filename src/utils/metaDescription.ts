// Bing Webmaster Tools flags meta descriptions that are too short (28
// September 2026 report: 50 listing and event URLs), and Google truncates
// anything much past 160 characters. Many listing and event descriptions are
// a single short sentence written for the page body, so the <meta> tag tops
// them up with facts the page already shows (address, date, venue), never
// with new claims.
const TARGET_MIN = 120;
const MAX = 160;

function asSentence(text: string): string {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

type Extra = string | null | undefined | false;

/**
 * Appends each extra sentence in order while the result stays within 160
 * characters, stopping once it reaches 120. An extra given as an array is a
 * list of fallbacks, longest first: the first one that fits is used. An extra
 * that cannot fit at all is skipped, so a later, shorter one still can. A
 * base that is already long enough is returned unchanged.
 */
export function buildMetaDescription(base: string, extras: Array<Extra | Extra[]>): string {
  let result = asSentence(base);
  for (const extra of extras) {
    if (result.length >= TARGET_MIN) break;
    const options = (Array.isArray(extra) ? extra : [extra]).filter((o): o is string => !!o);
    for (const option of options) {
      const candidate = `${result} ${asSentence(option)}`;
      if (candidate.length <= MAX) {
        result = candidate;
        break;
      }
    }
  }
  return result;
}

/** "Opening hours, phone number and map", listing only what the page has. */
export function listingContents(parts: Array<[boolean, string]>): string | null {
  const present = parts.filter(([has]) => has).map(([, label]) => label);
  if (present.length === 0) return null;
  const joined = present.length === 1
    ? present[0]
    : `${present.slice(0, -1).join(', ')} and ${present[present.length - 1]}`;
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}
