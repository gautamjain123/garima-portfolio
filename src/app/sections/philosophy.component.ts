import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHILOSOPHY, PHILOSOPHY_PHOTO } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ImageFrameComponent } from '../shared/image-frame.component';

@Component({
  selector: 'app-philosophy',
  imports: [RouterLink, RevealDirective, ImageFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="philosophy" aria-label="Personal philosophy">
      <figure class="philosophy__figure">
        <blockquote class="philosophy__quote" appReveal>
          “{{ q.quote.toLowerCase() }} {{ lead }} <em>{{ tail }}</em>”
        </blockquote>
        <figcaption class="philosophy__by" appReveal="fade" [revealDelay]="0.2">— GARIMA JAIN</figcaption>
      </figure>
      <a class="philosophy__photo" [routerLink]="['/blog', photo.story]" data-cursor="READ" appReveal="clip">
        <app-image-frame [src]="photo.image" [alt]="photo.alt" />
        <span class="philosophy__photo-cap">{{ photo.caption }} <span aria-hidden="true">↗</span></span>
      </a>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .philosophy { @include m.container; padding-block: clamp(96px, 12vw, 180px); border-top: 1px solid var(--c-line-soft);
      display: grid; gap: 48px;
      @include m.laptop { grid-template-columns: minmax(0, 1fr) minmax(260px, 340px); gap: 64px; align-items: end; } }
    .philosophy__figure { display: flex; flex-direction: column; gap: 36px; }
    .philosophy__quote {
      max-width: 1240px; font-size: clamp(2.25rem, 1rem + 5vw, 5.75rem); line-height: 0.98;
      font-weight: 600; letter-spacing: -0.045em;
      em { @include m.serif-accent; letter-spacing: -0.01em; }
    }
    .philosophy__by { font-size: 15px; color: var(--c-muted); }
    .philosophy__photo { display: flex; flex-direction: column; gap: 10px; max-width: 340px; color: inherit;
      app-image-frame { aspect-ratio: 4 / 5; border-radius: var(--r-img); }
      &:hover .philosophy__photo-cap { color: var(--c-fg); } }
    .philosophy__photo-cap { font-size: 14px; color: var(--c-muted); transition: color var(--d-fast); }
  `,
})
export class PhilosophyComponent {
  protected readonly q = PHILOSOPHY;
  protected readonly photo = PHILOSOPHY_PHOTO;
  private readonly parts = PHILOSOPHY.quoteEmphasis.toLowerCase().replace(/\.$/, '').split(' ');
  /** "it is about learning to ask" + emphasised "better questions." */
  protected readonly lead = this.parts.slice(0, -2).join(' ');
  protected readonly tail = this.parts.slice(-2).join(' ') + '.';
}
