import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductsResponse } from '../types';

export const getProducts = async (): Promise<ProductsResponse> => {
  const { data } =
    await httpClient.post<ProductsResponse>('/rpc/list_products');

  return data;
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
