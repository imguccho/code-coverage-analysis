// Mock web-vitals module before import
const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB,
}));

import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockGetCLS.mockClear();
    mockGetFID.mockClear();
    mockGetFCP.mockClear();
    mockGetLCP.mockClear();
    mockGetTTFB.mockClear();

    // Reset modules to ensure clean import
    jest.resetModules();
  });

  test('should call web-vitals functions when onPerfEntry is provided', () => {
    const mockCallback = jest.fn();

    // Call the function
    reportWebVitals(mockCallback);

    // Verify that all web-vitals functions were called with the callback
    expect(mockGetCLS).toHaveBeenCalledWith(mockCallback);
    expect(mockGetFID).toHaveBeenCalledWith(mockCallback);
    expect(mockGetFCP).toHaveBeenCalledWith(mockCallback);
    expect(mockGetLCP).toHaveBeenCalledWith(mockCallback);
    expect(mockGetTTFB).toHaveBeenCalledWith(mockCallback);
  });

  test('should not call web-vitals functions when onPerfEntry is not provided', () => {
    // Call the function without a callback
    reportWebVitals();

    // Verify that no web-vitals functions were called
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });

  test('should handle undefined callback', () => {
    // Call the function explicitly with undefined
    reportWebVitals(undefined);

    // Verify that no web-vitals functions were called
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });
});
