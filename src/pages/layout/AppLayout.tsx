import { NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <header className="flex items-center p-12 uppercase">
        <nav className="flex flex-col gap-8 text-lg font-bold">
          <NavLink
            to="/garage"
            className="border-primary rounded-md border-2 px-12 py-4"
          >
            Garage
          </NavLink>

          <NavLink
            to="/winners"
            className="border-success rounded-md border-2 px-12 py-4"
          >
            Winners
          </NavLink>
        </nav>
        <h1 className="bg-surface border-primary relative mx-auto my-6 max-w-max -rotate-2 rounded-3xl border-4 px-10 py-6 text-center text-7xl font-black tracking-wider italic">
          <span className="border-primary-hover/50 pointer-events-none absolute inset-2 rounded-2xl border-2" />
          Async race
        </h1>
      </header>

      <main className="px-12 uppercase">
        <Outlet />
      </main>
    </>
  );
}
