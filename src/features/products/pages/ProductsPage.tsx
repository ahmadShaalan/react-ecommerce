import { Plus } from 'lucide-react';
import ProductsList from '../components/ProductsList';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/products/new')}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus size={18} />
          New Product
        </button>
      </div>

      <ProductsList />
    </main>
  );
};

export default ProductsPage;
