# Bloom & Petal Nepal - Complete Developer Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Key Concepts](#key-concepts)
7. [How To...](#how-to)
8. [Common Patterns](#common-patterns)
9. [Testing](#testing)
10. [Performance](#performance)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Bloom & Petal Nepal** is a full-featured e-commerce platform for selling flowers, bouquets, and handmade gifts in Nepal.

### Key Features
- ✅ Product catalog with advanced search and filtering
- ✅ Shopping cart with persistent storage
- ✅ User authentication (mock implementation)
- ✅ Order management and tracking
- ✅ Admin dashboard for staff
- ✅ Dark mode support
- ✅ Seasonal themes
- ✅ Newsletter signup
- ✅ Error handling with graceful fallbacks
- ✅ Responsive mobile design
- ✅ Performance optimizations (debounced search, lazy loading)

### Project Metrics
- **Total Features**: 44 implemented
- **Pages**: 12 full pages
- **Components**: 4 major reusable components
- **Services**: 2 service modules
- **Test Files**: 2 test suites with examples
- **Documentation**: 4 comprehensive markdown files

---

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────┐
│           Vite (Build Tool)         │
│  Hot Module Replacement Development │
└──────────────────┬──────────────────┘
                   │
┌──────────────────▼──────────────────┐
│     React 19 (UI Framework)         │
│   Functional Components + Hooks     │
└──────────────────┬──────────────────┘
                   │
┌──────────────────▼──────────────────┐
│  AppContext (Global State Manager)  │
│  - Products  - Cart  - User - Orders│
└──────────────────┬──────────────────┘
                   │
┌──────────────────▼──────────────────┐
│   12 Pages + 4 Components          │
│  Tailwind CSS Styling               │
│  Hash-based Routing (SPA)          │
└─────────────────────────────────────┘
```

### State Management Flow

```
AppContext (Global State)
    ↓
    ├── Products: Product[]
    ├── Cart: CartItem[]
    ├── User: User | null
    └── Orders: Order[]

useApp() Hook
    ↓
Used in any component inside AppProvider
    ↓
Component can read/modify global state
```

### Data Persistence

All state is automatically saved to localStorage:
```javascript
// Automatic sync to localStorage
bloom_products     // Product catalog
bloom_cart         // Shopping cart
bloom_user         // Current logged-in user
bloom_orders       // Order history
bloom_theme        // Dark/light mode preference
```

---

## Tech Stack

### Frontend
- **React 19** - UI framework with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **React Context** - Global state management

### Development & Build
- **Jest** - Testing framework
- **ts-jest** - TypeScript support in Jest
- **Vite** - Development server with HMR

### Backend (Future)
- Currently mock implementation with localStorage
- Plan to replace with:
  - Node.js/Express backend
  - MongoDB or PostgreSQL database
  - JWT authentication
  - Payment gateway integration

### Styling System
- **Tailwind CSS** with custom extensions
  - Glass morphism effects (`.glass`, `.glass-dark`)
  - Gradient utilities (`.bg-gradient-rose`, `.bg-gradient-electric`)
  - Animation system (50+ animations)
  - Dark mode support throughout

---

## Getting Started

### Prerequisites
- Node.js 16+ (18+ recommended)
- npm 8+ or yarn
- Git
- A code editor (VS Code recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/YourUsername/BloomAndPetalNepal.git
cd BloomAndPetalNepal

# Install dependencies
npm install

# Create .env file (optional, for API keys)
# See .env.example for template
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

### Available Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Build
npm run build            # Create production bundle
npm run preview          # Preview production build locally

# Testing
npm test                 # Run all tests once
npm test -- --watch     # Watch mode (rerun on changes)
npm test -- --coverage  # Generate coverage report

# CI/CD
npm run type-check       # TypeScript type checking (if configured)
```

---

## Project Structure

```
bloom_and_petal_nepal/
├── components/                 # Reusable React components
│   ├── ErrorBoundary.tsx      # Graceful error handling
│   ├── Layout.tsx             # Layout wrapper
│   ├── LoadingSkeleton.tsx    # 4 skeleton variants
│   ├── OrderNotifications.tsx # Order status notifications
│   └── ProductEditModal.tsx   # Admin product editing
│
├── pages/                      # Full-page components
│   ├── Home.tsx               # Landing page with seasonal themes
│   ├── Shop.tsx               # Product catalog with filters
│   ├── ProductDetails.tsx     # Single product detail
│   ├── Cart.tsx               # Shopping cart
│   ├── Checkout.tsx           # Order checkout
│   ├── OrderDetails.tsx       # View order tracking
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer with newsletter
│   ├── Login.tsx              # User authentication
│   ├── Profile.tsx            # User profile management
│   ├── AdminDashboard.tsx     # Admin panel
│   └── Occasions.tsx          # Browse by occasion
│
├── store/                      # Global state management
│   └── AppContext.tsx         # React Context with all state logic
│
├── services/                   # Utility services
│   ├── aiService.ts           # AI recommendations (Google Generative AI)
│   └── performanceOptimization.ts # Performance utilities
│
├── __tests__/                  # Test files
│   ├── AppContext.test.tsx    # State management tests
│   └── utilities.test.ts      # Utility function tests
│
├── types.ts                    # TypeScript interfaces & enums
├── constants.tsx              # Mock data & constants
├── App.tsx                    # Root component with routing
├── index.tsx                  # React app entry point
├── index.html                 # HTML template
├── vite.config.ts            # Vite build configuration
├── jest.config.js            # Jest testing configuration
├── jest.setup.ts             # Jest environment setup
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.cjs       # Tailwind CSS configuration
└── postcss.config.cjs        # PostCSS configuration
```

### What Goes Where?

| File Type | Location | Purpose |
|-----------|----------|---------|
| Page/Screen | `pages/` | Full pages (routes) |
| Reusable Component | `components/` | Used in multiple pages |
| Type Definition | `types.ts` | All interfaces & enums |
| Constants/Mock Data | `constants.tsx` | Static data |
| API/Business Logic | `services/` | Functions used across app |
| Global State Logic | `store/AppContext.tsx` | All state management |
| Tests | `__tests__/` | Test files |

---

## Key Concepts

### 1. Types & Interfaces

All TypeScript types are defined in `types.ts`. Key types:

```typescript
// Product in catalog
interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;  // In NPR
  description: string;
  images: string[];
  stock: number;
  featured: boolean;
  occasions?: string[];
}

// Item in shopping cart
interface CartItem {
  productId: string;
  quantity: number;
  customNote?: string;  // "Happy Birthday Jane"
}

// Authenticated user
interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Customer';
  address?: string;
  phone?: string;
}

// Customer order
interface Order {
  id: string;  // "ORD-123ABC"
  userId: string;
  items: CartItem[];
  total: number;  // In NPR
  status: OrderStatus;  // PENDING → CONFIRMED → ... → DELIVERED
  shippingAddress: string;
  deliveryDate: string;  // ISO format
  paymentMethod: 'COD' | 'eSewa' | 'IME Pay' | 'Bank Transfer';
  createdAt: string;  // ISO timestamp
}
```

### 2. Global State Management

Use the `useApp()` hook to access global state:

```typescript
import { useApp } from '../store/AppContext';

function MyComponent() {
  const {
    products,           // Product[]
    cart,              // CartItem[]
    user,              // User | null
    orders,            // Order[]
    addToCart,         // (id: string, qty: number, note?: string) => void
    removeFromCart,    // (id: string) => void
    updateCartQuantity,// (id: string, qty: number) => void
    clearCart,         // () => void
    login,             // (email: string) => void
    logout,            // () => void
    placeOrder,        // (order: Omit<Order, 'id'|'createdAt'>) => void
    // ... and more
  } = useApp();

  // Use in component
  useEffect(() => {
    console.log(`Cart has ${cart.length} items`);
  }, [cart]);

  const handleAddToCart = () => {
    addToCart('product-123', 2, 'Special note');
  };
}
```

### 3. Routing System

Uses hash-based routing (no external router library):

```typescript
// Navigation
window.location.hash = '#/shop';          // Go to shop
window.location.hash = '#/product/123';   // View product
window.location.hash = '#/cart';          // View cart
window.location.hash = '#/checkout';      // Checkout
window.location.hash = '#/dashboard';     // User dashboard
window.location.hash = '#/admin';         // Admin panel

// App.tsx handles routing
// Current hash → renderPage() → Returns appropriate component
```

### 4. Dark Mode

Dark mode is managed in `App.tsx`:

```typescript
// localStorage key: 'theme'
// Values: 'light' or 'dark'

// Read current mode
const isDarkMode = document.documentElement.classList.contains('dark');

// Tailwind dark mode works automatically
// dark: prefix applies when dark class on <html>
<div className="bg-white dark:bg-stone-900">
  {/* White in light mode, dark stone in dark mode */}
</div>
```

### 5. Error Boundaries

Wrap components to catch errors gracefully:

```typescript
// In App.tsx
<ErrorBoundary>
  <Router ... />
</ErrorBoundary>

// Errors in Router are caught, fallback UI shown
// User can click "Try Again" or "Go Home"
```

### 6. Loading Skeletons

Show skeleton while loading:

```typescript
import { LoadingProductSkeleton, LoadingCartSkeleton } from '../components/LoadingSkeleton';

function Shop() {
  const [loading, setLoading] = useState(true);

  return loading ? <LoadingProductSkeleton /> : <ProductList />;
}
```

---

## How To...

### Add a New Product (Hardcoded)

```typescript
// In constants.tsx
export const MOCK_PRODUCTS: Product[] = [
  // ... existing products
  {
    id: '7',
    name: 'Sunset Rose Bunch',
    category: Category.BOUQUETS,
    price: 2800,
    description: 'Orange and yellow roses symbolizing warmth.',
    images: ['https://picsum.photos/seed/sunset/800/800'],
    stock: 25,
    featured: false,
    occasions: ['Congratulations']
  }
];
```

### Add a Product from Admin Dashboard

```typescript
// AdminDashboard.tsx has product editing form
// Submits to:
const { updateProduct } = useApp();
updateProduct({
  id: 'new-' + Date.now(),  // Generate ID
  name: 'New Product',
  // ... rest of product data
});
// Automatically saved to localStorage and displayed
```

### Create a New Page

```typescript
// 1. Create new file: pages/MyPage.tsx
import React from 'react';
import { useApp } from '../store/AppContext';

export const MyPage: React.FC = () => {
  const { /* needed state */ } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel to-white dark:from-stone-900 dark:to-stone-850">
      {/* Your content */}
    </div>
  );
};

// 2. Import in App.tsx
import { MyPage } from './pages/MyPage';

// 3. Add route in Router.renderPage()
if (hash === '#/mypage') return <MyPage />;

// 4. Add navigation link
<a href="#/mypage" className="btn-primary">My Page</a>
```

### Handle Forms and Validation

```typescript
import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }

    // Success
    login(email);
    window.location.hash = '#/';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Access Current User

```typescript
const { user } = useApp();

if (!user) {
  // Show login prompt
  window.location.hash = '#/login';
  return null;
}

// User is logged in
console.log(user.name, user.email, user.role);

// Check admin
if (user.role !== 'Admin') {
  return <div>Admin only</div>;
}
```

### Place an Order

```typescript
const { cart, user, placeOrder } = useApp();

const handleCheckout = () => {
  if (!user) return;

  const order = {
    userId: user.id,
    items: cart,
    total: cartTotal,
    status: OrderStatus.PENDING,
    shippingAddress: '...',
    deliveryDate: '2025-01-12',
    paymentMethod: 'COD' as const
  };

  placeOrder(order);
  // Cart auto-cleared, order saved to localStorage
  // OrderNotifications component shows updates
};
```

### Search and Filter Products

```typescript
// In Shop.tsx - debounced search
const [searchQuery, setSearchQuery] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  // Wait 500ms before updating debouncedSearch
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500);
  return () => clearTimeout(timer);
}, [searchQuery]);

const filteredProducts = useMemo(() => {
  return products.filter(p => {
    // Multiple filter conditions
    const matchSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

    return matchSearch && matchCategory && matchPrice;
  });
}, [products, selectedCategory, debouncedSearch, priceRange]);
```

### Show Loading State

```typescript
import { LoadingCartSkeleton } from '../components/LoadingSkeleton';

function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useApp();

  return isLoading ? (
    <LoadingCartSkeleton />
  ) : cart.length === 0 ? (
    <div>Cart is empty</div>
  ) : (
    <CartItems items={cart} />
  );
}
```

### Format Currency (NPR)

```typescript
// Format as currency
const formatted = price.toLocaleString('en-NE', {
  style: 'currency',
  currency: 'NPR'
});
// Output: "Rs. 3,500.00"

