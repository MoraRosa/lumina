/**
 * Config layer for collection pages (Body Care, Fragrance, and any future
 * ones). This is the ONLY place that should ever contain collection-page
 * copy, the Shopify collection handle, or the hero icon path.
 *
 * Why this file exists, specifically:
 * `CollectionPage.tsx` (the shared component that does all the actual
 * work -- filtering, sorting, pagination, layout) reads its identity from
 * one of these config objects. It never hardcodes a collection handle or a
 * page title itself. That split is deliberate: it's the same boundary a
 * future swappable-theme system would need (logic/config never lives
 * inside a visual layer), so building it this way now means it won't need
 * to be redone later if/when a theme-rotation system gets built.
 *
 * Adding a new collection page (e.g. a future "Gift Sets" collection) is a
 * two-step, code-only change and should never require touching
 * `CollectionPage.tsx`:
 *   1. Add a new config object below.
 *   2. Add a new ~10-line page file in `src/pages/` that renders
 *      `<CollectionPage config={theNewConfig} />` (see BodyCare.tsx /
 *      Fragrance.tsx for the pattern).
 */

export interface CollectionPageConfig {
  /** The Shopify collection handle passed to useCollectionProducts(). */
  collectionHandle: string;

  /** Browser tab title and <meta name="description">. */
  pageTitle: string;
  metaDescription: string;

  /** Open Graph tags (Facebook, etc). */
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;

  /** Twitter card tags. */
  twitterTitle: string;
  twitterDescription: string;

  /** Hero section icon + heading + subtitle. */
  heroIconSrc: string;
  heroIconAlt: string;
  heroHeading: string;
  heroSubtitle: string;
}

export const bodyCareConfig: CollectionPageConfig = {
  collectionHandle: "body",
  pageTitle: "Body Care Collection - Lumina",
  metaDescription:
    "Explore Lumina's fragrance-free body care collection. Gentle, effective skincare formulated for sensitive skin and everyday comfort.",
  ogTitle: "Body Care Collection - Lumina",
  ogDescription: "Fragrance-free body care formulated for sensitive skin and everyday comfort.",
  ogUrl: "https://luminaco.skin/body-care/",
  twitterTitle: "Body Care Collection - Lumina",
  twitterDescription: "Fragrance-free body care formulated for sensitive skin.",
  heroIconSrc: "/images/Icons/Body Care.png",
  heroIconAlt: "Body Care Icon",
  heroHeading: "Body Care Collection",
  heroSubtitle: "Fragrance-free body care formulated for sensitive skin and everyday comfort",
};

export const fragranceConfig: CollectionPageConfig = {
  collectionHandle: "fragrance",
  pageTitle: "Fragrance Collection - Lumina",
  metaDescription:
    "Explore Lumina's fragrance oil collection. Intentional scent, balanced and personal without being overpowering.",
  ogTitle: "Fragrance Collection - Lumina",
  ogDescription: "Explore Lumina's fragrance oil collection. Intentional scent, balanced and personal.",
  ogUrl: "https://luminaco.skin/fragrance/",
  twitterTitle: "Fragrance Collection - Lumina",
  twitterDescription: "Explore Lumina's fragrance oil collection.",
  heroIconSrc: "/images/Icons/Fragrance.png",
  heroIconAlt: "Fragrance Icon",
  heroHeading: "Fragrance Collection",
  heroSubtitle: "Intentional scent, balanced and personal without being overpowering",
};
