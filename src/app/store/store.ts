import { configureStore } from '@reduxjs/toolkit';

import { garageReducer } from '@/features/garage/slice';
import { raceReducer } from '@/features/race';
import { winnersReducer } from '@/features/winners/slice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    race: raceReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
