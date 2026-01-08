
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Category } from '../types';

export const Home: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-floral-pastel to-white dark:from-stone-900 dark:via-stone-800 dark:to-stone-900"></div>
        <img 
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Hero Flowers" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-15 mix-blend-overlay"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-rose-600 dark:text-rose-400 font-semibold tracking-widest uppercase text-xs block mb-6 animate-fade-in">✨ Celebrating Life's Moments</span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-6 text-stone-900 dark:text-white leading-tight animate-fade-in">
            Flowers That <br />
            <span className="italic bg-gradient-rose bg-clip-text text-transparent">Whisper Love</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-700 dark:text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            From farm-fresh roses to artisanal handmade gifts, we deliver beauty and fragrance anywhere in Nepal within hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
            <a href="#/shop" className="btn-primary shadow-lg shadow-rose-300/50 hover:shadow-rose-400/70">
              Shop Collections
            </a>
            <a href="#/custom" className="btn-secondary hover:shadow-lg">
              Custom Bouquet
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="section-title dark:text-white">Browse by Category</h2>
            <div className="w-24 h-1.5 bg-gradient-rose rounded-full"></div>
          </div>
          <a href="#/shop" className="text-rose-primary dark:text-rose-400 font-semibold hover:text-rose-accent transition-colors duration-300 flex items-center gap-2">
            View All <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(Category).slice(0, 4).map((cat, idx) => (
            <a 
              key={cat} 
              href={`#/shop?category=${cat}`} 
              className="group relative h-64 overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-800 shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={`https://picsum.photos/seed/cat${idx}/500/800`} 
                alt={cat} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-white font-serif text-2xl mb-2 transform transition-transform duration-300">{cat}</span>
                <span className="text-rose-200 dark:text-rose-300 text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                  Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-rose-600 dark:text-rose-400 font-semibold tracking-widest text-xs uppercase mb-4 block">⭐ Premium Selection</span>
            <h2 className="section-title dark:text-white mb-4">Our Featured Blooms</h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-lg mx-auto text-lg">Hand-picked bestsellers that are guaranteed to bring a smile to your loved ones.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className="group card dark:bg-stone-800 dark:border dark:border-stone-700 overflow-hidden hover:shadow-glass-lg transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 glass dark:glass-dark px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                    {product.category}
                  </div>
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-rose-primary text-white px-3 py-1 rounded-full text-xs font-bold">Fresh</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl mb-2 text-stone-900 dark:text-white group-hover:text-rose-primary dark:group-hover:text-rose-400 transition-colors duration-300">{product.name}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-rose-primary dark:text-rose-400 font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                    </div>
                  </div>
                  <a 
                    href={`#/product/${product.id}`} 
                    className="block w-full text-center py-3 bg-stone-50 dark:bg-stone-700 group-hover:bg-gradient-rose group-hover:text-white rounded-2xl font-semibold transition-all duration-300 transform group-hover:scale-105"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-20 -left-20 w-56 h-56 bg-rose-200/40 rounded-full mix-blend-multiply blur-3xl animate-glow"></div>
             <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-rose-300/40 rounded-full mix-blend-multiply blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
             <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Testimonial background" 
                className="relative rounded-[40px] shadow-glass-lg dark:shadow-glass z-10 w-full object-cover aspect-square"
              />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-rose-600 dark:text-rose-400 font-bold tracking-widest text-xs uppercase mb-4 block">💬 Happy Customers</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-white leading-tight">Stories From Those We've Helped Bloom</h2>
            </div>
            <div className="space-y-6">
              {[
                { name: "Suman Thapa", text: "Ordered a birthday bouquet for my wife. The flowers were fresh and exactly as pictured. Delivered within 3 hours in Kathmandu!", stars: 5 },
                { name: "Priya Sharma", text: "Their custom wedding decor service is amazing. Very professional and creative team. Highly recommended for special occasions.", stars: 5 }
              ].map((t, i) => (
                <div key={i} className="card dark:bg-stone-800 dark:border dark:border-stone-700 hover:shadow-glass-lg transition-all duration-300">
                   <div className="flex gap-1 mb-4">
                     {[...Array(t.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-lg">★</span>)}
                   </div>
                   <p className="text-stone-700 dark:text-stone-300 italic mb-4 leading-relaxed text-lg">"{t.text}"</p>
                   <p className="font-serif font-bold text-stone-900 dark:text-white">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
