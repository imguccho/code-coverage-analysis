import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom's useNavigate to test navigation
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Products Component', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  test('renders products page with title and description', () => {
    render(<Products />);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products with dummy data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Products />);
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('navigation buttons call navigate with correct paths on click', () => {
    render(<Products />);
    fireEvent.click(screen.getByText('Go to Home'));
    expect(navigateMock).toHaveBeenCalledWith('/');

    fireEvent.click(screen.getByText('Go to About'));
    expect(navigateMock).toHaveBeenCalledWith('/about');
  });

  test('renders category filter section and all category buttons', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();

    ['All', 'Electronics', 'Kitchen', 'Clothing'].forEach(category => {
      expect(screen.getByRole('button', { name: new RegExp(category, 'i') })).toBeInTheDocument();
    });
  });

  test('category buttons filter products correctly', () => {
    render(<Products />);

    // Initial state is 'All', all products shown
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();

    // Click on 'Electronics' filter
    fireEvent.click(screen.getByRole('button', { name: 'Electronics' }));

    // Electronics products should be visible
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();

    // Product not in Electronics should not be visible
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();

    // Click on 'Kitchen' filter
    fireEvent.click(screen.getByRole('button', { name: 'Kitchen' }));
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Blender')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();

    // Click on 'Clothing' filter
    fireEvent.click(screen.getByRole('button', { name: 'Clothing' }));
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();

    // Click back to 'All'
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
  });

  test('products display correct info and stock status styling', () => {
    render(<Products />);

    const headphonesCard = screen.getByText('Headphones').closest('div');
    expect(headphonesCard).toHaveTextContent('Price: $199.99');
    expect(headphonesCard).toHaveTextContent('Category: Electronics');
    expect(headphonesCard).toHaveTextContent('Status: Out of Stock');
    expect(headphonesCard).toHaveClass('product-card out-of-stock');

    const laptopCard = screen.getByText('Laptop').closest('div');
    expect(laptopCard).toHaveTextContent('Price: $999.99');
    expect(laptopCard).toHaveTextContent('Category: Electronics');
    expect(laptopCard).toHaveTextContent('Status: In Stock');
    expect(laptopCard).toHaveClass('product-card');
    expect(laptopCard).not.toHaveClass('out-of-stock');
  });

  test('category buttons have active class when selected', () => {
    render(<Products />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    const electronicsBtn = screen.getByRole('button', { name: 'Electronics' });

    // Initially 'All' is active
    expect(allBtn).toHaveClass('category-button active');
    expect(electronicsBtn).toHaveClass('category-button');
    expect(electronicsBtn).not.toHaveClass('active');

    fireEvent.click(electronicsBtn);

    expect(electronicsBtn).toHaveClass('category-button active');
    expect(allBtn).not.toHaveClass('active');
  });

  test('category button onClick calls handleCategoryChange with correct category', () => {
    render(<Products />);

    const kitchenBtn = screen.getByRole('button', { name: 'Kitchen' });

    fireEvent.click(kitchenBtn);

    expect(kitchenBtn).toHaveClass('active');
  });

  test('navigation buttons are enabled and clickable', () => {
    render(<Products />);

    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');

    expect(homeButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();

    fireEvent.click(homeButton);
    expect(navigateMock).toHaveBeenCalledWith('/');

    fireEvent.click(aboutButton);
    expect(navigateMock).toHaveBeenCalledWith('/about');
  });
});