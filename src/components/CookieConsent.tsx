import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { storage } from "@/lib/storage";

// Keep in sync with the pixel ID in index.html's Meta Pixel loader.
const META_PIXEL_ID = "26125074270423981";

/**
 * Actually starts sending data to Facebook. Only ever called once consent
 * has been granted (see handleAccept and the mount effect below) -- the
 * loader in index.html only defines window.fbq, it never calls this
 * itself.
 */
const initMetaPixel = () => {
  if (typeof window.fbq !== "function") return;
  try {
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Meta Pixel initialization failed:", error);
    }
  }
};

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = storage.getItem("lumina-cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
      return;
    }

    // Returning visitor who already made a choice on a previous visit --
    // they won't see the banner again, so this page load needs to apply
    // that choice itself rather than leaving analytics/ads at the
    // default-denied state set in index.html.
    if (consent === "accepted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      initMetaPixel();
    } else if (consent === "declined") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  }, []);

  const handleAccept = () => {
    storage.setItem("lumina-cookie-consent", "accepted");
    setShowBanner(false);

    // Enable Google Analytics if configured
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    initMetaPixel();
  };

  const handleDecline = () => {
    storage.setItem("lumina-cookie-consent", "declined");
    setShowBanner(false);

    // Disable Google Analytics
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-20 sm:pb-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
        <div className="relative p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Cookie icon */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🍪</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pr-8 sm:pr-0">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept", you consent to our use of cookies. You can manage your preferences at any time.
              </p>
              <p className="text-sm text-foreground/60 mt-2">
                Read our{" "}
                <Link to="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms" className="text-primary hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                for more information.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="w-full sm:w-auto px-6 py-2 border-2 hover:bg-foreground/5"
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-primary/90 text-white"
              >
                Accept Cookies
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom stripe for visual appeal */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}