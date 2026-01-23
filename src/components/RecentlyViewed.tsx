import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from "embla-carousel-react";

interface RecentlyViewedProps {
  currentProductId?: string; // Optional - exclude current product if on product detail page
  limit?: number; // How many products to show (default: 4)
}

export const RecentlyViewed = ({ currentProductId, limit = 4 }: RecentlyViewedProps) => {
  const { getRecentlyViewedHandles } = useRecentlyViewed();
  const { data: allProducts = [], isLoading } = useProducts();

  // Get recently viewed product handles
  const recentlyViewedHandles = useMemo(() => {
    return getRecentlyViewedHandles(currentProductId, limit);
  }, [getRecentlyViewedHandles, currentProductId, limit]);

  // Filter products by handles
  const recentlyViewedProducts = useMemo(() => {
    if (!allProducts.length || !recentlyViewedHandles.length) return [];
    
    // Maintain order from recentlyViewedHandles
    return recentlyViewedHandles
      .map(handle => allProducts.find(p => p.handle === handle))
      .filter(Boolean);
  }, [allProducts, recentlyViewedHandles]);

  // Embla carousel setup
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  // Don't show section if no recently viewed products
  if (!isLoading && recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          Recently Viewed
        </h2>

        {isLoading ? (
          <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[140px] sm:w-[180px] space-y-2">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 sm:gap-4">
              {recentlyViewedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.handle}`}
                  className="flex-shrink-0 w-[140px] sm:w-[180px] group"
                >
                  <div className="relative aspect-[3/4] mb-2 sm:mb-3 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {!product.availableForSale && (
                      <>
                        <div className="absolute inset-0 bg-black/40" />
                        <Badge
                          variant="secondary"
                          className="absolute top-2 right-2 text-[10px] sm:text-xs px-1.5 py-0.5"
                        >
                          Sold Out
                        </Badge>
                      </>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-semibold">{product.price}</p>
                    {product.compareAtPrice && product.compareAtPrice !== '$0.00' && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-through">
                        {product.compareAtPrice}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

