import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { EditProductFormValues } from '../types';

export const updateProduct = async (
  values: EditProductFormValues,
): Promise<EditProductFormValues> => {
  const { data } = await httpClient.post<EditProductFormValues[]>(
    'rpc/update_product',
    {
      p_id: values.id,
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
