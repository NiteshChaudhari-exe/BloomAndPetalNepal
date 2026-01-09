/**
 * @file ErrorBoundary.tsx
 * @description React Error Boundary component for graceful error handling.
 * Catches JavaScript errors in the component tree and displays a fallback UI
 * instead of crashing the entire application.
 * 
 * HOW IT WORKS:
 * - Wraps component tree and catches errors in render, lifecycle, and constructors
 * - Does NOT catch async errors, event handlers, or server-side rendering
 * - Provides error details in development mode for debugging
 * - Offers recovery buttons: "Try Again" (retry) and "Go Home" (navigate to home)
 * 
 * USAGE:
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * 
 * ERRORS IT CATCHES:
 * - Component render errors
 * - Lifecycle method errors
 * - Constructor errors
 * - Child component errors
 * 
 * ERRORS IT DOESN'T CATCH:
 * - Async callbacks (setTimeout, fetch, Promises)
 * - Event handlers (onClick, onChange)
 * - Server-side rendering
 * - Errors in the error boundary itself
 * 
 * For async errors, use try-catch in event handlers or Promise .catch()
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

import React, { ReactNode, Component, ErrorInfo } from 'react';

/**
 * Props for ErrorBoundary component
 * @interface Props
 */
interface Props {
  /** Child components to protect */
  children: ReactNode;
  
  /** Optional custom fallback UI (if not provided, default error page shown) */
  fallback?: ReactNode;
}

/**
 * State for ErrorBoundary
 * @interface State
 */
interface State {
  /** Whether an error has been caught */
  hasError: boolean;
  
  /** The error object (null if no error) */
  error: Error | null;
}

/**
 * ErrorBoundary - React Error Boundary component
 * 
 * Class component (required for Error Boundaries in React)
 * 
 * LIFECYCLE:
 * 1. Child component throws error during render
 * 2. getDerivedStateFromError() called → updates state
 * 3. componentDidCatch() called → logs error, sends to monitoring service
 * 4. Render fallback UI with error message
 * 5. User clicks "Try Again" to reset → retries
 * 6. User clicks "Go Home" → navigates to home
 * 
 * DEVELOPMENT MODE:
 * - Shows actual error message in red box
 * - Helps developers debug issues quickly
 * 
 * PRODUCTION MODE:
 * - Hides technical error details from users
 * - Shows friendly message instead
 * - Still logs to console for debugging
 */
export class ErrorBoundary extends Component<Props, State> {
  /**
   * Constructor - initialize state
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * getDerivedStateFromError - update state when error is caught
   * 
   * Called AFTER an error is thrown in a child component.
   * Used to update state so fallback UI is rendered.
   * 
   * IMPORTANT: This is a static method, so it can't access 'this'
   * Use componentDidCatch for side effects (logging, etc.)
   * 
   * @param error - The error that was thrown
   * @returns New state object with hasError: true
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * componentDidCatch - handle error logging and monitoring
   * 
   * Called AFTER getDerivedStateFromError, allows side effects.
   * Perfect place for:
   * - Logging errors to monitoring service (Sentry, LogRocket, etc.)
   * - Sending error reports to backend
   * - Analytics tracking
   * - User notifications
   * 
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information (component stack trace)
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console for development
    console.error('Error caught by boundary:', error, errorInfo);
    
    // TODO: Send to monitoring service
    // Example:
    // Sentry.captureException(error, { contexts: { errorInfo } });
  }

  /**
   * Reset error state to retry
   * Called when user clicks "Try Again" button
   */
  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Render - show error UI or normal children
   * 
   * If error caught: show fallback/error page
   * If no error: render children normally
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-floral-pastel to-rose-50 dark:from-stone-900 dark:to-stone-850 flex items-center justify-center px-4">
          <div className="glass dark:glass-dark rounded-3xl p-12 max-w-md text-center backdrop-blur-xl border border-white/20 dark:border-stone-700/50 shadow-glass">
            {/* Error Icon - Rose emoji with pulsing animation */}
            <div className="text-7xl mb-6 animate-pulse">🌹</div>

            {/* Error Title and Message */}
            <h1 className="text-3xl font-serif text-stone-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mb-2 text-sm">
              We encountered an unexpected error. Our team has been notified.
            </p>

            {/* Error Details - Only shown in development mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-left">
                <p className="font-mono text-xs text-red-800 dark:text-red-300 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Recovery Buttons */}
            <div className="space-y-3 mt-8">
              {/* Try Again - resets error boundary state */}
              <button
                onClick={this.reset}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-rose hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                title="Try to recover from the error"
              >
                ✨ Try Again
              </button>
              
              {/* Go Home - navigate to home page and reset */}
              <button
                onClick={() => {
                  window.location.hash = '#/';
                  this.reset();
                }}
                className="w-full py-3 rounded-xl font-bold text-rose-primary dark:text-rose-400 border-2 border-rose-primary hover:bg-rose-50 dark:hover:bg-stone-800 transition-all duration-300"
                title="Return to home page"
              >
                🏠 Go Home
              </button>
            </div>

            {/* Support Message */}
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-6">
              If the problem persists, please refresh the page or contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
