// Regenerates public/sitemap.xml from the blog data. Run: npm run sitemap
import { readFileSync, writeFileSync } from 'node:fs';
const base = 'https://garimajain.in'; // [replace with your domain]
const src = readFileSync('src/app/core/data/blog-posts.ts', 'utf8');
const slugs = [...src.matchAll(/slug: '(.+?)',/g)].map((m) => m[1]);
const urls = ['/', '/about', '/qualifications', '/blog', '/contact', ...slugs.map((s) => `/blog/${s}`)];
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${base}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`sitemap.xml written with ${urls.length} URLs`);
