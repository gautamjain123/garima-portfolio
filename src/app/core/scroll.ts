/**
 * Scrolls to a home-page section by id, without URL fragments.
 *
 * - Pinned sections (ScrollTrigger wraps them in a `.pin-spacer`) are reached at the top of
 *   the spacer — exactly where the pin starts and the section fills the screen.
 * - Other sections stop just below the fixed navbar.
 *
 * Returns false if the section isn't on the page (e.g. you're on another route).
 */
export function scrollToSection(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;
  const spacer = section.closest('.pin-spacer');
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
  const top = spacer
    ? spacer.getBoundingClientRect().top + window.scrollY + 1
    : section.getBoundingClientRect().top + window.scrollY - nav;
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  return true;
}
