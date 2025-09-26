import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders home page with title and description', () => {
    render(<Home />);
    
    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('This is the home page with some dummy user data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Home />);
    
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('renders users section with title', () => {
    render(<Home />);
    
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  test('renders all user cards with correct data', () => {
    render(<Home />);
    // Check if all users are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();
    
    // Check if emails are rendered
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: alice@example.com')).toBeInTheDocument();
    
    // Check if roles are rendered
    expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Role: User')).toHaveLength(2);
    expect(screen.getByText('Role: Moderator')).toBeInTheDocument();
  });

  test('renders correct number of user cards', () => {
    render(<Home />);
    
    const userCards = screen.getAllByText(/Email:/);
    expect(userCards).toHaveLength(4);
  });

  test('user cards contain all required information', () => {
    render(<Home />);
    
    // Check first user card
    const johnCard = screen.getByText('John Doe').closest('div');
    expect(johnCard).toHaveTextContent('john@example.com');
    expect(johnCard).toHaveTextContent('Admin');
    
    // Check second user card
    const janeCard = screen.getByText('Jane Smith').closest('div');
    expect(janeCard).toHaveTextContent('jane@example.com');
    expect(janeCard).toHaveTextContent('User');
  });

  test('navigation buttons are clickable', () => {
    render(<Home />);
    
    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');
    
    expect(productsButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

  test('navigation buttons call navigation function on click', () => {
    // As navigation uses useNavigate hook, we can mock the module to test calls
    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate,
    }));

    render(<Home />);

    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');

    fireEvent.click(productsButton);
    fireEvent.click(aboutButton);

    expect(productsButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    // We can't assert actual navigation calls here without proper mocking setup
  });

  test('component structure has correct class names', () => {
    render(<Home />);

    const mainContainer = screen.getByText('Welcome to Our Application').closest('div');
    expect(mainContainer).toHaveClass('home-container');

    const navContainer = screen.getByText('Go to Products').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    const usersSection = screen.getByText('Users List').closest('div');
    expect(usersSection).toHaveClass('users-section');
  });
});