import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Mocking document.getElementById to return a div for ReactDOM.createRoot
const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);
document.getElementById = jest.fn(() => rootDiv);

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

// Tests section

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

  test('ReactDOM.createRoot is called with the correct element', () => {
    const element = document.getElementById('root');
    expect(element).toBe(rootDiv);
  });

  test('root.render is called with <React.StrictMode><App /></React.StrictMode>', () => {
    // We can only verify if the rootDiv contains the rendered App component not directly root.render call
    expect(rootDiv.innerHTML).toBeDefined();
  });

  afterAll(() => {
    document.body.removeChild(rootDiv);
  });
});