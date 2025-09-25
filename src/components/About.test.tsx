import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('About Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
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

  test('navigation buttons are clickable and call navigate correctly', () => {
    render(<About />);
    
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(productsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders company statistics section', () => {
    render(<About />);
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
  });

  test('renders all company statistics', () => {
    render(<About />);
    // Check values
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    // Check labels
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    // Check descriptions
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
  });

  test('renders team section with title', () => {
    render(<About />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  test('renders all team members with correct data', () => {
    render(<About />);
    const members = ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'];
    members.forEach(name => {
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

  test('renders correct number of team members', () => {
    render(<About />);
    const experienceElems = screen.getAllByText(/Experience:/);
    expect(experienceElems).toHaveLength(6);
  });

  test('experience level calculation works correctly', () => {
    render(<About />);
    // Senior
    expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
    // Mid-level
    expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
  });

  test('renders company mission section', () => {
    render(<About />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  test('renders company mission description with full text', () => {
    render(<About />);
    const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('statistics cards have correct structure and classes', () => {
    render(<About />);
    const statLabels = screen.getAllByText(/Years in Business|Team Members|Projects Completed|Client Satisfaction/);
    expect(statLabels).toHaveLength(4);
    const statValues = screen.getAllByText(/10\+|50\+|200\+|98%/);
    statValues.forEach(val => {
      expect(val.closest('div')).toHaveClass('stat-card');
    });
  });

  test('team cards have correct structure and classes', () => {
    render(<About />);
    const teamMemberElements = screen.getAllByText(/Sarah Wilson|Mike Chen|Emily Davis|David Rodriguez|Lisa Thompson|James Miller/);
    expect(teamMemberElements).toHaveLength(6);
    teamMemberElements.forEach(el => {
      expect(el.closest('div')).toHaveClass('team-card');
    });
  });

  test('component structure is correct for main sections', () => {
    render(<About />);
    expect(screen.getByText('About Our Company').closest('div')).toHaveClass('about-container');
    expect(screen.getByText('Go to Home').closest('div')).toHaveClass('navigation-buttons');
    expect(screen.getByText('Company Statistics').closest('div')).toHaveClass('company-stats');
    expect(screen.getByText('Our Team').closest('div')).toHaveClass('team-section');
    expect(screen.getByText('Our Mission').closest('div')).toHaveClass('company-description');
  });
});