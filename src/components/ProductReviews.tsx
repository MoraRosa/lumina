import { Review } from "@/data/reviews";
import { getRelativeTime, formatDate } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export const ProductReviews = ({ reviews, averageRating, totalReviews }: ProductReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Reviews Header */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Customer Reviews</h2>
        
        {/* Overall Rating */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= averageRating
                    ? 'fill-yellow-500 stroke-yellow-600'
                    : 'fill-gray-200 stroke-gray-300'
                }`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-border pb-6 last:border-b-0 last:pb-0 min-w-0"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3 min-w-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-base truncate">{review.author}</span>
                  {review.verified && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex-shrink-0"
                    >
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                {/* Star Rating */}
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-yellow-500 stroke-yellow-600'
                          : 'fill-gray-200 stroke-gray-300'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>

              {/* Date with hover tooltip */}
              <div className="text-sm text-muted-foreground flex-shrink-0">
                <span
                  className="cursor-help"
                  title={formatDate(review.date)}
                >
                  {getRelativeTime(review.date)}
                </span>
              </div>
            </div>

            {/* Review Title (if exists) */}
            {review.title && (
              <h3 className="font-semibold text-base mb-2">{review.title}</h3>
            )}

            {/* Review Content */}
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-3">
              {review.content}
            </p>

            {/* Review Images (if exists) */}
            {review.images && review.images.length > 0 && (
              <ReviewImageGallery images={review.images} reviewAuthor={review.author} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Image Gallery Component for Reviews
const ReviewImageGallery = ({ images, reviewAuthor }: { images: string[]; reviewAuthor: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const openLightbox = (image: string) => {
    // Remember what had focus so we can return to it when the lightbox closes.
    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Move focus into the dialog when it opens; restore it to the trigger on close.
  useEffect(() => {
    if (selectedImage) {
      closeButtonRef.current?.focus();
    } else {
      previouslyFocusedElement.current?.focus();
    }
  }, [selectedImage]);

  // Escape closes the dialog. Tab/Shift+Tab is trapped on the close button,
  // since it's the only focusable element inside this simple dialog.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeLightbox();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  return (
    <>
      {/* Image Grid/Scroll */}
      {images.length === 1 ? (
        // Single image: max width on desktop
        <div className="mt-3 max-w-[300px]">
          <button
            onClick={() => openLightbox(images[0])}
            className="relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 active:scale-95 w-full"
          >
            <img
              src={images[0]}
              alt={`Review image by ${reviewAuthor}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        </div>
      ) : (
        // Multiple images: horizontal scroll on mobile
        <div className="mt-3 overflow-x-auto">
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(image)}
                className="relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 active:scale-95 flex-shrink-0 w-[200px]"
              >
                <img
                  src={image}
                  alt={`Review image ${index + 1} by ${reviewAuthor}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label={`Review image by ${reviewAuthor}`}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt={`Review by ${reviewAuthor}`}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};