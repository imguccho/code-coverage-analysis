import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it('renders the main heading', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frequently Asked Questions');
  });

  it('renders all FAQ questions', () => {
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  it('toggles answer visibility when question is clicked', () => {
    const firstQuestion = screen.getByText('How do I add items to my cart?');
    // Initially answer should not be visible
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();

    fireEvent.click(firstQuestion);

    // After click, answer should be visible
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    // Clicking again should hide it
    fireEvent.click(firstQuestion);
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  it('only one answer is visible at a time', () => {
    const firstQuestion = screen.getByText('How do I add items to my cart?');
    const secondQuestion = screen.getByText('How can I view my cart?');

    fireEvent.click(firstQuestion);
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();
  });

  it('renders question index correctly as emoji or number', () => {
    // First question index 0 -> shows emoji (based on code \u201c9\u201d char)
    expect(screen.getByText('🔒')).toBeInTheDocument();

    // Next questions show numeric index + 1
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
  });
});
