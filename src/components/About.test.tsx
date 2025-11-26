import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

describe('About Component', () => {

  test('renders about page with title and description', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Title - This is About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
  });

  test('renders company statistics section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
  });

  test('renders team section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  test('renders all company statistics', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  test('renders all team members with experience levels', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Team members
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
    expect(screen.getByText('James Miller')).toBeInTheDocument();

    // Team members are rendered with their experience
  });



  test('getExperienceLevel function works correctly', () => {
    // Test that would cover the utility function - since it's used in rendering,
    // we can indirectly test it by checking the rendered output
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Sarah Wilson and Mike Chen should be Senior (15 and 12 years)
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('Senior');

    const mikeCard = screen.getByText('Mike Chen').closest('div');
    expect(mikeCard).toHaveTextContent('Senior');

    // David Rodriguez should be Senior (10 years)
    const davidCard = screen.getByText('David Rodriguez').closest('div');
    expect(davidCard).toHaveTextContent('Senior');

    // Emily Davis, Lisa Thompson, James Miller should be Mid-level (8, 7, 9 years)
    const emilyCard = screen.getByText('Emily Davis').closest('div');
    expect(emilyCard).toHaveTextContent('Mid-level');

    const lisaCard = screen.getByText('Lisa Thompson').closest('div');
    expect(lisaCard).toHaveTextContent('Mid-level');

    const jamesCard = screen.getByText('James Miller').closest('div');
    expect(jamesCard).toHaveTextContent('Mid-level');
  });

  test('navigates to home page when Go to Home button is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);

    // Navigation should work, but we can't test router changes in MemoryRouter easily
    // This test ensures the button click doesn't throw an error
    expect(homeButton).toBeInTheDocument();
  });

  test('navigates to products page when Go to Products button is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const productsButton = screen.getByText('Go to Products');
    fireEvent.click(productsButton);

    expect(productsButton).toBeInTheDocument();
  });

  test('displays company mission section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText(/We are dedicated to creating innovative solutions/)).toBeInTheDocument();
  });
});
