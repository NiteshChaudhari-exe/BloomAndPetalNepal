
/**
 * @file types.ts
 * @description Core TypeScript type definitions and interfaces used throughout the application.
 * This file defines all the data structures for products, orders, users, and other core entities.
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 * 
 * USAGE:
 * - Import types as needed: import { Product, Order, User } from './types';
 * - Always use these interfaces for type safety and consistency
 * - Add new types here when extending functionality
 */

/**
 * Category enum represents the different product categories available in the shop.
 * Used for filtering, organizing, and categorizing products.
 * 
 * @enum {string}
 * @example
 * const category: Category = Category.BOUQUETS;
 */
export enum Category {
  FRESH_FLOWERS = 'Fresh Flowers',  // Natural, fresh flowers from local farmers
  BOUQUETS = 'Bouquets',             // Pre-arranged flower bouquets
  HANDMADE = 'Handmade Items',       // Artisanal items like candles, perfumes, crafts
  GIFTS = 'Gifts',                   // Gift hampers and curated gift sets
  CUSTOM = 'Custom Orders'           // Custom arrangements and special requests
}

/**
 * OrderStatus enum represents the lifecycle states of an order.
 * Used to track order progress from creation to delivery.
 * 
 * @enum {string}
 * @example
 * const status: OrderStatus = OrderStatus.PENDING;
 * 
 * WORKFLOW: PENDING → CONFIRMED → PACKED → OUT_FOR_DELIVERY → DELIVERED
 *           or → CANCELLED at any stage
 */
export enum OrderStatus {
  PENDING = 'Pending',              // Order received, awaiting confirmation
  CONFIRMED = 'Confirmed',          // Order confirmed and approved
  PACKED = 'Packed',                // Items have been packed and ready to ship
  OUT_FOR_DELIVERY = 'Out for Delivery',  // Order is with delivery partner
  DELIVERED = 'Delivered',          // Order successfully delivered
  CANCELLED = 'Cancelled'           // Order cancelled by user or admin
}

/**
 * Product interface represents a flower/gift item that can be purchased.
 * Contains all information needed to display and manage a product.
 * 
 * @interface Product
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Display name of the product
 * @property {Category} category - Product category for organization
 * @property {number} price - Price in NPR (Nepali Rupees)
 * @property {string} description - Detailed product description
 * @property {string[]} images - Array of image URLs (first is main image)
 * @property {number} stock - Available quantity in inventory
 * @property {boolean} featured - Whether to display on home/featured sections
 * @property {string[]} [occasions] - Optional: occasions suitable for this product (Birthday, Anniversary, etc.)
 * 
 * @example
 * const rose: Product = {
 *   id: '1',
 *   name: 'Red Rose Bouquet',
 *   category: Category.BOUQUETS,
 *   price: 3500,
 *   description: '...',
 *   images: ['url1', 'url2'],
 *   stock: 10,
 *   featured: true,
 *   occasions: ['Anniversary', 'Wedding']
 * };
 */
export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  images: string[];
  stock: number;
  featured: boolean;
  occasions?: string[];
}

/**
 * CartItem interface represents an item added to the shopping cart.
 * Stores the quantity and any custom notes the user adds.
 * 
 * @interface CartItem
 * @property {string} productId - ID of the product being added
 * @property {number} quantity - Number of units of this product
 * @property {string} [customNote] - Optional: custom message/note (e.g., "Happy Birthday Jane")
 * 
 * @example
 * const cartItem: CartItem = {
 *   productId: '1',
 *   quantity: 2,
 *   customNote: 'Please include a greeting card'
 * };
 */
export interface CartItem {
  productId: string;
  quantity: number;
  customNote?: string;
}

/**
 * User interface represents a customer or admin in the system.
 * Stores authentication and profile information.
 * 
 * @interface User
 * @property {string} id - Unique user identifier
 * @property {string} name - User's full name
 * @property {string} email - Email address (unique identifier)
 * @property {'Admin' | 'Staff' | 'Customer'} role - User's role determining permissions
 *   - Admin: Full access to all features and admin panel
 *   - Staff: Limited admin capabilities for order management
 *   - Customer: Standard user with shop and order viewing access
 * @property {string} [address] - Optional: delivery address
 * @property {string} [phone] - Optional: contact phone number
 * 
 * @example
 * const user: User = {
 *   id: 'user123',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'Customer',
 *   address: 'Kathmandu, Nepal',
 *   phone: '+977-9841234567'
 * };
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Customer';
  address?: string;
  phone?: string;
}

/**
 * Order interface represents a complete purchase order.
 * Contains all information about a customer's order including items, total, and status.
 * 
 * @interface Order
 * @property {string} id - Unique order identifier (e.g., "ORD-20250109-001")
 * @property {string} userId - ID of the customer who placed the order
 * @property {CartItem[]} items - Array of items in the order with quantities
 * @property {number} total - Total order amount in NPR (includes all items)
 * @property {OrderStatus} status - Current status in the order lifecycle
 * @property {string} shippingAddress - Full delivery address
 * @property {string} deliveryDate - Expected delivery date (ISO format)
 * @property {'COD' | 'eSewa' | 'IME Pay' | 'Bank Transfer'} paymentMethod 
 *   Payment method used:
 *   - COD: Cash On Delivery (payment at delivery)
 *   - eSewa: eSewa mobile payment
 *   - IME Pay: IME Pay mobile payment
 *   - Bank Transfer: Direct bank transfer
 * @property {string} createdAt - Order creation timestamp (ISO format)
 * 
 * @example
 * const order: Order = {
 *   id: 'ORD-20250109-001',
 *   userId: 'user123',
 *   items: [{ productId: '1', quantity: 2 }],
 *   total: 7000,
 *   status: OrderStatus.CONFIRMED,
 *   shippingAddress: 'Kathmandu, Nepal',
 *   deliveryDate: '2025-01-12',
 *   paymentMethod: 'COD',
 *   createdAt: '2025-01-09T10:30:00Z'
 * };
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  deliveryDate: string;
  paymentMethod: 'COD' | 'eSewa' | 'IME Pay' | 'Bank Transfer';
  createdAt: string;
}

/**
 * Review interface represents a customer review/rating for a product.
 * Stores feedback from customers about their purchase experience.
 * 
 * @interface Review
 * @property {string} id - Unique review identifier
 * @property {string} productId - ID of the product being reviewed
 * @property {string} userId - ID of the customer who left the review
 * @property {string} userName - Display name of the reviewer
 * @property {number} rating - Star rating (1-5)
 * @property {string} comment - Text review/feedback
 * @property {string} createdAt - Review creation timestamp (ISO format)
 * 
 * @example
 * const review: Review = {
 *   id: 'rev123',
 *   productId: '1',
 *   userId: 'user123',
 *   userName: 'John Doe',
 *   rating: 5,
 *   comment: 'Beautiful roses, fresh delivery!',
 *   createdAt: '2025-01-09T10:30:00Z'
 * };
 */
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
