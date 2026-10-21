// POST /api/subscribe — adds a reader to the MailerLite "Blog subscribers" group.
// Runs as a Vercel serverless function, so the MailerLite token never reaches the browser.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   MAILERLITE_API_KEY      required  MailerLite → Integrations → API → Generate new token
//   MAILERLITE_GROUP_ID     optional  the group's id; without it the group is looked up by name
//   MAILERLITE_GROUP_NAME   optional  defaults to "Blog subscribers"
//
// Double opt-in is a MailerLite account setting (Account settings → Subscribe settings →
// "Double opt-in for API and integrations"). When it's on, new readers get a confirmation
// email first, and the form tells them to check their inbox.

const API = 'https://connect.mailerlite.com/api';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FAILED = 'Couldn’t subscribe you just now. Please try again in a bit.';

let cachedGroupId = process.env.MAILERLITE_GROUP_ID || '';

async function ml(path, key, init = {}) {
  const r = await fetch(API + path, {
    ...init,
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', accept: 'application/json' },
  });
  const body = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, body };
}

/** The group's id, looked up by name once per warm function instance. */
async function groupId(key) {
  if (cachedGroupId) return cachedGroupId;
  const name = process.env.MAILERLITE_GROUP_NAME || 'Blog subscribers';
  const r = await ml(`/groups?limit=100&filter[name]=${encodeURIComponent(name)}`, key);
  const group = r.body?.data?.find((g) => g.name.toLowerCase() === name.toLowerCase());
  if (!group) throw new Error(`MailerLite group "${name}" not found`);
  return (cachedGroupId = group.id);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.MAILERLITE_API_KEY;
  if (!key) return res.status(503).json({ error: 'The newsletter isn’t set up yet.' });

  let body = req.body ?? {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }
  const email = String(body.email ?? '').trim().toLowerCase();
  const name = String(body.name ?? '').trim().slice(0, 80);

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (body.website) return res.status(200).json({ status: 'subscribed' });
  if (!EMAIL.test(email) || email.length > 254) return res.status(400).json({ error: 'Please enter a valid email address.' });

  try {
    const r = await ml('/subscribers', key, {
      method: 'POST',
      body: JSON.stringify({ email, fields: name ? { name } : undefined, groups: [await groupId(key)] }),
    });
    if (r.ok) return res.status(200).json({ status: r.body?.data?.status === 'unconfirmed' ? 'confirm' : 'subscribed' });
    if (r.status === 422) return res.status(400).json({ error: 'Please enter a valid email address.' });
    console.error('MailerLite error', r.status, r.body);
    return res.status(502).json({ error: FAILED });
  } catch (e) {
    console.error('MailerLite request failed', e);
    return res.status(502).json({ error: FAILED });
  }
}
