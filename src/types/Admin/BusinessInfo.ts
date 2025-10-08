export interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}
export interface Policy {
  id: string;
  title: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  status: 'Active' | 'Inactive';
}