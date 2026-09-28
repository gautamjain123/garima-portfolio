import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AboutComponent } from '../sections/about/about.component';
import { BlogPreviewComponent } from '../sections/blog/blog-preview.component';
import { BooksComponent } from '../sections/books.component';
import { ContactComponent } from '../sections/contact/contact.component';
import { CurrentlyLearningComponent } from '../sections/currently-learning.component';
import { HeroComponent } from '../sections/hero/hero.component';
import { InterestsComponent } from '../sections/interests.component';
import { JournalComponent } from '../sections/journal.component';
import { PhilosophyComponent } from '../sections/philosophy.component';
import { PlacesComponent } from '../sections/places.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    AboutComponent,
    PlacesComponent,
    InterestsComponent,
    JournalComponent,
    CurrentlyLearningComponent,
    BlogPreviewComponent,
    BooksComponent,
    PhilosophyComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about class="band band--terracotta" />
    <app-places />
    <app-interests class="band band--teal" />
    <app-journal />
    <app-currently-learning class="band band--indigo" />
    <app-blog-preview />
    <app-books class="band band--pink" />
    <app-philosophy class="band band--marigold" />
    <app-contact />
  `,
})
export default class HomePage implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.home();
  }
}
