import { useSearchParams } from 'react-router-dom';

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
import { Spinner } from '../../../components/Spinner';
import { Modal } from '../../../components/Modal';
import { useState } from 'react';
import { useDeleteCategory } from '../api/deleteCategory';

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

interface CategoryListProps {
  showEditCategoryFormHandler: () => void;
}

const CategoriesList = ({ showEditCategoryFormHandler }: CategoryListProps) => {
  const [, setSearchParams] = useSearchParams();
  const { data: categories, isLoading, isError } = useGetCategoriesList();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const handleDelete = () => {
    console.log(`id: ${deleteId}`);

    if (!deleteId) return;

    deleteCategory(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        setIsOpen(false);
      },
    });
  };

  if (isLoading) {
    return (
      <main className="grid place-items-center py-20">
        <Spinner className="h-8 w-8" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="px-8 py-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn't load categories.
        </div>
      </main>
    );
  }

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
                  onClick={() => {
                    setSearchParams({ edit: String(category.id) });
                    showEditCategoryFormHandler();
                  }}
                  className="rounded p-1.5 cursor-pointer text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setDeleteId(category.id);
                  }}
                  className="rounded p-1.5 cursor-pointer text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDeleteId(null);
        }}
        title="Delete category"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                setDeleteId(null);
              }}
              className="rounded-lg px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-red-600 shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:bg-red-700 active:bg-red-800 cursor-pointer       disabled:bg-red-300 disabled:text-white/80 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Delete
            </button>
          </div>
        }
      >
        <p className="text-gray-600 text-sm">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default CategoriesList;
