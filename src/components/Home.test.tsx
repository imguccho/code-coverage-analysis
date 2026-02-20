import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the `useNavigate` hook from 'react-router-dom'
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Keep other exports from the module
  useNavigate: () => mockNavigate, // Provide our mock implementation for useNavigate
}));

describe('Home Component', () => {
  // Clear mock calls before each test to ensure isolation
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // Test Case 1: Initial rendering of static elements and navigation buttons
  test('renders the home page with main title, description, and navigation buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Assert that the main title and description are present
    expect(screen.getByRole('heading', { level: 1, name: /Welcome to Our Application/i })).toBeInTheDocument();
    expect(screen.getByText(/This is the home page with some dummy user data/i)).toBeInTheDocument();

    // Assert that the navigation buttons are rendered
    expect(screen.getByRole('button', { name: /Go to Products/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to About/i })).toBeInTheDocument();
  });

  // Test Case 2: Navigation to '/products' on button click
  test('calls navigate with "/products" when "Go to Products" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Find the "Go to Products" button and simulate a click
    const productsButton = screen.getByRole('button', { name: /Go to Products/i });
    fireEvent.click(productsButton);

    // Assert that `mockNavigate` was called once with the correct path
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  // Test Case 3: Navigation to '/about' on button click
  test('calls navigate with "/about" when "Go to About" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Find the "Go to About" button and simulate a click
    const aboutButton = screen.getByRole('button', { name: /Go to About/i });
    fireEvent.click(aboutButton);

    // Assert that `mockNavigate` was called once with the correct path
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  // Test Case 4: Rendering of the Users List section and individual user details
  test('renders the "Users List" section with all dummy user data', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Assert that the "Users List" heading is present
    expect(screen.getByRole('heading', { level: 2, name: /Users List/i })).toBeInTheDocument();

    // Define the dummy users from the component for verification
    const dummyUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
    ];

    // Assert that each user's details are rendered
    dummyUsers.forEach(user => {
      // Check for user's name
      expect(screen.getByRole('heading', { level: 3, name: user.name })).toBeInTheDocument();
      // Check for user's email
      expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
      // Check for user's role
      expect(screen.getByText(`Role: ${user.role}`)).toBeInTheDocument();
    });

    // Optionally, verify the total number of user cards to ensure no extra or missing cards
    const userNames = screen.getAllByRole('heading', { level: 3 });
    expect(userNames).toHaveLength(dummyUsers.length);
  });
});