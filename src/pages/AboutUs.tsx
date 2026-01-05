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
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src="/images/Lumina.png"
                alt="Lumina Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                About Lumina
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Clean-inspired self-care and fragrance, rooted in comfort, intention, and thoughtful craftsmanship
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              Our Story
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-pastel-green/10">
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Lumina is a clean-inspired self-care and fragrance brand rooted in comfort, intention, and thoughtful craftsmanship.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Every Lumina product is independently formulated, made, and designed in-house, from the formulas themselves
                to the packaging, labels, and artwork that surround them. The brand was created for those who value calm,
                familiarity, and clarity in their daily routines.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Lumina draws inspiration from cozy, nostalgic moments and translates them into modern, minimal products that
                feel refined yet approachable. The focus is not on excess or trend-driven beauty, but on creating everyday
                essentials that feel considered, honest, and easy to return to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/40">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Our Process
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-green/20 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                All Lumina products are hand-crafted in small batches, using original formulations developed entirely in-house.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-pink/30 flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Skincare and body care products are fragrance-free and designed with everyday comfort in mind, using
                cosmetic-grade ingredients selected for performance, texture, and consistency.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-green/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🌸</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Lumina's fragrance line is composed of concentrated fragrance oil blends, formulated without dilution oils
                or solvents. Each scent is intentionally developed to feel cohesive, balanced, and personal rather than overpowering.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pastel-green/10">
              <div className="w-12 h-12 rounded-full bg-pastel-pink/30 flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                In addition to formulation and production, all packaging design (including labels, artwork, and paper goods)
                is created, printed, and assembled in-house. This hands-on approach allows for close attention to quality,
                detail, and brand integrity at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Our Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-pastel-pink/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-pink flex items-center justify-center">
                <Heart className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fragrance-Free Care</h3>
              <p className="text-foreground/80">
                Skincare and body care formulated without added fragrance, designed for everyday comfort and sensitive skin
              </p>
            </div>

            <div className="bg-pastel-green/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-green flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intentional Scent</h3>
              <p className="text-foreground/80">
                Concentrated fragrance oil blends developed in-house, balanced and personal without being overpowering
              </p>
            </div>

            <div className="bg-pastel-purple/10 rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple flex items-center justify-center">
                <Shield className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Made In-House</h3>
              <p className="text-foreground/80">
                Independently formulated, handcrafted, and designed from formulation to packaging with full creative control
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Values Section */}
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
                  Materials
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Lumina uses cosmetic-grade ingredients commonly found in modern personal care and fragrance formulations.
                  Skincare and body care products include humectants, emollients, gentle surfactants, and plant-derived oils
                  and butters, and are formulated without added fragrance. The fragrance line uses concentrated fragrance oil
                  blends designed for direct wear and personal scent application.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pastel-green/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  Packaging
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Lumina packaging combines glass and plastic components sourced for product safety and durability. All packaging
                  design (including labels, artwork, and cardstock boxes) is designed, printed, and assembled in-house. Paper
                  materials are selected intentionally for structure, finish, and visual consistency with the brand's clean,
                  minimal aesthetic. Packaging is recyclable where facilities exist.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pastel-green/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">💚</span>
                  Our Values
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Lumina is a clean-inspired brand focused on clarity and transparency. Products are formulated using cosmetic-grade
                  ingredients, are not tested on animals, and are produced without added fragrance in the skincare and body care line.
                  Lumina does not currently hold third-party certifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Canadian Brand
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-4">
              Lumina is proudly based in Canada, serving customers nationwide with handcrafted,
              clean-inspired self-care and fragrance products.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default AboutUs;

