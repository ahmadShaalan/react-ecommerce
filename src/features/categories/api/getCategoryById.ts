import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Category } from '../types';

export const getCategoryById = async (id: string): Promise<Category> => {
  const { data } = await httpClient.get<Category[]>('/categories', {
    params: {
      id: `eq.${id}`,
    },
  });

  return data[0];
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
