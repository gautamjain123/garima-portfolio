import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT, ABOUT_PHOTOS, MANIFEST, STATS } from '../../core/data/site-content';
import { storyTitle } from '../../core/data/story-title';
import { CountUpDirective } from '../../core/directives/count-up.directive';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { ImageFrameComponent } from '../../shared/image-frame.component';

/** The manifest: short, bold statements with ghosted endings. */
@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective, CountUpDirective, ImageFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="manifest" class="about" aria-labelledby="about-title">
      <h2 id="about-title" class="label">(01) manifest</h2>

      <div class="about__body">
        <p class="about__lines" appReveal="lines">
          @for (l of manifest.lines; track $index) {
            <span><span>{{ l[0] }}</span><span class="ghost">{{ l[1] }}</span></span>
          }
        </p>

        <div class="about__cols" appReveal="stagger">
          <p>{{ about.statement }}</p>
          @for (p of about.paragraphs; track $index) {
            <p>{{ p }}</p>
          }
        </div>

        <ul class="about__photos" appReveal="stagger" aria-label="From the latest stories">
          @for (ph of photos; track ph.image; let i = $index) {
            <li class="about__photo about__photo--{{ i }}">
              <a [routerLink]="['/blog', ph.story]" data-cursor="READ">
                <app-image-frame [src]="ph.image" [alt]="ph.alt" />
                <span class="about__photo-cap">
                  <span class="mono">{{ ph.caption }}</span>
                  <span class="about__photo-title">{{ title(ph.story) }} <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </li>
          }
        </ul>

        @if (showStats()) {
          <dl class="about__stats" appReveal="stagger">
            @for (s of stats; track s.label) {
              <div class="about__stat">
                <dt class="visually-hidden">{{ s.label }}</dt>
                <dd class="about__stat-value" [appCountUp]="s.value" [suffix]="s.suffix ?? ''">{{ s.value }}{{ s.suffix }}</dd>
                <dd class="about__stat-label" aria-hidden="true">{{ s.label }}</dd>
              </div>
            }
          </dl>
        }

        <p class="about__closing" appReveal>{{ manifest.closing[0] }}<span class="it">{{ manifest.closing[1] }}</span></p>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .about { @include m.rail-section; }
    .about__body { display: flex; flex-direction: column; gap: clamp(40px, 5vw, 64px); }
    .about__lines {
      display: flex; flex-direction: column;
      font-size: var(--t-h2); line-height: 0.95; font-weight: 700; letter-spacing: -0.05em;
      > span { display: block; }
    }
    .about__cols {
      display: grid; gap: 24px; max-width: 1080px;
      font-size: var(--t-body-lg); line-height: 1.65; color: var(--c-muted);
      @include m.tablet { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }
      p:first-child { color: var(--c-fg); }
    }
    // Three frames from recent stories: one wide over two on phones, an offset row on wider screens.
    .about__photos {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 12px; max-width: 1080px; align-items: start;
      @include m.tablet { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
    }
    .about__photo {
      a { display: flex; flex-direction: column; gap: 10px; color: inherit; }
      app-image-frame { aspect-ratio: 4 / 5; border-radius: var(--r-img); }
      &--0 { grid-column: 1 / -1; app-image-frame { aspect-ratio: 4 / 3; } }
      @include m.tablet { &--0 { grid-column: auto; app-image-frame { aspect-ratio: 4 / 5; } } &--1 { margin-top: 48px; } }
      a:hover .about__photo-title { color: var(--c-accent); }
      a:hover app-image-frame { box-shadow: 0 18px 40px -24px rgba(29, 26, 22, 0.55); }
    }
    .about__photo-cap { display: flex; flex-direction: column; gap: 4px;
      .mono { font-size: 12px; color: var(--c-dim); } }
    .about__photo-title { font-size: 16px; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; transition: color var(--d-fast); }
    .about__stats {
      margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 1px solid var(--c-line); max-width: 1080px;
    }
    .about__stat { padding: 22px 16px 0 0; display: flex; flex-direction: column; gap: 6px; dd { margin: 0; } }
    .about__stat-value { font-size: clamp(2.25rem, 1.4rem + 3.4vw, 4.5rem); font-weight: 700; letter-spacing: -0.05em; line-height: 1; font-variant-numeric: tabular-nums; }
    .about__stat-label { font-size: 14px; color: var(--c-dim); }
    .about__closing {
      font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem); line-height: 1.15; font-weight: 500; letter-spacing: -0.02em;
      .it { font-size: 1.08em; }
    }
  `,
})
export class AboutComponent {
  readonly showStats = input(true);
  protected readonly about = ABOUT;
  protected readonly manifest = MANIFEST;
  protected readonly stats = STATS;
  protected readonly photos = ABOUT_PHOTOS;
  protected readonly title = storyTitle;
}
