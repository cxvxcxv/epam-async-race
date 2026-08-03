import type { CreateCarDto, UpdateCarDto } from '@/api/cars/types';
import type { Car } from '@/shared/types';

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;

  selectedCarId: number | null;

  createDraft: CreateCarDto;
  updateDraft: UpdateCarDto;

  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
}

export interface UpdateCarPayload {
  id: Car['id'];
  car: UpdateCarDto;
}
