import React from 'react';

const Router = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, children);

export const BrowserRouter = Router;
export const MemoryRouter = Router;

export const Routes = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, children);

export const Route = ({ element }: { element: React.ReactNode }) =>
  React.createElement('div', {}, element);

export const useNavigate = jest.fn(() => jest.fn());

export const Link = ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: any }) =>
  React.createElement('a', { href: to, ...props }, children);
