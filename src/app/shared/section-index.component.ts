import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The site's "personal index" mark:  GJ / 02 — QUALIFICATIONS */
@Component({
  selector: 'app-section-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="index" [class.index--light]="light()">
      <span>GJ / {{ number() }}</span>
      @if (label()) {
        <span class="index__rule" aria-hidden="true"></span>
        <span>{{ label() }}</span>
      }
    </span>
  `,
  styles: `
    @use 'mixins' as m;
    .index { @include m.label; display: inline-flex; align-items: center; gap: 10px; }
    .index__rule { width: 24px; height: 1px; background: currentColor; }
    .index--light { color: var(--c-muted); }
  `,
})
export class SectionIndexComponent {
  readonly number = input.required<string>();
  readonly label = input<string>('');
  readonly light = input(false);
}
