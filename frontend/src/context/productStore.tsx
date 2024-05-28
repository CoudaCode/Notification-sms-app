import create from "zustand";
import { Product } from "../types/Products";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type ProductState = {
  products: Product[];
  cartItems: CartItem[];
  fetchProducts: () => Promise<void>;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  addToCart: (product: Product) => void;
  incrementCartItem: (productId: number) => void;
  decrementCartItem: (productId: number) => void;
  removeFromCart: (productId: number) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  cartItems: [],
  fetchProducts: async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const productsWithQuantity = data.map((product: Product) => ({
        ...product,
        quantity: 0,
      }));

      set({ products: productsWithQuantity });
    } catch (e) {
      console.error(e);
    }
  },
  incrementQuantity: (productId: number) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    }));
  },
  decrementQuantity: (productId: number) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    }));
  },
  addToCart: (product: Product) => {
    set((state) => {
      const itemInCart = state.cartItems.find(
        (item) => item.name === product.title
      );
      if (itemInCart) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.name === product.title
              ? {
                  ...item,
                  image: product.image,
                  quantity: item.quantity + product.quantity,
                }
              : item
          ),
        };
      } else {
        return {
          cartItems: [
            ...state.cartItems,
            {
              id: product.id,
              name: product.title,
              image: product.image,
              price: product.price,
              quantity: product.quantity,
            },
          ],
        };
      }
    });
  },
  incrementCartItem: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },
  decrementCartItem: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  },
  removeFromCart: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    }));
  },
}));
