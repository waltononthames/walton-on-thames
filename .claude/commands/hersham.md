---
description: Work the next item in the Hersham head-term plan
---

Read `CLAUDE.md`, `docs/hersham-head-term-plan.md`, and the governing documents that plan names before doing anything else.

Target item: $ARGUMENTS

If no item was given above, take the first unchecked item in the lowest incomplete phase. Skip items marked **[Darren]** unless the owner has supplied what they need in this session, and say clearly which ones you skipped and what they are waiting on.

Then:

1. Do the item completely. Do not start a second item until the first is verified.
2. Run `npm run check`, `npm run build`, `npm run seo:validate` and `npm run seo:links`. Prefix the Bash session with `export PATH="/c/nvm4w/nodejs:$PATH"`.
3. Commit `src/data/lastmod.json` if the build changed it.
4. Tick the item in `docs/hersham-head-term-plan.md`.
5. Append an entry to `docs/build-log.md` describing what was built, what was verified, and anything left open.

Hard constraints:

- Any fact you cannot verify against a Tier 1 or Tier 2 source in this session gets a `[NEEDS VERIFICATION]` marker and does not ship.
- Never add prose to `/hersham/` beyond the 900 to 1,100 word band. Depth goes into spokes, never into the hub.
- Check `docs/site-audit.md` before creating any page.
- The working tree may hold unrelated in-progress event edits. Commit only the files you touched, by path. Never `git add -A`.
