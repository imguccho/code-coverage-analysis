import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

// Mock useNavigate from react-router-dom
import * as router from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate);
  mockedUsedNavigate.mockClear();
});

describe('About Component', () => {
  test('renders about page with title and description', () => {
    render(<About />);
    expect(screen.getByText('About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons and are clickable', () => {
    render(<About />);
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    expect(homeButton).toBeInTheDocument();
    expect(productsButton).toBeInTheDocument();

    expect(homeButton).toBeEnabled();
    expect(productsButton).toBeEnabled();

    fireEvent.click(homeButton);
    fireEvent.click(productsButton);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders company statistics section with all stats', () => {
    render(<About />);
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();

    // Check statistics values
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();

    // Check statistics labels
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();

    // Check statistics descriptions
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();

    const statCards = screen.getAllByText(/Years in Business|Team Members|Projects Completed|Client Satisfaction/);
    expect(statCards.length).toBe(4);

    const statCardElements = screen.getAllByText(/10\+|50\+|200\+|98%/);
    statCardElements.forEach(card => {
      expect(card.closest('div')).toHaveClass('stat-card');
    });
  });

  test('renders team section with title and all team members', () => {
    render(<About />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();

    const teamMembers = [
      'Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'
    ];

    teamMembers.forEach(name => {
      const member = screen.getByText(name);
      expect(member).toBeInTheDocument();
      expect(member.closest('div')).toHaveClass('team-card');
    });

    expect(screen.getAllByText(/Experience:/)).toHaveLength(6);
  });

  test('team member cards display correct information including experience level', () => {
    render(<About />);

    // Check Sarah Wilson's card
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    // Check Mike Chen's card
    const mikeCard = screen.getByText('Mike Chen').closest('div');
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');

    // Check other levels
    expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
  });

  test('renders company mission section and description correctly', () => {
    render(<About />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();

    const missionDesc = screen.getByText(/We are dedicated to creating innovative solutions that help businesses grow and succeed./);
    expect(missionDesc).toBeInTheDocument();
    expect(missionDesc).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('component structure is correct', () => {
    render(<About />);

    // Check main container
    const mainContainer = screen.getByText('About Our Company').closest('div');
    expect(mainContainer).toHaveClass('about-container');

    // Check navigation buttons container
    const navContainer = screen.getByText('Go to Home').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    // Check company stats section
    const statsSection = screen.getByText('Company Statistics').closest('div');
    expect(statsSection).toHaveClass('company-stats');

    // Check team section
    const teamSection = screen.getByText('Our Team').closest('div');
    expect(teamSection).toHaveClass('team-section');

    // Check company description
    const descriptionSection = screen.getByText('Our Mission').closest('div');
    expect(descriptionSection).toHaveClass('company-description');
  });
});