import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './core/data/blog-posts';

/**
 * Every page is prerendered to static HTML at build time (outputMode "static"), so search
 * engines and link previews (WhatsApp, LinkedIn, X) see the real title, description and text
 * without running JavaScript. Adding a post to blog-posts.ts adds its page automatically.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'qualifications', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_POSTS.map((p) => ({ slug: p.slug })),
  },
  // Unknown URLs fall back to the client-rendered shell (index.csr.html), which shows the 404 page.
  { path: '**', renderMode: RenderMode.Client },
];
