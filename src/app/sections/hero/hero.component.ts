import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, effect, inject, viewChild } from '@angular/core';
import { PROFILE } from '../../core/data/site-content';
import { PointerCoordsDirective } from '../../core/directives/pointer-coords.directive';
import { IntroService } from '../../core/services/intro.service';
import { MotionService } from '../../core/services/motion.service';
import { ColorLensDirective } from '../../core/directives/color-lens.directive';
import { scrollToSection } from '../../core/scroll';

@Component({
  selector: 'app-hero',
  imports: [ColorLensDirective, PointerCoordsDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  protected readonly profile = PROFILE;
  /** "GARIMA JAIN" → [['G','A',…], ['J','A',…]] — each letter animates in on its own. */
  protected readonly nameWords = PROFILE.name.toUpperCase().split(' ').map((w) => w.split(''));
  protected readonly portrait = 'images/garima-portrait.jpg';

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly lens = viewChild.required(ColorLensDirective);
  private readonly motion = inject(MotionService);
  protected readonly hint = this.motion.isFinePointer
    ? { mono: 'hover to see in colour', full: 'click for b/w' }
    : { mono: 'tap for colour', full: 'tap for b/w' };
  private ctx?: gsap.Context;
  private intro?: gsap.core.Timeline;
  private played = false;

  constructor() {
    const intro = inject(IntroService);
    effect(() => {
      if (intro.done() && !this.played) {
        this.played = true;
        this.build();
        this.intro?.play();
      }
    });
  }

  /**
   * Builds the entrance paused, right after first render, so the hero is already in its
   * hidden start state behind the loader. (Building it only when the loader lifted let the
   * finished hero flash, vanish and then animate in — it looked like it loaded twice.)
   */
  ngAfterViewInit(): void {
    this.build();
    this.watchLayout();
  }

  private build(): void {
    if (this.ctx || !this.motion.canAnimate) return;
    const el = this.root().nativeElement;
    const gsap = this.motion.gsap;
    this.ctx = gsap.context(() => {
      this.intro = gsap
        .timeline({ paused: true, defaults: { ease: 'power4.out' } })
        .from('.hero__char', { yPercent: 135, duration: 1.1, stagger: 0.035, clearProps: 'transform' })
        .fromTo('.hero__photo', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' }, 0.1)
        .from('.hero__photo-inner', { scale: 1.25, duration: 1.8, ease: 'power3.out' }, 0.1)
        .from('.hero__sun', { scale: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)' }, 0.6)
        .fromTo('.hero__word--mark', { '--mark': 0 }, { '--mark': 1, duration: 0.9, ease: 'power3.inOut' }, 0.9)
        .from('.hero__meta > *, .hero__coords, .hero__fig', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08, clearProps: 'transform' }, '-=0.7')
        .add(() => this.lens().bloom(0.2), '-=0.4')
        .add(() => this.scheduleFit());

      gsap.to('.hero__photo-inner', {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
  }

  protected toPlaces(): void {
    scrollToSection('places');
  }

  // ── Keep the name off her face ─────────────────────────────

  /**
   * Where her face (hat to chin, with a margin) sits in the portrait, as fractions of the
   * original image. Update this if the hero photo changes.
   */
  private static readonly FACE = { x0: 0.6, x1: 0.88, y0: 0.42, y1: 0.63 };
  /** Scroll parallax moves the photo down by up to 7% of its frame (see build()). */
  private static readonly PARALLAX = 0.07;

  private resizeObserver?: ResizeObserver;
  private fitRaf = 0;

  /**
   * On wide screens the name runs across the bottom of the portrait. After every layout change
   * (load, font swap, resize, rotation) this checks whether either word would cover her face,
   * and if so steps the name's size down (via --name-fit) until it's clear. It measures the
   * word boxes rather than the letters, so it isn't fooled by the letters' entrance animation.
   */
  private readonly fitName = (): void => {
    const root = this.root().nativeElement;
    const words = [...root.querySelectorAll<HTMLElement>('.hero__word')];
    const frame = root.querySelector<HTMLElement>('.hero__photo');
    const img = root.querySelector<HTMLImageElement>('.hero__img');
    if (!frame || !img || !words.length) return;

    root.style.setProperty('--name-fit', '1');
    const face = this.faceRect(frame, img); // null in the stacked (phone/tablet) layout
    const coords = root.querySelector<HTMLElement>('.hero__coords');
    const coordsFloat = coords && getComputedStyle(coords).position === 'absolute';
    const contentRight = root.getBoundingClientRect().right - parseFloat(getComputedStyle(root).paddingRight);

    // The name has to satisfy all three, whatever the screen, zoom or browser font size:
    // stay off her face, stay below the coordinates, and stay inside the page.
    const ok = (): boolean => {
      const fs = parseFloat(getComputedStyle(words[0]).fontSize);
      const boxes = words.map((w) => w.getBoundingClientRect());
      // ignore the mask's extra space below the letters (0.24em)
      const onFace = !!face && boxes.some((r) => r.left < face.right && r.right > face.left && r.top < face.bottom && r.bottom - fs * 0.24 > face.top);
      const top = Math.min(...boxes.map((r) => r.top));
      const underCoords = !coordsFloat || top >= coords!.getBoundingClientRect().bottom + 16;
      const inside = Math.max(...boxes.map((r) => r.right)) <= contentRight + 2;
      return !onFace && underCoords && inside;
    };

    for (let fit = 1; fit >= 0.4; fit -= 0.025) {
      root.style.setProperty('--name-fit', fit.toFixed(3));
      if (ok()) return;
    }
  };

  /** The face box in screen pixels, from the frame's untransformed layout and object-fit: cover. */
  private faceRect(frame: HTMLElement, img: HTMLImageElement): { left: number; right: number; top: number; bottom: number } | null {
    const nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !nh) return null;
    const f = frame.getBoundingClientRect();
    if (!f.width || getComputedStyle(frame.closest('.hero__portrait')!).position !== 'absolute') return null; // stacked layout: no overlap possible
    // .hero__photo-inner extends 8% above the frame (inset: -8% 0 0)
    const box = { left: f.left, top: f.top - f.height * 0.08, w: f.width, h: f.height * 1.08 };
    const s = Math.max(box.w / nw, box.h / nh);
    const dw = nw * s, dh = nh * s;
    const ox = box.left + (box.w - dw) * 0.5; // object-position: 50% 70%
    const oy = box.top + (box.h - dh) * 0.7;
    const F = HeroComponent.FACE;
    return {
      left: ox + F.x0 * dw,
      right: ox + F.x1 * dw,
      top: oy + F.y0 * dh,
      bottom: oy + F.y1 * dh + box.h * HeroComponent.PARALLAX,
    };
  }

  private scheduleFit = (): void => {
    cancelAnimationFrame(this.fitRaf);
    this.fitRaf = requestAnimationFrame(this.fitName);
  };

  private watchLayout(): void {
    if (typeof window === 'undefined') return;
    const root = this.root().nativeElement;
    this.resizeObserver = new ResizeObserver(this.scheduleFit);
    this.resizeObserver.observe(root);
    root.querySelector('.hero__img')?.addEventListener('load', this.scheduleFit);
    void document.fonts?.ready.then(this.scheduleFit);
    window.addEventListener('resize', this.scheduleFit); // browser zoom and font-size changes
    this.scheduleFit();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (typeof window !== 'undefined') window.removeEventListener('resize', this.scheduleFit);
    if (this.fitRaf) cancelAnimationFrame(this.fitRaf);
    this.ctx?.revert();
  }
}
