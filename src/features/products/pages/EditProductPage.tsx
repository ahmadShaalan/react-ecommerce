import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductGeneralTab } from '../components/ProductGeneralTab';

type Tab = 'general' | 'variants' | 'images';

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'border-b-2 cursor-pointer border-zinc-900 px-1 pb-3 pt-1 text-sm font-medium text-zinc-900'
          : 'border-b-2 cursor-pointer border-transparent px-1 pb-3 pt-1 text-sm font-medium text-zinc-500 hover:text-zinc-900'
      }
    >
      {children}
    </button>
  );
}

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('general');

  return (
    <main className="space-y-6 px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900"
      >
        <ArrowLeft className="h-3 w-3" /> Products
      </Link>

      {/* Tab bar */}
      <div className="border-b border-zinc-200">
        <nav className="-mb-px flex gap-6">
          <TabButton
            active={tab === 'general'}
            onClick={() => setTab('general')}
          >
            General
          </TabButton>
          <TabButton
            active={tab === 'variants'}
            onClick={() => setTab('variants')}
          >
            Variants
          </TabButton>
          <TabButton active={tab === 'images'} onClick={() => setTab('images')}>
            Images
          </TabButton>
        </nav>
      </div>

      {/* Panels (placeholders for now) */}
      {tab === 'general' && <ProductGeneralTab />}
      {tab === 'variants' && (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">
          Variants editor — coming soon.
        </div>
      )}
      {tab === 'images' && (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">
          Images — coming soon.
        </div>
      )}
    </main>
  );
}
