import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';

describe('Products Component', () => {
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

  test('navigation functions are called when navigation buttons are clicked', () => {
    render(<Products />);
    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');

    fireEvent.click(homeButton);
    expect(window.location.pathname).toBe('/'); // navigation to Home

    fireEvent.click(aboutButton);
    expect(window.location.pathname).toBe('/about'); // navigation to About
  });

  test('renders category filter section', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();
  });

  test('renders all category filter buttons', () => {
    render(<Products />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  test('filters products by category when category button is clicked', () => {
    render(<Products />);

    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
  });

  test('shows all products when "All" category is selected', () => {
    render(<Products />);

    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
  });

  test('renders all products with correct data', () => {
    render(<Products />);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Blender')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  test('product cards display correct out of stock text and styling', () => {
    render(<Products />);

    const outOfStockProduct = screen.getByText('Headphones').parentElement;
    expect(outOfStockProduct).toHaveTextContent('Out of Stock');

    const inStockProduct = screen.getByText('Laptop').parentElement;
    expect(inStockProduct).not.toHaveTextContent('Out of Stock');
  });

  test('category buttons are clickable and enabled', () => {
    render(<Products />);

    const allButton = screen.getByText('All');
    const electronicsButton = screen.getByText('Electronics');
    const kitchenButton = screen.getByText('Kitchen');
    const clothingButton = screen.getByText('Clothing');

    expect(allButton).toBeEnabled();
    expect(electronicsButton).toBeEnabled();
    expect(kitchenButton).toBeEnabled();
    expect(clothingButton).toBeEnabled();
  });

  test('navigation buttons are clickable and enabled', () => {
    render(<Products />);
    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');

    expect(homeButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

});