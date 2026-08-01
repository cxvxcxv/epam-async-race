import { GaragePage } from '@/pages/GaragePage';
import { AppLayout } from '@/pages/layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WinnersPage } from '@/pages/WinnersPage';
import { ROUTES } from '@/shared/constants';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={ROUTES.GARAGE} replace />,
      },
      {
        path: ROUTES.GARAGE,
        element: <GaragePage />,
      },
      {
        path: ROUTES.WINNERS,
        element: <WinnersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
