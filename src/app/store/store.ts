import { garageReducer } from '@/features/garage';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
