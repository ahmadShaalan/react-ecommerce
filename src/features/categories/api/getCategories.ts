import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await httpClient.get<Category[]>('/categories');

  return data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
