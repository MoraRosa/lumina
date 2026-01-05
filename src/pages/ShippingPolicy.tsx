import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useShopPolicies } from "@/hooks/useShopPolicies";
import { Loader2 } from "lucide-react";

const ShippingPolicy = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: policies, isLoading } = useShopPolicies();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              📦 Shipping Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Everything you need to know about our shipping
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : policies?.shippingPolicy ? (
            <div
              className="prose prose-lg max-w-none text-foreground/90"
              dangerouslySetInnerHTML={{ __html: policies.shippingPolicy.body }}
            />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Shipping Policy
              </h2>
              <div className="text-left space-y-4 text-foreground/80">
                <p>
                  We offer shipping across Canada with the following options:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                  <li><strong>Express Shipping:</strong> 2-3 business days</li>
                  <li><strong>Free Shipping:</strong> On orders over $100</li>
                </ul>
                <p>
                  All orders are processed within 1-2 business days. You will receive a tracking number once your order ships.
                </p>
                <p>
                  For more information, please{" "}
                  <Link to="/contact" className="text-primary hover:underline font-semibold">
                    contact us
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;

