import { Review } from "@/data/reviews";
import { getRelativeTime, formatDate } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

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
            className="border-b border-border pb-6 last:border-b-0 last:pb-0"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-base">{review.author}</span>
                  {review.verified && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
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
              <div className="text-sm text-muted-foreground">
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
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

