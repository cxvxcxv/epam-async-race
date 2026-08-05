import { NavLink, Outlet } from 'react-router';

import { ROUTES } from '@/shared/constants';

export function AppLayout() {
  return (
    <>
      <header className="flex flex-col items-center gap-6 p-4 uppercase md:flex-row md:gap-0 md:p-12">
        <nav className="flex w-full flex-row justify-center gap-4 text-sm font-bold md:w-auto md:flex-col md:gap-8 md:text-lg">
          <NavLink
            to={ROUTES.GARAGE}
            className="border-primary flex-1 rounded-md border-2 px-4 py-3 text-center md:flex-none md:px-12 md:py-4"
          >
            Garage
          </NavLink>

          <NavLink
            to={ROUTES.WINNERS}
            className="border-success flex-1 rounded-md border-2 px-4 py-3 text-center md:flex-none md:px-12 md:py-4"
          >
            Winners
          </NavLink>
        </nav>

        <h1 className="bg-surface border-primary relative mx-auto my-2 max-w-full -rotate-2 rounded-2xl border-2 px-6 py-4 text-center text-3xl font-black tracking-wider italic md:my-6 md:rounded-3xl md:border-4 md:px-10 md:py-6 md:text-7xl">
          <span className="border-primary-hover/50 pointer-events-none absolute inset-1.5 rounded-xl border md:inset-2 md:rounded-2xl md:border-2" />
          Async race
        </h1>
      </header>

      <main className="px-4 uppercase md:px-12">
        <Outlet />
      </main>
    </>
  );
}
