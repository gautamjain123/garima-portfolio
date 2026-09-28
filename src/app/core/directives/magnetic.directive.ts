import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input } from '@angular/core';
import { MotionService } from '../services/motion.service';

/** Gently pulls an element toward the pointer (desktop, fine pointers only). */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective implements OnInit, OnDestroy {
  readonly strength = input(0.25, { alias: 'appMagnetic', transform: (v: unknown) => (typeof v === 'number' ? v : 0.25) });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private cleanup: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.motion.canAnimate || !this.motion.isFinePointer) return;
    const gsap = this.motion.gsap;
    const xTo = gsap.quickTo(this.el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(this.el, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      const r = this.el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * this.strength());
      yTo((e.clientY - (r.top + r.height / 2)) * this.strength());
    };
    const leave = () => { xTo(0); yTo(0); };

    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('mousemove', move);
      this.el.addEventListener('mouseleave', leave);
    });
    this.cleanup = () => {
      this.el.removeEventListener('mousemove', move);
      this.el.removeEventListener('mouseleave', leave);
    };
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
