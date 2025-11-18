import { useState } from "react";
import { Link } from "react-router-dom";
import { ScallopedCircleEdge } from "./edges/ScallopedCircleEdge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Youtube, PinIcon as Pinterest } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
      // Create Shopify customer account for newsletter
      const response = await fetch(
        `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
          },
          body: JSON.stringify({
            query: `
              mutation customerCreate($input: CustomerCreateInput!) {
                customerCreate(input: $input) {
                  customer {
                    id
                    email
                  }
                  customerUserErrors {
                    field
                    message
                  }
                }
              }
            `,
            variables: {
              input: {
                email: data.email,
                acceptsMarketing: true,
              },
            },
          }),
        }
      );

      const result = await response.json();

      if (result.data?.customerCreate?.customerUserErrors?.length > 0) {
        const error = result.data.customerCreate.customerUserErrors[0];

        // If customer already exists, that's okay - they're subscribed!
        if (error.message.includes('taken') || error.message.includes('already exists')) {
          toast.info("You're already subscribed! 💌");
        } else {
          toast.error(error.message || 'Failed to subscribe. Please try again.');
        }
      } else if (result.data?.customerCreate?.customer) {
        toast.success("Welcome to Lumina! Check your inbox soon ✨");
      } else {
        throw new Error('Unexpected response from Shopify');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <footer className="relative bg-pastel-purple pt-20 sm:pt-24 pb-12 sm:pb-16">
      <ScallopedCircleEdge color="hsl(var(--background))" position="top" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Stay Glowing ✨
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
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-foreground/80">
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
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on YouTube"
            >
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 flex items-center justify-center hover:bg-background hover:scale-110 transition-all"
              aria-label="Follow us on Pinterest"
            >
              <Pinterest className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>

          <p className="text-foreground/70 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Lumina Skincare. All rights reserved.
            Made with 💖
          </p>
        </div>
      </div>
    </footer>
  );
};
