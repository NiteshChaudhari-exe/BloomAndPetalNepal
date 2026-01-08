import React, { useState } from 'react';
import { Product, Category } from '../types';

interface ProductEditModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const CATEGORIES = Object.values(Category);

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now().toString(),
      name: '',
      category: Category.FRESH_FLOWERS,
      price: 0,
      description: '',
      images: [],
      stock: 0,
      featured: false,
      occasions: []
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-stone-800 rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border dark:border-stone-700">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-stone-800 p-8 border-b border-stone-200 dark:border-stone-700 flex justify-between items-center">
          <h2 className="text-3xl font-serif text-stone-900 dark:text-white">
            {product ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors text-2xl"
            title="Close modal"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Red Rose Bouquet"
              className={`w-full px-4 py-3 rounded-[20px] border-2 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors ${
                errors.name ? 'border-red-500' : 'border-stone-200 dark:border-stone-600'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">❌ {errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 rounded-[20px] border-2 border-stone-200 dark:border-stone-600 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors font-bold"
              title="Select product category"
              aria-label="Product category"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
                Price (Rs) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                placeholder="1000"
                className={`w-full px-4 py-3 rounded-[20px] border-2 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors ${
                  errors.price ? 'border-red-500' : 'border-stone-200 dark:border-stone-600'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-2">❌ {errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
                Stock Units *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                placeholder="10"
                className={`w-full px-4 py-3 rounded-[20px] border-2 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors ${
                  errors.stock ? 'border-red-500' : 'border-stone-200 dark:border-stone-600'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-2">❌ {errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your product..."
              rows={4}
              className={`w-full px-4 py-3 rounded-[20px] border-2 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-stone-200 dark:border-stone-600'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">❌ {errors.description}</p>}
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
              Image URLs (comma-separated) *
            </label>
            <textarea
              value={formData.images.join(', ')}
              onChange={(e) => handleChange('images', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={3}
              className={`w-full px-4 py-3 rounded-[20px] border-2 dark:bg-stone-700 dark:text-white outline-none focus:border-rose-primary dark:focus:border-rose-400 transition-colors resize-none ${
                errors.images ? 'border-red-500' : 'border-stone-200 dark:border-stone-600'
              }`}
            />
            {errors.images && <p className="text-red-500 text-sm mt-2">❌ {errors.images}</p>}
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 p-4 rounded-[20px] border-2 border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700/50">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
              title="Mark as featured product"
            />
            <label htmlFor="featured" className="text-sm font-bold text-stone-900 dark:text-white cursor-pointer">
              ⭐ Mark as Featured Product
            </label>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">Image Preview</p>
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative rounded-[20px] overflow-hidden h-32 bg-stone-100 dark:bg-stone-700">
                    <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-stone-50 dark:bg-stone-700/50 p-8 border-t border-stone-200 dark:border-stone-600 flex gap-4 justify-end">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-3 rounded-full border-2 border-stone-200 dark:border-stone-600 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors font-bold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 rounded-full bg-gradient-rose text-white hover:shadow-lg transition-all font-bold disabled:opacity-50"
          >
            {isSaving ? '💾 Saving...' : (product ? '✓ Update Product' : '✓ Add Product')}
          </button>
        </div>
      </div>
    </div>
  );
};
