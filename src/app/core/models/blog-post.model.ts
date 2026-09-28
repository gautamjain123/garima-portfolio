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
  /** Path under /public, e.g. 'images/blog/governance.jpg'. Falls back to a styled placeholder if missing. */
  image: string;
  imageAlt: string;
  featured: boolean;
  tags?: string[];
}

export const BLOG_CATEGORIES = [
  'UPSC',
  'Governance',
  'Society',
  'History',
  'Books',
  'Current Affairs',
  'Personal Reflections',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
