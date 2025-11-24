// Mock web-vitals module before import
const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.doMock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB,
}));

// Import after mocking

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

  test('should call web-vitals functions when onPerfEntry is provided', async () => {
    const mockCallback = jest.fn();

    // Call the function
    reportWebVitals(mockCallback);

    // Wait for the async import and function calls
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that all web-vitals functions were called with the callback
    expect(mockGetCLS).toHaveBeenCalledWith(mockCallback);
    expect(mockGetFID).toHaveBeenCalledWith(mockCallback);
    expect(mockGetFCP).toHaveBeenCalledWith(mockCallback);
    expect(mockGetLCP).toHaveBeenCalledWith(mockCallback);
    expect(mockGetTTFB).toHaveBeenCalledWith(mockCallback);
  });

  test('should not call web-vitals functions when onPerfEntry is not provided', async () => {
    // Call the function without a callback
    reportWebVitals();

    // Wait for any potential async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that no web-vitals functions were called
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });

  test('should handle undefined callback', async () => {
    // Call the function explicitly with undefined
    reportWebVitals(undefined);

    // Wait for any potential async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that no web-vitals functions were called
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });
});
