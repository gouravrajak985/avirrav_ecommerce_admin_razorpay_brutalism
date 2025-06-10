import Footer from '@/components/footer';
import { TopBar } from '@/components/top-bar';
import { AdminSidebar } from '@/components/admin-sidebar';
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
    <div className="h-screen flex flex-col bg-background">
      {/* Top Section (10% height) */}
      <div className="h-[10%]">
        {/* Top Bar with Store Switcher */}
        <TopBar stores={stores} />
      </div>

      {/* Bottom Section (90% height) with curved border */}
      <div className="h-[90%] flex rounded-t-2xl bg-background border-t border-border overflow-hidden">
        {/* Left Sidebar (10% width) */}
        <div className="w-[10%] min-w-[224px]">
          <AdminSidebar />
        </div>

        {/* Main Content (90% width) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}