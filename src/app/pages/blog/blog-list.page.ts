import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BLOG_CATEGORIES, BlogCategory } from '../../core/models/blog-post.model';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { BlogCardComponent } from '../../sections/blog/blog-card.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'app-blog-list-page',
  imports: [RouterLink, PageHeaderComponent, BlogCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      index="stories"
      title="stories"
      emphasis="from the road"
      lede="People, places, kitchens and questions — oral histories, photo essays and field notes, written down before they slip away."
    >
      <nav aria-label="Filter by category">
        <ul class="chips">
          <li>
            <a class="chip" routerLink="/blog" [class.is-active]="!activeCategory()" [attr.aria-current]="!activeCategory() ? 'page' : null">all</a>
          </li>
          @for (c of categories; track c) {
            <li>
              <a
                class="chip"
                routerLink="/blog"
                [queryParams]="{ category: c }"
                [class.is-active]="activeCategory() === c"
                [attr.aria-current]="activeCategory() === c ? 'page' : null"
                >{{ c.toLowerCase() }}</a
              >
            </li>
          }
        </ul>
      </nav>
    </app-page-header>

    <div class="list">

      <p class="list__count" aria-live="polite">
        {{ visible().length }} {{ visible().length === 1 ? 'story' : 'stories' }}{{ activeCategory() ? ' in ' + activeCategory()!.toLowerCase() : '' }}
      </p>

      <div class="list__grid">
        @for (p of visible(); track p.id; let first = $first) {
          <app-blog-card [post]="p" [variant]="first ? 'hero' : 'card'" [class.list__hero]="first" />
        } @empty {
          <p class="list__empty">Nothing here yet — the first story in this category is on its way.</p>
        }
      </div>
    </div>
  `,
  styles: `
    @use 'mixins' as m;
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .list { @include m.container; padding-block: 32px var(--section-y); display: flex; flex-direction: column; gap: 24px; }
    .list__count { @include m.label; }
    .list__grid {
      display: grid; gap: 40px 24px; border-top: 1px solid var(--c-line); padding-top: 32px;
      @include m.tablet { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      @include m.laptop { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 28px; }
    }
    .list__hero { @include m.tablet { grid-column: 1 / -1; } @include m.laptop { grid-column: span 2; grid-row: span 2; } }
    .list__empty { grid-column: 1 / -1; }
    .list__empty { padding: 40px 0; color: var(--c-muted); font-size: var(--t-lead); }
  `,
})
export default class BlogListPage implements OnInit {
  /** Bound from ?category= via withComponentInputBinding() */
  readonly category = input<string | undefined>();

  private readonly blog = inject(BlogService);
  private readonly seo = inject(SeoService);
  protected readonly categories = BLOG_CATEGORIES;

  private readonly all = toSignal(this.blog.getAll(), { initialValue: [] });
  protected readonly featured = toSignal(this.blog.getFeatured());

  protected readonly activeCategory = computed<BlogCategory | null>(() => {
    const c = this.category();
    return (BLOG_CATEGORIES as readonly string[]).includes(c ?? '') ? (c as BlogCategory) : null;
  });

  protected readonly visible = computed(() => {
    const cat = this.activeCategory();
    const featuredId = this.featured()?.id;
    void featuredId;
    return this.all().filter((p) => (cat ? p.category === cat : true));
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Stories from the road',
      description: 'Oral histories, photo essays and travel stories by Garima Jain — people, places, food and culture across India.',
      path: '/blog',
    });
  }
}
