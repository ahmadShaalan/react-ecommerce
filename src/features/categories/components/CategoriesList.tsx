import { Folder, Pencil, Trash2 } from 'lucide-react';
import { useGetCategoriesList } from '../api/getCategoriesList';

const CategoriesList = () => {
  const { data: categories } = useGetCategoriesList();

  return (
    <>
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
        <h3 className="text-base font-semibold">All categories</h3>
        <span className="text-xs text-zinc-500">
          {categories?.length} categories
        </span>
      </div>

      <ul className="divide-y divide-zinc-100">
        {categories?.map((category) => (
          <li
            key={category.id}
            className="group flex items-center gap-3 px-5 py-3 hover:bg-zinc-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
              <Folder className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={
                    category.is_active
                      ? 'font-medium'
                      : 'font-medium text-zinc-500 line-through'
                  }
                >
                  {category.name}
                </div>
                <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600">
                  {category.slug}
                </span>
                {!category.is_active && (
                  <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-500">
                    inactive
                  </span>
                )}
              </div>
              <div className="text-xs text-zinc-500">
                {category.product_count} products
                {category.parent && ` · in ${category.parent}`}
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesList;
