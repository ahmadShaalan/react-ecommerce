import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';

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
    ],
  },
]);
