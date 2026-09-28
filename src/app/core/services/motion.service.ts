import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Central place for GSAP setup and motion preferences.
 * Every animated component asks `canAnimate` first, so reduced-motion
 * users and server rendering get static, fully visible content.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private registered = false;

  readonly ease = 'power3.out';

  get gsap(): typeof gsap {
    this.register();
    return gsap;
  }

  get canAnimate(): boolean {
    return this.isBrowser && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  get isFinePointer(): boolean {
    return this.isBrowser && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  refresh(): void {
    if (this.isBrowser) ScrollTrigger.refresh();
  }

  private register(): void {
    if (this.registered || !this.isBrowser) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: this.ease, duration: 0.9 });
    this.registered = true;
  }
}
