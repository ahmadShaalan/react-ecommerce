import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Category, CreateCategory } from '../types';

export const addCategory = async (
  category: CreateCategory,
): Promise<Category> => {
  const { data } = await httpClient.post<Category[]>('/categories', {
    name: category.name,
    slug: category.slug,
    description: category.description,
    is_active: category.is_active,
    sort_order: category.sort_order,
    parent_id: category.parent_id,
  });

  return data[0];
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      queryClient.invalidateQueries({
        queryKey: ['categories-list'],
      });
    },
  });
};
