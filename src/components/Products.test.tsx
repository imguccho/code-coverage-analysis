import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { useCart } from '../CartContext';
import productsData from './productsData';

// Mock the useCart hook
jest.mock('../CartContext');

// Import and mock useNavigate
import { useNavigate } from 'react-router-dom';

describe('Products Component', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  test('renders products page', () => {
    render(<Products />);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Products />);
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('renders category filter', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();
  });

  test('renders products', () => {
    render(<Products />);
    productsData.forEach((product) => {
      expect(screen.getByText(new RegExp(product.name, 'i'))).toBeInTheDocument();
    });
  });

  test('filters products by category', () => {
    render(<Products />);
    const categoryButton = screen.getByText(productsData[0].category.charAt(0).toUpperCase() + productsData[0].category.slice(1));
    fireEvent.click(categoryButton);
    // After clicking, should still have products of that category
    expect(screen.getByText(productsData[0].name)).toBeInTheDocument();
  });

  test('calls addToCart when button is clicked', () => {
    render(<Products />);
    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(productsData[0]);
  });

  test('navigates to home when button clicked', () => {
    render(<Products />);
    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);
    expect(useNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to about when button clicked', () => {
    render(<Products />);
    const aboutButton = screen.getByText('Go to About');
    fireEvent.click(aboutButton);
    expect(useNavigate).toHaveBeenCalledWith('/about');
  });
});
