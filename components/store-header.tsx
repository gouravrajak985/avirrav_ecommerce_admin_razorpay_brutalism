'use client';

import { auth } from '@clerk/nextjs';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

interface StoreHeaderProps {
  stores: any[];
}

export const StoreHeader = ({ stores }: StoreHeaderProps) => {
  return (
    <div className="h-12 bg-surface border-b border-border flex items-center px-4">
      <StoreSwitcher items={stores} />
    </div>
  );
};