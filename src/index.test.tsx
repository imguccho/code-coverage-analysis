import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  beforeAll(() => {
    // Create a root div for the test environment
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
  });

  afterAll(() => {
    // Clean up
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      document.body.removeChild(rootDiv);
    }
  });

  test('renders App component without crashing', () => {
    const rootDiv = document.getElementById('root') as HTMLElement;
    const root = ReactDOM.createRoot(rootDiv);
    expect(() => {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }).not.toThrow();
  });


});
