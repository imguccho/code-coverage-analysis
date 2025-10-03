import reportWebVitals from './reportWebVitals';

const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  getCLS: (callback) => mockGetCLS(callback),
  getFID: (callback) => mockGetFID(callback),
  getFCP: (callback) => mockGetFCP(callback),
  getLCP: (callback) => mockGetLCP(callback),
  getTTFB: (callback) => mockGetTTFB(callback),
}));

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not call any web vitals methods if onPerfEntry is not provided', () => {
    reportWebVitals(undefined);
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });

  it('calls all web vitals methods with onPerfEntry callback if provided', () => {
    const mockCallback = jest.fn();
    reportWebVitals(mockCallback);

    expect(mockGetCLS).toHaveBeenCalledTimes(1);
    expect(mockGetFID).toHaveBeenCalledTimes(1);
    expect(mockGetFCP).toHaveBeenCalledTimes(1);
    expect(mockGetLCP).toHaveBeenCalledTimes(1);
    expect(mockGetTTFB).toHaveBeenCalledTimes(1);

    // Simulate the web-vitals lib invoking the callback
    const metric = { name: 'CLS', value: 0.1 };
    mockGetCLS.mock.calls[0][0](metric);
    expect(mockCallback).toHaveBeenCalledWith(metric);
  });
});