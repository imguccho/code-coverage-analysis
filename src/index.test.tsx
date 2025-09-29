import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  let container: HTMLElement | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  test('renders App component without crashing via ReactDOM.render', () => {
    if (!container) throw new Error('Container not initialized');
    ReactDOM.render(<App />, container);
    expect(container.innerHTML).not.toBe('');
  });

  test('creates root with ReactDOM.createRoot and renders App', () => {
    if (!container) throw new Error('Container not initialized');
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Because ReactDOM.createRoot is async, we use a small timeout to allow render
  });

  test('reportWebVitals function is called with a mock', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('reportWebVitals can be called with no arguments', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });
});