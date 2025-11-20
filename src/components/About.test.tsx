import React from 'react';
import { render, screen } from '@testing-library/react';
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

    // Experience levels should be shown
    expect(screen.getByText('Senior')).toBeInTheDocument();
    expect(screen.getByText('Mid-level')).toBeInTheDocument();
    expect(screen.getByText('Junior')).toBeInTheDocument();
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

    // Emily Davis should be Mid-level (8 years)
    const emilyCard = screen.getByText('Emily Davis').closest('div');
    expect(emilyCard).toHaveTextContent('Mid-level');

    // Lisa Thompson should be Junior (7 years)
    const lisaCard = screen.getByText('Lisa Thompson').closest('div');
    expect(lisaCard).toHaveTextContent('Junior');
  });
});
