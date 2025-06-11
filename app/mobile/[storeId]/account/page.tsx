import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileAccountCard } from '@/components/mobile/mobile-account-card';
import { Store, User, CreditCard, Globe } from 'lucide-react';

interface MobileAccountPageProps {
  params: { storeId: string };
}

const MobileAccountPage = async ({ params }: MobileAccountPageProps) => {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
    include: {
      homeBillboard: true,
    },
  });

  if (!store) {
    redirect('/');
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Account" showBack />
      
      <div className="p-4 space-y-4">
        {/* Store Information */}
        <MobileAccountCard
          title="Store Information"
          icon={Store}
          items={[
            { label: 'Store Name', value: store.name },
            { label: 'Username', value: store.username || 'Not set' },
            { label: 'API URL', value: store.apiUrl || 'Not set' },
            { label: 'Store ID', value: store.id },
          ]}
        />

        {/* Billboard Settings */}
        <MobileAccountCard
          title="Homepage Settings"
          icon={Globe}
          items={[
            { 
              label: 'Home Billboard', 
              value: store.homeBillboard?.label || 'Not selected' 
            },
            { 
              label: 'Total Billboards', 
              value: billboards.length.toString() 
            },
          ]}
        />

        {/* Payment Settings */}
        <MobileAccountCard
          title="Payment Settings"
          icon={CreditCard}
          items={[
            { 
              label: 'Razorpay Key ID', 
              value: store.razorpayKeyId ? '••••••••' + store.razorpayKeyId.slice(-4) : 'Not configured' 
            },
            { 
              label: 'Payment Status', 
              value: store.razorpayKeyId && store.razorpayKeySecret ? 'Configured' : 'Not configured' 
            },
          ]}
        />

        {/* Account Actions */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Account Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-900">View API Documentation</span>
            </button>
            <button className="w-full p-3 text-left bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">Contact Support</span>
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">App Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Platform</span>
              <span>Mobile Web</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAccountPage;