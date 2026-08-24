// Writes src/data/lastmod.json: a map of tracked source file -> ISO date of
// the commit that last touched it.
//
// Why this exists: sitemap lastmod was resolved by shelling out to
// `git log -1 -- <file>` at build time. That is correct locally but wrong in
// production, because Cloudflare Pages clones at depth 1 — with only one
// commit in the repository, every file's "last commit" is HEAD. The live
// sitemap was therefore stamping 341 of 347 URLs with the identical deploy
// timestamp, telling Google the whole site changes on every push. Pages
// offers no way to deepen the clone, so the dates have to travel with the
// repository instead of being derived from it at build time.
//
// Runs in prebuild. On a shallow clone (i.e. on Cloudflare) it exits without
// writing, leaving the committed manifest as the source of truth.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = 'src/data/lastmod.json';

function git(args) {
  return execSync(`git ${args}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

let shallow;
try {
  shallow = git('rev-parse --is-shallow-repository').trim() !== 'false';
} catch {
  shallow = true; // not a git repo, or no git binary
}

if (shallow) {
  console.log('generate-lastmod: shallow clone or no git history — keeping the committed manifest.');
  process.exit(0);
}

// One pass over the whole history. Records the first (most recent) date seen
// for each path, which is that path's last-modified commit.
const dates = new Map();
const log = git('-c core.quotepath=false log --format=%x00%cI --name-only');

let current = null;
for (const line of log.split('\n')) {
  if (line.startsWith('\0')) {
    current = line.slice(1).trim();
  } else if (line.trim() && current && line.startsWith('src/')) {
    if (!dates.has(line)) dates.set(line, current);
  }
}

// Only keep paths that still exist, so deleted files don't bloat the manifest.
const manifest = {};
for (const path of [...dates.keys()].sort()) {
  if (existsSync(path)) manifest[path] = dates.get(path);
}

const json = JSON.stringify(manifest, null, 2) + '\n';
const previous = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';

if (json === previous) {
  console.log(`generate-lastmod: ${Object.keys(manifest).length} entries, unchanged.`);
} else {
  writeFileSync(OUT, json);
  console.log(`generate-lastmod: wrote ${Object.keys(manifest).length} entries to ${OUT}.`);
  console.log('generate-lastmod: manifest changed — COMMIT IT, or production sitemap dates will lag.');
}
