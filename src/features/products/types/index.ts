import { z } from 'zod';

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

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and dashes only'),
  description: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string(),
  base_price: z.number().min(0, 'Price must be 0 or more'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
