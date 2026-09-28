/**
 * Stock photos linked from Unsplash (free under the Unsplash License — https://unsplash.com/license).
 * They stand in until real travel photos arrive: swap any `unsplash('photo-…')` call for a
 * local path such as 'images/places/ladakh.jpg' and drop the file into /public.
 *
 * `w` is the delivered width; Unsplash resizes, compresses and serves WebP/AVIF automatically.
 */
export const unsplash = (id: string, w = 1000): string =>
  `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;
