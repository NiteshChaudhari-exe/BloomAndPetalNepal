
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, OrderStatus } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  addToCart: (productId: string, quantity: number, customNote?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string) => void;
  register: (name: string, email: string, role: 'Admin' | 'Customer') => void;
  logout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getOrderNotifications: (userId: string) => Array<{ orderId: string; status: OrderStatus; timestamp: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bloom_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bloom_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bloom_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bloom_orders');
    return saved ? JSON.parse(saved) : [];
  });

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

  const addToCart = (productId: string, quantity: number, customNote?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity, customNote } 
          : item
        );
      }
      return [...prev, { productId, quantity, customNote }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const clearCart = () => setCart([]);

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

  const logout = () => {
    setUser(null);
    // Don't clear cart - preserve for next session
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    // Decrement product stock
    setProducts(prev => prev.map(p => {
      const orderItem = orderData.items.find(item => item.productId === p.id);
      if (orderItem) {
        return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
      }
      return p;
    }));

    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? product : p);
      }
      return [product, ...prev];
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
    }
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(o => o.userId === userId);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  const getOrderNotifications = (userId: string) => {
    return getUserOrders(userId).map(order => ({
      orderId: order.id,
      status: order.status,
      timestamp: order.createdAt
    }));
  };

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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
