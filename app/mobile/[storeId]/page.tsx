import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getStockCount } from '@/actions/get-stock-count';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileStoreSelector } from '@/components/mobile/mobile-store-selector';
import { MobileStatsCard } from '@/components/mobile/mobile-stats-card';
import { DollarSign, ShoppingCart, Package } from 'lucide-react';
import { formatter } from '@/lib/utils';

interface MobileHomePageProps {
  params: { storeId: string };
}

const MobileHomePage = async ({ params }: MobileHomePageProps) => {
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

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* Store Selector */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Current Store</h3>
          <MobileStoreSelector stores={stores} currentStore={store} />
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          
          <MobileStatsCard
            title="Total Revenue"
            value={formatter.format(totalRevenue)}
            icon={DollarSign}
            color="green"
          />
          
          <MobileStatsCard
            title="Total Orders"
            value={salesCount.toString()}
            icon={ShoppingCart}
            color="blue"
          />
          
          <MobileStatsCard
            title="Stock Items"
            value={stockCount.toString()}
            icon={Package}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href={`/mobile/${params.storeId}/products`} className="p-3 bg-blue-50 rounded-lg text-center block">
              <Package className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <span className="text-sm font-medium text-blue-900">View Products</span>
            </a>
            <a href={`/mobile/${params.storeId}/orders`} className="p-3 bg-green-50 rounded-lg text-center block">
              <ShoppingCart className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <span className="text-sm font-medium text-green-900">View Orders</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomePage;