import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-navbar-pink shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              <img
                src="/lumina/images/Lumina.png"
                alt="Lumina Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Lumina
            </h1>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-primary/20 rounded-full transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-foreground text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};
