// Product reviews data
// Add new reviews here as they come in
// NOTE: Use actual dates in YYYY-MM-DD format. The UI will automatically
// convert them to relative time (e.g., "today", "2 days ago", "3 weeks ago")
//
// ADDING REVIEW IMAGES:
// 1. Save customer images to: public/images/reviews/[product-name]/[image-name].jpg
// 2. Add image paths to the review's images array: ["/images/reviews/body-butter/customer1.jpg"]
// 3. Recommended: Optimize images before adding (compress, resize to max 1200px width)
// 4. Supported formats: .jpg, .png, .webp

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string; // Format: YYYY-MM-DD (e.g., "2026-01-28")
  verified: boolean;
  images?: string[]; // Optional array of image URLs (relative to public folder or absolute URLs)
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
    totalReviews: 5,
    reviews: [
      {
        id: 1,
        author: "Yaqub",
        rating: 5,
        title: "",
        content: "Lumina Body Butter truly lives up to its name. It rises to the challenge of winter dryness with quiet confidence, keeping the skin smooth, supple, and comfortably moisturized throughout the entire day.",
        date: "2026-01-12",
        verified: true,
      },
      {
        id: 2,
        author: "RJ",
        rating: 5,
        title: "",
        content: "Great texture and I love it!",
        date: "2026-01-12",
        verified: true,
      },
      {
        id: 3,
        author: "Tim Batty",
        rating: 5,
        title: "",
        content: "My husband is loving this product! He said he'll be using it exclusively for his post-tattoo healing from now on",
        date: "2026-02-12",
        verified: true,
      },
      {
        id: 4,
        author: "Elena S",
        rating: 5,
        title: "🧴 Body Butter Review",
        content: "The Body Butter is very smooth, glides over the skin, and is refreshing for sensitive skin. Absolutely love the product!",
        date: "2026-02-14",
        verified: true,
        images: ["/images/reviews/body-butter/elena-s.jpg"],
      },
      {
        id: 5,
        author: "Customer",
        rating: 5,
        title: "Body Butter",
        content: "The body butter is smooth and feels really nice going on. It glides easily and feels refreshing. I can’t speak to the long-term moisture yet, but I really like it so far.",
        date: "2026-02-14",
        verified: true,
      }
    ],
  },
  // Bloomé
  "8117386084406": {
    productId: "8117386084406",
    averageRating: 5.0,
    totalReviews: 4,
    reviews: [
      {
        id: 1,
        author: "Customer",
        rating: 5,
        title: "",
        content: "The product is great quality and smells amazing!",
        date: "2026-01-28",
        verified: true,
      },  
      {
        id: 2,
        author: "Elena S",
        rating: 5,
        title: "🌸 Bloome",
        content: "Bloome smells incredible. It gets even better after a few moments and is a long-lasting scent. Absolutely love it!",
        date: "2026-01-28",
        verified: true,
        images: ["/images/reviews/body-butter/elena-s.jpg"]
      },  
      {
        id: 3,
        author: "Customer",
        rating: 5,
        title: "🌸 Bloome Oil",
        content: "Bloome smells SO good. I actually like it even more than Coconut Veil! It smells even better after a few minutes of wearing it, and I took it to work and my coworker loved it too. I also really like the roller applicator. It feels smoother and more controlled than a spray.",
        date: "2026-02-14",
        verified: true,
      }, 
      {
        id: 4,
        author: "Customer",
        rating: 5,
        title: "Bloome",
        content: "I'm pretty picky about fragrance pricing and usually compare quantity vs price, but I understand the cost to make it is high. The quality definitely shows.",
        date: "2026-02-14",
        verified: true,
      } 
    ],
  },
  // Coconut Veil
  "8117352202294": {
    productId: "8117352202294",
    averageRating: 5.0,
    totalReviews: 2,
    reviews: [
      {
        id: 1,
        author: "Elena S",
        rating: 5,
        title: "",
        content: "Coconut Veil smells incredible. It gets even better after a few moments and is a long-lasting scent. Absolutely love it!",
        date: "2026-02-14",
        verified: true,
        images: ["/images/reviews/body-butter/elena-s.jpg"]
      },
      {
        id: 2,
        author: "Customer",
        rating: 5,
        title: "Coconut Veil",
        content: "Coconut Veil smells really, really good and gets even better after a few minutes on the skin.",
        date: "2026-02-14",
        verified: true,
      }
    ]
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

