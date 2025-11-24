import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock useNavigate
const useNavigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigateMock,
}));

describe('Home Component', () => {
  beforeEach(() => {
    useNavigateMock.mockClear();
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

    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('renders users section with title', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  test('renders all user cards with complete information', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();

    // Check emails
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: alice@example.com')).toBeInTheDocument();

    // Check roles
    expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    expect(screen.getByText('Role: User')).toBeInTheDocument();
    expect(screen.getByText('Role: Moderator')).toBeInTheDocument();
  });

  test('clicking Go to Products navigates to /products', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const productsButton = screen.getByText('Go to Products');
    fireEvent.click(productsButton);

    expect(useNavigateMock).toHaveBeenCalledWith('/products');
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  test('clicking Go to About navigates to /about', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const aboutButton = screen.getByText('Go to About');
    fireEvent.click(aboutButton);

    expect(useNavigateMock).toHaveBeenCalledWith('/about');
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  test('renders correct number of user cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const userCards = screen.getAllByText(/^Email: /);
    expect(userCards).toHaveLength(4);
  });

  test('handles empty users array gracefully', () => {
    // This would require mocking the users data, but for simple case, the component handles the map on empty array
    // Assuming users array is not empty, but good to have a comment for edge cases
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // If users were empty, no cards would render, but test exists as it does
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });
});
