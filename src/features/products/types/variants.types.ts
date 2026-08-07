export interface Variant {
  id: string | null;
  sku: string;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
  product_id?: string;
}

export interface ProductImage {
  id: string;
  storage_path: string;
  url: string;
  is_primary: boolean;
  sort_order: number;
}
