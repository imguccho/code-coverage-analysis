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

describe('Index File', () => {
  test('renders App component without crashing using ReactDOM.render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('creates root and renders App component without crashing using root.render', () => {
    const div = document.createElement('div');
    const newRoot = ReactDOM.createRoot(div);
    expect(newRoot).toBeDefined();
    newRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });

  test('reportWebVitals function is called with a mock function', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('reportWebVitals can be called with no arguments without throwing', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });
});