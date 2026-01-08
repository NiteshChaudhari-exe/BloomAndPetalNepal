import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { OrderStatus } from '../types';

interface Notification {
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  message: string;
}

const getStatusEmoji = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING: return '📋';
    case OrderStatus.CONFIRMED: return '✅';
    case OrderStatus.PACKED: return '📦';
    case OrderStatus.OUT_FOR_DELIVERY: return '🚚';
    case OrderStatus.DELIVERED: return '🎁';
    case OrderStatus.CANCELLED: return '❌';
    default: return '📬';
  }
};

const getStatusMessage = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING: return 'Your order has been placed and is being processed.';
    case OrderStatus.CONFIRMED: return 'Your order has been confirmed by our team.';
    case OrderStatus.PACKED: return 'Your flowers have been carefully packed and are ready to ship.';
    case OrderStatus.OUT_FOR_DELIVERY: return 'Your order is out for delivery and will arrive soon!';
    case OrderStatus.DELIVERED: return 'Your order has been delivered. Thank you for shopping with us!';
    case OrderStatus.CANCELLED: return 'Your order has been cancelled.';
    default: return 'Order status updated.';
  }
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-400';
    case OrderStatus.CONFIRMED: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400';
    case OrderStatus.PACKED: return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/50 text-purple-700 dark:text-purple-400';
    case OrderStatus.OUT_FOR_DELIVERY: return 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900/50 text-cyan-700 dark:text-cyan-400';
    case OrderStatus.DELIVERED: return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400';
    case OrderStatus.CANCELLED: return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400';
    default: return 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300';
  }
};

export const OrderNotifications: React.FC = () => {
  const { user, getOrderNotifications } = useApp();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  if (!user) return null;

  const notifications = getOrderNotifications(user.id);

  const toggleOrder = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 rounded-[30px] bg-gradient-to-br from-floral-pastel to-white dark:from-stone-800 dark:to-stone-900 border border-stone-200 dark:border-stone-700 text-center">
        <p className="text-2xl mb-3">📬</p>
        <p className="text-stone-600 dark:text-stone-400 font-serif">No orders yet</p>
        <p className="text-sm text-stone-500 dark:text-stone-500 mt-2">Start shopping to see order updates here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <span className="text-3xl animate-bounce">🔔</span>
        Order Updates
      </h2>

      {notifications.map((notif) => (
        <div
          key={notif.orderId}
          className={`rounded-[25px] border-2 p-6 transition-all cursor-pointer hover:shadow-glass-lg ${getStatusColor(notif.status)}`}
          onClick={() => toggleOrder(notif.orderId)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-3xl mt-1">{getStatusEmoji(notif.status)}</div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-bold text-lg">{notif.status}</p>
                  <p className="text-xs opacity-75">
                    {new Date(notif.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm">{getStatusMessage(notif.status)}</p>
              </div>
            </div>
            <div className="text-2xl opacity-50 transition-transform">
              {expandedOrders.has(notif.orderId) ? '▼' : '▶'}
            </div>
          </div>

          {expandedOrders.has(notif.orderId) && (
            <div className="mt-4 pt-4 border-t border-current border-opacity-20 animate-fade-in">
              <a
                href={`#/orders/${notif.orderId}`}
                className="inline-block mt-3 px-4 py-2 rounded-full bg-current bg-opacity-10 hover:bg-opacity-20 font-bold text-sm transition-all"
              >
                View Full Order Details →
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
