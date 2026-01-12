import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch body care products for featured section
  const { data: bodyProducts = [], isLoading: isLoadingBody } = useCollectionProducts('body', 8);

  const products = bodyProducts;
  const productsLoading = isLoadingBody;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Hero Section */}
      <section className="relative bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              100% Fragrance-Free Skincare & Body Care
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8 px-4 leading-relaxed max-w-3xl mx-auto">
              Lumina creates clean-inspired bath and body essentials that are <strong>100% fragrance-free</strong> and perfect for sensitive skin. Each product is made in-house to support simple rituals that feel calm, comforting, and easy to return to.
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

      {/* Featured Body Care Products Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              <strong>100% fragrance-free</strong> skincare and body care formulated for sensitive skin. Pure, gentle care designed for everyday comfort that lets your skin breathe.
            </p>
          </div>
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} isLoading={productsLoading} />
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  size="lg"
                  className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/body-care')}
                >
                  Shop Body Care
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

      {/* Didn't Find What You're Looking For Section */}
      <section className="relative bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Didn't find what you're looking for?
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8">
              We're here to help! Check out our FAQ or get in touch with us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 sm:px-8 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => navigate('/faq')}
              >
                Visit FAQ
              </Button>
              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
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

      {/* Explore Fragrance Collection CTA Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Explore Fragrance Collection
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8">
              Concentrated fragrance oil blends developed in-house, balanced and personal without being overpowering
            </p>
            <Button
              size="lg"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/fragrance')}
            >
              Shop Fragrance
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
