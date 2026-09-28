import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

export type FrameTone = 'teal' | 'saffron' | 'pink' | 'marigold' | 'mint' | 'blush' | 'ink' | 'berry';

/**
 * Editorial image with a graceful placeholder.
 * Drop the real file at the given `src` (under /public) and it appears;
 * until then a dark, hatched panel with a caption is shown instead.
 */
@Component({
  selector: 'app-image-frame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"frame frame--" + tone()' },
  template: `
    @if (src() && !failed()) {
      <img
        class="frame__img"
        [src]="src()"
        [alt]="alt()"
        [attr.loading]="eager() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="eager() ? 'high' : null"
        decoding="async"
        (error)="failed.set(true)"
      />
    } @else {
      <div class="frame__placeholder" role="img" [attr.aria-label]="alt()">
        <span class="frame__note">[ {{ placeholder() || alt() }} ]</span>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: var(--c-surface);
      color: var(--c-dim);
    }
    .frame__img,
    .frame__placeholder {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.9s var(--ease-out);
    }
    .frame__placeholder {
      background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.035) 0 1px, transparent 1px 12px);
    }
    .frame__note {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: lowercase;
    }
    :host-context(.is-zoomable:hover) .frame__img,
    :host-context(.is-zoomable:hover) .frame__placeholder { transform: scale(1.04); }
  `,
})
export class ImageFrameComponent {
  readonly src = input<string>('');
  readonly alt = input.required<string>();
  readonly placeholder = input<string>('');
  readonly tone = input<FrameTone>('teal');
  readonly eager = input(false);
  protected readonly failed = signal(false);
}
