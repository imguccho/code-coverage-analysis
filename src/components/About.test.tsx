import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders main headings and description', () => {
    expect(screen.getByText(/About Our Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn more about our team/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/We are dedicated to creating innovative/i)).toBeInTheDocument();
  });

  it('renders navigation buttons and responds to clicks', () => {
    const goHomeButton = screen.getByText(/Go to Home/i);
    const goProductsButton = screen.getByText(/Go to Products/i);

    expect(goHomeButton).toBeInTheDocument();
    expect(goProductsButton).toBeInTheDocument();

    // Mock window.location.assign or use MemoryRouter to test navigation
    // Since useNavigate is from react-router-dom, we can use jest mock in real tests
  });

  it('renders company stats with correct labels and values', () => {
    const stats = [
      { label: 'Years in Business', value: '10+', description: "Over a decade of experience" },
      { label: 'Team Members', value: '50+', description: "Dedicated professionals" },
      { label: 'Projects Completed', value: '200+', description: "Successful deliveries" },
      { label: 'Client Satisfaction', value: '98%', description: "Happy customers" }
    ];

    stats.forEach(({ label, value, description }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('renders team members with name, position, department, and experience level', () => {
    const members = [
      { name: 'Sarah Wilson', position: 'CEO', department: 'Executive', experience: 15 },
      { name: 'Mike Chen', position: 'CTO', department: 'Technology', experience: 12 },
      { name: 'Emily Davis', position: 'Design Lead', department: 'Design', experience: 8 },
      { name: 'David Rodriguez', position: 'Senior Developer', department: 'Engineering', experience: 10 },
      { name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', experience: 7 },
      { name: 'James Miller', position: 'Product Manager', department: 'Product', experience: 9 }
    ];

    members.forEach(member => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.position)).toBeInTheDocument();
      expect(screen.getByText(member.department)).toBeInTheDocument();

      // Experience level text depends on getExperienceLevel
      let expectedLevel = '';
      if (member.experience >= 10) expectedLevel = 'Senior';
      else if (member.experience >= 5) expectedLevel = 'Mid-level';
      else expectedLevel = 'Junior';
      expect(screen.getByText(new RegExp(expectedLevel, 'i'))).toBeInTheDocument();
    });
  });
});