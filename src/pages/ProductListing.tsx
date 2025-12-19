import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useProducts } from "@/hooks/useProducts";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/components/ProductCard";

type Category = 'all' | 'fragrance' | 'body';
type SortOption = 'alphabetical-asc' | 'alphabetical-desc' | 'price-asc' | 'price-desc';

const PRODUCTS_PER_PAGE = 12;

const ProductListing = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical-asc');

  // Fetch products based on selected category
  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts(100);
  const { data: fragranceProducts = [], isLoading: isLoadingFragrance } = useCollectionProducts('fragrance', 100);
  const { data: bodyProducts = [], isLoading: isLoadingBody } = useCollectionProducts('body', 100);

  // Get current products based on selected category
  const { products: unsortedProducts, isLoading } = useMemo(() => {
    switch (selectedCategory) {
      case 'fragrance':
        return { products: fragranceProducts, isLoading: isLoadingFragrance };
      case 'body':
        return { products: bodyProducts, isLoading: isLoadingBody };
      default:
        return { products: allProducts, isLoading: isLoadingAll };
    }
  }, [selectedCategory, allProducts, fragranceProducts, bodyProducts, isLoadingAll, isLoadingFragrance, isLoadingBody]);

  // Sort products based on selected sort option
  const products = useMemo(() => {
    const sorted = [...unsortedProducts];

    switch (sortOption) {
      case 'alphabetical-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'alphabetical-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        });
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceB - priceA;
        });
      default:
        return sorted;
    }
  }, [unsortedProducts, sortOption]);

  // Calculate pagination
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              ✨ Our Products ✨
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Discover our gentle, fragrance-free skincare collection
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Category Filter Tabs */}
      <section className="py-6 sm:py-8 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('all')}
              className="rounded-full px-4 sm:px-6 h-9 sm:h-10 text-sm sm:text-base"
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === 'fragrance' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('fragrance')}
              className="rounded-full px-4 sm:px-6 h-9 sm:h-10 text-sm sm:text-base"
            >
              Fragrance
            </Button>
            <Button
              variant={selectedCategory === 'body' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('body')}
              className="rounded-full px-4 sm:px-6 h-9 sm:h-10 text-sm sm:text-base"
            >
              Bath & Body
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Product Count and Sort Dropdown */}
          {!isLoading && totalProducts > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
              <p className="text-sm sm:text-base text-foreground/70">
                Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
              </p>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70 whitespace-nowrap">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] rounded-full h-9 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical-asc">A-Z</SelectItem>
                    <SelectItem value="alphabetical-desc">Z-A</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {isLoading || currentProducts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {isLoading ? 'Loading...' : 'No products found 🌸'}
              </h2>
              {!isLoading && (
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {selectedCategory === 'all'
                    ? "We're currently setting up our Shopify store. Our beautiful skincare products will be available here very soon!"
                    : `No products in the ${selectedCategory} category yet.`
                  }
                </p>
              )}
            </div>
          ) : (
            <ProductGrid
              products={currentProducts}
              isLoading={isLoading}
              emptyMessage="No products available at the moment"
            />
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Previous Button */}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full px-4 sm:px-6 h-10 sm:h-11"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange(page)}
                    className="rounded-full w-10 h-10 sm:w-11 sm:h-11 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full px-4 sm:px-6 h-10 sm:h-11"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductListing;

