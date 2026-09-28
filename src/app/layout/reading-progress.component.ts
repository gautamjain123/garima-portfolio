import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';

/** Thin reading-progress bar pinned to the top of the viewport. */
@Component({
  selector: 'app-reading-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="percent()"
    >
      <div class="progress__bar" [style.transform]="'scaleX(' + ratio() + ')'"></div>
    </div>
  `,
  styles: `
    .progress { position: fixed; inset: 0 0 auto; height: 2px; z-index: 120; background: var(--c-line-soft); }
    .progress__bar { height: 100%; background: var(--c-accent); transform-origin: 0 50%; }
  `,
})
export class ReadingProgressComponent {
  protected readonly ratio = signal(0);
  protected readonly percent = computed(() => Math.round(this.ratio() * 100));

  @HostListener('window:scroll')
  @HostListener('window:resize')
  update(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.ratio.set(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
  }
}
