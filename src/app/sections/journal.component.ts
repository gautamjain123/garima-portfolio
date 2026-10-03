import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { JOURNAL } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ImageFrameComponent } from '../shared/image-frame.component';

/** Photo journal: a packed grid of frames; any frame opens a full-screen lightbox. */
@Component({
  selector: 'app-journal',
  imports: [RevealDirective, ImageFrameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="journal" class="journal" aria-labelledby="journal-title">
      <div class="journal__rail">
        <p class="label">(04) photo journal</p>
        <p class="journal__intro">single frames from the road — shrines, crowds, cows, and the people who let me sit a while.</p>
      </div>
      <div class="journal__body">
        <h2 id="journal-title" class="journal__title" appReveal>seen <em>along the way.</em></h2>
        <ul class="journal__grid" appReveal="stagger">
          @for (p of photos; track p.image; let i = $index) {
            <li class="shot shot--{{ p.shape }}">
              <button type="button" class="shot__btn is-zoomable" data-cursor="VIEW" (click)="open(i)" [attr.aria-label]="'Open photo: ' + p.caption">
                <app-image-frame [src]="p.image" [alt]="p.alt" [placeholder]="p.caption" />
                <span class="shot__cap"><span class="shot__place mono">{{ p.place }}</span>{{ p.caption }}</span>
              </button>
            </li>
          }
        </ul>
      </div>
    </section>

    <dialog #dialog class="lb" aria-label="Photo viewer" (click)="onBackdrop($event)" (keydown)="onKey($event)" (close)="index.set(-1)">
      @if (current(); as p) {
        <figure class="lb__figure">
          <img class="lb__img" [src]="p.image" [alt]="p.alt" />
          <figcaption class="lb__cap">
            <span class="mono">{{ (index() + 1).toString().padStart(2, '0') }} / {{ photos.length.toString().padStart(2, '0') }} — {{ p.place }}</span>
            <span class="it">{{ p.caption }}</span>
          </figcaption>
        </figure>
        <button type="button" class="lb__btn lb__btn--prev" (click)="step(-1)" aria-label="Previous photo">←</button>
        <button type="button" class="lb__btn lb__btn--next" (click)="step(1)" aria-label="Next photo">→</button>
        <button type="button" class="lb__close" (click)="close()" aria-label="Close viewer">close ✕</button>
      }
    </dialog>
  `,
  styles: `
    @use 'mixins' as m;
    .journal { @include m.rail-section; }
    .journal__rail { display: flex; flex-direction: column; gap: 18px; }
    .journal__intro { font-size: 15px; line-height: 1.6; color: var(--c-muted); max-width: 32ch; }
    .journal__body { display: flex; flex-direction: column; gap: 40px; min-width: 0; }
    .journal__title { @include m.heading(var(--t-display)); line-height: 0.88; }

    // Masonry columns: every frame keeps its own shape and nothing leaves holes.
    .journal__grid {
      columns: 2; column-gap: 10px;
      @include m.tablet { columns: 3; column-gap: 14px; }
    }
    .shot { break-inside: avoid; margin-bottom: 10px; @include m.tablet { margin-bottom: 14px; } }
    .shot--tall .shot__btn { aspect-ratio: 3 / 4; }
    .shot--square .shot__btn { aspect-ratio: 1; }
    .shot--wide .shot__btn { aspect-ratio: 3 / 2; }

    .shot__btn {
      position: relative; display: block; width: 100%; padding: 0; border: 0;
      border-radius: var(--r-img); overflow: hidden; background: var(--c-surface); color: inherit; text-align: left;
      app-image-frame { position: absolute; inset: 0; }
      &:focus-visible { outline-offset: 3px; }
    }
    .shot__cap {
      position: absolute; left: 0; right: 0; bottom: 0; z-index: 1;
      display: flex; flex-direction: column; gap: 2px; padding: 40px 14px 12px;
      background: linear-gradient(transparent, rgba(29, 26, 22, 0.72));
      color: var(--p-paper); font-size: 14px; line-height: 1.3;
      opacity: 0; transform: translateY(8px); transition: opacity var(--d-base), transform var(--d-base) var(--ease-out);
      @media (hover: none) { opacity: 1; transform: none; }
    }
    .shot__place { font-size: 11px; opacity: 0.8; }
    .shot__btn:hover .shot__cap, .shot__btn:focus-visible .shot__cap { opacity: 1; transform: none; }

    // Lightbox
    .lb {
      width: 100vw; height: 100svh; max-width: none; max-height: none; margin: 0; padding: 0; border: 0;
      background: rgba(29, 26, 22, 0.94); color: var(--p-paper);
      &::backdrop { background: transparent; }
      &[open] { display: grid; place-items: center; animation: lb-in 0.3s var(--ease-out); }
    }
    @keyframes lb-in { from { opacity: 0; } }
    .lb__figure { display: flex; flex-direction: column; gap: 14px; max-width: min(92vw, 1400px); }
    .lb__img { max-width: 100%; max-height: 78svh; object-fit: contain; border-radius: var(--r-img); margin-inline: auto; }
    .lb__cap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; font-size: 14px;
      .mono { font-size: 12px; opacity: 0.75; } .it { color: var(--p-marigold); font-size: 1.35em; } }
    .lb__btn, .lb__close {
      position: fixed; background: none; border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
      color: inherit; border-radius: var(--r-pill); transition: background var(--d-fast), color var(--d-fast);
      &:hover { background: var(--p-paper); color: var(--p-ink); }
    }
    .lb__btn { top: 50%; width: 52px; height: 52px; margin-top: -26px; font-size: 20px;
      @include m.below-laptop { top: auto; bottom: 20px; margin: 0; } }
    .lb__btn--prev { left: var(--gutter); }
    .lb__btn--next { right: var(--gutter); }
    .lb__close { top: 20px; right: var(--gutter); height: 44px; padding: 0 18px; font-size: 14px; }
  `,
})
export class JournalComponent {
  protected readonly photos = JOURNAL;
  protected readonly index = signal(-1);
  protected readonly current = computed(() => this.photos[this.index()] ?? null);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(i: number): void {
    this.index.set(i);
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  step(d: number): void {
    const n = this.photos.length;
    this.index.update((i) => (i + d + n) % n);
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }

  /** Clicking the dark surround (not the photo or buttons) closes the viewer. */
  onBackdrop(e: MouseEvent): void {
    if (e.target === this.dialog().nativeElement) this.close();
  }
}
