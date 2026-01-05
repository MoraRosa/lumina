import { useState } from "react";
import { Link } from "react-router-dom";
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
              🤝 Return Policy
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
              <div className="text-left space-y-6 text-foreground/80">
                <p>
                  We have a <strong>30-day return policy</strong>, which means you have 30 days after receiving your item to request a return.
                </p>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Eligibility</h3>
                  <p>
                    To be eligible for a return, your item must be in the same condition that you received it, <strong>unopened or unused</strong>, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
                  </p>
                  <p className="mt-2 text-sm italic">
                    <strong>Note:</strong> No refunds will be issued on used or opened products as we cannot resell them.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">How to Start a Return</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      <Link to="/contact" className="text-primary hover:underline font-semibold">
                        Contact us through our contact form
                      </Link>
                    </li>
                    <li>We'll send you a return shipping label and instructions</li>
                    <li>Ship the product back to us using the provided label</li>
                    <li>Receive your refund within 10 business days after inspection</li>
                  </ol>
                  <p className="mt-2 text-sm">
                    Items sent back to us without first requesting a return will not be accepted.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Damages and Issues</h3>
                  <p>
                    Please inspect your order upon reception and{" "}
                    <Link to="/contact" className="text-primary hover:underline font-semibold">
                      contact us immediately
                    </Link>{" "}
                    if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Non-Returnable Items</h3>
                  <p>The following items cannot be returned:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Opened or used personal care products (beauty/skincare items)</li>
                    <li>Sale items or gift cards</li>
                    <li>Custom or personalized products</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Exchanges</h3>
                  <p>
                    The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">European Union 14-Day Cooling Off Period</h3>
                  <p>
                    If the merchandise is being shipped into the European Union, you have the right to cancel or return your order within <strong>14 days</strong>, for any reason and without justification. Your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Refunds</h3>
                  <p>
                    We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within <strong>10 business days</strong>.
                  </p>
                  <p className="mt-2">
                    Please remember it can take some time for your bank or credit card company to process and post the refund too. If more than 15 business days have passed since we've approved your return, please{" "}
                    <Link to="/contact" className="text-primary hover:underline font-semibold">
                      contact us
                    </Link>.
                  </p>
                </div>
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

