import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import * as reactRouterDom from 'react-router-dom';
import * as CartContext from '../CartContext';

// Mock product data for testing
const mockProducts = [
  { id: 1, name: 'Product1', price: 100, category: 'all', inStock: true, description: 'desc1' },
  { id: 2, name: 'Product2', price: 200, category: 'electronics', inStock: false, description: 'desc2' },
  { id: 3, name: 'Product3', price: 300, category: 'books', inStock: true, description: 'desc3' }
];

// Mock useNavigate
const mockNavigate = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);
  jest.spyOn(CartContext, 'useCart').mockReturnValue({ addToCart: jest.fn() });
});

describe('Products component', () => {
  test('renders product page with navigation buttons and category filters', () => {
    render(<Products />);
    expect(screen.getByText(/Products Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to About/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by Category:/i)).toBeInTheDocument();
  });

  test('navigation buttons call navigate with correct paths', () => {
    render(<Products />);
    fireEvent.click(screen.getByText(/Go to Home/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
    fireEvent.click(screen.getByText(/Go to About/i));
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  test('category filter buttons change category', () => {
    render(<Products />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const booksButton = screen.getByRole('button', { name: /books/i });
    fireEvent.click(booksButton);
    expect(booksButton).toHaveClass('category-button active');
    expect(allButton).toHaveClass('category-button');
  });

  test('displays filtered products based on selected category', () => {
    // Override productsData with mockProducts
    jest.mock('./productsData', () => mockProducts);

    render(<Products />);
    // Initially category is 'all', so all products should be displayed
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // Click on category 'books' to filter
    fireEvent.click(screen.getByRole('button', { name: /books/i }));
    expect(screen.queryByText('Product1')).not.toBeInTheDocument();
    expect(screen.queryByText('Product2')).not.toBeInTheDocument();
    expect(screen.getByText('Product3')).toBeInTheDocument();
  });

  test('Add to Cart button calls addToCart with correct product', () => {
    const addToCartMock = jest.fn();
    jest.spyOn(CartContext, 'useCart').mockReturnValue({ addToCart: addToCartMock });
    render(<Products />);
    const addButtons = screen.getAllByRole('button', { name: /add to cart/i });
    fireEvent.click(addButtons[0]);
    expect(addToCartMock).toHaveBeenCalled();
  });

  test('product stock status displays correctly', () => {
    render(<Products />);
    expect(screen.getByText(/In Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });
});