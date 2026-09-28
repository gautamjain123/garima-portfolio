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

  constructor() {
    inject(Router)
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
