'use client';

import { DollarSign, ShoppingCart, Package, Store } from 'lucide-react';
import { MobileStatsCard } from './mobile-stats-card';
import StoreSwitcher from '../store-switcher';

interface MobileHomeProps {
  totalRevenue: string;
  salesCount: number;
  stockCount: number;
  stores: any[];
}

export const MobileHome = ({ totalRevenue, salesCount, stockCount, stores }: MobileHomeProps) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header with Store Switcher */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Dashboard Overview</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Store:</span>
          <div className="flex-1 ml-3 max-w-[200px]">
            <StoreSwitcher items={stores} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4">
        <MobileStatsCard
          title="Total Revenue"
          value={totalRevenue}
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <ShoppingCart className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-medium text-blue-600">View Orders</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <Package className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs font-medium text-purple-600">View Products</p>
          </div>
        </div>
      </div>

      {/* Mobile Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Store className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Mobile Dashboard</h3>
            <p className="text-xs text-blue-700 mt-1">
              You're using the mobile-optimized dashboard. Switch to desktop for full admin features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};