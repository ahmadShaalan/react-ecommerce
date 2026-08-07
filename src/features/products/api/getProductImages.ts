import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export const getProductImages = async ({ id }: { id: string }) => {
  const { data } = await httpClient.post('/rpc/list_product_images', {
    p_product_id: id,
  });

  return data;
};

export const useGetProductImages = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['images'],
    queryFn: () => getProductImages({ id }),
    enabled: !!id,
  });
};
