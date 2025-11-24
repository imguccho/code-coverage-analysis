import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

// Mock useNavigate
const useNavigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigateMock,
}));

describe('About Component', () => {
  beforeEach(() => {
    useNavigateMock.mockClear();
  });

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

  test('renders all company statistics with details', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();

    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();

    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();

    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
  });

  test('renders all team members with complete information', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Names
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
    expect(screen.getByText('James Miller')).toBeInTheDocument();

    // Positions
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('Design Lead')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();

    // Departments
    expect(screen.getByText('Executive')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  test('renders all team members with experience levels', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Experience levels should be shown
    expect(screen.getAllByText('Senior')).toHaveLength(3);
    expect(screen.getAllByText('Mid-level')).toHaveLength(3);
  });

  test('getExperienceLevel function works correctly', () => {
    // Test that would cover the utility function - since it's used in rendering,
    // we can indirectly test it by checking the rendered output
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Sarah Wilson should be Senior (15 years)
    const sarahCard = screen.getByText('Sarah Wilson').closest('.team-card');
    expect(sarahCard).toHaveTextContent('Senior');

    // Mike Chen should be Senior (12 years)
    const mikeCard = screen.getByText('Mike Chen').closest('.team-card');
    expect(mikeCard).toHaveTextContent('Senior');

    // Emily Davis should be Mid-level (8 years)
    const emilyCard = screen.getByText('Emily Davis').closest('.team-card');
    expect(emilyCard).toHaveTextContent('Mid-level');

    // Lisa Thompson should be Mid-level (7 years)
    const lisaCard = screen.getByText('Lisa Thompson').closest('.team-card');
    expect(lisaCard).toHaveTextContent('Mid-level');

    // James Miller should be Mid-level (9 years)
    const jamesCard = screen.getByText('James Miller').closest('.team-card');
    expect(jamesCard).toHaveTextContent('Mid-level');
  });

  test('clicking Go to Home navigates to /', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);

    expect(useNavigateMock).toHaveBeenCalledWith('/');
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  test('clicking Go to Products navigates to /products', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const productsButton = screen.getByText('Go to Products');
    fireEvent.click(productsButton);

    expect(useNavigateMock).toHaveBeenCalledWith('/products');
    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });

  test('renders mission section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText(/innovative solutions/)).toBeInTheDocument();
  });
});
