import { DataTable, type Column } from '../../../components/DataTable';
import { Pagination } from '../../../components/Pagination';
import { useGetCategories } from '../../categories/api/getCategories';
import { useGetProducts } from '../api/getProducts';
import type { Product, ProductStatus } from '../types';
import { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const { data: products } = useGetProducts({
    p_page: currentPage,
    p_page_size: 10,
    p_search: search,
    p_status: status,
    p_category: category,
  });

  const { data: categories } = useGetCategories();

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
      <div className="mb-5 flex items-center gap-3">
        <div className="relative w-65">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setCurrentPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search..."
            className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pr-4 pl-10 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <div className="relative w-44">
          <select
            value={status}
            onChange={(e) => {
              setCurrentPage(1);
              setStatus(e.target.value);
            }}
            className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="relative w-44">
          <select
            value={category}
            onChange={(e) => {
              setCurrentPage(1);
              setCategory(e.target.value);
            }}
            className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          >
            <option value="">All Categories</option>
            {categories?.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {(status || category || search) && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setStatus('');
              setCategory('');
            }}
            className="cursor-pointer rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-50 md:ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={products?.items ?? []}
        rowKey={(p) => p.id}
      />
      <Pagination
        page={products?.meta.currentPage || 1}
        pageSize={products?.meta.pageSize || 10}
        total={products?.meta.totalCount || 0}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsList;
