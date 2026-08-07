import { Upload, Star, Trash2 } from 'lucide-react';

const SAMPLE = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    is_primary: true,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80',
    is_primary: false,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80',
    is_primary: false,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80',
    is_primary: false,
  },
];

export function ProductImagesTab() {
  return (
    <div className="max-w-4xl space-y-4">
      {/* Dropzone */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white p-8 text-sm transition-colors hover:border-zinc-400">
        <Upload className="mb-2 h-6 w-6 text-zinc-400" />
        <div className="text-zinc-700">
          Drop images here, or <span className="underline">browse</span>
        </div>
        <div className="mt-1 text-xs text-zinc-500">
          JPEG, PNG, WebP · 5MB max each
        </div>
        <input type="file" accept="image/*" multiple className="hidden" />
      </label>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SAMPLE.map((img) => (
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
    </div>
  );
}
