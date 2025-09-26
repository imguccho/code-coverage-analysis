import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  let container: HTMLElement | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
    jest.clearAllMocks();
  });

  test('renders App component without crashing', () => {
    if (!container) throw new Error('Container should be defined');
    ReactDOM.render(<App />, container);
    expect(container.innerHTML).toBeTruthy();
  });

  test('reportWebVitals function is called with a valid callback', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('reportWebVitals function handles no argument gracefully', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('reportWebVitals callback receives expected performance entries', () => {
    const mockFn = jest.fn();
    // Call reportWebVitals with mockFn
    reportWebVitals(mockFn);
    // It should call the callback with an object with expected keys
    expect(mockFn).toHaveBeenCalled();
    const arg = mockFn.mock.calls[0][0];
    expect(typeof arg).toBe('object');
    expect(arg).toHaveProperty('name');
    expect(arg).toHaveProperty('value');
  });
});