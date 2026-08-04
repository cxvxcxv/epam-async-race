import { carsApi } from '@/api/cars';
import type { CreateCarDto, GetCarsResponse } from '@/api/cars/types';
import { winnersApi } from '@/api/winners';
import { GARAGE_PAGE_SIZE, RANDOM_CAR_COUNT } from '@/shared/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateRandomCars } from './lib/randomCar';
import type { UpdateCarPayload } from './types';

export const fetchCars = createAsyncThunk<GetCarsResponse, number>(
  'garage/fetchCars',
  async (page: number) => carsApi.getCars({ page, limit: GARAGE_PAGE_SIZE }),
);

export const createCar = createAsyncThunk(
  'garage/createCar',
  async (car: CreateCarDto) => carsApi.createCar(car),
);

export const updateCar = createAsyncThunk(
  'garage/updateCar',
  async ({ id, car }: UpdateCarPayload) => carsApi.updateCar(id, car),
);

export const deleteCar = createAsyncThunk(
  'garage/deleteCar',
  async (id: number) => {
    await Promise.allSettled([
      carsApi.deleteCar(id),
      winnersApi.deleteWinner(id),
    ]);

    return id;
  },
);

export const generateRandomCarsThunk = createAsyncThunk<{
  createdCount: number;
  failedCount: number;
}>('garage/generateRandomCars', async () => {
  const drafts = generateRandomCars(RANDOM_CAR_COUNT);
  const results = await Promise.allSettled(
    drafts.map(draft => carsApi.createCar(draft)),
  );

  const createdCount = results.filter(r => r.status === 'fulfilled').length;
  const failedCount = results.length - createdCount;

  return { createdCount, failedCount };
});
