// One-off migration: converts every history/hersham article's `sources:`
// frontmatter array from the old { label, url } shape to a Harvard/APA-ready
// { author, year, title, url, accessed } shape, matching content.config.ts's
// updated historySchema. Does not invent facts: author/title are split out of
// the existing label text (already-verified strings), year defaults to "n.d."
// unless the label itself already states one (e.g. "Wetton (1959) '...'"),
// and accessed reuses the article's own reviewedDate: a real, already-recorded
// fact, rather than a fabricated date. Run with `node scripts/migrate-sources-to-harvard.mjs [--fix]`.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FIX = process.argv.includes('--fix');
const DIRS = ['src/content/history', 'src/content/hersham'];

function formatDate(isoLike) {
  // reviewedDate is stored as an unquoted YAML date (YYYY-MM-DD)
  const d = new Date(isoLike);
  if (isNaN(d.getTime())) return isoLike;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function splitLabel(label) {
  // Case 1: already Harvard-shaped, e.g. Wetton, J. L. and Wetton, N. L. (1959) 'The Surrey ...', Surrey ..., pp. 29-50
  let m = label.match(/^(.+?)\s*\((\d{4})\)\s*'(.+?)'(?:,\s*(.+))?$/);
  if (m) {
    const [, author, year, title] = m;
    return { author: author.trim(), year, title: title.trim() };
  }
  // Case 2: "Publisher: Title" or "Publisher, Title"
  m = label.match(/^([^:—]+)[:—]\s*(.+)$/);
  if (m) {
    const [, author, title] = m;
    return { author: author.trim(), year: 'n.d.', title: title.trim() };
  }
  // Case 3: no separator, treat the whole label as both author and title
  return { author: label.trim(), year: 'n.d.', title: label.trim() };
}

function escapeYamlString(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function migrateFile(path) {
  const text = readFileSync(path, 'utf8');
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return { path, skipped: 'no frontmatter' };
  const fm = fmMatch[1];

  const reviewedMatch = fm.match(/^reviewedDate:\s*(\S+)/m);
  const accessed = reviewedMatch ? formatDate(reviewedMatch[1]) : null;
  if (!accessed) return { path, skipped: 'no reviewedDate found' };

  const sourcesBlockMatch = fm.match(/^sources:\n((?:  - .*\n(?:    .*\n)*)*)/m);
  if (!sourcesBlockMatch) return { path, skipped: 'no sources: block found' };
  const block = sourcesBlockMatch[1];

  // Already migrated? (has "author:" instead of "label:")
  if (/^\s*-\s*author:/m.test(block)) return { path, skipped: 'already migrated' };

  const entries = [...block.matchAll(/-\s*label:\s*"((?:[^"\\]|\\.)*)"\s*\n\s*url:\s*"((?:[^"\\]|\\.)*)"/g)];
  if (entries.length === 0) return { path, skipped: 'no label/url entries matched' };

  const newBlockLines = [];
  for (const [, rawLabel, rawUrl] of entries) {
    const label = rawLabel.replace(/\\"/g, '"');
    const { author, year, title } = splitLabel(label);
    newBlockLines.push(`  - author: "${escapeYamlString(author)}"`);
    newBlockLines.push(`    year: "${year}"`);
    newBlockLines.push(`    title: "${escapeYamlString(title)}"`);
    newBlockLines.push(`    url: "${rawUrl}"`);
    newBlockLines.push(`    accessed: "${accessed}"`);
  }
  const newBlock = newBlockLines.join('\n') + '\n';

  const newFm = fm.replace(sourcesBlockMatch[0], `sources:\n${newBlock}`);
  const newText = text.replace(fmMatch[0], `---\n${newFm}\n---\n`);

  return { path, entries: entries.length, newText, oldFm: fm, newFm };
}

let files = [];
for (const dir of DIRS) {
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.md')) files.push(join(dir, f));
  }
}

let migrated = 0;
let skipped = 0;
for (const path of files) {
  const result = migrateFile(path);
  if (result.skipped) {
    console.log(`SKIP  ${path} (${result.skipped})`);
    skipped++;
    continue;
  }
  console.log(`${FIX ? 'FIXED' : 'WOULD FIX'} ${path} (${result.entries} sources)`);
  if (FIX) {
    writeFileSync(path, result.newText, 'utf8');
  }
  migrated++;
}

console.log(`\n${migrated} file(s) ${FIX ? 'migrated' : 'would be migrated'}, ${skipped} skipped.`);
if (!FIX) console.log('Re-run with --fix to write changes.');
