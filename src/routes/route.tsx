import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import ProductsPage from '../features/products/pages/ProductsPage';
import AddProductPage from '../features/products/pages/AddProductPage';

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
    ],
  },
]);
