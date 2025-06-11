import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MobileProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    category: string;
    size: string;
    color: string;
    stockQuantity: number;
    isFeatured: boolean;
    isArchived: boolean;
    image: string;
    createdAt: string;
  };
}

export const MobileProductCard = ({ product }: MobileProductCardProps) => {
  const getStockStatus = (quantity: number) => {
    if (quantity > 10) return { label: 'In Stock', color: 'bg-green-50 text-green-700 border-green-200' };
    if (quantity > 0) return { label: 'Low Stock', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    return { label: 'Out of Stock', color: 'bg-red-50 text-red-700 border-red-200' };
  };

  const stockStatus = getStockStatus(product.stockQuantity);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex space-x-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={60}
              height={60}
              className="w-15 h-15 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-15 h-15 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
            <p className="font-bold text-gray-900 ml-2">{product.price}</p>
          </div>

          <div className="space-y-1 mb-2">
            <p className="text-sm text-gray-600">{product.category}</p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Size: {product.size}</span>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">Color:</span>
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: product.color }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-md border",
                stockStatus.color
              )}>
                {stockStatus.label}
              </span>
              {product.isFeatured && (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Featured
                </span>
              )}
              {product.isArchived && (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-200">
                  Archived
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">Stock: {product.stockQuantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};