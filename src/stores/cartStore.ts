import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
  variantId: string;
}

interface CartStore {
  items: CartItem[];
  checkoutUrl: string | null;
  storeVersion: string; // Track which Shopify store the cart is for
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setCheckoutUrl: (url: string | null) => void;
}

// Current store domain - if this changes, cart will be cleared
const CURRENT_STORE = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutUrl: null,
      storeVersion: CURRENT_STORE,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.variantId === item.variantId);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              checkoutUrl: null, // Clear checkout URL when cart changes
            };
          }
          return { items: [...state.items, item], checkoutUrl: null };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
          checkoutUrl: null, // Clear checkout URL when cart changes
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
          checkoutUrl: null, // Clear checkout URL when cart changes
        })),
      clearCart: () => set({ items: [], checkoutUrl: null }),
      setCheckoutUrl: (url) => set({ checkoutUrl: url }),
    }),
    {
      name: 'lumina-cart',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // If store domain changed, clear the cart
        if (persistedState?.storeVersion !== CURRENT_STORE) {
          console.log('🔄 Store changed, clearing old cart data');
          localStorage.removeItem('lumina-shopify-cart-id');
          return {
            items: [],
            checkoutUrl: null,
            storeVersion: CURRENT_STORE,
          };
        }
        return persistedState as CartStore;
      },
    }
  )
);
