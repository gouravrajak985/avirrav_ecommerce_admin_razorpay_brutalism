'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
}

export const MobileHeader = ({ title, showBack = false }: MobileHeaderProps) => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
      {showBack && (
        <button
          onClick={() => router.back()}
          className="mr-3 p-2 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
      )}
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </div>
  );
};