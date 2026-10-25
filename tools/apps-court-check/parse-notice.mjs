// Read text nodes, not comments, attributes or embedded scripts. Only the
// weekly notice in main is authoritative; the reusable announcement is not.
import { parse } from 'parse5';

export function parseNotice(html) {
  const result = { verdict: 'unrecognised', mainNotices: [], notes: [] };
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
      }
      return;
    }
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(mains[0]);
  if (result.mainNotices.length !== 1) {
    if (result.mainNotices.length > 1) result.verdict = 'conflicting';
    return result;
  }
  const notice = result.mainNotices[0].text;
  if (/^(?:THE )?CAR BOOT IS (?:NOT OPEN|CLOSED)\b/i.test(notice)) result.verdict = 'off';
  else if (/^(?:THE )?CAR BOOT IS OPEN\b/i.test(notice)) result.verdict = 'on';
  return result;
}