// Or simple comma formatting
const simple = price.toLocaleString();
// Output: "3,500"

// Use in JSX
<span>Rs. {price.toLocaleString()}</span>
```

---

## Common Patterns

### Component Template

```typescript
/**
 * Brief description of what this component does.
 * 
 * PROPS:
 * - prop1: Description
 * - prop2: Description
 * 
 * STATE:
 * - state1: What it tracks
 * 
 * SIDE EFFECTS:
 * - What happens on mount/update
 */
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';

interface ComponentProps {
  title: string;
  onClose?: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ title, onClose }) => {
  const { products, cart } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Side effect logic
  }, []);

  return (
    <div className="rounded-lg bg-white dark:bg-stone-800 p-6">
      <h1 className="text-3xl font-serif dark:text-white">{title}</h1>
      {/* Content */}
    </div>
  );
};
```

### Conditional Rendering

```typescript
// Pattern 1: Simple if/else
{user ? (
  <div>Welcome, {user.name}</div>
) : (
  <a href="#/login">Login</a>
)}

// Pattern 2: Early return
if (!user) return <LoginPrompt />;
return <UserDashboard user={user} />;

// Pattern 3: Ternary with multiple conditions
{isLoading ? (
  <LoadingSkeleton />
) : cart.length === 0 ? (
  <EmptyState />
) : (
  <CartList items={cart} />
)}
```

### Tailwind Styling

```typescript
// Base styles
className="p-6 rounded-lg border border-stone-200"

