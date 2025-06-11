'use client';

import { format } from 'date-fns';
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Order {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  paymentStatus: string;
  orderStatus: string;
}

interface MobileOrdersProps {
  orders: Order[];
}

export const MobileOrders = ({ orders }: MobileOrdersProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Orders ({orders.length})
        </h2>
        <p className="text-sm text-gray-600 mt-1">View all your orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
            <p className="text-sm text-gray-600">Orders will appear here when customers make purchases.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {order.products}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {order.phone} • {order.createdAt}
                  </p>
                </div>
                <div className="ml-3 text-right">
                  <p className="text-sm font-semibold text-gray-900">{order.totalPrice}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    <span className="ml-1 capitalize">{order.orderStatus}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    order.isPaid 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {order.address}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};