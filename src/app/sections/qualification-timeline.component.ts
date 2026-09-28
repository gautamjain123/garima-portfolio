import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JOURNEY, QUALIFICATIONS } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

/** Journey + qualifications as big ruled rows that slide on hover. */
@Component({
  selector: 'app-qualification-timeline',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="qualifications" class="quals" aria-labelledby="quals-title">
      <div class="quals__rail">
        <h2 id="quals-title" class="label">(03) journey &amp; qualifications</h2>
        <ol class="quals__path" aria-label="Preparation stages">
          @for (s of stages; track s.title; let last = $last) {
            <li [class.is-now]="s.current" [attr.aria-current]="s.current ? 'step' : null">
              {{ s.title.toLowerCase() }}@if (s.current) {<span class="visually-hidden"> (current stage)</span>}
            </li>
            @if (!last) {<li aria-hidden="true" class="quals__arrow">→</li>}
          }
        </ol>
      </div>

      <ol class="quals__list" appReveal="stagger">
        @for (q of items; track q.title) {
          <li class="quals__row" [class.is-current]="q.current">
            <span class="quals__year mono">{{ q.period.toLowerCase() }}</span>
            <div class="quals__main">
              <h3 class="quals__title">{{ q.title.toLowerCase() }}</h3>
              <p class="quals__desc">{{ q.description }}</p>
            </div>
            <span class="quals__inst">{{ q.institution }}</span>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .quals { @include m.rail-section; }
    .quals__rail { display: flex; flex-direction: column; gap: 20px; }
    .quals__path { display: flex; flex-wrap: wrap; gap: 4px 8px; font-size: 15px; line-height: 1.6; color: var(--c-muted);
      .is-now { color: var(--c-accent); }
      .quals__arrow { color: var(--c-faint); } }
    .quals__list { border-top: 1px solid var(--c-line); }
    .quals__row {
      display: grid; gap: 8px; padding: 28px 0; border-bottom: 1px solid var(--c-line);
      transition: padding var(--d-base) var(--ease-out), color var(--d-fast);
      @include m.laptop { grid-template-columns: 180px minmax(0, 1fr) 300px; gap: 32px; align-items: baseline; padding: 36px 0; }
      &:hover { color: var(--c-accent); @include m.laptop { padding-left: 16px; } }
      &.is-current { color: var(--c-accent); }
    }
    .quals__year { font-size: 14px; color: var(--c-dim); }
    .quals__main { display: flex; flex-direction: column; gap: 8px; }
    .quals__title { font-size: var(--t-h3); font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; }
    .quals__desc { font-size: 15px; line-height: 1.6; color: var(--c-muted); max-width: 560px;
      max-height: 0; overflow: hidden; opacity: 0; transition: max-height var(--d-base) var(--ease-out), opacity var(--d-base);
      @include m.below-laptop { max-height: none; opacity: 1; } }
    .quals__row:hover .quals__desc, .quals__row:focus-within .quals__desc { max-height: 6em; opacity: 1; }
    .quals__inst { font-size: 15px; color: var(--c-muted); }
  `,
})
export class QualificationTimelineComponent {
  protected readonly items = QUALIFICATIONS;
  protected readonly stages = JOURNEY;
}