// Dark mode
className="dark:bg-stone-800 dark:border-stone-700 dark:text-white"

// Hover effects
className="hover:shadow-lg hover:scale-105 transition-all"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Custom utilities (defined in tailwind.config.cjs)
className="glass dark:glass-dark"              // Glassmorphism
className="bg-gradient-rose"                    // Gradient
className="animate-fade-in animate-stagger"    // Animations

// Combining
className="p-6 rounded-2xl border border-stone-200 dark:border-stone-700 dark:bg-stone-800 hover:shadow-lg transition-all"
```

### Array Operations

```typescript
// Add to cart
const updatedCart = [...cart, { productId: '1', quantity: 2 }];

// Remove from cart
const updatedCart = cart.filter(item => item.productId !== 'remove-id');

// Update item in cart
const updatedCart = cart.map(item =>
  item.productId === 'update-id'
    ? { ...item, quantity: 5 }
    : item
);

// Find product by ID
const product = products.find(p => p.id === '123');

// Filter products
const featured = products.filter(p => p.featured === true);

// Sort by price
const sorted = [...products].sort((a, b) => a.price - b.price);

// Get total
const total = cart.reduce((sum, item) => sum + item.quantity, 0);
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode - rerun on file changes
npm test -- --watch

# Coverage report
npm test -- --coverage

