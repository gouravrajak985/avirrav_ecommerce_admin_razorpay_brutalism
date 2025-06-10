'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from './theme-toggle';
import { CustomUserButton } from './user-button';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';
import StoreSwitcher from './store-switcher';

interface TopBarProps {
  stores: any[];
}

export const TopBar = ({ stores }: TopBarProps) => {
  return (
    <div className="h-14 bg-black border-b border-gray-800 flex items-center px-4">
      {/* Left - Store Switcher */}
      <div className="flex items-center">
        <StoreSwitcher items={stores} />
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-500"
          />
        </div>
      </div>

      {/* Right - User Actions */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Button variant="outline" size="icon-sm" asChild className="border-gray-700 text-white hover:bg-gray-800">
          <a href="/documentation" target="_blank">
            <FileText className="h-4 w-4" />
          </a>
        </Button>
        <CustomUserButton />
      </div>
    </div>
  );
};