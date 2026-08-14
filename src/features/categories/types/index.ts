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