# Run specific test file
npm test AppContext

# Run specific test
npm test -- -t "should add to cart"
```

### Writing Tests

```typescript
// __tests__/MyComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../components/MyComponent';

/**
 * Test suite for MyComponent
 */
describe('MyComponent', () => {
  /**
   * Test case 1: Renders correctly
   */
  it('should render with title', () => {
    render(<MyComponent title="Test Title" />);
    
    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  /**
   * Test case 2: Button click works
   */
  it('should call onClick handler when clicked', () => {
    const mockClick = jest.fn();
    render(<MyComponent onClick={mockClick} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(mockClick).toHaveBeenCalled();
  });

  /**
   * Test case 3: State management
   */
  it('should add to cart', () => {
    render(<MyComponent />);
    
    // Add to cart
    fireEvent.click(screen.getByText('Add to Cart'));
    
    // Verify
    expect(screen.getByText(/1 item/)).toBeInTheDocument();
  });
});
```

### Example: Testing AppContext

See `__tests__/AppContext.test.tsx` for full example with:
- Testing product filtering
- Testing cart operations
- Testing user authentication
- Testing localStorage persistence

---

## Performance

### Optimization Techniques Used

1. **Debounced Search** (500ms delay)
   - Prevents excessive filtering on every keystroke
   - See `Shop.tsx` for implementation

2. **useMemo** for expensive calculations
   - Filtered products only recalculated when dependencies change
   - Prevents unnecessary re-renders

3. **Lazy Image Loading**
   - IntersectionObserver watches images
   - Images load only when in viewport
   - Implementation in `performanceOptimization.ts`

4. **localStorage Caching**
   - App state cached in browser storage
   - No need to refetch on each load
   - Instantaneous page loads

5. **Code Splitting** (via Vite)
   - Routes can be lazy-loaded
   - Only load code needed for current page
   - Reduces initial bundle size

### Performance Tips

```typescript
// ✅ Good: useMemo prevents recalculation
const filteredProducts = useMemo(() => {
  return products.filter(p => p.name.includes(search));
}, [products, search]);

// ❌ Bad: Recalculated on every render
const filteredProducts = products.filter(p => p.name.includes(search));

// ✅ Good: Debounced input
const [search, setSearch] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => setDebouncedSearch(search), 500);
  return () => clearTimeout(timer);
}, [search]);

