# ⚡ Quick Reference Guide

## Essential Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:3001
npm run build        # Create production build
npm run preview      # Preview production build
npm test             # Run all tests
```

### Testing
```bash
npm test -- --watch       # Watch mode
npm test -- --coverage    # With coverage report
npm test -- AppContext    # Single test file
```

### Code Quality
```bash
npm run type-check        # TypeScript errors
npm run analyze-bundle    # Bundle size analysis
```

---

## File Navigation

### 🏠 Pages (`/pages`)
| File | Purpose |
|------|---------|
| `Home.tsx` | Landing page with seasonal themes |
| `Shop.tsx` | Product catalog with debounced search |
| `ProductDetails.tsx` | Single product with AI recommendations |
| `Cart.tsx` | Shopping cart with glassmorphism |
| `Checkout.tsx` | Order placement form |
| `Login.tsx` | Authentication page |
| `Profile.tsx` | User profile editing |
| `OrderDetails.tsx` | Order tracking with timeline |
| `Occasions.tsx` | Browse by occasion |
| `AdminDashboard.tsx` | Admin product management |
| `Header.tsx` | Navigation with mobile menu |
| `Footer.tsx` | Footer with newsletter |

### 🧩 Components (`/components`)
| File | Purpose |
|------|---------|
| `ErrorBoundary.tsx` | Catch React errors gracefully |
| `LoadingSkeleton.tsx` | Loading placeholders |
| `ProductEditModal.tsx` | CRUD form for products |
| `OrderNotifications.tsx` | Order status notifications |

### 🔧 Services (`/services`)
| File | Purpose |
|------|---------|
| `aiService.ts` | Google Generative AI integration |
| `performanceOptimization.ts` | Performance utilities |

### 📦 State (`/store`)
| File | Purpose |
|------|---------|
| `AppContext.tsx` | Global state management |

---

## API/Context Usage

### Get Global State
```tsx
const { 
  products,        // All products
  cart,           // Shopping cart items
  user,           // Current user
  orders          // User orders
} = useApp();
```

### Add to Cart
```tsx
const { addToCart } = useApp();
addToCart(productId, quantity, customNote);
```

### Create Order
```tsx
const { placeOrder } = useApp();
const orderId = placeOrder(deliveryAddress, notes);
```

### Admin Functions
```tsx
const { addProduct, updateProduct, deleteProduct } = useApp();
addProduct({ name, price, description, ... });
updateProduct(id, updatedData);
deleteProduct(id);
```

---

## Component Import Examples

### Page Navigation
```tsx
// In App.tsx routing
if (hash === '#/shop') return <Shop />;
if (hash.startsWith('#/product/')) {
  const id = hash.split('#/product/')[1];
  return <ProductDetails id={id} />;
}
```

### Error Boundary
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Loading Skeleton
```tsx
import { LoadingProductSkeleton } from '../components/LoadingSkeleton';

{isLoading ? <LoadingProductSkeleton /> : <ProductGrid />}
```

---

## Design System Quick Reference

### Buttons
```tsx
// Primary button
<button className="btn-primary">Click me</button>

// Secondary button  
<button className="btn-secondary">Click me</button>

// With gradient
<button className="bg-gradient-rose text-white">Click me</button>
```

### Cards
```tsx
// Standard card
<div className="card">Content</div>

// Glassmorphic card
<div className="card glass dark:glass-dark">Content</div>
```

### Gradients
```tsx
// Available gradients
className="bg-gradient-rose"      // Rose gradient
className="bg-gradient-electric"  // Electric gradient
className="bg-gradient-neon"      // Neon gradient
```

### Animations
```tsx
// Fade in
className="animate-fade-in"

// Slide in
className="animate-slide-in-right"

// Bounce
className="animate-bounce-soft"

// Stagger
className="animate-stagger"
```

### Dark Mode
```tsx
// Light/Dark support
className="text-stone-900 dark:text-white"
className="bg-white dark:bg-stone-800"
className="border-stone-200 dark:border-stone-700"
```

---

## Common Tasks

### Add New Page
1. Create file in `/pages/YourPage.tsx`
2. Add route in `App.tsx`:
   ```tsx
   if (hash === '#/yourpage') return <YourPage />;
   ```
3. Add navigation link in `Header.tsx`

### Add New Component
1. Create file in `/components/YourComponent.tsx`
2. Export as named export
3. Import where needed

### Add New Product
```tsx
const { addProduct } = useApp();
addProduct({
  name: 'Rose Bouquet',
  price: 2500,
  description: 'Beautiful red roses',
  category: 'roses',
  images: ['url1', 'url2'],
  stock: 10,
  featured: true
});
```

### Modify Styling
1. Tailwind CSS in `index.css`
2. Custom styles in `tailwind.config.cjs`
3. Animations in `index.css`

---

## Performance Tips

### Optimize Search
```tsx
// Already implemented with debounce
const [debouncedSearch, setDebouncedSearch] = useState('');
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500);
  return () => clearTimeout(timer);
}, [searchQuery]);
```

### Lazy Load Images
```tsx
// Use intersection observer
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    setImageSrc(actualSrc);
  }
});
```

### Memoize Expensive Computations
```tsx
const filteredProducts = useMemo(() => {
  return products.filter(/* expensive filter */);
}, [products, filter]);
```

---

## Deployment Quick Links

- **Vercel:** `vercel --prod`
- **Netlify:** `netlify deploy --prod`
- **GitHub Pages:** `npm run build && npm run deploy`
- **Docker:** `docker build -t bloom-petal . && docker run -p 3000:3000 bloom-petal`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
```bash
# Check for TypeScript errors
npm run type-check

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Tests Fail
```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

---

## Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://your-api.com
VITE_GOOGLE_API_KEY=your_key
```

---

## Useful Links

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Jest Docs](https://jestjs.io/docs/getting-started)

---

## Project Stats

| Metric | Value |
|--------|-------|
| Total Features | 44/44 ✅ |
| Pages Created | 12 |
| Components | 4 |
| Services | 2 |
| TypeScript | 100% |
| Test Files | 2 |
| Documentation | 4 files |
| Production Ready | ✅ Yes |

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** Production Ready 🚀
