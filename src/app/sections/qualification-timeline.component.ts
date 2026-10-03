import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FIELDWORK, PRACTICE, QUALIFICATIONS } from '../core/data/site-content';
import { RevealDirective } from '../core/directives/reveal.directive';

/** Text with [placeholders] split so the bracketed parts can be styled as "to fill in". */
interface Part { text: string; placeholder: boolean; }
const parts = (s: string): Part[] =>
  s.split(/(\[[^\]]*\])/).filter(Boolean).map((text) => ({ text, placeholder: text.startsWith('[') }));

/** Education page: practice (methods), fieldwork so far (linked), and education (ruled rows). */
@Component({
  selector: 'app-qualification-timeline',
  imports: [RevealDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="quals" aria-labelledby="practice-title">
      <h2 id="practice-title" class="label">(01) practice</h2>
      <ul class="practice" appReveal="stagger">
        @for (m of practice; track m.title; let i = $index) {
          <li class="practice__item">
            <span class="practice__n mono">{{ (i + 1).toString().padStart(2, '0') }}</span>
            <h3 class="practice__title">{{ m.title.toLowerCase() }}</h3>
            <p class="practice__desc">{{ m.description }}</p>
          </li>
        }
      </ul>
    </section>

    <section class="quals" aria-labelledby="fieldwork-title">
      <h2 id="fieldwork-title" class="label">(02) fieldwork so far</h2>
      <ol class="quals__list" appReveal="stagger">
        @for (f of fieldwork; track f.story) {
          <li>
            <a class="quals__row quals__row--link" [routerLink]="['/blog', f.story]" data-cursor="READ">
              <span class="quals__year mono">{{ f.period }}</span>
              <span class="quals__main">
                <span class="quals__title">{{ f.title.toLowerCase() }} <span class="quals__arrow" aria-hidden="true">↗</span></span>
                <span class="quals__desc">{{ f.description }}</span>
              </span>
              <span class="quals__inst">{{ f.place }}</span>
            </a>
          </li>
        }
      </ol>
    </section>

    <section class="quals" aria-labelledby="education-title">
      <div class="quals__rail">
        <h2 id="education-title" class="label">(03) education</h2>
        <p class="quals__note">degrees, courses and the places I learnt to ask better questions.</p>
      </div>
      <ol class="quals__list" appReveal="stagger">
        @for (q of items; track $index) {
          <li class="quals__row" [class.is-current]="q.current">
            <span class="quals__year mono">
              @for (p of split(q.period); track $index) {<span [class.ph]="p.placeholder">{{ p.text }}</span>}
            </span>
            <span class="quals__main">
              <span class="quals__tag mono">{{ q.tag.toLowerCase() }}</span>
              <span class="quals__title">
                @for (p of split(q.title); track $index) {<span [class.ph]="p.placeholder">{{ p.text }}</span>}
              </span>
              <span class="quals__desc">
                @for (p of split(q.description); track $index) {<span [class.ph]="p.placeholder">{{ p.text }}</span>}
              </span>
            </span>
            <span class="quals__inst">
              @for (p of split(q.institution); track $index) {<span [class.ph]="p.placeholder">{{ p.text }}</span>}
            </span>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    .quals { @include m.rail-section; }
    .quals__rail { display: flex; flex-direction: column; gap: 14px; }
    .quals__note { font-size: 15px; line-height: 1.6; color: var(--c-muted); max-width: 30ch; }

    .practice { display: grid; gap: 1px; background: var(--c-line); border-block: 1px solid var(--c-line);
      @include m.tablet { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      @include m.laptop { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .practice__item { display: flex; flex-direction: column; gap: 10px; padding: 28px 24px 32px 0; background: var(--c-bg);
      @include m.tablet { padding: 32px 28px 36px; } }
    .practice__n { font-size: 12px; color: var(--c-accent); }
    .practice__title { font-size: clamp(1.5rem, 1.1rem + 1vw, 2.125rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1.05; }
    .practice__desc { font-size: 15px; line-height: 1.6; color: var(--c-muted); }

    .quals__list { border-top: 1px solid var(--c-line); }
    .quals__row {
      display: grid; gap: 8px; padding: 28px 0; border-bottom: 1px solid var(--c-line); color: inherit;
      transition: padding var(--d-base) var(--ease-out), color var(--d-fast);
      @include m.laptop { grid-template-columns: 160px minmax(0, 1fr) 280px; gap: 32px; align-items: baseline; padding: 36px 0; }
    }
    .quals__row--link:hover { color: var(--c-accent); @include m.laptop { padding-left: 16px; }
      .quals__arrow { transform: translate(3px, -3px); } }
    .quals__row.is-current { .quals__year { color: var(--c-accent); }
      .quals__year::before { content: ''; display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 50%;
        background: var(--c-accent); vertical-align: 1px; animation: pulse-dot 2.2s ease-in-out infinite; } }
    @keyframes pulse-dot { 50% { opacity: 0.35; } }
    .quals__arrow { display: inline-block; font-size: 0.7em; transition: transform var(--d-base) var(--ease-out); }
    .quals__year { font-size: 14px; color: var(--c-dim); }
    .quals__main { display: flex; flex-direction: column; gap: 8px; }
    .quals__tag { font-size: 12px; color: var(--c-accent); }
    .quals__title { font-size: var(--t-h3); font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; }
    .quals__desc { font-size: 15px; line-height: 1.6; color: var(--c-muted); max-width: 560px; }
    .quals__inst { font-size: 15px; color: var(--c-muted); }

    // [Placeholder] text: muted with a dashed underline, so it reads as "fill this in".
    .ph { color: var(--c-dim); font-style: italic; text-decoration: underline dashed color-mix(in srgb, currentColor 45%, transparent);
      text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
  `,
})
export class QualificationTimelineComponent {
  protected readonly practice = PRACTICE;
  protected readonly fieldwork = FIELDWORK;
  protected readonly items = QUALIFICATIONS;
  protected readonly split = parts;
}
