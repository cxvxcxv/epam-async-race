import type { RootState } from '@/app/store';

export const selectCars = (state: RootState) => state.garage.cars;

export const selectGarageTotalCount = (state: RootState) =>
  state.garage.totalCount;

export const selectGarageCurrentPage = (state: RootState) =>
  state.garage.currentPage;

export const selectGarageLoading = (state: RootState) => state.garage.isLoading;

export const selectGarageError = (state: RootState) => state.garage.error;
