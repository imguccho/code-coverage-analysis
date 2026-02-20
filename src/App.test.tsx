import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

  test('renders without crashing', () => {
    renderApp();
  });

  test('renders home page by default', () => {
    renderApp();

    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(
      screen.getByText('This is the home page with some dummy user data.')
    ).toBeInTheDocument();
  });

});
