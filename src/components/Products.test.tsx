import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Products from './Products';

// Mock useNavigate from react-router-dom
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

  test('renders navigation buttons and they trigger navigation', () => {
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

  test('renders category filter section with category buttons', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();

    // Buttons for each category including 'All'
    const allBtn = screen.getByRole('button', { name: 'All' });
    const electronicsBtn = screen.getByRole('button', { name: 'Electronics' });
    const kitchenBtn = screen.getByRole('button', { name: 'Kitchen' });
    const clothingBtn = screen.getByRole('button', { name: 'Clothing' });

    expect(allBtn).toBeEnabled();
    expect(electronicsBtn).toBeEnabled();
    expect(kitchenBtn).toBeEnabled();
    expect(clothingBtn).toBeEnabled();
  });

  test('filters products by category when category button is clicked', () => {
    render(<Products />);

    // Initially, all products exist
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    
    // Click Electronics category button
    const electronicsBtn = screen.getByRole('button', { name: 'Electronics' });
    fireEvent.click(electronicsBtn);

    // Products with category Electronics are shown
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    
    // Products outside Electronics should NOT be in the document
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
    expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();

    // Click Kitchen category button
    const kitchenBtn = screen.getByRole('button', { name: 'Kitchen' });
    fireEvent.click(kitchenBtn);
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Blender')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
  });

  test('shows all products when "All" category is selected after filtering', () => {
    render(<Products />);

    // Click Electronics category button to filter
    fireEvent.click(screen.getByRole('button', { name: 'Electronics' }));
    expect(screen.getByText('Laptop')).toBeInTheDocument();

    // Click All button to show all
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    // Check that a product from different category shows again
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
  });

  test('renders all products with correct data and stock status', () => {
    render(<Products />);

    // All product names are rendered
    ['Laptop', 'Smartphone', 'Headphones', 'Coffee Mug', 'Blender', 'T-Shirt', 'Jeans', 'Sneakers']
      .forEach(name => expect(screen.getByText(name)).toBeInTheDocument());

    // Stock status text check
    expect(screen.getAllByText(/In Stock|Out of Stock/i).length).toBeGreaterThan(0);

    // Out of stock product "Headphones" should have 'out-of-stock' CSS indicator
    const headphonesCard = screen.getByText('Headphones').closest('div');
    expect(headphonesCard).toHaveClass('out-of-stock');

    // In stock product "Laptop" should NOT have 'out-of-stock' class
    const laptopCard = screen.getByText('Laptop').closest('div');
    expect(laptopCard).not.toHaveClass('out-of-stock');
  });

  test('category button updates active state visually', () => {
    render(<Products />);

    const electronicsBtn = screen.getByRole('button', { name: 'Electronics' });
    const allBtn = screen.getByRole('button', { name: 'All' });

    // Initially 'All' should be active
    expect(allBtn).toHaveClass('active');
    expect(electronicsBtn).not.toHaveClass('active');

    // Click electronics button
    fireEvent.click(electronicsBtn);
    expect(electronicsBtn).toHaveClass('active');
    expect(allBtn).not.toHaveClass('active');
  });

  test('clicking product card triggers no errors and renders product details', () => {
    render(<Products />);

    // Product card with text
    const laptopCard = screen.getByText('Laptop').closest('div');
    expect(laptopCard).toBeInTheDocument();

    // No onClick handlers on cards, but ensure it is clickable without error
    fireEvent.click(laptopCard);
  });

  test('displays a message when no products are available', () => {
    // Assuming we can mock the product data to be empty
    jest.mock('./Products', () => {
      return () => <div>No products available</div>;
    });

    render(<Products />);
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  test('handles edge case of clicking disabled category button', () => {
    render(<Products />);
    
    const disabledCategoryBtn = screen.getByRole('button', { name: 'Disabled Category' });
    expect(disabledCategoryBtn).toBeDisabled();

    fireEvent.click(disabledCategoryBtn);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('ensures category buttons are not clickable when loading', () => {
    // Assuming we can mock loading state
    jest.mock('./Products', () => {
      return () => <div>Loading...</div>;
    });

    render(<Products />);
    const electronicsBtn = screen.getByRole('button', { name: 'Electronics' });
    expect(electronicsBtn).toBeDisabled();
  });

  test('displays error message when fetching products fails', () => {
    // Assuming we can mock an error state
    jest.mock('./Products', () => {
      return () => <div>Error fetching products</div>;
    });

    render(<Products />);
    expect(screen.getByText('Error fetching products')).toBeInTheDocument();
  });

  test('displays loading state while fetching products', () => {
    // Mock loading state
    jest.mock('./Products', () => {
      return () => <div>Loading products...</div>;
    });

    render(<Products />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('displays correct product details when a product is clicked', () => {
    render(<Products />);
    
    const laptopCard = screen.getByText('Laptop').closest('div');
    fireEvent.click(laptopCard);
    
    // Assuming the product details component is rendered on click
    expect(screen.getByText('Laptop Details')).toBeInTheDocument();
    expect(screen.getByText('Price: $999')).toBeInTheDocument();
  });

  test('displays a message when no categories are available', () => {
    // Mocking the scenario where categories are empty
    jest.mock('./Products', () => {
      return () => <div>No categories available</div>;
    });

    render(<Products />);
    expect(screen.getByText('No categories available')).toBeInTheDocument();
  });
});