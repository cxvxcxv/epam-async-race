import type { UpdateCarDto } from '@/api/cars/types';
import type { Car } from '@/shared/types';

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface UpdateCarPayload {
  id: number;
  car: UpdateCarDto;
}
