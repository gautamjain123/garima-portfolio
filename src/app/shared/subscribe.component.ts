import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Status = 'idle' | 'sending' | 'subscribed' | 'confirm' | 'error';
let nextId = 0;

/**
 * "New stories by email" — posts to /api/subscribe (api/subscribe.mjs), which adds the
 * reader to the MailerLite "Blog subscribers" group. A new story then reaches them via
 * scripts/notify-subscribers.mjs.
 *
 * `variant="footer"`: a heading and a one-line form across the site footer.
 * `variant="rail"`: a narrow stacked form for a story's sidebar.
 */
@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"sub sub--" + variant()' },
  template: `
    <div class="sub__copy">
      <p class="sub__label" [id]="uid + '-title'">{{ variant() === 'rail' ? 'subscribe' : 'letters from the road' }}</p>
      @if (variant() === 'footer') {
        <p class="sub__title">new stories, <em>straight to your inbox.</em></p>
      }
      <p class="sub__text">One email when a new story goes up. Nothing else, and you can leave any time.</p>
    </div>

    @switch (status()) {
      @case ('subscribed') {
        <p class="sub__done" role="status">you’re on the list. the next story comes to you first.</p>
      }
      @case ('confirm') {
        <p class="sub__done" role="status">almost there — check your inbox and confirm with one click.</p>
      }
      @default {
        <form class="sub__form" [formGroup]="form" (ngSubmit)="submit()" novalidate [attr.aria-labelledby]="uid + '-title'">
          @if (variant() === 'footer') {
            <label class="visually-hidden" [for]="uid + '-name'">first name (optional)</label>
            <input [id]="uid + '-name'" class="sub__input" type="text" formControlName="name" autocomplete="given-name" placeholder="first name (optional)" />
          }
          <label class="visually-hidden" [for]="uid + '-email'">email</label>
          <input [id]="uid + '-email'" class="sub__input" type="email" formControlName="email" autocomplete="email" placeholder="you@example.com"
            [attr.aria-invalid]="invalid()" [attr.aria-describedby]="uid + '-msg'" required />
          <div class="sub__hp" aria-hidden="true">
            <label [for]="uid + '-website'">Website</label>
            <input [id]="uid + '-website'" type="text" formControlName="website" tabindex="-1" autocomplete="off" />
          </div>
          <button type="submit" class="sub__btn" [disabled]="status() === 'sending'">
            {{ status() === 'sending' ? 'subscribing…' : 'subscribe' }} <span aria-hidden="true">→</span>
          </button>
          <p [id]="uid + '-msg'" class="sub__msg" aria-live="polite">
            @if (invalid()) { Please enter a valid email address. }
            @else if (status() === 'error') { {{ error() }} }
          </p>
        </form>
      }
    }
  `,
  styles: `
    @use 'mixins' as m;
    :host { display: grid; gap: 14px; }
    .sub__copy { display: flex; flex-direction: column; gap: 8px; }
    .sub__label { @include m.label; }
    .sub__text { font-size: 14px; line-height: 1.55; color: var(--c-muted); }
    .sub__form { display: grid; gap: 8px; }
    .sub__input {
      height: 44px; padding: 0 16px; min-width: 0; border-radius: var(--r-pill);
      border: 1px solid color-mix(in srgb, currentColor 30%, transparent); background: transparent;
      color: inherit; font: inherit; font-size: 14px;
      &::placeholder { color: color-mix(in srgb, currentColor 55%, transparent); }
      &:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }
      &[aria-invalid='true'] { border-color: var(--c-accent); }
    }
    .sub__btn {
      height: 44px; padding: 0 20px; border-radius: var(--r-pill); border: 1px solid var(--c-fg);
      background: var(--c-fg); color: var(--c-bg); font: inherit; font-size: 14px; font-weight: 600; white-space: nowrap;
      transition: background var(--d-fast), border-color var(--d-fast), color var(--d-fast);
      &:hover:not(:disabled) { background: var(--c-accent); border-color: var(--c-accent); color: var(--p-paper); }
      &:disabled { opacity: 0.6; }
    }
    .sub__msg { min-height: 1.2em; font-size: 13px; color: var(--c-accent); &:empty { display: none; } }
    .sub__done { font-size: 15px; line-height: 1.5; color: var(--c-accent); }
    .sub__hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

    // Story sidebar: as narrow as the contents list above it.
    :host(.sub--rail) { max-width: 260px; .sub__text { font-size: 13px; } }

    // Site footer: heading on the left, a one-line form on the right; colours follow the footer band.
    :host(.sub--footer) {
      gap: 20px; padding-block: 8px 28px; margin-bottom: 4px; border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
      @include m.laptop { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 48px; align-items: end; }
      .sub__label, .sub__text { color: color-mix(in srgb, currentColor 72%, transparent); }
      .sub__title { font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.035em; color: inherit;
        em { @include m.serif-accent; color: var(--p-marigold); font-weight: 400; letter-spacing: -0.01em; } }
      .sub__form { @include m.tablet { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr) auto; } }
      .sub__input { height: 48px; }
      .sub__btn { height: 48px; background: var(--p-paper); border-color: var(--p-paper); color: var(--p-ink);
        &:hover:not(:disabled) { background: var(--p-marigold); border-color: var(--p-marigold); color: var(--p-ink); } }
      .sub__msg { grid-column: 1 / -1; }
      .sub__msg, .sub__done { color: var(--p-marigold); }
      .sub__input:focus-visible { outline-color: var(--p-marigold); }
      .sub__input[aria-invalid='true'] { border-color: var(--p-marigold); }
    }
  `,
})
export class SubscribeComponent {
  readonly variant = input<'rail' | 'footer'>('rail');
  /** Unique id prefix, since the sidebar and footer forms share a page. */
  protected readonly uid = `sub-${nextId++}`;

  protected readonly status = signal<Status>('idle');
  protected readonly error = signal('');

  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly form = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    website: [''], // honeypot
  });

  protected invalid(): boolean {
    const c = this.form.controls.email;
    return c.invalid && c.touched;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(this.form.getRawValue()),
      });
      const data = (await r.json().catch(() => ({}))) as { status?: Status; error?: string };
      if (r.ok && (data.status === 'subscribed' || data.status === 'confirm')) {
        this.status.set(data.status);
        return;
      }
      this.error.set(data.error ?? 'Something went wrong. Please try again in a bit.');
    } catch {
      this.error.set('Couldn’t reach the server. Please check your connection and try again.');
    }
    this.status.set('error');
  }
}
