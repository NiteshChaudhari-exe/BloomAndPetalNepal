/**
 * @file App.tsx
 * @description Main application component with routing logic and dark mode management.
 * 
 * ARCHITECTURE OVERVIEW:
 * - App: Top-level component managing theme state and providers
 * - Router: Handles hash-based routing (no external router library)
 * - ErrorBoundary: Wraps app for graceful error handling
 * 
 * ROUTING SYSTEM:
 * - Uses hash-based routing (#/path) instead of React Router
 * - Advantages: Simpler, works with static hosting (GitHub Pages, etc.)
 * - Each route checks authentication before rendering protected pages
 * 
 * DARK MODE:
 * - Persisted in localStorage
 * - Respects system preference on first load
 * - Toggled via button in header
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

import './src/index.css';
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './pages/Footer';
import { Header } from './pages/Header';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import Occasions from './pages/Occasions';
import { OrderNotifications } from './components/OrderNotifications';

/**
 * Router component handles all page routing and navigation logic.
 * 
 * ROUTE MAP:
 * #/                    - Home page
 * #/shop                - Product shop with filters
 * #/product/:id         - Individual product detail page
 * #/occasions           - Browse flowers by occasion
 * #/cart                - Shopping cart
 * #/checkout            - Order checkout/payment
 * #/admin               - Admin dashboard (requires Admin role)
 * #/login               - User login page
 * #/profile             - User profile (requires login)
 * #/orders/:id          - Order details (requires login)
 * #/dashboard           - User dashboard with order history (requires login)
 * 
 * AUTHENTICATION:
 * - Protected routes redirect to #/login if user not authenticated
 * - Admin route checks user.role === 'Admin'
 * - All routes update hash manually for SPA navigation
 * 
 * @param {boolean} isDark - Whether dark mode is enabled
 * @param {Function} toggleDark - Function to toggle dark mode
 * @returns {React.ReactElement} Rendered page based on current hash
 */
