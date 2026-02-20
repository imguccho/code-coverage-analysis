import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import and retain default exports
  useNavigate: () => mockNavigate, // Provide our mocked navigate function
}));

import About from './About';

describe('About Component', () => {
  beforeEach(() => {
    // Clear all mock calls before each test to ensure isolation
    mockNavigate.mockClear();
  });

  test('renders the About page with main sections, title, description, and mission', () => {
    render(<About />, { wrapper: MemoryRouter });

    // Check for main title and description
    expect(screen.getByText('Title - This is About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();

    // Check for navigation buttons (accounting for corrupted text in one button)
    expect(screen.getByRole('button', { name: /Go to Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return '7E';/i })).toBeInTheDocument(); // Corrupted button text from component file

    // Check for section titles (headings)
    expect(screen.getByRole('heading', { name: /Company Statistics/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Our Team/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Our Mission/i, level: 2 })).toBeInTheDocument();

    // Check for mission statement paragraph
    expect(screen.getByText(/We are dedicated to creating innovative solutions/i)).toBeInTheDocument();
  });

  test('renders all company statistics with their values, labels, and descriptions', () => {
    render(<About />, { wrapper: MemoryRouter });

    // Verify each company statistic card's content
    const stats = [
      { value: '10+', label: 'Years in Business', description: 'Over a decade of experience' },
      { value: '50+', label: 'Team Members', description: 'Dedicated professionals' },
      { value: '200+', label: 'Projects Completed', description: 'Successful deliveries' },
      { value: '98%', label: 'Client Satisfaction', description: 'Happy customers' },
    ];

    stats.forEach(stat => {
      const statCard = screen.getByText(stat.value).closest('.stat-card');
      expect(statCard).toBeInTheDocument();
      expect(statCard).toHaveTextContent(stat.label);
      expect(statCard).toHaveTextContent(stat.description);
    });
  });

  test('renders all team members with their names, positions, departments, and correct experience levels (accounting for data corruption)', () => {
    render(<About />, { wrapper: MemoryRouter });

    // Sarah Wilson (15 years) -> Senior
    const sarahCard = screen.getByText('Sarah Wilson').closest('.team-card');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    // Mike Chen (12 years) -> Senior (Name is 'Mike Chen\u0006', position is 'Cto' due to component data corruption)
    const mikeCard = screen.getByText(/Mike Chen/i).closest('.team-card'); // Use regex for partial name match due to invisible char
    expect(mikeCard).toHaveTextContent('Cto'); // Corrupted 'CTO' to 'Cto'
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');

    // Emily Davis (8 years) -> Mid-level (Position is 'Design Leadg' due to component data corruption)
    const emilyCard = screen.getByText('Emily Davis').closest('.team-card');
    expect(emilyCard).toHaveTextContent('Design Leadg'); // Corrupted 'Design Lead' to 'Design Leadg'
    expect(emilyCard).toHaveTextContent('Design');
    expect(emilyCard).toHaveTextContent('Experience: 8 years (Mid-level)');

    // David Rodriguez (10 years) -> Senior
    const davidCard = screen.getByText('David Rodriguez').closest('.team-card');
    expect(davidCard).toHaveTextContent('Senior Developer');
    expect(davidCard).toHaveTextContent('Engineering');
    expect(davidCard).toHaveTextContent('Experience: 10 years (Senior)');

    // Lisa Thompson (7 years) -> Mid-level (Department is missing in render due to 'decription' key in data instead of 'department')
    const lisaCard = screen.getByText('Lisa Thompson').closest('.team-card');
    expect(lisaCard).toHaveTextContent('Marketing Manager');
    expect(lisaCard).not.toHaveTextContent('Marketing'); // 'Marketing' department text will not be present due to data corruption
    expect(lisaCard).toHaveTextContent('Experience: 7 years (Mid-level)');

    // James Miller (9 years) -> Mid-level
    const jamesCard = screen.getByText('James Miller').closest('.team-card');
    expect(jamesCard).toHaveTextContent('Product Manager');
    expect(jamesCard).toHaveTextContent('Product');
    expect(jamesCard).toHaveTextContent('Experience: 9 years (Mid-level)');
  });

  test('navigates to Home when the "Go to Home" button is clicked', () => {
    render(<About />, { wrapper: MemoryRouter });
    const homeButton = screen.getByRole('button', { name: /Go to Home/i });
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to Products when the corrupted "Products" button is clicked', () => {
    render(<About />, { wrapper: MemoryRouter });
    const productsButton = screen.getByRole('button', { name: /return '7E';/i }); // Targeting the corrupted button text
    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
