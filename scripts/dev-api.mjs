// Runs the Vercel functions in api/ locally, so the subscribe form works under `ng serve`.
// `npm start` launches this alongside the Angular dev server, which forwards /api/* here
// (see proxy.conf.json). Keys come from .env.local — copy .env.example and fill it in.
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const PORT = 4301;

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

createServer(async (req, res) => {
  const name = new URL(req.url, 'http://x').pathname.replace(/^\/api\//, '').replace(/[^a-z0-9-]/gi, '');
  const file = resolve('api', `${name}.mjs`);
  if (!name || !existsSync(file)) {
    res.writeHead(404, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Not found' }));
  }

  let raw = '';
  for await (const chunk of req) raw += chunk;
  let body = raw;
  try { body = raw ? JSON.parse(raw) : {}; } catch { /* leave as text */ }

  // The small slice of Vercel's request/response helpers the functions use.
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (data) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(data)); return res; };

  try {
    const { default: handler } = await import(`${pathToFileURL(file).href}?t=${Date.now()}`); // re-import so edits apply
    await handler(Object.assign(req, { body }), res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) res.status(500).json({ error: 'Function crashed — see the terminal.' });
  }
}).listen(PORT, () => {
  const keys = process.env.MAILERLITE_API_KEY ? 'MailerLite key loaded' : 'no MAILERLITE_API_KEY in .env.local — the form will say it isn’t set up';
  console.log(`api/ functions on http://localhost:${PORT} (${keys})`);
});
