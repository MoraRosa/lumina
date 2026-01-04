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
      question: "What makes Lumina different?",
      answer: "Every Lumina product is independently formulated, handcrafted, and designed in-house — from the formulas themselves to the packaging, labels, and artwork. We offer both fragrance-free skincare and body care, alongside a carefully developed fragrance line, giving you full control over how scent shows up in your routine."
    },
    {
      question: "Are your products handmade?",
      answer: "Yes. All Lumina products are hand-crafted in small batches using original formulations developed entirely in-house. This hands-on approach allows for close attention to quality, detail, and brand integrity at every stage."
    },
    {
      question: "What does 'clean-inspired' mean?",
      answer: "Lumina is a clean-inspired brand focused on clarity and transparency. We use cosmetic-grade ingredients, formulate without added fragrance in our skincare and body care line, and do not test on animals. We do not currently hold third-party certifications."
    },
    {
      question: "Are your skincare products fragrance-free?",
      answer: "Yes. All Lumina skincare and body care products are formulated without added fragrance and designed with everyday comfort in mind. Our fragrance line is separate, offering concentrated fragrance oil blends for those who want intentional scent."
    },
    {
      question: "What ingredients do you use?",
      answer: "Lumina uses cosmetic-grade ingredients selected for performance, texture, and consistency. Skincare and body care products include humectants, emollients, gentle surfactants, and plant-derived oils and butters. Our fragrance line uses concentrated fragrance oil blends formulated without dilution oils or solvents."
    },
    {
      question: "Do you design your own packaging?",
      answer: "Yes. All packaging design — including labels, artwork, and cardstock boxes — is created, printed, and assembled in-house. This allows us to maintain a cohesive, minimal aesthetic and ensure quality at every touchpoint."
    },
    {
      question: "Do you ship across Canada?",
      answer: "Yes! We ship Canada-wide. All orders are processed and shipped from our Calgary, Alberta location."
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
      answer: "No. Lumina products are not tested on animals."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQ - Lumina</title>
        <meta name="description" content="Frequently asked questions about Lumina. Learn about our handcrafted products, formulations, and shipping." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FAQ - Lumina" />
        <meta property="og:description" content="Frequently asked questions about Lumina's handcrafted self-care and fragrance products." />
        <meta property="og:url" content="https://luminaco.skin/faq/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Lumina" />
        <meta name="twitter:description" content="Frequently asked questions about Lumina's handcrafted self-care and fragrance products." />
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
              Find answers to common questions about Lumina
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

