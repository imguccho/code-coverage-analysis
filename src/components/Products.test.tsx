import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';

describe('Products Component', () => {
  test('renders products page with title and description', () => {
    render(<Products />);

    expect(screen.getByText('Title - This is Our Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products with dummy data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Products />);
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
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

    // Initially all products should be shown
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();

    // Click Electronics filter (this should cover the filtering logic)
    fireEvent.click(screen.getByText('Electronics'));

    // Only electronics should remain
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
    expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
  });

  test('shows all products when "All" category is selected', () => {
    render(<Products />);

    // Start with Electronics filter
    fireEvent.click(screen.getByText('Electronics'));
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();

    // Click All to show everything again
    fireEvent.click(screen.getByText('All'));

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
  });

  test('renders all products with correct data', () => {
    render(<Products />);
    
    // Check if all products are rendered
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Blender')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  // test('product cards display correct information', () => {
  //   render(<Products />);
  //   // ...
  // });

  // test('renders correct number of products', () => {
  //   render(<Products />);
  //   // ...
  // });

  // test('out of stock products have different styling', () => {
  //   render(<Products />);
  //   // ...
  // });

  // test('in stock products do not have out-of-stock styling', () => {
  //   render(<Products />);
  //   // ...
  // });

  test('category buttons are clickable', () => {
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

  test('navigation buttons are clickable', () => {
    render(<Products />);
    
    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');
    
    expect(homeButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

  // test('navigation functions are called when buttons are clicked', () => {
  //   render(<Products />);
  //   // ...
  // });

  // xtest('component structure is correct', () => {
  //   render(<Products />);
  //   // ...
  // });
});
