import { Link, useNavigate } from 'react-router-dom';
import { useGetProductById } from '../api/getProductById';
import { useForm } from 'react-hook-form';
import { productSchema, type ProductFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCategories } from '../../categories/api/getCategories';
import { useUpdateProduct } from '../api/updatePrduct';
import toast from 'react-hot-toast';

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export function ProductGeneralTab({ id }: { id?: string }) {
  const { data, isLoading } = useGetProductById({ productId: id });
  const { data: categories, isLoading: categoryLoad } = useGetCategories();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    values: data
      ? {
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category,
          status: data.status,
          base_price: data.base_price,
        }
      : undefined,
  });

  const onSubmit = async (data: ProductFormValues) => {
    await updateProduct({
      ...data,
      id,
    });

    navigate('/products');

    toast.success('Product updated successfully');
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
      {' '}
      {/* Product details */}
      <section className="col-span-12 xl:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold">Product details</h3>
        <p className="text-xs text-zinc-500">
          Basic information shown to customers.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. Pixel-9 Phone"
              className={field}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Slug <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register('slug')}
              placeholder="auto-generated from name"
              className={field}
            />
            {errors.slug ? (
              <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>
            ) : (
              <p className="mt-1 text-xs text-zinc-500">
                Used in URLs. Lowercase letters, numbers, and dashes only.
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Description
            </label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Describe the product..."
              className={field}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </section>
      <div className="col-span-12 xl:col-span-5 space-y-6">
        {/* Organize */}

        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold">Organize</h3>
          <p className="text-xs text-zinc-500">
            Categorize and control visibility.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                Category
              </label>

              {!categoryLoad && (
                <select {...register('category')} className={field}>
                  <option value="">— No category —</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}

              {errors.category && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                Status <span className="text-red-600">*</span>
              </label>
              <select {...register('status')} className={field}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              {errors.status && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </section>
        {/* Pricing */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold">Pricing</h3>
          <p className="text-xs text-zinc-500">
            Base price for this product. Variants can override.
          </p>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Base price <span className="text-red-600">*</span>
            </label>
            <div className="relative max-w-xs">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                $
              </span>
              <input
                type="number"
                {...register('base_price', { valueAsNumber: true })}
                step="0.01"
                placeholder="0.00"
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
      {/* Actions */}
      <div className="col-span-12 flex justify-end gap-3 border-t border-zinc-200 pt-6">
        <Link
          to="/products"
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg cursor-pointer bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'submit'}
        </button>
      </div>
    </form>
  );
}
