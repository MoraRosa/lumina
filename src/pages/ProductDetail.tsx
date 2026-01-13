import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useProduct } from "@/hooks/useProduct";
import { MediaItem } from "@/components/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { extractNumericId } from "@/lib/utils";
import { getProductReviews } from "@/data/reviews";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const judgeReviewsRef = useRef<HTMLDivElement>(null);

  const { data: product, isLoading } = useProduct(handle);

  // Get reviews for this product from centralized data
  const productReviews = product ? getProductReviews(extractNumericId(product.id)) : null;

  // Combine images and media for display
  const allMedia: MediaItem[] = product?.media || [];
  const displayMedia = allMedia.length > 0 ? allMedia :
    (product?.images?.map((url, idx) => ({
      id: `img-${idx}`,
      type: 'IMAGE' as const,
      url,
      altText: product.title,
    })) || []);

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedMediaIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0],
      variantId: product.variantId,
    });

    toast.success(`${quantity} × ${product.title} added to cart! ✨`, {
      description: "View your cart to checkout",
    });

    setQuantity(1);
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Skeleton className="h-8 w-24 sm:w-32 mb-6 sm:mb-8 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <div className="space-y-3 sm:space-y-4">
              <Skeleton className="aspect-square rounded-3xl" />
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl sm:rounded-2xl" />
                ))}
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <Skeleton className="h-10 sm:h-12 w-3/4 rounded-xl" />
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-20 sm:h-24 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/products")} className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.compareAtPrice &&
    parseFloat(product.compareAtPrice.replace(/[^0-9.]/g, "")) >
    parseFloat(product.price.replace(/[^0-9.]/g, ""));

  // Get first image for OG tags
  const ogImage = displayMedia.length > 0 && displayMedia[0].type === 'IMAGE'
    ? displayMedia[0].url
    : displayMedia[0]?.previewUrl || 'https://luminaco.skin/images/og%20image.png';

  const pageUrl = `https://luminaco.skin/products/${handle}`;
  const description = product.description?.substring(0, 160) || `Shop ${product.title} at Lumina Skincare - Gentle, fragrance-free skincare for sensitive skin.`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{product.title} - Lumina Skincare</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.title} - Lumina Skincare`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:price:amount" content={product.price.replace(/[^0-9.]/g, "")} />
        <meta property="og:price:currency" content="USD" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} - Lumina Skincare`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 rounded-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Product Media Gallery with Carousel */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Carousel */}
            <div className="relative group">
              <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {displayMedia.length > 0 ? (
                    displayMedia.map((media, index) => (
                      <div key={media.id} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-square bg-muted ring-2 ring-border/20 rounded-3xl overflow-hidden">
                          {media.type === 'IMAGE' && (
                            <img
                              src={media.url}
                              alt={media.altText || product.title}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                          )}
                          {media.type === 'VIDEO' && (
                            <video
                              src={media.url}
                              poster={media.previewUrl}
                              controls
                              className="w-full h-full object-cover"
                              playsInline
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {media.type === 'MODEL_3D' && (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                              <model-viewer
                                src={media.url}
                                alt={media.altText || product.title}
                                poster={media.previewUrl}
                                auto-rotate
                                camera-controls
                                style={{ width: '100%', height: '100%' }}
                              />
                            </div>
                          )}
                          {media.type === 'EXTERNAL_VIDEO' && (
                            <div className="w-full h-full">
                              <iframe
                                src={media.embedUrl}
                                title={media.altText || product.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-[0_0_100%] min-w-0">
                      <div className="aspect-square bg-muted ring-2 ring-border/20 rounded-3xl overflow-hidden flex items-center justify-center">
                        <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              {displayMedia.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollPrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {displayMedia.length > 1 && (
              <div className="overflow-hidden" ref={emblaThumbsRef}>
                <div className="flex gap-2 sm:gap-3">
                  {displayMedia.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => onThumbClick(index)}
                      className={`flex-[0_0_23%] sm:flex-[0_0_23%] min-w-0 aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedMediaIndex === index
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      {media.type === 'IMAGE' && (
                        <img
                          src={media.url}
                          alt={media.altText || `${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      )}
                      {(media.type === 'VIDEO' || media.type === 'MODEL_3D' || media.type === 'EXTERNAL_VIDEO') && media.previewUrl && (
                        <div className="relative w-full h-full">
                          <img
                            src={media.previewUrl}
                            alt={media.altText || `${product.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center">
                              {media.type === 'VIDEO' || media.type === 'EXTERNAL_VIDEO' ? (
                                <div className="w-0 h-0 border-l-6 sm:border-l-8 border-l-black border-y-3 sm:border-y-4 border-y-transparent ml-0.5 sm:ml-1" />
                              ) : (
                                <span className="text-[10px] sm:text-xs font-bold">3D</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{product.title}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                  {product.price}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg sm:text-xl text-foreground/60 line-through">
                      {product.compareAtPrice}
                    </span>
                    <Badge variant="destructive" className="text-xs sm:text-sm">Sale</Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4">Description</h3>
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
              />
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3">Quantity</h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 hover:scale-110 transition-transform"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xl sm:text-2xl font-bold w-10 sm:w-12 text-center bg-muted rounded-full py-2">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 hover:scale-110 transition-transform"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.availableForSale}
              className="w-full py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {product.availableForSale ? "Add to Cart" : "Out of Stock"}
            </Button>

            {!product.availableForSale && (
              <p className="text-center text-sm sm:text-base text-muted-foreground">
                This product is currently out of stock
              </p>
            )}
          </div>
        </div>

        {/* Judge.me Reviews Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Separator className="mb-8 sm:mb-12" />

            {/* Reviews Widget Container */}
            <div ref={judgeReviewsRef} className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Customer Reviews</h2>

              {/* Custom Reviews Display - Only show if product has reviews */}
              {productReviews ? (
                <div className="mb-8">
                  {/* Average Rating Summary */}
                  <div className="flex items-center justify-center gap-4 mb-8 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{productReviews.averageRating.toFixed(1)}</div>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= productReviews.averageRating
                                ? 'fill-yellow-500 stroke-yellow-600'
                                : 'fill-gray-200 stroke-gray-300'
                            }`}
                            strokeWidth="1"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {productReviews.totalReviews} {productReviews.totalReviews === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {productReviews.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-6 bg-card">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          {/* Author Name - Bold and at top */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-lg">{review.author}</span>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Verified Purchase
                              </span>
                            )}
                          </div>

                          {/* Rating Stars - Gold/Black */}
                          <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= review.rating
                                    ? 'fill-yellow-500 stroke-yellow-600'
                                    : 'fill-gray-200 stroke-gray-300'
                                }`}
                                strokeWidth="1"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>

                          {/* Review Title */}
                          {review.title && (
                            <h3 className="font-semibold mb-2 text-foreground">{review.title}</h3>
                          )}

                          {/* Review Content */}
                          <p className="text-foreground leading-relaxed mb-3">{review.content}</p>

                          {/* Date */}
                          <div className="text-sm text-muted-foreground">
                            {review.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No reviews yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

