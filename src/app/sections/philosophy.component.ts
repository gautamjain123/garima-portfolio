import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PHILOSOPHY } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

@Component({
  selector: 'app-philosophy',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="philosophy" aria-label="Personal philosophy">
      <figure class="philosophy__figure">
        <blockquote class="philosophy__quote" appReveal>
          “{{ q.quote.toLowerCase() }} {{ lead }} <em>{{ tail }}</em>”
        </blockquote>
        <figcaption class="philosophy__by" appReveal="fade" [revealDelay]="0.2">— garima jain</figcaption>
      </figure>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .philosophy { @include m.container; padding-block: clamp(96px, 12vw, 180px); border-top: 1px solid var(--c-line-soft); }
    .philosophy__figure { display: flex; flex-direction: column; gap: 36px; }
    .philosophy__quote {
      max-width: 1240px; font-size: clamp(2.25rem, 1rem + 5vw, 5.75rem); line-height: 0.98;
      font-weight: 600; letter-spacing: -0.045em;
      em { @include m.serif-accent; letter-spacing: -0.01em; }
    }
    .philosophy__by { font-size: 15px; color: var(--c-muted); }
  `,
})
export class PhilosophyComponent {
  protected readonly q = PHILOSOPHY;
  private readonly parts = PHILOSOPHY.quoteEmphasis.toLowerCase().replace(/\.$/, '').split(' ');
  /** "it is about learning to ask" + emphasised "better questions." */
  protected readonly lead = this.parts.slice(0, -2).join(' ');
  protected readonly tail = this.parts.slice(-2).join(' ') + '.';
}
