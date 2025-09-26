import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

// Mocking react-router-dom's useNavigate
import * as routerDom from 'react-router-dom';

const mockNavigate = jest.fn();
jest.spyOn(routerDom, 'useNavigate').mockImplementation(() => mockNavigate);

describe('About Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
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

  test('navigation buttons are clickable and call navigate', () => {
    render(<About />);

    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders company statistics section and all stats', () => {
    render(<About />);
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();

    // Check statistics values
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();

    // Labels
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();

    // Descriptions
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
  });

  test('renders team section with title and all members', () => {
    render(<About />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();

    // All team members
    ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('team member cards display correct information including experience levels', () => {
    render(<About />);

    // Sarah Wilson - Senior
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    // Mike Chen - Senior
    const mikeCard = screen.getByText('Mike Chen').closest('div');
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');

    // Emily Davis - Mid-level
    const emilyCard = screen.getByText('Emily Davis').closest('div');
    expect(emilyCard).toHaveTextContent('Design Lead');
    expect(emilyCard).toHaveTextContent('Design');
    expect(emilyCard).toHaveTextContent('Experience: 8 years (Mid-level)');

    // Check experience level labels mid and senior
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
  });

  test('renders company mission section and description', () => {
    render(<About />);

    expect(screen.getByText('Our Mission')).toBeInTheDocument();

    const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('statistics cards have correct structure and count', () => {
    render(<About />);

    const statCards = screen.getAllByText(/Years in Business|Team Members|Projects Completed|Client Satisfaction/);
    expect(statCards).toHaveLength(4);

    const values = screen.getAllByText(/10\+|50\+|200\+|98%/);
    values.forEach(value => {
      expect(value.closest('div')).toHaveClass('stat-card');
    });
  });

  test('team cards have correct structure and count', () => {
    render(<About />);

    const teamMembers = ['Sarah Wilson','Mike Chen','Emily Davis','David Rodriguez','Lisa Thompson','James Miller'];

    teamMembers.forEach(name => {
      const card = screen.getByText(name).closest('div');
      expect(card).toHaveClass('team-card');
    });

    // Also check count by querying all cards with class team-card
    const allTeamCards = screen.getAllByText(/Experience:/).map(exp => exp.closest('div'));
    expect(allTeamCards.length).toBe(6);
  });

  test('component key sections have correct class names', () => {
    render(<About />);

    // Main container: closest div containing title
    const mainContainer = screen.getByText('About Our Company').closest('div');
    expect(mainContainer).toHaveClass('about-container');

    // Navigation buttons container
    const navContainer = screen.getByText('Go to Home').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    // Company stats section
    const statsSection = screen.getByText('Company Statistics').closest('div');
    expect(statsSection).toHaveClass('company-stats');

    // Team section
    const teamSection = screen.getByText('Our Team').closest('div');
    expect(teamSection).toHaveClass('team-section');

    // Company description
    const descriptionSection = screen.getByText('Our Mission').closest('div');
    expect(descriptionSection).toHaveClass('company-description');
  });
});
