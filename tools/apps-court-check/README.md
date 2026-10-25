# Apps Court status checks

The checker reads the official HTTPS URL directly with an identified user agent.
It does not use a proxy service, a search cache or a challenge solver. HTTP
errors, redirects, incomplete responses, stale response metadata and Cloudflare
challenges refuse publication. Fresh HTTP delivery is distinct from a freshly
written notice: only an explicit day, month and year for the current/coming
Sunday can support a conclusion. An ordinal alone is deliberately inconclusive.

Run `node --test tools/apps-court-check/*.test.mjs` to test the safety rules.
Run `node tools/apps-court-check/run-check.mjs` for a read-only check, or add
`--write` to update the JSON only after a conclusive read. No fetch-service
secrets are needed. Failed attempts leave the status file byte-for-byte intact;
stdout and the workflow artifact record the failure. `verifiedAt` records only
successful verification, with a UK time and timezone shown to readers.

The workflow runs at 04:05 and 19:05 Europe/London and offers a manual dry run
(default on). These times have a 15-hour gap, not a 12-hour maximum. GitHub can
delay or drop schedules; a separate cloud monitor must alert if runs stop.
After tests and the site build, it commits the status, generates lastmod from
full history, commits the manifest and pushes both commits together. A racing
push fails instead of rebasing a decision onto unseen content. The canonical
page must then expose the new verification timestamp; failure is reported even
if the repository push succeeded.

## Activation checks still required

- Run the manual dry run on a GitHub runner. Previously observed runner reads
  were challenged; this implementation does not claim to fix source access.
- Inspect actual main-notice HTML against the parser's supported paragraph or
  heading structure. Synthetic test fixtures are not proof of live compatibility.
- Establish a successful conclusive read with a full published event date.
- Test failure notification delivery and an independently missed-run alert.
  A failed Actions run alone does not guarantee the owner receives an email.
- Inspect the Cloudflare dashboard HTML cache rule described in CLAUDE.md. Its
  seven-day TTL conflicts with timely updates. Verify the canonical page after
  deployment; changing response headers in this repo alone may not override it.
- Perform a conclusive end-to-end run and confirm the displayed timestamp.

The page deliberately omits dated Event sub-events. Legacy records without the
new explicit-date verification fields show an unconfirmed state and their old
check date; they are not silently promoted to successful automated verification.
The last successful dated statement is labelled as historical verification and
never rolls forward. This remains truthful if subsequent checks fail.
