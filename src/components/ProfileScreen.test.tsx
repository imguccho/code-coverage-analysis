import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileScreen from './ProfileScreen';

describe('ProfileScreen', () => {
  test('renders without crashing and displays user info', () => {
    render(<ProfileScreen />);

    // Check for user name
    expect(screen.getByRole('heading', { name: /john doe/i })).toBeInTheDocument();
    // Check for user email
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();

    // Check for orders placeholder text
    expect(screen.getByText(/orders placed:/i)).toBeInTheDocument();

    // Check for the list of order history items
    const orderHistoryItems = screen.getAllByRole('listitem');
    expect(orderHistoryItems.length).toBe(5); // 5 mock orders
    expect(orderHistoryItems[0]).toHaveTextContent('Order #1');
    expect(orderHistoryItems[4]).toHaveTextContent('Order #5');
  });

  test('placeOrder button increases orders and updates history', () => {
    render(<ProfileScreen />);
    const placeOrderButton = screen.getByRole('button', { name: /place mock order/i });

    // Initial orders count placeholder text
    expect(screen.getByText(/orders placed:/i)).toHaveTextContent('Orders placed: 5');

    // Click the button
    fireEvent.click(placeOrderButton);

    // After clicking, orders count should be updated to 6
    expect(screen.getByText(/orders placed:/i)).toHaveTextContent('Orders placed: 6');

    // New order should appear at bottom of history
    const orderHistoryItems = screen.getAllByRole('listitem');
    expect(orderHistoryItems.length).toBe(6);
    expect(orderHistoryItems[5]).toHaveTextContent('Order #6');
  });
});
