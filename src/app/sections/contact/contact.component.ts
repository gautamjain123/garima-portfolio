import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../core/data/site-content';
import { MagneticDirective } from '../../core/directives/magnetic.directive';
import { RevealDirective } from '../../core/directives/reveal.directive';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MagneticDirective, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly profile = PROFILE;
  protected readonly status = signal<Status>('idle');

  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    // Honeypot — real people never see or fill this
    website: [''],
  });

  protected invalid(name: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.controls.website.value) return; // bot

    this.status.set('sending');
    try {
      // TODO: connect a real endpoint, e.g.
      //   await fetch('https://formspree.io/f/<id>', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(...) })
      // or a Firebase callable / serverless function.
      await new Promise((r) => setTimeout(r, 900));
      this.status.set('sent');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
