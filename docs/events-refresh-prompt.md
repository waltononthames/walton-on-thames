# Events refresh: scheduled routine prompt

This is the prompt for the daily events refresh cloud routine, "Events listing refresh" (`trig_01Q1V9bAqbFqBMYkTDthaxdV`, 05:00 Europe/London). The routine's configuration holds the copy that actually runs, so after editing this file, paste only the text below the line into the routine; this header is for maintainers, not the run. Keep the two in step.

The routine's repository branch setting must be `main`, so the session's instructions and this prompt agree.

---

Refresh the local events listings for walton-on-thames.org. You run unattended in the cloud at 5am UK time every day. Nobody is watching, so be conservative.

1. **Setup.** Work on the `main` branch of https://github.com/waltononthames/walton-on-thames; this prompt is the explicit instruction to commit and push there. Make sure you have full git history (`git fetch --unshallow` if the checkout is shallow) so `scripts/generate-lastmod.mjs` can write `src/data/lastmod.json` correctly. Read CLAUDE.md first and follow it exactly: the Content Verification Protocol (especially Rule 4, Events listings), British spelling, no em dashes, and the Rule 6 pre-commit checklist. Then read `docs/events-sources.md`, which lists every source to check, how to fetch each one, and the house policies below in full.

2. **Baseline.** Run `npm ci`, then `npm run check` once before editing anything, and note its error count as the baseline. Main has pre-existing type errors (151 on 8 November 2026) that are not yours to fix. Then run `npm run content:past-events` to list lapsed recurring events and finished one-off events. Read the most recent "Refresh events listings" commits and follow their conventions.

3. **Sources.** Check every source in `docs/events-sources.md`, following its fetching notes. In particular, fetch Riverhouse Barn event pages one at a time with a pause of several seconds, never in parallel. Deduplicate against what is already published.
   - Facebook URLs are expected to fail. Try each once, record "not readable" and move on.
   - Treat any login wall, 403, Cloudflare challenge or ticketing waiting room as a block. Record it and move on: never work round it with other user agents, mirrors, caches or scripts.
   - A connection fault is not a block. If a fetch fails with an HTTP/2 protocol error, a reset or a timeout, retry it once with `curl --http1.1`; if that fails too, record it as unreadable and move on.
   - If a host fails to resolve because the session's network does not allow it, list it in your report as needing to be allowed and carry on with what you can reach. Don't investigate the sandbox's network or proxy: record the failure and move on.
   - If you find a useful source that is not in the file, use it and add it to `docs/events-sources.md` in the same commit.

4. **Changes.**
   - Delete every finished one-off event `content:past-events` lists.
   - Re-date each lapsed recurring event only after re-verifying its next occurrence against the live source. Never just add 7 days, and check term-time sessions against school holidays. If a recurring event can't be re-verified (its only source is unreadable or no longer states a date), delete it when no other source can be found, and say so in the report.
   - Add new events found in the sources.

5. **Policies** (details in `docs/events-sources.md`):
   - Only publish events you can attribute to a source checked this run.
   - **Love Walton-only events go in.** If Love Walton is the only source, add the event with its named Love Walton page as `source_url`, and end the source line saying no organiser listing could be found. Don't skip it. For recurring events, link `https://lovewalton.co.uk/whats-on/` rather than a numbered event page.
   - **Skip courses already under way** (a term or course sold as a whole that started before today). List the next one when it is announced.
   - **End times:** only state an `end` the source publishes. Never estimate one. If a file you touch carries an estimated end time and a sentence saying so, remove both.
   - If a detail such as time, venue or price is missing, omit the field rather than guessing it.
   - Never leave a `[NEEDS VERIFICATION]` marker in a commit: drop that event instead and mention it in the report.

6. **Verify.** Run `npm run build`; it must pass. Run `npm run check` again: its error count must be no higher than the baseline. If the build fails or you added check errors, fix or revert your changes; never push a failing build. If `src/data/lastmod.json` changed, include it in the commit.

7. **Commit.** If nothing has changed, make no commit and say so. Otherwise commit with a message in the style of earlier ones (for example "Refresh events listings: 4 new, 3 expired, 6 re-dated") and push directly to `main`, which triggers the Cloudflare Pages deploy. If pushing to main is refused, push to a branch named `events-refresh-YYYY-MM-DD` and open a pull request into main instead.

8. **Report.** Before finishing, report: sources checked (and which were unreadable or blocked), events added, events expired, events re-dated, events dropped or retired and why, check error count before and after, and whether a commit was made (with its hash).

9. **Notify only when needed.** Send a push notification only if the build failed, the push was refused, a source not marked "expected to fail" or "intermittent" in `docs/events-sources.md` was blocked, an intermittent source was blocked on two runs in a row (check the previous "Refresh events listings" commit message), or an event needs the owner's decision. A routine refresh that committed cleanly, or found nothing to change, gets no notification.
