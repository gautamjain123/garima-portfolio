import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Status = 'idle' | 'sending' | 'subscribed' | 'confirm' | 'error';

/**
 * "Get new stories by email" — posts to /api/subscribe (api/subscribe.mjs), which adds the
 * reader to the MailerLite "Blog subscribers" group. A new story then reaches them via scripts/notify-subscribers.mjs.
 */
@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="sub" [class.sub--compact]="compact()" aria-labelledby="sub-title">
      <div class="sub__copy">
        <p class="sub__kicker mono">letters from the road</p>
        <h2 id="sub-title" class="sub__title">new stories, <em>straight to your inbox.</em></h2>
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
          <form class="sub__form" [formGroup]="form" (ngSubmit)="submit()" novalidate aria-label="Subscribe to new stories">
            <label class="visually-hidden" for="sub-name">first name (optional)</label>
            <input id="sub-name" class="sub__input" type="text" formControlName="name" autocomplete="given-name" placeholder="first name (optional)" />
            <label class="visually-hidden" for="sub-email">email</label>
            <input id="sub-email" class="sub__input" type="email" formControlName="email" autocomplete="email" placeholder="you@example.com"
              [attr.aria-invalid]="invalid()" aria-describedby="sub-msg" required />
            <div class="sub__hp" aria-hidden="true">
              <label for="sub-website">Website</label>
              <input id="sub-website" type="text" formControlName="website" tabindex="-1" autocomplete="off" />
            </div>
            <button type="submit" class="btn btn--dark sub__btn" [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? 'subscribing…' : 'subscribe' }} <span class="btn__arrow" aria-hidden="true">→</span>
            </button>
            <p id="sub-msg" class="sub__msg" aria-live="polite">
              @if (invalid()) { Please enter a valid email address. }
              @else if (status() === 'error') { {{ error() }} }
            </p>
          </form>
        }
      }
    </section>
  `,
  styles: `
    @use 'mixins' as m;
    :host { display: block; }
    .sub {
      display: grid; gap: 24px; padding: clamp(24px, 4vw, 44px); border-radius: var(--r-card, 20px);
      background: var(--p-indigo); color: var(--p-paper);
      @include m.laptop { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 48px; align-items: end; }
    }
    .sub__copy { display: flex; flex-direction: column; gap: 10px; }
    .sub__kicker { font-size: 12px; letter-spacing: 0.06em; color: var(--p-marigold); }
    .sub__title { font-size: clamp(1.75rem, 1.2rem + 2vw, 2.75rem); font-weight: 700; line-height: 1.02; letter-spacing: -0.04em;
      em { @include m.serif-accent; color: var(--p-marigold); font-weight: 400; letter-spacing: -0.01em; } }
    .sub__text { font-size: 15px; line-height: 1.6; opacity: 0.85; max-width: 44ch; }

    .sub__form { display: grid; gap: 10px;
      @include m.tablet { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr) auto; } }
    .sub__input {
      height: 52px; padding: 0 18px; border-radius: var(--r-pill); border: 1px solid color-mix(in srgb, var(--p-paper) 35%, transparent);
      background: color-mix(in srgb, var(--p-paper) 10%, transparent); color: var(--p-paper); font: inherit; font-size: 15px; min-width: 0;
      &::placeholder { color: color-mix(in srgb, var(--p-paper) 60%, transparent); }
      &:focus-visible { outline: 2px solid var(--p-marigold); outline-offset: 2px; }
      &[aria-invalid='true'] { border-color: var(--p-marigold); }
    }
    .sub__btn { background: var(--p-paper); color: var(--p-ink); border-color: var(--p-paper); white-space: nowrap;
      &:hover { background: var(--p-marigold); border-color: var(--p-marigold); } }
    .sub__msg { grid-column: 1 / -1; min-height: 1.2em; font-size: 14px; color: var(--p-marigold); }
    .sub__done { font-size: clamp(1.125rem, 1rem + 0.6vw, 1.5rem); line-height: 1.4; color: var(--p-marigold); }
    .sub__hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

    // In the middle of an article: a single column, sized to the reading measure.
    .sub--compact { @include m.laptop { grid-template-columns: 1fr; gap: 24px; align-items: start; } }
  `,
})
export class SubscribeComponent {
  /** Single-column layout, for use inside an article. */
  readonly compact = input(false);

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
