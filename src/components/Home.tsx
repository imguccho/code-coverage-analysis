import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = memo(({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
  </div>
));

UserCard.displayName = 'UserCard';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Dummy data for users
  const users: readonly User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  ];

  const handleNavigateToProducts = useCallback((): void => {
    navigate('/products');
  }, [navigate]);

  const handleNavigateToAbout = useCallback((): void => {
    navigate('/about');
  }, [navigate]);

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
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.displayName = 'Home';

export default memo(Home);
