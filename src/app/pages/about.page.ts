import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AboutComponent } from '../sections/about/about.component';
import { BooksComponent } from '../sections/books.component';
import { CurrentlyLearningComponent } from '../sections/currently-learning.component';
import { HobbiesComponent } from '../sections/hobbies.component';
import { InterestsComponent } from '../sections/interests.component';
import { JourneyComponent } from '../sections/journey.component';
import { PhilosophyComponent } from '../sections/philosophy.component';
import { PageHeaderComponent } from '../shared/page-header.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-about-page',
  imports: [
    PageHeaderComponent,
    AboutComponent,
    CurrentlyLearningComponent,
    JourneyComponent,
    InterestsComponent,
    HobbiesComponent,
    BooksComponent,
    PhilosophyComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      index="about"
      title="learning. reflecting."
      emphasis="preparing."
      lede="An aspirant, a reader, a slightly obsessive note-taker — and someone who believes public service begins with paying attention."
    />
    <app-about class="band band--terracotta" />
    <app-journey />
    <app-interests class="band band--teal" />
    <app-currently-learning class="band band--indigo" />
    <app-hobbies class="band band--pink" />
    <app-books />
    <app-philosophy class="band band--marigold" />
  `,
})
export default class AboutPage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.update({
      title: 'About',
      description: 'About Garima Jain — IAS aspirant, reader and writer curious about society, governance and public policy.',
      path: '/about',
      type: 'profile',
    });
  }
}
