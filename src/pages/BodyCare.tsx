import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
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

type SortOption = 'alphabetical-asc' | 'alphabetical-desc' | 'price-asc' | 'price-desc';

const getProductsPerPage = () => {
  if (typeof window === 'undefined') return 12;
  return window.innerWidth < 768 ? 6 : 12;
};

const BodyCare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const sortOption = (searchParams.get('sort') as SortOption) || 'alphabetical-asc';

  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = getProductsPerPage();
      if (newProductsPerPage !== productsPerPage) {
        setProductsPerPage(newProductsPerPage);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1');
        setSearchParams(newParams);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [productsPerPage, searchParams, setSearchParams]);

  const { data: bodyProducts = [], isLoading } = useCollectionProducts('body', 250);

  const products = useMemo(() => {
    const sorted = [...bodyProducts];

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
  }, [bodyProducts, sortOption]);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const updateParams = (updates: { page?: number; sort?: SortOption }) => {
    const newParams = new URLSearchParams(searchParams);

    if (updates.page !== undefined) {
      newParams.set('page', updates.page.toString());
    }
    if (updates.sort !== undefined) {
      newParams.set('sort', updates.sort);
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: SortOption) => {
    updateParams({ sort: value, page: 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Body Care Collection - Lumina</title>
        <meta name="description" content="Explore Lumina's fragrance-free body care collection. Gentle, effective skincare formulated for sensitive skin and everyday comfort." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Body Care Collection - Lumina" />
        <meta property="og:description" content="Fragrance-free body care formulated for sensitive skin and everyday comfort." />
        <meta property="og:url" content="https://luminaco.skin/body-care/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Body Care Collection - Lumina" />
        <meta name="twitter:description" content="Fragrance-free body care formulated for sensitive skin." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img
                src="/images/Icons/Body Care.png"
                alt="Body Care Icon"
                className="h-16 sm:h-20 md:h-24 w-auto -ml-12 sm:-ml-16 md:-ml-20"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Body Care Collection
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Fragrance-free body care formulated for sensitive skin and everyday comfort
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Sort Controls */}
      <section className="py-6 sm:py-8 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-foreground/70">
              Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
            </p>
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ProductGrid products={currentProducts} isLoading={isLoading} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full px-4 sm:px-6 h-10 sm:h-11"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange(page)}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>

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

export default BodyCare;

