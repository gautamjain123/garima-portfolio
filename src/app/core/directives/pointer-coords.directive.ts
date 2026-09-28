import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Writes the pointer position (normalised 0–1) into the host element as
 * "x 0.482 · y 0.316" — the live coordinate readout in the hero.
 */
@Directive({ selector: '[appPointerCoords]' })
export class PointerCoordsDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private off: (() => void) | null = null;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth).toFixed(3);
        const y = (e.clientY / window.innerHeight).toFixed(3);
        this.el.textContent = `x ${x} · y ${y}`;
      });
    };
    this.zone.runOutsideAngular(() => window.addEventListener('pointermove', move, { passive: true }));
    this.off = () => window.removeEventListener('pointermove', move);
  }

  ngOnDestroy(): void {
    this.off?.();
  }
}
