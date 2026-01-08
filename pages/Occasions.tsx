import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

const Occasions: React.FC = () => {
  const { products } = useApp();
  const [selectedOccasion, setSelectedOccasion] = useState('');

  const occasions = [
    { id: 'wedding', name: '💍 Wedding', emoji: '💍', color: 'from-rose-300 to-rose-500' },
    { id: 'birthday', name: '🎂 Birthday', emoji: '🎂', color: 'from-yellow-300 to-orange-500' },
    { id: 'anniversary', name: '💝 Anniversary', emoji: '💝', color: 'from-pink-300 to-red-500' },
    { id: 'get-well', name: '🌻 Get Well Soon', emoji: '🌻', color: 'from-yellow-300 to-yellow-500' },
    { id: 'congratulations', name: '🎉 Congratulations', emoji: '🎉', color: 'from-purple-300 to-purple-500' },
    { id: 'sympathy', name: '🤍 Sympathy', emoji: '🤍', color: 'from-gray-300 to-gray-500' }
  ];

  const getProductsByOccasion = (occasion: string) => {
    if (!occasion) return products;
    return products.filter(p => p.occasions?.includes(occasion));
  };

  const filteredProducts = getProductsByOccasion(selectedOccasion);
  const selectedOccasionData = occasions.find(o => o.id === selectedOccasion);

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4 text-stone-900 dark:text-white">Occasions & Moments</h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg">
            Find the perfect flowers for every special moment. Curated collections for celebrations, get-well wishes, and heartfelt occasions.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          <button
            onClick={() => setSelectedOccasion('')}
            className={`p-6 rounded-[30px] text-center transition-all transform hover:scale-105 ${
              selectedOccasion === ''
                ? 'bg-gradient-rose text-white shadow-lg scale-105'
                : 'glass dark:glass-dark hover:shadow-glass-lg'
            }`}
          >
            <span className="text-3xl block mb-3">🌹</span>
            <p className="font-serif font-bold">All</p>
          </button>

          {occasions.map(occasion => (
            <button
              key={occasion.id}
              onClick={() => setSelectedOccasion(occasion.id)}
              className={`p-6 rounded-[30px] text-center transition-all transform hover:scale-105 ${
                selectedOccasion === occasion.id
                  ? `bg-gradient-to-br ${occasion.color} text-white shadow-lg scale-105`
                  : 'glass dark:glass-dark hover:shadow-glass-lg'
              }`}
            >
              <span className="text-3xl block mb-3">{occasion.emoji}</span>
              <p className="font-serif font-bold text-sm">{occasion.name.split(' ')[1]}</p>
            </button>
          ))}
        </div>

        {/* Results Header */}
        {selectedOccasion && selectedOccasionData && (
          <div className="mb-12 animate-fade-in">
            <div className={`bg-gradient-to-r ${selectedOccasionData.color} rounded-[40px] p-12 text-white shadow-glass-lg`}>
              <span className="text-6xl block mb-4">{selectedOccasionData.emoji}</span>
              <h2 className="text-4xl font-serif mb-2">{selectedOccasionData.name}</h2>
              <p className="opacity-90">
                {filteredProducts.length} beautiful arrangements perfect for this special occasion
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
            {filteredProducts.map((product, index) => (
              <a
                key={product.id}
                href={`#/product/${product.id}`}
                className="group card dark:bg-stone-800 dark:border dark:border-stone-700 overflow-hidden hover:shadow-glass-lg transition-all duration-300 animate-fade-in"
              >
                <div className="relative overflow-hidden rounded-[20px] mb-4 h-48 bg-stone-100 dark:bg-stone-700">
                  <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                    {product.images[0] || '🌹'}
                  </div>
                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-rose-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-lg mb-2 text-stone-900 dark:text-white group-hover:text-rose-primary dark:group-hover:text-rose-400 transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                  {product.description.substring(0, 60)}...
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-primary dark:text-rose-400">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.stock > 0 ? (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl block mb-6">🌸</span>
            <h3 className="text-2xl font-serif mb-3 text-stone-900 dark:text-white">No flowers found</h3>
            <p className="text-stone-500 dark:text-stone-400 mb-8">
              We don't have any arrangements for this occasion yet. Check back soon!
            </p>
            <button
              onClick={() => setSelectedOccasion('')}
              className="btn-primary"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Occasions;
