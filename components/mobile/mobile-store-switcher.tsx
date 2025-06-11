'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useParams, useRouter } from 'next/navigation';

interface MobileStoreSwitcherProps {
  items: Array<{
    id: string;
    name: string;
  }>;
}

export const MobileStoreSwitcher = ({ items = [] }: MobileStoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className="w-full justify-between h-9 text-sm"
        >
          <Store className='mr-2 h-4 w-4 text-gray-500' />
          <span className="font-medium truncate flex-1 text-left">
            {currentStore?.label || 'Select Store'}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 text-gray-400' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 bg-white border border-gray-200 shadow-lg'>
        <Command className="bg-white">
          <CommandList>
            <CommandInput placeholder='Search store...' className="font-medium" />
            <CommandEmpty className="text-center py-3 text-sm text-gray-600">No store found.</CommandEmpty>
            <CommandGroup heading='Your Stores' className="font-medium text-gray-600">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className='text-sm font-medium hover:bg-gray-100 text-gray-900 cursor-pointer'
                >
                  <Store className='mr-2 h-4 w-4 text-gray-600' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4 text-blue-600',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};