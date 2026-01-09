/**
 * @file LoadingSkeleton.tsx
 * @description Skeleton loading components for perceived performance improvement.
 * 
 * CONCEPT - Skeleton Loading:
 * Instead of showing nothing while content loads, show a "skeleton" outline that matches
 * the actual content layout. This makes the page feel faster and more responsive.
 * 
 * WHEN TO USE:
 * - While fetching data from API
 * - While rendering complex components
 * - Instead of traditional spinners for better UX
 * 
 * USAGE EXAMPLE:
 * @example
 * const [loading, setLoading] = useState(true);
 * return loading ? <LoadingProductSkeleton /> : <ProductList />;
 * 
 * COMPONENTS PROVIDED:
 * - LoadingProductSkeleton: Shows 6 product cards skeleton
 * - LoadingCheckoutSkeleton: Shows checkout form fields skeleton
 * - LoadingCartSkeleton: Shows 3 cart items skeleton
 * - LoadingDetailSkeleton: Shows product detail page skeleton
 * 
 * DESIGN:
 * - Uses gradient animations (shimmer effect) to indicate loading
 * - Matches actual component layouts exactly
 * - Supports dark mode with different colors
 * - Fully responsive design
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

import React from 'react';

/**
 * LoadingProductSkeleton - Skeleton for product grid/list pages
 * 
 * Displays 6 placeholder cards that match the product card layout:
 * - Image area (4:5 aspect ratio)
 * - Category badge
 * - Product name (2 lines)
 * - Price indicator
 * 
 * Used on: Shop page, Home page (Featured section)
 * 
 * @returns {React.ReactElement} 6 skeleton product cards
 */
export const LoadingProductSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Generate 6 skeleton cards */}
      {[...Array(6)].map((_, idx) => (
        <div 
          key={idx}
          className="card dark:bg-stone-800 dark:border dark:border-stone-700 animate-pulse"
        >
          {/* Image placeholder - matches product image aspect ratio */}
          <div className="aspect-[4/5] bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700" />
          
          {/* Content placeholders - matches product card content */}
          <div className="p-6 space-y-4">
            {/* Category badge placeholder */}
            <div className="h-3 w-20 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
            
            {/* Product name - 2 lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
              <div className="h-4 w-4/5 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
            </div>
            
            {/* Price placeholder */}
            <div className="h-3 w-24 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * LoadingCheckoutSkeleton - Skeleton for checkout/form pages
 * 
 * Displays 3 form sections with placeholder fields:
 * - Section header
 * - Input field (width: full)
 * - Input field (width: full)
 * - Submit button placeholder
 * 
 * Used on: Checkout page
 * 
 * @returns {React.ReactElement} Checkout form skeleton
 */
export const LoadingCheckoutSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Form sections - Shipping, Billing, Payment */}
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-4 p-6 glass dark:glass-dark rounded-2xl dark:border dark:border-stone-700">
          {/* Section header (e.g., "Shipping Address") */}
          <div className="h-6 w-40 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          
          {/* Form input fields */}
          <div className="space-y-3">
            <div className="h-10 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
            <div className="h-10 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          </div>
        </div>
      ))}
      
      {/* Submit button placeholder */}
      <div className="h-12 w-full bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded-xl" />
    </div>
  );
};

/**
 * LoadingCartSkeleton - Skeleton for shopping cart page
 * 
 * Displays:
 * - 3 cart item rows (image + product info + price/quantity)
 * - Order summary section
 * 
 * Each item shows:
 * - Product image (150px square)
 * - Product name and description
 * - Price and quantity controls
 * 
 * Used on: Cart page
 * 
 * @returns {React.ReactElement} Cart skeleton with items and summary
 */
export const LoadingCartSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Cart items - 3 placeholder items */}
      {[...Array(3)].map((_, idx) => (
        <div 
          key={idx}
          className="card dark:bg-stone-800 dark:border dark:border-stone-700 grid grid-cols-1 md:grid-cols-[150px_1fr_150px] gap-6 p-6"
        >
          {/* Product image placeholder */}
          <div className="aspect-square bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700 rounded" />
          
          {/* Product information placeholder */}
          <div className="space-y-3">
            {/* Product name */}
            <div className="h-4 w-40 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
            
            {/* Product description */}
            <div className="h-3 w-56 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          </div>
          
          {/* Price and quantity controls placeholder */}
          <div className="space-y-3">
            {/* Price */}
            <div className="h-4 w-20 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
            
            {/* Quantity controls */}
            <div className="h-8 w-20 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          </div>
        </div>
      ))}
      
      {/* Order summary placeholder */}
      <div className="p-6 glass dark:glass-dark rounded-2xl dark:border dark:border-stone-700 space-y-3">
        {/* Subtotal line */}
        <div className="h-4 w-32 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
        
        {/* Shipping line */}
        <div className="h-4 w-32 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
        
        {/* Total line (larger) */}
        <div className="h-6 w-40 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
      </div>
    </div>
  );
};

/**
 * LoadingDetailSkeleton - Skeleton for product detail pages
 * 
 * Displays:
 * - Large product image
 * - Thumbnail gallery (4 images)
 * - Product info (name, price, description, specs)
 * - Add to cart button
 * 
 * Used on: Product Details page
 * 
 * @returns {React.ReactElement} Product detail page skeleton
 */
export const LoadingDetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      {/* Image gallery section */}
      <div className="space-y-4">
        {/* Main image - square aspect ratio */}
        <div className="aspect-square bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700 rounded-2xl" />
        
        {/* Thumbnail gallery - 4 images */}
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="aspect-square bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          ))}
        </div>
      </div>
      {/* Product info */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 w-56 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          <div className="h-4 w-32 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
        </div>
        
        <div className="space-y-2">
          <div className="h-4 w-full bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
          <div className="h-4 w-5/6 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded" />
        </div>
        
        <div className="h-12 w-40 bg-gradient-to-r from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 rounded-xl" />
      </div>
    </div>
  );
};
