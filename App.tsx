
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { Header, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

const Router: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');
  const { user, orders } = useApp();

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (hash === '#/' || hash === '') return <Home />;
    if (hash.startsWith('#/shop')) return <Shop />;
    if (hash.startsWith('#/product/')) {
      const id = hash.split('#/product/')[1];
      return <ProductDetails id={id} />;
    }
    if (hash === '#/cart') return <Cart />;
    if (hash === '#/checkout') return <Checkout />;
    if (hash === '#/admin') {
      if (user?.role !== 'Admin') return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center">
           <span className="text-6xl mb-6">🔒</span>
           <h2 className="text-3xl font-serif mb-4">Admin Access Only</h2>
           <p className="text-stone-500 mb-8 max-w-md">You do not have the necessary permissions to view this section. Please login with an administrator account.</p>
           <a href="#/login" className="bg-rose-primary text-white px-8 py-3 rounded-full font-bold">Switch Account</a>
        </div>
      );
      return <AdminDashboard />;
    }
    if (hash === '#/login') {
      if (user) {
        window.location.hash = '#/';
        return null;
      }
      return <Login />;
    }
    if (hash === '#/dashboard') {
      if (!user) {
        window.location.hash = '#/login';
        return null;
      }
      const myOrders = orders.filter(o => o.userId === user.id);
      
      return (
        <div className="max-w-4xl mx-auto py-20 px-4">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-full bg-rose-primary text-white flex items-center justify-center text-3xl font-serif">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-serif mb-1">Hello, {user.name}</h1>
              <p className="text-stone-500">Member since {new Date().getFullYear()}</p>
            </div>
          </div>

          <h2 className="text-2xl font-serif mb-8">Your Recent Orders</h2>
          <div className="space-y-6">
            {myOrders.length > 0 ? (
              myOrders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl border border-rose-50 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Order #{order.id}</p>
                    <p className="font-bold">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-stone-500 mt-1">{order.items.length} items • Rs. {order.total.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-primary border border-rose-100 uppercase">
                      {order.status}
                    </span>
                    <a href={`#/orders/${order.id}`} className="text-stone-400 hover:text-stone-900 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-stone-50 rounded-[40px] border border-dashed border-stone-200">
                <p className="text-stone-400 font-serif text-xl mb-4">No orders yet</p>
                <a href="#/shop" className="text-rose-primary font-bold underline">Go find your first bloom</a>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center">
         <span className="text-6xl mb-6">🥀</span>
         <h2 className="text-3xl font-serif mb-4">Page Not Found</h2>
         <p className="text-stone-500 mb-8">We couldn't find the page you're looking for.</p>
         <a href="#/" className="bg-rose-primary text-white px-8 py-3 rounded-full font-bold">Return Home</a>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
