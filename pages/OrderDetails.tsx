import React, { useState } from 'react';
import { Order } from '../types';
import { useApp } from '../store/AppContext';

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => {
  const { updateOrderStatus, user, products } = useApp();
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const statusTimeline = [
    { status: 'PENDING', label: 'Order Placed', emoji: '📋' },
    { status: 'CONFIRMED', label: 'Order Confirmed', emoji: '✅' },
    { status: 'PACKED', label: 'Packed for Shipment', emoji: '📦' },
    { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', emoji: '🚚' },
    { status: 'DELIVERED', label: 'Delivered', emoji: '🎁' }
  ];

  const getStatusIndex = (status: string) => statusTimeline.findIndex(s => s.status === status);
  const currentStatusIndex = getStatusIndex(order.status);

  const getOrderItem = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const handleStatusUpdate = () => {
    if (selectedStatus !== order.status) {
      updateOrderStatus(order.id, selectedStatus as any);
      setShowStatusUpdate(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <a href="#/dashboard" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm mb-6 inline-block">
            ← Back to Orders
          </a>
          <h1 className="text-4xl font-serif mb-2 text-stone-900 dark:text-white">Order #{order.id}</h1>
          <p className="text-stone-500 dark:text-stone-400">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Timeline */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
              <h2 className="text-xl font-serif mb-8 text-stone-900 dark:text-white">Order Status</h2>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-primary to-electric"></div>
                
                <div className="space-y-8">
                  {statusTimeline.map((item, index) => (
                    <div key={item.status} className="relative pl-20">
                      <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                        index <= currentStatusIndex 
                          ? 'bg-gradient-rose text-white' 
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                      }`}>
                        {item.emoji}
                      </div>
                      <div>
                        <p className={`font-bold transition-colors ${
                          index <= currentStatusIndex 
                            ? 'text-rose-primary dark:text-rose-400' 
                            : 'text-stone-400'
                        }`}>
                          {item.label}
                        </p>
                        {index === currentStatusIndex && (
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Current Status</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {user?.role === 'Admin' && (
                <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-700">
                  {!showStatusUpdate ? (
                    <button
                      onClick={() => setShowStatusUpdate(true)}
                      className="btn-primary text-sm"
                    >
                      Update Status
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="input-primary w-full"
                        title="Select new order status"
                        aria-label="Select order status"
                      >
                        {statusTimeline.map(item => (
                          <option key={item.status} value={item.status}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-3">
                        <button
                          onClick={handleStatusUpdate}
                          className="btn-primary flex-1"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowStatusUpdate(false)}
                          className="px-6 py-3 rounded-full border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
              <h2 className="text-xl font-serif mb-6 text-stone-900 dark:text-white">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => {
                  const product = getOrderItem(item.productId);
                  return (
                    <div
                      key={index}
                      className="flex gap-4 pb-4 border-b border-stone-200 dark:border-stone-700 last:border-0 last:pb-0"
                    >
                      <img
                        src={product?.images[0] || '🌹'}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-stone-900 dark:text-white">{item.productName}</h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-stone-900 dark:text-white">Rs. {item.price.toLocaleString()}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Info */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
              <h2 className="text-xl font-serif mb-6 text-stone-900 dark:text-white">Payment Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                  <span className="text-stone-600 dark:text-stone-400">Method</span>
                  <span className="font-bold text-stone-900 dark:text-white capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                  <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
                  <span className="text-stone-900 dark:text-white">Rs. {(order.total * 0.85).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                  <span className="text-stone-600 dark:text-stone-400">Delivery Fee</span>
                  <span className="text-stone-900 dark:text-white">Rs. {(order.total * 0.15).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-bold">
                  <span className="text-stone-900 dark:text-white">Total</span>
                  <span className="text-rose-primary dark:text-rose-400">Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
              <h3 className="text-lg font-serif mb-4 text-stone-900 dark:text-white">📍 Delivery Address</h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {order.shippingAddress}
              </p>
            </div>

            {/* Delivery Date */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
              <h3 className="text-lg font-serif mb-4 text-stone-900 dark:text-white">📅 Expected Delivery</h3>
              <p className="text-2xl font-bold text-rose-primary dark:text-rose-400">
                {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                {Math.ceil((new Date(order.deliveryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
              </p>
            </div>

            {/* Status Badge */}
            <div className="p-6 rounded-[30px] bg-gradient-rose text-white text-center">
              <p className="text-xs uppercase tracking-widest opacity-90 mb-2">Current Status</p>
              <p className="text-2xl font-bold">{order.status}</p>
            </div>

            {/* Need Help */}
            <div className="card dark:bg-stone-800 dark:border dark:border-stone-700 border-2 border-dashed">
              <h3 className="text-lg font-serif mb-4 text-stone-900 dark:text-white">🆘 Need Help?</h3>
              <a href="#/" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
