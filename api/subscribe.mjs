// POST /api/subscribe — adds a reader to the Brevo newsletter list.
// Runs as a Vercel serverless function, so the Brevo API key never reaches the browser.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   BREVO_API_KEY           required  Brevo → SMTP & API → API keys
//   BREVO_LIST_ID           required  the numeric id of the "Blog subscribers" list
//   BREVO_DOI_TEMPLATE_ID   optional  a Double opt-in template id; when set, readers get a
//                                     "confirm your subscription" email before they're added
//   SITE_URL                optional  where the confirm link lands (defaults to the live site)

const BREVO = 'https://api.brevo.com/v3';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!key || !listId) return res.status(503).json({ error: 'The newsletter isn’t set up yet.' });

  let body = req.body ?? {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }
  const email = String(body.email ?? '').trim().toLowerCase();
  const name = String(body.name ?? '').trim().slice(0, 80);

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (body.website) return res.status(200).json({ status: 'subscribed' });
  if (!EMAIL.test(email) || email.length > 254) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const attributes = name ? { FIRSTNAME: name } : undefined;
  const doiTemplate = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const site = (process.env.SITE_URL || 'https://garima-portfolio-three.vercel.app').replace(/\/$/, '');

  const [path, payload, status] = doiTemplate
    ? ['/contacts/doubleOptinConfirmation', { email, attributes, includeListIds: [listId], templateId: doiTemplate, redirectionUrl: `${site}/blog` }, 'confirm']
    : ['/contacts', { email, attributes, listIds: [listId], updateEnabled: true }, 'subscribed'];

  try {
    const r = await fetch(BREVO + path, {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (r.ok) return res.status(200).json({ status });

    const detail = await r.json().catch(() => ({}));
    // Already on the list: treat as success rather than telling a stranger who is subscribed.
    if (detail.code === 'duplicate_parameter') return res.status(200).json({ status });
    console.error('Brevo error', r.status, detail);
    return res.status(502).json({ error: 'Couldn’t subscribe you just now. Please try again in a bit.' });
  } catch (e) {
    console.error('Brevo request failed', e);
    return res.status(502).json({ error: 'Couldn’t subscribe you just now. Please try again in a bit.' });
  }
}
