import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileOrderCard } from '@/components/mobile/mobile-order-card';

interface MobileOrdersPageProps {
  params: { storeId: string };
}

const MobileOrdersPage = async ({ params }: MobileOrdersPageProps) => {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      customer: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    customerName: order.customer?.fullName || 'Guest Customer',
    phone: order.phone,
    products: order.orderItems.map(item => item.product.name).join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + (Number(item.product.price) * item.quantity);
      }, 0)
    ),
    status: order.orderStatus,
    paymentStatus: order.paymentStatus,
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, 'MMM dd, yyyy'),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Orders" showBack />
      
      <div className="p-4">
        {/* Summary */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {formattedOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            formattedOrders.map((order) => (
              <MobileOrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOrdersPage;