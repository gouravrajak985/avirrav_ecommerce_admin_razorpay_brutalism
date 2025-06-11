'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
}

export const MobileDetector = ({ children, storeId }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      try {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // More comprehensive mobile detection
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
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
              You're accessing the admin dashboard on a mobile device. For the best experience, we recommend using a desktop or tablet.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowMobileMessage(false)}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Continue to Dashboard
            </button>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>✓ View-only mode optimized</p>
              <p>✓ Touch-friendly interface</p>
              <p>⚠ Some features may be limited</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};