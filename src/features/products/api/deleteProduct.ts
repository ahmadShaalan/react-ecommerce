import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export const deleteProduct = async (productId: string) => {
  await httpClient.post('/rpc/delete_product', {
    p_id: productId,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
