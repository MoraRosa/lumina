import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { subscribeToNewsletter } from "@/lib/shopifyCustomer";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const STORAGE_KEY = "lumina_newsletter_popup_dismissed";
const DELAY_MS = 10000; // 10 seconds

export const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem(STORAGE_KEY, "dismissed");
  };

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter({ email: data.email });
      toast.success(
        "🎉 Welcome! Use code WELCOME10 for 10% off your first order!",
        { duration: 6000 }
      );
      reset();
      setShowPopup(false);
      localStorage.setItem(STORAGE_KEY, "subscribed");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="p-8 sm:p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pastel-purple to-pastel-pink rounded-full flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-3">
              Get 10% Off Your First Order!
            </h2>
            <p className="text-center text-foreground/70 mb-6">
              Subscribe to our newsletter and receive exclusive offers, skincare tips, and early access to new products.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full h-12 text-base"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-2 ml-4">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Get My 10% Off"}
              </Button>
            </form>

            {/* Fine print */}
            <p className="text-xs text-center text-foreground/50 mt-4">
              By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

