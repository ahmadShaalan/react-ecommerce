import {
  Cpu,
  Folder,
  Home,
  Laptop,
  Pencil,
  Plus,
  Shirt,
  Smartphone,
  Trash2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useGetCategoriesList } from '../api/getCategoriesList';

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  laptop: Laptop,
  shirt: Shirt,
  home: Home,
  cpu: Cpu,
  folder: Folder,
  plus: Plus,
};

const COLORS: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  violet: 'bg-violet-50 text-violet-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  pink: 'bg-pink-50 text-pink-600',
  rose: 'bg-rose-50 text-rose-600',
  cyan: 'bg-cyan-50 text-cyan-600',
  orange: 'bg-orange-50 text-orange-600',
  zinc: 'bg-zinc-100 text-zinc-600',
};

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
        {categories?.map((category) => {
          const Icon = ICONS[category.icon] ?? Folder;

          return (
            <li
              key={category.id}
              className="group flex items-center gap-3 px-5 py-3 hover:bg-zinc-50"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${COLORS[category.color] ?? COLORS.zinc}`}
              >
                <Icon className="h-4 w-4" />
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
          );
        })}
      </ul>
    </>
  );
};

export default CategoriesList;
