import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root element for testing
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

describe('Index File', () => {
  test('renders App component without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(<App />);
    root.unmount();
  });

  test('reportWebVitals calls web-vitals functions with callback', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);

    // Since it's async, we need to wait or check mocks
    // But jest mocks with jest.fn() can be checked
    expect(mockFn).toHaveBeenCalled(); // The callback should be called synchronously now with mock
  });
});
