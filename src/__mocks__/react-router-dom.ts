import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, children);

export const MemoryRouter = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, children);

export const Routes = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, children);

export const Route = ({ element }: { element: React.ReactNode }) =>
  React.createElement('div', {}, element);

export const useNavigate = () => jest.fn();
