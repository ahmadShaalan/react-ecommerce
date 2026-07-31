import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductVariant } from '../types/variants.types';

export const getVariants = async ({
  id,
}: {
  id?: string;
}): Promise<ProductVariant[]> => {
  const { data } = await httpClient.post<ProductVariant[]>(
    '/rpc/list_variants',
    {
      p_product_id: id,
    },
  );

  return data;
};

export const useGetVariants = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['variants'],
    queryFn: () => getVariants({ id }),
    enabled: !!id,
  });
};
