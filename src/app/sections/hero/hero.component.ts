import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, effect, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../core/data/site-content';
import { PointerCoordsDirective } from '../../core/directives/pointer-coords.directive';
import { IntroService } from '../../core/services/intro.service';
import { MotionService } from '../../core/services/motion.service';
import { ImageFrameComponent } from '../../shared/image-frame.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ImageFrameComponent, PointerCoordsDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  protected readonly profile = PROFILE;
  /** "garima jain" → [['g','a',…], ['j','a',…]] — each letter is its own physics body. */
  protected readonly nameWords = PROFILE.name.toLowerCase().split(' ').map((w) => w.split(''));

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly motion = inject(MotionService);
  private ctx?: gsap.Context;
  private played = false;

  constructor() {
    const intro = inject(IntroService);
    effect(() => {
      if (intro.done() && !this.played) {
        this.played = true;
        this.play();
      }
    });
  }

  private play(): void {
    if (!this.motion.canAnimate) return;
    const el = this.root().nativeElement;
    const gsap = this.motion.gsap;
    this.ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero__char', { yPercent: 110, duration: 1.1, stagger: 0.035, clearProps: 'transform' })
        .fromTo('.hero__portrait', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' }, 0.1)
        .from('.hero__meta > *, .hero__coords', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, '-=0.7');

      gsap.to('.hero__portrait app-image-frame', {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
