// In-text citation linking for long-form history features.
//
// The article markdown keeps plain Harvard author-date citations, exactly as
// an editor writes them: "(Firth, 1894, pp. 194–195; Gurney, 2007)". At build
// time each parenthetical group is split on semicolons, and any part that
// begins with a known cite key (from the source's `cite` list) becomes a link
// to that reference-list entry. The locator ("pp. 194–195") stays inside the
// link text; nothing is reworded.
//
// A part that looks like a citation but matches no source is left as plain
// text and reported, so a missing or ambiguous bibliography entry surfaces in
// the build log instead of silently producing a dead link.

export interface CiteSource {
  id: string;
  cite: string[];
}

export interface LinkResult {
  html: string;
  unmatched: string[];
  linked: number;
}

// Author-date shape: a capitalised name, then a comma or "et al.", then a year
// (optionally with a reprint year or a/b suffix) or "n.d.".
const LOOKS_LIKE_CITATION = /^[A-Z][^,;()]*(,|\bet al\.)[^;()]*?(\b\d{4}[a-z]?(\/\d{4})?\b|n\.d\.)/;

// Text rendered through an Astro expression arrives HTML-escaped, so an
// apostrophe in an author name reaches the matcher as an entity. Compare on
// the decoded form; the displayed text is never changed.
function decodeForMatch(s: string) {
  return s.replace(/&#39;|&#x27;|&apos;|&rsquo;|\u2019/g, "'").replace(/&amp;/g, '&');
}

// A bare date continuing the previous author, as in "(Smith, 2020a; 2020b)".
const BARE_DATE = /^(\d{4}[a-z]?|n\.d\.[a-z]?)$/;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function linkCitations(html: string, sources: CiteSource[]): LinkResult {
  const keys = sources
    .flatMap((s) => s.cite.map((key) => ({ key, id: s.id })))
    .sort((a, b) => b.key.length - a.key.length);
  const unmatched: string[] = [];
  let linked = 0;
  let counter = 0;

  // Only text between tags is considered, so attributes are never rewritten.
  const out = html.replace(/>([^<]+)</g, (whole, textNode: string) => {
    const replaced = textNode.replace(/\(([^()]+)\)/g, (group, inner: string) => {
      const parts = inner.split(/(?<!&#?[a-zA-Z0-9]+);\s*/);
      if (!parts.some((p) => LOOKS_LIKE_CITATION.test(decodeForMatch(p.trim())))) return group;
      let previousAuthor = '';
      const rendered = parts.map((raw) => {
        const part = raw.trim();
        const decoded = decodeForMatch(part);
        const candidate = BARE_DATE.test(decoded) && previousAuthor ? `${previousAuthor}, ${decoded}` : decoded;
        const author = candidate.split(',')[0];
        if (author && LOOKS_LIKE_CITATION.test(candidate)) previousAuthor = author;
        const hit = keys.find(({ key }) => new RegExp(`^${escapeRegExp(key)}(,\\s|$)`).test(candidate));
        if (!hit) {
          if (LOOKS_LIKE_CITATION.test(candidate)) unmatched.push(part);
          return part;
        }
        linked++;
        counter++;
        return `<a class="cite" id="cite-${counter}" href="#ref-${hit.id}">${part}</a>`;
      });
      return `(${rendered.join('; ')})`;
    });
    return `>${replaced}<`;
  });

  return { html: out, unmatched, linked };
}

// APA strings are editor-authored plain text with *asterisks* for italics.
// Escape first, then add emphasis and link bare URLs.
export function renderApa(apa: string): string {
  const escaped = apa
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s<]+?)(?=[.,;)]?(\s|$))/g, '<a href="$1" rel="noopener noreferrer">$1</a>');
}
