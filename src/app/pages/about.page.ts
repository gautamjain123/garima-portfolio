import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AboutComponent } from '../sections/about/about.component';
import { BooksComponent } from '../sections/books.component';
import { CurrentlyLearningComponent } from '../sections/currently-learning.component';
import { HobbiesComponent } from '../sections/hobbies.component';
import { InterestsComponent } from '../sections/interests.component';
import { PhilosophyComponent } from '../sections/philosophy.component';
import { PlacesComponent } from '../sections/places.component';
import { PageHeaderComponent } from '../shared/page-header.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-about-page',
  imports: [
    PageHeaderComponent,
    AboutComponent,
    CurrentlyLearningComponent,
    PlacesComponent,
    InterestsComponent,
    HobbiesComponent,
    BooksComponent,
    PhilosophyComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      index="about"
      title="wandering. listening."
      emphasis="writing."
      lede="A traveller, a listener, a slightly obsessive note-taker — collecting the stories we inherit and the ones that quietly slip away."
    />
    <app-about class="band band--terracotta" />
    <app-places />
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
      description: 'About Garima Jain — traveller and storyteller collecting oral histories, photographs and reflections on people, places and cultures.',
      path: '/about',
      type: 'profile',
    });
  }
}
