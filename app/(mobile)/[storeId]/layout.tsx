import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { MobileBottomNav } from '@/components/mobile/mobile-bottom-nav';

export default async function MobileStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="flex-1">
        {children}
      </main>
      <MobileBottomNav stores={stores} />
    </div>
  );
}