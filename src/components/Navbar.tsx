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
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <img
                src="/images/Lumina.png"
                alt="Lumina Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Lumina
            </h1>
          </Link>

          {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/products"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/fragrance"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Fragrance
            </Link>
            <Link
              to="/body-care"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Body Care
            </Link>
            <Link
              to="/about"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-primary/20 rounded-full transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"
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

        {/* Mobile Navigation - Shown only on mobile */}
        <div className="md:hidden flex items-center justify-center gap-3 sm:gap-4 mt-3 pt-3 border-t border-foreground/10 overflow-x-auto">
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            All Products
          </Link>
          <Link
            to="/fragrance"
            className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            Fragrance
          </Link>
          <Link
            to="/body-care"
            className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            Body Care
          </Link>
          <Link
            to="/about"
            className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
