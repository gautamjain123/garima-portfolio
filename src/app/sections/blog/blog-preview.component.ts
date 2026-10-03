import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
        <p class="label">(06) stories</p>
        <p class="blog__intro">people, places, kitchens and questions — written down before they slip away.</p>
        <ul class="blog__chips" aria-label="Browse by category">
          @for (c of categories(); track c) {
            <li><a class="chip" routerLink="/blog" [queryParams]="{ category: c }">{{ c.toLowerCase() }}</a></li>
          }
        </ul>
      </div>
      <div class="blog__body">
        <h2 id="blog-title" class="blog__title" appReveal>stories<em> from the road</em></h2>
        <div class="blog__grid" appReveal="stagger">
          @for (p of posts(); track p.id; let first = $first) {
            <app-blog-card [post]="p" [variant]="first ? 'hero' : 'card'" [class.blog__hero]="first" />
          }
        </div>
        <a routerLink="/blog" class="btn blog__all">all stories <span class="btn__arrow" aria-hidden="true">↗</span></a>
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
    .blog__grid {
      display: grid; gap: 40px 24px;
      @include m.tablet { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      @include m.laptop { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 28px; }
    }
    .blog__hero { @include m.tablet { grid-column: 1 / -1; } @include m.laptop { grid-column: span 2; grid-row: span 2; } }
    .blog__hero:only-child { @include m.laptop { grid-column: 1 / -1; } }
    .blog__all { align-self: flex-start; }
  `,
})
export class BlogPreviewComponent {
  private readonly blog = inject(BlogService);
  protected readonly posts = toSignal(this.blog.getAll(), { initialValue: [] });
  /** Only categories that have at least one story. */
  protected readonly categories = computed(() => BLOG_CATEGORIES.filter((c) => this.posts().some((p) => p.category === c)));
}
