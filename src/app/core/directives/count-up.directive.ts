import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';
import { MotionService } from '../services/motion.service';

/** Counts a number up from 0 when it scrolls into view. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  readonly appCountUp = input.required<number>();
  readonly suffix = input('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private tween?: gsap.core.Tween;

  ngAfterViewInit(): void {
    const target = this.appCountUp();
    const render = (n: number) => (this.el.textContent = `${Math.round(n)}${this.suffix()}`);
    if (!this.motion.canAnimate) {
      render(target);
      return;
    }
    const state = { n: 0 };
    render(0);
    this.tween = this.motion.gsap.to(state, {
      n: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => render(state.n),
      scrollTrigger: { trigger: this.el, start: 'top 90%', once: true },
    });
  }

  ngOnDestroy(): void {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
