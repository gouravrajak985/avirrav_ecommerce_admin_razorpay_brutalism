'use client';

import { useEffect, useState } from 'react';
import { MobileDashboard } from './mobile-dashboard';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
}

export const MobileDetector = ({ children, storeId }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const checkDevice = () => {
      try {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth;
        
        // Comprehensive mobile detection
        const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTabletUA = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
        const isMobileScreen = screenWidth < 768;
        
        // Consider it mobile if it's a mobile device OR small screen (but not tablet)
        const isMobileDevice = (isMobileUA && !isTabletUA) || (isMobileScreen && !isTabletUA);
        
        setIsMobile(isMobileDevice);
        setIsLoading(false);
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
      const userAgent = navigator.userAgent;
      const isTabletUA = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      const isMobileDevice = (isMobileUA && !isTabletUA) || (screenWidth < 768 && !isTabletUA);
      setIsMobile(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch dashboard data when mobile is detected and storeId is available
  useEffect(() => {
    if (isMobile && storeId && !isLoading) {
      const fetchDashboardData = async () => {
        try {
          // Fetch all required data for mobile dashboard
          const [ordersRes, productsRes, storesRes] = await Promise.all([
            fetch(`/api/${storeId}/orders`),
            fetch(`/api/${storeId}/products`),
            fetch('/api/stores') // Fetch all stores for store switcher
          ]);

          const orders = await ordersRes.json();
          const products = await productsRes.json();
          const allStores = await storesRes.json();

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

          // Format stores for store switcher
          const formattedStores = Array.isArray(allStores) ? allStores.map((store: any) => ({
            id: store.id,
            name: store.name,
          })) : [];

          // Find current store
          const currentStore = formattedStores.find((store: any) => store.id === storeId) || {
            id: storeId,
            name: 'Current Store'
          };

          setDashboardData({
            orders: formattedOrders,
            products: formattedProducts,
            stores: formattedStores,
            store: currentStore,
            totalRevenue: `₹${formattedOrders.reduce((total: number, order: any) => 
              total + parseFloat(order.totalPrice.replace('₹', '')), 0).toFixed(2)}`,
            salesCount: formattedOrders.filter((order: any) => order.isPaid).length,
            stockCount: formattedProducts.reduce((total: number, product: any) => 
              total + product.stockQuantity, 0),
          });
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          // Set empty data to prevent infinite loading
          setDashboardData({
            orders: [],
            products: [],
            stores: [],
            store: { id: storeId, name: 'Store' },
            totalRevenue: '₹0.00',
            salesCount: 0,
            stockCount: 0,
          });
        }
      };

      fetchDashboardData();
    }
  }, [isMobile, storeId, isLoading]);

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

  // Automatically show mobile dashboard if on mobile device
  if (isMobile && dashboardData && storeId) {
    return (
      <MobileDashboard
        storeId={storeId}
        stores={dashboardData.stores}
        totalRevenue={dashboardData.totalRevenue}
        salesCount={dashboardData.salesCount}
        stockCount={dashboardData.stockCount}
        orders={dashboardData.orders}
        products={dashboardData.products}
        store={dashboardData.store}
      />
    );
  }

  // Show desktop version for non-mobile devices or when mobile data isn't ready
  return <>{children}</>;
};