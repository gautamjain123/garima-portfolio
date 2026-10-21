// Emails the MailerLite "Blog subscribers" group when a new story is published.
//
// Runs from .github/workflows/notify-subscribers.yml on every push to main that touches
// blog-posts.ts. A story counts as new when it is published (not a draft) now but wasn't in
// the previous commit — so un-drafting a story sends it too. Before sending, it waits until the
// story's page is live on the site, and it never sends the same story twice (it checks
// MailerLite for an earlier campaign with the same name).
//
// By hand:
//   node scripts/notify-subscribers.mjs --slug yakten-through-my-lens --dry-run   writes email-preview.html, sends nothing
//   node scripts/notify-subscribers.mjs --slug yakten-through-my-lens             sends that story
//
// Environment: MAILERLITE_API_KEY, MAILERLITE_SENDER_EMAIL (an address on a domain verified in
//              MailerLite), MAILERLITE_SENDER_NAME, MAILERLITE_GROUP_ID or MAILERLITE_GROUP_NAME
//              (optional), BEFORE_SHA (the commit before the push; set by the workflow), SLUG, DRY_RUN.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const POSTS_FILE = 'src/app/core/data/blog-posts.ts';
const API = 'https://connect.mailerlite.com/api';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true;
};
const slugArg = arg('slug') ?? process.env.SLUG ?? '';
const dryRun = arg('dry-run') === true || process.env.DRY_RUN === 'true';

const site = (readFileSync('src/app/core/data/site-content.ts', 'utf8').match(/siteUrl:\s*'([^']+)'/)?.[1] ?? '').replace(/\/$/, '');

