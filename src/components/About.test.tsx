import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

describe('About component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders main headings and descriptions', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/About Our Company/i);
    expect(screen.getByText(/Learn more about our team and company statistics./i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Company Statistics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Our Team/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Our Mission/i })).toBeInTheDocument();
  });

  test('renders navigation buttons and triggers navigation on click', () => {
    const goToHomeButton = screen.getByText(/Go to Home/i);
    const goToProductsButton = screen.getByText(/Go to Products/i);

    expect(goToHomeButton).toBeInTheDocument();
    expect(goToProductsButton).toBeInTheDocument();

    // Mock window location assign to test navigation
    const originalLocation = window.location;
    delete window.location;
    window.location = { assign: jest.fn() };

    fireEvent.click(goToHomeButton);
    expect(window.location.assign).toHaveBeenCalledWith('/');

    fireEvent.click(goToProductsButton);
    expect(window.location.assign).toHaveBeenCalledWith('/products');

    window.location = originalLocation;
  });

  test('renders all company stats with correct content', () => {
    const statCards = screen.getAllByRole('heading', { level: 3 });
    expect(statCards).toHaveLength(5);
    expect(screen.getByText(/Years in Business/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Members/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Satisfaction/i)).toBeInTheDocument();
  });

  test('renders all team members with correct text including experience level', () => {
    const teamMembers = screen.getAllByRole('heading', { level: 3 });
    expect(teamMembers.length).toBeGreaterThan(1);
    ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    // Check experience text pattern
    expect(screen.getByText(/Experience: Senior years/i)).toBeInTheDocument();
  });

  test('renders mission statement with expected text', () => {
    expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
    expect(screen.getByText(/We are dedicated to creating innovative solutions that help businesses grow and succeed./i)).toBeInTheDocument();
  });
});