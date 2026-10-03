import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { QualificationTimelineComponent } from '../sections/qualification-timeline.component';
import { PageHeaderComponent } from '../shared/page-header.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-qualifications-page',
  imports: [PageHeaderComponent, QualificationTimelineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      index="education"
      title="education &"
      emphasis="practice."
      lede="Where I learnt, and how I listen — the methods behind the stories, the fieldwork so far, and the classrooms before it."
    />
    <app-qualification-timeline />
  `,
})
export default class QualificationsPage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.update({
      title: 'Education & practice',
      description: 'Garima Jain’s fieldwork methods — oral history, street photography, sound recording — her documentation projects and her education.',
      path: '/qualifications',
    });
  }
}
