import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  experience: number;
}

interface CompanyStat {
  id: number;
  label: string;
  value: string;
  description: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();

  // Dummy data for team members
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'Sarah Wilson', position: 'CEO', department: 'Executive', experience: 15 },
    { id: 2, name: 'Mike Chen', position: 'CTO', department: 'Technology', experience: 12 },
    { id: 3, name: 'Emily Davis', position: 'Design Lead', department: 'Design', experience: 8 },
    { id: 4, name: 'David Rodriguez', position: 'Senior Developer', department: 'Engineering', experience: 10 },
    { id: 5, name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', experience: 7 },
    { id: 6, name: 'James Miller', position: 'Product Manager', department: 'Product', experience: 9 },
  ];

  // Dummy data for company statistics
  const companyStats: CompanyStat[] = [
    { id: 1, label: 'Years in Business', value: '10+', description: 'Over a decade of experience' },
    { id: 2, label: 'Team Members', value: '50+', description: 'Dedicated professionals' },
    { id: 3, label: 'Projects Completed', value: '200+', description: 'Successful deliveries' },
    { id: 4, label: 'Client Satisfaction', value: '98%', description: 'Happy customers' },
  ];

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  const getExperienceLevel = (years: number): string => {
    if (years >= 10) return 'Senior';
    if (years >= 5) return 'Mid-level';
    return 'Junior';
  };

  return (
    <div className="about-container">
      <h1>About Our Company</h1>
      <p>Learn more about our team and company statistics.</p>

      <div className="navigation-buttons">
        <button onClick={handleNavigateToHome} className="nav-button">
          Go to Home
        </button>
        <button onClick={handleNavigateToProducts} className="nav-button">
          Go to Products
        </button>
      </div>

      <div className="company-stats">
        <h2>Company Statistics</h2>
        <div className="stats-grid">
          {companyStats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <h3>{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <h3>{member.name}</h3>
              <p className="position">{member.position}</p>
              <p className="department">{member.department}</p>
              <p className="experience">
                Experience: {member.experience} year{member.experience > 1 ? 's' : ''} ({getExperienceLevel(member.experience)})
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="company-description">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to creating innovative solutions that help businesses grow and succeed. 
          Our team of experienced professionals works tirelessly to deliver high-quality products 
          and services that exceed our clients' expectations.
        </p>
      </div>
    </div>
  );
};

export default About;  