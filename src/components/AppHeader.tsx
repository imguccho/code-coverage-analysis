import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const linkStyle = { fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' };

const AppHeader: React.FC = () => {
  const { cart } = useCart();
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        background: '#f8f9fa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <nav className='nav-links'>
        <Link to='/' style={linkStyle}>Home</Link>
        <Link to='/products' style={linkStyle}>Products</Link>
        <Link to='/about' style={linkStyle}>About</Link>
        <Link to='/profile' style={linkStyle}>Profile</Link>
        <Link to='/categories' style={linkStyle}>Categories</Link>
        <Link to='/cart-summary' style={linkStyle}>Cart Summary</Link>
        <Link to='/faq' style={linkStyle}>FAQ</Link>
      </nav>
      <Link to='/cart' style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', borderRadius: '20px', padding: '0.5rem 1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
          <span role='img' aria-label='cart' style={{ fontSize: '1.3rem' }}>ð</span>
          <span style={{ fontWeight: 600, color: '#007bff', fontSize: '1rem' }}>Cart: {cart.length}</span>
        </div>
      </Link>
    </header>
  );
};

export default AppHeader;