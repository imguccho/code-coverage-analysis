import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual for other exports like MemoryRouter
  useNavigate: () => mockNavigate,
}));

describe('About Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test to ensure isolated tests
    mockNavigate.mockClear();
  });

  test('renders all static content, titles, and sections correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Main title and description
    expect(screen.getByText('Title - This is About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();

    // Navigation buttons
    expect(screen.getByRole('button', { name: /Go to Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to Products/i })).toBeInTheDocument();

    // Company Statistics section
    expect(screen.getByRole('heading', { name: /Company Statistics/i, level: 2 })).toBeInTheDocument();

    // Our Team section
    expect(screen.getByRole('heading', { name: /Our Team/i, level: 2 })).toBeInTheDocument();

    // Our Mission section
    expect(screen.getByRole('heading', { name: /Our Mission/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/We are dedicated to creating innovative solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Our team of experienced professionals works tirelessly/i)).toBeInTheDocument();
  });

  test('renders all company statistics correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Verify each company statistic is rendered
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

  test('renders all team members with correct experience levels', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Team members and their details
    // Sarah Wilson (15 years) -> Senior
    const sarahCard = screen.getByText('Sarah Wilson').closest('.team-card');
    expect(sarahCard).toBeInTheDocument();
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    // Mike Chen (12 years) -> Senior
    const mikeCard = screen.getByText('Mike Chen').closest('.team-card');
    expect(mikeCard).toBeInTheDocument();
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');

    // Emily Davis (8 years) -> Mid-level
    const emilyCard = screen.getByText('Emily Davis').closest('.team-card');
    expect(emilyCard).toBeInTheDocument();
    expect(emilyCard).toHaveTextContent('Design Lead');
    expect(emilyCard).toHaveTextContent('Design');
    expect(emilyCard).toHaveTextContent('Experience: 8 years (Mid-level)');

    // David Rodriguez (10 years) -> Senior
    const davidCard = screen.getByText('David Rodriguez').closest('.team-card');
    expect(davidCard).toBeInTheDocument();
    expect(davidCard).toHaveTextContent('Senior Developer');
    expect(davidCard).toHaveTextContent('Engineering');
    expect(davidCard).toHaveTextContent('Experience: 10 years (Senior)');

    // Lisa Thompson (7 years) -> Mid-level (FIXED: was incorrectly 'Junior' in original test)
    const lisaCard = screen.getByText('Lisa Thompson').closest('.team-card');
    expect(lisaCard).toBeInTheDocument();
    expect(lisaCard).toHaveTextContent('Marketing Manager');
    expect(lisaCard).toHaveTextContent('Marketing');
    expect(lisaCard).toHaveTextContent('Experience: 7 years (Mid-level)');

    // James Miller (9 years) -> Mid-level
    const jamesCard = screen.getByText('James Miller').closest('.team-card');
    expect(jamesCard).toBeInTheDocument();
    expect(jamesCard).toHaveTextContent('Product Manager');
    expect(jamesCard).toHaveTextContent('Product');
    expect(jamesCard).toHaveTextContent('Experience: 9 years (Mid-level)');
  });

  test('navigation buttons call useNavigate with correct paths', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('button', { name: /Go to Home/i });
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    const productsButton = screen.getByRole('button', { name: /Go to Products/i });
    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
