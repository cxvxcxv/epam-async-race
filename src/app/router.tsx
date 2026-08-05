import { Navigate, createBrowserRouter } from 'react-router';

import { GaragePage } from '@/pages/GaragePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WinnersPage } from '@/pages/WinnersPage';
import { AppLayout } from '@/pages/layout';

import { ROUTES } from '@/shared/constants';

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
