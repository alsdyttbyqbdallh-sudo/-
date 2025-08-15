
import React from 'react';
import type { AppSettings } from '../types';

interface EditControlsProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onSave: () => void;
  onBack: () => void;
  onAddNewProduct: () => void;
}

const EditControls: React.FC<EditControlsProps> = ({
  settings,
  onSettingsChange,
  onSave,
  onBack,
  onAddNewProduct,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSettingsChange({ ...settings, [name]: value });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col">
        <label htmlFor="headerTitle" className="text-sm font-medium text-gray-700">
          تغيير عنوان الصفحة
        </label>
        <input
          type="text"
          id="headerTitle"
          name="headerTitle"
          value={settings.headerTitle}
          onChange={handleInputChange}
          className="rounded-md border-gray-300 shadow-sm p-2 mt-1 focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div className="flex items-center space-x-4 space-x-reverse">
        <label htmlFor="headerColor" className="text-sm font-medium text-gray-700">
          تغيير لون الشريط العلوي
        </label>
        <input
          type="color"
          id="headerColor"
          name="headerColor"
          value={settings.headerColor}
          onChange={handleInputChange}
          className="h-10 w-10 rounded-md border-gray-300 shadow-sm cursor-pointer"
        />
      </div>
      <button
        onClick={onSave}
        className="w-full bg-green-500 text-white rounded-lg py-3 font-bold transition duration-300 hover:bg-green-600 shadow-md"
      >
        حفظ التعديلات
      </button>
       <button
        onClick={onAddNewProduct}
        className="w-full bg-red-600 text-white rounded-lg py-3 font-bold transition duration-300 hover:bg-red-700 shadow-md"
      >
        أضف منتج جديد
      </button>
      <button
        onClick={onBack}
        className="w-full bg-gray-300 text-gray-800 rounded-lg py-3 font-bold transition duration-300 hover:bg-gray-400 shadow-md"
      >
        العودة للقوالب
      </button>
    </div>
  );
};

export default EditControls;
