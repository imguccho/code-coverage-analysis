import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders FAQ title', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  test('renders all questions', () => {
    render(<FAQ />);
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('toggles accordion on click', () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText('How do I add items to my cart?');
    expect(firstQuestion).toBeInTheDocument();

    // Initially, answer should not be visible
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(firstQuestion);
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(firstQuestion);
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  test('shows + for closed and - for open', () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText('How do I add items to my cart?');

    // Initially closed
    expect(screen.getByText('+')).toBeInTheDocument();

    // Open it
    fireEvent.click(firstQuestion);
    expect(screen.getByText('−')).toBeInTheDocument();
  });
});
