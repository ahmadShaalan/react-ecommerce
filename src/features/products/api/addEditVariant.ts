import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Variant } from '../types/variants.types';

export const addEditVariant = async (variant: Variant): Promise<Variant> => {
  const { data } = await httpClient.post<Variant>('/rpc/upsert_variant', {
    p_id: variant.id || null,
    p_product_id: variant.product_id,
    p_is_active: variant.is_active,
    p_stock: variant.stock,
    p_price: variant.price,
    p_name: variant.name,
    p_sku: variant.sku,
  });

  return data;
};

export const useAddEditVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEditVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['variants'],
      });
    },
  });
};
