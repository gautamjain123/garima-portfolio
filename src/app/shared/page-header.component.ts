import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../core/directives/reveal.directive';

/** Large editorial masthead used at the top of inner pages. */
@Component({
  selector: 'app-page-header',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="ph">
      <p class="label">({{ index() }})</p>
      <h1 class="ph__title" appReveal="lines">
        <span>{{ title() }}</span>
        @if (emphasis()) {
          <em>{{ emphasis() }}</em>
        }
      </h1>
      @if (lede()) {
        <p class="ph__lede" appReveal>{{ lede() }}</p>
      }
      <ng-content />
    </header>
  `,
  styles: `
    @use 'mixins' as m;
    .ph {
      @include m.container;
      padding-top: calc(var(--nav-h) + clamp(56px, 9vw, 140px));
      padding-bottom: clamp(40px, 5vw, 72px);
      display: flex; flex-direction: column; gap: clamp(20px, 2.6vw, 32px);
    }
    .ph__title {
      @include m.heading(var(--t-display));
      line-height: 0.88;
      span, em { display: inline-block; margin-right: 0.18em; }
    }
    .ph__lede { max-width: 640px; font-size: var(--t-lead); color: var(--c-muted); line-height: 1.5; }
  `,
})
export class PageHeaderComponent {
  readonly index = input.required<string>();
  readonly label = input('');
  readonly title = input.required<string>();
  readonly emphasis = input('');
  readonly lede = input('');
}
