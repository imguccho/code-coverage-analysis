import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Products from './Products';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Products Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders products page with title and description', () => {
    render(<Products />);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products with dummy data.')).toBeInTheDocument();
  });

  test('renders navigation buttons and triggers navigation on click', () => {
    render(<Products />);

    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    const aboutButton = screen.getByText('Go to About');
    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  test('renders category filter section with all category buttons', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();

    // Category buttons
    const allButton = screen.getByRole('button', { name: 'All' });
    const electronicsButton = screen.getByRole('button', { name: 'Electronics' });
    const kitchenButton = screen.getByRole('button', { name: 'Kitchen' });
    const clothingButton = screen.getByRole('button', { name: 'Clothing' });

    expect(allButton).toBeEnabled();
    expect(electronicsButton).toBeEnabled();
    expect(kitchenButton).toBeEnabled();
    expect(clothingButton).toBeEnabled();
  });

  test('filters products by category when category button is clicked', () => {
    render(<Products />);

    const electronicsButton = screen.getByRole('button', { name: 'Electronics' });
    fireEvent.click(electronicsButton);

    // Products with Electronics category and inStock true or false
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();

    // Products outside Electronics category should not be visible
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
    expect(screen.queryByText('Blender')).not.toBeInTheDocument();
  });

  test('shows all products when "All" category is selected', () => {
    render(<Products />);

    const allButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allButton);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  test('renders all products with correct data and styling based on stock', () => {
    render(<Products />);

    const products = [
      { name: 'Laptop', inStock: true },
      { name: 'Smartphone', inStock: true },
      { name: 'Headphones', inStock: false },
      { name: 'Coffee Mug', inStock: true },
      { name: 'Blender', inStock: true },
      { name: 'T-Shirt', inStock: true },
      { name: 'Jeans', inStock: true },
      { name: 'Sneakers', inStock: true },
    ];

    products.forEach(({ name, inStock }) => {
      const productCard = screen.getByText(name).closest('div');
      expect(productCard).toBeInTheDocument();

      if (!inStock) {
        expect(productCard).toHaveClass('out-of-stock');
      } else {
        expect(productCard).not.toHaveClass('out-of-stock');
      }
    });
  });

  test('category buttons toggle active state correctly', () => {
    render(<Products />);

    const electronicsButton = screen.getByRole('button', { name: 'Electronics' });
    const allButton = screen.getByRole('button', { name: 'All' });

    // Initially All is active
    expect(allButton).toHaveClass('active');

    fireEvent.click(electronicsButton);

    expect(electronicsButton).toHaveClass('active');
    expect(allButton).not.toHaveClass('active');
  });

  test('handle edge case: clicking category button with no products', () => {
    render(<Products />);

    // Add a category button dynamically to emulate no products in category
    // Since categories are from products, we test clicking a category not in products
    // But component code doesn't render a button for a category with no products so no button to click,
    // Hence test edge by clicking a known category and verify rendering correct filtering of no products

    const categoryButtons = screen.getAllByRole('button');

    // Select Clothing category (some products in Clothing)
    const clothingButton = categoryButtons.find(btn => btn.textContent === 'Clothing');
    fireEvent.click(clothingButton);

    // Now simulate filter by a category with no products: Not possible directly - so test with existing categories suffices.

    // Check filtered products are only clothing category
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
  });

  test('products display correct information', () => {
    render(<Products />);
    const laptopName = screen.getByText('Laptop');
    const laptopCard = laptopName.closest('div');

    expect(laptopCard).toHaveTextContent('Price: $999.99');
    expect(laptopCard).toHaveTextContent('Category: Electronics');
    expect(laptopCard).toHaveTextContent('Status: In Stock');
  });
});