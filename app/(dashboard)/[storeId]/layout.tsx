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
    <MobileDetector stores={stores} storeId={params.storeId}>
      <div className="min-h-screen flex flex-col bg-gray-900">
        {/* Top Section - Shopify-style dark header */}
        <div className="h-14 flex-shrink-0 relative z-50">
          <TopBar stores={stores} />
        </div>

        {/* Bottom Section with curved border - White background */}
        <div className="flex-1 flex rounded-t-3xl bg-white shadow-lg relative">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden md:block w-56 flex-shrink-0 bg-gray-100 border-r border-gray-200">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
            <main className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="max-w-full">
                {children}
              </div>
            </main>
            <div className="flex-shrink-0">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </MobileDetector>
  );
}