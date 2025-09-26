import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  it('renders the heading correctly', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frequently Asked Questions');
  });

  it('renders all FAQ questions', () => {
    render(<FAQ />);
    const questions = [
      'How do I add items to my cart?',
      'How can I view my cart?',
      'What payment methods do you accept?',
      'How do I track my order?',
      'What is your return policy?'
    ];
    questions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  it('toggles answer visibility when a question is clicked', () => {
    render(<FAQ />);
    const questionDivs = screen.getAllByText(/How|What|What is|How do|How can/i);

    // Initially no answers are visible
    expect(screen.queryByText(/Simply browse our products and click/)).not.toBeInTheDocument();

    // Click first question to open answer
    fireEvent.click(questionDivs[0]);
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    // Click second question to open its answer and close first
    fireEvent.click(questionDivs[1]);
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();

    // Click second question again to close it
    fireEvent.click(questionDivs[1]);
    expect(screen.queryByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).not.toBeInTheDocument();
  });

  it('displays open indicator (✓) when item is open', () => {
    render(<FAQ />);
    const questions = screen.getAllByRole('heading', { level: 3 });

    // Initially no checkmarks
    expect(screen.queryByText('✓')).not.toBeInTheDocument();

    // Click first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));

    // The first question 'open' should have checkmark
    const checkmarkSpan = screen.getByText('✓');
    expect(checkmarkSpan).toBeInTheDocument();
  });
});
