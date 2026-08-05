import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

import { engineApi } from '@/api/engine';
import { winnersApi } from '@/api/winners';

import type { Car } from '@/shared/types';

import { showWinnerToast } from '../garage/lib/showWinnerToast';

import {
  resetCarState,
  resetRace,
  setCarStatus,
  setEngineStarted,
  setRaceWinner,
  startRace,
} from './slice';

// update existing winner or create new
async function saveOrUpdateWinner(winner: {
  id: number;
  name: string;
  time: number;
}) {
  try {
    const existingWinner = await winnersApi.getWinner(winner.id);
    if (existingWinner) {
      const bestTime = Math.min(existingWinner.time, winner.time);
      await winnersApi.updateWinner(winner.id, {
        wins: existingWinner.wins + 1,
        time: bestTime,
      });
    } else {
      await winnersApi.createWinner({
        wins: 1,
        time: winner.time,
      });
    }
  } catch {
    // 404 means winner doesn't exist yet
    try {
      await winnersApi.createWinner({
        wins: 1,
        time: winner.time,
      });
    } catch {
      // igonre api errors
    }
  }
}

export const startSingleCar = createAsyncThunk<void, Car, { state: RootState }>(
  'race/startSingleCar',
  async (car, { dispatch, getState }) => {
    try {
      dispatch(setCarStatus({ id: car.id, status: 'starting' }));

      const { velocity, distance } = await engineApi.startEngine(car.id);
      const duration = distance / velocity / 1000; // convert ms to seconds

      dispatch(setEngineStarted({ id: car.id, velocity, distance, duration }));

      const startTime = performance.now();
      const response = await engineApi.drive(car.id);

      if (response.success) {
        const elapsedTime = (performance.now() - startTime) / 1000;
        dispatch(setCarStatus({ id: car.id, status: 'finished' }));

        const state = getState();
        if (state.race.isRacing && !state.race.winner) {
          const winner = {
            id: car.id,
            name: car.name,
            time: Number(elapsedTime.toFixed(2)),
          };
          dispatch(setRaceWinner(winner));
          showWinnerToast(winner.name, winner.time);
          await saveOrUpdateWinner(winner);
        }
      }
    } catch (error) {
      dispatch(setCarStatus({ id: car.id, status: 'broken' }));
    }
  },
);

// stop a car and reset engine
export const stopSingleCar = createAsyncThunk<void, number>(
  'race/stopSingleCar',
  async (id, { dispatch }) => {
    try {
      await engineApi.stopEngine(id);
    } catch {
      // ignore api error
    } finally {
      dispatch(resetCarState(id));
    }
  },
);

export const startAllCars = createAsyncThunk<void, Car[], { state: RootState }>(
  'race/startAllCars',
  async (cars, { dispatch }) => {
    dispatch(startRace());
    await Promise.all(cars.map(car => dispatch(startSingleCar(car))));
  },
);

export const resetAllCars = createAsyncThunk<void, Car[], { state: RootState }>(
  'race/resetAllCars',
  async (cars, { dispatch }) => {
    dispatch(resetRace());
    await Promise.all(cars.map(car => dispatch(stopSingleCar(car.id))));
  },
);
