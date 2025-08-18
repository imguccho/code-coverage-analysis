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

  test('category buttons are clickable', () => {
    render(<Products />);
    const allButton = screen.getByText('All');
    expect(allButton).toBeEnabled();
  });

  // New tests for Products.tsx
  test('filters products by category', () => {
    render(<Products />);
    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Blender')).not.toBeInTheDocument(); // Ensure non-electronics are not displayed
  });
});