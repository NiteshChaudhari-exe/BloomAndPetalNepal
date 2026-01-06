
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

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-32 px-4 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-serif mb-4">Your basket is empty</h2>
        <p className="text-stone-500 mb-8">It seems you haven't added any flowers to your cart yet. Let's find something beautiful!</p>
        <a href="#/shop" className="inline-block bg-rose-primary text-white px-8 py-3 rounded-full font-medium hover:bg-rose-800 transition-colors">
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif mb-12">Shopping Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartDetails.map(item => (
            <div key={item.productId} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-rose-50 shadow-sm relative group">
              <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img src={item.product?.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl truncate">{item.product?.name}</h3>
                  <button onClick={() => removeFromCart(item.productId)} className="text-stone-300 hover:text-rose-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-rose-500 font-bold mb-4">Rs. {item.product?.price.toLocaleString()}</p>
                {item.customNote && (
                  <div className="text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg mb-4">
                    " {item.customNote} "
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-stone-100 rounded-lg overflow-hidden">
                    <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="px-3 py-1 hover:bg-stone-50">-</button>
                    <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="px-3 py-1 hover:bg-stone-50">+</button>
                  </div>
                  <span className="text-sm font-bold ml-auto">Total: Rs. {((item.product?.price || 0) * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside>
          <div className="bg-rose-50/80 backdrop-blur rounded-[40px] p-8 sticky top-24 border border-rose-100">
            <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Delivery Fee</span>
                <span className="font-bold">{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
              </div>
              {subtotal < 5000 && (
                <p className="text-[10px] text-rose-500 italic">Add Rs. {(5000 - subtotal).toLocaleString()} more for FREE delivery!</p>
              )}
              <div className="border-t border-rose-200 pt-4 flex justify-between text-lg">
                <span className="font-serif">Total</span>
                <span className="font-bold text-rose-primary">Rs. {(subtotal + deliveryFee).toLocaleString()}</span>
              </div>
            </div>
            <a href="#/checkout" className="block w-full py-4 bg-rose-primary text-white text-center rounded-2xl font-bold text-lg hover:bg-rose-800 transition-all shadow-xl shadow-rose-200">
              Checkout Now
            </a>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">💳</div>
                 Secure payment with eSewa & IME Pay
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">🚚</div>
                 Scheduled delivery across major cities
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
