import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('does not throw when called without argument', () => {
    expect(() => {
      reportWebVitals();
    }).not.toThrow();
  });

  it('calls web-vitals methods when passed a function', () => {
    const onPerfEntry = jest.fn();
    const getCLS = jest.fn((callback) => callback({ name: 'CLS', value: 1 }));
    const getFID = jest.fn((callback) => callback({ name: 'FID', value: 2 }));
    const getFCP = jest.fn((callback) => callback({ name: 'FCP', value: 3 }));
    const getLCP = jest.fn((callback) => callback({ name: 'LCP', value: 4 }));
    const getTTFB = jest.fn((callback) => callback({ name: 'TTFB', value: 5 }));

    jest.mock('web-vitals', () => ({
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB
    }));

    const originalWebVitals = jest.requireActual('web-vitals');

    // Overwrite global import (simulate)
    jest.doMock('web-vitals', () => originalWebVitals);

    // To test, we call our function with a spy
    reportWebVitals(onPerfEntry);

    expect(onPerfEntry).toHaveBeenCalledTimes(5);
    expect(onPerfEntry).toHaveBeenCalledWith({ name: 'CLS', value: 1 });
    expect(onPerfEntry).toHaveBeenCalledWith({ name: 'FID', value: 2 });
    expect(onPerfEntry).toHaveBeenCalledWith({ name: 'FCP', value: 3 });
    expect(onPerfEntry).toHaveBeenCalledWith({ name: 'LCP', value: 4 });
    expect(onPerfEntry).toHaveBeenCalledWith({ name: 'TTFB', value: 5 });
  });
});