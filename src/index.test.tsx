import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  let container: HTMLDivElement | null = null;

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
  });

  test('renders App component without crashing', () => {
    if (container) {
      ReactDOM.render(<App />, container);
      // No errors or exceptions means pass
    }
  });

  test('reportWebVitals function is called without argument', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => reportWebVitals()).not.toThrow();
    spy.mockRestore();
  });

  test('reportWebVitals function is called with a mock function', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('root element exists in document', () => {
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();
  });

  test('root element throws if null when creating root', () => {
    // We can't modify the actual DOM root for real but we can test logic separately if component
    // But here mock scenario: if document.getElementById returns null
    const originalGetElementById = document.getElementById;
    document.getElementById = () => null;
    expect(() => ReactDOM.createRoot(document.getElementById('root') as HTMLElement)).toThrow();
    document.getElementById = originalGetElementById;
  });
});