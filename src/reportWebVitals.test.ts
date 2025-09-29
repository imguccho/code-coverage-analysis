import reportWebVitals from './reportWebVitals';

// Mock for web-vitals methods
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
} from 'web-vitals';

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call all web-vitals functions if onPerfEntry is a function', () => {
    const onPerfEntry = jest.fn();
    reportWebVitals(onPerfEntry);

    expect(getCLS).toHaveBeenCalled();
    expect(getFID).toHaveBeenCalled();
    expect(getFCP).toHaveBeenCalled();
    expect(getLCP).toHaveBeenCalled();
    expect(getTTFB).toHaveBeenCalled();

    // Simulate calling the callback passed to getCLS, etc.
    const lastCallArgs = getCLS.mock.calls[0];
    if (lastCallArgs && lastCallArgs[0]) {
      // Invoke the callback with a dummy metric
      lastCallArgs[0]({ name: 'CLS', value: 0.1 });
    }

    expect(onPerfEntry).not.toHaveBeenCalled(); // callback is not called directly here
  });

  it('should not call web-vitals functions if onPerfEntry is not a function', () => {
    reportWebVitals(undefined);

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});