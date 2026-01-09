
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { LoadingCartSkeleton } from '../components/LoadingSkeleton';

export const Cart: React.FC = () => {
  const { cart, products, removeFromCart, updateCartQuantity } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [cart]);

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, product: p };
  }).filter(item => item.product);

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 250;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center py-32 animate-fade-in">
          <div className="text-8xl mb-8 animate-bounce-soft">🛒</div>
          <h2 className="text-4xl font-serif mb-4 text-stone-900 dark:text-white">Your Basket is Empty</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8 text-lg leading-relaxed">
            It seems you haven't added any flowers to your cart yet. Let's find something beautiful for that special moment!
          </p>
          <a 
            href="#/shop" 
            className="inline-block btn-primary hover:shadow-lg transition-all transform hover:scale-105"
          >
            🌹 Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <a href="#/shop" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm mb-6 inline-block">
            ← Continue Shopping
          </a>
          <h1 className="text-5xl font-serif text-stone-900 dark:text-white mb-2">🛍️ Your Basket</h1>
          <p className="text-stone-500 dark:text-stone-400">{cartDetails.length} item{cartDetails.length !== 1 ? 's' : ''} ready to bloom</p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 animate-stagger">
            {isLoading ? (
              <LoadingCartSkeleton />
            ) : cartDetails.length === 0 ? (
              <div className="text-center py-20 card dark:bg-stone-800/30 dark:border dark:border-stone-700 rounded-3xl">
                <div className="text-7xl mb-6 animate-bounce-soft">🛒</div>
                <h3 className="text-2xl font-serif text-stone-900 dark:text-white mb-3">Your basket is empty</h3>
                <p className="text-stone-600 dark:text-stone-400 mb-8">Ready to add some beautiful flowers?</p>
                <a href="#/shop" className="btn-primary inline-block">Continue Shopping</a>
              </div>
            ) : (
              cartDetails.map((item, index) => (
              <div 
                key={item.productId} 
                className="card dark:bg-stone-800 dark:border dark:border-stone-700 flex flex-col sm:flex-row gap-6 p-6 hover:shadow-glass-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-full sm:w-32 h-32 rounded-[25px] overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-700 relative">
                  <img 
                    src={item.product?.images[0]} 
                    alt={item.product?.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    title={item.product?.name}
                  />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-lg text-stone-900 dark:text-white truncate">
                        {item.product?.name}
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors ml-2 flex-shrink-0"
                        title="Remove from cart"
                        aria-label="Remove product from cart"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-xl font-bold bg-gradient-rose text-transparent bg-clip-text mb-3">
                      Rs. {item.product?.price.toLocaleString()}
                    </p>

                    {item.customNote && (
                      <div className="text-xs text-stone-600 dark:text-stone-400 italic bg-stone-100 dark:bg-stone-900 p-3 rounded-[15px] mb-3 border-l-2 border-rose-primary">
                        💌 "{item.customNote}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 rounded-[15px] p-1">
                      <button 
                        onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900 rounded-xl transition-colors font-bold text-stone-900 dark:text-white"
                        title="Decrease quantity"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-stone-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900 rounded-xl transition-colors font-bold text-stone-900 dark:text-white"
                        title="Increase quantity"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-bold text-stone-900 dark:text-white whitespace-nowrap">
                      Rs. {((item.product?.price || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>

          {/* Order Summary Sticky Sidebar */}
          <aside className="animate-slide-in-right">
            <div className="card glass dark:glass-dark dark:bg-stone-800/50 dark:border dark:border-stone-700 p-8 sticky top-24 space-y-6 rounded-[40px]">
              <h2 className="text-2xl font-serif text-stone-900 dark:text-white flex items-center gap-2">
                📋 Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 py-6 border-y border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 dark:text-stone-400">Subtotal ({cartDetails.length} item{cartDetails.length !== 1 ? 's' : ''})</span>
                  <span className="font-bold text-stone-900 dark:text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 dark:text-stone-400">Delivery Fee</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-stone-900 dark:text-white'}`}>
                    {deliveryFee === 0 ? '🎉 FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 5000 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 rounded-[15px] p-3">
                    <p className="text-[11px] text-orange-700 dark:text-orange-400 font-bold uppercase tracking-widest mb-1">
                      🎁 Free Delivery Offer
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Add Rs. {(5000 - subtotal).toLocaleString()} more for FREE delivery!
                    </p>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-serif text-stone-900 dark:text-white">Total Amount</span>
                  <span className="font-bold text-2xl bg-gradient-rose text-transparent bg-clip-text">
                    Rs. {(subtotal + deliveryFee).toLocaleString()}
                  </span>
                </div>

                <a 
                  href="#/checkout" 
                  className="block w-full py-4 bg-gradient-rose text-white text-center rounded-[25px] font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest"
                >
                  💳 Proceed to Checkout
                </a>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                    <span className="text-lg">🔒</span>
                    <span>Secure checkout with eSewa & IME Pay</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                    <span className="text-lg">🚚</span>
                    <span>Scheduled delivery across Kathmandu</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                    <span className="text-lg">✨</span>
                    <span>Fresh flowers guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

