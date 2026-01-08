
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { Product } from '../types';
import { getAIRecommendations } from '../services/aiService';

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const { products, addToCart } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImg(found.images[0]);
    }
  }, [id, products]);

  useEffect(() => {
    if (product) {
      const fetchAI = async () => {
        setLoadingAI(true);
        const recIds = await getAIRecommendations(`Someone who likes ${product.name} and ${product.category}`, products);
        const recs = products.filter(p => recIds.includes(p.id) && p.id !== product.id);
        setRecommended(recs);
        setLoadingAI(false);
      };
      fetchAI();
    }
  }, [product, products]);

  const handleAddToCart = () => {
    addToCart(product!.id, quantity, customNote);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-4 border-rose-primary border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-stone-500 dark:text-stone-400 font-serif text-lg">Loading product...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <a href="#/shop" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm mb-8 inline-block animate-fade-in">
          ← Back to Shop
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 animate-fade-in">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-[40px] overflow-hidden glass dark:glass-dark backdrop-blur-xl border border-white/40 dark:border-stone-700/40 shadow-2xl group">
              <img 
                src={activeImg} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {product.featured && (
                <div className="absolute top-6 left-6 bg-gradient-rose text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  ⭐ Featured
                </div>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-[20px] overflow-hidden border-2 transition-all transform hover:scale-110 ${
                    activeImg === img 
                      ? 'border-rose-primary shadow-glass-lg scale-105 bg-gradient-rose' 
                      : 'border-stone-200 dark:border-stone-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <span className="text-rose-primary dark:text-rose-400 font-bold tracking-widest text-xs uppercase mb-3 block opacity-75">
                {product.category} Collection
              </span>
              <h1 className="text-5xl font-serif mb-4 text-stone-900 dark:text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-4xl font-bold bg-gradient-rose text-transparent bg-clip-text">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              {product.description}
            </p>

            {/* Product Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card dark:bg-stone-800/50 dark:border dark:border-stone-700 text-center">
                <p className="text-3xl mb-2">🌹</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">Fresh Blooms</p>
              </div>
              <div className="card dark:bg-stone-800/50 dark:border dark:border-stone-700 text-center">
                <p className="text-3xl mb-2">🚚</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">Same Day</p>
              </div>
              <div className="card dark:bg-stone-800/50 dark:border dark:border-stone-700 text-center">
                <p className="text-3xl mb-2">{product.stock > 0 ? '✅' : '❌'}</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">{product.stock > 0 ? 'In Stock' : 'Out'}</p>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="card glass dark:glass-dark dark:border dark:border-stone-700 space-y-6 p-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-primary dark:hover:text-rose-400 font-bold text-lg transition-all disabled:opacity-50"
                    title="Decrease quantity"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-12 text-center border-2 border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white rounded-[15px] font-bold text-lg focus:border-rose-primary dark:focus:border-rose-400 outline-none transition-colors"
                    title="Quantity input"
                    aria-label="Quantity input"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-primary dark:hover:text-rose-400 font-bold text-lg transition-all"
                    title="Increase quantity"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="text-xs text-stone-500 dark:text-stone-400 ml-auto">
                    {product.stock} available
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">
                  ✍️ Special Message (Optional)
                </label>
                <textarea 
                  className="w-full p-4 rounded-[20px] border-2 border-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 transition-all text-sm h-24 resize-none"
                  placeholder="E.g., Happy Birthday Mom! Please deliver by 10 AM."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-4 rounded-[25px] font-bold text-lg transition-all transform hover:scale-105 shadow-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-rose text-white hover:shadow-rose-400/50'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : product.stock > 0 ? '🛍️ Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-stone-200 dark:border-stone-700 pt-6 space-y-4">
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-bold text-stone-900 dark:text-white">Secure Packaging</p>
                  <p className="text-sm">Handled with care to ensure freshness</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                <span className="text-2xl">💝</span>
                <div>
                  <p className="font-bold text-stone-900 dark:text-white">Custom Notes</p>
                  <p className="text-sm">Personalize with your own special message</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-bold text-stone-900 dark:text-white">Express Delivery</p>
                  <p className="text-sm">Same-day delivery available in Kathmandu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {recommended.length > 0 && (
          <section className="mt-32 animate-fade-in">
            <h2 className="text-4xl font-serif mb-12 flex items-center gap-4 text-stone-900 dark:text-white">
              <span className="text-3xl animate-bounce-soft">✨</span>
              Customers Also Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommended.map((p, i) => (
                <a 
                  key={p.id} 
                  href={`#/product/${p.id}`} 
                  className="group card dark:bg-stone-800 dark:border dark:border-stone-700 overflow-hidden hover:shadow-glass-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                >
                  <div className="aspect-square rounded-[25px] overflow-hidden mb-5 bg-stone-100 dark:bg-stone-700 relative">
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {p.featured && (
                      <div className="absolute top-3 right-3 bg-gradient-rose text-white px-2 py-1 rounded-full text-xs font-bold">⭐</div>
                    )}
                  </div>
                  <h4 className="font-serif text-lg mb-2 group-hover:text-rose-primary dark:group-hover:text-rose-400 transition-colors text-stone-900 dark:text-white">
                    {p.name}
                  </h4>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold bg-gradient-rose text-transparent bg-clip-text">
                      Rs. {p.price.toLocaleString()}
                    </p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      p.stock > 0
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {p.stock > 0 ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {loadingAI && (
          <div className="mt-12 text-center">
            <div className="inline-block">
              <div className="w-8 h-8 rounded-full border-4 border-rose-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

