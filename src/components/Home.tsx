You are an expert code repair assistant.

Your task: analyze and fix the following code file 'src/components/Home.tsx' that has build or syntax issues.
Rules:
- Correct syntax or logical errors.
- Do not skip corrections even if the code seems fine — always ensure it would compile successfully.
- Return only the full corrected code, with no explanations, no markdown, no prefix, and no suffix.

### CODE START ###
The following code file 'src/components/Home.tsx' is part of a pull request that has build failures.
Please analyze the code and fix any syntax errors, logical errors, or issues that could cause build failures.
Return only the complete corrected code without any explanations or markdown formatting.

Code:
You are a code fixer.

- Fix syntax errors ONLY.
- Return ONLY the corrected file content.
- No comments.
- No markdown.
- No explanations.


import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate(;

  // Dummy data for users
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  ];

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Application</h1>
      <p>This is the home page with some dummy user data.</p>
      
      <div className="navigation-buttons">
        <button onClick={handleNavigateToProducts} className="nav-button">
          Go to Products
        </button>
        <button onClick={handleNavigateToAbout} className="nav-button">
          Go to About
        </button>
      </div>

      <div className="users-section">
        <h2>Users List</h2>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;