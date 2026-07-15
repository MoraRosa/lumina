/**
 * Skip-to-content link (WCAG 2.1 SC 2.4.1 "Bypass Blocks").
 *
 * Rendered once, inside Navbar, so every page gets it automatically without
 * having to add it to each page file individually. Every page's <main>
 * element must have id="main-content" for this to have something to jump
 * to -- see the <main id="main-content"> wrapper added to each page.
 *
 * Visually hidden by default; becomes visible (and is the very first
 * focusable element on the page) as soon as a keyboard user tabs to it.
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to main content
    </a>
  );
};
