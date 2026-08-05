import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

import { carsApi } from '@/api/cars';
import { winnersApi } from '@/api/winners';

import { WINNERS_PAGE_SIZE } from '@/shared/constants';

import type { WinnerWithCar } from './types';

export const fetchWinners = createAsyncThunk<
  { winners: WinnerWithCar[]; totalCount: number },
  void,
  { state: RootState }
>('winners/fetchWinners', async (_, { getState, rejectWithValue }) => {
  try {
    const { currentPage, sortBy, sortOrder } = getState().winners;

    const response = await winnersApi.getWinners({
      page: currentPage,
      limit: WINNERS_PAGE_SIZE,
      sort: sortBy,
      order: sortOrder,
    });

    const winnersWithCars = await Promise.all(
      response.winners.map(async winner => {
        try {
          const car = await carsApi.getCar(winner.id);
          return { ...winner, car };
        } catch {
          return { ...winner };
        }
      }),
    );

    return {
      winners: winnersWithCars,
      totalCount: response.totalCount,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch winners';
    return rejectWithValue(message);
  }
});
