
import React from 'react';
import type { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  return (
    <div>
      <div className="relative bg-black w-full">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l-7 7 7 7" />
          </svg>
        </button>
        <img
          src={product.imageUrl.replace('/100/100', '/400/400')}
          alt={product.name}
          className="w-full object-cover max-h-96"
        />
      </div>
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
        <p className="text-3xl font-bold text-red-600">{product.price} رس</p>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-500 text-sm">الحالة: {product.status}</p>
        <p className="text-gray-500 text-sm">رقم: {product.number}</p>
      </div>
    </div>
  );
};

export default ProductDetails;