import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from './CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product = { id: 1, name: 'Product 1', description: 'Desc', price: 10, category: 'cat', inStock: true };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(product);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product = { id: 1, name: 'Product 1', description: 'Desc', price: 10, category: 'cat', inStock: true };

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