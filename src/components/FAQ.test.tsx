import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders the heading correctly', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frequently Asked Questions');
  });

  test('renders all FAQ items with questions visible', () => {
    render(<FAQ />);
    const questions = [
      'How do I add items to my cart?',
      'How can I view my cart?',
      'What payment methods do you accept?',
      'How do I track my order?',
      'What is your return policy?'
    ];
    questions.forEach(q => {
      expect(screen.getByText(q)).toBeInTheDocument();
    });
  });

  test('initially all answers are hidden', () => {
    render(<FAQ />);
    const answers = [
      'Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.',
      'Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.',
      'We accept all major credit cards, PayPal, and other digital payment methods.',
      'Once your order is confirmed, you can track it from your profile section under "Order History".',
      'We offer a 30-day return policy for most items. Please check individual product details for specific return information.'
    ];
    answers.forEach(answer => {
      expect(screen.queryByText(answer)).not.toBeInTheDocument();
    });
  });

  test('clicking on a question toggles its answer visibility', () => {
    render(<FAQ />);
    // Click the first question
    const firstQuestion = screen.getByText('How do I add items to my cart?');
    fireEvent.click(firstQuestion);

    // After clicking, the corresponding answer should appear
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(firstQuestion);

    // Answer should be hidden again
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  test('only one answer opens at a time', () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText('How do I add items to my cart?');
    const secondQuestion = screen.getByText('How can I view my cart?');
    
    fireEvent.click(firstQuestion);
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    // First answer should now be hidden
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    // Second answer should be visible
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();
  });

  test('renders the icon for open item correctly', () => {
    render(<FAQ />);
    const firstQuestionParent = screen.getByText('How do I add items to my cart?').closest('div');
    // Initially icon should show closed state (eyeglasses symbol '👓' or the untranslated icons)
    expect(firstQuestionParent.querySelector('span')).toHaveTextContent('👓');

    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    // After open, icon should switch to the open icon (Unicode '🧐' or similar)
    expect(firstQuestionParent.querySelector('span')).toHaveTextContent('🧐');
  });
});