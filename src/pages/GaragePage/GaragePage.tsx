import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  CarForm,
  CarList,
  CreateCarForm,
  fetchCars,
  GaragePagination,
  RaceControls,
  selectGarageCurrentPage,
  UpdateCarForm,
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
      <CreateCarForm />
      <UpdateCarForm />

      <RaceControls />

      <CarList />

      <GaragePagination />
    </section>
  );
}
