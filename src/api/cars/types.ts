import type { Car } from '@/shared/types';

export interface GetCarsParams {
  page: number;
  limit: number;
}

export interface GetCarsResponse {
  cars: Car[];
  totalCount: number;
}

export type CreateCarDto = Omit<Car, 'id'>;
export type UpdateCarDto = Partial<Car>;
