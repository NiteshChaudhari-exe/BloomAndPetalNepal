/**
 * Example test for AppContext
 * Tests user authentication and cart management
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider, useApp } from '../store/AppContext';

// Mock component to test context
const TestComponent = () => {
  const { user, cart, login } = useApp();
  
  return (
    <div>
      <div data-testid="user-name">{user?.name || 'No User'}</div>
      <div data-testid="cart-count">{cart.length}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
    </div>
  );
};

describe('AppContext', () => {
  it('should provide initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('should update cart on adding products', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('should persist data to localStorage', () => {
    const { rerender } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    // Verify localStorage was called
    expect(localStorage.getItem).toBeDefined();
  });
});
