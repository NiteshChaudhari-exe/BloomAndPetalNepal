
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Category } from '../types';

export const Home: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-rose-50">
        <img 
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Hero Flowers" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-rose-600 font-medium tracking-widest uppercase text-sm block mb-4">Celebrating Life's Moments</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-stone-900 leading-tight">
            Flowers That Whisper <br />
            <span className="italic text-rose-primary">The Language of Love</span>
          </h1>
          <p className="text-lg text-stone-700 mb-8 max-w-2xl mx-auto">
            From farm-fresh roses to artisanal handmade gifts, we deliver beauty and fragrance anywhere in Nepal within hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/shop" className="bg-rose-primary text-white px-10 py-4 rounded-full font-medium hover:bg-rose-800 transition-all transform hover:scale-105 shadow-xl shadow-rose-200">
              Shop Collections
            </a>
            <a href="#/custom" className="bg-white text-rose-primary border border-rose-200 px-10 py-4 rounded-full font-medium hover:bg-rose-50 transition-all">
              Custom Bouquet
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-2">Browse by Category</h2>
            <div className="w-20 h-1 bg-rose-primary"></div>
          </div>
          <a href="#/shop" className="text-rose-600 font-medium hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(Category).slice(0, 4).map((cat, idx) => (
            <a key={cat} href={`#/shop?category=${cat}`} className="group relative h-64 overflow-hidden rounded-2xl bg-stone-100">
              <img 
                src={`https://picsum.photos/seed/cat${idx}/500/800`} 
                alt={cat} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-white font-serif text-xl">{cat}</span>
                <span className="text-rose-200 text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">Explore &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-rose-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Featured Blooms</h2>
            <p className="text-stone-500 max-w-lg mx-auto">Hand-picked bestsellers that are guaranteed to bring a smile to your loved ones.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg mb-1 group-hover:text-rose-primary transition-colors">{product.name}</h3>
                  <p className="text-rose-primary font-bold mb-4">Rs. {product.price.toLocaleString()}</p>
                  <a href={`#/product/${product.id}`} className="block w-full text-center py-3 bg-stone-50 group-hover:bg-rose-primary group-hover:text-white rounded-xl font-medium transition-all">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-100 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-700"></div>
             <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Testimonial background" 
                className="relative rounded-[40px] shadow-2xl z-10"
              />
          </div>
          <div>
            <span className="text-rose-500 font-bold tracking-widest text-xs uppercase mb-4 block">Happy Customers</span>
            <h2 className="text-4xl font-serif mb-8 text-stone-900 leading-tight">Stories From Those We've Helped Bloom</h2>
            <div className="space-y-8">
              {[
                { name: "Suman Thapa", text: "Ordered a birthday bouquet for my wife. The flowers were fresh and exactly as pictured. Delivered within 3 hours in Kathmandu!", stars: 5 },
                { name: "Priya Sharma", text: "Their custom wedding decor service is amazing. Very professional and creative team. Highly recommended for special occasions.", stars: 5 }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-50">
                   <div className="flex gap-1 mb-4">
                     {[...Array(t.stars)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                   </div>
                   <p className="text-stone-600 italic mb-4 leading-relaxed">"{t.text}"</p>
                   <p className="font-bold text-stone-900">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
