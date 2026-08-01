import { get, post, put, remove } from '@/api/client';

import { ENDPOINTS } from '@/shared/constants';
import type { Car } from '@/shared/types';
import { getTotalCount } from '../helpers';
import type {
  CreateCarDto,
  GetCarsParams,
  GetCarsResponse,
  UpdateCarDto,
} from './types';

async function getCars({
  page,
  limit,
}: GetCarsParams): Promise<GetCarsResponse> {
  const response = await get<Car[]>(ENDPOINTS.GARAGE, {
    query: {
      _page: page,
      _limit: limit,
    },
  });

  return {
    cars: response.data,
    totalCount: getTotalCount(response.headers),
  };
}

async function getCar(id: number): Promise<Car> {
  const response = await get<Car>(`${ENDPOINTS.GARAGE}/${id}`);

  return response.data;
}

async function createCar(car: CreateCarDto): Promise<Car> {
  const response = await post<Car>(ENDPOINTS.GARAGE, car);

  return response.data;
}

async function updateCar(id: number, car: UpdateCarDto): Promise<Car> {
  const response = await put<Car>(`${ENDPOINTS.GARAGE}/${id}`, car);

  return response.data;
}

async function deleteCar(id: number): Promise<void> {
  await remove(`${ENDPOINTS.GARAGE}/${id}`);
}

export const carsApi = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
