/**
 * @file index.tsx
 * @description Entry point for the React application.
 * This file initializes React and mounts the App component to the DOM.
 * 
 * IMPORTANT NOTES:
 * - The 'root' HTML element must exist in index.html
 * - React.StrictMode is enabled for development warnings and checks
 * - Any global React configuration should go here
 * 
 * @author Bloom & Petal Nepal Team
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root element where the React app will be mounted
const rootElement = document.getElementById('root');

// Throw error if root element doesn't exist (prevents silent failures)
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create React root and render the App component
const root = ReactDOM.createRoot(rootElement);

// StrictMode helps identify potential problems during development:
// - Highlights components with unsafe lifecycles
// - Warns about legacy string ref API
// - Warns about deprecated findDOMNode usage
// - Checks for unexpected side effects (runs effects twice in dev mode)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
