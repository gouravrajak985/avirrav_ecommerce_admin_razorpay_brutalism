'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStoreSelectorProps {
  stores: any[];
  currentStore: any;
}

export const MobileStoreSelector = ({ stores, currentStore }: MobileStoreSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleStoreSelect = (storeId: string) => {
    setIsOpen(false);
    router.push(`/${storeId}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div className="flex items-center">
          <Store className="h-4 w-4 text-gray-600 mr-2" />
          <span className="font-medium text-gray-900">{currentStore.name}</span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-gray-600 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {stores.map((store) => (
            <button
              key={store.id}
              onClick={() => handleStoreSelect(store.id)}
              className={cn(
                "w-full flex items-center p-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg",
                store.id === currentStore.id && "bg-blue-50 text-blue-900"
              )}
            >
              <Store className="h-4 w-4 mr-2" />
              <span className="font-medium">{store.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};