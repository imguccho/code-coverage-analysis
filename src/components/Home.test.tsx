import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {

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

    // Check all users are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();

    // Check user details are rendered
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Moderator')).toBeInTheDocument();
    expect(screen.getAllByText('User')).toHaveLength(2); // Jane and Alice are both User

    // Check email addresses
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  test('renders correct number of user cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const userCards = document.querySelectorAll('.user-card');
    expect(userCards).toHaveLength(4);
  });

  test('navigates to products page when "Go to Products" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const productsButton = screen.getAllByText('Go to Products')[0];
    fireEvent.click(productsButton);

    expect(mockNavigate).toHaveBeenCalledWith('/products');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('navigates to about page when "Go to About" button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const aboutButton = screen.getAllByText('Go to About')[0];
    fireEvent.click(aboutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/about');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('has correct container structure', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const container = document.querySelector('.home-container');
    expect(container).toBeInTheDocument();
  });

  test('handles navigation button clicks correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Test both navigation buttons
    const productsButtons = screen.getAllByText('Go to Products');
    const aboutButtons = screen.getAllByText('Go to About');

    expect(productsButtons).toHaveLength(2);
    expect(aboutButtons).toHaveLength(2);

    fireEvent.click(productsButtons[0]);
    fireEvent.click(aboutButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/products');
    expect(mockNavigate).toHaveBeenCalledWith('/about');
    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  test('renders without console errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
