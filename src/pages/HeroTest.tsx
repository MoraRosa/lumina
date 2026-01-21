import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroTest = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: products = [], isLoading } = useProducts(6);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(products.length, 5));
    }, 5000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(products.length, 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(products.length, 5)) % Math.min(products.length, 5));
  };

  const displayProducts = products.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Hero Section Test Page</h1>
        <p className="text-center text-muted-foreground mb-12">
          Compare all 4 hero carousel options below
        </p>

        {/* Option 1: Background Images with Text Overlay */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Option 1: Background Images with Text Overlay</h2>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <p>Loading products...</p>
              </div>
            ) : displayProducts.length > 0 ? (
              <>
                {/* Carousel Images */}
                {displayProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                ))}

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-3xl px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                      Fragrance-Free Skincare & Body Care
                    </h1>
                    <p className="text-xl sm:text-2xl font-semibold mb-4 italic text-primary-foreground">
                      Natural Beauty, Naturally You!
                    </p>
                    <p className="text-lg mb-6">
                      100% fragrance-free and perfect for sensitive skin
                    </p>
                    <Button size="lg" className="rounded-full px-8">
                      Shop Now
                    </Button>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {displayProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p>No products available</p>
              </div>
            )}
          </div>
        </section>

        {/* Option 2: Split Layout - Text Left, Images Right */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Option 2: Split Layout (Text Left, Images Right)</h2>
          <div className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  Fragrance-Free Skincare & Body Care
                </h1>
                <p className="text-xl sm:text-2xl text-primary font-semibold mb-4 italic">
                  Natural Beauty, Naturally You!
                </p>
                <p className="text-lg mb-6">
                  100% fragrance-free and perfect for sensitive skin. Clean-inspired essentials for your daily routine.
                </p>
                <Button size="lg" className="rounded-full px-8">
                  Shop Now
                </Button>
              </div>

              {/* Carousel Images */}
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : displayProducts.length > 0 ? (
                  <>
                    {displayProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ))}

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {displayProducts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <p>No products</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Option 3: Images Above Text */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Option 3: Images Above Text</h2>
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Carousel Images */}
            <div className="relative h-[350px]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : displayProducts.length > 0 ? (
                <>
                  {displayProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <p>No products</p>
                </div>
              )}
            </div>

            {/* Text Content Below */}
            <div className="p-8 md:p-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Fragrance-Free Skincare & Body Care
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-semibold mb-4 italic">
                Natural Beauty, Naturally You!
              </p>
              <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
                100% fragrance-free and perfect for sensitive skin. Clean-inspired essentials for your daily routine.
              </p>
              <Button size="lg" className="rounded-full px-8">
                Shop Now
              </Button>

              {/* Dots */}
              {displayProducts.length > 0 && (
                <div className="flex gap-2 justify-center mt-6">
                  {displayProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-primary w-8' : 'bg-primary/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Option 4: Full-Width Carousel with Minimal Text */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Option 4: Full-Width Carousel (Minimal Text Overlay)</h2>
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <p>Loading products...</p>
              </div>
            ) : displayProducts.length > 0 ? (
              <>
                {/* Carousel Images */}
                {displayProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                ))}

                {/* Minimal Text Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                      Fragrance-Free Skincare & Body Care
                    </h1>
                    <p className="text-lg sm:text-xl mb-4 italic">
                      Natural Beauty, Naturally You!
                    </p>
                    <Button size="lg" className="rounded-full px-8">
                      Shop Now
                    </Button>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 right-8 flex gap-2">
                  {displayProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p>No products available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroTest;

