import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => 
  React.createElement('div', {}, children);

export const Routes = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', {}, React.Children.toArray(children)[0]);

export const Route = ({ element }: { element: React.ReactNode }) => 
  React.createElement('div', {}, element);

export const useNavigate = jest.fn(() => jest.fn());

export const Link = ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: any }) =>
  React.createElement('a', { href: to, ...props }, children);

export const useParams = jest.fn(() => ({}));
