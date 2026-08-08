import { Plus } from 'lucide-react';
import CategoriesList from '../components/CategoriesList';

const SAMPLE = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    parent: null,
    is_active: true,
    product_count: 14,
  },
  {
    id: 2,
    name: 'Phones',
    slug: 'phones',
    parent: 'Electronics',
    is_active: true,
    product_count: 15,
  },
  {
    id: 3,
    name: 'Laptops',
    slug: 'laptops',
    parent: 'Electronics',
    is_active: true,
    product_count: 16,
  },
  {
    id: 4,
    name: 'Clothing',
    slug: 'clothing',
    parent: null,
    is_active: true,
    product_count: 16,
  },
  {
    id: 5,
    name: "Men's Shirts",
    slug: 'mens-shirts',
    parent: 'Clothing',
    is_active: true,
    product_count: 14,
  },
  {
    id: 6,
    name: 'Home & Garden',
    slug: 'home-and-garden',
    parent: null,
    is_active: false,
    product_count: 15,
  },
];

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export function CategoriesPage() {
  return (
    <main className="grid grid-cols-1 gap-6 px-8 py-8 lg:grid-cols-3">
      {/* Left — the list */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm lg:col-span-2">
        <CategoriesList />
      </div>

      {/* Right — the form */}
      <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">New category</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>

        <form className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Name
            </label>
            <input type="text" placeholder="e.g. Phones" className={field} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Slug
            </label>
            <input type="text" placeholder="e.g. phones" className={field} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="What belongs in this category?"
              className={field}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-800">
              Parent category
            </label>
            <select className={field}>
              <option value="">— None (top level) —</option>
              {SAMPLE.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-emerald-600"
            />
            Active (visible to customers)
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
