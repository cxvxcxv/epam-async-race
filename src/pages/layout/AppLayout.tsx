import { NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/garage">Garage</NavLink>

          <NavLink to="/winners">Winners</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
