import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { MotionService } from '../services/motion.service';

/**
 * Colour lens for a monochrome photo. The host holds two stacked copies of
 * the image; the top (colour) copy is masked by a soft circle driven by the
 * CSS vars --lx / --ly / --lr, which this directive animates.
 *
 * - Fine pointers: the lens trails the cursor; click floods the whole photo.
 * - Touch: `bloom()` grows colour out from `origin`; tap toggles.
 * - Reduced motion: the photo simply shows in colour.
 */
@Directive({
  selector: '[appColorLens]',
  exportAs: 'colorLens',
  host: { '[class.is-full]': 'full()' },
})
export class ColorLensDirective implements OnInit, OnDestroy {
  /** Where the bloom starts, as fractions of the host box (her face). */
  readonly origin = input<[number, number]>([0.5, 0.4]);
  readonly lensRadius = input(150);

  readonly full = signal(false);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);
  private cleanup: (() => void)[] = [];
  private raf = 0;
  private pos = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private lens = { r: 0 };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    if (!this.motion.canAnimate) {
      this.setFull(true, false);
      return;
    }
    this.moveTo(...this.originPx(), true);
    this.zone.runOutsideAngular(() => {
      const on = <K extends keyof HTMLElementEventMap>(type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
        this.el.addEventListener(type, fn as EventListener, { passive: true });
        this.cleanup.push(() => this.el.removeEventListener(type, fn as EventListener));
      };
      on('click', () => this.zone.run(() => this.setFull(!this.full())));
      if (!this.motion.isFinePointer) return;
      on('pointerenter', (e) => {
        this.moveTo(...this.localPx(e), true);
        if (!this.full()) this.tweenRadius(this.lensRadius(), 0.7);
      });
      on('pointermove', (e) => this.moveTo(...this.localPx(e)));
      on('pointerleave', () => {
        if (!this.full()) this.tweenRadius(0, 0.6);
      });
    });
  }

  /** Touch entrance: colour spreads out from the face. */
  bloom(delay = 0.5): void {
    if (this.motion.isFinePointer || !this.motion.canAnimate) return;
    this.moveTo(...this.originPx(), true);
    this.full.set(true);
    this.tweenRadius(this.coverRadius(), 1.8, delay, 'power2.inOut');
  }

  private setFull(on: boolean, animate = true): void {
    this.full.set(on);
    if (!animate) {
      this.lens.r = on ? this.coverRadius() : 0;
      this.paint();
      return;
    }
    if (on) this.tweenRadius(this.coverRadius(), 1.1, 0, 'power3.inOut');
    else this.tweenRadius(this.motion.isFinePointer ? this.lensRadius() : 0, 0.8, 0, 'power3.inOut');
  }

  private tweenRadius(r: number, duration: number, delay = 0, ease = 'power3.out'): void {
    this.motion.gsap.to(this.lens, { r, duration, delay, ease, overwrite: true, onUpdate: () => this.paint() });
  }

  private moveTo(x: number, y: number, jump = false): void {
    this.target = { x, y };
    if (jump) {
      this.pos = { x, y };
      this.paint();
      return;
    }
    if (!this.raf) this.raf = requestAnimationFrame(this.tick);
  }

  private readonly tick = (): void => {
    this.pos.x += (this.target.x - this.pos.x) * 0.16;
    this.pos.y += (this.target.y - this.pos.y) * 0.16;
    this.paint();
    const settled = Math.abs(this.target.x - this.pos.x) < 0.3 && Math.abs(this.target.y - this.pos.y) < 0.3;
    this.raf = settled ? 0 : requestAnimationFrame(this.tick);
  };

  private paint(): void {
    const s = this.el.style;
    s.setProperty('--lx', `${this.pos.x.toFixed(1)}px`);
    s.setProperty('--ly', `${this.pos.y.toFixed(1)}px`);
    s.setProperty('--lr', `${this.lens.r.toFixed(1)}px`);
  }

  private localPx(e: PointerEvent): [number, number] {
    const b = this.el.getBoundingClientRect();
    return [e.clientX - b.left, e.clientY - b.top];
  }

  private originPx(): [number, number] {
    const [ox, oy] = this.origin();
    return [this.el.offsetWidth * ox, this.el.offsetHeight * oy];
  }

  /** A radius that covers the whole box from any lens position (mask fades over the outer 45%). */
  private coverRadius(): number {
    return Math.hypot(this.el.offsetWidth, this.el.offsetHeight) * 2;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.motion.gsap.killTweensOf(this.lens);
    this.cleanup.forEach((fn) => fn());
  }
}
