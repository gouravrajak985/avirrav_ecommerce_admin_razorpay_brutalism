'use client';

import { User, Store, CreditCard, Settings, Globe, Key } from 'lucide-react';
import { MobileAccountCard } from './mobile-account-card';

interface Store {
  id: string;
  name: string;
  username?: string;
  apiUrl?: string;
  razorpayKeyId?: string;
}

interface MobileAccountProps {
  store: Store;
  user: any;
}

export const MobileAccount = ({ store, user }: MobileAccountProps) => {
  const storeDetails = [
    { label: 'Store Name', value: store.name || 'Not set' },
    { label: 'Username', value: store.username || 'Not set' },
    { label: 'API URL', value: store.apiUrl || 'Not set' },
  ];

  const userDetails = [
    { label: 'Full Name', value: user?.fullName || 'Not available' },
    { label: 'Email', value: user?.primaryEmailAddress?.emailAddress || 'Not available' },
    { label: 'User ID', value: user?.id || 'Not available' },
  ];

  const paymentDetails = [
    { label: 'Razorpay Key ID', value: store.razorpayKeyId ? '••••••••' + store.razorpayKeyId.slice(-4) : 'Not configured' },
    { label: 'Payment Status', value: store.razorpayKeyId ? 'Configured' : 'Not configured' },
  ];

  const systemDetails = [
    { label: 'Store ID', value: store.id },
    { label: 'Account Type', value: 'Admin' },
    { label: 'Status', value: 'Active' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Account Settings
        </h2>
        <p className="text-sm text-gray-600 mt-1">View your account and store information</p>
      </div>

      {/* Account Cards */}
      <div className="space-y-4">
        <MobileAccountCard
          title="User Information"
          icon={User}
          items={userDetails}
        />

        <MobileAccountCard
          title="Store Details"
          icon={Store}
          items={storeDetails}
        />

        <MobileAccountCard
          title="Payment Configuration"
          icon={CreditCard}
          items={paymentDetails}
        />

        <MobileAccountCard
          title="System Information"
          icon={Settings}
          items={systemDetails}
        />
      </div>

      {/* Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Mobile View Notice</h3>
            <p className="text-xs text-blue-700 mt-1">
              You're viewing account settings in read-only mode. To make changes, please use the desktop version of the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};