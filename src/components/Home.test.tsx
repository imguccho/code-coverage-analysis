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
    
    fireEvent.click(productsButton);
    // Assuming there's a function to handle navigation, we can check if it was called
    // This requires a mock or spy on the navigation function if it's passed as a prop or context
    // expect(navigationFunction).toHaveBeenCalledWith('/products');

    fireEvent.click(aboutButton);
    // expect(navigationFunction).toHaveBeenCalledWith('/about');
  });

  test('displays loading state when data is being fetched', () => {
    // Mock a loading state in the Home component
    render(<Home />);
    
    // Assuming there's a loading indicator when data is being fetched
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when data fetch fails', () => {
    // Mock a failed data fetch
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.reject(new Error('Network Error'))
    );

    render(<Home />);
    
    // Assuming there's an error message displayed when fetch fails
    expect(screen.getByText('Failed to load data. Please try again later.')).toBeInTheDocument();
    
    // Clean up the mock
    global.fetch.mockRestore();
  });

  test('displays user data when fetch is successful', async () => {
    // Mock successful data fetch
    const mockData = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(<Home />);
    
    // Wait for the user data to be displayed
    const userElements = await screen.findAllByText(/John Doe|Jane Smith/i);
    expect(userElements.length).toBe(2);
    
    // Clean up the mock
    global.fetch.mockRestore();
  });

  test('handles empty user data gracefully', async () => {
    // Mock successful data fetch with empty array
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<Home />);
    
    // Wait for the component to finish rendering
    const noDataMessage = await screen.findByText('No user data available.');
    expect(noDataMessage).toBeInTheDocument();
    
    // Clean up the mock
    global.fetch.mockRestore();
  });
});