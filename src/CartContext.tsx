import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => prevCart.concat(product));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};