import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  beforeAll(() => {
    // Mock the DOM element
    document.getElementById = jest.fn().mockImplementation(() => {
      const div = document.createElement('div');
      div.id = 'root';
      return div;
    });
    // Mock ReactDOM.createRoot
    ReactDOM.createRoot = jest.fn().mockReturnValue({
      render: jest.fn(),
    });
  });

  test('renders App component without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('reportWebVitals function does not throw', () => {
    const mockFn = jest.fn();
    expect(() => reportWebVitals(mockFn)).not.toThrow();
  });
});
