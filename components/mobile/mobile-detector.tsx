'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
}

export const MobileDetector = ({ children, storeId }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);
      setIsLoading(false);
    };

    checkMobile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Mobile Version</h1>
          <p className="text-gray-600 mb-6">
            Mobile version is under development. Please use desktop for full functionality.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue to Desktop Version
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};