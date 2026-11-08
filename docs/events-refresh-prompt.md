# Events refresh: scheduled routine prompt

This is the prompt for the daily events refresh cloud routine, "Events listing refresh" (`trig_01Q1V9bAqbFqBMYkTDthaxdV`, 05:00 Europe/London). The routine's configuration holds the copy that actually runs, so after editing this file, paste only the text below the line into the routine; this header is for maintainers, not the run. Keep the two in step.

The routine's repository branch setting must be `main`, so the session's instructions and this prompt agree.

---

Refresh the local events listings for walton-on-thames.org. You run unattended in the cloud at 5am UK time every day. Nobody is watching, so be conservative.

1. **Setup.** Work on the `main` branch of https://github.com/waltononthames/walton-on-thames; this prompt is the explicit instruction to commit and push there. Make sure you have full git history (`git fetch --unshallow` if the checkout is shallow) so `scripts/generate-lastmod.mjs` can write `src/data/lastmod.json` correctly. Read CLAUDE.md first and follow it exactly: the Content Verification Protocol (especially Rule 4, Events listings), British spelling, no em dashes, and the Rule 6 pre-commit checklist. Then read `docs/events-sources.md`, which lists every source to check, how to fetch each one, and the house policies below in full.

2. **Baseline.** Run `npm ci`, then `npm run content:past-events` to list lapsed recurring events and finished one-off events. Read the most recent "Refresh events listings" commits and follow their conventions.

3. **Sources.** Run `npm run events:fetch` with a Bash timeout of 600000 ms (it takes several minutes because it pauses between Riverhouse Barn pages). It fetches every source in `scripts/event-sources.json`, the source of every lapsed recurring event, and the Riverhouse Barn event pages not yet published, one request at a time, and enforces the fetching rules for you. Then read its output:
   - `<out>/<source-id>.txt`: each page as plain text. `<out>` is printed at the end of the run.
   - `<out>/riverhouse-events.json`: the dates and prices from each Riverhouse Barn event page's JSON-LD. A class page's `startDate` is often the first session of the term, so read the term dates from that page's text file.
   - The summary: the outcome for every URL and the `NOTIFY:` lines.
   Don't re-fetch a page the script read successfully. Fetch by hand only pages it doesn't cover, such as an event page linked from a source's text or a performing group's box office. For those, follow `docs/events-sources.md`: one request at a time, a block (login wall, 401/403, Cloudflare challenge, ticketing waiting room) is recorded and never worked round with other user agents, mirrors, caches or scripts, and a connection fault gets one retry with `curl --http1.1`. Don't investigate the sandbox's network or proxy. Deduplicate against what is already published.
   - If you find a useful source that isn't listed, use it, and add it to both `scripts/event-sources.json` and `docs/events-sources.md` in the same commit.

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

6. **Verify.** Run `npm run build`; it must pass, and it already catches frontmatter errors, `[NEEDS VERIFICATION]` markers and em dashes. Run `npm run check` only if you changed a file other than Markdown under `src/content/`, files under `docs/`, `src/data/*.json` or `scripts/event-sources.json`. In that case, compare its error count with the same command on unmodified main (`git stash`, `npm run check`, `git stash pop`); yours must be no higher. If the build fails or you added check errors, fix or revert your changes; never push a failing build. If `src/data/lastmod.json` changed, include it in the commit.

7. **Commit.** Always commit `docs/events-refresh-state.json`, which `events:fetch` updates, so the next run knows which sources were blocked today. If listings changed, commit everything with a message in the style of earlier ones (for example "Refresh events listings: 4 new, 3 expired, 6 re-dated"). If no listing changed, commit only the state file (and `src/data/lastmod.json` if it changed) as "Record events source status: no listing changes". Push directly to `main`, which triggers the Cloudflare Pages deploy. If pushing to main is refused, push to a branch named `events-refresh-YYYY-MM-DD` and open a pull request into main instead.

8. **Report.** Before finishing, report: sources checked (and which were unreadable or blocked, from the `events:fetch` summary plus any pages you fetched by hand), events added, events expired, events re-dated, events dropped or retired and why, whether `npm run check` ran (and its counts if so), and the commit hash.

9. **Notify only when needed.** Send a push notification only if the build failed, the push was refused, `events:fetch` printed a `NOTIFY:` line other than "none needed", a page you fetched by hand was blocked on a source not marked "expected to fail" or "intermittent", or an event needs the owner's decision. A routine refresh that committed cleanly, or found nothing to change, gets no notification.
