'use client';

import { Package, Star, Archive } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  stockQuantity: number;
}

interface MobileProductsProps {
  products: Product[];
}

export const MobileProducts = ({ products }: MobileProductsProps) => {
  const getStockStatus = (quantity: number) => {
    if (quantity > 10) return { label: 'In Stock', color: 'bg-green-50 text-green-700 border-green-200' };
    if (quantity > 0) return { label: 'Low Stock', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    return { label: 'Out of Stock', color: 'bg-red-50 text-red-700 border-red-200' };
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Package className="h-5 w-5 mr-2" />
          Products ({products.length})
        </h2>
        <p className="text-sm text-gray-600 mt-1">View all your products</p>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products yet</h3>
            <p className="text-sm text-gray-600">Add products to start selling.</p>
          </div>
        ) : (
          products.map((product) => {
            const stockStatus = getStockStatus(product.stockQuantity);
            
            return (
              <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      {product.isFeatured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                      {product.isArchived && (
                        <Archive className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      {product.category} • {product.size} • {product.createdAt}
                    </p>
                  </div>
                  <div className="ml-3 text-right">
                    <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-1 ${stockStatus.color}`}>
                      {stockStatus.label}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.color }}
                      title={`Color: ${product.color}`}
                    />
                    <span className="text-xs text-gray-600">
                      Stock: {product.stockQuantity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        Featured
                      </span>
                    )}
                    {product.isArchived && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                        Archived
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};