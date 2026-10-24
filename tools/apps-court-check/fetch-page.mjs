// Gets the car boot page's HTML. Separated from everything else because the
// fetch is the only part that depends on where the check runs, and that
// question took three attempts to answer:
//
//   residential egress, bare curl, no JavaScript   -> 200, full page
//   GitHub Actions + Playwright Chromium           -> 403
//   Cloudflare Worker, honest UA and browser UA    -> 403
//
// Apex and www behave identically, and so do sitemap.xml and robots.txt, so
// the farm's Cloudflare zone refuses datacentre egress at the host level. Two
// strategies follow from that.
//
//   direct    curl, from a machine whose egress the zone accepts. Needs no
//             account and no third party.
//
//             It must be curl, not Node's own fetch. Measured from the same
//             residential machine, the same URL, within seconds of each other:
//
//               curl, honest WaltonOnThamesBot UA   -> 200, full page
//               curl, Chrome UA                     -> 200, full page
//               curl, no UA at all                  -> 403
//               Node fetch (undici), either UA      -> 403, challenge
//
//             So the zone fingerprints the client's TLS/HTTP profile as well
//             as its IP, and undici is refused where curl is accepted. The
//             honest user-agent passes perfectly well, so there is no need to
//             claim to be a browser -- but the request does need a user-agent,
//             as an absent one is refused too.
//
//   template  A fetch service called through a URL template, for running in
//             the cloud where direct egress is refused. Deliberately generic:
//             the template lives in configuration, not in this file, so
//             changing provider needs no code change.
//
// Nothing here parses or decides. It returns bytes and how they were obtained.

const SOURCE_URL = 'https://www.appscourtfarm.com/carboot';

// Honest by default: it names the site and points somewhere explaining what
// this is, so the farm can allow or refuse it deliberately rather than having
// to guess. Worth keeping even behind a fetch service.
const USER_AGENT =
  'Mozilla/5.0 (compatible; WaltonOnThamesBot/1.0; +https://walton-on-thames.org/about/)';

const DIRECT_HEADERS = {
  'User-Agent': USER_AGENT,
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Cache-Control': 'no-cache',
};

/**
 * Builds the request URL for a fetch service from a template.
 *
 * The template uses {key} and {url} placeholders, so any provider taking a
 * GET with an API key and a target URL fits without a code change, e.g.
 *   https://api.example.com/?api_key={key}&url={url}&premium=true
 *
 * {url} is percent-encoded. {key} is not interpolated into logs anywhere.
 */
export const buildTemplateUrl = (template, key, target = SOURCE_URL) => {
  if (!template.includes('{url}')) {
    throw new Error('Fetch template must contain a {url} placeholder.');
  }
  if (template.includes('{key}') && !key) {
    throw new Error('Fetch template contains {key} but no API key was supplied.');
  }
  return template
    .replace('{url}', encodeURIComponent(target))
    .replace('{key}', encodeURIComponent(key ?? ''));
};

// So a failure report can never quote the key back, wherever it is logged.
export const redact = (text, key) =>
  key ? String(text).split(key).join('[REDACTED]') : String(text);

/**
 * @returns {Promise<{ok: boolean, httpStatus: number|null, html: string|null,
 *                     readVia: string, error: string|null, bytes: number}>}
 */
export async function fetchPage({ strategy, template, apiKey, timeoutMs = 45_000 } = {}) {
  const out = {
    ok: false, httpStatus: null, html: null, bytes: 0,
    readVia: strategy === 'template' ? 'a fetch service' : 'a direct fetch',
    error: null,
  };

  // Both strategies go through curl. For "direct" that is the whole point
  // (see above). For "template" it costs nothing and keeps one code path.
  let requestUrl;
  try {
    if (strategy === 'template') {
      if (!template) throw new Error('strategy "template" needs a fetch template.');
      requestUrl = buildTemplateUrl(template, apiKey);
    } else if (strategy === 'direct' || strategy === undefined) {
      requestUrl = SOURCE_URL;
    } else {
      throw new Error(`Unknown fetch strategy ${JSON.stringify(strategy)}.`);
    }
  } catch (error) {
    out.error = redact(error.message, apiKey);
    return out;
  }

  const args = [
    '--silent',
    '--show-error',
    '--location',
    '--max-time', String(Math.ceil(timeoutMs / 1000)),
    // Status code on its own line after the body, so one call yields both
    // without a temporary file.
    '--write-out', '\n%{http_code}',
  ];
  // A fetch service sets its own upstream headers, so these are for "direct".
  if (strategy !== 'template') {
    for (const [name, value] of Object.entries(DIRECT_HEADERS)) {
      args.push('--header', `${name}: ${value}`);
    }
  }
  args.push(requestUrl);

  try {
    const { stdout, stderr, code } = await runCurl(args, timeoutMs);
    if (code !== 0 && !stdout) {
      out.error = redact(stderr?.trim() || `curl exited ${code}`, apiKey);
      return out;
    }
    const split = stdout.lastIndexOf('\n');
    const body = split === -1 ? stdout : stdout.slice(0, split);
    const statusText = (split === -1 ? '' : stdout.slice(split + 1)).trim();
    out.httpStatus = /^\d+$/.test(statusText) ? Number(statusText) : null;
    out.html = body;
    out.bytes = body.length;
    // Never taken as success on the status alone: a fetch service can answer
    // 200 while handing back a challenge page from upstream. parse-notice.mjs
    // detects the interstitial and the decision layer refuses on it.
    out.ok = out.httpStatus !== null && out.httpStatus >= 200 && out.httpStatus < 300;
  } catch (error) {
    out.error = redact(error.message, apiKey);
  }

  return out;
}

// Spawned rather than shelled, so the URL (which carries the API key in the
// template case) is never exposed to a shell or its history.
function runCurl(args, timeoutMs) {
  return new Promise((resolvePromise, reject) => {
    import('node:child_process')
      .then(({ spawn }) => {
        const child = spawn('curl', args, { windowsHide: true });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => {
          child.kill();
          reject(new Error(`curl timed out after ${timeoutMs}ms.`));
        }, timeoutMs + 5_000);
        child.stdout.on('data', (d) => { stdout += d.toString('utf8'); });
        child.stderr.on('data', (d) => { stderr += d.toString('utf8'); });
        child.on('error', (error) => {
          clearTimeout(timer);
          reject(new Error(`could not run curl: ${error.message}`));
        });
        child.on('close', (code) => {
          clearTimeout(timer);
          resolvePromise({ stdout, stderr, code });
        });
      })
      .catch(reject);
  });
}

export { SOURCE_URL };
