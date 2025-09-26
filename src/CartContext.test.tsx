import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart, Product } from './CartContext';

const wrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product: Product = { id: 1, name: 'Test Product', description: 'Desc', price: 10, category: 'Test', inStock: true };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(product);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product: Product = { id: 1, name: 'Test Product', description: 'Desc', price: 10, category: 'Test', inStock: true };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});