import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('About Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
    jest.clearAllMocks();
  });

  test('renders main headings and paragraphs', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/About Our Company/i);
    expect(screen.getByText(/Learn more about our team and company statistics./i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Company Statistics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Our Team/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Our Mission/i })).toBeInTheDocument();
  });

  test('renders navigation buttons and triggers navigate callbacks', () => {
    render(<About />);

    const goHomeBtn = screen.getByRole('button', { name: /Go to Home/i });
    const goProductsBtn = screen.getByRole('button', { name: /Go to Products/i });

    expect(goHomeBtn).toBeInTheDocument();
    expect(goProductsBtn).toBeInTheDocument();

    fireEvent.click(goHomeBtn);
    expect(mockedNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(goProductsBtn);
    expect(mockedNavigate).toHaveBeenCalledWith('/products');
  });

  test('renders all team members with correct details', () => {
    render(<About />);
    const memberCards = screen.getAllByRole('heading', { level: 3 });

    expect(memberCards).toHaveLength(6);
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Executive')).toBeInTheDocument();
    expect(screen.getByText(/Experience: 15 years/i)).toBeInTheDocument();
  });

  test('renders company stats correctly', () => {
    render(<About />);

    expect(screen.getByText('Years in Business')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  test('renders mission statement text', () => {
    render(<About />);

    expect(screen.getByText(/We are dedicated to creating innovative solutions/i)).toBeInTheDocument();
  });
});