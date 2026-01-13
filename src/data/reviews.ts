// Product reviews data
// Add new reviews here as they come in

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface ProductReviews {
  productId: string; // Shopify product ID (numeric part)
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

// Reviews organized by product ID
export const productReviewsData: Record<string, ProductReviews> = {
  // Lumina Body Butter
  "8001400864822": {
    productId: "8001400864822",
    averageRating: 5.0,
    totalReviews: 2,
    reviews: [
      {
        id: 1,
        author: "Yaqub",
        rating: 5,
        title: "",
        content: "Lumina Body Butter truly lives up to its name. It rises to the challenge of winter dryness with quiet confidence, keeping the skin smooth, supple, and comfortably moisturized throughout the entire day.",
        date: "3 hours ago",
        verified: true,
      },
      {
        id: 2,
        author: "RJ",
        rating: 5,
        title: "",
        content: "Great texture and I love it!",
        date: "1 hour ago",
        verified: true,
      },
    ],
  },
  // Add more products here as they get reviews
  // "PRODUCT_ID": {
  //   productId: "PRODUCT_ID",
  //   averageRating: 5.0,
  //   totalReviews: 1,
  //   reviews: [...]
  // },
};

// Helper function to get reviews for a product
export const getProductReviews = (productId: string): ProductReviews | null => {
  return productReviewsData[productId] || null;
};

// Helper function to calculate average rating
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
};

