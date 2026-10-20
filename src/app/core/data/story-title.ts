import { BLOG_POSTS } from './blog-posts';

/** The title of the blog post with this slug, lower-cased for the site's link style. */
export const storyTitle = (slug: string): string =>
  (BLOG_POSTS.find((p) => p.slug === slug)?.title ?? 'read the story').toLowerCase();
