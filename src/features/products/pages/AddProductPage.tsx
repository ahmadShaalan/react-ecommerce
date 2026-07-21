import { Link } from 'react-router-dom';
import { useGetCategories } from '../../categories/api/getCategories';

const field =
  'w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200';

function AddProductPage() {
  const { data: categories } = useGetCategories();

  return (
    <form className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900">Add New Product</h1>
        <p className="text-sm text-zinc-500">
          Fill in the details below to create a new product item in your
          catalog.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 items-start  gap-6 lg:grid-cols-2">
        {/* Section 1: Product details */}
        <section className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              Product details
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Basic information shown to customers.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pixel-9 Phone"
                  className={field}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Slug <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="auto-generated from name"
                  className={field}
                />
                <p className="mt-2 text-xs text-zinc-500">
                  Used in URLs. Lowercase letters, numbers, and dashes only.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe the product..."
                  className={`${field} resize-none`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Column 2: Organize & Pricing stacked together */}
        <div className="flex flex-col gap-6">
          {/* Section 2: Organize */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Organize</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Categorize and control visibility.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Category
                </label>
                <select className={field}>
                  <option value="">— No category —</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-800">
                  Status <span className="text-red-600">*</span>
                </label>
                <select className={field}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Pricing */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Pricing</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Base price for this product. Variants can override.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-zinc-800">
                Base price <span className="text-red-600">*</span>
              </label>

              <div className="relative max-w-xs">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`${field} pl-8`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          to="/products"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
        >
          Create Product
        </button>
      </div>
    </form>
  );
}

export default AddProductPage;
