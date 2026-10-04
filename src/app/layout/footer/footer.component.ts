import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../core/data/site-content';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <span class="footer__copy">© {{ year }} GARIMA JAIN — collected along the way.</span>
      <nav class="footer__links" aria-label="Footer">
        <a routerLink="/about">about</a>
        <a routerLink="/blog">stories</a>
        <a routerLink="/qualifications">education</a>
        @for (s of profile.socials; track s.label) {
          <a [href]="s.url" target="_blank" rel="noopener">{{ s.label.toLowerCase() }}</a>
        }
      </nav>
      <button type="button" class="footer__top" (click)="toTop()">back to top ↑</button>
    </footer>
  `,
  styles: `
    @use 'mixins' as m;
    .footer {
      @include m.container;
      display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between;
      padding-block: 28px 40px; border-top: 1px solid var(--c-line);
      font-size: 14px; color: var(--c-muted);
    }
    .footer__links { display: flex; flex-wrap: wrap; gap: 8px 24px; a { padding: 6px 0; &:hover { color: var(--c-fg); } } }
    .footer__top { background: none; border: 0; padding: 6px 0; color: var(--c-fg); font-size: 14px; &:hover { color: var(--c-accent); } }
  `,
})
export class FooterComponent {
  toTop(): void {
    window.scrollTo({ top: 0 });
  }

  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
