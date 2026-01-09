/**
 * @file jest.setup.ts
 * @description Jest testing environment setup and global mocks.
 * 
 * This file is loaded BEFORE each test file runs.
 * Use it to:
 * - Setup global mocks (localStorage, fetch, etc.)
 * - Configure test utilities
 * - Setup test data
 * - Configure test environment
 * 
 * IMPORTANT:
 * - Mocks defined here are available in all tests
 * - Be careful not to pollute global scope excessively
 * - Consider using local mocks in individual test files instead
 * 
 * TESTS:
 * - Run: npm test
 * - Watch mode: npm test -- --watch
 * - Coverage: npm test -- --coverage
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

// ===== localStorage MOCK =====
/**
 * Mock localStorage for testing
 * 
 * WHY NEEDED:
 * - localStorage is not available in Node.js test environment (jsdom)
 * - Tests need a working localStorage to test persistence features
 * - Mock allows testing without actual browser storage
 * 
 * IMPLEMENTATION:
 * - Uses JavaScript closure to maintain internal store
 * - Implements full localStorage API (getItem, setItem, removeItem, clear)
 * - Persists data only during test (cleared between tests)
 */
const localStorageMock = (() => {
  // In-memory storage object for this test run
  let store: Record<string, string> = {};

  return {
    /**
     * Get item from storage
     * @param key - Storage key
     * @returns Value or null if not found
     */
    getItem: (key: string) => store[key] || null,

    /**
     * Set item in storage
     * @param key - Storage key
     * @param value - Value to store (converted to string)
     */
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },

    /**
     * Remove item from storage
     * @param key - Storage key to remove
     */
    removeItem: (key: string) => {
      delete store[key];
    },

    /**
     * Clear all storage
     */
    clear: () => {
      store = {};
    },
  };
})();

// Apply localStorage mock to window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// ===== IntersectionObserver MOCK =====
/**
 * Mock IntersectionObserver for testing
 * 
 * WHY NEEDED:
 * - IntersectionObserver is used for lazy loading images
 * - Not available in Node.js test environment
 * - Tests need to work without actual DOM intersection detection
 * 
 * MOCKED METHODS:
 * - observe(): Called when observing an element
 * - unobserve(): Called when stopping observation
 * - disconnect(): Called when cleaning up observer
 * 
 * All methods are mocked as no-ops (do nothing) since we're not
 * testing the actual intersection detection logic in tests.
 */
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),      // No-op mock
  unobserve: jest.fn(),    // No-op mock
  disconnect: jest.fn(),   // No-op mock
})) as any;

// ===== requestIdleCallback MOCK =====
/**
 * Mock requestIdleCallback for testing
 * 
 * WHY NEEDED:
 * - Used for performance optimization (non-critical work)
 * - Not available in Node.js environment
 * - Tests need a working version for async operations
 * 
 * IMPLEMENTATION:
 * - Uses setTimeout(0) to schedule callback
 * - Simulates "idle" time on browser
 * - Callback runs after current task completes
 */
global.requestIdleCallback = jest.fn((cb) => setTimeout(cb, 0)) as any;

// ===== CONSOLE FILTERS =====
/**
 * Suppress specific console errors in tests
 * 
 * WHY:
 * - Some warnings are expected but clutter test output
 * - This reduces noise and makes real errors easier to spot
 * - Be selective - don't suppress all errors
 */
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((...args) => {
    // Suppress ReactDOM.render deprecation warning
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;  // Silently ignore this warning
    }
    // Pass other errors through to console
    originalError.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});
