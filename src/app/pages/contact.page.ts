import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ContactComponent } from '../sections/contact/contact.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-contact-page',
  imports: [ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="page"><app-contact [asPage]="true" /></div>`,
  styles: `.page { padding-top: var(--nav-h); }`,
})
export default class ContactPage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.update({
      title: 'Contact',
      description:
        'Write to Garima Jain — share a story, suggest a place worth the detour, or plan a slow, curated journey through India for explorers, not tourists.',
      path: '/contact',
    });
  }
}
