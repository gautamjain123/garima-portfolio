import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JOURNEY } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

/** The five stages as one large sentence, with the current stage lit. */
@Component({
  selector: 'app-journey',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="journey" class="journey" aria-labelledby="journey-title">
      <h2 id="journey-title" class="label">(03) the journey</h2>
      <div class="journey__body">
        <ol class="journey__steps" appReveal>
          @for (s of stages; track s.title; let last = $last) {
            <li class="journey__step" [class.is-now]="s.current" [attr.aria-current]="s.current ? 'step' : null" tabindex="0">
              {{ s.title.toLowerCase() }}
              <span class="journey__desc">{{ s.description }}</span>
            </li>
            @if (!last) {<li class="journey__arrow" aria-hidden="true">→</li>}
          }
        </ol>
        <p class="journey__text" appReveal>
          Preparation is not a sprint towards a result date. It is a continuous practice of learning, discipline and
          understanding society — a slow widening of how I see the country, one chapter, one debate, one mistake at a time.
        </p>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .journey { @include m.rail-section; }
    .journey__body { display: flex; flex-direction: column; gap: 40px; }
    .journey__steps { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 0.3em;
      font-size: var(--t-list); line-height: 1.15; font-weight: 600; letter-spacing: -0.035em; }
    .journey__step { position: relative; color: var(--c-faint); transition: color var(--d-fast); cursor: default;
      &.is-now, &:hover, &:focus-visible { color: var(--c-fg); }
      &.is-now { color: var(--c-accent); } }
    .journey__arrow { color: var(--c-faint); font-weight: 300; }
    .journey__desc { position: absolute; left: 0; top: 100%; width: max-content; max-width: 280px; padding-top: 8px;
      font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.5; color: var(--c-muted);
      opacity: 0; pointer-events: none; transition: opacity var(--d-fast); }
    .journey__step:hover .journey__desc, .journey__step:focus-visible .journey__desc { opacity: 1; }
    .journey__text { font-size: var(--t-body-lg); line-height: 1.7; color: var(--c-muted); max-width: 720px; }
  `,
})
export class JourneyComponent {
  protected readonly stages = JOURNEY;
}
