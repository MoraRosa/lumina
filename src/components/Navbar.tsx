import { ShoppingBag, Sparkles, Heart, Info, Mail, Home } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
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
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                Lumina
              </h1>
              <p className="text-[0.6rem] sm:text-xs text-foreground/70 italic leading-tight hidden sm:block">
                Natural Beauty, Naturally You!
              </p>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/body-care"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Body Care
            </Link>
            <Link
              to="/fragrance"
              className="text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Fragrance
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

      </div>
    </nav>

    {/* Bottom Navigation Bar - Mobile Only */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navbar-pink border-t border-foreground/10 shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/')
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* Body Care */}
        <Link
          to="/body-care"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/body-care')
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs font-medium">Body</span>
        </Link>

        {/* Fragrance */}
        <Link
          to="/fragrance"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/fragrance')
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-medium">Fragrance</span>
        </Link>

        {/* About */}
        <Link
          to="/about"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/about')
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Info className="h-5 w-5" />
          <span className="text-xs font-medium">About</span>
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/contact')
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Mail className="h-5 w-5" />
          <span className="text-xs font-medium">Contact</span>
        </Link>
      </div>
    </nav>
    </>
  );
};
