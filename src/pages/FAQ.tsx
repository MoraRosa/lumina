import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const faqs = [
    {
      question: "Do you ship across Canada?",
      answer: "Yes! We ship Canada-wide. All orders are processed and shipped from our Calgary, Alberta location."
    },
    {
      question: "Where are you based?",
      answer: "We're a Calgary, Alberta-based startup, proudly serving customers across Canada since December 2024."
    },
    {
      question: "When did Lumina launch?",
      answer: "Lumina Skincare officially launched in December 2024. We're a new startup dedicated to bringing gentle, fragrance-free skincare to sensitive skin."
    },
    {
      question: "Are your products really fragrance-free?",
      answer: "Yes! All Lumina products are completely fragrance-free and formulated specifically for sensitive skin. We avoid common allergens and irritants."
    },
    {
      question: "What makes Lumina different from other skincare brands?",
      answer: "We focus exclusively on gentle, allergen-free formulas designed for sensitive skin. Our products are fragrance-free, carefully formulated, and made with premium ingredients."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location within Canada. Typically, orders arrive within 5-10 business days. You'll receive tracking information once your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We want you to love your Lumina products! Please visit our Returns page for detailed information about our return and exchange policy."
    },
    {
      question: "Are your products tested on animals?",
      answer: "No, Lumina Skincare is cruelty-free. We never test our products on animals."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQ - Lumina Skincare</title>
        <meta name="description" content="Frequently asked questions about Lumina Skincare. Learn about shipping, our products, and our Calgary-based company." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FAQ - Lumina Skincare" />
        <meta property="og:description" content="Frequently asked questions about Lumina Skincare products and shipping." />
        <meta property="og:url" content="https://luminaco.skin/faq/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Lumina Skincare" />
        <meta name="twitter:description" content="Frequently asked questions about Lumina Skincare products and shipping." />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-green to-pastel-green/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              ✨ Frequently Asked Questions ✨
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4">
              Find answers to common questions about Lumina Skincare
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-pastel-purple/10 rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-5 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still Have Questions */}
            <div className="mt-12 sm:mt-16 text-center bg-pastel-pink/20 rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-foreground/80 mb-6">
                We're here to help! Reach out to our team and we'll get back to you as soon as possible.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

