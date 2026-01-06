import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScallopedEdge } from "@/components/edges/ScallopedEdge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { FaTiktok, FaThreads } from "react-icons/fa6";
import { PinIcon as Pinterest } from "lucide-react";

const Contact = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const socialChannels = [
    {
      name: "Facebook Messenger",
      icon: MessageCircle,
      url: "https://facebook.com/luminacoskin",
      description: "Chat with us directly",
      color: "bg-blue-500",
      primary: true,
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/lumaraeofficial",
      description: "@lumaraeofficial",
      color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/luminacoskin",
      description: "@luminacoskin",
      color: "bg-blue-600",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      url: "https://tiktok.com/@luminacoskin",
      description: "@luminacoskin",
      color: "bg-black",
    },
    {
      name: "Threads",
      icon: FaThreads,
      url: "https://threads.net/@lumaraeofficial",
      description: "@lumaraeofficial",
      color: "bg-gray-800",
    },
    {
      name: "Pinterest",
      icon: Pinterest,
      url: "https://pinterest.com/luminacoskin",
      description: "@luminacoskin",
      color: "bg-red-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@luminacoskin",
      description: "@luminacoskin",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - Lumina Skincare</title>
        <meta name="description" content="Get in touch with Lumina Skincare. We'd love to hear from you! Send us a message and we'll respond as soon as possible." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - Lumina Skincare" />
        <meta property="og:description" content="Get in touch with Lumina Skincare. We'd love to hear from you!" />
        <meta property="og:url" content="https://luminaco.skin/contact/" />
        <meta property="og:image" content="https://luminaco.skin/images/og%20image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Lumina Skincare" />
        <meta name="twitter:description" content="Get in touch with Lumina Skincare. We'd love to hear from you!" />
        <meta name="twitter:image" content="https://luminaco.skin/images/og%20image.png" />
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/80 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              💌 Get in Touch 📬
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 px-4 pb-2">
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        <ScallopedEdge color="hsl(var(--background))" position="bottom" />
      </section>

      {/* Primary Contact Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Let's Chat! 💬
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Have a question about our products? Want to know more about Lumina? We'd love to hear from you!
            </p>

            {/* Primary Messenger CTA */}
            <a
              href="https://facebook.com/luminacoskin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="rounded-full px-8 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                Message Us on Facebook
              </Button>
            </a>
            <p className="text-sm text-foreground/60 mt-4">
              Click "Message" on our page - we typically respond within a few hours!
            </p>
          </div>

          {/* Alternative Contact Methods */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8">
              Or reach us on social media
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {socialChannels.filter(channel => !channel.primary).map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:scale-105">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${channel.color} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm sm:text-base mb-1">
                        {channel.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/60">
                        {channel.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Business Info */}
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16">
            <div className="bg-pastel-pink/10 rounded-3xl p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
                📍 Based in Calgary, Alberta
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 mb-2">
                Proudly serving customers across Canada
              </p>
              <p className="text-sm sm:text-base text-foreground/80">
                <strong>Business Hours:</strong> Monday - Friday, 9am - 5pm MST
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

