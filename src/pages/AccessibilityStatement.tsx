import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";

const AccessibilityStatement = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accessibility Statement - Lumina</title>
        <meta
          name="description"
          content="Lumina's commitment to digital accessibility -- what we've done, what we're working on, and how to report an accessibility barrier."
        />
        <link rel="canonical" href="https://luminaco.skin/accessibility" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      <main id="main-content">
        {/* Header Section */}
        <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                Accessibility Statement
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
                Our ongoing commitment to a website everyone can use
              </p>
            </div>
          </div>
          <ScallopedEdge color="hsl(var(--background))" position="bottom" />
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p>
                  Lumina is committed to making our website usable by everyone, including
                  people who use assistive technology such as screen readers, rely on
                  keyboard navigation, or have low vision, color blindness, or motor or
                  cognitive disabilities. We're working toward conformance with the{" "}
                  <a
                    href="https://www.w3.org/WAI/WCAG21/quickref/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Web Content Accessibility Guidelines (WCAG) 2.1
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  at Level AA, and we treat this as an ongoing responsibility rather than a
                  box to check once.
                </p>
                <p className="mt-4">
                  In the interest of being straightforward with you: we haven't completed a
                  full, formal, independent accessibility audit of every page, so we're not
                  claiming certified full conformance. What follows is an honest account of
                  what we've actually built and verified, and where we still have work to do.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What We've Done
                </h2>
                <p>Concrete accessibility work on this site so far includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    A "skip to main content" link at the very start of every page, so
                    keyboard users don't have to tab through the full navigation menu just
                    to reach the content
                  </li>
                  <li>
                    A proper <code>&lt;main&gt;</code> landmark on every page, so
                    screen-reader users can jump straight to content using landmark
                    navigation
                  </li>
                  <li>
                    Full keyboard support and focus management on interactive elements
                    like the review-photo lightbox: it opens with focus moved to it,
                    closes with the Escape key, keeps keyboard focus contained while open,
                    and returns focus to where you were when you close it
                  </li>
                  <li>Alt text on product and review images</li>
                  <li>
                    A responsive layout that supports browser zoom and different text
                    sizes without breaking
                  </li>
                  <li>
                    Respect for your device's "reduce motion" preference where animations
                    are used
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What We're Still Working On
                </h2>
                <p>
                  Accessibility is an ongoing process, not a finished project. Areas we know
                  need continued attention include broader automated and manual testing
                  across every page (including with real screen readers), and periodically
                  re-checking color contrast as our visual design evolves.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Let Us Know What You Find
                </h2>
                <p>
                  If you run into anything on this site that's hard to use with a
                  screen reader, keyboard alone, or any other assistive technology --
                  or if something here just doesn't work the way you'd expect -- please
                  tell us. You're not bothering us; this is genuinely how we find out
                  what to fix next.
                </p>
                <div className="bg-primary/5 p-6 rounded-lg mt-4">
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:hello@luminaco.skin?subject=Accessibility%20Feedback"
                      className="text-primary hover:underline font-semibold"
                    >
                      hello@luminaco.skin
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-foreground/70">
                    Please include the page you were on and, if you can, what device or
                    assistive technology you were using -- it helps us reproduce and fix
                    the issue faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityStatement;
