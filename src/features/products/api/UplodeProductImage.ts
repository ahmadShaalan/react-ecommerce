import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadToStorage } from '../../../lib/storage';
import { httpClient } from '../../../lib/httpClient';

function extensionOf(name: string) {
  return name.split('.').pop()?.toLowerCase() || 'jpg';
}

export async function uploadProductImage(
  productId: string,
  file: File,
): Promise<void> {
  const path = `${productId}/${crypto.randomUUID()}.${extensionOf(file.name)}`;
  await uploadToStorage('product-images', path, file); // 1. bytes → Storage
  await httpClient.post('/rpc/add_product_image', {
    p_product_id: productId,
    p_storage_path: path,
  }); // 2. row → DB
}

export function useUploadProductImages(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (files: File[]) =>
      Promise.all(files.map((f) => uploadProductImage(productId, f))),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products', 'images', productId],
      });
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] }); // refresh the list thumbnail
    },
  });
}
