'use client';

import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CustomUserButton = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user) return null;

  // Extract user initials for avatar fallback
  const initials = user.firstName && user.lastName
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-lg border border-gray-700 overflow-hidden hover:bg-gray-800 polaris-transition focus:polaris-focus flex items-center justify-center bg-gray-900">
          <User className="h-4 w-4 text-gray-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="flex items-center gap-3 p-2 mb-2 border-b border-border pb-2">
          <div className="h-8 w-8 rounded-lg border border-border polaris-shadow flex items-center justify-center bg-surface">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-body font-medium truncate">{user.fullName}</p>
            <p className="text-caption text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        <DropdownMenuItem 
          onClick={() => openUserProfile()}
          className="cursor-pointer hover:bg-surface-hovered py-2"
        >
          <User className="mr-2 h-4 w-4" />
          Go to Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            signOut(() => {
              window.location.href = '/';
            });
          }}
          className="cursor-pointer text-destructive hover:bg-critical-subdued py-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};