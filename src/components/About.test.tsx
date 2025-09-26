import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

// Mock useNavigate to avoid actual navigation and track calls
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('About Component', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  test('renders about page with title and description', () => {
    render(<About />);
    expect(screen.getByText('About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<About />);
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
  });

  test('navigation buttons are clickable and trigger navigation', () => {
    render(<About />);
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');
    fireEvent.click(homeButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    fireEvent.click(productsButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders company statistics section with all statistics', () => {
    render(<About />);
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
    // Check all stats values
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();

    // Check all stats labels
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();

    // Check all descriptions
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
  });

  test('renders team section title', () => {
    render(<About />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  test('renders all team members with full details and correct experience levels', () => {
    render(<About />);

    const members = [
      { name: 'Sarah Wilson', position: 'CEO', department: 'Executive', experience: 15, level: 'Senior' },
      { name: 'Mike Chen', position: 'CTO', department: 'Technology', experience: 12, level: 'Senior' },
      { name: 'Emily Davis', position: 'Design Lead', department: 'Design', experience: 8, level: 'Mid-level' },
      { name: 'David Rodriguez', position: 'Senior Developer', department: 'Engineering', experience: 10, level: 'Senior' },
      { name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', experience: 7, level: 'Mid-level' },
      { name: 'James Miller', position: 'Product Manager', department: 'Product', experience: 9, level: 'Mid-level' }
    ];

    members.forEach(({ name, position, department, experience, level }) => {
      const card = screen.getByText(name).closest('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(position);
      expect(card).toHaveTextContent(department);
      expect(card).toHaveTextContent(`Experience: ${experience} years (${level})`);
    });

    // Check total number of team members is 6
    const teamCards = screen.getAllByText(/Experience:/);
    expect(teamCards).toHaveLength(6);
  });

  test('renders company mission section and its full description', () => {
    render(<About />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('stats and team cards have correct CSS classes', () => {
    render(<About />);

    // Check stats cards
    const stats = ['Years in Business', 'Team Members', 'Projects Completed', 'Client Satisfaction'];
    stats.forEach(label => {
      const statCard = screen.getByText(label).closest('div.stat-card');
      expect(statCard).toBeInTheDocument();
    });

    // Check team cards
    const teamMemberNames = ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'];
    teamMemberNames.forEach(name => {
      const teamCard = screen.getByText(name).closest('div.team-card');
      expect(teamCard).toBeInTheDocument();
    });
  });

  test('component structure contains main container and key sections with correct classes', () => {
    render(<About />);

    const mainContainer = screen.getByText('About Our Company').closest('div');
    expect(mainContainer).toHaveClass('about-container');

    const navContainer = screen.getByText('Go to Home').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    const statsSection = screen.getByText('Company Statistics').closest('div');
    expect(statsSection).toHaveClass('company-stats');

    const teamSection = screen.getByText('Our Team').closest('div');
    expect(teamSection).toHaveClass('team-section');

    const descriptionSection = screen.getByText('Our Mission').closest('div');
    expect(descriptionSection).toHaveClass('company-description');
  });
});
