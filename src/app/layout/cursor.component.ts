import { AfterViewInit, ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';
import { MotionService } from '../core/services/motion.service';

/**
 * Subtle desktop cursor. A small ring follows the pointer; over any element
 * carrying `data-cursor="READ"` (or VIEW / OPEN) it expands and shows the word.
 * Links and buttons without a label just grow slightly.
 * Disabled on touch devices and for reduced motion.
 */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #ring class="cursor" aria-hidden="true"><span #text class="cursor__text"></span></div>`,
  styles: `
    :host { display: contents; }
    .cursor {
      position: fixed; left: 0; top: 0; z-index: 9999;
      width: 10px; height: 10px; margin: -5px 0 0 -5px;
      border-radius: 999px; background: var(--c-fg);
      mix-blend-mode: difference;
      pointer-events: none; display: none; align-items: center; justify-content: center;
      transition: width .35s var(--ease-out), height .35s var(--ease-out), margin .35s var(--ease-out), opacity .3s;
    }
    .cursor.is-on { display: flex; }
    .cursor.is-hover { width: 44px; height: 44px; margin: -22px 0 0 -22px; }
    .cursor.is-label { width: 88px; height: 88px; margin: -44px 0 0 -44px; mix-blend-mode: normal; background: var(--c-accent); }
    .cursor.is-hidden { opacity: 0; }
    .cursor__text { font: 500 11px/1 var(--f-sans); letter-spacing: .04em; text-transform: lowercase; color: var(--c-bg); opacity: 0; transition: opacity .25s; }
    .cursor.is-label .cursor__text { opacity: 1; }
  `,
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly text = viewChild.required<ElementRef<HTMLElement>>('text');
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    if (!this.motion.canAnimate || !this.motion.isFinePointer) return;
    const ring = this.ring().nativeElement;
    const text = this.text().nativeElement;
    const gsap = this.motion.gsap;
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      ring.classList.add('is-on');
      ring.classList.remove('is-hidden');
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      const interactive = target?.closest('a, button, input, textarea, [role="button"]');
      if (labelled) {
        text.textContent = labelled.dataset['cursor'] ?? '';
        ring.classList.add('is-label');
        ring.classList.remove('is-hover');
      } else {
        ring.classList.remove('is-label');
        ring.classList.toggle('is-hover', !!interactive);
      }
    };
    const leave = () => ring.classList.add('is-hidden');

    this.zone.runOutsideAngular(() => {
      this.doc.addEventListener('mousemove', move, { passive: true });
      this.doc.addEventListener('mouseover', over, { passive: true });
      this.doc.documentElement.addEventListener('mouseleave', leave);
    });
    this.teardown = () => {
      this.doc.removeEventListener('mousemove', move);
      this.doc.removeEventListener('mouseover', over);
      this.doc.documentElement.removeEventListener('mouseleave', leave);
    };
  }

  ngOnDestroy(): void {
    this.teardown?.();
  }
}
