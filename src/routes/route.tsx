import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import ProductsPage from '../features/products/pages/ProductsPage';
import AddProductPage from '../features/products/pages/AddProductPage';
import { EditProductPage } from '../features/products/pages/EditProductPage';
import { CategoriesPage } from '../features/categories/pages/CategoriesPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/dashboard',
        element: <OverviewPage />,
        handle: {
          title: 'Overview',
          subtitle: 'Snapshot of your store',
        },
      },
      // Products Routes
      {
        path: '/products',
        element: <ProductsPage />,
        handle: {
          title: 'Products',
          subtitle: 'Manage your catalog',
        },
      },
      {
        path: '/products/new',
        element: <AddProductPage />,
        handle: {
          title: 'Add Products',
          subtitle: 'Add new Product',
        },
      },
      {
        path: '/products/:id/edit',
        element: <EditProductPage />,
        handle: {
          title: 'Edit Products',
          subtitle: 'Edit your Product',
        },
      },

      // Categories Routes

      {
        path: '/categories',
        element: <CategoriesPage />,
        handle: {
          title: 'Categories',
          subtitle: 'Organize products into shoppable groups',
        },
      },
    ],
  },
]);
