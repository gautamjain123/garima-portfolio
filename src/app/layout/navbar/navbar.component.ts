import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MagneticDirective } from '../../core/directives/magnetic.directive';
import { PROFILE } from '../../core/data/site-content';
import { scrollToSection } from '../../core/scroll';

interface NavItem {
  label: string;
  link: string;
  fragment?: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MagneticDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly firstLink = viewChild<ElementRef<HTMLAnchorElement>>('firstDrawerLink');

  protected readonly profile = PROFILE;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  protected readonly exactMatch: IsActiveMatchOptions = { paths: 'exact', fragment: 'exact', queryParams: 'ignored', matrixParams: 'ignored' };
  protected readonly subsetMatch: IsActiveMatchOptions = { paths: 'subset', fragment: 'ignored', queryParams: 'ignored', matrixParams: 'ignored' };

  protected readonly items: NavItem[] = [
    { label: 'home', link: '/', exact: true },
    { label: 'about', link: '/about' },
    { label: 'places', link: '/', fragment: 'places' },
    { label: 'journal', link: '/', fragment: 'journal' },
    { label: 'stories', link: '/blog' },
  ];

  private readonly router = inject(Router);

  constructor() {
    this.router
      .events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.close(false));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  /**
   * Section links (places, journal) scroll in code instead of using #fragments. They are plain
   * href links, not routerLinks: a routerLink to the page you're already on would re-navigate
   * and jump back to the top. From another page we go home first, then scroll.
   */
  goSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    this.close(false);
    if (scrollToSection(id)) return;
    void this.router.navigateByUrl('/').then(() => {
      let tries = 0;
      const attempt = () => {
        // Wait past the app's post-navigation ScrollTrigger refresh (~120ms) so pin positions are final.
        if (this.doc.getElementById(id)) setTimeout(() => scrollToSection(id), 300);
        else if (tries++ < 40) setTimeout(attempt, 100);
      };
      attempt();
    });
  }

  toggle(): void {
    this.open() ? this.close() : this.openMenu();
  }

  private openMenu(): void {
    this.open.set(true);
    this.doc.body.classList.add('is-locked');
    setTimeout(() => this.firstLink()?.nativeElement.focus(), 250);
  }

  close(returnFocus = true): void {
    if (!this.open()) return;
    this.open.set(false);
    this.doc.body.classList.remove('is-locked');
    if (returnFocus) this.menuButton()?.nativeElement.focus();
  }
}
