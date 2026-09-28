import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BOOKS } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

@Component({
  selector: 'app-books',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="reading" class="books" aria-labelledby="books-title">
      <h2 id="books-title" class="label">(07) on my desk</h2>
      <ol class="books__list" appReveal="stagger">
        @for (b of books; track b.title) {
          <li class="books__row">
            <h3 class="books__title">{{ b.title.toLowerCase() }}</h3>
            <p class="books__author">{{ b.author.toLowerCase() }}</p>
            <p class="books__thought it">“{{ b.thought.toLowerCase() }}”</p>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .books { @include m.rail-section; }
    .books__list { border-top: 1px solid var(--c-line); }
    .books__row { display: grid; gap: 4px; padding: 24px 0; border-bottom: 1px solid var(--c-line);
      @include m.laptop { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.3fr); gap: 32px; align-items: baseline; padding: 28px 0; } }
    .books__title { font-size: clamp(1.375rem, 1rem + 1vw, 1.875rem); font-weight: 600; letter-spacing: -0.02em; }
    .books__author { font-size: 15px; color: var(--c-muted); }
    .books__thought { font-size: clamp(1.1875rem, 1rem + 0.5vw, 1.5rem); line-height: 1.2; }
  `,
})
export class BooksComponent {
  protected readonly books = BOOKS;
}
