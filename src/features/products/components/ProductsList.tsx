import { DataTable, type Column } from '../../../components/DataTable';
import { useGetProducts } from '../api/getProducts';
import type { Product, ProductStatus } from '../types';

const STATUS_BADGE: Record<ProductStatus, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-zinc-100 text-zinc-700',
  archived: 'bg-zinc-100 text-zinc-500 line-through',
};

function stockBadge(stock: number) {
  if (stock === 0) return 'bg-red-100 text-red-700';
  if (stock < 5) return 'bg-amber-100 text-amber-700';
  return 'bg-emerald-100 text-emerald-700';
}

const ProductsList = () => {
  const { data: products } = useGetProducts();

  const columns: Column<Product>[] = [
    {
      key: 'product',
      header: 'Product',
      cell: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={p.image_url}
            alt=""
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <div className="truncate font-medium">{p.name}</div>
            <div className="truncate text-xs text-zinc-500">{p.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (p) => <span className="text-zinc-700">{p.category ?? '—'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (p) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[p.status]}`}
        >
          {p.status}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      cell: (p) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${stockBadge(p.stock)}`}
        >
          {p.stock} in stock
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      cell: (p) => (
        <span className="tabular-nums font-bold text-zinc-700">
          ${p.price.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={products?.items ?? []}
        rowKey={(p) => p.id}
      />
    </div>
  );
};

export default ProductsList;
