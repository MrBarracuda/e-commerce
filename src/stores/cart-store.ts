import { create } from "zustand";
// import type CartProduct from "../types/CartProduct";
// import type Product from "../types/Product";
import { persist } from "zustand/middleware";
// import { type Product } from "@/types";

type Product = {
  size: string;
  grind: string;
  price: number;
  id: number;
};

type CartProduct = Product & {
  quantity: number;
};

interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],

      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
      },

      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = get().cartItems.filter(
                (item) => item.id !== productId,
              );
              set({ cartItems: updatedCartItems });
            } else {
              itemExists.quantity--;
              set({ cartItems: [...get().cartItems] });
            }
          }
        }
      },

      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== productId,
            );
            set({ cartItems: updatedCartItems });
          }
        }
      },
    }),
    {
      name: "cart-items",
    },
  ),
);
