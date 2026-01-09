/**
 * @file jest.config.js
 * @description Jest testing framework configuration for Bloom & Petal Nepal.
 * 
 * JEST:
 * - Testing framework for JavaScript/TypeScript code
 * - Provides test runner, mocking utilities, and assertion library
 * - Configured for React + TypeScript project
 * 
 * COMMANDS:
 * - npm test              → Run all tests once
 * - npm test -- --watch  → Watch mode (rerun on file changes)
 * - npm test -- --coverage → Generate coverage report
 * - npm test -- SomeTest → Run specific test file
 * 
 * TEST FILES:
 * - Located in __tests__ directory
 * - Filename pattern: *.test.ts(x) or *.spec.ts(x)
 * - Run before deployment to catch regressions
 * 
 * COVERAGE TARGETS:
 * - Branches: 50% - Test conditional branches
 * - Functions: 50% - Test all exported functions
 * - Lines: 50% - Test code execution paths
 * - Statements: 50% - Test individual statements
 * 
 * Adjust these thresholds as project matures.
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

module.exports = {
  // ===== PRESET & TEST ENVIRONMENT =====
  
  /**
   * Preset: ts-jest
   * Allows Jest to understand TypeScript files
   * Automatically handles .ts and .tsx files
   */
  preset: 'ts-jest',

  /**
   * Test Environment: jsdom
   * Provides DOM API (document, window, etc.) for React testing
   * Alternative: 'node' for backend testing (no DOM)
   */
  testEnvironment: 'jsdom',

  // ===== FILE DISCOVERY =====

  /**
   * Roots: Directories where Jest looks for test files
   * Can specify multiple roots for monorepo projects
   */
  roots: ['<rootDir>'],

  /**
   * Test Match: Patterns for finding test files
   * Looks for:
   * - Files in __tests__ directory
   * - Files ending with .test.ts(x) or .spec.ts(x)
   */
  testMatch: [
    '**/__tests__/**/*.ts?(x)',      // Files in __tests__ folder
    '**/?(*.)+(spec|test).ts?(x)'    // test/spec pattern
  ],

  /**
   * Module File Extensions: File types to treat as modules
   * Order matters - tried in order
   */
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // ===== MODULE MAPPING =====
  
  /**
   * Module Name Mapper: Map module names to mock implementations
   * 
   * Used for:
   * - CSS files: Convert to JS object (jsdom doesn't understand CSS)
   * - Images: Replace with dummy file
   * - Assets: Mock asset imports
   */
  moduleNameMapper: {
    // CSS modules - convert to empty object
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // Image files - use file mock
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // ===== SETUP FILES =====

  /**
   * Setup Files After Env: Runs after test environment is set up
   * Use jest.setup.ts for:
   * - Global mocks (localStorage, IntersectionObserver)
   * - Test utilities setup
   * - Global configuration
   */
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // ===== COVERAGE =====

  /**
   * Collect Coverage From: Which files to include in coverage report
   * Includes: src, pages, components, store, services
   * Excludes: TypeScript declarations, node_modules
   */
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',         // src directory
    'pages/**/*.{ts,tsx}',       // pages directory
    'components/**/*.{ts,tsx}',  // components directory
    'store/**/*.{ts,tsx}',       // global state
    'services/**/*.{ts,tsx}',    // services
    '!**/*.d.ts',                // Exclude type definitions
    '!**/node_modules/**',       // Exclude dependencies
  ],

  /**
   * Coverage Threshold: Minimum coverage required to pass
   * 
   * If actual coverage < threshold:
   * - Test suite fails (exit code 1)
   * - Prevents merging code that decreases coverage
   * 
   * Current thresholds: 50% (starter project)
   * Can increase as coverage improves:
   * - 70% = solid coverage (recommended for mature projects)
   * - 90%+ = very thorough (enterprise projects)
   */
  coverageThreshold: {
    global: {
      branches: 50,      // 50% of code branches tested
      functions: 50,     // 50% of functions called in tests
      lines: 50,         // 50% of lines executed
      statements: 50,    // 50% of statements executed
    },
  },

  // ===== TS-JEST CONFIGURATION =====

  /**
   * ts-jest Configuration:
   * - Handles TypeScript file transformation for Jest
   * - Configures TypeScript compiler options
   */
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',           // Use React JSX transform
        esModuleInterop: true,  // Allow default imports from CommonJS modules
      },
    },
  },
};
