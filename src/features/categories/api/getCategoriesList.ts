import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { CategoryInfo } from '../types';

export const getCategoriesList = async (): Promise<CategoryInfo[]> => {
  const { data } = await httpClient.post<CategoryInfo[]>(
    '/rpc/list_categories',
  );

  return data;
};

export const useGetCategoriesList = () => {
  return useQuery({
    queryKey: ['categories-list'],
    queryFn: getCategoriesList,
  });
};
