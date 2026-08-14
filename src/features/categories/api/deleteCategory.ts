import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';

export const deleteCategory = async (id: string | number): Promise<void> => {
  await httpClient.delete('/categories', {
    params: {
      id: `eq.${id}`,
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories-list'],
      });
    },
  });
};
