import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual for other exports
  useNavigate: () => mockNavigate, // Mock useNavigate
}));

describe('Home Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test to ensure isolation
    mockNavigate.mockClear();
  });

  test('renders home page with title and description', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('This is the home page with some dummy user data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /go to products/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to about/i })).toBeInTheDocument();
  });

  test('renders users section with title and all user details', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Users List')).toBeInTheDocument();

    // Check for each user's details
    expect(screen.getByRole('heading', { name: 'John Doe', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: Admin')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Jane Smith', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: User')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Bob Johnson', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Email: bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: Moderator')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Alice Brown', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Email: alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: User')).toBeInTheDocument();
  });

  test('navigates to /products when "Go to Products" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const productsButton = screen.getByRole('button', { name: /go to products/i });
    fireEvent.click(productsButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  test('navigates to /about when "Go to About" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const aboutButton = screen.getByRole('button', { name: /go to about/i });
    fireEvent.click(aboutButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
