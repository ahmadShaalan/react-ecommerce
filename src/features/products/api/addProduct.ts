import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductFormValues } from '../types';

export const addProduct = async (
  values: ProductFormValues,
): Promise<ProductFormValues> => {
  const { data } = await httpClient.post<ProductFormValues[]>(
    '/rpc/create_product',
    {
      p_name: values.name,
      p_base_price: values.base_price,
      p_status: values.status,
      p_category: values.category,
      p_description: values.description,
      p_slug: values.slug,
    },
  );

  return data[0];
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
