import { useEffect, useState, useCallback } from 'react';
import { storage } from '@/lib/storage';

const STORAGE_KEY = 'lumina_recently_viewed';
const MAX_ITEMS = 6; // Store up to 6 recently viewed products (FIFO)

interface RecentlyViewedProduct {
  id: string;
  handle: string;
  timestamp: number;
}

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load from storage on mount
  useEffect(() => {
    const stored = storage.getJSON<RecentlyViewedProduct[]>(STORAGE_KEY);
    if (stored) {
      setRecentlyViewed(stored);
    }
  }, []);

  // Add a product to recently viewed - wrapped in useCallback to prevent infinite loops
  const addRecentlyViewed = useCallback((productId: string, productHandle: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter((item) => item.id !== productId);

      // Add to front
      const updated = [
        { id: productId, handle: productHandle, timestamp: Date.now() },
        ...filtered,
      ].slice(0, MAX_ITEMS); // Keep only MAX_ITEMS

      // Save to storage (no-ops safely if storage is unavailable)
      storage.setJSON(STORAGE_KEY, updated);

      return updated;
    });
  }, []);

  // Get recently viewed product handles (excluding current product) - wrapped in useCallback
  const getRecentlyViewedHandles = useCallback((excludeId?: string, limit: number = 4) => {
    return recentlyViewed
      .filter((item) => item.id !== excludeId)
      .slice(0, limit)
      .map((item) => item.handle);
  }, [recentlyViewed]);

  return {
    recentlyViewed,
    addRecentlyViewed,
    getRecentlyViewedHandles,
  };
};