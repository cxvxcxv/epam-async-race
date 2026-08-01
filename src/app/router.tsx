import { GaragePage } from '@/pages/GaragePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WinnersPage } from '@/pages/WinnersPage';
import { ROUTES } from '@/shared/constants';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
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
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
