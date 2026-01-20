'use client';

import React, { createContext, useContext, ReactNode, useState, useSyncExternalStore } from 'react';
import toast from 'react-hot-toast';

// Define types
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specifications?: {
    [key: string]: string;
  };
  details?: string[];
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
  getWishlistCount: () => number;
};

// Create a store for localStorage management
const createLocalStorageStore = <T,>(key: string, initialValue: T) => {
  // Server-side check
  if (typeof window === 'undefined') {
    return {
      subscribe: () => () => {},
      getSnapshot: () => initialValue,
      getServerSnapshot: () => initialValue,
      setItem: () => {},
      getItem: () => initialValue
    };
  }

  const listeners: (() => void)[] = [];

  // Cache the current value to avoid re-reading localStorage on every getSnapshot call
  let currentValue = initialValue;
  let hasInitialized = false;

  // Initialize from localStorage on client side only once
  const initializeFromStorage = () => {
    if (!hasInitialized) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          currentValue = JSON.parse(stored);
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
      hasInitialized = true;
    }
  };

  return {
    subscribe: (callback: () => void) => {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        listeners.splice(index, 1);
      };
    },
    
    getSnapshot: () => {
      // Only read from localStorage once on initial load
      initializeFromStorage();
      return currentValue;
    },
    
    getServerSnapshot: () => {
      // Return the initial value on the server
      return initialValue;
    },
    
    setItem: (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        currentValue = newValue;
        listeners.forEach(listener => listener());
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    
    getItem: () => currentValue
  };
};

// Create stores for cart and wishlist
let cartStore: ReturnType<typeof createLocalStorageStore<CartItem[]>>;
let wishlistStore: ReturnType<typeof createLocalStorageStore<Product[]>>;

if (typeof window !== 'undefined') {
  cartStore = createLocalStorageStore<CartItem[]>('cart', []);
  wishlistStore = createLocalStorageStore<Product[]>('wishlist', []);
} else {
  cartStore = createLocalStorageStore<CartItem[]>('cart', []);
  wishlistStore = createLocalStorageStore<Product[]>('wishlist', []);
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot
  );

  // Add to cart function
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = (cart as CartItem[]).find((item: CartItem) => item.product.id === product.id);
    
    if (existingItem) {
      const updatedCart = (cart as CartItem[]).map((item: CartItem) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      cartStore.setItem(updatedCart);
      toast.success(`Increased quantity of ${product.name} to ${existingItem.quantity + quantity}`);
    } else {
      const updatedCart = [...(cart as CartItem[]), { product, quantity }];
      cartStore.setItem(updatedCart);
      toast.success(`${product.name} added to cart!`);
    }
  };

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    const itemToRemove = (cart as CartItem[]).find((item: CartItem) => item.product.id === productId);
    if (itemToRemove) {
      toast.success(`${itemToRemove.product.name} removed from cart`);
    }
    const updatedCart = (cart as CartItem[]).filter((item: CartItem) => item.product.id !== productId);
    cartStore.setItem(updatedCart);
  };

  // Update quantity function
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const currentItem = (cart as CartItem[]).find((item: CartItem) => item.product.id === productId);
    if (currentItem) {
      toast.success(`Updated quantity of ${currentItem.product.name} to ${quantity}`);
    }
    
    const updatedCart = (cart as CartItem[]).map((item: CartItem) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    cartStore.setItem(updatedCart);
  };

  // Add to wishlist function
  const addToWishlist = (product: Product) => {
    // Check if product is already in wishlist
    const exists = (wishlist as Product[]).some((item: Product) => item.id === product.id);
    if (exists) {
      toast.error(`${product.name} is already in your wishlist`);
      return; // Don't add duplicates
    }
    
    const updatedWishlist = [...(wishlist as Product[]), product];
    wishlistStore.setItem(updatedWishlist);
    toast.success(`${product.name} added to wishlist!`);
  };

  // Remove from wishlist function
  const removeFromWishlist = (productId: number) => {
    const itemToRemove = (wishlist as Product[]).find((item: Product) => item.id === productId);
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removed from wishlist`);
    }
    const updatedWishlist = (wishlist as Product[]).filter((item: Product) => item.id !== productId);
    wishlistStore.setItem(updatedWishlist);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: number) => {
    return (wishlist as Product[]).some((item: Product) => item.id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId: number) => {
    return (cart as CartItem[]).some((item: CartItem) => item.product.id === productId);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return (cart as CartItem[]).reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
  };

  // Get cart count
  const getCartCount = () => {
    return (cart as CartItem[]).reduce((count: number, item: CartItem) => count + item.quantity, 0);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return (wishlist as Product[]).length;
  };

  const value = {
    cart: cart as CartItem[],
    wishlist: wishlist as Product[],
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    getCartTotal,
    getCartCount,
    getWishlistCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};