/** Published posts in a version of blog-posts.ts: slug, title, excerpt, cover image. */
function parsePosts(source) {
  const str = (block, key) => block.match(new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'");
  return source.split(/\r?\n  \{\r?\n    id:/).slice(1)
    .map((block) => ({
      slug: str(block, 'slug'),
      title: str(block, 'title'),
      excerpt: str(block, 'excerpt'),
      image: str(block, 'image'),
      imageAlt: str(block, 'imageAlt') ?? '',
      draft: /\n\s*draft: true/.test(block),
    }))
    .filter((p) => p.slug && !p.draft);
}

function postsAt(sha) {
  try {
    return parsePosts(execFileSync('git', ['show', `${sha}:${POSTS_FILE}`], { encoding: 'utf8' }));
  } catch {
    return null; // file didn't exist in that commit, or the commit isn't available
  }
}

const current = parsePosts(readFileSync(POSTS_FILE, 'utf8'));
let toSend;
if (slugArg) {
  toSend = current.filter((p) => p.slug === slugArg);
  if (!toSend.length) throw new Error(`No published story with slug "${slugArg}". Published: ${current.map((p) => p.slug).join(', ')}`);
} else {
  const before = process.env.BEFORE_SHA;
  const previous = before && !/^0+$/.test(before) ? postsAt(before) : null;
  if (!previous) {
    console.log('No earlier commit to compare with, so nothing is treated as new. Use --slug to send a story by hand.');
    process.exit(0);
  }
  const old = new Set(previous.map((p) => p.slug));
  toSend = current.filter((p) => !old.has(p.slug));
}
if (!toSend.length) {
  console.log('No newly published stories in this push.');
  process.exit(0);
}

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function emailHtml(p) {
  const url = `${site}/blog/${p.slug}`;
  const img = p.image ? `${site}/${p.image}` : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)}</title></head>
<body style="margin:0;padding:0;background:#f5efe4;font-family:Helvetica,Arial,sans-serif;color:#1d1a16;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe4;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fffaf2;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:24px 32px 8px;font-size:12px;letter-spacing:.08em;color:#b8471f;font-family:'Courier New',monospace;">A NEW STORY FROM GARIMA JAIN</td></tr>
        <tr><td style="padding:0 32px 16px;font-size:16px;line-height:1.6;color:#5c554c;">Hi {$name|default('there')},</td></tr>
        ${img ? `<tr><td><a href="${url}"><img src="${img}" alt="${esc(p.imageAlt)}" width="600" style="display:block;width:100%;height:auto;border:0;"></a></td></tr>` : ''}
        <tr><td style="padding:28px 32px 8px;font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-.02em;">${esc(p.title)}</td></tr>
        <tr><td style="padding:0 32px 24px;font-size:16px;line-height:1.65;color:#5c554c;">${esc(p.excerpt)}</td></tr>
        <tr><td style="padding:0 32px 36px;"><a href="${url}" style="display:inline-block;background:#1d1a16;color:#fffaf2;text-decoration:none;font-weight:600;font-size:15px;padding:14px 26px;border-radius:999px;">Read the story &rarr;</a></td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #e8dfd0;font-size:12px;line-height:1.6;color:#8a8278;">
          You’re getting this because you subscribed at <a href="${site}" style="color:#8a8278;">${site.replace(/^https?:\/\//, '')}</a>.
          <a href="{$unsubscribe}" style="color:#8a8278;">Unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

if (dryRun) {
  writeFileSync('email-preview.html', emailHtml(toSend[0]));
  console.log(`Dry run: would send ${toSend.map((p) => p.slug).join(', ')}. Preview written to email-preview.html`);
  process.exit(0);
}

const key = process.env.MAILERLITE_API_KEY;
const senderEmail = process.env.MAILERLITE_SENDER_EMAIL;
if (!key || !senderEmail) {
  console.log('::warning::MailerLite isn’t configured (MAILERLITE_API_KEY, MAILERLITE_SENDER_EMAIL), so no email was sent.');
  process.exit(0);
}

async function ml(path, init = {}) {
  const r = await fetch(API + path, {
    ...init,
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', accept: 'application/json' },
  });
  const body = r.status === 204 ? null : await r.json().catch(() => null);
  if (!r.ok) throw new Error(`MailerLite ${init.method ?? 'GET'} ${path} → ${r.status} ${JSON.stringify(body)}`);
  return body;
}

async function groupId() {
  if (process.env.MAILERLITE_GROUP_ID) return process.env.MAILERLITE_GROUP_ID;
  const name = process.env.MAILERLITE_GROUP_NAME || 'Blog subscribers';
  const r = await ml(`/groups?limit=100&filter[name]=${encodeURIComponent(name)}`);
  const group = r?.data?.find((g) => g.name.toLowerCase() === name.toLowerCase());
  if (!group) throw new Error(`MailerLite group "${name}" not found. Create it under Subscribers → Groups.`);
  return group.id;
}

/** Waits until the story's prerendered page is live (unknown URLs fall back to a generic page, so check its canonical link). */
async function waitUntilLive(p, minutes = 15) {
  const url = `${site}/blog/${p.slug}`;
  const deadline = Date.now() + minutes * 60_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
      if (r.ok && (await r.text()).includes(`rel="canonical" href="${url}"`)) return;
    } catch { /* not up yet */ }
    console.log(`Waiting for ${url} to go live…`);
    await new Promise((res) => setTimeout(res, 20_000));
  }
  throw new Error(`${url} wasn’t live after ${minutes} minutes, so no email was sent. Re-run the workflow once the deploy finishes.`);
}

/**
 * Campaigns created earlier, by name, so a re-run never emails the same story twice.
 * A "draft" one is a story whose campaign was created but not sent (a failed run); it gets reused.
 */
async function existingCampaigns() {
  const byName = new Map();
  for (const status of ['sent', 'ready', 'draft']) {
    for (let page = 1; ; page++) {
      const r = await ml(`/campaigns?filter[status]=${status}&limit=100&page=${page}`);
      (r?.data ?? []).forEach((c) => byName.set(c.name, c));
      if (!r?.meta || page >= r.meta.last_page) break;
    }
  }
  return byName;
}

const group = await groupId();
const existing = await existingCampaigns();
for (const p of toSend) {
  const name = `New story: ${p.slug}`;
  const earlier = existing.get(name);
  if (earlier && earlier.status !== 'draft') {
    console.log(`Already emailed "${p.title}" (campaign "${name}" is ${earlier.status}), skipping.`);
    continue;
  }
  await waitUntilLive(p);
  const id = earlier?.id ?? (await ml('/campaigns', {
    method: 'POST',
    body: JSON.stringify({
      name,
      type: 'regular',
      groups: [group],
      emails: [{
        subject: `New story: ${p.title}`,
        from_name: process.env.MAILERLITE_SENDER_NAME || 'Garima Jain',
        from: senderEmail,
        content: emailHtml(p),
      }],
    }),
  })).data.id;
  await ml(`/campaigns/${id}/schedule`, { method: 'POST', body: JSON.stringify({ delivery: 'instant' }) });
  console.log(`Sent "${p.title}" to the subscribers group (campaign ${id}).`);
}
