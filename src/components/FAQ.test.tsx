import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders header text', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frequently Asked Questions');
  });

  test('renders all FAQ questions', () => {
    render(<FAQ />);
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('initially no question is expanded', () => {
    render(<FAQ />);
    // No answer paragraphs should be visible initially
    expect(screen.queryByText(/Simply browse our products/)).not.toBeInTheDocument();
  });

  test('toggles correct answer when a question is clicked', () => {
    render(<FAQ />);

    // Click first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    // Click second question
    fireEvent.click(screen.getByText('How can I view my cart?'));
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();

    // First answer should no longer be visible
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  test('clicking the open question closes it', () => {
    render(<FAQ />);
    const question = screen.getByText('What payment methods do you accept?');

    // Open
    fireEvent.click(question);
    expect(screen.getByText('We accept all major credit cards, PayPal, and other digital payment methods.')).toBeInTheDocument();

    // Close
    fireEvent.click(question);
    expect(screen.queryByText('We accept all major credit cards, PayPal, and other digital payment methods.')).not.toBeInTheDocument();
  });

  test('displays index with special icon for opened item', () => {
    render(<FAQ />);
    const firstQuestionIconBefore = screen.queryByText('•');
    expect(firstQuestionIconBefore).not.toBeInTheDocument();

    // Open first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    // The special icon is the Unicode bullet used for open question (the code shows '\u2713', but looks like '✓') - actual text in code is '✓' used as ✓ in the code = '✓'.
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});