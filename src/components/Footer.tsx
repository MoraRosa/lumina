import { useState } from "react";
import { Link } from "react-router-dom";
import { ScallopedCircleEdge } from "./edges/ScallopedCircleEdge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Youtube, PinIcon as Pinterest, Instagram, Facebook, RefreshCw } from "lucide-react";
import { FaTiktok, FaThreads } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { subscribeToNewsletter } from "@/lib/shopifyCustomer";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter({ email: data.email });
      toast.success("Thanks for subscribing! Check your email for updates ✨");
      reset();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearCache = () => {
    toast.info("Clearing cache...");
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <footer className="relative bg-pastel-purple pt-20 sm:pt-24 pb-24 md:pb-16">
      <ScallopedCircleEdge color="hsl(var(--background))" position="top" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Stay Glowing
            </h3>
            <p className="text-sm sm:text-base text-foreground/80 mb-4">
              Subscribe to our newsletter for skincare tips, new product
              launches, and exclusive offers!
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full bg-background/80 border-border h-11 sm:h-12"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-destructive mt-1 ml-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="rounded-full px-6 sm:px-8 h-11 sm:h-12 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Quick Links
              </h3>
              <button
                onClick={handleClearCache}
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Clear cache"
                title="Clear cache and reload"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base text-foreground/80">
              <li>
                <Link
                  to="/products"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-foreground transition-colors inline-block py-1"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <a
              href="https://instagram.com/lumaraeofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://facebook.com/luminacoskin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://tiktok.com/@luminacoskin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on TikTok"
            >
              <FaTiktok className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://threads.net/@lumaraeofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on Threads"
            >
              <FaThreads className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://pinterest.com/luminacoskin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on Pinterest"
            >
              <Pinterest className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://youtube.com/@luminacoskin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on YouTube"
            >
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-primary text-sm sm:text-base font-semibold italic mb-2">
              Natural Beauty, Naturally You!
            </p>
            <p className="text-foreground/70 text-xs sm:text-sm">
              © {new Date().getFullYear()} Lumina Skincare. All rights reserved.
              Made with 💖
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
