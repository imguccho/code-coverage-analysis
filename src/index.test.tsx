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

reportWebVitals();

describe('Index File', () => {
  test('renders App component without crashing (createRoot)', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(<App />);
  });

  test('renders App component without crashing (ReactDOM.render)', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('reportWebVitals function is called with a callback', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('reportWebVitals function works without a callback', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('root element exists before rendering', () => {
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();
  });
});