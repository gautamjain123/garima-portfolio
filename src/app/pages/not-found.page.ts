import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf">
      <p class="label">(404)</p>
      <h1 class="nf__title">this page is <em>still being written.</em></h1>
      <p class="nf__text">The link may be old, or the note may have moved. Let’s get you back on track.</p>
      <div class="nf__ctas">
        <a routerLink="/" class="btn btn--solid">back home <span class="btn__arrow" aria-hidden="true">→</span></a>
        <a routerLink="/blog" class="btn">read the blog <span class="btn__arrow" aria-hidden="true">→</span></a>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .nf { @include m.container; min-height: 80svh; padding-top: calc(var(--nav-h) + 96px); padding-bottom: 96px; display: flex; flex-direction: column; gap: 28px; }
    .nf__title { @include m.heading(var(--t-h1)); max-width: 1100px; }
    .nf__text { max-width: 520px; color: var(--c-ink-2); font-size: var(--t-body-lg); }
    .nf__ctas { display: flex; flex-wrap: wrap; gap: 12px; }
  `,
})
export default class NotFoundPage implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly meta = inject(Meta);
  ngOnInit(): void {
    this.seo.update({ title: 'Page not found', description: 'This page could not be found.', path: '/404' });
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }
}
