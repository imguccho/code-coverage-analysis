import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { useCart } from '../CartContext';
import productsData from './productsData';

// Mock the hooks
jest.mock('../CartContext');

// Import useParams
import { useParams } from 'react-router-dom';
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe('ProductDetails', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  test('renders product details for valid id', () => {
    useParams.mockReturnValue({ id: '1' });

    render(<ProductDetails />);
    const product = productsData.find(p => p.id === 1);
    expect(product).toBeDefined();
    expect(screen.getByText(product!.name)).toBeInTheDocument();
    expect(screen.getByText(product!.description)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${product!.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${product!.category}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${product!.inStock ? 'In Stock' : 'Out of Stock'}`)).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  test('renders not found for invalid id', () => {
    useParams.mockReturnValue({ id: '999' });

    render(<ProductDetails />);
    expect(screen.getByText('Product not found.')).toBeInTheDocument();
  });

  test('adds to cart when button clicked', () => {
    useParams.mockReturnValue({ id: '1' });

    render(<ProductDetails />);
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);
    const product = productsData.find(p => p.id === 1);
    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });
});
