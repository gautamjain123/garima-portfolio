// Regenerates public/sitemap.xml and public/robots.txt from the site data.
// Runs automatically before every build (see "prebuild" in package.json); or: npm run sitemap
//
// The domain comes from PROFILE.siteUrl in src/app/core/data/site-content.ts — change it there.
import { readFileSync, writeFileSync } from 'node:fs';

const content = readFileSync('src/app/core/data/site-content.ts', 'utf8');
const base = (content.match(/siteUrl:\s*'([^']+)'/)?.[1] ?? '').replace(/\/$/, '');
if (!base) throw new Error('PROFILE.siteUrl not found in site-content.ts');

// Blog posts: slug, date and every photo in the post (for image search).
const posts = readFileSync('src/app/core/data/blog-posts.ts', 'utf8');
const entries = posts.split(/\r?\n  \{\r?\n    id:/).slice(1).map((block) => ({
  slug: block.match(/slug: '(.+?)'/)?.[1],
  date: block.match(/date: '(.+?)'/)?.[1],
  cover: block.match(/image: '(.+?)'/)?.[1],
  photos: [...block.matchAll(/(?:photo|nz)\('([^']+)'/g)].map((m) => m[1]),
  dir: block.match(/images\/blog\/([^/]+)\//)?.[1],
})).filter((p) => p.slug);

const newest = entries.map((p) => p.date).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
const esc = (s) => s.replace(/&/g, '&amp;');
const image = (path) => `    <image:image><image:loc>${esc(`${base}/${path}`)}</image:loc></image:image>`;

const pages = [
  { path: '/', priority: '1.0', lastmod: newest, images: ['images/garima-portrait.jpg'] },
  { path: '/blog', priority: '0.9', lastmod: newest },
  { path: '/about', priority: '0.7' },
  { path: '/qualifications', priority: '0.5' },
  { path: '/contact', priority: '0.6' },
  ...entries.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: '0.8',
    lastmod: p.date,
    images: [p.cover, ...p.photos.map((f) => `images/blog/${p.dir}/${f}.jpg`)].filter(Boolean),
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map((p) =>
    [
      '  <url>',
      `    <loc>${base}${p.path === '/' ? '/' : p.path}</loc>`,
      p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>` : '',
      `    <priority>${p.priority}</priority>`,
      ...[...new Set(p.images ?? [])].map(image),
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>
`;
writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`sitemap.xml (${pages.length} pages) and robots.txt written for ${base}`);
