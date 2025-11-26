import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Route = ({ element }: { element: React.ReactNode }) => element;
export const Link = ({ to, children, ...props }: { to: string; children: React.ReactNode;[key: string]: any }) => <a href={to} {...props}>{children}</a>;
export const NavLink = ({ to, children, ...props }: { to: string; children: React.ReactNode;[key: string]: any }) => <a href={to} {...props}>{children}</a>;
export const Navigate = ({ to }: { to: string }) => <div>Navigate to {to}</div>;
export const MemoryRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const Outlet = () => <div data-testid="outlet" />;
export const useParams = () => ({});
export const useNavigate = () => jest.fn();
export const useLocation = () => ({ pathname: '/', search: '', hash: '', state: null });
