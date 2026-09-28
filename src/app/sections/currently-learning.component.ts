import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CURRENTLY_EXPLORING } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';
import { MotionService } from '../core/services/motion.service';

const EXTRA = ['tawang', 'kutch', 'pondicherry', 'orchha', 'mawlynnong', 'kasol'];

/**
 * "wanderlust, in orbit" — places on the list, spinning on a little globe.
 * Drag (mouse, touch or pen) to throw it around; arrow keys nudge it.
 */
@Component({
  selector: 'app-currently-learning',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="exploring" class="orbit" aria-labelledby="orbit-title">
      <div class="orbit__copy">
        <p class="label">(05) next on the map</p>
        <h2 id="orbit-title" class="orbit__title" appReveal>wanderlust,<br /><em>in orbit.</em></h2>
        <p class="orbit__text" appReveal>
          {{ topics.slice(0, 4).join(', ') }} — the places circling my list for the next few seasons. Drag to spin the globe.
        </p>
        <p class="orbit__hint" aria-hidden="true"><span class="orbit__rule"></span>drag to orbit</p>
      </div>

      <div
        #stage
        class="orbit__stage"
        tabindex="0"
        role="group"
        aria-label="Places I want to visit. Use arrow keys to rotate."
        (keydown)="nudge($event)"
      >
        <span class="orbit__ring" aria-hidden="true"></span>
        <span class="orbit__ring orbit__ring--flat" aria-hidden="true"></span>
        <ul class="orbit__words">
          @for (w of words; track w) {
            <li #word class="orbit__word">{{ w }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .orbit { @include m.container; padding-block: var(--section-y); border-top: 1px solid var(--c-line-soft);
      display: grid; gap: 40px; align-items: center;
      @include m.laptop { grid-template-columns: 1fr 1fr; gap: 56px; } }
    .orbit__copy { display: flex; flex-direction: column; gap: 28px; }
    .orbit__title { @include m.heading(var(--t-h2)); }
    .orbit__text { font-size: var(--t-body-lg); line-height: 1.65; color: var(--c-muted); max-width: 460px; }
    .orbit__hint { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--c-dim); }
    .orbit__rule { width: 28px; height: 1px; background: currentColor; }

    .orbit__stage {
      position: relative; height: clamp(340px, 42vw, 560px);
      display: grid; place-items: center;
      cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none;
      border-radius: 8px;
      &:active { cursor: grabbing; }
    }
    .orbit__ring { position: absolute; width: min(80%, 440px); aspect-ratio: 1; border-radius: 999px; border: 1px solid var(--c-line); pointer-events: none; }
    .orbit__ring--flat { aspect-ratio: 3.2; }
    .orbit__words { position: absolute; left: 50%; top: 50%; width: 0; height: 0; }
    .orbit__word {
      position: absolute; left: 0; top: 0; white-space: nowrap;
      font-size: clamp(15px, 1.4vw, 22px); font-weight: 600; letter-spacing: -0.02em;
      will-change: transform, opacity;
      transform: translate(-50%, -50%);
    }
  `,
})
export class CurrentlyLearningComponent implements AfterViewInit, OnDestroy {
  protected readonly topics = CURRENTLY_EXPLORING.map((t) => t.toLowerCase());
  protected readonly words = [...this.topics, ...EXTRA.filter((e) => !this.topics.includes(e))];

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly wordEls = viewChildren<ElementRef<HTMLElement>>('word');
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  private rotX = -0.35;
  private rotY = 0;
  private vx = 0;
  private vy = 0.004;
  private raf = 0;
  private cleanup: (() => void)[] = [];
  private points: { x: number; y: number; z: number }[] = [];

  ngAfterViewInit(): void {
    const n = this.words.length;
    // Fibonacci sphere: even spacing for any number of words
    this.points = this.words.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    this.render();
    if (!this.motion.canAnimate) return;

    const stage = this.stage().nativeElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      stage.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      this.vy = dx * 0.0009; this.vx = -dy * 0.0009;
      this.rotY += dx * 0.006; this.rotX -= dy * 0.006;
    };
    const up = () => { dragging = false; };

    this.zone.runOutsideAngular(() => {
      stage.addEventListener('pointerdown', down);
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerup', up);
      stage.addEventListener('pointercancel', up);
      const tick = () => {
        if (!dragging) {
          this.rotY += this.vy; this.rotX += this.vx;
          this.vx *= 0.96;
          this.vy += (0.004 - this.vy) * 0.02; // ease back to a gentle idle spin
        }
        this.render();
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    });
    this.cleanup.push(() => {
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
    });
  }

  protected nudge(e: KeyboardEvent): void {
    const step = 0.25;
    if (e.key === 'ArrowLeft') this.rotY -= step;
    else if (e.key === 'ArrowRight') this.rotY += step;
    else if (e.key === 'ArrowUp') this.rotX += step;
    else if (e.key === 'ArrowDown') this.rotX -= step;
    else return;
    e.preventDefault();
    this.render();
  }

  private render(): void {
    const els = this.wordEls();
    const stage = this.stage().nativeElement;
    const R = Math.min(stage.clientWidth, stage.clientHeight) * 0.4;
    const cx = Math.cos(this.rotX), sx = Math.sin(this.rotX);
    const cy = Math.cos(this.rotY), sy = Math.sin(this.rotY);
    this.points.forEach((p, i) => {
      // rotate around Y then X
      const x1 = p.x * cy + p.z * sy;
      const z1 = -p.x * sy + p.z * cy;
      const y2 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      const depth = (z2 + 1) / 2; // 0 (back) → 1 (front)
      const el = els[i]?.nativeElement;
      if (!el) return;
      el.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${0.65 + depth * 0.55})`;
      el.style.opacity = String(0.22 + depth * 0.78);
      el.style.zIndex = String(Math.round(depth * 100));
      el.style.color = depth > 0.92 ? 'var(--c-accent)' : 'var(--c-fg)';
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((f) => f());
  }
}
