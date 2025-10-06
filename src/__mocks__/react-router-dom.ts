import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>);

export const Routes = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>);

export const Route: React.FC<{ element: React.ReactNode }> = ({ element }) => (
  <div>{element}</div>);

export const useNavigate = () => jest.fn();