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

  // Since navigation uses useNavigate hook, we mock it and check if called on click
  test('navigation functions are called when buttons are clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<About />);
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    fireEvent.click(homeButton);
    fireEvent.click(productsButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders company statistics section and all statistics items', () => {
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
  });

  test('statistics cards have correct class', () => {
    render(<About />);
    const statValues = screen.getAllByText(/10\+|50\+|200\+|98%/);
    statValues.forEach(card => {
      expect(card.closest('div')).toHaveClass('stat-card');
    });
  });

  test('renders team section with title', () => {
    render(<About />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  test('renders all team members with correct data', () => {
    render(<About />);
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
    expect(screen.getByText('James Miller')).toBeInTheDocument();
  });

  test('renders correct number of team members', () => {
    render(<About />);
    const teamCards = screen.getAllByText(/Experience:/);
    expect(teamCards).toHaveLength(6);
  });

  test('team member cards display correct information', () => {
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
  });

  test('team cards have correct class', () => {
    render(<About />);
    const teamCards = screen.getAllByText(/Sarah Wilson|Mike Chen|Emily Davis|David Rodriguez|Lisa Thompson|James Miller/);
    teamCards.forEach(card => {
      expect(card.closest('div')).toHaveClass('team-card');
    });
  });

  test('experience level calculation works correctly', () => {
    render(<About />);

    // Senior level (10+ years)
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
    expect(screen.getByText(/We are dedicated to creating innovative solutions/)).toBeInTheDocument();
  });

  test('component structure has correct class names', () => {
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