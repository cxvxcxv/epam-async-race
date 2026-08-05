import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { EngineStatus, RaceState, RaceWinner } from './types';

const initialState: RaceState = {
  cars: {},
  isRacing: false,
  winner: null,
};

const defaultCarState = {
  status: 'stopped' as EngineStatus,
  duration: 0,
  velocity: 0,
  distance: 0,
};

export const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarStatus(
      state,
      action: PayloadAction<{ id: number; status: EngineStatus }>,
    ) {
      const { id, status } = action.payload;
      if (!state.cars[id]) {
        state.cars[id] = { ...defaultCarState };
      }
      state.cars[id].status = status;
    },
    setEngineStarted(
      state,
      action: PayloadAction<{
        id: number;
        velocity: number;
        distance: number;
        duration: number;
      }>,
    ) {
      const { id, velocity, distance, duration } = action.payload;
      state.cars[id] = {
        status: 'driving',
        velocity,
        distance,
        duration,
      };
    },
    resetCarState(state, action: PayloadAction<number>) {
      state.cars[action.payload] = { ...defaultCarState };
    },
    startRace(state) {
      state.isRacing = true;
      state.winner = null;
    },
    resetRace(state) {
      state.isRacing = false;
      state.winner = null;
      state.cars = {};
    },
    setRaceWinner(state, action: PayloadAction<RaceWinner>) {
      if (!state.winner) {
        state.winner = action.payload;
      }
    },
  },
});

export const {
  setCarStatus,
  setEngineStarted,
  resetCarState,
  startRace,
  resetRace,
  setRaceWinner,
} = raceSlice.actions;

export const raceReducer = raceSlice.reducer;
