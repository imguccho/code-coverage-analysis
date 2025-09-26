import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders the FAQ heading', () => {
    render(<FAQ />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Frequently Asked Questions');
  });

  test('all questions are rendered', () => {
    render(<FAQ />);
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('toggles answer when question is clicked', () => {
    render(<FAQ />);
    // Initially, no answers are shown
    expect(screen.queryByText(/Simply browse our products/)).not.toBeInTheDocument();

    const questionElement = screen.getByText('How do I add items to my cart?');
    fireEvent.click(questionElement);

    // Answer should appear after first click
    expect(screen.getByText(/Simply browse our products/)).toBeInTheDocument();

    fireEvent.click(questionElement);

    // Answer should disappear after second click
    expect(screen.queryByText(/Simply browse our products/)).not.toBeInTheDocument();
  });

  test('only one answer is visible at a time', () => {
    render(<FAQ />);

    const firstQuestion = screen.getByText('How do I add items to my cart?');
    const secondQuestion = screen.getByText('How can I view my cart?');

    fireEvent.click(firstQuestion);
    expect(screen.getByText(/Simply browse our products/)).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    // First answer should be hidden
    expect(screen.queryByText(/Simply browse our products/)).not.toBeInTheDocument();
    // Second answer should be visible
    expect(screen.getByText(/Click on the cart icon/)).toBeInTheDocument();
  });
});