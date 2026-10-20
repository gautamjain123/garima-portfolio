import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTERESTS } from '../core/data/site-content';
import { storyTitle } from '../core/data/story-title';
import { RevealDirective } from '../core/directives/reveal.directive';

/**
 * A single dot-separated run of big words. Hovering / focusing a word lights
 * it up and shows its one-line reason underneath.
 */
@Component({
  selector: 'app-interests',
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="interests" class="interests" aria-labelledby="interests-title">
      <div class="interests__rail">
        <h2 id="interests-title" class="label">(03) what catches my eye</h2>
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
        <div class="interests__foot">
          <p id="interest-why" class="interests__why" aria-live="polite">
            <span class="interests__why-k">{{ current().title.toLowerCase() }} —</span>
            <span class="it">{{ current().description }}</span>
          </p>
          @if (current().image && current().story) {
            <a class="interests__shot" [routerLink]="['/blog', current().story]" data-cursor="READ">
              <span class="interests__frame">
                @for (it of interests; track it.title; let i = $index) {
                  @if (it.image) {
                    <img [src]="it.image" [alt]="active() === i ? it.imageAlt : ''" [class.is-on]="active() === i"
                      loading="lazy" decoding="async" />
                  }
                }
              </span>
              <span class="interests__story">
                <span class="mono">from the story</span>
                <span class="interests__story-t">{{ title(current().story!) }} <span aria-hidden="true">↗</span></span>
              </span>
            </a>
          }
        </div>
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
    .interests__foot { display: grid; gap: 24px; border-top: 1px solid var(--c-line); padding-top: 20px;
      @include m.tablet { grid-template-columns: minmax(0, 1fr) minmax(220px, 300px); gap: 40px; align-items: start; } }
    .interests__why { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: baseline; font-size: var(--t-lead); max-width: 900px; min-height: 3.2em; }
    .interests__why-k { color: var(--c-dim); font-size: 0.7em; }

    // The active word's photo: all frames are stacked and cross-fade, so switching words never waits on a load.
    .interests__shot { display: flex; flex-direction: column; gap: 10px; color: inherit; max-width: 360px;
      &:hover .interests__story-t { color: var(--c-accent); } }
    .interests__frame { position: relative; display: block; aspect-ratio: 4 / 3; border-radius: var(--r-img); overflow: hidden; background: var(--c-surface);
      img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.04);
        transition: opacity var(--d-base), transform 0.9s var(--ease-out); }
      img.is-on { opacity: 1; transform: none; } }
    .interests__story { display: flex; flex-direction: column; gap: 2px;
      .mono { font-size: 12px; color: var(--c-dim); } }
    .interests__story-t { font-size: 15px; font-weight: 600; line-height: 1.3; transition: color var(--d-fast); }
  `,
})
export class InterestsComponent {
  protected readonly interests = INTERESTS;
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.interests[this.active()]);
  protected readonly title = storyTitle;
}
