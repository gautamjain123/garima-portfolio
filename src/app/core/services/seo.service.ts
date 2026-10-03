import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE } from '../data/site-content';
import { BlogPost } from '../models/blog-post.model';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  /** Local path ('images/…') or full URL. Defaults to the site's share card. */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  /** Extra JSON-LD for this page (replaces the previous page's). */
  schema?: Record<string, unknown>[];
}

const SITE_NAME = 'Garima Jain';
const DEFAULT_TITLE = 'Garima Jain | Traveller & Storyteller';
const DEFAULT_IMAGE = 'images/og-cover.jpg';
const DEFAULT_IMAGE_ALT = 'Garima Jain — stories, people and places from across India';

/** Social links that are still placeholders ("[handle]") are left out of structured data. */
const realLinks = () => PROFILE.socials.map((s) => s.url).filter((u) => !u.includes('['));

/**
 * Per-page SEO: title, description, canonical, Open Graph / Twitter cards and JSON-LD.
 * Pages are prerendered (app.routes.server.ts), so all of this is in the static HTML that
 * search engines and link-preview bots read — no JavaScript needed on their side.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(config: SeoConfig): void {
    const fullTitle = config.title === DEFAULT_TITLE ? config.title : `${config.title} — ${SITE_NAME}`;
    const url = this.url(config.path);
    const image = this.absolute(config.image ?? DEFAULT_IMAGE);
    const imageAlt = config.imageAlt ?? DEFAULT_IMAGE_ALT;

    this.title.setTitle(fullTitle);
    this.tag('name', 'description', config.description);
    this.tag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    this.tag('name', 'author', PROFILE.name);

    this.tag('property', 'og:site_name', SITE_NAME);
    this.tag('property', 'og:locale', 'en_IN');
    this.tag('property', 'og:type', config.type ?? 'website');
    this.tag('property', 'og:title', fullTitle);
    this.tag('property', 'og:description', config.description);
    this.tag('property', 'og:url', url);
    this.tag('property', 'og:image', image);
    this.tag('property', 'og:image:alt', imageAlt);

    this.tag('name', 'twitter:card', 'summary_large_image');
    this.tag('name', 'twitter:title', fullTitle);
    this.tag('name', 'twitter:description', config.description);
    this.tag('name', 'twitter:image', image);
    this.tag('name', 'twitter:image:alt', imageAlt);

    this.setCanonical(url);
    this.setJsonLd([this.websiteSchema(), ...(config.schema ?? [])]);
  }

  home(): void {
    this.update({
      title: DEFAULT_TITLE,
      description:
        'Garima Jain collects stories — oral histories, photo essays and travel writing about people, places, faith and everyday culture across India.',
      path: '/',
      schema: [this.personSchema()],
    });
  }

  /** For list pages: what the page is, plus the items it lists. */
  collection(config: SeoConfig, posts: BlogPost[]): void {
    this.update({
      ...config,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: config.title,
          description: config.description,
          url: this.url(config.path),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: this.url(`/blog/${p.slug}`), name: p.title })),
          },
        },
        this.breadcrumbs([{ name: 'Stories', path: config.path }]),
      ],
    });
  }

  article(post: BlogPost): void {
    const path = `/blog/${post.slug}`;
    this.update({
      title: post.title,
      description: post.excerpt,
      path,
      image: post.image,
      imageAlt: post.imageAlt,
      type: 'article',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: [this.absolute(post.image)],
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          keywords: (post.tags ?? []).join(', '),
          inLanguage: 'en-IN',
          timeRequired: `PT${post.readTime}M`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': this.url(path) },
          author: this.personRef(),
          publisher: this.personRef(),
        },
        this.breadcrumbs([
          { name: 'Stories', path: '/blog' },
          { name: post.title, path },
        ]),
      ],
    });
    this.tag('property', 'article:published_time', post.date);
    this.tag('property', 'article:modified_time', post.date);
    this.tag('property', 'article:section', post.category);
    this.tag('property', 'article:author', PROFILE.name);
    this.meta.getTags("property='article:tag'").forEach((t) => this.meta.removeTagElement(t));
    (post.tags ?? []).forEach((t) => this.meta.addTag({ property: 'article:tag', content: t }));
  }

  clearArticle(): void {
    for (const p of ['article:published_time', 'article:modified_time', 'article:section', 'article:author']) {
      this.meta.removeTag(`property='${p}'`);
    }
    this.meta.getTags("property='article:tag'").forEach((t) => this.meta.removeTagElement(t));
  }

  /** Pages that shouldn't appear in search results (e.g. 404). */
  noindex(): void {
    this.tag('name', 'robots', 'noindex, follow');
  }

  // ── Structured data ─────────────────────────────────────────

  private websiteSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${PROFILE.siteUrl}/#website`,
      name: SITE_NAME,
      url: PROFILE.siteUrl,
      inLanguage: 'en-IN',
      description: 'Oral histories, photo essays and travel stories from across India.',
      author: this.personRef(),
    };
  }

  private personSchema(): Record<string, unknown> {
    const sameAs = realLinks();
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${PROFILE.siteUrl}/#person`,
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      description: PROFILE.intro,
      url: PROFILE.siteUrl,
      image: this.absolute('images/garima-portrait.jpg'),
      email: `mailto:${PROFILE.email}`,
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'London School of Economics and Political Science' },
        { '@type': 'CollegeOrUniversity', name: 'Lady Shri Ram College for Women' },
      ],
      knowsAbout: ['Public policy', 'Political science', 'Oral history', 'Travel writing', 'Documentary photography', 'Sufi shrines', 'Braj', 'Indian culture'],
      ...(sameAs.length ? { sameAs } : {}),
    };
  }

  private personRef(): Record<string, unknown> {
    return { '@type': 'Person', '@id': `${PROFILE.siteUrl}/#person`, name: PROFILE.name, url: PROFILE.siteUrl };
  }

  private breadcrumbs(trail: { name: string; path: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: this.url(c.path),
      })),
    };
  }

  // ── Helpers ─────────────────────────────────────────────────

  private url(path: string): string {
    return path === '/' ? `${PROFILE.siteUrl}/` : `${PROFILE.siteUrl}${path}`;
  }

  /** Local paths ('images/…') become absolute on the site; external URLs pass through. */
  private absolute(image: string): string {
    return /^https?:\/\//.test(image) ? image : `${PROFILE.siteUrl}/${image.replace(/^\//, '')}`;
  }

  private tag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content } as never, `${attr}='${key}'`);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }

  /** One JSON-LD block per page, replaced on every navigation. */
  private setJsonLd(data: Record<string, unknown>[]): void {
    this.doc.head.querySelectorAll('script[data-seo-ld]').forEach((s) => s.remove());
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-ld', '');
    script.textContent = JSON.stringify(data.length === 1 ? data[0] : data);
    this.doc.head.appendChild(script);
  }
}
