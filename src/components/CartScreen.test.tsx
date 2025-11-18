import React from 'react';
import { render, screen } from '@testing-library/react';
import CartScreen from './CartScreen';
import { useCart } from '../CartContext';
import { Product } from '../CartContext';

// Mock the useCart hook
jest.mock('../CartContext');

// Mock the useCart hook implementation
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('CartScreen', () => {
  test('renders empty cart message when cart is empty', () => {
    mockUseCart.mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<CartScreen />);
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items and total when cart has items', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
      category: 'Test Category',
      inStock: true,
    };

    mockUseCart.mockReturnValue({
      cart: [mockProduct],
      addToCart: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<CartScreen />);
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
    expect(screen.getByText('Category: Test Category')).toBeInTheDocument();
    expect(screen.getByText('Status: In Stock')).toBeInTheDocument();
    expect(screen.getByText('Total: $10.99')).toBeInTheDocument();
  });
});
