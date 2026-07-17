import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { storage } from '@/lib/storage';

// zustand's persist middleware expects a narrower StateStorage shape
// (setItem/removeItem returning void) than our richer storage helper
// (which returns booleans so its other callers can tell whether a write
// actually reached localStorage). This adapts one to the other so both
// sides keep their natural, useful signatures.
const zustandStorage: StateStorage = {
  getItem: (name) => storage.getItem(name),
  setItem: (name, value) => {
    storage.setItem(name, value);
  },
  removeItem: (name) => {
    storage.removeItem(name);
  },
};

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
    (set) => ({
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
      storage: createJSONStorage(() => zustandStorage),
      version: 1,
      migrate: (persistedState: unknown) => {
        // persistedState comes from localStorage JSON and may be from an
        // older shape (that's the whole point of a migrate function), so
        // it's genuinely `unknown` rather than `any` -- narrowed once,
        // right here, to the one field this function actually reads.
        const state = persistedState as { storeVersion?: string } | undefined;

        // If store domain changed, clear the cart
        if (state?.storeVersion !== CURRENT_STORE) {
          if (import.meta.env.DEV) {
            console.log('🔄 Store changed, clearing old cart data');
          }
          storage.removeItem('lumina-shopify-cart-id');
          return {
            items: [],
            checkoutUrl: null,
            storeVersion: CURRENT_STORE,
          };
        }
        return state as CartStore;
      },
    }
  )
);