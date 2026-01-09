
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../store/AppContext';
import { Category } from '../types';
import { LoadingProductSkeleton } from '../components/LoadingSkeleton';

export const Shop: React.FC = () => {
  const { products } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Simulate loading state for initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search input for better performance (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchSearch && matchPrice;
    });
  }, [products, selectedCategory, debouncedSearch, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-stone-900 dark:text-white mb-4">Shop Our Collection</h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">Discover our carefully curated selection of fresh flowers and handcrafted bouquets.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            {/* Search */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-stone-900 dark:text-white">🔍 Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search flowers..."
                  className="input-primary dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:placeholder-stone-500 w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  title="Search products by name or description"
                  aria-label="Search products"
                />
                <svg className="w-5 h-5 absolute left-3 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-stone-900 dark:text-white">📚 Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-4 py-3 rounded-[20px] font-bold transition-all duration-300 uppercase tracking-widest text-sm ${
                    selectedCategory === 'All' 
                      ? 'bg-gradient-rose text-white shadow-lg scale-105' 
                      : 'text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  🌹 All Products
                </button>
                {Object.values(Category).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-[20px] font-bold transition-all duration-300 uppercase tracking-widest text-sm ${
                      selectedCategory === cat 
                        ? 'bg-gradient-rose text-white shadow-lg scale-105' 
                        : 'text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    ✿ {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4 p-4 glass dark:glass-dark rounded-2xl">
              <h3 className="font-serif text-xl text-stone-900 dark:text-white">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-rose-primary"
              />
              <div className="flex justify-between text-sm font-semibold text-stone-700 dark:text-stone-300">
                <span>Rs. {priceRange[0].toLocaleString()}</span>
                <span>Rs. {priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'All' || priceRange[1] < 10000) && (
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange([0, 10000]); }}
                className="w-full py-3 rounded-xl border-2 border-rose-primary text-rose-primary font-semibold hover:bg-rose-50 dark:hover:bg-stone-800 transition-colors duration-300"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-serif text-stone-900 dark:text-white">{selectedCategory}</h2>
                <p className="text-stone-600 dark:text-stone-400 mt-1">{filteredProducts.length} products found</p>
              </div>
              <select 
                title="Sort products by different criteria"
                aria-label="Sort products"
                className="px-4 py-2 rounded-[20px] border border-rose-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-300 outline-none cursor-pointer transition-all duration-300 hover:border-rose-400 dark:hover:border-rose-500"
              >
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            {isLoading ? (
              <LoadingProductSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, idx) => {
                  const isLowStock = product.stock < 5;
                  return (
                    <a 
                      key={product.id} 
                      href={`#/product/${product.id}`} 
                      className="group card dark:bg-stone-800 dark:border dark:border-stone-700 overflow-hidden hover:shadow-glass-lg transition-all duration-500 transform hover:-translate-y-2"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="aspect-[4/5] overflow-hidden relative bg-stone-100 dark:bg-stone-900">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {isLowStock && (
                          <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg">
                            Limited ({product.stock} left)
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-rose-600 dark:text-rose-400 text-[11px] font-bold uppercase tracking-widest">{product.category}</p>
                        <h3 className="font-serif text-xl text-stone-900 dark:text-white group-hover:text-rose-primary dark:group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-rose-primary dark:text-rose-400 font-bold text-lg">Rs. {product.price.toLocaleString()}</span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                            isLowStock 
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' 
                              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 group-hover:bg-rose-primary group-hover:text-white group-hover:dark:bg-rose-primary'
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="text-center py-24 glass dark:glass-dark rounded-3xl">
                <div className="text-6xl mb-4">🥀</div>
                <h3 className="text-2xl font-serif text-stone-900 dark:text-white mb-2">No blooms found</h3>
                <p className="text-stone-600 dark:text-stone-400 mb-8">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange([0, 10000]); }}
                  className="btn-primary inline-block"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
