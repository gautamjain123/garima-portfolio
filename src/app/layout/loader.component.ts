import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { MotionService } from '../core/services/motion.service';

/** Minimal intro: "GJ" → "Garima Jain" → curtain lifts. ~900ms total. */
@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!done()) {
      <div #root class="loader band--marigold" role="status" aria-label="Loading">
        <span #mono class="loader__mono">G<span style="color: var(--c-accent)">.</span></span>
        <span #name class="loader__name">GARIMA JAIN</span>
      </div>
    }
  `,
  styles: `
    .loader {
      position: fixed; inset: 0; z-index: 10000;
      background: var(--c-bg); color: var(--c-fg);
      display: grid; place-items: center;
      font-family: var(--f-sans); font-weight: 700; letter-spacing: -0.06em;
    }
    .loader__mono, .loader__name { grid-area: 1 / 1; }
    .loader__mono { font-size: 96px; line-height: 1; }
    .loader__name { font-size: clamp(44px, 8.5vw, 120px); letter-spacing: -0.04em; opacity: 0; white-space: nowrap; }
  `,
})
export class LoaderComponent implements AfterViewInit {
  readonly finished = output<void>();
  protected readonly done = signal(false);
  private readonly motion = inject(MotionService);
  private readonly root = viewChild<ElementRef<HTMLElement>>('root');
  private readonly mono = viewChild<ElementRef<HTMLElement>>('mono');
  private readonly name = viewChild<ElementRef<HTMLElement>>('name');

  ngAfterViewInit(): void {
    if (!this.motion.canAnimate) {
      this.finish();
      return;
    }
    const gsap = this.motion.gsap;
    gsap
      .timeline({ onComplete: () => this.done.set(true) })
      .from(this.mono()!.nativeElement, { opacity: 0, scale: 0.8, duration: 0.4 })
      .to(this.mono()!.nativeElement, { opacity: 0, scale: 0.6, duration: 0.2 }, '+=0.05')
      .fromTo(this.name()!.nativeElement, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3 }, '<0.05')
      .to(this.root()!.nativeElement, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '+=0.05')
      // Start the page's entrance while the curtain is still lifting, so there's no empty beat.
      .add(() => this.finished.emit(), '<0.3');
  }

  private finish(): void {
    this.done.set(true);
    this.finished.emit();
  }
}
