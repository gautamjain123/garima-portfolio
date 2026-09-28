import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { BLOG_POSTS } from '../data/blog-posts';
import { BlogCategory, BlogPost } from '../models/blog-post.model';

/**
 * Blog data access. Components depend only on this service, so swapping
 * the local array for a real backend is a change in ONE place:
 *
 *   - REST / WordPress:  inject HttpClient, `return this.http.get<BlogPost[]>(url).pipe(map(mapper))`
 *   - Firebase:          `collectionData(query(collection(db, 'posts'), orderBy('date', 'desc')))`
 *   - Sanity / Strapi:   fetch via their JS client and map fields onto BlogPost
 */
@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly posts$: Observable<BlogPost[]> = of(
    [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)),
  );

  getAll(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getFeatured(): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => posts.find((p) => p.featured) ?? posts[0]));
  }

  getLatest(count: number, excludeFeatured = true): Observable<BlogPost[]> {
    return this.posts$.pipe(
      map((posts) => posts.filter((p) => !(excludeFeatured && p.featured)).slice(0, count)),
    );
  }

  getByCategory(category: BlogCategory | null): Observable<BlogPost[]> {
    return this.posts$.pipe(map((posts) => (category ? posts.filter((p) => p.category === category) : posts)));
  }

  getBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => posts.find((p) => p.slug === slug)));
  }

  /** Previous (older) and next (newer) posts relative to a slug. */
  getNeighbours(slug: string): Observable<{ previous?: BlogPost; next?: BlogPost }> {
    return this.posts$.pipe(
      map((posts) => {
        const i = posts.findIndex((p) => p.slug === slug);
        return { next: i > 0 ? posts[i - 1] : undefined, previous: i >= 0 ? posts[i + 1] : undefined };
      }),
    );
  }

  getRelated(post: BlogPost, count = 3): Observable<BlogPost[]> {
    return this.posts$.pipe(
      map((posts) => {
        const others = posts.filter((p) => p.slug !== post.slug);
        const same = others.filter((p) => p.category === post.category);
        const rest = others.filter((p) => p.category !== post.category);
        return [...same, ...rest].slice(0, count);
      }),
    );
  }
}
