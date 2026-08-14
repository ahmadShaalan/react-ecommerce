import { useForm } from 'react-hook-form';
import { useAddCategory } from '../api/addCategory';
import { categorySchema, type CreateCategoryValue } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCategories } from '../api/getCategories';
import toast from 'react-hot-toast';

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const AddCategoryForm = () => {
  const { mutate: addCategory } = useAddCategory();
  const { data: categories } = useGetCategories();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateCategoryValue>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      is_active: true,
      parent_id: null,
      sort_order: 0,
    },
  });

  const onSubmit = (data: CreateCategoryValue) => {
    const formattedData = {
      ...data,
      parent_id: data.parent_id ? Number(data.parent_id) : null,
      sort_order: Number(data.sort_order ?? 0),
    };

    addCategory(formattedData, {
      onSuccess: () => {
        reset();
        toast.success('Created successfully');
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-800">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
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
        <label className="mb-1.5 block text-sm font-medium text-zinc-800">
          Slug
        </label>
        <input
          {...register('slug')}
          type="text"
          placeholder="e.g. phones"
          className={`${field} ${
            errors.slug
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : ''
          }`}
        />
        {errors.slug && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-800">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="What belongs in this category?"
          className={`${field} resize-none ${
            errors.description
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : ''
          }`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-800">
          Parent category
        </label>
        <select
          {...register('parent_id')}
          className={`${field} cursor-pointer ${
            errors.parent_id
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : ''
          }`}
        >
          <option value="">— None (top level) —</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.parent_id && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.parent_id.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer select-none">
          <input
            {...register('is_active')}
            type="checkbox"
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
          disabled={isSubmitting}
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
