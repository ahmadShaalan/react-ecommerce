export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: string;
  image_url: string;
}

export interface PageMeta {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  pageCount: number;
}

export interface ProductsResponse {
  items: Product[];
  meta: PageMeta;
}