const Router: React.FC<{ isDark: boolean; toggleDark: () => void }> = ({ isDark, toggleDark }) => {
  // Track current hash location for routing
  const [hash, setHash] = useState(window.location.hash || '#/');
  
  // Get app context data (user, orders, products, etc.)
  const { user, orders, getOrderById, updateUserProfile } = useApp();

  // Listen for hash changes (browser back/forward or manual navigation)
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * renderPage determines which component to render based on current hash.
   * Each route is evaluated in order, allowing for parameterized routes.
   * 
   * Returns appropriate component or 404 page if no routes match.
   */
  const renderPage = () => {
    // HOME PAGE - No authentication required
    if (hash === '#/' || hash === '') return <Home />;
    
    // SHOP - Browse and filter products
    if (hash.startsWith('#/shop')) return <Shop />;
    
    // PRODUCT DETAILS - View single product
    if (hash.startsWith('#/product/')) {
      const id = hash.split('#/product/')[1];
      return <ProductDetails id={id} />;
    }
    
    // OCCASIONS - Browse flowers by occasion (Birthday, Anniversary, etc.)
    if (hash === '#/occasions') {
      return <Occasions />;
    }
    
    // CART - Shopping cart management
    if (hash === '#/cart') return <Cart />;
    
    // CHECKOUT - Finalize order and payment
    if (hash === '#/checkout') return <Checkout />;
    
    // ADMIN PANEL - Requires Admin role
    if (hash === '#/admin') {
      // Check if user has admin permissions
      if (user?.role !== 'Admin') return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center dark:bg-stone-900">
           <span className="text-6xl mb-6">🔒</span>
           <h2 className="text-3xl font-serif mb-4 text-stone-900 dark:text-white">Admin Access Only</h2>
           <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-md">You do not have the necessary permissions to view this section. Please login with an administrator account.</p>
           <a href="#/login" className="btn-primary">Switch Account</a>
        </div>
      );
      return <AdminDashboard />;
    }
    
    // LOGIN PAGE - Redirect to home if already logged in
    if (hash === '#/login') {
      if (user) {
        window.location.hash = '#/';
        return null;
      }
      return <Login />;
    }
    
    // USER PROFILE - Requires authentication
    if (hash === '#/profile') {
      if (!user) {
        window.location.hash = '#/login';
        return null;
      }
      return <Profile />;
    }
    
    // ORDER DETAILS - View specific order (requires authentication)
    if (hash.startsWith('#/orders/')) {
      if (!user) {
        window.location.hash = '#/login';
        return null;
      }
      const orderId = hash.split('#/orders/')[1];
      const order = getOrderById(orderId);
      
      // Security check: ensure user owns this order
      if (!order || order.userId !== user.id) {
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center dark:bg-stone-900">
            <span className="text-6xl mb-6">❌</span>
            <h2 className="text-3xl font-serif mb-4 text-stone-900 dark:text-white">Order Not Found</h2>
            <p className="text-stone-500 dark:text-stone-400 mb-8">This order doesn't exist or you don't have access to it.</p>
            <a href="#/dashboard" className="btn-primary">Back to Orders</a>
          </div>
        );
      }
      return <OrderDetails order={order} />;
    }
    
    // USER DASHBOARD - Shows order history and user info (requires authentication)
    if (hash === '#/dashboard') {
      if (!user) {
        window.location.hash = '#/login';
        return null;
      }
      const myOrders = orders.filter(o => o.userId === user.id);
      
      return (
        <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900">
          <div className="max-w-4xl mx-auto py-20 px-4">
            {/* User welcome section with avatar */}
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-rose text-white flex items-center justify-center text-3xl font-serif shadow-lg">
                {user.name[0]}
              </div>
              <div>
                <h1 className="text-4xl font-serif mb-1 text-stone-900 dark:text-white">Hello, {user.name}</h1>
                <p className="text-stone-500 dark:text-stone-400">Member since {new Date().getFullYear()}</p>
              </div>
              <a href="#/profile" className="ml-auto btn-primary text-sm">Edit Profile</a>
            </div>

            {/* Order Notifications - Shows upcoming deliveries and status updates */}
            <div className="mb-12">
              <OrderNotifications />
            </div>

            {/* Recent Orders List */}
            <h2 className="text-2xl font-serif mb-8 text-stone-900 dark:text-white">Your Recent Orders</h2>
            <div className="space-y-6">
              {myOrders.length > 0 ? (
                myOrders.map(order => (
                  <div key={order.id} className="card dark:bg-stone-800 dark:border dark:border-stone-700 flex flex-col md:flex-row justify-between gap-4 hover:shadow-glass-lg transition-all">
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Order #{order.id}</p>
                      <p className="font-bold text-stone-900 dark:text-white">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{order.items.length} items • Rs. {order.total.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-900/30 text-rose-primary dark:text-rose-400 border border-rose-100 dark:border-rose-900 uppercase">
                        {order.status}
                      </span>
                      <a href={`#/orders/${order.id}`} className="text-stone-400 hover:text-rose-primary dark:hover:text-rose-400 transition-colors" title="View order details">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 glass dark:glass-dark rounded-[40px] border border-dashed border-stone-200 dark:border-stone-700">
                  <p className="text-stone-400 dark:text-stone-500 font-serif text-xl mb-4">No orders yet</p>
                  <a href="#/shop" className="text-rose-primary dark:text-rose-400 font-bold hover:underline">Go find your first bloom</a>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 404 - PAGE NOT FOUND
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center dark:bg-stone-900">
         <span className="text-6xl mb-6">🥀</span>
         <h2 className="text-3xl font-serif mb-4 text-stone-900 dark:text-white">Page Not Found</h2>
         <p className="text-stone-500 dark:text-stone-400 mb-8">We couldn't find the page you're looking for.</p>
         <a href="#/" className="btn-primary">Return Home</a>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Header with navigation */}
      <div className="relative">
        <Header />
        {/* Dark mode toggle button - positioned in top-right */}
        <button
          onClick={toggleDark}
          className="absolute top-4 right-20 z-40 p-2 rounded-full border border-rose-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            // Sun icon when dark mode is ON
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon when dark mode is OFF
            <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Main content area - grows to fill available space */}
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {/* Footer - always at bottom */}
      <Footer />
    </div>
  );
};

/**
 * App component - Root of the entire application.
 * 
 * Responsibilities:
 * 1. Manage theme state (light/dark mode)
 * 2. Persist theme preference to localStorage
 * 3. Wrap app with AppProvider for global state (products, cart, user, etc.)
 * 4. Wrap with ErrorBoundary for crash prevention
 * 5. Render Router with theme props
 * 
 * THEME DETECTION LOGIC:
 * 1. Check localStorage for saved theme preference
 * 2. If not found, check system preference using prefers-color-scheme media query
 * 3. Default to light mode
 */
const App: React.FC = () => {
  // Initialize dark mode from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  /**
   * Toggle dark mode and persist preference to localStorage
   */
  const toggleDark = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  /**
   * Apply dark mode class to document root for Tailwind dark mode
   * Tailwind uses the 'dark' class on root element to apply dark styles
   */
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    // AppProvider gives all child components access to global state
    <AppProvider>
      {/* ErrorBoundary catches any component errors and shows fallback UI */}
      <ErrorBoundary>
        <Router isDark={isDark} toggleDark={toggleDark} />
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
