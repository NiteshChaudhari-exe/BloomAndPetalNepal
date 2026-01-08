
import React from 'react';
import { useApp } from '../store/AppContext';

export const Cart: React.FC = () => {
  const { cart, products, removeFromCart, updateCartQuantity } = useApp();

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, product: p };
  }).filter(item => item.product);

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce-soft">🛒</div>
          <h2 className="text-4xl font-serif mb-4 text-stone-900 dark:text-white">Your Basket is Empty</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8 text-lg leading-relaxed">
            It seems you haven't added any flowers to your cart yet. Let's find something beautiful for you!
          </p>
          <a href="#/shop" className="inline-block bg-gradient-rose text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105">
            🌹 Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <a href="#/shop" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm mb-4 inline-block">
            ← Continue Shopping
          </a>
          <h1 className="text-5xl font-serif mb-2 text-stone-900 dark:text-white">Shopping Basket</h1>
          <p className="text-stone-500 dark:text-stone-400">{cartDetails.length} {cartDetails.length === 1 ? 'item' : 'items'} in your basket</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartDetails.map((item, index) => (
              <div 
                key={item.productId} 
                className="card dark:bg-stone-800 dark:border dark:border-stone-700 overflow-hidden hover:shadow-glass-lg transition-all animate-fade-in group"
              >
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-36 h-36 rounded-[25px] overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-700">
                    <img 
                      src={item.product?.images[0]} 
                      alt={item.product?.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-serif text-xl text-stone-900 dark:text-white">{item.product?.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          title="Remove from cart"
                          aria-label="Remove from cart"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-2xl font-bold bg-gradient-rose text-transparent bg-clip-text mb-3">
                        Rs. {item.product?.price.toLocaleString()}
                      </p>

                      {item.customNote && (
                        <div className="text-sm text-stone-600 dark:text-stone-400 italic bg-stone-100 dark:bg-stone-700/50 p-3 rounded-[15px] mb-4 border-l-4 border-rose-primary">
                          💌 "{item.customNote}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-stone-500 dark:text-stone-400 font-medium uppercase">Qty:</span>
                        <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-700 rounded-full p-1">
                          <button 
                            onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-primary dark:hover:text-rose-400 flex items-center justify-center font-bold transition-colors"
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 text-center bg-transparent dark:text-white font-bold outline-none text-sm"
                            title="Quantity"
                          />
                          <button 
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-primary dark:hover:text-rose-400 flex items-center justify-center font-bold transition-colors"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">Subtotal</p>
                        <p className="text-2xl font-bold text-stone-900 dark:text-white">
                          Rs. {((item.product?.price || 0) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="card glass dark:glass-dark dark:border dark:border-stone-700 p-8 animate-fade-in">
              <h2 className="text-2xl font-serif mb-8 text-stone-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📋</span>
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8 pb-8 border-b border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
                  <span className="font-bold text-stone-900 dark:text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 dark:text-stone-400">Delivery Fee</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-stone-900 dark:text-white'}`}>
                    {deliveryFee === 0 ? '🎁 FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                {subtotal < 5000 && (
                  <div className="mt-4 p-3 rounded-[15px] bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50">
                    <p className="text-xs text-rose-700 dark:text-rose-400">
                      ✨ Add <span className="font-bold">Rs. {(5000 - subtotal).toLocaleString()}</span> more for FREE delivery!
                    </p>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mb-8 p-6 rounded-[20px] bg-gradient-rose text-white text-center">
                <p className="text-xs uppercase tracking-widest opacity-90 mb-2">Total Amount</p>
                <p className="text-4xl font-bold">Rs. {total.toLocaleString()}</p>
              </div>

              {/* Checkout Button */}
              <a 
                href="#/checkout" 
                className="block w-full py-4 bg-gradient-rose text-white text-center rounded-[20px] font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest mb-4"
              >
                🛍️ Proceed to Checkout
              </a>

              {/* Continue Shopping */}
              <a 
                href="#/shop" 
                className="block w-full py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-center rounded-[20px] font-bold hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
              >
                Continue Shopping
              </a>

              {/* Info Cards */}
              <div className="mt-8 space-y-4 pt-8 border-t border-stone-200 dark:border-stone-700">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💳</span>
                  <div className="text-xs text-stone-600 dark:text-stone-400">
                    <p className="font-bold text-stone-900 dark:text-white mb-1">Secure Payments</p>
                    <p>eSewa, IME Pay & Card accepted</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🚚</span>
                  <div className="text-xs text-stone-600 dark:text-stone-400">
                    <p className="font-bold text-stone-900 dark:text-white mb-1">Fast Delivery</p>
                    <p>Same-day delivery in Kathmandu</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌹</span>
                  <div className="text-xs text-stone-600 dark:text-stone-400">
                    <p className="font-bold text-stone-900 dark:text-white mb-1">Fresh Quality</p>
                    <p>100% fresh guarantee or refund</p>
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
