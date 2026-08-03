import type { RootState } from '@/app/store';

export const selectCars = (state: RootState) => state.garage.cars;

export const selectGarageTotalCount = (state: RootState) =>
  state.garage.totalCount;

export const selectGarageCurrentPage = (state: RootState) =>
  state.garage.currentPage;

export const selectIsFetching = (state: RootState) => state.garage.isFetching;
export const selectIsCreating = (state: RootState) => state.garage.isCreating;
export const selectIsUpdating = (state: RootState) => state.garage.isUpdating;
export const selectIsDeleting = (state: RootState) => state.garage.isDeleting;

export const selectGarageError = (state: RootState) => state.garage.error;

export const selectSelectedCarId = (state: RootState) =>
  state.garage.selectedCarId;

export const selectSelectedCar = (state: RootState) => {
  const selectedId = state.garage.selectedCarId;

  if (selectedId === null) {
    return null;
  }

  return state.garage.cars.find(car => car.id === selectedId) ?? null;
};

export const selectCreateDraft = (state: RootState) => state.garage.createDraft;
export const selectUpdateDraft = (state: RootState) => state.garage.updateDraft;
