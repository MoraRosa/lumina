import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useProducts } from "@/hooks/useProducts";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
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

// Responsive products per page: 6 on mobile, 12 on desktop
const getProductsPerPage = () => {
  if (typeof window === 'undefined') return 12;
  return window.innerWidth < 768 ? 6 : 12;
};

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  // Get state from URL params or use defaults
  const selectedCategory = (searchParams.get('category') as Category) || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const sortOption = (searchParams.get('sort') as SortOption) || 'alphabetical-asc';
  const searchQuery = searchParams.get('search') || '';

  // Update products per page on window resize
  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = getProductsPerPage();
      if (newProductsPerPage !== productsPerPage) {
        setProductsPerPage(newProductsPerPage);
        // Reset to page 1 when changing products per page
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1');
        setSearchParams(newParams);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [productsPerPage, searchParams, setSearchParams]);

  // Fetch products based on selected category
  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts(250);
  const { data: fragranceProducts = [], isLoading: isLoadingFragrance } = useCollectionProducts('fragrance', 250);
  const { data: bodyProducts = [], isLoading: isLoadingBody } = useCollectionProducts('body', 250);

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

  // Filter and sort products
  const products = useMemo(() => {
    // First, filter by search query
    let filtered = [...unsortedProducts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Then, sort the filtered results
    switch (sortOption) {
      case 'alphabetical-asc':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'alphabetical-desc':
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        });
      case 'price-desc':
        return filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceB - priceA;
        });
      default:
        return filtered;
    }
  }, [unsortedProducts, sortOption, searchQuery]);

  // Calculate pagination
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Update URL params when state changes
  const updateParams = (updates: { category?: Category; page?: number; sort?: SortOption; search?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    if (updates.category !== undefined) {
      newParams.set('category', updates.category);
    }
    if (updates.page !== undefined) {
      newParams.set('page', updates.page.toString());
    }
    if (updates.sort !== undefined) {
      newParams.set('sort', updates.sort);
    }
    if (updates.search !== undefined) {
      if (updates.search) {
        newParams.set('search', updates.search);
      } else {
        newParams.delete('search');
      }
    }

    setSearchParams(newParams);
  };

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: Category) => {
    updateParams({ category, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: SortOption) => {
    updateParams({ sort: value, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ search: value, page: 1 });
  };

  const handleClearSearch = () => {
    updateParams({ search: '', page: 1 });
  };

  const categoryTitle = selectedCategory === 'fragrance'
    ? 'Fragrance Line'
    : selectedCategory === 'body'
    ? 'Bath & Body Line'
    : 'All Products';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{categoryTitle} - Lumina Skincare</title>
        <meta name="description" content="Shop our gentle, fragrance-free skincare collection designed for sensitive skin. Browse our Fragrance Line and Bath & Body Line." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${categoryTitle} - Lumina Skincare`} />
        <meta property="og:description" content="Shop our gentle, fragrance-free skincare collection designed for sensitive skin." />
        <meta property="og:url" content="https://luminaco.skin/products/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryTitle} - Lumina Skincare`} />
        <meta name="twitter:description" content="Shop our gentle, fragrance-free skincare collection designed for sensitive skin." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              🛍️ Our Products 🧴
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
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-md mx-auto sm:mx-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-10 rounded-full h-10 sm:h-11"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Product Count and Sort Dropdown */}
          {!isLoading && totalProducts > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
              <p className="text-sm sm:text-base text-foreground/70">
                Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
                {searchQuery && <span className="font-semibold"> for "{searchQuery}"</span>}
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

