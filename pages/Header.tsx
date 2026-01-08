import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

const navLinks = [
  { href: '#/', label: 'Home' },
  { href: '#/shop', label: 'Shop' },
  { href: '#/occasions', label: 'Occasions' },
];

export const Header: React.FC = () => {
  const { cart, user, logout } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 px-4 py-3 dark:border-stone-700/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#/" className="text-2xl font-bold text-rose-primary flex items-center gap-2 hover:text-rose-accent transition-colors duration-300">
          <span className="text-3xl animate-bounce-soft">🌸</span>
          <span className="hidden sm:inline font-serif tracking-wide">Bloom & Petal</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <a 
              key={link.href} 
              href={link.href} 
              className="relative group text-stone-700 dark:text-stone-300 hover:text-rose-primary transition-colors duration-300"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          {user?.role === 'Admin' && (
            <a href="#/admin" className="text-rose-primary font-bold hover:text-rose-accent transition-colors">Admin</a>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-stone-700/50 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-rose text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {user.name[0]}
                </span>
                <span className="hidden sm:inline text-stone-700 dark:text-stone-300">{user.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-stone-800 border border-rose-100 dark:border-stone-700 rounded-2xl shadow-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40">
                <a href="#/dashboard" className="block px-4 py-3 hover:bg-rose-50 dark:hover:bg-stone-700/50 rounded-t-2xl text-stone-700 dark:text-stone-300 transition-colors">My Orders</a>
                <button onClick={logout} className="w-full text-left px-4 py-3 hover:bg-rose-50 dark:hover:bg-stone-700/50 rounded-b-2xl text-rose-600 dark:text-rose-400 font-medium transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <a href="#/login" className="text-sm font-medium px-4 py-2 rounded-full border border-rose-200 dark:border-rose-600 text-rose-primary hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors">
              Login
            </a>
          )}
          <a href="#/cart" className="relative p-2 rounded-full hover:bg-rose-100 dark:hover:bg-stone-700/50 transition-colors group">
            <svg className="w-6 h-6 text-stone-700 dark:text-stone-300 group-hover:text-rose-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-rose text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg animate-bounce-soft">
                {cartCount}
              </span>
            )}
          </a>
          <button
            className="md:hidden p-2 rounded-full border border-rose-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6 transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="7" width="16" height="2" rx="1" fill="currentColor" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
                <rect x="4" y="15" width="16" height="2" rx="1" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          className="md:hidden fixed inset-0 bg-black/40 z-50 animate-fade-in backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute top-0 right-0 w-72 h-screen bg-white dark:bg-stone-800 shadow-glass border-l border-rose-100 dark:border-stone-700 p-8 flex flex-col gap-6 animate-slide-in overflow-y-auto"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="self-end mb-4 p-2 rounded-full border border-rose-200 dark:border-stone-700 hover:bg-rose-50 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="space-y-2 flex flex-col">
              {navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-lg font-medium py-3 px-4 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-rose-50 dark:hover:bg-stone-700 hover:text-rose-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user?.role === 'Admin' && (
                <a 
                  href="#/admin" 
                  className="text-lg font-bold py-3 px-4 rounded-lg text-rose-primary hover:bg-rose-50 dark:hover:bg-stone-700 transition-colors" 
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </a>
              )}
            </nav>
            <div className="border-t border-stone-200 dark:border-stone-700 pt-4 space-y-2">
              <a 
                href="#/cart" 
                className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-rose-50 dark:hover:bg-stone-700 hover:text-rose-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart {cartCount > 0 && `(${cartCount})`}
              </a>
              {user ? (
                <button 
                  onClick={() => { logout(); setMobileOpen(false); }} 
                  className="w-full text-left px-4 py-3 rounded-lg bg-rose-50 dark:bg-stone-700 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 dark:hover:bg-stone-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <a 
                  href="#/login" 
                  className="block text-lg font-medium py-3 px-4 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-rose-50 dark:hover:bg-stone-700 hover:text-rose-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
