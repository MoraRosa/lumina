import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";

const PrivacyPolicy = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Lumina</title>
        <meta
          name="description"
          content="Privacy Policy for Lumina Skincare - How we collect, use, and protect your personal information in compliance with PIPEDA."
        />
        <link rel="canonical" href="https://luminaco.skin/privacy" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              🔒 Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              Last Updated: January 5, 2026
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                Lumina ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website <a href="https://luminaco.skin" className="text-primary hover:underline">luminaco.skin</a> and purchase our products.
              </p>
              <p>
                We comply with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable Canadian privacy laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
              <p>We collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, shipping address</li>
                <li><strong>Payment Information:</strong> Processed securely through Shopify (we do not store credit card details)</li>
                <li><strong>Order Information:</strong> Purchase history, product preferences</li>
                <li><strong>Communication Data:</strong> Messages sent through our contact form, newsletter subscriptions</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Usage Data:</strong> Pages visited, time spent on site, referring website</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Cookies:</strong> See our Cookie Policy below</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p>We use your personal information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about your orders and inquiries</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Improving our website and customer experience</li>
                <li>Complying with legal obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. How We Share Your Information</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Shopify:</strong> Our e-commerce platform for order processing and payment</li>
                <li><strong>Shipping Providers:</strong> To deliver your orders (Canada Post, etc.)</li>
                <li><strong>Email Service Providers:</strong> For sending newsletters and order confirmations</li>
                <li><strong>Analytics Providers:</strong> Google Analytics (anonymized data)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your shopping cart items</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Personalize your experience</li>
                <li>Provide targeted advertising</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights (PIPEDA)</h2>
              <p>Under PIPEDA, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate information</li>
                <li><strong>Withdrawal of Consent:</strong> Unsubscribe from marketing emails at any time</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Complaint:</strong> File a complaint with the Privacy Commissioner of Canada</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@luminaco.skin" className="text-primary hover:underline">privacy@luminaco.skin</a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through Shopify</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Typically:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Order Information:</strong> 7 years (for tax and accounting purposes)</li>
                <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites (e.g., social media). We are not responsible for the privacy practices of these websites. Please review their privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-primary/5 p-6 rounded-lg mt-4">
                <p><strong>Lumina</strong></p>
                <p>Email: <a href="mailto:privacy@luminaco.skin" className="text-primary hover:underline">privacy@luminaco.skin</a></p>
                <p>Website: <a href="https://luminaco.skin/contact" className="text-primary hover:underline">luminaco.skin/contact</a></p>
                <p className="mt-4 text-sm text-foreground/70">
                  You may also file a complaint with the Privacy Commissioner of Canada at <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.priv.gc.ca</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

