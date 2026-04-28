import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  variantId: number;
  productId: number;
  name: string;
  slug: string;
  price: string;
  image?: string;
  color?: string;
  size?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find((item) => item.variantId === newItem.variantId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.variantId === newItem.variantId
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, newItem], isOpen: true });
        }
      },
      removeItem: (variantId) => {
        set({ items: get().items.filter((item) => item.variantId !== variantId) });
      },
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
        } else {
          set({
            items: get().items.map((item) =>
              item.variantId === variantId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'shopping-cart',
    }
  )
);
