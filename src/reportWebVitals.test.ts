
import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('should complete without error when onPerfEntry is a valid function', () => {
    const mockCallback = jest.fn();

    // Call the function - should not throw and mockCallback can be called
    expect(() => reportWebVitals(mockCallback)).not.toThrow();
  });

  test('should complete without error when onPerfEntry is not provided', () => {
    // Call the function without a callback - should not throw
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('should complete without error when onPerfEntry is undefined', () => {
    // Call the function with undefined - should not throw
    expect(() => reportWebVitals(undefined)).not.toThrow();
  });

  test('should complete without error when onPerfEntry is not a function', () => {
    // Call the function with non-function values - should not throw
    expect(() => reportWebVitals(null as any)).not.toThrow();
    expect(() => reportWebVitals(123 as any)).not.toThrow();
    expect(() => reportWebVitals('string' as any)).not.toThrow();
  });
});
