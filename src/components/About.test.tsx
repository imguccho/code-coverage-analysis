import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Use userEvent for more realistic interactions
import { MemoryRouter } from 'react-router-dom';
import About from './About';

// Mock useNavigate from react-router-dom
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import and retain default behavior
  useNavigate: () => mockedUseNavigate, // Mock useNavigate
}));

describe('About Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test to ensure isolated tests
    mockedUseNavigate.mockClear();
  });

  // Test 1: Renders the main title, description, and the mission statement
  test('renders the main title, description, and mission statement', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Main title and description
    expect(screen.getByRole('heading', { level: 1, name: 'Title - This is About Our Company' })).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();

    // Mission statement section
    expect(screen.getByRole('heading', { level: 2, name: 'Our Mission' })).toBeInTheDocument();
    expect(screen.getByText(
      /We are dedicated to creating innovative solutions that help businesses grow and succeed/i
    )).toBeInTheDocument();
    expect(screen.getByText(
      /Our team of experienced professionals works tirelessly to deliver high-quality products/i
    )).toBeInTheDocument();
    expect(screen.getByText(
      /and services that exceed our clients' expectations./i
    )).toBeInTheDocument();
  });

  // Test 2: Navigation buttons functionality
  test('navigation buttons navigate to correct routes on click', async () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    const productsButton = screen.getByRole('button', { name: 'Go to Products' });

    expect(homeButton).toBeInTheDocument();
    expect(productsButton).toBeInTheDocument();

    // Simulate click on 'Go to Home' button and check navigation
    await userEvent.click(homeButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');

    // Simulate click on 'Go to Products' button and check navigation
    await userEvent.click(productsButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(2);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/products');
  });

  // Test 3: Renders company statistics section with all data fields
  test('renders company statistics section with all data', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Company Statistics' })).toBeInTheDocument();

    // Check all stat cards' value, label, and description
    const stats = [
      { value: '10+', label: 'Years in Business', description: 'Over a decade of experience' },
      { value: '50+', label: 'Team Members', description: 'Dedicated professionals' },
      { value: '200+', label: 'Projects Completed', description: 'Successful deliveries' },
      { value: '98%', label: 'Client Satisfaction', description: 'Happy customers' },
    ];

    stats.forEach(stat => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.description)).toBeInTheDocument();
    });
  });

  // Test 4: Renders team section with all members and verifies experience levels
  test('renders team section with all members and correct experience levels', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Our Team' })).toBeInTheDocument();

    // Define expected team member data for easier verification
    const expectedTeamMembers = [
      { name: 'Sarah Wilson', position: 'CEO', department: 'Executive', experience: 15, level: 'Senior' },
      { name: 'Mike Chen', position: 'CTO', department: 'Technology', experience: 12, level: 'Senior' },
      { name: 'Emily Davis', position: 'Design Lead', department: 'Design', experience: 8, level: 'Mid-level' },
      { name: 'David Rodriguez', position: 'Senior Developer', department: 'Engineering', experience: 10, level: 'Senior' }, // Boundary: exactly 10 years
      { name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', experience: 7, level: 'Mid-level' },
      { name: 'James Miller', position: 'Product Manager', department: 'Product', experience: 9, level: 'Mid-level' }, // Boundary: exactly 9 years (still mid-level)
    ];

    expectedTeamMembers.forEach(member => {
      const memberCard = screen.getByRole('heading', { name: member.name }).closest('.team-card');
      expect(memberCard).toBeInTheDocument();
      expect(memberCard).toHaveTextContent(member.position);
      expect(memberCard).toHaveTextContent(member.department);
      expect(memberCard).toHaveTextContent(`Experience: ${member.experience} years (${member.level})`);
    });
  });
});
