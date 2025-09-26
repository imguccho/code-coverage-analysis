import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders title and all questions', () => {
    render(<FAQ />);

    // Check for header
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frequently Asked Questions');

    // Check all questions are rendered
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('toggles answer display when question is clicked', () => {
    render(<FAQ />);

    // Answers should not be visible initially
    expect(screen.queryByText(/Simply browse our products and click the/)).not.toBeInTheDocument();

    // Click first question
    const firstQuestionDiv = screen.getByText('How do I add items to my cart?').parentElement.parentElement;
    fireEvent.click(firstQuestionDiv);

    // Answer should appear for first question
    expect(screen.getByText(/Simply browse our products and click the "Add to Cart"/)).toBeInTheDocument();

    // Click again to close
    fireEvent.click(firstQuestionDiv);

    // Answer should be hidden
    expect(screen.queryByText(/Simply browse our products and click the/)).not.toBeInTheDocument();
  });

  test('only one answer is visible at a time', () => {
    render(<FAQ />);

    const questionDivs = screen.getAllByText(/How/).map(el => el.parentElement.parentElement);

    // Open first question
    fireEvent.click(questionDivs[0]);
    expect(screen.getByText(/Simply browse our products/)).toBeInTheDocument();

    // Open second question
    fireEvent.click(questionDivs[1]);

    // First answer should be hidden
    expect(screen.queryByText(/Simply browse our products/)).not.toBeInTheDocument();

    // Second answer should appear
    expect(screen.getByText(/Click on the cart icon in the top right corner/)).toBeInTheDocument();
  });

  test('displays correct open index indicator in UI', () => {
    render(<FAQ />);

    // Initially no open index displayed
    expect(screen.queryByText('✓')).not.toBeInTheDocument();

    // Open first question
    const firstQuestionDiv = screen.getByText('How do I add items to my cart?').parentElement.parentElement;
    fireEvent.click(firstQuestionDiv);

    // Open index should be displayed
    const spans = screen.getAllByText(/0|1|2|3|4/);
    expect(spans.some(span => span.textContent === '0')).toBe(true);

    // Open first question again to close
    fireEvent.click(firstQuestionDiv);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});