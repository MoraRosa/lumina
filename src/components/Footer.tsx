import { useState } from "react";
import { ScallopedEdge } from "./edges/ScallopedEdge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Instagram, Facebook } from "lucide-react";
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

    // Simulate API call - will connect to Shopify later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store in localStorage for now
    const existingEmails = JSON.parse(
      localStorage.getItem("newsletter-emails") || "[]"
    );
    
    if (existingEmails.includes(data.email)) {
      toast.info("You're already subscribed! 💌");
      setIsSubmitting(false);
      reset();
      return;
    }

    existingEmails.push(data.email);
    localStorage.setItem("newsletter-emails", JSON.stringify(existingEmails));

    toast.success("Welcome to Lumina! Check your inbox soon ✨");
    setIsSubmitting(false);
    reset();
  };

  return (
    <footer className="relative bg-pastel-purple py-16">
      <ScallopedEdge color="hsl(var(--pastel-pink))" position="top" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Glowing ✨
            </h3>
            <p className="text-foreground/80 mb-4">
              Subscribe to our newsletter for skincare tips, new product
              launches, and exclusive offers!
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full bg-background/80 border-border"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="rounded-full px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-foreground/80">
              <li>
                <a
                  href="#about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#shipping"
                  className="hover:text-foreground transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          <p className="text-foreground/70 text-sm text-center">
            © {new Date().getFullYear()} Lumina Skincare. All rights reserved.
            Made with 💖
          </p>
        </div>
      </div>
    </footer>
  );
};
