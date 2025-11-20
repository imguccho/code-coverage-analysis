/**
 * Utility functions for the application
 */

/**
 * Calculates the discounted price
 * @param originalPrice - The original price
 * @param discountPercentage - The discount percentage (0-100)
 * @returns The discounted price
 */
export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): number => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }
  return originalPrice * (1 - discountPercentage / 100);
};

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: '$')
 * @returns The formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = '$'): string => {
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generates a random number between min and max (inclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random number between min and max
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min + 1) + min;
};

/**
 * Checks if a number is even
 * @param num - The number to check
 * @returns True if even, false if odd
 */
export const isEven = (num: number): boolean => {
  return num % 2 === 0;
};

/**
 * Calculates the factorial of a number
 * @param n - The number to calculate factorial for
 * @returns The factorial of n
 */
export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};
