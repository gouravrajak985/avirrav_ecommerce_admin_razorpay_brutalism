'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, Package, User } from 'lucide-react';

interface MobileBottomNavProps {
  stores: any[];
}

export const MobileBottomNav = ({ stores }: MobileBottomNavProps) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/mobile/${params.storeId}`,
      label: 'Home',
      icon: Home,
      active: pathname === `/mobile/${params.storeId}`,
    },
    {
      href: `/mobile/${params.storeId}/orders`,
      label: 'Orders',
      icon: ShoppingCart,
      active: pathname === `/mobile/${params.storeId}/orders`,
    },
    {
      href: `/mobile/${params.storeId}/products`,
      label: 'Products',
      icon: Package,
      active: pathname === `/mobile/${params.storeId}/products`,
    },
    {
      href: `/mobile/${params.storeId}/account`,
      label: 'Account',
      icon: User,
      active: pathname === `/mobile/${params.storeId}/account`,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
                route.active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{route.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};