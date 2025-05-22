import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

type CartStore = {
  successfulOrder: boolean;
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      successfulOrder: false,
      items: [],
      total: 0,

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);

          if (existingItem) {
            const newItems = state.items.map((item) =>
              item.product.id === product.id ? { ...item, count: item.count + 1 } : item
            );
            return {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + item.product.price * item.count, 0),
            };
          }

          const newItems = [...state.items, { product, count: 1 }];
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.product.price * item.count, 0),
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.product.price * item.count, 0),
          };
        }),

      incrementItem: (productId) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, count: item.count + 1 } : item
          );
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.product.price * item.count, 0),
          };
        }),

      decrementItem: (productId) =>
        set((state) => {
          const newItems = state.items
            .map((item) => (item.product.id === productId ? { ...item, count: item.count - 1 } : item))
            .filter((item) => item.count > 0);
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.product.price * item.count, 0),
          };
        }),

      clear: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
