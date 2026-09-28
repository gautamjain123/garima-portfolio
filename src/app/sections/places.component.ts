import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';
import { PLACES } from '../core/data/site-content';
import { MotionService } from '../core/services/motion.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ImageFrameComponent } from '../shared/image-frame.component';

/**
 * "Places that stayed with me" — a strip of tall destination cards.
 * Desktop: the section pins and vertical scroll drives the strip sideways.
 * Touch / reduced motion: a native horizontal swipe with snap points.
 */
@Component({
  selector: 'app-places',
  imports: [RevealDirective, ImageFrameComponent],
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
              <div class="place__img"><app-image-frame [src]="p.image" [alt]="p.imageAlt" [placeholder]="p.name" /></div>
              <p class="place__meta mono"><span>{{ (i + 1).toString().padStart(2, '0') }}</span><span>{{ p.region.toLowerCase() }} · {{ p.when }}</span></p>
              <h3 class="place__name">{{ p.name.toLowerCase() }}</h3>
              <p class="place__note">{{ p.note }}</p>
            </li>
          }
          <li class="place place--end" aria-hidden="true"><span class="it">…and the road goes on.</span></li>
        </ol>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    :host { display: block; overflow: hidden; }
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
    .places__track {
      display: flex; gap: clamp(16px, 2vw, 32px); width: max-content;
      padding-inline: var(--gutter);
      will-change: transform;
    }
    .place {
      width: clamp(250px, 72vw, 300px); scroll-snap-align: start;
      display: flex; flex-direction: column; gap: 10px;
      @include m.tablet { width: clamp(280px, 30vw, 420px); }
      // Pinned on desktop: size cards from the viewport height so name + note stay on screen.
      @include m.laptop { width: clamp(240px, calc((100svh - 500px) * 0.75), 420px); }
    }
    .place__img {
      position: relative; aspect-ratio: 3 / 4; border-radius: var(--r-img); overflow: hidden;
      app-image-frame { position: absolute; inset: 0; }
    }
    .place:nth-child(even) .place__img { @include m.laptop { aspect-ratio: 4 / 5; margin-top: 40px; } }
    .place__meta { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--c-dim); margin-top: 6px; }
    .place__name { font-size: clamp(2rem, 1.2rem + 2.4vw, 3.25rem); font-weight: 700; letter-spacing: -0.045em; line-height: 0.95; }
    .place__note { font-size: 15px; line-height: 1.5; color: var(--c-muted); max-width: 34ch; }
    .place--end {
      scroll-snap-align: none; // as a snap target, Chrome jumps the strip to it on load
      justify-content: center; align-items: center; min-height: 200px;
      font-size: var(--t-h3); color: var(--c-muted);
    }
  `,
})
export class PlacesComponent implements AfterViewInit, OnDestroy {
  protected readonly places = PLACES;

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    if (!this.motion.canAnimate || !this.motion.isFinePointer || window.innerWidth < 1024) return;
    const gsap = this.motion.gsap;
    const track = this.track().nativeElement;
    const distance = () => Math.max(0, track.scrollWidth - this.viewport().nativeElement.clientWidth);
    if (distance() <= 0) return;

    this.host.classList.add('is-pinned');
    this.ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: this.root().nativeElement,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, this.host);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
