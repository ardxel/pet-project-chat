const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

const esModules = [
  // but mainly those 4 bellow
  'query-string',
  'decode-uri-component',
  'split-on-first',
  'filter-obj',
];

/**
 * @type {import('jest').Config}
 */
module.exports = {
  // Directory where test files are located
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  // // Transformation of TypeScript files using ts-jest
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-transform-stub',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transformIgnorePatterns: esModules.length ? [`/node_modules/(?!${esModules.join('|')})`] : [],

  // // File extensions that Jest should consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // // Module mapping for mocking styles (if necessary)

  // // Settings for the @testing-library library
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '@testing-library/jest-dom'],

  // Specify Jest to use jsdom as the testing environment
  testEnvironment: 'jsdom',

  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper({}, { prefix: '<rootDir>/' }),
    '\\.svg$': '<rootDir>/__mocks__/svg.js',
  },

  // Additional Jest options (optional)
  // verbose: true,
  // collectCoverage: true,
  // coverageReporters: ['lcov'],
};
