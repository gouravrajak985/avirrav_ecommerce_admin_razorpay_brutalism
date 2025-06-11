import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MobileOrderCardProps {
  order: {
    id: string;
    customerName: string;
    phone: string;
    products: string;
    totalPrice: string;
    status: string;
    paymentStatus: string;
    isPaid: boolean;
    createdAt: string;
  };
}

export const MobileOrderCard = ({ order }: MobileOrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'confirmed':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'partial':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium text-gray-900">{order.customerName}</p>
          <p className="text-sm text-gray-600">{order.phone}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">{order.totalPrice}</p>
          <p className="text-xs text-gray-500">{order.createdAt}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700 line-clamp-2">{order.products}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-md border",
            getStatusColor(order.status)
          )}>
            {order.status}
          </span>
          <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-md border",
            getPaymentStatusColor(order.paymentStatus)
          )}>
            {order.paymentStatus}
          </span>
        </div>
        {order.isPaid && (
          <span className="text-xs text-green-600 font-medium">✓ Paid</span>
        )}
      </div>
    </div>
  );
};