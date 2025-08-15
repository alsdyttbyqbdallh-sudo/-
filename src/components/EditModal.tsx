
import React, { useState, useEffect } from 'react';
import type { Product, Message } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  onDelete: (id: number) => void;
  product: Product;
  showMessage: (text: string, type: Message['type']) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, onDelete, product, showMessage }) => {
  const [formData, setFormData] = useState<Product>(product);
  const [imageSizeWarning, setImageSizeWarning] = useState(false);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 500 * 1024) { // 500KB warning threshold
        setImageSizeWarning(true);
      } else {
        setImageSizeWarning(false);
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (reader.result.length > 1024 * 1024) { // 1MB storage limit check
             showMessage('حجم الصورة كبير جداً! يرجى اختيار صورة أصغر.', 'error');
          } else {
             setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleDelete = () => {
    if(window.confirm(`هل أنت متأكد من رغبتك في حذف المنتج "${formData.name}"؟`)) {
        onDelete(formData.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-transform duration-300 scale-100">
        <h2 className="text-xl font-bold mb-4 text-center">تعديل المنتج</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img src={formData.imageUrl} alt="صورة المنتج" className="w-32 h-32 rounded-md object-cover mb-4" />
            <label htmlFor="editImage" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition-colors">
              تغيير الصورة
            </label>
            <input type="file" id="editImage" accept="image/*" onChange={handleImageChange} className="hidden" />
            {imageSizeWarning && <p className="text-red-500 text-sm mt-2">حجم الصورة كبير وقد يؤثر على الأداء!</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المنتج</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر</label>
            <input type="number" id="price" value={formData.price} onChange={handlePriceChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
            <textarea id="description" value={formData.description} onChange={handleInputChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-red-500 focus:border-red-500"></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">الحالة</label>
            <select id="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-red-500 focus:border-red-500">
              <option value="جديد">جديد</option>
              <option value="حسب الطلب">حسب الطلب</option>
              <option value="جمله تفرقه">جمله تفرقه</option>
            </select>
          </div>
          <div className="flex justify-between space-x-4 space-x-reverse mt-6">
            <button type="submit" className="flex-1 bg-red-600 text-white rounded-md py-2 font-bold hover:bg-red-700 transition duration-300">حفظ</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-800 rounded-md py-2 font-bold hover:bg-gray-400 transition duration-300">إلغاء</button>
          </div>
          <button type="button" onClick={handleDelete} className="w-full mt-2 bg-red-100 text-red-700 rounded-md py-2 font-bold hover:bg-red-200 transition duration-300">حذف المنتج</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;