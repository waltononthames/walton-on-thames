// Fetches the farm's car boot page. curl, not Node's fetch: measured from the
// same residential machine within seconds of each other, curl returns 200 with
// any user-agent (and 403 with none), while Node's undici returns 403 whatever
// user-agent it sends. The zone weighs the client's TLS/HTTP fingerprint as
// well as the address.
//
// Identified honestly as WaltonOnThamesBot. That works: the farm's zone
// accepts it, and it means they can refuse this deliberately if they ever want
// to, which impersonating a browser would deny them.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);

export const SOURCE_URL = 'https://www.appscourtfarm.com/carboot';
export const USER_AGENT = 'WaltonOnThamesBot/1.0 (+https://walton-on-thames.org/about/)';

// Never let a key reach a log or an error message.
export const redact = (text, key) => (key ? String(text).split(key).join('[REDACTED]') : String(text));

// A fetch service, for hosts the farm's zone refuses directly. Opt-in: set
// CARBOOT_FETCH_STRATEGY=template plus a URL template with {url} and {key}.
// Left unset, nothing here is used and the fetch is direct.
//
// This exists because no datacentre host tested can read the page: six curl
// variants and a real headless Chromium from a GitHub runner, and a Cloudflare
// Worker, were all refused. Using one is a deliberate choice to route around
// protection the farm switched on, which is why it is off by default and has
// to be configured on purpose rather than being the quiet default.
export const buildTemplateUrl = (template, key, target = SOURCE_URL) => {
  if (!template.includes('{url}')) throw new Error('Fetch template must contain a {url} placeholder.');
  if (template.includes('{key}') && !key) throw new Error('Fetch template contains {key} but no API key was supplied.');
  return template.replace('{url}', encodeURIComponent(target)).replace('{key}', encodeURIComponent(key ?? ''));
};

export async function fetchPage({
  strategy = 'direct',
  template,
  apiKey,
  timeoutMs = 45000,
  execute = exec,
  now = Date.now,
} = {}) {
  const out = {
    ok: false, html: null, httpStatus: null, bytes: 0, error: null,
    readVia: strategy === 'template' ? 'a configured fetch service' : 'a direct HTTPS fetch',
    cacheStatus: null,
  };

  let url = SOURCE_URL;
  const direct = strategy !== 'template';
  if (strategy === 'template') {
    try {
      url = buildTemplateUrl(template, apiKey);
    } catch (error) {
      out.error = redact(error.message, apiKey);
      return out;
    }
  } else if (strategy !== 'direct') {
    return { ...out, error: `Unknown fetch strategy ${JSON.stringify(strategy)}.` };
  }

  const args = [
    '--silent', '--show-error', '--proto', '=https',
    '--max-time', String(timeoutMs / 1000), '--max-filesize', '2000000',
    '--dump-header', '-', '--write-out', '\n%{http_code}',
  ];
  // A fetch service sets its own headers upstream; these are for the direct
  // read. An absent user-agent is refused outright, so one is always sent.
  if (direct) {
    args.push('--user-agent', USER_AGENT,
      '--header', 'Accept: text/html',
      '--header', 'Cache-Control: no-cache');
  }
  args.push(url);

  try {
    const { stdout } = await execute('curl', args, { timeout: timeoutMs + 1000, maxBuffer: 2100000 });
    const split = stdout.lastIndexOf('\n');
    out.httpStatus = Number(stdout.slice(split + 1));
    let body = stdout.slice(0, split);
    let headers = '';
    // Consume proxy CONNECT and informational header blocks as well as the final one.
    while (body.startsWith('HTTP/')) {
      const end = body.indexOf('\r\n\r\n');
      if (end < 0) throw new Error('Incomplete HTTP headers.');
      headers = body.slice(0, end);
      body = body.slice(end + 4);
    }

    if (out.httpStatus !== 200) throw new Error(`Source returned HTTP ${out.httpStatus}.`);
    if (direct && !/^content-type:\s*text\/html\b/im.test(headers)) throw new Error('Response was not HTML.');

    // Cache state is RECORDED, not enforced. An earlier version failed the
    // whole check on `CF-Cache-Status: HIT` or any `Age` above zero, but the
    // farm's site is itself behind Cloudflare, so a HIT is the normal case and
    // says nothing about whether the NOTICE is current. It made a working read
    // look like a failure. The real staleness guard is in decide.mjs, which
    // compares the farm's own stated date against the coming Sunday.
    out.cacheStatus = headers.match(/^cf-cache-status:\s*(\S+)/im)?.[1] ?? null;
    const age = Number(headers.match(/^age:\s*(\d+)/im)?.[1] ?? 0);

    // The response's own Date still has to be plausibly current, which catches
    // a grossly replayed or long-cached response. Generous enough not to trip
    // on ordinary edge caching or a minute of clock skew.
    if (direct) {
      const serverDate = Date.parse(headers.match(/^date:\s*(.+)/im)?.[1] ?? '');
      if (!Number.isFinite(serverDate)) throw new Error('Source response carried no usable Date header.');
      const skewMs = Math.abs(now() - serverDate) - age * 1000;
      if (skewMs > 3600000) throw new Error('Source response date is implausibly old; fresh verification unavailable.');
    }

    if (!body.trim()) throw new Error('Source returned an empty body.');

    out.html = body;
    out.bytes = Buffer.byteLength(body);
    out.ok = true;
  } catch (error) {
    // A partial body from a timeout or non-zero exit is never usable evidence.
    out.html = null;
    out.error = redact(error.message, apiKey);
  }

  return out;
}
