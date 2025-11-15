import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { ZigzagEdge } from "@/components/edges/ZigzagEdge";
import { MultiScallopEdge } from "@/components/edges/MultiScallopEdge";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { data: products = [], isLoading: productsLoading } = useProducts(8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pastel-pink to-pastel-pink/80 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              ✨ Lumina Skincare ✨
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 mb-6 sm:mb-8 px-4">
              Gentle, fragrance-free skincare for sensitive skin
            </p>
            <Button
              size="lg"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--pastel-green))" position="bottom" />
      </section>

      {/* Features Section */}
      <section className="relative bg-pastel-green py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-8 sm:mb-12">
            Why Choose Lumina?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center hover:bg-background/60 transition-colors">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Fragrance-Free</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                No irritating fragrances, just pure skincare goodness
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center hover:bg-background/60 transition-colors">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Sensitive Skin</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                Formulated specifically for dry and sensitive skin types
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center hover:bg-background/60 transition-colors sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Allergen-Free</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                Free from common allergens and irritants
              </p>
            </div>
          </div>
        </div>
        <ZigzagEdge color="hsl(var(--secondary))" position="bottom" />
      </section>

      {/* Products Section */}
      <section className="relative bg-secondary py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-8 sm:mb-12">
            ✨ Featured Products ✨
          </h2>
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} isLoading={productsLoading} />
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  size="lg"
                  className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/products')}
                >
                  View All Products
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 px-4">
              <p className="text-base sm:text-lg text-foreground/80 mb-4">
                {productsLoading
                  ? "Loading products..."
                  : "Connect your Shopify store to display products here"}
              </p>
              {!productsLoading && (
                <p className="text-sm text-muted-foreground">
                  Set up your .env.local file with Shopify credentials
                </p>
              )}
            </div>
          )}
        </div>
        <MultiScallopEdge color="hsl(var(--pastel-pink))" position="bottom" />
      </section>

      {/* About Section */}
      <section className="relative bg-pastel-pink py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              About Lumina
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-4 sm:mb-6 leading-relaxed">
              We believe everyone deserves skincare that works with their skin, not against it.
              That's why we created Lumina - a line of gentle, effective products designed
              specifically for sensitive skin.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
              Every product is carefully formulated without fragrances, common irritants,
              or allergens. Just pure, nourishing ingredients that help your skin thrive.
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--pastel-green))" position="bottom" />
      </section>

      {/* CTA Section */}
      <section className="bg-pastel-green py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Ready to Transform Your Skincare Routine?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8">
              Join thousands of happy customers with sensitive skin
            </p>
            <Button
              size="lg"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
