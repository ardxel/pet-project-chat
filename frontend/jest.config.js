/**
 * @type {import('jest').Config}
 */
module.exports = {
  // Directory where test files are located
  roots: ['<rootDir>/src'],

  // // Transformation of TypeScript files using ts-jest
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },

  // // File extensions that Jest should consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // // Module mapping for mocking styles (if necessary)

  // // Settings for the @testing-library library
  setupFilesAfterEnv: ['<rootDir>/__jest__/jest.setup.ts', '@testing-library/jest-dom'],

  // Specify Jest to use jsdom as the testing environment
  testEnvironment: 'jsdom',

  // Additional Jest options (optional)
  // verbose: true,
  // collectCoverage: true,
  // coverageReporters: ['lcov'],
};
