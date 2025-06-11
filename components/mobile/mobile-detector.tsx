'use client';

import { useEffect, useState } from 'react';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
}

export const MobileDetector = ({ children, storeId }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const screenWidth = window.innerWidth;
      const isMobileDevice = mobile || screenWidth < 768;
      
      setIsMobile(isMobileDevice);
      setIsLoading(false);
      
      // Show mobile message for mobile devices
      if (isMobileDevice) {
        setShowMobileMessage(true);
      }
    };

    checkMobile();
    
    // Listen for resize events
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isMobileDevice = screenWidth < 768;
      setIsMobile(isMobileDevice);
      setShowMobileMessage(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showMobileMessage && isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 max-w-md w-full text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Mobile Experience</h1>
            <p className="text-gray-600 mb-6">
              For the best experience, we recommend using a desktop or tablet. The mobile version is optimized for viewing only.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowMobileMessage(false)}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Anyway
            </button>
            <p className="text-xs text-gray-500">
              Some features may be limited on mobile devices
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};