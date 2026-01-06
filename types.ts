
export enum Category {
  FRESH_FLOWERS = 'Fresh Flowers',
  BOUQUETS = 'Bouquets',
  HANDMADE = 'Handmade Items',
  GIFTS = 'Gifts',
  CUSTOM = 'Custom Orders'
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  PACKED = 'Packed',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

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

export interface CartItem {
  productId: string;
  quantity: number;
  customNote?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Customer';
  address?: string;
  phone?: string;
}

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

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
