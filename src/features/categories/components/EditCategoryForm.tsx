import { useForm } from 'react-hook-form';
import type { EditCategoryFormValue } from '../types';
import { useGetCategoryById } from '../api/getCategoryById';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useEditCategory } from '../api/editCategory';
import { Loader2 } from 'lucide-react';

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const EditCategoryForm = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('edit');
  const { data: category, isLoading } = useGetCategoryById(categoryId!);
  const { mutate: editCategory, isPending } = useEditCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCategoryFormValue>({
    defaultValues: {
      is_active: category?.is_active,
      name: category?.name,
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        is_active: category.is_active,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: EditCategoryFormValue) => {
    editCategory({
      id: categoryId || null || undefined,
      categories: {
        is_active: data.is_active,
        name: data.name,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="mt-5 space-y-4 animate-pulse">
        {/* Name input skeleton */}
        <div>
          <div className="mb-1.5 h-4 w-12 rounded bg-zinc-200"></div>
          <div className="h-9 w-full rounded-lg bg-zinc-100"></div>
        </div>

        {/* Checkbox skeleton */}
        <div className="flex items-center gap-2.5">
          <div className="h-4 w-4 rounded bg-zinc-200"></div>
          <div className="h-4 w-40 rounded bg-zinc-100"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex justify-end gap-2 pt-2">
          <div className="h-9 w-16 rounded-lg bg-zinc-100"></div>
          <div className="h-9 w-16 rounded-lg bg-zinc-200"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-800">
          Name
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="e.g. Phones"
          className={`${field} ${
            errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : ''
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer select-none">
          <input
            type="checkbox"
            {...register('is_active')}
            className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500/20 focus:ring-offset-0 transition-colors cursor-pointer"
          />
          <span className="font-medium text-zinc-800">
            Active (visible to customers)
          </span>
        </label>
        {errors.is_active && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.is_active.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default EditCategoryForm;
