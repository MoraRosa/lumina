import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";

const TermsOfService = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - Lumina</title>
        <meta
          name="description"
          content="Terms of Service for Lumina Skincare - Terms and conditions for using our website and purchasing our products."
        />
        <link rel="canonical" href="https://luminaco.skin/terms" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Last Updated: January 5, 2026
          </p>
        </div>
        <ScallopedEdge position="bottom" />
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Lumina website (<a href="https://luminaco.skin" className="text-primary hover:underline">luminaco.skin</a>), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Lumina's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software on Lumina's website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions, images, and pricing. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product colors may vary slightly from images due to screen settings</li>
                <li>We reserve the right to correct pricing errors</li>
                <li>Product availability is subject to change without notice</li>
                <li>We reserve the right to limit quantities purchased</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Orders and Payment</h2>
              <p>
                By placing an order, you agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are legally capable of entering into binding contracts</li>
                <li>All information you provide is accurate and complete</li>
                <li>You authorize us to charge your payment method</li>
                <li>We reserve the right to refuse or cancel any order</li>
              </ul>
              <p className="mt-4">
                Payment is processed securely through Shopify. We do not store your credit card information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Shipping and Delivery</h2>
              <p>
                We currently ship within Canada only. Shipping times and costs are outlined on our <a href="/shipping" className="text-primary hover:underline">Shipping Policy</a> page. We are not responsible for delays caused by shipping carriers or customs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Returns and Refunds</h2>
              <p>
                Our return and refund policy is detailed on our <a href="/returns" className="text-primary hover:underline">Return Policy</a> page. Please review it before making a purchase.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Product Safety and Disclaimers</h2>
              <p>
                Our products are for external use only unless otherwise stated. Please:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Read all product labels and instructions carefully</li>
                <li>Perform a patch test before using new products</li>
                <li>Discontinue use if irritation occurs</li>
                <li>Keep products out of reach of children</li>
                <li>Consult a healthcare professional if you have concerns</li>
              </ul>
              <p className="mt-4 font-semibold">
                We are not responsible for allergic reactions or adverse effects. Use products at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and product names, is the property of Lumina and protected by Canadian and international copyright laws. Unauthorized use is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Lumina shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use or inability to use our products or website</li>
                <li>Unauthorized access to your personal information</li>
                <li>Errors or omissions in product information</li>
                <li>Any other matter relating to our products or services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold Lumina harmless from any claims, damages, or expenses arising from your use of our products or violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-primary/5 p-6 rounded-lg mt-4">
                <p><strong>Lumina</strong></p>
                <p>Email: <a href="mailto:hello@luminaco.skin" className="text-primary hover:underline">hello@luminaco.skin</a></p>
                <p>Website: <a href="https://luminaco.skin/contact" className="text-primary hover:underline">luminaco.skin/contact</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;

