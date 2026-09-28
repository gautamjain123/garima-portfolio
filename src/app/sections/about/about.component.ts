import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ABOUT, MANIFEST, STATS } from '../../core/data/site-content';
import { CountUpDirective } from '../../core/directives/count-up.directive';
import { RevealDirective } from '../../core/directives/reveal.directive';

/** The manifest: short, bold statements with ghosted endings. */
@Component({
  selector: 'app-about',
  imports: [RevealDirective, CountUpDirective],
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
}
