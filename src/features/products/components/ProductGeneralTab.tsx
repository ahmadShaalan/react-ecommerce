import { Link } from 'react-router-dom';

const CATEGORIES = [
  'Phones',
  'Laptops',
  'Wearables',
  'Audio',
  'Accessories',
  'Tablets',
  'Smart home',
];

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export function ProductGeneralTab() {
  return (
    <form className="grid grid-cols-12 gap-6">
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
              placeholder="e.g. Pixel-9 Phone"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Slug <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="auto-generated from name"
              className={field}
            />
            <p className="mt-1 text-xs text-zinc-500">
              Used in URLs. Lowercase letters, numbers, and dashes only.
            </p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the product..."
              className={field}
            />
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
              <select className={field}>
                <option value="">— No category —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-800">
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
                step="0.01"
                placeholder="0.00"
                className={`${field} pl-7`}
              />
            </div>
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
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
        >
          submit
        </button>
      </div>
    </form>
  );
}
