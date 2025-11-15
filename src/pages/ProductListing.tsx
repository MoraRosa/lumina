import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useProducts } from "@/hooks/useProducts";

const ProductListing = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: products = [], isLoading } = useProducts(20);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              ✨ Our Products ✨
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4">
              Discover our gentle, fragrance-free skincare collection
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {isLoading || products.length === 0 ? (
            <div className="text-center py-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Coming Soon! 🌸
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                We're currently setting up our Shopify store.
                Our beautiful skincare products will be available here very soon!
              </p>
            </div>
          ) : (
            <ProductGrid
              products={products}
              isLoading={isLoading}
              emptyMessage="No products available at the moment"
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductListing;

