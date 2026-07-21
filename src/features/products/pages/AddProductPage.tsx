import { Link } from 'react-router-dom';
import { useGetCategories } from '../../categories/api/getCategories';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const field =
  'w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and dashes only'),
  description: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string(),
  base_price: z.number().min(0, 'Price must be 0 or more'),
});

type ProductFormValues = z.infer<typeof productSchema>;

function AddProductPage() {
  const categories = useGetCategories();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-screen max-w-6xl flex-col p-4 md:p-6 overflow-hidden"
    >
      {/* Header */}
      <div className="shrink-0 pb-4">
        <h1 className="text-xl font-bold text-zinc-900 md:text-2xl">
          Add New Product
        </h1>
        <p className="mt-0.5 text-xs text-zinc-500 md:text-sm">
          Fill in the details below to create a new product item in your
          catalog.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid flex-1 grid-cols-1 items-start gap-4 overflow-y-auto pr-1 lg:grid-cols-2 lg:gap-6">
        {/* Section 1: Product details */}
        <section className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Product details
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Basic information shown to customers.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pixel-9 Phone"
                  {...register('name')}
                  className={field}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                  Slug <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="auto-generated from name"
                  {...register('slug')}
                  className={field}
                />
                {errors.slug ? (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.slug.message}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Used in URLs. Lowercase letters, numbers, and dashes only.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the product..."
                  {...register('description')}
                  className={`${field} resize-none`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Column 2: Organize & Pricing */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Section 2: Organize */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">Organize</h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Categorize and control visibility.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                  Category
                </label>
                <select
                  {...register('category')}
                  disabled={categories.isLoading}
                  className={field}
                >
                  <option value="">
                    {categories.isLoading ? 'Loading…' : '— No category —'}
                  </option>
                  {categories.data?.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                  Status <span className="text-red-600">*</span>
                </label>
                <select {...register('status')} className={field}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Pricing */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">Pricing</h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Base price for this product. Variants can override.
            </p>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-zinc-800">
                Base price <span className="text-red-600">*</span>
              </label>

              <div className="relative max-w-xs">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('base_price')}
                  className={`${field} pl-7`}
                />
              </div>

              {errors.base_price && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.base_price.message}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Actions (Always Fixed at Bottom) */}
      <div className="shrink-0 border-t border-zinc-200 pt-4 mt-2 flex justify-end gap-3">
        <Link
          to="/products"
          className="rounded-xl border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-xl bg-black px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving…' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default AddProductPage;
