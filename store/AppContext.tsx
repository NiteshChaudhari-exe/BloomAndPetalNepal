/**
 * @file AppContext.tsx
 * @description Global state management using React Context API.
 * Manages all application state: products, cart, user, and orders.
 * All state is persisted to localStorage for data persistence.
 * 
 * ARCHITECTURE OVERVIEW:
 * - AppProvider: Component that wraps the app and provides global state
 * - useApp(): Custom hook to access global state from any component
 * - All state automatically synced to localStorage via useEffect
 * 
 * STATE PERSISTENCE:
 * - bloom_products: Product catalog
 * - bloom_cart: Shopping cart items
 * - bloom_user: Current logged-in user
 * - bloom_orders: Order history
 * 
 * AUTHENTICATION NOTE:
 * This is a demo implementation with mock authentication.
 * For production, replace with real authentication (JWT, OAuth, etc.)
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, OrderStatus } from '../types';
import { MOCK_PRODUCTS } from '../constants';

/**
 * AppContextType defines the shape of the global state and all available functions.
 * Every value and method here is accessible via useApp() hook.
 * 
 * @interface AppContextType
 */
interface AppContextType {
  // ===== STATE =====
  /** Array of all products available in the shop */
  products: Product[];
  
  /** Array of items in the current user's shopping cart */
  cart: CartItem[];
  
  /** Currently logged-in user (null if not authenticated) */
  user: User | null;
  
  /** Array of all orders placed (all users) */
  orders: Order[];

  // ===== CART FUNCTIONS =====
  /**
   * Add a product to the cart or increase quantity if already there
   * @param productId - ID of product to add
   * @param quantity - Number of units to add
   * @param customNote - Optional custom message (e.g., "Happy Birthday")
   */
  addToCart: (productId: string, quantity: number, customNote?: string) => void;

  /**
   * Remove an entire product from the cart
   * @param productId - ID of product to remove
   */
  removeFromCart: (productId: string) => void;

  /**
   * Update the quantity of a product already in the cart
   * @param productId - ID of product to update
   * @param quantity - New quantity (minimum 1)
   */
  updateCartQuantity: (productId: string, quantity: number) => void;

  /**
   * Remove all items from the cart
   */
  clearCart: () => void;

  // ===== AUTHENTICATION FUNCTIONS =====
  /**
   * Login user with email (mock implementation)
   * Auto-detects admin status if email contains 'admin'
   * @param email - User's email address
   */
  login: (email: string) => void;

  /**
   * Register a new user (mock implementation)
   * @param name - User's full name
   * @param email - User's email address
   * @param role - User's role ('Admin' or 'Customer')
   */
  register: (name: string, email: string, role: 'Admin' | 'Customer') => void;

  /**
   * Logout current user (clears user state but preserves cart)
   */
  logout: () => void;

  // ===== ORDER FUNCTIONS =====
  /**
   * Place a new order (creates order, decrements stock, clears cart)
   * @param order - Order data (id and createdAt generated automatically)
   */
  placeOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;

  /**
   * Update order status (for admin use)
   * @param orderId - ID of order to update
   * @param status - New order status
   */
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  /**
   * Get all orders for a specific user
   * @param userId - ID of user whose orders to retrieve
   * @returns Array of orders for that user
   */
  getUserOrders: (userId: string) => Order[];

  /**
   * Get a specific order by ID
   * @param orderId - ID of order to retrieve
   * @returns Order object or undefined if not found
   */
  getOrderById: (orderId: string) => Order | undefined;

  /**
   * Get notifications for a user's orders (status updates, delivery info)
   * @param userId - ID of user
   * @returns Array of order notifications
   */
  getOrderNotifications: (userId: string) => Array<{ orderId: string; status: OrderStatus; timestamp: string }>;

  // ===== PRODUCT FUNCTIONS (ADMIN) =====
  /**
   * Create or update a product (admin only)
   * @param product - Product data to create/update
   */
  updateProduct: (product: Product) => void;

  /**
   * Delete a product from the catalog (admin only)
   * @param id - ID of product to delete
   */
  deleteProduct: (id: string) => void;

  // ===== USER FUNCTIONS =====
  /**
   * Update user profile information
   * @param updates - Partial user data to update
   */
  updateUserProfile: (updates: Partial<User>) => void;
}

