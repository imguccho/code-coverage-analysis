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

    // fireEvent.click(homeButton);  // Navigation side effect not testable here
    // fireEvent.click(productsButton);
  });

  test('renders company statistics section and all stats', () => {
    render(<About />);
    
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();

    // Values
    ['10+', '50+', '200+', '98%'].forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });

    // Labels
    ['Years in Business', 'Team Members', 'Projects Completed', 'Client Satisfaction'].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    // Descriptions
    ['Over a decade of experience', 'Dedicated professionals', 'Successful deliveries', 'Happy customers'].forEach(desc => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  test('statistics cards have correct class', () => {
    render(<About />);

    ['10+', '50+', '200+', '98%'].forEach(value => {
      const statCard = screen.getByText(value).closest('div');
      expect(statCard).toHaveClass('stat-card');
    });
  });

  test('renders team section with title and all members', () => {
    render(<About />);

    expect(screen.getByText('Our Team')).toBeInTheDocument();

    const teamMembers = ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'];
    teamMembers.forEach(member => {
      expect(screen.getByText(member)).toBeInTheDocument();
    });
  });

  test('renders correct number of team members', () => {
    render(<About />);

    const teamCards = screen.getAllByText(/Experience:/);
    expect(teamCards).toHaveLength(6);
  });

  test('team cards have correct class', () => {
    render(<About />);

    const teamMembers = ['Sarah Wilson', 'Mike Chen', 'Emily Davis', 'David Rodriguez', 'Lisa Thompson', 'James Miller'];
    teamMembers.forEach(member => {
      const teamCard = screen.getByText(member).closest('div');
      expect(teamCard).toHaveClass('team-card');
    });
  });

  test('team member cards display correct information including experience levels', () => {
    render(<About />);
    
    const teamExpLevels = [
      {name: 'Sarah Wilson', position: 'CEO', department: 'Executive', exp: 15, level: 'Senior'},
      {name: 'Mike Chen', position: 'CTO', department: 'Technology', exp: 12, level: 'Senior'},
      {name: 'Emily Davis', position: 'Design Lead', department: 'Design', exp: 8, level: 'Mid-level'},
      {name: 'David Rodriguez', position: 'Senior Developer', department: 'Engineering', exp: 10, level: 'Senior'},
      {name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', exp: 7, level: 'Mid-level'},
      {name: 'James Miller', position: 'Product Manager', department: 'Product', exp: 9, level: 'Mid-level'}
    ];

    teamExpLevels.forEach(({name, position, department, exp, level}) => {
      const teamCard = screen.getByText(name).closest('div');
      expect(teamCard).toHaveTextContent(position);
      expect(teamCard).toHaveTextContent(department);
      expect(teamCard).toHaveTextContent(`Experience: ${exp} years (${level})`);
    });
  });

  test('experience level calculation works correctly for edge cases', () => {
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

  test('renders company mission section with descriptive text', () => {
    render(<About />);

    expect(screen.getByText('Our Mission')).toBeInTheDocument();

    const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
    );
  });

  test('component structure is correct with proper classes', () => {
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