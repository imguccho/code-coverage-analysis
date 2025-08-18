import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Existing test code

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  // New tests for index.tsx
  test('renders the root element', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders the App component correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText(/learn more/i)).toBeInTheDocument(); // Assuming there's a link or text to learn more
  });
});