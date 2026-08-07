import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Variant } from '../types/variants.types';
import { useGetVariants } from '../api/getVariants';
import { Spinner } from '../../../components/Spinner';
import { useAddEditVariant } from '../api/addEditVariant';
import toast from 'react-hot-toast';
import { useDeleteVariant } from '../api/deleteVariant';

const cell =
  'rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export function ProductVariantsTab({ id }: { id: string }) {
  const { data: variants, isLoading, isError } = useGetVariants({ id });
  const { mutate: addEditVariant, isPending } = useAddEditVariant();
  const { mutate: deleteVariant } = useDeleteVariant();

  // null = "the user hasn't changed anything yet"
  const [draft, setDraft] = useState<Variant[] | null>(null);

  const rows = draft ?? variants ?? [];

  function updateRow(index: number, changes: Partial<Variant>) {
    const copy = [...rows];
    copy[index] = { ...copy[index], ...changes };
    setDraft(copy);
  }

  function addRow() {
    setDraft([
      ...rows,
      { id: '', sku: '', name: '', price: 0, stock: 0, is_active: true },
    ]);
  }

  function removeRow(index: number) {
    setDraft(rows.filter((_, i) => i !== index));
  }

  function saveRowApi(index: number) {
    addEditVariant(
      {
        ...rows[index],
        product_id: id,
      },
      {
        onSuccess: () => {
          toast.success('Saved');
          setDraft(null); // throw the draft away…
        },
        onError: () => toast.error('Could not save. Is the SKU unique?'),
      },
    );
  }

  function deleteRowApi(index: number) {
    const row = rows[index];
    if (!row.id) {
      // never saved — just take it off the screen
      removeRow(index);
      return;
    }
    deleteVariant(row.id, {
      onSuccess: () => {
        toast.success('Deleted');
        setDraft(null);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Couldn't load variants.
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-left">
            <tr>
              <th className="px-3 py-2 font-medium text-zinc-600">SKU</th>
              <th className="px-3 py-2 font-medium text-zinc-600">Name</th>
              <th className="px-3 py-2 font-medium text-zinc-600">Price</th>
              <th className="px-3 py-2 font-medium text-zinc-600">Stock</th>
              <th className="px-3 py-2 font-medium text-zinc-600">Active</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="px-3 py-2">
                  <input
                    value={row.sku}
                    onChange={(e) => updateRow(index, { sku: e.target.value })}
                    className={`${cell} w-32`}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={row.name}
                    onChange={(e) => updateRow(index, { name: e.target.value })}
                    className={`${cell} w-32`}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={row.price}
                    onChange={(e) =>
                      updateRow(index, { price: Number(e.target.value) })
                    }
                    className={`${cell} w-24`}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={row.stock}
                    onChange={(e) =>
                      updateRow(index, { stock: Number(e.target.value) })
                    }
                    className={`${cell} w-20`}
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.is_active}
                    onChange={(e) =>
                      updateRow(index, { is_active: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => saveRowApi(index)}
                    className="rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
                  >
                    {isPending ? 'saving...' : 'save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRowApi(index)}
                    className="ml-1 rounded p-1.5 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
      >
        <Plus className="h-4 w-4" /> Add variant
      </button>
    </div>
  );
}
