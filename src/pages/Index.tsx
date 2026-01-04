import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Try to fetch from "home-page" collection first, fallback to all products
  const { data: homePageProducts = [], isLoading: isLoadingHomePage } = useCollectionProducts('home-page', 8);
  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts(8);

  // Use home-page collection if it has products, otherwise use all products
  const products = homePageProducts.length > 0 ? homePageProducts : allProducts;
  const productsLoading = homePageProducts.length > 0 ? isLoadingHomePage : isLoadingAll;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Hero Section */}
      <section className="relative bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Self-care, made with intention.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8 px-4 leading-relaxed max-w-3xl mx-auto">
              Lumina creates clean-inspired bath, body, and fragrance essentials designed to feel calm, comforting, and easy to return to. From fragrance-free daily care to thoughtfully composed scent, each product is made in-house to support simple rituals that feel familiar, grounded, and quietly special.
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
      </section>

      {/* Products Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-8 sm:mb-12">
            Featured Products
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
      </section>

      {/* What People Are Saying Section */}
      <section className="relative bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-4 sm:mb-6">
            What People Are Saying
          </h2>
          <p className="text-center text-base sm:text-lg text-foreground/80 mb-8 sm:mb-12 max-w-2xl mx-auto">
            See what our customers are sharing about their Lumina experience
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* YouTube Video Embed */}
              <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 shadow-sm">
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/tjsSynxBSkI"
                    title="Lumina Skin products review by Planet Zabany"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-foreground/70">
                    Review by <span className="font-semibold">@PlanetZabany</span>
                  </p>
                </div>
              </div>

              {/* Quote and CTA */}
              <div className="text-center md:text-left">
                <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 mb-6">
                  <div className="text-4xl sm:text-5xl text-pastel-pink-medium mb-4">"</div>
                  <p className="text-lg sm:text-xl text-foreground/90 italic mb-4 leading-relaxed">
                    Lumina Skin products arrived so Happy new year or whatever
                  </p>
                  <p className="text-sm sm:text-base text-foreground/70 font-semibold">
                    — Planet Zabany
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 sm:p-8">
                  <p className="text-base sm:text-lg text-foreground/80 mb-4">
                    Have you tried Lumina? Share your experience and tag us!
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href="https://www.instagram.com/luminaco.skin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink rounded-full text-sm font-medium hover:bg-pastel-pink-medium transition-colors"
                    >
                      📷 Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@luminaco.skin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink rounded-full text-sm font-medium hover:bg-pastel-pink-medium transition-colors"
                    >
                      🎵 TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-8 sm:mb-12">
            Our Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pastel-pink flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Fragrance-Free Care</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                Skincare and body care formulated without added fragrance, designed for everyday comfort and sensitive skin
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pastel-pink flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Intentional Scent</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                Concentrated fragrance oil blends developed in-house, balanced and personal without being overpowering
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pastel-pink flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Handcrafted in Calgary</h3>
              <p className="text-sm sm:text-base text-foreground/80">
                Every product is independently formulated, made, and designed in-house with intention and care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              About Lumina
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-4 sm:mb-6 leading-relaxed">
              Lumina is a clean-inspired self-care and fragrance brand rooted in comfort, intention, and thoughtful craftsmanship.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
              Every Lumina product is independently formulated, made, and designed in-house, from the formulas themselves to the packaging, labels, and artwork. We offer both fragrance-free skincare and body care, alongside a carefully developed fragrance line, giving you full control over how scent shows up in your routine.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Ready to explore?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8">
              Discover products designed to feel calm, comforting, and easy to return to
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
      </section>

      <Footer />
    </div>
  );
};

export default Index;
