import { Plus, Trash2 } from 'lucide-react';
import { useGetVariants } from '../api/getVariants';

const cell =
  'rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export function ProductVariantsTab({ id }: { id?: string }) {
  const { data: variants } = useGetVariants({ id });

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
            {variants?.map((v) => (
              <tr key={v.id}>
                <td className="px-3 py-2">
                  <input defaultValue={v.sku} className={`${cell} w-32`} />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.name} className={`${cell} w-32`} />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    defaultValue={v.price}
                    className={`${cell} w-24 tabular-nums`}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    defaultValue={v.stock}
                    className={`${cell} w-20 tabular-nums`}
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    defaultChecked={v.is_active}
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className="rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="rounded p-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          <Plus className="h-4 w-4" /> Add variant
        </button>
      </div>
    </div>
  );
}
