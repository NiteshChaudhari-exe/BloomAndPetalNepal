
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { NEPAL_LOCATIONS } from '../constants';

export const Checkout: React.FC = () => {
  const { cart, products, user, placeOrder } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    city: 'Kathmandu',
    address: user?.address || '',
    deliveryDate: '',
    paymentMethod: 'COD' as 'COD' | 'eSewa' | 'IME Pay' | 'Bank Transfer'
  });

  const subtotal = cart.reduce((sum, item) => {
    const p = products.find(prod => prod.id === item.productId);
    return sum + (p?.price || 0) * item.quantity;
  }, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to place an order.');
      window.location.hash = '#/login';
      return;
    }
    placeOrder({
      userId: user.id,
      items: cart,
      total,
      status: 'Pending' as any,
      shippingAddress: `${formData.address}, ${formData.city}`,
      deliveryDate: formData.deliveryDate,
      paymentMethod: formData.paymentMethod
    });
    alert('Order placed successfully!');
    window.location.hash = '#/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-floral-pastel via-white to-rose-50 dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 py-12 px-4">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-rose-accent/10 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="section-title text-5xl dark:text-white mb-3">Secure Checkout</h1>
          <p className="section-subtitle dark:text-stone-400">Complete your order with ease</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <section className="card dark:bg-stone-800/50 dark:border-stone-700 p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-serif mb-8 dark:text-white flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-rose-500/30">1</span>
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                  <label className="text-sm font-semibold dark:text-stone-300 text-stone-700">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.25s' }}>
                  <label className="text-sm font-semibold dark:text-stone-300 text-stone-700">Contact Phone</label>
                  <input 
                    required
                    type="tel" 
                    className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="98xxxxxxxxx"
                  />
                </div>
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                  <label className="text-sm font-semibold dark:text-stone-300 text-stone-700">City</label>
                  <select 
                    className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 cursor-pointer"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  >
                    {NEPAL_LOCATIONS.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.35s' }}>
                  <label className="text-sm font-semibold dark:text-stone-300 text-stone-700">Detailed Address</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Street name, landmark..."
                    className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                  <label className="text-sm font-semibold dark:text-stone-300 text-stone-700">Preferred Delivery Date</label>
                  <input 
                    required
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600"
                    value={formData.deliveryDate}
                    onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="card dark:bg-stone-800/50 dark:border-stone-700 p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-serif mb-8 dark:text-white flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-neon-purple text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-electric/30">2</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
                  { id: 'eSewa', label: 'eSewa', icon: '🟢' },
                  { id: 'IME Pay', label: 'IME Pay', icon: '🔴' },
                  { id: 'Bank Transfer', label: 'Bank', icon: '🏦' }
                ].map((method, idx) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: method.id as any})}
                    className={`p-6 rounded-3xl border-2 transition-all text-center flex flex-col items-center gap-3 transform hover:scale-105 hover:shadow-lg dark:text-white animate-fade-in ${
                      formData.paymentMethod === method.id 
                        ? 'border-rose-primary bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-900/30 dark:to-rose-800/20 shadow-lg shadow-rose-300/30' 
                        : 'border-stone-200 dark:border-stone-700 hover:border-rose-200 dark:hover:border-rose-600 bg-white dark:bg-stone-800'
                    }`}
                    style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
                  >
                    <span className="text-3xl">{method.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{method.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <aside>
            <div className="glass dark:glass-dark dark:bg-stone-800/50 rounded-[40px] p-8 sticky top-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-serif mb-8 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🛍️</span> Order Summary
              </h2>
              
              {/* Items */}
              <div className="space-y-3 mb-8 max-h-48 overflow-y-auto pr-3">
                {cart.length === 0 ? (
                  <p className="text-stone-400 dark:text-stone-500 text-center py-4">No items in cart</p>
                ) : (
                  cart.map((item, idx) => {
                    const p = products.find(prod => prod.id === item.productId);
                    return (
                      <div key={item.productId} className="flex justify-between text-sm dark:text-stone-300 hover:text-rose-primary dark:hover:text-rose-400 transition-colors animate-slide-in" style={{ animationDelay: `${0.4 + idx * 0.05}s` }}>
                        <span className="font-medium">{p?.name} x {item.quantity}</span>
                        <span className="font-semibold">Rs. {((p?.price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-stone-300 dark:border-stone-700 pt-6 space-y-4 mb-8">
                <div className="flex justify-between text-sm dark:text-stone-300">
                  <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
                  <span className="font-medium dark:text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm dark:text-stone-300">
                  <span className="text-stone-600 dark:text-stone-400">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600 dark:text-green-400' : 'dark:text-white'}`}>
                    {deliveryFee === 0 ? '✓ FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t border-stone-300 dark:border-stone-700 pt-4 flex justify-between">
                  <span className="text-xl font-serif dark:text-white">Total</span>
                  <span className="text-2xl font-serif bg-gradient-to-r from-rose-primary to-rose-accent bg-clip-text text-transparent dark:from-rose-400 dark:to-rose-300">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-rose-primary to-rose-accent text-white rounded-full font-bold hover:shadow-lg hover:shadow-rose-500/40 transition-all transform hover:scale-105 dark:from-rose-500 dark:to-rose-400 animate-bounce-soft"
              >
                ✓ Confirm & Place Order
              </button>

              <p className="mt-6 text-[11px] text-stone-500 dark:text-stone-500 text-center uppercase tracking-widest">
                Secure payment • Your data is encrypted
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};
