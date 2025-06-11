'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { MobileBottomNav } from './mobile-bottom-nav';
import { MobileHome } from './mobile-home';
import { MobileOrders } from './mobile-orders';
import { MobileProducts } from './mobile-products';
import { MobileAccount } from './mobile-account';
import { Loader } from '@/components/ui/loader';

interface MobileDashboardProps {
  storeId: string;
  stores: any[];
  totalRevenue: string;
  salesCount: number;
  stockCount: number;
  orders: any[];
  products: any[];
  store: any;
}

export const MobileDashboard = ({
  storeId,
  stores,
  totalRevenue,
  salesCount,
  stockCount,
  orders,
  products,
  store,
}: MobileDashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader size="large" />
          <p className="text-sm text-gray-600">Loading mobile dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <MobileHome
            totalRevenue={totalRevenue}
            salesCount={salesCount}
            stockCount={stockCount}
            stores={stores}
          />
        );
      case 'orders':
        return <MobileOrders orders={orders} />;
      case 'products':
        return <MobileProducts products={products} />;
      case 'account':
        return <MobileAccount store={store} user={user} />;
      default:
        return (
          <MobileHome
            totalRevenue={totalRevenue}
            salesCount={salesCount}
            stockCount={stockCount}
            stores={stores}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-4 pt-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};