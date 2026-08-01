import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  CarForm,
  CarList,
  fetchCars,
  GaragePagination,
  RaceControls,
  selectGarageCurrentPage,
} from '@/features/garage';
import { useEffect } from 'react';

export function GaragePage() {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectGarageCurrentPage);

  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page]);

  return (
    <section>
      <h1>Garage</h1>

      <CarForm />

      <RaceControls />

      <CarList />

      <GaragePagination />
    </section>
  );
}
