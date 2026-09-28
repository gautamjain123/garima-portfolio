import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BLOG_CATEGORIES } from '../../core/models/blog-post.model';
import { BlogService } from '../../core/services/blog.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { BlogCardComponent } from './blog-card.component';

@Component({
  selector: 'app-blog-preview',
  imports: [RouterLink, RevealDirective, BlogCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="blog" class="blog" aria-labelledby="blog-title">
      <div class="blog__rail">
        <p class="label">(05) notes &amp; reflections</p>
        <p class="blog__intro">thoughts on society, governance, books, current affairs — and everything that makes me curious.</p>
        <ul class="blog__chips" aria-label="Browse by category">
          @for (c of categories; track c) {
            <li><a class="chip" routerLink="/blog" [queryParams]="{ category: c }">{{ c.toLowerCase() }}</a></li>
          }
        </ul>
      </div>
      <div class="blog__body">
        <h2 id="blog-title" class="blog__title" appReveal>notes<em> &amp; reflections</em></h2>
        <div class="blog__list" appReveal="stagger">
          @for (p of posts(); track p.id; let i = $index) {
            <app-blog-card [post]="p" [number]="(i + 1).toString().padStart(2, '0')" [variant]="p.featured ? 'featured' : 'row'" />
          }
        </div>
        <a routerLink="/blog" class="btn blog__all">all notes <span class="btn__arrow" aria-hidden="true">↗</span></a>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .blog { @include m.rail-section; }
    .blog__rail { display: flex; flex-direction: column; gap: 18px; }
    .blog__intro { font-size: 15px; line-height: 1.6; color: var(--c-muted); }
    .blog__chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .blog__body { display: flex; flex-direction: column; gap: 48px; min-width: 0; }
    .blog__title { @include m.heading(var(--t-display)); line-height: 0.88; }
    .blog__list { border-top: 1px solid var(--c-line); }
    .blog__all { align-self: flex-start; }
  `,
})
export class BlogPreviewComponent {
  private readonly blog = inject(BlogService);
  protected readonly categories = BLOG_CATEGORIES;
  protected readonly posts = toSignal(this.blog.getAll(), { initialValue: [] });
}
