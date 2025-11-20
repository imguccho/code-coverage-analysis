import {
  calculateDiscountedPrice,
  formatCurrency,
  isValidEmail,
  capitalizeWords,
  randomNumber,
  isEven,
  factorial,
} from './index';

describe('Utility Functions', () => {
  describe('calculateDiscountedPrice', () => {
    test('calculates discounted price correctly', () => {
      expect(calculateDiscountedPrice(100, 20)).toBe(80);
      expect(calculateDiscountedPrice(50, 10)).toBe(45);
      expect(calculateDiscountedPrice(200, 0)).toBe(200);
      expect(calculateDiscountedPrice(100, 100)).toBe(0);
    });

    test('throws error for invalid discount percentage', () => {
      expect(() => calculateDiscountedPrice(100, -10)).toThrow('Discount percentage must be between 0 and 100');
      expect(() => calculateDiscountedPrice(100, 150)).toThrow('Discount percentage must be between 0 and 100');
    });

    test('handles decimal prices', () => {
      expect(calculateDiscountedPrice(99.99, 15)).toBeCloseTo(84.9915);
    });
  });

  describe('formatCurrency', () => {
    test('formats currency with default dollar sign', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(50.5)).toBe('$50.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    test('formats currency with custom symbol', () => {
      expect(formatCurrency(100, '€')).toBe('€100.00');
      expect(formatCurrency(250.75, '£')).toBe('£250.75');
    });

    test('handles decimal places correctly', () => {
      expect(formatCurrency(123.456)).toBe('$123.46'); // rounds down
      expect(formatCurrency(123.995)).toBe('$124.00'); // rounds up
    });
  });

  describe('isValidEmail', () => {
    test('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('test@subdomain.domain.org')).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
    });

    test('handles edge cases', () => {
      expect(isValidEmail('a@b.c')).toBe(true); // minimal valid email
    });
  });

  describe('capitalizeWords', () => {
    test('capitalizes single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
      expect(capitalizeWords('WORLD')).toBe('World');
    });

    test('capitalizes multiple words', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    test('handles mixed case', () => {
      expect(capitalizeWords('MiXeD cAsE')).toBe('Mixed Case');
    });

    test('handles empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    test('preserves existing capitalization structure', () => {
      expect(capitalizeWords('foo-bar')).toBe('Foo-bar');
    });
  });

  describe('randomNumber', () => {
    beforeEach(() => {
      // Mock Math.random to return consistent values for testing
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('generates random number within range', () => {
      expect(randomNumber(1, 10)).toBe(6); // (10-1+1)*0.5 + 1 = 6
      expect(randomNumber(0, 5)).toBe(3); // (5-0+1)*0.5 + 0 = 3
      expect(randomNumber(-5, 5)).toBeCloseTo(0.5); // (5-(-5)+1)*0.5 + (-5) = 0.5
    });
  });

  describe('isEven', () => {
    test('identifies even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(100)).toBe(true);
      expect(isEven(-2)).toBe(true);
    });

    test('identifies odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(99)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });

    test('handles edge cases', () => {
      expect(isEven(2.5)).toBe(false); // Decimal numbers
    });
  });

  describe('factorial', () => {
    test('calculates factorial correctly', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(2)).toBe(2);
      expect(factorial(3)).toBe(6);
      expect(factorial(4)).toBe(24);
      expect(factorial(5)).toBe(120);
    });

    test('handles negative numbers', () => {
      expect(factorial(-1)).toBe(NaN);
      expect(factorial(-5)).toBe(NaN);
    });

    test('calculates large factorials', () => {
      expect(factorial(6)).toBe(720);
      expect(factorial(7)).toBe(5040);
    });

    test('handles edge cases', () => {
      expect(isNaN(factorial(-1))).toBe(true);
    });
  });
});
