import { Upload, Star, Trash2 } from 'lucide-react';
import { Spinner } from '../../../components/Spinner';
import { useGetProductImages } from '../api/getProductImages';
import type { ProductImage } from '../types/variants.types';

import toast from 'react-hot-toast';
import { useUploadProductImages } from '../api/UplodeProductImage';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

export function ProductImagesTab({ id }: { id: string }) {
  const images = useGetProductImages({ id });

  const upload = useUploadProductImages(id);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const valid = Array.from(fileList).filter((f) => {
      if (!ACCEPTED.includes(f.type)) {
        toast.error(`${f.name}: unsupported type`);
        return false;
      }
      if (f.size > MAX_BYTES) {
        toast.error(`${f.name}: larger than 5MB`);
        return false;
      }
      return true;
    });
    if (!valid.length) return;
    upload.mutate(valid, {
      onSuccess: () => {
        toast.success(valid.length > 1 ? 'Images uploaded' : 'Image uploaded');
        images.refetch();
      },
      onError: () => toast.error('Upload failed'),
    });
  };

  if (images.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Couldn't load images.
      </div>
    );
  }
  if (images.isLoading || !images.data) {
    return (
      <div className="grid place-items-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-4">
      {/* Dropzone (wired next step) */}
      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white p-8 text-sm transition-colors hover:border-zinc-400 ${upload.isPending ? 'pointer-events-none opacity-60' : ''}`}
      >
        {upload.isPending ? (
          <>
            <Spinner className="mb-2 h-6 w-6" />
            <div className="text-zinc-700">Uploading…</div>
          </>
        ) : (
          <>
            <Upload className="mb-2 h-6 w-6 text-zinc-400" />
            <div className="text-zinc-700">
              Drop images here, or <span className="underline">browse</span>
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              JPEG, PNG, WebP · 5MB max each
            </div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={upload.isPending}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </label>

      {images.data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
          No images yet. Upload the first one above.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.data?.map((img: ProductImage) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white"
            >
              <img
                src={img.url}
                alt=""
                className="aspect-square w-full object-cover"
              />

              {img.is_primary && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                  <Star className="h-3 w-3 fill-current" /> Primary
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                {!img.is_primary && (
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-white hover:bg-white/20"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  className="rounded-md p-1.5 text-white hover:bg-white/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
