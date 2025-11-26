module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 93,
      functions: 95,
      lines: 83,
      statements: 83,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router-dom.tsx',
    '^web-vitals$': '<rootDir>/src/__mocks__/web-vitals.ts',
  },
};
