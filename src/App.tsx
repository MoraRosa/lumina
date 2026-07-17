import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { PromoBanner } from "@/components/PromoBanner";
import { BackToTop } from "@/components/BackToTop";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { PageLoadingFallback } from "@/components/PageLoadingFallback";
// Index is loaded eagerly -- it's the most common first-paint route, and
// this keeps the homepage instant with no Suspense fallback flash. Every
// other route is code-split (see the lazy() calls below) so a first-time
// visitor to "/" doesn't have to download every page's JS up front.
import Index from "./pages/Index";

const ProductListing = lazy(() => import("./pages/ProductListing"));
const Fragrance = lazy(() => import("./pages/Fragrance"));
const BodyCare = lazy(() => import("./pages/BodyCare"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <PromoBanner />
          <BackToTop />
          <CookieConsent />
          <NewsletterPopup />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/fragrance" element={<Fragrance />} />
              <Route path="/body-care" element={<BodyCare />} />
              <Route path="/products/:handle" element={<ProductDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/returns" element={<ReturnPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/accessibility" element={<AccessibilityStatement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;