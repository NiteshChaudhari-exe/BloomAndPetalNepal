
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif mb-12">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-12">
          {/* Shipping Info */}
          <section className="bg-white p-8 rounded-[40px] shadow-sm border border-rose-50">
            <h2 className="text-2xl font-serif mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-rose-50 text-rose-primary flex items-center justify-center text-base font-sans">1</span>
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 rounded-xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <input 
                  required
                  type="tel" 
                  className="w-full p-3 rounded-xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <select 
                  className="w-full p-3 rounded-xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                >
                  {NEPAL_LOCATIONS.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Detailed Address</label>
                <input 
                  required
                  type="text" 
                  placeholder="Street name, landmark..."
                  className="w-full p-3 rounded-xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Delivery Date</label>
                <input 
                  required
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 rounded-xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200"
                  value={formData.deliveryDate}
                  onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-8 rounded-[40px] shadow-sm border border-rose-50">
            <h2 className="text-2xl font-serif mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-rose-50 text-rose-primary flex items-center justify-center text-base font-sans">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
                { id: 'eSewa', label: 'eSewa', icon: '🟢' },
                { id: 'IME Pay', label: 'IME Pay', icon: '🔴' },
                { id: 'Bank Transfer', label: 'Bank', icon: '🏦' }
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setFormData({...formData, paymentMethod: method.id as any})}
                  className={`p-6 rounded-3xl border-2 transition-all text-center flex flex-col items-center gap-2 ${formData.paymentMethod === method.id ? 'border-rose-primary bg-rose-50' : 'border-stone-100 hover:border-rose-200'}`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-xs font-bold">{method.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <aside>
           <div className="bg-stone-900 text-white rounded-[40px] p-8 sticky top-24">
             <h2 className="text-2xl font-serif mb-6">Final Summary</h2>
             <div className="space-y-4 mb-8">
               {cart.map(item => {
                 const p = products.find(prod => prod.id === item.productId);
                 return (
                   <div key={item.productId} className="flex justify-between text-sm text-stone-400">
                     <span>{p?.name} x {item.quantity}</span>
                     <span>Rs. {((p?.price || 0) * item.quantity).toLocaleString()}</span>
                   </div>
                 );
               })}
             </div>
             <div className="border-t border-stone-800 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-2xl font-serif pt-4">
                  <span>Total</span>
                  <span className="text-rose-400">Rs. {total.toLocaleString()}</span>
                </div>
             </div>
             <button type="submit" className="w-full mt-8 py-4 bg-rose-primary text-white rounded-2xl font-bold hover:bg-rose-800 transition-all shadow-lg shadow-rose-900/40">
               Confirm & Place Order
             </button>
             <p className="mt-6 text-[10px] text-stone-500 text-center uppercase tracking-widest">
               By placing order, you agree to our terms
             </p>
           </div>
        </aside>
      </form>
    </div>
  );
};
