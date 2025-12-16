import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  price: string;
  compareAtPrice?: string;
  image?: string;
  images?: string[];
  variantId: string;
  availableForSale: boolean;
  handle: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    
    if (!product.availableForSale) {
      toast.error("This product is currently out of stock");
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      variantId: product.variantId,
    });

    toast.success(`${product.title} added to cart! ✨`, {
      description: "View your cart to checkout",
    });
  };

  const hasDiscount = product.compareAtPrice && 
    parseFloat(product.compareAtPrice.replace(/[^0-9.]/g, "")) > 
    parseFloat(product.price.replace(/[^0-9.]/g, ""));

  return (
    <Link to={`/products/${product.handle}`}>
      <Card className="group overflow-hidden rounded-3xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] bg-card">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16" />
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-destructive text-destructive-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              Sale
            </div>
          )}
          {!product.availableForSale && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-background text-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-primary">
              {product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {product.compareAtPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.availableForSale}
            className="w-full rounded-full group-hover:bg-primary/90 transition-all hover:shadow-lg h-10 sm:h-11 text-sm sm:text-base"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            {product.availableForSale ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

