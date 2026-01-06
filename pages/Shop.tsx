
import React, { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { Category } from '../types';

export const Shop: React.FC = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchSearch && matchPrice;
    });
  }, [products, selectedCategory, searchQuery, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="font-serif text-xl mb-4">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search flowers..."
                className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'All' ? 'bg-rose-primary text-white font-medium' : 'hover:bg-rose-50'}`}
              >
                All Products
              </button>
              {Object.values(Category).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-rose-primary text-white font-medium' : 'hover:bg-rose-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4">Price Range</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-rose-primary"
              />
              <div className="flex justify-between text-sm text-stone-600">
                <span>Rs. {priceRange[0]}</span>
                <span>Rs. {priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif">{selectedCategory} ({filteredProducts.length})</h2>
            <select className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const isLowStock = product.stock < 5;
                return (
                  <a 
                    key={product.id} 
                    href={`#/product/${product.id}`} 
                    className={`group bg-white rounded-2xl overflow-hidden border transition-all ${isLowStock ? 'border-orange-300 shadow-orange-50 shadow-lg' : 'border-rose-50 hover:shadow-xl'}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden relative">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        {isLowStock && (
                          <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                            Limited Stock ({product.stock} left)
                          </span>
                        )}
                    </div>
                    <div className="p-5">
                        <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider mb-1">{product.category}</p>
                        <h3 className="font-serif text-lg mb-2 truncate">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-rose-primary font-bold">Rs. {product.price.toLocaleString()}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isLowStock ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 group-hover:bg-rose-primary group-hover:text-white'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-rose-50 rounded-3xl">
              <div className="text-5xl mb-4">🥀</div>
              <h3 className="text-xl font-serif mb-2">No blooms found</h3>
              <p className="text-stone-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange([0, 10000]); }}
                className="mt-6 text-rose-primary font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
