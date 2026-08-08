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
  id: number;
  name: string;
  slug: string;
  parent: string | null;
  is_active: boolean;
  parent_id: number | null;
  description: string;
  product_count: number;
}
