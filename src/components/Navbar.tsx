import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import { ScallopedEdge } from "./edges/ScallopedEdge";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-secondary shadow-lg relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Lumina
            </h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-primary/20 rounded-full transition-all duration-300"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <ScallopedEdge color="hsl(var(--pastel-purple))" position="bottom" />
    </nav>
  );
};
