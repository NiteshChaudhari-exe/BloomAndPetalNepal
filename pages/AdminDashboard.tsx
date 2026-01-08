
import React, { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { Category, OrderStatus } from '../types';
import { ProductEditModal } from '../components/ProductEditModal';


const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'bg-orange-100 text-orange-700 border-orange-200';
    case OrderStatus.CONFIRMED: return 'bg-blue-100 text-blue-700 border-blue-200';
    case OrderStatus.PACKED: return 'bg-purple-100 text-purple-700 border-purple-200';
    case OrderStatus.OUT_FOR_DELIVERY: return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700 border-green-200';
    case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-stone-100 text-stone-700 border-stone-200';
  }
};

export const AdminDashboard: React.FC = () => {
  const { products, orders, updateProduct, deleteProduct, updateOrderStatus } = useApp();
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const totalSales = orders.reduce((sum, o) => o.status === OrderStatus.DELIVERED ? sum + o.total : sum, 0);

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'All') return orders;
    return orders.filter(o => o.status === orderFilter);
  }, [orders, orderFilter]);

  const statusCounts = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [orders]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-serif mb-2">Admin Control Center</h1>
          <p className="text-stone-500">Manage your store inventory, orders, and business analytics.</p>
        </div>
        <div className="flex gap-4 p-1 bg-stone-100 rounded-2xl">
          <button 
            onClick={() => setTab('products')} 
            className={`px-6 py-2 rounded-xl transition-all ${tab === 'products' ? 'bg-white shadow text-rose-primary font-bold' : 'text-stone-500'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setTab('orders')} 
            className={`px-6 py-2 rounded-xl transition-all ${tab === 'orders' ? 'bg-white shadow text-rose-primary font-bold' : 'text-stone-500'}`}
          >
            Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50 text-center">
           <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Delivered Sales</p>
           <p className="text-3xl font-serif text-rose-primary">Rs. {totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50 text-center">
           <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Pending Orders</p>
           <p className="text-3xl font-serif text-orange-500">{statusCounts[OrderStatus.PENDING] || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50 text-center">
           <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Total Inventory Items</p>
           <p className="text-3xl font-serif text-green-600">{products.length}</p>
        </div>
      </div>

      {tab === 'products' ? (
        <div className="bg-white rounded-[40px] shadow-sm border border-rose-50 overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-rose-50">
            <h2 className="text-2xl font-serif">Inventory Management</h2>
            <button 
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="bg-rose-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              + Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-rose-50 text-rose-900 text-xs font-bold uppercase">
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Stock</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {products.map(p => {
                  const isLowStock = p.stock < 5;
                  return (
                    <tr key={p.id} className={`transition-colors ${isLowStock ? 'bg-red-50/50' : 'hover:bg-stone-50'}`}>
                      <td className="px-8 py-4 flex items-center gap-4">
                        <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" alt={p.name} title={p.name} />
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="px-8 py-4 text-sm text-stone-500">{p.category}</td>
                      <td className="px-8 py-4 font-bold">Rs. {p.price}</td>
                      <td className="px-8 py-4">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit ${isLowStock ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-green-100 text-green-600 border border-green-200'}`}>
                          {isLowStock && <span>⚠️</span>}
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-8 py-4 flex gap-4 text-sm">
                        <button 
                          onClick={() => {
                            setEditingProduct(p);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors font-bold"
                          title="Edit product"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors font-bold"
                          title="Delete product"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Order Filters and Summary Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-3xl border border-rose-50 shadow-sm overflow-x-auto">
            <button 
              onClick={() => setOrderFilter('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${orderFilter === 'All' ? 'bg-rose-primary text-white' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
            >
              All Orders ({orders.length})
            </button>
            {Object.values(OrderStatus).map(status => (
              <button 
                key={status}
                onClick={() => setOrderFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${orderFilter === status ? getStatusColor(status) + ' shadow-sm scale-105' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
              >
                {status} ({statusCounts[status] || 0})
              </button>
            ))}
          </div>

          {filteredOrders.length > 0 ? filteredOrders.map(order => (
            <div key={order.id} className="bg-white p-8 rounded-[40px] border border-rose-50 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-stone-400 uppercase tracking-widest">Order ID</p>
                    <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono text-xs">{order.id}</span>
                   </div>
                   <p className="text-lg font-serif">{new Date(order.createdAt).toLocaleDateString()} — <span className="text-rose-primary font-bold">Rs. {order.total.toLocaleString()}</span></p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Update Status</label>
                     <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`border px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer font-bold ${getStatusColor(order.status)}`}
                      >
                        {Object.values(OrderStatus).map(status => <option key={status} value={status}>{status}</option>)}
                     </select>
                   </div>
                   <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Payment</label>
                     <span className="text-[10px] font-bold px-3 py-2 bg-rose-50 text-rose-primary rounded-xl uppercase border border-rose-100 h-[38px] flex items-center">
                       {order.paymentMethod}
                     </span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Logistics Info */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Logistics Information</h3>
                  <div className="text-sm text-stone-600 bg-rose-50/30 p-6 rounded-3xl border border-rose-50/50 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📍</span>
                      <div>
                        <p className="font-bold text-stone-800">Delivery Address</p>
                        <p className="leading-relaxed">{order.shippingAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📅</span>
                      <div>
                        <p className="font-bold text-stone-800">Target Date</p>
                        <p>{order.deliveryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Detail */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Items in Order</h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      const p = products.find(prod => prod.id === item.productId);
                      return (
                        <div key={idx} className="bg-white border border-stone-100 rounded-2xl p-4 flex gap-4 items-start shadow-sm">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-50">
                            {p ? (
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">🥀</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-bold text-stone-900 truncate">{p?.name || 'Unknown Product'}</p>
                              <p className="text-sm font-bold text-rose-600 whitespace-nowrap">Rs. {((p?.price || 0) * item.quantity).toLocaleString()}</p>
                            </div>
                            <p className="text-xs text-stone-500 mb-2">
                              {item.quantity} x Rs. {p?.price.toLocaleString() || 0}
                            </p>
                            {item.customNote && (
                              <div className="mt-2 text-xs bg-rose-50 text-rose-700 p-2 rounded-lg italic border-l-2 border-rose-300">
                                "{item.customNote}"
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white p-20 rounded-[40px] text-center border border-rose-50">
               <div className="text-5xl mb-4">📝</div>
               <h3 className="text-xl font-serif text-stone-400">No orders found for this status</h3>
            </div>
          )}
        </div>
      )}

      <ProductEditModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={(product) => {
          updateProduct(product);
        }}
      />
    </div>
  );
};
