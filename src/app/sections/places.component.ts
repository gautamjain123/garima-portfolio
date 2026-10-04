import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, afterNextRender, inject, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLACES } from '../core/data/site-content';
import { MotionService } from '../core/services/motion.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ImageFrameComponent } from '../shared/image-frame.component';

/**
 * "Places that stayed with me" — a strip of tall destination cards.
 * On every screen the section pins and vertical scroll drives the strip sideways.
 * Reduced motion (or a very short screen): a native horizontal swipe with snap points.
 */
@Component({
  selector: 'app-places',
  imports: [RevealDirective, ImageFrameComponent, RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section #root id="places" class="places" aria-labelledby="places-title">
      <div class="places__head">
        <p class="label">(02) places</p>
        <h2 id="places-title" class="places__title" appReveal>places that <em>stayed with me.</em></h2>
        <p class="places__count mono" aria-hidden="true">
          <span>{{ places.length.toString().padStart(2, '0') }} places</span>
          <span class="places__rule"></span>
          <span>scroll</span>
        </p>
      </div>

      <div #viewport class="places__viewport" tabindex="0" role="region" aria-label="Places, scroll sideways">
        <ol #track class="places__track">
          @for (p of places; track p.name; let i = $index) {
            <li class="place is-zoomable">
              @if (p.story) {
                <a class="place__link" [routerLink]="['/blog', p.story]" [state]="p.section ? { section: p.section } : {}" data-cursor="READ">
                  <ng-container *ngTemplateOutlet="card; context: { $implicit: p, i: i }" />
                </a>
              } @else {
                <ng-container *ngTemplateOutlet="card; context: { $implicit: p, i: i }" />
              }
            </li>
          }
          <li class="place place--end" aria-hidden="true"><span class="it">…and the road goes on.</span></li>
        </ol>
      </div>
    </section>

    <ng-template #card let-p let-i="i">
      <div class="place__img"><app-image-frame [src]="p.image" [alt]="p.imageAlt" [placeholder]="p.name" /></div>
      <p class="place__meta mono"><span>{{ (i + 1).toString().padStart(2, '0') }}</span><span>{{ p.region.toLowerCase() }} · {{ p.when }}</span></p>
      <h3 class="place__name">{{ p.name.toLowerCase() }}@if (p.story) {<span class="place__arrow" aria-hidden="true"> ↗</span>}</h3>
      <p class="place__note">{{ p.note }}</p>
    </ng-template>
  `,
  styles: `
    @use 'mixins' as m;
    // overflow-x: clip (not hidden) so the sticky section below still sticks.
    :host { display: block; overflow-x: clip; }
    // Sticky scroll: the host grows by the strip's sideways distance (--pin-distance, set in JS)
    // and the section sticks to the top while the page scrolls through that extra height.
    // Nothing is moved in the DOM, so Angular's view of the page stays intact.
    :host(.is-pinned) { height: calc(100svh + var(--pin-distance, 0px)); }
    :host(.is-pinned) .places { position: sticky; top: 0; height: 100svh; box-sizing: border-box; }
    .places {
      padding-block: var(--section-y);
      border-top: 1px solid var(--c-line-soft);
      display: flex; flex-direction: column; gap: clamp(32px, 4vw, 56px);
      @include m.laptop { min-height: 100svh; justify-content: center; gap: 36px; padding-block: calc(var(--nav-h) + 8px) 32px; }
    }
    .places__head {
      @include m.container;
      display: grid; gap: 20px; align-items: end;
      @include m.laptop { grid-template-columns: var(--rail) minmax(0, 1fr) auto; gap: 56px; }
    }
    .places__title { @include m.heading(clamp(2.75rem, 1rem + 4.2vw, 5.5rem)); text-wrap: balance; }
    .places__count { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--c-dim); white-space: nowrap; }
    .places__rule { width: 48px; height: 1px; background: currentColor; }

    .places__viewport {
      overflow-x: auto; overscroll-behavior-x: contain;
      // proximity, not mandatory: mandatory re-snaps to the last card when the page lays out.
      scroll-snap-type: x proximity; scroll-padding-inline: var(--gutter); scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
      &:focus-visible { outline-offset: -4px; }
    }
    :host(.is-pinned) .places__viewport { overflow: visible; scroll-snap-type: none; }
    // Pinned (any screen): the section fills the screen, with a compact heading so the
    // pictures get the room. Card width comes from --card-w, measured in sizeCards().
    :host(.is-pinned) .places {
      min-height: 100svh; justify-content: center;
      gap: clamp(18px, 3vh, 28px); padding-block: calc(var(--nav-h) + 8px) 24px;
    }
    :host(.is-pinned) .places__head { gap: 10px; @include m.laptop { gap: 56px; } }
    :host(.is-pinned) .places__title { font-size: clamp(2rem, 1rem + 2.8vw, 4.25rem); }
    :host(.is-pinned) .place { width: var(--card-w); }
    :host(.is-pinned) .place__name { font-size: clamp(1.5rem, 1rem + 1.6vw, 2.75rem); }
    // Short screens (small phones, landscape tablets): one-line notes leave more height for photos.
    @media (max-height: 700px) { :host(.is-pinned) .place__note { -webkit-line-clamp: 1; } :host(.is-pinned) .places__count { display: none; } }
    :host(.is-pinned) .place:nth-child(even) .place__img { aspect-ratio: 3 / 4; margin-top: 0; @include m.laptop { margin-top: 28px; } }
    .places__track {
      display: flex; gap: clamp(16px, 2vw, 32px); width: max-content;
      padding-inline: var(--gutter);
      will-change: transform;
    }
    .place {
      width: clamp(250px, 72vw, 300px); scroll-snap-align: start;
      display: flex; flex-direction: column; gap: 10px;
      @include m.tablet { width: clamp(280px, 30vw, 420px); }
      // Pinned on desktop: --card-w is measured in JS so image + name + note fit the screen.
      @include m.laptop { width: var(--card-w, clamp(240px, calc((100svh - 520px) * 0.75), 420px)); }
    }
    .place__img {
      position: relative; aspect-ratio: 3 / 4; border-radius: var(--r-img); overflow: hidden;
      app-image-frame { position: absolute; inset: 0; }
    }
    .place:nth-child(even) .place__img { @include m.laptop { aspect-ratio: 4 / 5; margin-top: 40px; } }
    .place__meta { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--c-dim); margin-top: 6px; }
    .place__link { display: flex; flex-direction: column; gap: 10px; color: inherit;
      &:hover .place__name { color: var(--c-accent); }
      &:hover .place__arrow { transform: translate(3px, -3px); } }
    .place__arrow { display: inline-block; font-size: 0.6em; vertical-align: 0.35em; transition: transform var(--d-base) var(--ease-out); }
    .place__name { transition: color var(--d-fast); font-size: clamp(2rem, 1.2rem + 2.4vw, 3.25rem); font-weight: 700; letter-spacing: -0.045em; line-height: 0.95; }
    .place__note { font-size: 15px; line-height: 1.5; color: var(--c-muted); max-width: 34ch;
      display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
    .place--end {
      scroll-snap-align: none; // as a snap target, Chrome jumps the strip to it on load
      justify-content: center; align-items: center; min-height: 200px;
      font-size: var(--t-h3); color: var(--c-muted);
    }
  `,
})
export class PlacesComponent implements OnDestroy {
  protected readonly places = PLACES;

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private ctx?: gsap.Context;

  constructor() {
    afterNextRender(() => this.setupPin());
  }

  /** How far the strip has to slide sideways; the host gets that much extra scroll height. */
  private distance(): number {
    return Math.max(0, this.track().nativeElement.scrollWidth - this.viewport().nativeElement.clientWidth);
  }

  /** Size the cards for this screen, then give the host the scroll height the slide needs. */
  private readonly layout = (): void => {
    this.sizeCards();
    this.host.style.setProperty('--pin-distance', `${this.distance()}px`);
  };

  private setupPin(): void {
    // Pinned sideways scroll on every screen, phones included. It falls back to a native swipe
    // only for reduced motion or a screen too short to show a card (e.g. a phone held sideways).
    if (!this.motion.canAnimate || window.innerHeight < 420) return;
    const gsap = this.motion.gsap;
    // Mobile browsers resize the viewport as the address bar slides; don't re-layout the pin for that.
    ScrollTrigger.config({ ignoreMobileResize: true });
    const track = this.track().nativeElement;
    if (this.distance() <= 0) return;

    this.host.classList.add('is-pinned');
    this.layout();
    ScrollTrigger.addEventListener('refreshInit', this.layout);
    this.ctx = gsap.context(() => {
      // No `pin`: the section is position: sticky (see styles). The tween only slides the track
      // while the page scrolls through the host's extra height.
      gsap.to(track, {
        x: () => -this.distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: this.host,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, this.host);
    ScrollTrigger.refresh();
  }

  /**
   * Fits a whole card (image, meta, name, two-line note) into the pinned screen:
   * whatever height is left under the heading goes to the image, and the card
   * width follows from its 3:4 ratio. Re-runs on every ScrollTrigger refresh (resize).
   */
  private readonly sizeCards = (): void => {
    const root = this.root().nativeElement;
    const head = root.querySelector('.places__head')!.getBoundingClientRect().height;
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const chrome = navH + 8 + 24 + 28; // section padding + gap between heading and strip
    // Two passes: the text under each image re-wraps once the card width changes.
    for (let pass = 0; pass < 2; pass++) {
      const text = Math.max(
        ...[...root.querySelectorAll<HTMLElement>('.place:not(.place--end)')].map(
          (c) => c.getBoundingClientRect().height - c.querySelector('.place__img')!.getBoundingClientRect().height,
        ),
      );
      const imgH = Math.min(560, Math.max(160, window.innerHeight - chrome - head - text));
      // On narrow screens the width is the limit: ~78% of the screen, so the next card peeks in.
      const w = Math.min(imgH * 0.75, window.innerWidth * 0.78);
      this.host.style.setProperty('--card-w', `${Math.round(w)}px`);
    }
  };

  ngOnDestroy(): void {
    ScrollTrigger.removeEventListener('refreshInit', this.layout);
    this.ctx?.revert();
  }
}
