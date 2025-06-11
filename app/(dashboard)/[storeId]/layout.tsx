import Footer from '@/components/footer';
import { TopBar } from '@/components/top-bar';
import { AdminSidebar } from '@/components/admin-sidebar';
import { MobileDetector } from '@/components/mobile/mobile-detector';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
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
    <MobileDetector storeId={params.storeId}>
      <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
        {/* Top Section (56px fixed height) - Shopify-style dark header */}
        <div className="h-14 flex-shrink-0">
          <TopBar stores={stores} />
        </div>

        {/* Bottom Section (remaining height) with curved border like Shopify - White background */}
        <div className="flex-1 flex rounded-t-3xl bg-white overflow-hidden shadow-lg">
          {/* Left Sidebar (224px fixed width) - Hidden on mobile */}
          <div className="hidden md:block w-56 flex-shrink-0 bg-gray-100 border-r border-gray-200">
            <AdminSidebar />
          </div>

          {/* Main Content (remaining width) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            <main className="flex-1 overflow-y-auto p-3 md:p-6">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </MobileDetector>
  );
}