import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { INTERESTS } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

/**
 * A single dot-separated run of big words. Hovering / focusing a word lights
 * it up and shows its one-line reason underneath.
 */
@Component({
  selector: 'app-interests',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="interests" class="interests" aria-labelledby="interests-title">
      <div class="interests__rail">
        <h2 id="interests-title" class="label">(02) what keeps me curious</h2>
      </div>
      <div class="interests__body">
        <ul class="interests__list" appReveal>
          @for (it of interests; track it.title; let i = $index; let last = $last) {
            <li>
              <button
                type="button"
                class="interests__word"
                [class.is-active]="active() === i"
                [attr.aria-describedby]="'interest-why'"
                (mouseenter)="active.set(i)"
                (focus)="active.set(i)"
                (click)="active.set(i)"
              >{{ it.title.toLowerCase() }}</button>@if (!last) {<span class="interests__sep" aria-hidden="true"> · </span>}
            </li>
          }
        </ul>
        <p id="interest-why" class="interests__why" aria-live="polite">
          <span class="interests__why-k">{{ current().title.toLowerCase() }} —</span>
          <span class="it">{{ current().description }}</span>
        </p>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .interests { @include m.rail-section; }
    .interests__body { display: flex; flex-direction: column; gap: 36px; }
    .interests__list { display: flex; flex-wrap: wrap; align-items: baseline;
      font-size: var(--t-list); line-height: 1.12; font-weight: 600; letter-spacing: -0.035em; }
    .interests__list li { display: inline; }
    .interests__word {
      background: none; border: 0; padding: 0; color: var(--c-fg);
      font: inherit; letter-spacing: inherit; text-align: left;
      transition: color var(--d-fast);
      &:hover, &.is-active { color: var(--c-accent); }
      &:focus-visible { outline-offset: 2px; }
    }
    .interests__sep { color: var(--c-faint); white-space: pre; }
    .interests__why { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: baseline; font-size: var(--t-lead); max-width: 900px;
      border-top: 1px solid var(--c-line); padding-top: 20px; min-height: 3.2em; }
    .interests__why-k { color: var(--c-dim); font-size: 0.7em; }
  `,
})
export class InterestsComponent {
  protected readonly interests = INTERESTS;
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.interests[this.active()]);
}
