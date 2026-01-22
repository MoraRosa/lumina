import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/components/ProductCard";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from "embla-carousel-react";

interface RelatedProductsProps {
  currentProductId: string;
  currentProductHandle: string;
}

export const RelatedProducts = ({ currentProductId, currentProductHandle }: RelatedProductsProps) => {
  // Fetch from both collections
  const { data: bodyProducts = [] } = useCollectionProducts('body', 20);
  const { data: fragranceProducts = [] } = useCollectionProducts('fragrance', 20);

  // Determine which collection this product belongs to
  const { collectionProducts, isLoading } = useMemo(() => {
    // Check if current product is in fragrance collection
    const isInFragrance = fragranceProducts.some(p => p.id === currentProductId);

    if (isInFragrance) {
      return { collectionProducts: fragranceProducts, isLoading: false };
    }

    // Otherwise, it's in body collection
    return { collectionProducts: bodyProducts, isLoading: false };
  }, [bodyProducts, fragranceProducts, currentProductId]);

  // Filter out current product and shuffle all remaining products
  const relatedProducts = useMemo(() => {
    if (!collectionProducts || collectionProducts.length === 0) return [];

    // Filter out the current product
    const filtered = collectionProducts.filter(p => p.id !== currentProductId);

    // Shuffle all products
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled;
  }, [collectionProducts, currentProductId]);

  // Embla carousel setup
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  // Don't show section if no related products
  if (!isLoading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          You Might Also Like
        </h2>

        {isLoading ? (
          <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
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
              {relatedProducts.map((product) => (
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
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 text-[10px] sm:text-xs px-1.5 py-0.5"
                      >
                        Sold Out
                      </Badge>
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

