import { DataTable, type Column } from '../../../components/DataTable';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import { useGetOrders } from '../api/getOrders';
import type { Order, OrderStatus } from '../types';

const STATUS: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  paid: { label: 'Paid', className: 'bg-blue-100 text-blue-700' },
  shipped: { label: 'Shipped', className: 'bg-indigo-100 text-indigo-700' },
  delivered: {
    label: 'Delivered',
    className: 'bg-emerald-100 text-emerald-700',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-zinc-100 text-zinc-500 line-through',
  },
  refunded: { label: 'Refunded', className: 'bg-zinc-100 text-zinc-600' },
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const OrdersList = () => {
  const { data: orders } = useGetOrders();

  const columns: Column<Order>[] = [
    {
      key: 'order',
      header: 'Order',
      cell: (o) => <span className="font-medium">{o.order_number}</span>,
    },
    {
      key: 'customer',
      header: 'Customer',
      cell: (o) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
            {initialsOf(o.shipping_address.full_name)}
          </div>
          <div className="min-w-0">
            <div className="truncate">{o.shipping_address.full_name}</div>
            <div className="truncate text-xs text-zinc-500">
              {o.shipping_address.phone ?? 'Guest checkout'}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      className: 'tabular-nums text-zinc-700',
      cell: (o) => o.total,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (o) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS[o.status].className}`}
        >
          {STATUS[o.status].label}
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      className: 'tabular-nums text-zinc-700',
      cell: (o) => `$${o.total.toFixed(2)}`,
    },
    {
      key: 'date',
      header: 'Date',
      className: 'text-zinc-500',
      cell: (o) => formatRelativeTime(o.created_at),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={orders || []}
        rowKey={(order) => order.id}
      />
    </>
  );
};

export default OrdersList;
