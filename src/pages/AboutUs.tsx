import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { Heart, Sparkles, Shield } from "lucide-react";

const AboutUs = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background pattern overlay */}
      <div className="fixed inset-0 bg-pattern-plus pointer-events-none" />

      <div className="relative z-10">
      <Helmet>
        <title>About Us - Lumina</title>
        <meta name="description" content="Lumina is a clean-inspired self-care and fragrance brand. Every product is independently formulated, handcrafted, and designed in-house with intention and care." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us - Lumina" />
        <meta property="og:description" content="Clean-inspired, handcrafted self-care and fragrance. Independently formulated and designed in-house." />
        <meta property="og:url" content="https://luminaco.skin/about/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Lumina" />
        <meta name="twitter:description" content="Clean-inspired, handcrafted self-care and fragrance. Independently formulated and designed in-house." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <img
                src="/images/Lumina.png"
                alt="Lumina Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                About Lumina
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-primary font-semibold mb-3 sm:mb-4 italic">
              Natural Beauty, Naturally You!
            </p>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Clean-inspired self-care and fragrance, rooted in comfort, intention, and thoughtful craftsmanship
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              Our Story
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 mb-6 leading-relaxed font-medium">
                Skincare doesn't need to perform gymnastics to be worthwhile.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                It doesn't need to multitask, overpower, or promise the impossible. Sometimes, it just needs to do one thing well and do it thoughtfully.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                That belief is at the heart of Lumina.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                We create straightforward skincare designed to nourish, hydrate, and feel good on the skin. No unnecessary extras. No loud fragrance. No pressure for a single product to be everything at once.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Just intentional formulations that respect your skin and your choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Keep Things Simple */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
              Why We Keep Things Simple
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10">
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                For years, I struggled with persistent, uncomfortable skin issues that no product seemed to help. After countless appointments and trial-and-error solutions, misdiagnoses and being mis-medicated, what finally worked wasn't a miracle formula.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                It was simplicity.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Stepping back, removing what didn't serve my skin, and paying attention to how it actually responded.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                That experience shaped how I think about skincare today. I'm not anti-science, anti-ingredients, or anti-fragrance as a concept. I simply believe skincare should be purposeful. A body butter can just be a body butter. A cleanser can just cleanse. If you want fragrance, exfoliation, or actives, that should be a choice, not something bundled into every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How That Shows Up in Our Products */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
              How That Shows Up in Our Products
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10">
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Every Lumina product is formulated with intention. Ingredients are chosen carefully, formulas are kept focused, and everything is made to feel comforting, not overwhelming.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Our body butters are deeply moisturizing without being greasy, designed especially for dry skin and harsh winters, without unnecessary complexity.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Nothing is added for the sake of marketing. Each product has a clear role, and it does that job well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Want You to Feel */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
              How We Want You to Feel
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10">
              <p className="text-lg sm:text-xl text-foreground/90 mb-6 leading-relaxed font-medium">
                Calm. Comfortable. Taken care of.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Like clean sheets, fresh pajamas, and a quiet moment where everything feels in order. Not perfumed, not overstimulated, just at ease in your own skin.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed italic">
                If this way of thinking resonates with you, Lumina might be for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make It */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            How We Make It
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-green/20 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                All Lumina products are hand-crafted in small batches, using original formulations developed entirely in-house. From the formulas themselves to the packaging, labels, and artwork, everything is created here.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-pink/30 flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Our skincare and body care products are fragrance-free and designed with everyday comfort in mind, using cosmetic-grade ingredients selected for performance, texture, and consistency.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-green/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🌸</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Our fragrance line is composed of concentrated fragrance oil blends, formulated without dilution oils or solvents. Each scent is intentionally developed to feel cohesive, balanced, and personal rather than overpowering.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-pink/30 flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                In addition to formulation and production, all packaging design (including labels, artwork, and paper goods) is created, printed, and assembled in-house. This hands-on approach allows for close attention to quality, detail, and brand integrity at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Guides Us */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            What Guides Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-pastel-pink/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-pink flex items-center justify-center">
                <Heart className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fragrance-Free Care</h3>
              <p className="text-foreground/80">
                Our skincare and body care are formulated without added fragrance, designed for everyday comfort, sensitive skin, and anyone who prefers their products to just work without announcing themselves.
              </p>
            </div>

            <div className="bg-pastel-green/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-green flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intentional Scent</h3>
              <p className="text-foreground/80">
                When we do create fragrance, it's concentrated, carefully balanced, and developed in-house. Our fragrance oils are personal without being overpowering, meant to feel like an extension of you, not a statement.
              </p>
            </div>

            <div className="bg-pastel-purple/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple flex items-center justify-center">
                <Shield className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Made In-House</h3>
              <p className="text-foreground/80">
                Everything, from formulation to packaging design, is created here. This hands-on approach gives us full creative control and allows us to maintain the quality, consistency, and intention behind every product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Use & Our Approach */}
      <section className="py-12 sm:py-16 md:py-20 bg-pastel-pink/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              What We Use
            </h2>
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pastel-green/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🧴</span>
                  Ingredients
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  We use cosmetic-grade ingredients commonly found in modern personal care and fragrance formulations. Our skincare and body care products include humectants, emollients, gentle surfactants, and plant-derived oils and butters, all formulated without added fragrance. Our fragrance line uses concentrated fragrance oil blends designed for direct wear and personal scent application.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pastel-green/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  Packaging
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Our packaging combines glass and plastic components sourced for product safety and durability. All design work, including labels, artwork, and cardstock boxes, is created, printed, and assembled in-house. We select paper materials intentionally for structure, finish, and visual consistency. Packaging is recyclable where facilities exist.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pastel-green/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">💚</span>
                  Our Values
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Lumina is a clean-inspired brand focused on clarity and transparency. Our products are formulated using cosmetic-grade ingredients, are not tested on animals, and our skincare and body care line is produced without added fragrance. We don't currently hold third-party certifications. We're focused on making products that work and being honest about what they are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Made in Canada
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Lumina is based in Canada, where every product is formulated, handcrafted, and packaged. We serve customers nationwide with clean-inspired self-care and fragrance designed for comfort, clarity, and everyday ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default AboutUs;

