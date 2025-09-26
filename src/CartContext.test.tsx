import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart, Product } from './CartContext';

// Helper wrapper for renderHook to provide context
const wrapper: React.FC = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('should add product to cart', () => {
    const product: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Description',
      price: 100,
      category: 'Test',
      inStock: true
    };

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(product);
  });

  it('should clear cart', () => {
    const product: Product = {
      id: 2,
      name: 'Another Product',
      description: 'Description',
      price: 200,
      category: 'Another',
      inStock: true
    };

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart.length).toBe(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

  it('should not modify state when clearing empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

  it('CartProvider renders children', () => {
    const { getByText } = render(
      <CartProvider>
        <div>Test Child</div>
      </CartProvider>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
