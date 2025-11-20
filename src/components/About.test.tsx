import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

import About from './About';

describe('About Component', () => {
  test('renders about page with title and description', () => {
    render(<About />);

    expect(screen.getByText('Title - This is About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<About />);

    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
  });

  test('renders company statistics section', () => {
    render(<About />);

    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  test('renders all company statistics', () => {
    render(<About />);

    // Check statistic values
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();

    // Check statistic labels
    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();

    // Check descriptions (these were uncovered)
    expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
    expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
    expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
  });

  test('renders all team members', () => {
    render(<About />);

    // Check team member names
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
    expect(screen.getByText('James Miller')).toBeInTheDocument();

    // Check positions
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('Design Lead')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();

    // Check departments (this was uncovered)
    expect(screen.getByText('Executive')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  test('displays experience levels correctly', () => {
    render(<About />);

    // Check experience text (this was uncovered)
    expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
    expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
  });

  test('navigation buttons are clickable', () => {
    render(<About />);

    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    expect(homeButton).toBeEnabled();
    expect(productsButton).toBeEnabled();
  });
});
