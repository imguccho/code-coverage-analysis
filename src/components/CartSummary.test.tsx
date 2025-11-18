import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from './CartSummary';
import { useCart } from '../CartContext';
import { Product } from '../CartContext';

// Mock the useCart hook
jest.mock('../CartContext');

describe('CartSummary', () => {
  const mockAddToCart = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart summary with items', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
      category: 'Test Category',
      inStock: true,
    };

    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct, mockProduct], // Two same products
      addToCart: mockAddToCart,
      clearCart: mockClearCart,
    });

    render(<CartSummary />);
    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
    expect(screen.getByText('Total items: 2')).toBeInTheDocument();
    expect(screen.getByText('Total price: $21.98')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity
    expect(screen.getByText('Subtotal: $21.98')).toBeInTheDocument();
  });

  test('increment quantity', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
      category: 'Test Category',
      inStock: true,
    };

    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct],
      addToCart: mockAddToCart,
      clearCart: mockClearCart,
    });

    render(<CartSummary />);

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('decrement quantity', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
      category: 'Test Category',
      inStock: true,
    };

    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct, mockProduct],
      addToCart: mockAddToCart,
      clearCart: mockClearCart,
    });

    render(<CartSummary />);

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    // It clears cart and re-adds filtered
    expect(mockClearCart).toHaveBeenCalled();
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('remove product', () => {
    const mockProduct1: Product = {
      id: 1,
      name: 'Test Product 1',
      description: 'Desc1',
      price: 10.99,
      category: 'Cat1',
      inStock: true,
    };
    const mockProduct2: Product = {
      id: 2,
      name: 'Test Product 2',
      description: 'Desc2',
      price: 5.99,
      category: 'Cat2',
      inStock: true,
    };

    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct2],
      addToCart: mockAddToCart,
      clearCart: mockClearCart,
    });

    render(<CartSummary />);

    const removeButton = screen.getAllByText('Remove All')[0];
    fireEvent.click(removeButton);

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct2);
  });
});
