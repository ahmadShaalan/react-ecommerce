import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductsResponse } from '../types';

export const getProducts = async (page = 1): Promise<ProductsResponse> => {
  const { data } = await httpClient.post<ProductsResponse>(
    '/rpc/list_products',
    {
      p_page: page,
      p_page_size: 10,
    },
  );

  return data;
};

export const useGetProducts = (page = 1) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
    placeholderData: keepPreviousData,
  });
};
