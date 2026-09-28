import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../core/models/blog-post.model';
import { ImageFrameComponent } from '../../shared/image-frame.component';

/**
 * One post as a ruled index row: number · title · category · date · ↗.
 * On hover (desktop) a small tilted preview image floats beside the title.
 */
@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, DatePipe, LowerCasePipe, ImageFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = post();
    @if (variant() === 'card' || variant() === 'hero') {
      <article class="card is-zoomable" [class.card--hero]="variant() === 'hero'">
        <a class="card__link" [routerLink]="['/blog', p.slug]" data-cursor="READ">
          <div class="card__img"><app-image-frame [src]="p.image" [alt]="p.imageAlt" placeholder="image" /></div>
          <p class="card__meta"><span class="card__cat">{{ p.category | lowercase }}</span><span><time [attr.datetime]="p.date">{{ p.date | date: 'MMM y' | lowercase }}</time> · {{ p.readTime }} min</span></p>
          <h3 class="card__title">{{ p.title.toLowerCase() }}</h3>
          @if (variant() === 'hero') {<p class="card__excerpt">{{ p.excerpt }}</p>}
        </a>
      </article>
    } @else {
    <article class="row" [class.row--featured]="variant() === 'featured'">
      <a class="row__link" [routerLink]="['/blog', p.slug]" data-cursor="READ">
        <span class="row__n mono">{{ number() }}</span>
        <span class="row__title">{{ p.title.toLowerCase() }}</span>
        <span class="row__cat">{{ p.category.toLowerCase() }}</span>
        <span class="row__meta"><time [attr.datetime]="p.date">{{ p.date | date: 'MMM y' | lowercase }}</time> · {{ p.readTime }} min</span>
        <span class="row__arrow" aria-hidden="true">↗</span>
      </a>
      <div class="row__preview" aria-hidden="true"><app-image-frame [src]="p.image" [alt]="p.imageAlt" placeholder="image" /></div>
    </article>
    }
  `,
  styles: `
    @use 'mixins' as m;
    :host { display: block; }
    .row { position: relative; border-bottom: 1px solid var(--c-line); }
    .row__link {
      display: grid; gap: 6px 24px; padding: 24px 0;
      grid-template-columns: 44px minmax(0, 1fr) 24px;
      align-items: baseline;
      transition: color var(--d-fast), padding var(--d-base) var(--ease-out);
      @include m.laptop { grid-template-columns: 70px minmax(0, 1fr) 190px 130px 30px; padding: 32px 0; }
      &:hover { color: var(--c-accent); @include m.laptop { padding-left: 16px; } }
    }
    .row__n { font-size: 13px; color: var(--c-dim); }
    .row__title { font-size: var(--t-h3); font-weight: 600; letter-spacing: -0.028em; line-height: 1.1; }
    .row__cat, .row__meta { font-size: 14px; color: var(--c-muted); }
    .row__cat, .row__meta { @include m.below-laptop { grid-column: 2; font-size: 13px; } }
    .row__arrow { font-size: 20px; text-align: right; transition: transform var(--d-base) var(--ease-out);
      @include m.below-laptop { grid-row: 1; grid-column: 3; } }
    .row__link:hover .row__arrow { transform: translate(4px, -4px); }
    .row--featured .row__link { color: var(--c-accent); }

    .row__preview {
      position: absolute; right: 360px; top: 50%; width: 240px; aspect-ratio: 4 / 3;
      border-radius: var(--r-img); overflow: hidden; pointer-events: none; z-index: 3;
      app-image-frame { position: absolute; inset: 0; }
      opacity: 0; transform: translateY(-50%) rotate(-4deg) scale(0.9);
      transition: opacity var(--d-fast), transform var(--d-base) var(--ease-out);
      display: none;
      @media (hover: hover) and (pointer: fine) { @include m.laptop { display: block; } }
    }
    .row:hover .row__preview { opacity: 1; transform: translateY(-50%) rotate(-3deg) scale(1); }
    @media (prefers-reduced-motion: reduce) { .row__preview { display: none !important; } }

    // Image card
    .card__link { display: flex; flex-direction: column; gap: 12px; }
    .card__img { position: relative; aspect-ratio: 4 / 3; border-radius: var(--r-img); overflow: hidden;
      app-image-frame { position: absolute; inset: 0; } }
    .card--hero .card__img { @include m.tablet { aspect-ratio: 16 / 10; } }
    .card__meta { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; color: var(--c-dim); margin-top: 4px; }
    .card__cat { color: var(--c-accent); }
    .card__title { font-size: clamp(1.375rem, 1rem + 1vw, 1.875rem); font-weight: 600; letter-spacing: -0.028em; line-height: 1.1;
      transition: color var(--d-fast); text-wrap: balance; }
    .card--hero .card__title { font-size: var(--t-h3); }
    .card__excerpt { font-size: var(--t-body-lg); line-height: 1.6; color: var(--c-muted); max-width: 60ch; }
    .card__link:hover .card__title { color: var(--c-accent); }
  `,
})
export class BlogCardComponent {
  readonly post = input.required<BlogPost>();
  readonly number = input('01');
  readonly variant = input<'featured' | 'standard' | 'row' | 'card' | 'hero'>('row');
}
