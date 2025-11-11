import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Products Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders products page with title and description', () => {
    render(<Products />);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products with dummy data.')).toBeInTheDocument();
  });

  test('renders navigation buttons and buttons trigger navigation', () => {
    render(<Products />);

    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');

    expect(homeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();

    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  test('renders category filter section with all category buttons active & clickable', () => {
    render(<Products />);

    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();

    // All category buttons exist
    const allButton = screen.getByText('All');
    const electronicsButton = screen.getByText('Electronics');
    const kitchenButton = screen.getByText('Kitchen');
    const clothingButton = screen.getByText('Clothing');

    expect(allButton).toBeEnabled();
    expect(electronicsButton).toBeEnabled();
    expect(kitchenButton).toBeEnabled();
    expect(clothingButton).toBeEnabled();
  });

  test('filters products when category button is clicked and highlights selection', () => {
    render(<Products />);

    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);

    // Should show only electronic products
    expect(screen.queryByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Smartphone')).toBeInTheDocument();
    expect(screen.queryByText('Headphones')).toBeInTheDocument();

    // Should not show products from other categories
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
    expect(screen.queryByText('Blender')).not.toBeInTheDocument();

    // The selected category button should have 'active' class
    expect(electronicsButton.className).toMatch(/active/);

    // Clicking another category updates selection
    const kitchenButton = screen.getByText('Kitchen');
    fireEvent.click(kitchenButton);

    expect(screen.queryByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.queryByText('Blender')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();

    expect(kitchenButton.className).toMatch(/active/);
    expect(electronicsButton.className).not.toMatch(/active/);

    // Clicking 'All' shows all products again
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
  });

  test('renders all product cards with correct details and stock status', () => {
    render(<Products />);
    // Check product names and price are rendered
    const productsToCheck = [
      { name: 'Laptop', price: '999.99', inStock: true },
      { name: 'Headphones', price: '199.99', inStock: false },
      { name: 'Coffee Mug', price: '15.99', inStock: true },
    ];

    productsToCheck.forEach(({ name, price, inStock }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`Price: \$?${price}`))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`Status: ${inStock ? 'In Stock' : 'Out of Stock'}`))).toBeInTheDocument();

      // Verify stock styling conditionally applied
      const card = screen.getByText(name).parentElement;
      if (inStock) {
        expect(card?.className).not.toMatch(/out-of-stock/);
      } else {
        expect(card?.className).toMatch(/out-of-stock/);
      }
    });
  });

  test('clicking category buttons triggers handleCategoryChange with correct category', () => {
    render(<Products />);

    const clothingButton = screen.getByText('Clothing');

    fireEvent.click(clothingButton);

    // After clicking Clothing, only its products should show
    expect(screen.queryByText('T-Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Jeans')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();

    // Check category button is active
    expect(clothingButton.className).toMatch(/active/);
  });

  test('navigation buttons trigger the navigation functions on click', () => {
    render(<Products />);

    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');

    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
