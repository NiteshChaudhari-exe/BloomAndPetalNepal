
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

  if (!product) return <div className="p-20 text-center">Loading product...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-rose-50">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-rose-primary scale-105 shadow-md' : 'border-transparent opacity-60'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <span className="text-rose-500 font-bold tracking-widest text-xs uppercase mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl text-rose-primary font-bold">Rs. {product.price.toLocaleString()}</p>
          </div>

          <p className="text-stone-600 leading-relaxed">{product.description}</p>

          <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-4">
             <div className="flex items-center gap-4">
               <label className="text-sm font-medium">Quantity:</label>
               <div className="flex items-center border border-rose-200 rounded-lg bg-white">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 hover:text-rose-primary font-bold">-</button>
                 <span className="px-4 py-1 border-x border-rose-200 font-medium min-w-[3rem] text-center">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 hover:text-rose-primary font-bold">+</button>
               </div>
               <span className="text-xs text-stone-400">{product.stock} available</span>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-medium">Custom Message / Note:</label>
               <textarea 
                  className="w-full p-3 rounded-xl border border-rose-200 outline-none focus:ring-2 focus:ring-rose-200 transition-all text-sm h-24"
                  placeholder="E.g., Happy Birthday Mom! Please deliver by 10 AM."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
               ></textarea>
             </div>

             <button 
                onClick={() => { addToCart(product.id, quantity, customNote); alert('Added to cart!'); }}
                className="w-full py-4 bg-rose-primary text-white rounded-xl font-bold text-lg hover:bg-rose-800 transition-all transform hover:translate-y-[-2px] shadow-lg shadow-rose-200"
              >
                Add to Cart
             </button>
          </div>

          <div className="flex gap-8 text-sm text-stone-500 border-t border-rose-100 pt-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Same Day Delivery
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Fresh Guarantee
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {recommended.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
            <span className="text-2xl">✨</span>
            AI Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommended.map(p => (
              <a key={p.id} href={`#/product/${p.id}`} className="block group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-rose-50 shadow-sm">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-serif text-lg group-hover:text-rose-primary transition-colors">{p.name}</h4>
                <p className="text-rose-primary font-bold">Rs. {p.price.toLocaleString()}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
