import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { storage } from '@/lib/storage';

// See cartStore.ts for why this adapter exists -- zustand's persist wants
// setItem/removeItem to return void, while our storage helper returns
// booleans for its other callers.
const zustandStorage: StateStorage = {
  getItem: (name) => storage.getItem(name),
  setItem: (name, value) => {
    storage.setItem(name, value);
  },
  removeItem: (name) => {
    storage.removeItem(name);
  },
};

export interface FavoriteItem {
  id: string;
  handle: string;
  title: string;
  price: string;
  image?: string;
  availableForSale: boolean;
}

interface FavoritesStore {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: FavoriteItem) => boolean; // Returns true if added, false if removed
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Don't add if already exists
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      toggleItem: (item) => {
        const state = get();
        const exists = state.items.some((i) => i.id === item.id);
        
        if (exists) {
          state.removeItem(item.id);
          return false; // Removed
        } else {
          state.addItem(item);
          return true; // Added
        }
      },
      isFavorite: (id) => {
        return get().items.some((i) => i.id === id);
      },
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'lumina-favorites',
      storage: createJSONStorage(() => zustandStorage),
      version: 1,
    }
  )
);