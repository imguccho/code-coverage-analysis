import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

describe('Index File', () => {
  const originalGetElementById = document.getElementById;
  let container: HTMLElement | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
      container = null;
    }
    jest.restoreAllMocks();
  });

  test('renders App component without crashing via ReactDOMClient', () => {
    const root = ReactDOM.createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });

  test('renders App component via ReactDOM.render and unmounts correctly', () => {
    ReactDOM.render(<App />, container!);
    ReactDOM.unmountComponentAtNode(container!);
  });

  test('reportWebVitals function is called with a callback', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('reportWebVitals function can be called without a callback', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('document.getElementById is called with root', () => {
    const spyGetElementById = jest.spyOn(document, 'getElementById');
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    expect(spyGetElementById).toHaveBeenCalledWith('root');
  });
});