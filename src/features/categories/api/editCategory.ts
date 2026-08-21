import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Category, EditCategoryFormValue } from '../types';

export const ediCategory = async ({
  id,
  categories,
}: {
  id?: string;
  categories: EditCategoryFormValue;
}): Promise<Category> => {
  const { data } = await httpClient.patch<Category[]>(
    '/categories',
    {
      name: categories.name,
      is_active: categories.is_active,
    },
    {
      params: {
        id: `eq.${id}`,
      },
    },
  );

  return data[0];
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ediCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories-list'],
      });
    },
  });
};
