import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { loadClarity } from './core/analytics';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CursorComponent } from './layout/cursor.component';
import { LoaderComponent } from './layout/loader.component';
import { IntroService } from './core/services/intro.service';
import { MotionService } from './core/services/motion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CursorComponent, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main" (click)="skipToMain($event)">Skip to content</a>
    <app-loader (finished)="intro.done.set(true)" />
    <app-cursor />
    <app-navbar />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer class="band band--indigo" />
  `,
  styles: `main:focus { outline: none; }`,
})
export class App {
  protected readonly intro = inject(IntroService);

  constructor() {
    // Analytics loads after the first render, in the browser only (and only in production — see analytics.ts).
    afterNextRender(() => loadClarity());
    const motion = inject(MotionService);
    // Recalculate ScrollTrigger positions after each route renders
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => motion.refresh(), 120));
  }

  skipToMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }
}
