
import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick: (id: number) => void;
  onEditClick: (product: Product) => void;
  isEditMode: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick, onEditClick, isEditMode }) => {
  if (products.length === 0) {
    return (
      <div className="p-4">
          <p className="text-center text-gray-500 font-bold">لا توجد منتجات مطابقة.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
          onEditClick={onEditClick}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
};

export default ProductList;