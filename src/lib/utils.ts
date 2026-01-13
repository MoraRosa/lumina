import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extract numeric ID from Shopify GraphQL ID format
 * Converts "gid://shopify/Product/123456789" to "123456789"
 * This is needed for Judge.me integration which expects numeric IDs
 */
export function extractNumericId(shopifyId: string): string {
  // Handle GraphQL ID format: gid://shopify/Product/123456789
  const match = shopifyId.match(/\/(\d+)$/);
  if (match) {
    return match[1];
  }

  // If already numeric or doesn't match pattern, return as-is
  return shopifyId;
}
