'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from './theme-toggle';
import { CustomUserButton } from './user-button';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="h-14 bg-surface border-b border-border polaris-shadow-sm flex items-center px-4">
      {/* Left - Pugly Icon */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-heading text-foreground">Pugly</span>
        </div>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-surface border-border focus:border-primary"
          />
        </div>
      </div>

      {/* Right - User Actions */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Button variant="outline" size="icon-sm" asChild>
          <a href="/documentation" target="_blank">
            <FileText className="h-4 w-4" />
          </a>
        </Button>
        <CustomUserButton />
      </div>
    </div>
  );
};