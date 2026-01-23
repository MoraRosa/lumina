import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RecentlyViewed } from "@/components/RecentlyViewed";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch body care products for hero carousel and featured section
  const { data: bodyProducts = [], isLoading: isLoadingBody } = useCollectionProducts('body', 10);

  // Fetch fragrance products for fragrance carousel
  const { data: fragranceProducts = [], isLoading: isLoadingFragrance } = useCollectionProducts('fragrance', 10);

  const products = bodyProducts.slice(0, 8); // Featured products (first 8)
  const productsLoading = isLoadingBody;

  // State for hero carousel (body care)
  const [heroSlide, setHeroSlide] = useState(0);

  // State for fragrance carousel
  const [fragranceSlide, setFragranceSlide] = useState(0);

  // Auto-advance hero carousel every 5 seconds
  useEffect(() => {
    if (bodyProducts.length === 0) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % bodyProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bodyProducts.length]);

  // Auto-advance fragrance carousel every 5 seconds
  useEffect(() => {
    if (fragranceProducts.length === 0) return;
    const timer = setInterval(() => {
      setFragranceSlide((prev) => (prev + 1) % fragranceProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [fragranceProducts.length]);

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % bodyProducts.length);
  };

  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + bodyProducts.length) % bodyProducts.length);
  };

  const nextFragranceSlide = () => {
    setFragranceSlide((prev) => (prev + 1) % fragranceProducts.length);
  };

  const prevFragranceSlide = () => {
    setFragranceSlide((prev) => (prev - 1 + fragranceProducts.length) % fragranceProducts.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Hero Section - Option 4: Full-Width Carousel (Body Care) */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {bodyProducts.length > 0 ? (
          <>
            {/* Carousel Images */}
            {bodyProducts.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === heroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            ))}

            {/* Minimal Text Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white z-10">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
                  Fragrance-Free Skincare & Body Care
                </h1>
                <p className="text-lg sm:text-xl mb-4 sm:mb-6 italic font-bold text-green-300">
                  Natural Beauty, Naturally You!
                </p>
                <Button
                  size="lg"
                  className="rounded-full px-6 sm:px-8"
                  onClick={() => navigate('/body-care')}
                >
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHeroSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </button>
            <button
              onClick={nextHeroSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </button>

            {/* Dot Indicators - Bottom Right */}
            <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-8 z-20 flex gap-2">
              {bodyProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === heroSlide
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pastel-purple to-pastel-pink flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg">
                Fragrance-Free Skincare & Body Care
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold mb-6 sm:mb-8 italic drop-shadow-lg">
                Natural Beauty, Naturally You!
              </p>
              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => navigate('/body-care')}
              >
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Featured Body Care Products Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Lumina creates clean-inspired bath and body essentials that are <strong>100% fragrance-free</strong> and perfect for sensitive skin. Pure, gentle care designed for everyday comfort that lets your skin breathe. Each product is made in-house to support simple rituals that feel calm, comforting, and easy to return to.
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

      {/* Recently Viewed Section */}
      <RecentlyViewed limit={4} />

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
            <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 sm:px-8 h-11 sm:h-12 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => navigate('/faq')}
              >
                Visit FAQ
              </Button>
              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 h-11 sm:h-12 shadow-lg hover:shadow-xl transition-shadow"
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

      {/* Explore Fragrance Collection - Option 3 Carousel */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg max-w-5xl mx-auto">
            {/* Carousel Images */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
              {isLoadingFragrance ? (
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <p className="text-foreground/60">Loading fragrance products...</p>
                </div>
              ) : fragranceProducts.length > 0 ? (
                <>
                  {fragranceProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === fragranceSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevFragranceSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
                    aria-label="Previous product"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextFragranceSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
                    aria-label="Next product"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <p className="text-foreground/60">No fragrance products available</p>
                </div>
              )}
            </div>

            {/* Text Content Below */}
            <div className="p-6 sm:p-8 md:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                Explore Our Fragrance Collection
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Concentrated fragrance oil blends developed in-house, balanced and personal without being overpowering
              </p>
              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => navigate('/fragrance')}
              >
                Shop Fragrance
              </Button>

              {/* Dots */}
              {fragranceProducts.length > 0 && (
                <div className="flex gap-2 justify-center mt-6">
                  {fragranceProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFragranceSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === fragranceSlide ? 'bg-primary w-8' : 'bg-primary/30'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
