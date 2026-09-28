import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE } from '../data/site-content';
import { BlogPost } from '../models/blog-post.model';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

const DEFAULT_TITLE = 'Garima Jain | Traveller & Storyteller';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(config: SeoConfig): void {
    const fullTitle = config.title === DEFAULT_TITLE ? config.title : `${config.title} — Garima Jain`;
    const url = `${PROFILE.siteUrl}${config.path}`;
    const image = `${PROFILE.siteUrl}/${config.image ?? 'images/og-cover.jpg'}`;

    this.meta.removeTag("name='robots'");
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.setCanonical(url);
  }

  home(): void {
    this.update({
      title: DEFAULT_TITLE,
      description:
        'Garima Jain collects stories — oral histories, conversations, photographs and reflections on people, places and cultures across India.',
      path: '/',
    });
    this.setJsonLd('person', this.personSchema());
  }

  article(post: BlogPost): void {
    this.update({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.image,
      type: 'article',
    });
    this.meta.updateTag({ property: 'article:published_time', content: post.date });
    this.meta.updateTag({ property: 'article:section', content: post.category });
    this.setJsonLd('article', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: `${PROFILE.siteUrl}/${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      timeRequired: `PT${post.readTime}M`,
      mainEntityOfPage: `${PROFILE.siteUrl}/blog/${post.slug}`,
      author: this.personSchema(),
    });
  }

  clearArticle(): void {
    this.removeJsonLd('article');
    this.meta.removeTag("property='article:published_time'");
    this.meta.removeTag("property='article:section'");
  }

  private personSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      url: PROFILE.siteUrl,
      email: `mailto:${PROFILE.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
      sameAs: PROFILE.socials.map((s) => s.url),
    };
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

  private setJsonLd(id: string, data: Record<string, unknown>): void {
    this.removeJsonLd(id);
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = `ld-${id}`;
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  private removeJsonLd(id: string): void {
    this.doc.getElementById(`ld-${id}`)?.remove();
  }
}
