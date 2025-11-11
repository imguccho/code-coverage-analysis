import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders home page with title and description', () => {
    render(<Home />);

    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('This is the home page with some dummy user data.')).toBeInTheDocument();
  });

  test('navigation buttons are clickable', () => {
    render(<Home />);
    
    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');
    
    expect(productsButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

}); 