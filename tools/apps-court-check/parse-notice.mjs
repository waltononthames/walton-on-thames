// Read text nodes, not comments, attributes or embedded scripts. Only the
// weekly notice in main is authoritative; the reusable announcement is not.
import { parse } from 'parse5';

// "THE CAR BOOT HAS FINISHED FOR THE 2026 SEASON." and, separately,
// "WE WILL BE BACK IN MARCH 2027." The exact sentences are checked in decide.
export const SEASON_RE = /\bcar\s+boot\s+has\s+finished\s+for\s+the\s+\d{4}\s+season\b/i;
export const RETURN_RE = /\bback\s+in\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}\b/i;

export function parseNotice(html) {
  const result = { verdict: 'unrecognised', mainNotices: [], seasonNotices: [], returnNotices: [], notes: [] };
  if (typeof html !== 'string' || !html) return result;
  if (/_cf_chl_opt|<title>\s*Just a moment/i.test(html)) {
    return { ...result, verdict: 'blocked' };
  }
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const mains = [];
  function find(node) {
    if (node.tagName === 'main') mains.push(node);
    for (const child of node.childNodes ?? []) find(child);
  }
  find(doc);
  if (mains.length !== 1 || !mains[0].sourceCodeLocation?.endTag) {
    result.notes.push('Expected exactly one complete main element.');
    return result;
  }
  const excluded = (node) => ['script', 'style', 'template', 'noscript', 'nav', 'footer'].includes(node.tagName)
    || node.attrs?.some(({ name, value }) => name === 'hidden'
      || (name === 'aria-hidden' && value === 'true')
      || (name === 'class' && /\bannouncement\b/i.test(value)));
  function text(node) {
    if (excluded(node)) return '';
    if (node.nodeName === '#text') return node.value;
    return (node.childNodes ?? []).map(text).join(' ');
  }
  function visit(node) {
    if (excluded(node)) return;
    // Paragraphs/headings are the supported publication structure. A change
    // to that structure must be inspected rather than guessed around.
    if (/^(p|h[1-6])$/.test(node.tagName ?? '')) {
      const value = text(node).replace(/\s+/g, ' ').trim();
      if (/\bcar\s+boot\b/i.test(value) && /\b(sunday|monday|today|tomorrow)\b/i.test(value)
        && /\b(open|closed|cancelled|not\s+open)\b/i.test(value)) {
        result.mainNotices.push({ text: value });
      } else if (SEASON_RE.test(value)) {
        result.seasonNotices.push({ text: value });
      } else if (RETURN_RE.test(value)) {
        result.returnNotices.push({ text: value });
      }
      return;
    }
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(mains[0]);

  // End of season. Outside the season the weekly notice is replaced by a
  // statement that the season is over, usually followed by a separate line
  // saying when the sale returns. It is only accepted on its own: alongside a
  // weekly notice, the page contradicts itself and the check refuses.
  if (result.seasonNotices.length > 0) {
    if (result.mainNotices.length > 0 || result.seasonNotices.length > 1 || result.returnNotices.length > 1) {
      result.verdict = 'conflicting';
      return result;
    }
    result.verdict = 'season-ended';
    result.mainNotices = [...result.seasonNotices, ...result.returnNotices];
    return result;
  }

  if (result.mainNotices.length !== 1) {
    if (result.mainNotices.length > 1) result.verdict = 'conflicting';
    return result;
  }
  const notice = result.mainNotices[0].text;
  if (/^(?:THE )?CAR BOOT IS (?:NOT OPEN|CLOSED)\b/i.test(notice)) result.verdict = 'off';
  else if (/^(?:THE )?CAR BOOT IS OPEN\b/i.test(notice)) result.verdict = 'on';
  return result;
}
