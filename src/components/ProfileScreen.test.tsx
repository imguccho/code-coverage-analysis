import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileScreen from './ProfileScreen';

describe('ProfileScreen', () => {
  test('renders user profile information', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Orders placed:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Place Mock Order')).toBeInTheDocument();
    expect(screen.getByText('Order History')).toBeInTheDocument();
  });

  test('renders order history', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Order #1')).toBeInTheDocument();
    expect(screen.getByText('Order #2')).toBeInTheDocument();
    expect(screen.getByText('Order #3')).toBeInTheDocument();
    expect(screen.getByText('Order #4')).toBeInTheDocument();
    expect(screen.getByText('Order #5')).toBeInTheDocument();
  });

  test('places mock order increases count', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('5')).toBeInTheDocument();

    const button = screen.getByText('Place Mock Order');
    fireEvent.click(button);

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Order #6')).toBeInTheDocument();
  });
});
