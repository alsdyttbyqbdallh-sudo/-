
export interface Product {
  id: number;
  name: string;
  number: string;
  price: number;
  status: 'جديد' | 'حسب الطلب' | 'جمله تفرقه';
  description: string;
  imageUrl: string;
}

export interface AppSettings {
  headerTitle: string;
  headerColor: string;
}

export type View = 'list' | 'details' | 'editControls';

export interface Message {
    text: string;
    type: 'success' | 'error';
}