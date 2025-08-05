import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders home page by default', () => {
    render(<App />);
    
    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('This is the home page with some dummy user data.')).toBeInTheDocument();
  });

  test('renders navigation buttons on home page', () => {
    render(<App />);
    
    expect(screen.getAllByText('Go to Products')).toHaveLength(2);
    expect(screen.getAllByText('Go to About')).toHaveLength(2);
  });

  test('renders users list on home page', () => {
    render(<App />);
    
    expect(screen.getByText('Users List')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('app has correct structure', () => {
    render(<App />);
    
    const appElement = screen.getByText('Welcome to Our Application').closest('.App');
    expect(appElement).toBeInTheDocument();
  });
});
