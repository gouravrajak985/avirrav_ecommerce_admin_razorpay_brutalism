import { auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';
import { Sidebar } from './sidebar';
import { FileText } from 'lucide-react';
import { Button } from './ui/button';
import { CustomUserButton } from './user-button';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='fixed top-0 w-full z-50 bg-surface border-b border-border polaris-shadow-sm'>
      <div className='flex h-14 items-center px-4 relative'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6 hidden sm:block' />
        <div className='ml-auto flex items-center space-x-3'>
          <ThemeToggle />
          <Button variant="outline" size="icon-sm" asChild>
            <a href="/documentation" target="_blank">
              <FileText className="h-4 w-4" />
            </a>
          </Button>
          <CustomUserButton />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;