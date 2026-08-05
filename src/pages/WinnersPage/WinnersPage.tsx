import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';

import { WinnersPagination } from '@/features/winners/components/WinnersPagination';
import { WinnersTable } from '@/features/winners/components/WinnersTable';
import { selectWinnersIsLoading } from '@/features/winners/selectors';
import { fetchWinners } from '@/features/winners/thunks';

export function WinnersPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectWinnersIsLoading);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-primary mb-6 text-4xl font-black tracking-widest">
        Winners
      </h1>

      {isLoading ? (
        <div className="text-primary animate-pulse py-12 text-center text-xl">
          Loading winners...
        </div>
      ) : (
        <>
          <WinnersTable />
          <WinnersPagination />
        </>
      )}
    </div>
  );
}

export default WinnersPage;
