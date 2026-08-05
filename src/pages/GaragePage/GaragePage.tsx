import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';

import {
  CarList,
  GaragePagination,
  RaceControls,
  fetchCars,
  selectCars,
  selectGarageCurrentPage,
  selectGarageTotalCount,
} from '@/features/garage';

export function GaragePage() {
  const dispatch = useAppDispatch();

  const cars = useAppSelector(selectCars);
  const currentPage = useAppSelector(selectGarageCurrentPage);
  const totalCount = useAppSelector(selectGarageTotalCount);

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (cars.length === 0 && currentPage === 1 && totalCount > 0) {
      dispatch(fetchCars(1));
    }
  }, [cars.length, currentPage, totalCount, dispatch]);

  return (
    <section className="flex flex-col gap-4">
      <RaceControls />

      <CarList />

      <GaragePagination />
    </section>
  );
}
