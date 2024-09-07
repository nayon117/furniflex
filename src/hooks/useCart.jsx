import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

// Create the Zustand store with persistence
const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [], // Initial state of cart items

      // Function to add an item to the cart
      addItem: (data) => {
        const { id, title, image,description, price } = data;
        const currentItems = get().cartItems;
        const isExisting = currentItems.find((cartItem) => cartItem.id === id);

        // Check if the item already exists in the cart
        if (isExisting) {
          return toast("Item already in cart");
        }

        // Add the new item to the cart
        set((state) => ({
          cartItems: [
            ...state.cartItems,
            { id, title, price, image,description, quantity: 1 },
          ],
        }));
        toast.success("Item added to cart", { icon: "🛒" });
      },

      // Function to remove an item from the cart
      removeItem: (idToRemove) => {
        set((state) => {
          const newCartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== idToRemove
          );
          return { cartItems: newCartItems };
        });
        toast.success("Item removed from cart");
      },

      // Function to increase the quantity of an item in the cart
      increaseQuantity: (idToIncrease) => {
        set((state) => {
          const newCartItems = state.cartItems.map((cartItem) =>
            cartItem.id === idToIncrease
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          return { cartItems: newCartItems };
        });
        toast.success("Item quantity increased");
      },

      // Function to decrease the quantity of an item in the cart
      decreaseQuantity: (idToDecrease) => {
        set((state) => {
          const newCartItems = state.cartItems.map((cartItem) =>
            cartItem.id === idToDecrease
              ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
              : cartItem
          );
          return { cartItems: newCartItems };
        });
        toast.success("Item quantity decreased");
      },

      // Function to clear all items from the cart
      clearCart: () => {
        set((state) => {
          if (state.cartItems.length === 0) return state;
          return { cartItems: [] };
        });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
