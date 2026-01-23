import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items: favoriteItems } = useFavoritesStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Favorites - Lumina</title>
        <meta name="description" content="View your favorite Lumina products. Save and organize the products you love." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Favorites - Lumina" />
        <meta property="og:description" content="View your favorite Lumina products." />
        <meta property="og:url" content="https://luminaco.skin/favorites/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Favorites - Lumina" />
        <meta name="twitter:description" content="View your favorite Lumina products." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              ❤️ My Favorites
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              {favoriteItems.length === 0
                ? "You haven't added any favorites yet"
                : `${favoriteItems.length} ${favoriteItems.length === 1 ? 'product' : 'products'} saved`}
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Favorites Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16 max-w-md mx-auto">
              <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-foreground/20 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                No Favorites Yet
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8">
                Start adding products to your favorites by clicking the heart icon on any product card.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/body-care')}
                >
                  Shop Body Care
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/fragrance')}
                >
                  Shop Fragrance
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {favoriteItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    handle: item.handle,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    availableForSale: item.availableForSale,
                    description: '',
                    variantId: item.id, // Use product ID as variant ID for favorites
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Favorites;

