import { Minus, Plus, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { useSyncCartWithShopify } from "@/hooks/useShopifyCart";
import { isShopifyConfigured } from "@/lib/shopify";
import { useState } from "react";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { syncAndCheckout } = useSyncCartWithShopify();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (!isShopifyConfigured()) {
      alert("Shopify checkout will be available once the store is connected. Please set up your .env file.");
      return;
    }

    if (import.meta.env.DEV) {
      console.log('🛒 Starting checkout process...');
    }
    setIsCheckingOut(true);
    try {
      // Always create a fresh checkout with current cart items
      const url = await syncAndCheckout();
      if (url) {
        if (import.meta.env.DEV) {
          console.log('✅ Redirecting to checkout...');
        }
        window.location.href = url;
      } else {
        console.error('❌ No checkout URL returned');
        toast.error('Failed to create checkout. Please try again.');
      }
    } catch (error) {
      console.error("❌ Checkout error:", error);
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
            <div className="relative">
              <ShoppingBag className="h-7 w-7" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-primary animate-pulse" />
            </div>
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your cart items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
              <ShoppingBag className="h-20 w-20 text-muted-foreground relative" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Add some lovely products to get started! ✨
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-4 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/20 rounded-3xl p-4 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
                  >
                    {item.image && (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-background/80 flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base mb-1 truncate text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-lg font-bold text-foreground mb-3">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-2 hover:scale-110 transition-transform"
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-bold text-base bg-muted rounded-full py-1">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-2 hover:scale-110 transition-transform"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-destructive hover:text-destructive hover:bg-destructive/20 hover:scale-110 transition-all"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-6 border-t-2 border-dashed border-border/50">
              <div className="flex justify-between items-center bg-gradient-to-r from-pastel-green/30 to-pastel-purple/20 rounded-2xl p-4">
                <span className="text-lg font-bold text-foreground">Subtotal</span>
                <span className="text-2xl font-bold text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-foreground/70 text-center">
                ✨ Shipping and taxes calculated at checkout ✨
              </p>
              <SheetFooter className="flex-col gap-3 sm:flex-col">
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full rounded-full py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  size="lg"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Proceed to Checkout
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full rounded-full border-2 hover:scale-[1.02] transition-transform"
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

