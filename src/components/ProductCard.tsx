
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (id: number) => void;
  onEditClick: (product: Product) => void;
  isEditMode: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onEditClick, isEditMode }) => {
  let statusColor = '';
  switch (product.status) {
    case 'جديد':
      statusColor = 'bg-red-500';
      break;
    case 'حسب الطلب':
      statusColor = 'bg-yellow-500';
      break;
    case 'جمله تفرقه':
      statusColor = 'bg-blue-500';
      break;
  }
  
  const handleCardClick = () => {
    if (!isEditMode) {
      onProductClick(product.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from firing
    onEditClick(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 space-x-reverse transition duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
        <div
          className={`absolute bottom-0 right-0 ${statusColor} text-white text-xs font-bold px-2 py-1 rounded-tl-md rounded-br-md`}
        >
          {product.status}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">رقم: {product.number}</p>
        <p className="text-lg font-bold text-red-600 mt-1">
          {product.price} <span className="text-sm font-normal">رس</span>
        </p>
        <p className="text-xs text-gray-500 mt-1 truncate">{product.description}</p>
      </div>
      {isEditMode && (
        <button
          onClick={handleEditClick}
          className="p-2 rounded-full bg-red-600 text-white transition duration-300 hover:bg-red-700 flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductCard;