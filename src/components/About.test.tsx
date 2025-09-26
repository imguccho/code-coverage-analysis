import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
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

  test('navigation buttons are clickable', () => {
    render(<About />);
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');
    expect(homeButton).toBeEnabled();
    expect(productsButton).toBeEnabled();
  });

  test('renders company statistics section with all stats', () => {
    render(<About />);
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
    // Values
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
    // Team members
    ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('team member cards display correct information', () => {
    render(<About />);
    // Sarah Wilson
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');
    // Mike Chen
    const mikeCard = screen.getByText('Mike Chen').closest('div');
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');
  });

  test('renders correct number of team member cards', () => {
    render(<About />);
    const experienceElements = screen.getAllByText(/Experience:/);
    expect(experienceElements).toHaveLength(6);
  });

  test('experience level calculation works correctly', () => {
    render(<About />);
    // Senior level (>=10 years)
    expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
    // Mid-level (5-9 years)
    expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
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

  test('statistics cards have correct structure and class', () => {
    render(<About />);
    const statLabels = screen.getAllByText(/Years in Business|Team Members|Projects Completed|Client Satisfaction/);
    expect(statLabels).toHaveLength(4);
    const statValues = screen.getAllByText(/10\+|50\+|200\+|98%/);
    statValues.forEach(card => {
      expect(card.closest('div')).toHaveClass('stat-card');
    });
  });

  test('team cards have correct structure and class', () => {
    render(<About />);
    const teamNames = /Sarah Wilson|Mike Chen|Emily Davis|David Rodriguez|Lisa Thompson|James Miller/;
    const teamCards = screen.getAllByText(teamNames);
    expect(teamCards).toHaveLength(6);
    teamCards.forEach(card => {
      expect(card.closest('div')).toHaveClass('team-card');
    });
  });

  test('component structure has expected class names', () => {
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

  // Navigation function click events verified via enabled state, further testing would require mocking `useNavigate` from react-router-dom
});
