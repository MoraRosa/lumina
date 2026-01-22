import { useState, useEffect } from "react";
import { X } from "lucide-react";

const messages = [
  "Free shipping on orders over $100",
  "New fragrance collection now available",
  "10% off your first order - Sign up for our newsletter"
];

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate messages every 4 seconds with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300); // Wait for fade out before changing message
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="relative bg-pastel-pink text-foreground py-2.5 sm:py-3">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2">
          {/* Message with fade transition */}
          <div className="flex-1 text-center">
            <p
              className={`text-xs sm:text-sm md:text-base font-medium transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {messages[currentIndex]}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

