
import React from 'react';
import { useApp } from '../store/AppContext';

export const Header: React.FC = () => {
  const { cart, user, logout } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#/" className="text-2xl font-bold text-rose-primary flex items-center gap-2">
          <span className="text-3xl">🌸</span>
          <span className="hidden sm:inline">Bloom & Petal</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#/" className="hover:text-rose-primary transition-colors">Home</a>
          <a href="#/shop" className="hover:text-rose-primary transition-colors">Shop</a>
          <a href="#/occasions" className="hover:text-rose-primary transition-colors">Occasions</a>
          {user?.role === 'Admin' && (
            <a href="#/admin" className="text-rose-primary font-bold">Admin</a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium">
                <span className="w-8 h-8 rounded-full bg-rose-primary text-white flex items-center justify-center">
                  {user.name[0]}
                </span>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-rose-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#/dashboard" className="block px-4 py-2 hover:bg-rose-50">My Orders</a>
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600">Logout</button>
              </div>
            </div>
          ) : (
            <a href="#/login" className="text-sm font-medium px-4 py-2 rounded-full border border-rose-200 hover:bg-rose-50 transition-colors">
              Login
            </a>
          )}
          
          <a href="#/cart" className="relative p-2 hover:bg-rose-50 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-rose-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-stone-900 text-stone-400 py-12 px-4 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white text-xl font-serif mb-4">Bloom & Petal</h3>
        <p className="text-sm leading-relaxed">
          Bringing nature's finest to your doorstep across Nepal. Specializing in fresh blooms and handcrafted floral gifts since 2018.
        </p>
      </div>
      <div>
        <h4 className="text-white font-medium mb-4">Shop</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#/shop" className="hover:text-rose-300">Fresh Flowers</a></li>
          <li><a href="#/shop" className="hover:text-rose-300">Bouquets</a></li>
          <li><a href="#/shop" className="hover:text-rose-300">Gift Sets</a></li>
          <li><a href="#/shop" className="hover:text-rose-300">Custom Orders</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-medium mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-rose-300">Delivery Policy</a></li>
          <li><a href="#" className="hover:text-rose-300">Refund Policy</a></li>
          <li><a href="#" className="hover:text-rose-300">FAQ</a></li>
          <li><a href="#" className="hover:text-rose-300">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-medium mb-4">Connect</h4>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-900 transition-colors">FB</a>
          <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-900 transition-colors">IG</a>
          <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-900 transition-colors">TW</a>
        </div>
        <div className="mt-6">
          <p className="text-xs">Pay securely with</p>
          <div className="flex gap-2 mt-2 grayscale opacity-50">
            <span className="bg-white px-2 py-1 rounded text-black text-[10px] font-bold">eSewa</span>
            <span className="bg-white px-2 py-1 rounded text-black text-[10px] font-bold">IME Pay</span>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-stone-800 mt-12 pt-8 text-center text-xs">
      &copy; {new Date().getFullYear()} Bloom & Petal Nepal Pvt Ltd. All rights reserved.
    </div>
  </footer>
);
