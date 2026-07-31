import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { SingleProduct } from '../types';

export const getProductById = async ({
  productId,
}: {
  productId?: string;
}): Promise<SingleProduct> => {
  const { data } = await httpClient.post<SingleProduct>('/rpc/get_product', {
    p_id: productId,
  });

  return data;
};

export const useGetProductById = ({ productId }: { productId?: string }) => {
  return useQuery({
    queryKey: ['single-product', productId],
    queryFn: () => getProductById({ productId }),
    enabled: !!productId,
  });
};
