
import type { AppSettings, Product } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
    headerTitle: 'أثاث واواني متنوعه',
    headerColor: '#dc2626' // Tailwind's red-600
};

export const DEFAULT_PRODUCTS: Product[] = [
    { id: 1, name: 'معاشر ذهبي', number: '551', price: 58.0, status: 'جديد', description: 'معاشر ذهبي اشكال جديد مقاس 40 - 25', imageUrl: 'https://picsum.photos/seed/item551/100/100' },
    { id: 2, name: 'مرايات مع الاضاءة تفصيل', number: '552', price: 200.0, status: 'حسب الطلب', description: 'تفصيل مرايات مع الاضاءه حسب الطلب الشكل والمقاس حسب الطلب', imageUrl: 'https://picsum.photos/seed/item552/100/100' },
    { id: 3, name: 'مرايات تسريحه مضيئه', number: '553', price: 17.0, status: 'جديد', description: 'مرايات تسريحات ستاندر مع الاضاءه وشاحن يو اس بي مع البطاريه', imageUrl: 'https://picsum.photos/seed/item553/100/100' },
    { id: 4, name: 'طاولات زجاج', number: '554', price: 65.0, status: 'جمله تفرقه', description: 'طاولات زجاج الوان متنوعه واشكال جديده', imageUrl: 'https://picsum.photos/seed/item554/100/100' },
    { id: 5, name: 'طاولات زجاج', number: '555', price: 65.0, status: 'جمله تفرقه', description: 'طاولات زجاج الوان متنوعه واشكال جديده', imageUrl: 'https://picsum.photos/seed/item555/100/100' },
];