// ❌ Bad: Updates state on every keystroke
const handleSearch = (query) => setDebouncedSearch(query);

// ✅ Good: Lazy load images
<img src={url} loading="lazy" alt="..." />

// Use IntersectionObserver for more control
import { useLazyImage } from '../services/performanceOptimization';
```

---

## Troubleshooting

### Issue: Cart data disappears on refresh
**Solution**: localStorage is cleared or corrupted
- Check DevTools → Application → Local Storage
- Verify `bloom_cart` key exists
- Clear localStorage and refresh: `localStorage.clear()` in console

### Issue: User logout not working
**Solution**: Check AppContext logout function
```typescript
const logout = () => {
  setUser(null);
  // Don't clear cart intentionally
};
```

### Issue: Products not showing
**Solution**: Check products state in AppContext
```typescript
const { products } = useApp();
console.log('Products:', products);  // Debug
```

### Issue: Routes not working
**Solution**: Hash-based routing issues
```typescript
// Use hash URLs
window.location.hash = '#/shop';  // ✅ Correct
// Not standard URLs
window.location.hash = '/shop';   // ❌ Wrong
```

### Issue: Styles not applied
**Solution**: Tailwind CSS not working
- Ensure class names are spelled correctly
- Check if dark mode class applied to <html>
- Rebuild with `npm run dev`

### Issue: Tests failing
**Solution**: Check test setup
```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

### Issue: localStorage full (quota exceeded)
**Solution**: Too much data stored
```typescript
// Get storage size
const used = new Blob(Object.values(localStorage)).size;
console.log('Storage used:', used, 'bytes');

// Clear old data
localStorage.removeItem('bloom_old_key');
```

### Issue: Dark mode not persisting
**Solution**: Check localStorage theme key
```typescript
// Theme should be saved in localStorage
const saved = localStorage.getItem('theme');
console.log('Saved theme:', saved);  // Should be 'dark' or 'light'
```

---

## Deployment

### Before Deploying
1. ✅ Run tests: `npm test`
2. ✅ Check build: `npm run build`
3. ✅ Test production build: `npm run preview`
4. ✅ Update API endpoints (if using real backend)
5. ✅ Add environment variables to hosting platform
6. ✅ Remove mock data (replace with real API)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

See `DEPLOYMENT.md` for detailed guide with 5 platform options.

---

## Support & Resources

- **TypeScript**: https://www.typescriptlang.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Jest**: https://jestjs.io/docs
- **Vite**: https://vitejs.dev/guide

---

## Contributing

### Code Style
- Use TypeScript for type safety
- Follow existing code patterns
- Add comments for complex logic
- Keep components small and focused
- Name variables clearly

### Commit Messages
```
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
refactor: Refactor code
test: Add/update tests
```

### Pull Request Checklist
- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] Code follows existing style
- [ ] Added comments for complex parts
- [ ] Updated documentation

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Author**: Bloom & Petal Nepal Team
