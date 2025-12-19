import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { useShopPolicies } from "@/hooks/useShopPolicies";
import { Loader2 } from "lucide-react";

const ReturnPolicy = () => {
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
              🔄 Return Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Our commitment to your satisfaction
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
          ) : policies?.refundPolicy ? (
            <div
              className="prose prose-lg max-w-none text-foreground/90"
              dangerouslySetInnerHTML={{ __html: policies.refundPolicy.body }}
            />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Return & Refund Policy
              </h2>
              <div className="text-left space-y-4 text-foreground/80">
                <p>
                  We want you to love your Lumina products! If you're not completely satisfied, we offer:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>30-Day Returns:</strong> Return unopened products within 30 days</li>
                  <li><strong>Full Refund:</strong> Get your money back, no questions asked</li>
                  <li><strong>Free Return Shipping:</strong> On defective or damaged items</li>
                </ul>
                <p>
                  <strong>How to Return:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact us at support@luminaco.skin</li>
                  <li>Receive your return authorization</li>
                  <li>Ship the product back to us</li>
                  <li>Get your refund within 5-7 business days</li>
                </ol>
                <p>
                  For more information, please contact us at{" "}
                  <a href="mailto:support@luminaco.skin" className="text-primary hover:underline">
                    support@luminaco.skin
                  </a>
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

export default ReturnPolicy;

