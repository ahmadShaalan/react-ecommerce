import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductsResponse } from '../types';

interface ProductsPayload {
  p_page: number;
  p_page_size?: number;
  p_search?: string;
  p_status: string;
  p_category: string;
}

export const getProducts = async (
  payload: ProductsPayload,
): Promise<ProductsResponse> => {
  const { data } = await httpClient.post<ProductsResponse>(
    '/rpc/list_products',
    {
      p_page: payload.p_page || 1,
      p_page_size: payload.p_page_size || 10,
      p_search: payload.p_search || '',
      p_status: payload.p_status || '',
      p_category: payload.p_category || '',
    },
  );

  return data;
};

export const useGetProducts = (payload: ProductsPayload) => {
  return useQuery({
    queryKey: [
      'products',
      payload.p_page,
      payload.p_search,
      payload.p_page_size,
      payload.p_status,
      payload.p_category,
    ],
    queryFn: () => getProducts(payload),
    placeholderData: keepPreviousData,
  });
};
