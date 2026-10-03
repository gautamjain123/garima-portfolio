import { ChangeDetectionStrategy, Component, DOCUMENT, HostListener, OnDestroy, computed, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { BlogPost } from '../../core/models/blog-post.model';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { ReadingProgressComponent } from '../../layout/reading-progress.component';
import { BlogCardComponent } from '../../sections/blog/blog-card.component';
import { ImageFrameComponent } from '../../shared/image-frame.component';
import { PROFILE } from '../../core/data/site-content';

interface TocEntry { id: string; text: string; }

@Component({
  selector: 'app-blog-detail-page',
  imports: [RouterLink, DatePipe, RevealDirective, ReadingProgressComponent, BlogCardComponent, ImageFrameComponent],
  templateUrl: './blog-detail.page.html',
  styleUrl: './blog-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogDetailPage implements OnDestroy {
  /** Bound from the :slug route param */
  readonly slug = input.required<string>();

  private readonly blog = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly doc = inject(DOCUMENT);

  protected readonly post = toSignal(toObservable(this.slug).pipe(switchMap((s) => this.blog.getBySlug(s))));
  protected readonly loaded = computed(() => this.post() !== undefined || this.slugChecked());
  private readonly slugChecked = signal(false);

  protected readonly neighbours = toSignal(
    toObservable(this.slug).pipe(switchMap((s) => this.blog.getNeighbours(s))),
    { initialValue: {} as { previous?: BlogPost; next?: BlogPost } },
  );
  protected readonly related = toSignal(
    toObservable(this.post).pipe(switchMap((p) => (p ? this.blog.getRelated(p, 3) : of([])))),
    { initialValue: [] as BlogPost[] },
  );

  /** Adds ids to <h2>s so the table of contents can link to them. */
  private readonly prepared = computed(() => {
    const p = this.post();
    if (!p) return { html: '' as string, toc: [] as TocEntry[] };
    const toc: TocEntry[] = [];
    const html = p.content.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    });
    return { html, toc };
  });

  // Content is authored by the site owner (local data / trusted CMS), so it is trusted here.
  // If you ever accept user-submitted HTML, sanitise it server-side before it reaches this point.
  protected readonly content = computed<SafeHtml>(() => this.sanitizer.bypassSecurityTrustHtml(this.prepared().html));
  protected readonly toc = computed(() => this.prepared().toc);

  /** The chapter currently being read (highlighted in the contents list). */
  protected readonly activeId = signal<string | null>(null);
  private scrollRaf = 0;
  private correction?: ReturnType<typeof setTimeout>;

  /**
   * Contents navigation without URL fragments: scroll to the heading in code, leaving room
   * for the fixed navbar, then re-check once scrolling settles in case anything above it
   * changed height on the way (late-loading photos) and correct the last few pixels.
   */
  protected goTo(id: string): void {
    const target = this.doc.getElementById(id);
    if (!target) return;
    // Land on the small "chapter two" label above the heading when there is one.
    const prev = target.previousElementSibling;
    const anchor = prev?.classList.contains('kicker') ? prev : target;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = () => anchor.getBoundingClientRect().top + window.scrollY - this.offset();
    this.activeId.set(id);
    window.scrollTo({ top: top(), behavior: smooth ? 'smooth' : 'auto' });

    clearTimeout(this.correction);
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      clearTimeout(this.correction);
      if (Math.abs(top() - window.scrollY) > 4) window.scrollTo({ top: top(), behavior: 'auto' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true }); // screen readers continue from the chapter
    };
    if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true });
    this.correction = setTimeout(settle, smooth ? 900 : 50); // fallback, and for browsers without scrollend
  }

  /** Highlights the last chapter heading that has passed under the navbar. */
  @HostListener('window:scroll')
  protected trackActive(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => {
      const line = this.offset() + 48;
      let current: string | null = null;
      for (const t of this.toc()) {
        const el = this.doc.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= line) current = t.id;
      }
      this.activeId.set(current);
    });
  }

  /** Navbar height plus a little breathing room above the heading. */
  private offset(): number {
    const nav = parseFloat(getComputedStyle(this.doc.documentElement).getPropertyValue('--nav-h')) || 72;
    return nav + 24;
  }

  protected readonly shareUrl = computed(() => `${PROFILE.siteUrl}/blog/${this.post()?.slug ?? ''}`);
  protected readonly copied = signal(false);

  constructor() {
    effect(() => {
      const p = this.post();
      this.slugChecked.set(true);
      if (p) this.seo.article(p);
    });
  }

  protected tweetUrl(p: BlogPost): string {
    return `https://x.com/intent/post?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(this.shareUrl())}`;
  }

  protected linkedInUrl(): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl())}`;
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.doc.location.href);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  ngOnDestroy(): void {
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf); // only set in the browser
    clearTimeout(this.correction);
    this.seo.clearArticle();
  }
}
