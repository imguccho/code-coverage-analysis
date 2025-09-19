import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
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
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('navigation buttons are clickable and trigger navigate calls', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');

    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/products');

    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  test('renders users section with title', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  test('renders all user cards with correct data', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Users' names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();

    // Emails
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: alice@example.com')).toBeInTheDocument();

    // Roles
    expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Role: User')).toHaveLength(2);
    expect(screen.getByText('Role: Moderator')).toBeInTheDocument();
  });

  test('renders correct number of user cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const userCards = screen.getAllByText(/Email:/);
    expect(userCards).toHaveLength(4);
  });

  test('each user card contains all required information', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check John Doe card
    const johnCard = screen.getByText('John Doe').closest('div');
    expect(johnCard).toHaveTextContent('john@example.com');
    expect(johnCard).toHaveTextContent('Admin');

    // Check Jane Smith card
    const janeCard = screen.getByText('Jane Smith').closest('div');
    expect(janeCard).toHaveTextContent('jane@example.com');
    expect(janeCard).toHaveTextContent('User');
  });

  test('component structure has correct class names for main sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const mainContainer = screen.getByText('Welcome to Our Application').closest('div');
    expect(mainContainer).toHaveClass('home-container');

    const navContainer = screen.getByText('Go to Products').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    const usersSection = screen.getByText('Users List').closest('div');
    expect(usersSection).toHaveClass('users-section');
  });
});