export interface Variant {
  id: string | null;
  sku: string;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
  product_id?: string;
}
