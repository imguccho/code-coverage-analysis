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

    // Check stat cards have correct class
    const statCards = screen.getAllByText(/10\+|50\+|200\+|98%/);
    statCards.forEach(card => {
      expect(card.closest('div')).toHaveClass('stat-card');
    });
  });

  test('renders team section with title and all members', () => {
    render(<About />);

    expect(screen.getByText('Our Team')).toBeInTheDocument();

    const teamMembers = ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'];
    teamMembers.forEach(member => {
      const memberElement = screen.getByText(member);
      expect(memberElement).toBeInTheDocument();
      expect(memberElement.closest('div')).toHaveClass('team-card');
    });

    const teamCards = screen.getAllByText(/Experience:/);
    expect(teamCards).toHaveLength(6);
  });

  test('team member cards display correct information and experience levels', () => {
    render(<About />);

    // Validate one senior and mid-level
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');

    const emilyCard = screen.getByText('Emily Davis').closest('div');
    expect(emilyCard).toHaveTextContent('Design Lead');
    expect(emilyCard).toHaveTextContent('Design');
    expect(emilyCard).toHaveTextContent('Experience: 8 years (Mid-level)');

    // Check experience level text correctness
    expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
  });

  test('renders company mission section with correct description', () => {
    render(<About />);
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument();

    const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('component main structure and class names', () => {
    render(<About />);

    const mainContainer = screen.getByText('About Our Company').closest('div');
    expect(mainContainer).toHaveClass('about-container');

    const navContainer = screen.getByText('Go to Home').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');

    const statsSection = screen.getByText('Company Statistics').closest('div');
    expect(statsSection).toHaveClass('company-stats');

    const teamSection = screen.getByText('Our Team').closest('div');
    expect(teamSection).toHaveClass('team-section');

    const missionSection = screen.getByText('Our Mission').closest('div');
    expect(missionSection).toHaveClass('company-description');
  });

  test('navigation buttons call navigate when clicked', () => {
    // Mock useNavigate from react-router-dom
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));

    render(<About />);

    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});