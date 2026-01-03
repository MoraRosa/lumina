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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Us - Lumina Skincare</title>
        <meta name="description" content="Learn about Lumina Skincare - a Calgary-based startup launched in December 2024, dedicated to gentle, fragrance-free skincare for sensitive skin." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us - Lumina Skincare" />
        <meta property="og:description" content="Learn about Lumina Skincare - a Calgary-based startup dedicated to gentle, fragrance-free skincare." />
        <meta property="og:url" content="https://luminaco.skin/about/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Lumina Skincare" />
        <meta name="twitter:description" content="Learn about Lumina Skincare - a Calgary-based startup dedicated to gentle, fragrance-free skincare." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-pink to-pastel-pink/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              ✨ About Lumina ✨
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4">
              Your journey to gentle, effective skincare starts here
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
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                {/* PLACEHOLDER: User will provide their brand story */}
                Founded in Calgary, Alberta in December 2024, Lumina Skincare was born from a simple belief: 
                everyone deserves skincare that's gentle, effective, and free from unnecessary irritants.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                {/* PLACEHOLDER: User will provide more content */}
                As a Calgary-based startup, we're proud to serve customers across Canada with products 
                designed specifically for sensitive skin. Our fragrance-free, allergen-free formulas are 
                crafted with care to nourish and protect your skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-pastel-purple/10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-pink flex items-center justify-center">
                <Heart className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gentle Care</h3>
              <p className="text-foreground/80">
                Formulated for sensitive skin with fragrance-free, allergen-free ingredients
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-green flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-foreground/80">
                Premium ingredients and careful formulation for effective results
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple flex items-center justify-center">
                <Shield className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-foreground/80">
                Clear ingredient lists and honest communication about our products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Based in Calgary, Serving Canada
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-4">
              We're a proud Calgary, Alberta startup that launched in December 2024. 
              We ship our gentle skincare products across Canada, bringing effective, 
              fragrance-free solutions to sensitive skin everywhere.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

