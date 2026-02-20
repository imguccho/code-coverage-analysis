import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual for other exports like MemoryRouter
  useNavigate: () => mockNavigate, // Mock useNavigate
}));

describe('About Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test to ensure isolation
    mockNavigate.mockClear();
  });

  test('renders the About page with main sections and mission statement', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Main title and description
    expect(screen.getByRole('heading', { level: 1, name: 'Title - This is About Our Company' })).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();

    // Navigation buttons (presence check)
    expect(screen.getByRole('button', { name: 'Go to Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to Products' })).toBeInTheDocument();

    // Company Statistics section
    expect(screen.getByRole('heading', { level: 2, name: 'Company Statistics' })).toBeInTheDocument();

    // Our Team section
    expect(screen.getByRole('heading', { level: 2, name: 'Our Team' })).toBeInTheDocument();

    // Our Mission section
    expect(screen.getByRole('heading', { level: 2, name: 'Our Mission' })).toBeInTheDocument();
    expect(screen.getByText(/We are dedicated to creating innovative solutions/i)).toBeInTheDocument();
  });

  test('navigates to home page when "Go to Home" button is clicked', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to products page when "Go to Products" button is clicked', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const productsButton = screen.getByRole('button', { name: 'Go to Products' });
    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders all company statistics correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Check each statistic card content by label, value, and description
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

  test('renders all team members with their correct details and experience levels', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Test Sarah Wilson (15 years -> Senior)
    const sarahWilson = screen.getByRole('heading', { name: 'Sarah Wilson' });
    expect(sarahWilson).toBeInTheDocument();
    const sarahCard = sarahWilson.closest('.team-card');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    // Test Mike Chen (12 years -> Senior)
    const mikeChen = screen.getByRole('heading', { name: 'Mike Chen' });
    expect(mikeChen).toBeInTheDocument();
    const mikeCard = mikeChen.closest('.team-card');
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');

    // Test Emily Davis (8 years -> Mid-level)
    const emilyDavis = screen.getByRole('heading', { name: 'Emily Davis' });
    expect(emilyDavis).toBeInTheDocument();
    const emilyCard = emilyDavis.closest('.team-card');
    expect(emilyCard).toHaveTextContent('Design Lead');
    expect(emilyCard).toHaveTextContent('Design');
    expect(emilyCard).toHaveTextContent('Experience: 8 years (Mid-level)');

    // Test David Rodriguez (10 years -> Senior - boundary case for >=10)
    const davidRodriguez = screen.getByRole('heading', { name: 'David Rodriguez' });
    expect(davidRodriguez).toBeInTheDocument();
    const davidCard = davidRodriguez.closest('.team-card');
    expect(davidCard).toHaveTextContent('Senior Developer');
    expect(davidCard).toHaveTextContent('Engineering');
    expect(davidCard).toHaveTextContent('Experience: 10 years (Senior)');

    // Test Lisa Thompson (7 years -> Mid-level)
    const lisaThompson = screen.getByRole('heading', { name: 'Lisa Thompson' });
    expect(lisaThompson).toBeInTheDocument();
    const lisaCard = lisaThompson.closest('.team-card');
    expect(lisaCard).toHaveTextContent('Marketing Manager');
    expect(lisaCard).toHaveTextContent('Marketing');
    expect(lisaCard).toHaveTextContent('Experience: 7 years (Mid-level)');

    // Test James Miller (9 years -> Mid-level - boundary case for >=5)
    const jamesMiller = screen.getByRole('heading', { name: 'James Miller' });
    expect(jamesMiller).toBeInTheDocument();
    const jamesCard = jamesMiller.closest('.team-card');
    expect(jamesCard).toHaveTextContent('Product Manager');
    expect(jamesCard).toHaveTextContent('Product');
    expect(jamesCard).toHaveTextContent('Experience: 9 years (Mid-level)');
  });
});
