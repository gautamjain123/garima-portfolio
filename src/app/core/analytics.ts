import { isDevMode } from '@angular/core';
import { PROFILE } from './data/site-content';

/** Microsoft Clarity project id (heatmaps + session recordings). */
const CLARITY_ID = 'ys3kez3bc0';

/**
 * Loads Microsoft Clarity — in production only. Skipped when:
 *  - rendering at build time (no window),
 *  - running a dev build (`ng serve`),
 *  - the page isn't on the live domain (localhost, Vercel preview links, etc.).
 * The live domain comes from PROFILE.siteUrl, so it follows the site's domain automatically.
 */
export function loadClarity(): void {
  if (typeof window === 'undefined' || isDevMode()) return;

  const liveHost = new URL(PROFILE.siteUrl).hostname.replace(/^www\./, '');
  const host = window.location.hostname.replace(/^www\./, '');
  if (host !== liveHost) return;

  type ClarityWindow = Window & { clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] } };
  const w = window as ClarityWindow;
  if (w.clarity) return; // already loaded

  // Microsoft's snippet, unminified.
  const queue = (...args: unknown[]) => (queue.q = queue.q ?? []).push(args);
  queue.q = [] as unknown[][];
  w.clarity = queue;
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(tag);
}
