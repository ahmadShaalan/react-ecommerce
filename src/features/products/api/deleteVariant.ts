import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export const deleteVariant = async (id: string) => {
  await httpClient.post('/rpc/delete_variant', {
    p_id: id,
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['variants'],
      });
    },
  });
};
