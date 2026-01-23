import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lumina_recently_viewed';
const MAX_ITEMS = 12; // Store up to 12 recently viewed products

interface RecentlyViewedProduct {
  id: string;
  handle: string;
  timestamp: number;
}

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedProduct[];
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
    }
  }, []);

  // Add a product to recently viewed
  const addRecentlyViewed = (productId: string, productHandle: string) => {
    try {
      setRecentlyViewed((prev) => {
        // Remove if already exists (to move to front)
        const filtered = prev.filter((item) => item.id !== productId);
        
        // Add to front
        const updated = [
          { id: productId, handle: productHandle, timestamp: Date.now() },
          ...filtered,
        ].slice(0, MAX_ITEMS); // Keep only MAX_ITEMS

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        return updated;
      });
    } catch (error) {
      console.error('Error saving recently viewed product:', error);
    }
  };

  // Get recently viewed product handles (excluding current product)
  const getRecentlyViewedHandles = (excludeId?: string, limit: number = 4) => {
    return recentlyViewed
      .filter((item) => item.id !== excludeId)
      .slice(0, limit)
      .map((item) => item.handle);
  };

  return {
    recentlyViewed,
    addRecentlyViewed,
    getRecentlyViewedHandles,
  };
};

