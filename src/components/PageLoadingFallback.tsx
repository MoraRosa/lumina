import { Loader2 } from "lucide-react";

/**
 * Fallback shown by the <Suspense> boundary in App.tsx while a lazy-loaded
 * page's JS chunk is downloading (see src/App.tsx for why routes are
 * code-split). On a warm cache this is invisible in practice -- it only
 * shows on a genuinely uncached navigation.
 */
export const PageLoadingFallback = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-background"
    role="status"
    aria-live="polite"
  >
    <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
    <span className="sr-only">Loading page...</span>
  </div>
);
