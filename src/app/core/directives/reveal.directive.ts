import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';
import { MotionService } from '../services/motion.service';

export type RevealMode = 'up' | 'fade' | 'clip' | 'stagger' | 'lines' | '';

/**
 * Scroll-triggered reveal.
 *   <h2 appReveal>              → fades + rises
 *   <ol appReveal="stagger">    → direct children rise in sequence
 *   <figure appReveal="clip">   → clip-path wipe from the bottom
 */
@Directive({
  selector: '[appReveal]',
  host: { 'data-reveal': '' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  readonly appReveal = input<RevealMode>('up');
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private tween?: gsap.core.Animation;

  ngAfterViewInit(): void {
    if (!this.motion.canAnimate) {
      this.el.style.opacity = '1';
      return;
    }
    const gsap = this.motion.gsap;
    const mode = this.appReveal() || 'up';
    const scrollTrigger = { trigger: this.el, start: 'top 86%', once: true };
    const delay = this.revealDelay();

    gsap.set(this.el, { opacity: 1 });

    switch (mode) {
      case 'fade':
        this.tween = gsap.from(this.el, { opacity: 0, duration: 1.1, delay, scrollTrigger });
        break;
      case 'clip':
        this.tween = gsap.fromTo(
          this.el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', delay, scrollTrigger, clearProps: 'clipPath' },
        );
        break;
      case 'stagger':
      case 'lines':
        this.tween = gsap.from(Array.from(this.el.children), {
          y: mode === 'lines' ? '0.6em' : 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          delay,
          scrollTrigger,
          // hand the transform back to CSS so tilted/rotated cards keep their pose
          clearProps: 'transform',
        });
        break;
      default:
        this.tween = gsap.from(this.el, { y: 40, opacity: 0, duration: 0.9, delay, scrollTrigger, clearProps: 'transform' });
    }
  }

  ngOnDestroy(): void {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
