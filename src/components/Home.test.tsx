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

  test('renders all users with correct information', () => {
    render(<Home />);

    // Check user names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();

    // Check emails (uncovered lines)
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: alice@example.com')).toBeInTheDocument();

    // Check roles - check that Admin appears and Moderator appears
    expect(screen.getByText('Role: Admin')).toBeInTheDocument();
    expect(screen.getByText('Role: Moderator')).toBeInTheDocument();

    // Check that there are exactly 2 users with "Role: User" (Jane and Alice)
    const userRoles = screen.getAllByText('Role: User');
    expect(userRoles).toHaveLength(2);
  });

  test('navigation buttons are clickable', () => {
    render(<Home />);
    
    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');
    
    expect(productsButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

});
