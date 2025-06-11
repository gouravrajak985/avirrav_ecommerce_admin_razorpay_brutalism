'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { MobileDashboard } from './mobile-dashboard';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
}

export const MobileDetector = ({ children, storeId }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [useMobileDashboard, setUseMobileDashboard] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const checkDevice = () => {
      try {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth;
        
        // More comprehensive mobile detection
        const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTabletUA = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
        const isMobileScreen = screenWidth < 768;
        const isTabletScreen = screenWidth >= 768 && screenWidth < 1024;
        
        let device: 'mobile' | 'tablet' | 'desktop' = 'desktop';
        
        if (isMobileUA && !isTabletUA) {
          device = 'mobile';
        } else if (isTabletUA || isTabletScreen) {
          device = 'tablet';
        } else if (isMobileScreen) {
          device = 'mobile';
        }
        
        setDeviceType(device);
        setIsMobile(device === 'mobile');
        setIsLoading(false);
        
        // Only show message for mobile devices (not tablets)
        if (device === 'mobile') {
          setShowMobileMessage(true);
        }
      } catch (error) {
        console.error('Error detecting device:', error);
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure proper hydration
    const timer = setTimeout(checkDevice, 100);
    
    // Listen for resize events
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isMobileDevice = screenWidth < 768;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice && deviceType === 'mobile') {
        setShowMobileMessage(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [deviceType]);

  // Fetch dashboard data when mobile dashboard is requested
  useEffect(() => {
    if (useMobileDashboard && storeId) {
      const fetchDashboardData = async () => {
        try {
          // Fetch all required data for mobile dashboard
          const [ordersRes, productsRes, storeRes] = await Promise.all([
            fetch(`/api/${storeId}/orders`),
            fetch(`/api/${storeId}/products`),
            fetch(`/api/stores/${storeId}`)
          ]);

          const orders = await ordersRes.json();
          const products = await productsRes.json();
          const store = await storeRes.json();

          // Format data for mobile components
          const formattedOrders = orders.map((order: any) => ({
            id: order.id,
            phone: order.phone,
            address: order.address,
            isPaid: order.isPaid,
            totalPrice: `₹${order.orderItems?.reduce((total: number, item: any) => 
              total + (Number(item.product?.price || 0) * item.quantity), 0).toFixed(2) || '0.00'}`,
            products: order.orderItems?.map((item: any) => item.product?.name).join(', ') || 'No products',
            createdAt: new Date(order.createdAt).toLocaleDateString(),
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
          }));

          const formattedProducts = products.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: `₹${Number(product.price).toFixed(2)}`,
            size: product.size?.name || 'N/A',
            category: product.category?.name || 'N/A',
            color: product.color?.value || '#000000',
            isFeatured: product.isFeatured,
            isArchived: product.isArchived,
            createdAt: new Date(product.createdAt).toLocaleDateString(),
            stockQuantity: product.stockQuantity || 0,
          }));

          setDashboardData({
            orders: formattedOrders,
            products: formattedProducts,
            store,
            totalRevenue: `₹${formattedOrders.reduce((total: number, order: any) => 
              total + parseFloat(order.totalPrice.replace('₹', '')), 0).toFixed(2)}`,
            salesCount: formattedOrders.filter((order: any) => order.isPaid).length,
            stockCount: formattedProducts.reduce((total: number, product: any) => 
              total + product.stockQuantity, 0),
          });
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };

      fetchDashboardData();
    }
  }, [useMobileDashboard, storeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show mobile dashboard if user chose to use it
  if (useMobileDashboard && dashboardData && storeId) {
    return (
      <MobileDashboard
        storeId={storeId}
        stores={[]} // Will be passed from parent
        totalRevenue={dashboardData.totalRevenue}
        salesCount={dashboardData.salesCount}
        stockCount={dashboardData.stockCount}
        orders={dashboardData.orders}
        products={dashboardData.products}
        store={dashboardData.store}
      />
    );
  }

  if (showMobileMessage && isMobile) {
    const DeviceIcon = deviceType === 'mobile' ? Smartphone : deviceType === 'tablet' ? Tablet : Monitor;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-200 max-w-sm w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DeviceIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Mobile Dashboard</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Choose your preferred mobile experience for managing your store.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setUseMobileDashboard(true);
                setShowMobileMessage(false);
              }}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Use Mobile Dashboard
            </button>
            
            <button
              onClick={() => setShowMobileMessage(false)}
              className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Continue to Desktop View
            </button>
            
            <div className="text-xs text-gray-500 space-y-1 mt-4">
              <p>📱 Mobile: Optimized navigation & read-only</p>
              <p>🖥️ Desktop: Full admin features</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};