/**
 * Blog post shape. Kept deliberately flat so it maps 1:1 onto
 * a headless CMS document (Sanity, Strapi, Contentful), a Firestore
 * record, or a WordPress REST response after a small mapper.
 */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  /** Trusted HTML. Supports <p>, <h2>, <h3>, <ul>, <blockquote class="pull-quote">, <figure>. */
  content: string;
  category: BlogCategory;
  /** ISO date, e.g. '2026-09-12' */
  date: string;
  /** Minutes */
  readTime: number;
  /** Path under /public (e.g. 'images/blog/boatman.jpg') or a full image URL. Falls back to a styled placeholder if it fails to load. */
  image: string;
  imageAlt: string;
  featured: boolean;
  tags?: string[];
}

export const BLOG_CATEGORIES = [
  'People',
  'Places',
  'Food',
  'Culture',
  'Photo Essays',
  'Reflections',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