// Create the context (initial value will be provided by AppProvider)
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProvider component - wraps entire app to provide global state.
 * 
 * IMPORTANT: Wrap your app with this component:
 * @example
 * <AppProvider>
 *   <App />
 * </AppProvider>
 * 
 * All state is automatically persisted to localStorage and restored on app load.
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ===== STATE INITIALIZATION =====
  // Each state is initialized from localStorage if available, otherwise uses default value

  /**
   * Products state - initialized from localStorage or MOCK_PRODUCTS
   * Product stock decreases as orders are placed
   */
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bloom_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  /**
   * Cart state - array of items user has added
   * Persisted so cart survives page refreshes
   */
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bloom_cart');
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * User state - null if logged out, User object if logged in
   * Persisted so user stays logged in across sessions
   */
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bloom_user');
    return saved ? JSON.parse(saved) : null;
  });

  /**
   * Orders state - complete history of all orders
   * Used for admin dashboard, order tracking, and notifications
   */
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bloom_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // ===== AUTO-PERSISTENCE (localStorage sync) =====
  // These useEffect hooks save state to localStorage whenever it changes
  // This allows data to survive page refreshes and browser restarts

  useEffect(() => {
    localStorage.setItem('bloom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bloom_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bloom_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bloom_orders', JSON.stringify(orders));
  }, [orders]);

  // ===== CART MANAGEMENT FUNCTIONS =====

  /**
   * Add product to cart or increase quantity if already in cart
   * Preserves custom note if provided
   */
  const addToCart = (productId: string, quantity: number, customNote?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        // Item already in cart - increase quantity
        return prev.map(item => item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity, customNote } 
          : item
        );
      }
      // New item - add to cart
      return [...prev, { productId, quantity, customNote }];
    });
  };

  /**
   * Remove entire product from cart (regardless of quantity)
   */
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  /**
   * Update quantity of item in cart
   * Prevents quantity from going below 1
   */
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  /**
   * Clear entire cart (used after successful order)
   */
  const clearCart = () => setCart([]);

  // ===== AUTHENTICATION FUNCTIONS =====

  /**
   * Login with email (mock implementation)
   * Automatically detects admin role if email contains 'admin'
   * 
   * SECURITY NOTE: This is a demo implementation.
   * For production:
   * - Use proper authentication server
   * - Never store passwords in localStorage
   * - Use JWT tokens or OAuth
   * - Implement proper session management
   */
  const login = (email: string) => {
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 5),
      name: email.split('@')[0].toUpperCase(),
      email,
      role: email.includes('admin') ? 'Admin' : 'Customer',
      address: 'Baneshwor, Kathmandu'
    };
    setUser(mockUser);
  };

  /**
   * Register new user (mock implementation)
   * 
   * SECURITY NOTE: This is a demo implementation.
   * For production, implement proper registration with:
   * - Password hashing
   * - Email verification
   * - Input validation
   * - Backend storage
   */
  const register = (name: string, email: string, role: 'Admin' | 'Customer' = 'Customer') => {
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 5),
      name,
      email,
      role,
      address: 'Kathmandu, Nepal'
    };
    setUser(mockUser);
  };

  /**
   * Logout user
   * NOTE: Cart is preserved after logout (user can continue shopping as guest)
   */
  const logout = () => {
    setUser(null);
    // Don't clear cart - preserve for next session
  };

  // ===== ORDER MANAGEMENT FUNCTIONS =====

  /**
   * Place an order
   * 
   * PROCESS:
   * 1. Decrement product stock for each item ordered
   * 2. Generate unique order ID
   * 3. Add timestamp
   * 4. Save to orders array
   * 5. Clear shopping cart
   * 
   * INVENTORY MANAGEMENT:
   * Stock can't go below 0 to prevent negative inventory
   */
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    // Decrement product stock
    setProducts(prev => prev.map(p => {
      const orderItem = orderData.items.find(item => item.productId === p.id);
      if (orderItem) {
        // Reduce stock by ordered quantity (never go below 0)
        return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
      }
      return p;
    }));

    // Create new order with auto-generated ID and timestamp
    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString()
    };
    
    // Add order to history (newest first)
    setOrders(prev => [newOrder, ...prev]);
    
    // Clear cart after successful order
    clearCart();
  };

  /**
   * Update order status (for admin dashboard)
   * Status progression: PENDING → CONFIRMED → PACKED → OUT_FOR_DELIVERY → DELIVERED
   */
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  /**
   * Get all orders for a specific user (for user dashboard)
   */
  const getUserOrders = (userId: string) => {
    return orders.filter(o => o.userId === userId);
  };

  /**
   * Get specific order by ID (for order detail page)
   */
  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  /**
   * Get order notifications for user
   * Used for displaying delivery status, updates, etc. in notification system
   */
  const getOrderNotifications = (userId: string) => {
    return getUserOrders(userId).map(order => ({
      orderId: order.id,
      status: order.status,
      timestamp: order.createdAt
    }));
  };

  // ===== PRODUCT MANAGEMENT FUNCTIONS (ADMIN) =====

  /**
   * Update or create a product (admin functionality)
   * If product with same ID exists, updates it; otherwise creates new product
   */
  const updateProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        // Update existing product
        return prev.map(p => p.id === product.id ? product : p);
      }
      // Create new product (add to beginning of list)
      return [product, ...prev];
    });
  };

  /**
   * Delete product from catalog (admin functionality)
   * Note: This removes the product but doesn't affect existing orders
   */
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ===== USER PROFILE FUNCTIONS =====

  /**
   * Update user profile (name, address, phone, etc.)
   * Only updates if user is logged in
   */
  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
    }
  };

  // ===== PROVIDE CONTEXT =====

  return (
    <AppContext.Provider value={{
      products, cart, user, orders,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      login, register, logout, placeOrder, updateProduct, deleteProduct, updateOrderStatus,
      updateUserProfile, getUserOrders, getOrderById, getOrderNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * useApp - Custom hook to access global state
 * 
 * USAGE:
 * @example
 * const { user, cart, addToCart } = useApp();
 * 
 * IMPORTANT:
 * - Must be called from a component inside <AppProvider>
 * - Throws error if used outside AppProvider
 * - Never use in event handlers outside React render cycle
 * 
 * @returns {AppContextType} All state and functions
 * @throws Error if used outside AppProvider
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};