import React, { useState } from 'react';
import { useApp } from '../store/AppContext';


export const Header: React.FC = () => {
  const { cart, user, logout } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);


  const navLinks = [
    { href: '#/', label: 'Home' },
    { href: '#/shop', label: 'Shop' },
    { href: '#/occasions', label: 'Occasions' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-floral-pastel/80 dark:bg-rose-primary/80 backdrop-blur-md border-b border-rose-primary px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#/" className="text-2xl font-bold text-rose-primary flex items-center gap-2 font-serif">
          <span className="text-3xl">🌸</span>
          <span className="hidden sm:inline">Bloom & Petal</span>
        </a>



        {/* User/Cart */}
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
          <a href="#/cart" className="relative p-2 hover:bg-rose-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-rose-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </a>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden p-2 rounded-full border border-rose-100 bg-white hover:bg-rose-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
                }
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
