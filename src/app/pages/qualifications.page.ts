import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { JourneyComponent } from '../sections/journey.component';
import { QualificationTimelineComponent } from '../sections/qualification-timeline.component';
import { PageHeaderComponent } from '../shared/page-header.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-qualifications-page',
  imports: [PageHeaderComponent, QualificationTimelineComponent, JourneyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      index="journey"
      title="a record of"
      emphasis="learning."
      lede="Degrees, certificates and the ongoing preparation for the Civil Services Examination."
    />
    <app-journey />
    <app-qualification-timeline />
  `,
})
export default class QualificationsPage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.update({
      title: 'Qualifications',
      description: 'Education, qualifications and the UPSC Civil Services preparation journey of Garima Jain.',
      path: '/qualifications',
    });
  }
}
