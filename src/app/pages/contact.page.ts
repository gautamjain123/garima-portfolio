import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ContactComponent } from '../sections/contact/contact.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-contact-page',
  imports: [ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="page"><app-contact /></div>`,
  styles: `.page { padding-top: var(--nav-h); }`,
})
export default class ContactPage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.update({
      title: 'Contact',
      description: 'Get in touch with Garima Jain — ideas, book recommendations, discussions or simply hello.',
      path: '/contact',
    });
  }
}
