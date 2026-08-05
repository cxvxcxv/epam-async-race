import type { RootState } from '@/app/store';
import type { CarRaceState } from './types';

const DEFAULT_CAR_RACE_STATE: CarRaceState = {
  status: 'stopped',
  duration: 0,
  velocity: 0,
  distance: 0,
};

export const selectCarRaceState = (id: number) => (state: RootState) =>
  state.race.cars[id] ?? DEFAULT_CAR_RACE_STATE;
export const selectIsRacing = (state: RootState) => state.race.isRacing;
export const selectRaceWinner = (state: RootState) => state.race.winner;
