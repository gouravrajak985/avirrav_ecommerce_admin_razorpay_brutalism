import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileProductCard } from '@/components/mobile/mobile-product-card';

interface MobileProductsPageProps {
  params: { storeId: string };
}

const MobileProductsPage = async ({ params }: MobileProductsPageProps) => {
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

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    stockQuantity: product.stockQuantity,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    image: product.images[0]?.url || '',
    createdAt: format(product.createdAt, 'MMM dd, yyyy'),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Products" showBack />
      
      <div className="p-4">
        {/* Summary */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-lg font-bold text-gray-900">{products.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">{products.filter(p => p.stockQuantity > 0).length}</p>
              <p className="text-xs text-gray-500">In Stock</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{products.filter(p => p.stockQuantity === 0).length}</p>
              <p className="text-xs text-gray-500">Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {formattedProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            formattedProducts.map((product) => (
              <MobileProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileProductsPage;