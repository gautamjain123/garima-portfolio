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
  /** "garima jain" → [['g','a',…], ['j','a',…]] — each letter animates in on its own. */
  protected readonly nameWords = PROFILE.name.toLowerCase().split(' ').map((w) => w.split(''));
  protected readonly portrait = 'images/garima-portrait.jpg';

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly lens = viewChild.required(ColorLensDirective);
  private readonly motion = inject(MotionService);
  protected readonly hint = this.motion.isFinePointer
    ? { mono: 'hover to see in colour ↗', full: 'click for b/w' }
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
  }

  private build(): void {
    if (this.ctx || !this.motion.canAnimate) return;
    const el = this.root().nativeElement;
    const gsap = this.motion.gsap;
    this.ctx = gsap.context(() => {
      this.intro = gsap
        .timeline({ paused: true, defaults: { ease: 'power4.out' } })
        .from('.hero__char', { yPercent: 110, duration: 1.1, stagger: 0.035, clearProps: 'transform' })
        .fromTo('.hero__photo', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' }, 0.1)
        .from('.hero__photo-inner', { scale: 1.25, duration: 1.8, ease: 'power3.out' }, 0.1)
        .from('.hero__sun', { scale: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)' }, 0.6)
        .fromTo('.hero__word--mark', { '--mark': 0 }, { '--mark': 1, duration: 0.9, ease: 'power3.inOut' }, 0.9)
        .from('.hero__meta > *, .hero__coords, .hero__fig', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, '-=0.7')
        .add(() => this.lens().bloom(0.2), '-=0.4');

      gsap.to('.hero__photo-inner', {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
  }

  protected toPlaces(): void {
    scrollToSection('places');
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
