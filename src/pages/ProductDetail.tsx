import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useProduct } from "@/hooks/useProduct";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useProduct(handle);

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

  return (
    <div className="min-h-screen bg-background">
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
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted ring-2 ring-border/20">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 text-muted-foreground" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
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
              <h3 className="font-bold text-base sm:text-lg mb-2">Description</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
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
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

