import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Variant } from '../types/variants.types';

export const getVariants = async ({
  id,
}: {
  id: string;
}): Promise<Variant[]> => {
  const { data } = await httpClient.post<Variant[]>('/rpc/list_variants', {
    p_product_id: id,
  });

  return data;
};

export const useGetVariants = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['variants'],
    queryFn: () => getVariants({ id }),
    enabled: !!id,
  });
};
