import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { ZigzagEdge } from "@/components/edges/ZigzagEdge";
import { MultiScallopEdge } from "@/components/edges/MultiScallopEdge";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pastel-pink to-pastel-pink/80 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              ✨ Lumina Skincare ✨
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 mb-8">
              Gentle, fragrance-free skincare for sensitive skin
            </p>
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Shop Now
            </Button>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--pastel-green))" position="bottom" />
      </section>

      {/* Features Section */}
      <section className="relative bg-pastel-green py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Why Choose Lumina?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fragrance-Free</h3>
              <p className="text-foreground/80">
                No irritating fragrances, just pure skincare goodness
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sensitive Skin</h3>
              <p className="text-foreground/80">
                Formulated specifically for dry and sensitive skin types
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Allergen-Free</h3>
              <p className="text-foreground/80">
                Free from common allergens and irritants
              </p>
            </div>
          </div>
        </div>
        <ZigzagEdge color="hsl(var(--secondary))" position="bottom" />
      </section>

      {/* Products Section */}
      <section className="relative bg-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Our Products
          </h2>
          <p className="text-center text-foreground/80 mb-8">
            Connect your Shopify store to display products here
          </p>
        </div>
        <MultiScallopEdge color="hsl(var(--pastel-pink))" position="bottom" />
      </section>

      {/* About Section */}
      <section className="relative bg-pastel-pink py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              About Lumina
            </h2>
            <p className="text-lg text-foreground/90 mb-6">
              We believe everyone deserves skincare that works with their skin, not against it.
              That's why we created Lumina - a line of gentle, effective products designed
              specifically for sensitive skin.
            </p>
            <p className="text-lg text-foreground/90">
              Every product is carefully formulated without fragrances, common irritants,
              or allergens. Just pure, nourishing ingredients that help your skin thrive.
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--pastel-green))" position="bottom" />
      </section>

      {/* CTA Section */}
      <section className="bg-pastel-green py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Skincare Routine?
            </h2>
            <p className="text-lg text-foreground/90 mb-8">
              Join thousands of happy customers with sensitive skin
            </p>
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
