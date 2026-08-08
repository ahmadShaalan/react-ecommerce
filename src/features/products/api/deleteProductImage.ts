import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export async function deleteProductImage(id: string): Promise<void> {
  await httpClient.post('/rpc/delete_product_image', { p_id: id });
}

export function useDeleteProductImage(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images', productId],
      });
    },
  });
}
