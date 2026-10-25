// Direct, identified HTTPS only. No residential proxies or challenge bypass.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
export const SOURCE_URL = 'https://www.appscourtfarm.com/carboot';
export const redact = (text) => String(text);
export async function fetchPage({ strategy = 'direct', timeoutMs = 45000, execute = exec, now = Date.now } = {}) {
  const out = { ok: false, html: null, httpStatus: null, bytes: 0, error: null, readVia: 'a direct HTTPS fetch' };
  if (strategy !== 'direct') return { ...out, error: 'Only direct fetching is supported.' };
  try {
    const { stdout } = await execute('curl', [
      '--silent', '--show-error', '--proto', '=https',
      '--max-time', String(timeoutMs / 1000), '--max-filesize', '2000000',
      '--user-agent', 'WaltonOnThamesBot/1.0 (+https://walton-on-thames.org/about/)',
      '--header', 'Accept: text/html', '--header', 'Cache-Control: no-cache',
      '--dump-header', '-', '--write-out', '\n%{http_code}', SOURCE_URL,
    ], { timeout: timeoutMs + 1000, maxBuffer: 2100000 });
    const split = stdout.lastIndexOf('\n');
    out.httpStatus = Number(stdout.slice(split + 1));
    let body = stdout.slice(0, split);
    let headers = '';
    // Consume proxy CONNECT / informational headers as well as the final block.
    while (body.startsWith('HTTP/')) {
      const end = body.indexOf('\r\n\r\n');
      if (end < 0) throw new Error('Incomplete HTTP headers.');
      headers = body.slice(0, end);
      body = body.slice(end + 4);
    }
    if (out.httpStatus !== 200) throw new Error(`Source returned HTTP ${out.httpStatus}.`);
    if (!/^content-type:\s*text\/html\b/im.test(headers)) throw new Error('Response was not HTML.');
    const age = headers.match(/^age:\s*(\d+)/im);
    if ((age && Number(age[1]) > 0) || /^cf-cache-status:\s*(HIT|STALE|UPDATING)\b/im.test(headers)) {
      throw new Error('Source returned cached or stale content; fresh verification unavailable.');
    }
    const serverDate = Date.parse(headers.match(/^date:\s*(.+)/im)?.[1] ?? '');
    if (!Number.isFinite(serverDate) || Math.abs(now() - serverDate) > 300000) {
      throw new Error('Source response date is absent or stale.');
    }
    out.html = body;
    out.bytes = Buffer.byteLength(body);
    out.ok = true;
  } catch (error) {
    out.error = error.message;
  }
  return out;
}
