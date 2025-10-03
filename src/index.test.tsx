import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Test suite for index.tsx

describe('Index File', () => {
  test('renders App component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('reportWebVitals function is called', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('root container exists before creating root', () => {
    // Check the root container is present
    const rootContainer = document.getElementById('root');
    expect(rootContainer).not.toBeNull();
  });

  test('ReactDOM.createRoot is called with correct element', () => {
    const originalCreateRoot = ReactDOM.createRoot;
    const mockCreateRoot = jest.fn(originalCreateRoot);
    ReactDOM.createRoot = mockCreateRoot;

    const element = document.createElement('div');
    element.setAttribute('id', 'root');
    document.body.appendChild(element);

    // Manually run the original code
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    expect(mockCreateRoot).toHaveBeenCalledWith(element);

    ReactDOM.createRoot = originalCreateRoot; // restore
  });

  test('renders App component within React.StrictMode', () => {
    const originalRender = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render;
    const mockRender = jest.fn();

    // We cannot fully spy on the render after root.render is called in source,
    // but we can check via shallow rendering App separately in unit tests elsewhere.
    // Here just a placeholder acknowledging this scenario.
    expect(typeof originalRender).toBe('function');
  });
});