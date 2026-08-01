import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createCar, deleteCar, fetchCars, updateCar } from './thunks';

import type { GarageState } from './types';

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      // fetch cars
      .addCase(fetchCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // create car
      .addCase(createCar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cars.push(action.payload);
        state.totalCount += 1;
      })

      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // update car
      .addCase(updateCar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;

        const index = state.cars.findIndex(car => car.id === action.payload.id);

        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })

      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // delete car
      .addCase(deleteCar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cars = state.cars.filter(car => car.id !== action.payload);

        state.totalCount = Math.max(0, state.totalCount - 1);
      })

      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { setCurrentPage } = garageSlice.actions;

export const garageReducer = garageSlice.reducer;
