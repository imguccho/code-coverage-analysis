import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<NotFound />);
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to Cart')).toBeInTheDocument();
  });
});
