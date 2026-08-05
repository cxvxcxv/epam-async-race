import type { RootState } from '@/app/store';

export const selectCarRaceState = (id: number) => (state: RootState) =>
  state.race.cars[id] || {
    status: 'stopped',
    duration: 0,
    velocity: 0,
    distance: 0,
  };

export const selectIsRacing = (state: RootState) => state.race.isRacing;
export const selectRaceWinner = (state: RootState) => state.race.winner;
