import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export async function setPrimaryImage(id: string): Promise<void> {
  await httpClient.post('/rpc/set_primary_image', { p_id: id });
}

export function useSetPrimaryImage(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPrimaryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images', productId],
      });
    },
  });
}
