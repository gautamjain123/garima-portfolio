# Garima Jain — Personal Portfolio

An editorial portfolio and blog built with **Angular 21 (standalone components, signals)**, **SCSS** and **GSAP**.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/garima-portfolio/browser
npm run sitemap    # regenerate public/sitemap.xml after adding posts
```

> Requires Node 20.19+ / 22.12+. To move to Angular 22 later: `npx ng update @angular/core @angular/cli` (needs Node 22.22.3+).

## Personalising it

Almost everything lives in two data files:

| What | Where |
| --- | --- |
| Name, intro, email, social links, domain | `src/app/core/data/site-content.ts` → `PROFILE` |
| About text, counters, places strip, photo journal, interests, hobbies, books, "next on the map", quote | `src/app/core/data/site-content.ts` |
| Qualifications (the `/qualifications` page) | `src/app/core/data/site-content.ts` → `QUALIFICATIONS` |
| Blog posts | `src/app/core/data/blog-posts.ts` |

Anything in `[square brackets]` is a placeholder. Also update the domain in `src/index.html`, `public/robots.txt` and `scripts/generate-sitemap.mjs`.

### Images

Images are referenced by path and **fall back to a styled, captioned placeholder** until the file exists, so the site never looks broken. Drop files into `public/`:

```
public/images/garima-portrait.jpg      ← hero portrait, 4:5, ~1600px tall
public/images/og-cover.jpg             ← social share image, 1200×630
public/images/hobbies/reading.jpg …    ← see HOBBIES in site-content.ts
public/images/blog/<trip>/…            ← a story's photos (e.g. blog/braj/); also used by PLACES and JOURNAL
```

Photos straight off a phone are large: resize to ~1200px on the long edge (and strip location
metadata) before adding them.

Book covers: add `cover: 'images/books/why-nations-fail.jpg'` to a book in `BOOKS`; otherwise a typographic cover is drawn.

### Contact form

`src/app/sections/contact/contact.component.ts` validates with Reactive Forms and currently simulates sending. Replace the marked `TODO` with Formspree, a Firebase function, or your own endpoint.

## Structure

```
src/
├── styles/_tokens.scss        design tokens (colour, type scale, spacing, radii, motion)
├── styles/_mixins.scss        breakpoints, container, label, heading mixins
├── styles.scss                reset, buttons, utilities, reduced-motion
└── app/
    ├── core/
    │   ├── data/              site-content.ts, blog-posts.ts   ← edit these
    │   ├── models/            BlogPost, content interfaces
    │   ├── services/          BlogService (data access), SeoService (meta + JSON-LD),
    │   │                      MotionService (GSAP + reduced-motion), IntroService
    │   └── directives/        appReveal (scroll reveals), appMagnetic, appCountUp
    ├── layout/                Navbar (+ mobile drawer), Footer, Cursor, Loader, ReadingProgress
    ├── sections/              Hero, About, QualificationTimeline, Journey, Interests, Hobbies,
    │                          BlogPreview, BlogCard, Books, CurrentlyLearning, Philosophy, Contact
    ├── shared/                SectionIndex ("GJ / 02"), ImageFrame, PageHeader
    └── pages/                 home, about, qualifications, blog list, blog detail, contact, 404
```

Routes (`app.routes.ts`, all lazy-loaded): `/`, `/about`, `/qualifications`, `/blog`, `/blog/:slug`, `/contact`, `**`.
`/blog?category=Governance` filters by category.

## Connecting a CMS

Components only talk to `BlogService`. To switch from local data, change its methods to fetch from your source and map the response onto the `BlogPost` interface — e.g. `HttpClient` for WordPress/Strapi REST, `@angular/fire` for Firestore, or `@sanity/client`. Nothing else needs to change. (Post `content` is treated as trusted HTML; if you ever accept third-party HTML, sanitise it server-side.)

## Design system — "gravity"

Inspired by the minimal, physics-playful aesthetic of studio portfolios like gravity-design.de.

- **Colour:** near-black `#101010`, warm off-white `#EDEAE3`, greys for secondary text, and a single marigold accent `#F2B544` used sparingly (italic words, active states, hover).
- **Type:** Geist — huge, tight, lowercase headings (the hero name is ~232px on desktop) — with Instrument Serif italic for emphasis.
- **Layout:** every section has a small `(0n) label` rail on the left and content on the right; hairline dividers; dot-separated word lists; ruled index rows for writing and qualifications.
- **Signature interactions:**
  - **drag to orbit** (`CurrentlyLearningComponent`) — current topics on a spinning 3D sphere; drag, swipe or use arrow keys.
  - live pointer coordinates in the hero, blend-mode cursor, hover image previews on blog rows.
- **Motion:** letter-by-letter hero reveal, scroll reveals, a sliding intro loader. All disabled under `prefers-reduced-motion`.

Tokens live in `src/styles/_tokens.scss`; layout helpers (`rail-section`, `heading`, `label`) in `src/styles/_mixins.scss`.

## Accessibility & SEO

Semantic landmarks, one `h1` per page, skip link, visible focus rings, keyboard-operable interests grid and mobile drawer (Esc to close, focus returned), ARIA on progress bar/form status, AA colour contrast. SEO: per-route title/description/OG/canonical via `SeoService`, `Person` JSON-LD on the home page, `BlogPosting` JSON-LD on articles, `robots.txt` and `sitemap.xml`.

For full pre-rendered HTML (best for SEO and link previews), add SSR/prerendering with `ng add @angular/ssr` — the code avoids direct DOM access outside the browser-only motion paths.
