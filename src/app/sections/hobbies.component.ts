import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOBBIES } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ImageFrameComponent } from '../shared/image-frame.component';

@Component({
  selector: 'app-hobbies',
  imports: [RevealDirective, ImageFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hobbies" class="hobbies" aria-labelledby="hobbies-title">
      <h2 id="hobbies-title" class="label">(06) beyond the books</h2>
      <div class="hobbies__body">
        <ul class="hobbies__list" appReveal>
          @for (h of hobbies; track h.title; let last = $last) {
            <li><span class="hobbies__word">{{ h.title.toLowerCase() }}</span>@if (!last) {<span class="ghost" aria-hidden="true"> · </span>}</li>
          }
        </ul>
        <ul class="hobbies__photos" appReveal="stagger">
          @for (h of featured; track h.title) {
            <li class="hobbies__photo hobbies__photo--{{ h.shape }} is-zoomable" data-cursor="VIEW">
              <div class="hobbies__img"><app-image-frame [src]="h.image" [alt]="h.imageAlt" [placeholder]="'photo'" /></div>
              <p class="hobbies__cap">{{ h.title.toLowerCase() }} — {{ h.caption.toLowerCase() }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .hobbies { @include m.rail-section; }
    .hobbies__body { display: flex; flex-direction: column; gap: 56px; }
    .hobbies__list { display: flex; flex-wrap: wrap; font-size: var(--t-list); line-height: 1.12; font-weight: 600; letter-spacing: -0.035em;
      li { display: inline; } .ghost { white-space: pre; } }
    .hobbies__word { display: inline-block; transition: color var(--d-fast); &:hover { color: var(--c-accent); } }
    .hobbies__photos { display: grid; gap: 14px; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: end;
      @include m.laptop { grid-template-columns: 2fr 1fr 1fr 1.4fr; gap: 16px; } }
    .hobbies__photo { display: flex; flex-direction: column; gap: 10px; }
    .hobbies__img { position: relative; border-radius: var(--r-img); overflow: hidden; aspect-ratio: 4 / 5;
      app-image-frame { position: absolute; inset: 0; filter: grayscale(1); transition: filter .6s var(--ease-out); } }
    .hobbies__photo:hover app-image-frame { filter: none; }
    .hobbies__photo:nth-child(2) .hobbies__img { aspect-ratio: 3 / 4; }
    .hobbies__photo:nth-child(4) .hobbies__img { aspect-ratio: 1; }
    .hobbies__cap { font-size: 13px; color: var(--c-muted); }
  `,
})
export class HobbiesComponent {
  protected readonly hobbies = HOBBIES;
  protected readonly featured = HOBBIES.filter((h) => ['Reading', 'Travelling', 'Photography', 'Fitness'].includes(h.title));
}
