import { z } from 'zod';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  parent_id: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryInfo {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  parent: string | null;
  is_active: boolean;
  icon: string;
  color: string;
  product_count: number;
}

export interface CreateCategory {
  name: string;
  slug: string;
  description?: string;
  parent_id: string | number | null;
  sort_order: number;
  is_active: boolean;
}

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  parent_id: z.union([z.string(), z.number()]).nullable(),
  sort_order: z.number(),
  is_active: z.boolean(),
});

export type CreateCategoryValue = z.infer<typeof categorySchema>;
