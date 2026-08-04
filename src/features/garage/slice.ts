import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateCarDto, UpdateCarDto } from '@/api/cars';
import {
  createCar,
  deleteCar,
  fetchCars,
  generateRandomCarsThunk,
  updateCar,
} from './thunks';

import type { GarageState } from './types';

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,

  selectedCarId: null,

  createDraft: {
    name: '',
    color: '#000000',
  },
  updateDraft: {
    name: '',
    color: '',
  },

  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    selectCar(state, action: PayloadAction<number | null>) {
      state.selectedCarId = action.payload;

      if (action.payload === null) {
        state.updateDraft = {
          name: '',
          color: '',
        };

        return;
      }

      const selectedCar = state.cars.find(car => car.id === action.payload);

      if (!selectedCar) {
        return;
      }

      state.updateDraft = {
        name: selectedCar.name,
        color: selectedCar.color,
      };
    },
    updateCreateDraft(state, action: PayloadAction<Partial<CreateCarDto>>) {
      state.createDraft = {
        ...state.createDraft,
        ...action.payload,
      };
    },
    resetCreateDraft(state) {
      state.createDraft = { name: '', color: '#000000' };
    },
    updateUpdateDraft(state, action: PayloadAction<Partial<UpdateCarDto>>) {
      state.updateDraft = {
        ...state.updateDraft,
        ...action.payload,
      };
    },
    resetUpdateDraft(state) {
      state.updateDraft = {
        name: '',
        color: '',
      };
    },
  },

  extraReducers: builder => {
    builder

      // fetch cars
      .addCase(fetchCars.pending, state => {
        state.isFetching = true;
        state.error = null;
      })

      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isFetching = false;
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // create car
      .addCase(createCar.pending, state => {
        state.isCreating = true;
        state.error = null;
      })

      .addCase(createCar.fulfilled, (state, action) => {
        state.isCreating = false;

        state.cars.push(action.payload);
        state.totalCount += 1;
      })

      .addCase(createCar.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // update car
      .addCase(updateCar.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })

      .addCase(updateCar.fulfilled, (state, action) => {
        state.isUpdating = false;

        const index = state.cars.findIndex(car => car.id === action.payload.id);

        if (index !== -1) {
          state.cars[index] = action.payload;
        }

        if (state.selectedCarId === action.payload.id) {
          state.updateDraft = {
            name: action.payload.name,
            color: action.payload.color,
          };
        }
      })

      .addCase(updateCar.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // delete car
      .addCase(deleteCar.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })

      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isDeleting = false;

        state.cars = state.cars.filter(car => car.id !== action.payload);

        state.totalCount = Math.max(0, state.totalCount - 1);
      })

      .addCase(deleteCar.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error.message ?? 'Unknown error';
      })

      // generate random cars
      .addCase(generateRandomCarsThunk.pending, state => {
        state.isCreating = true;
        state.error = null;
      })

      .addCase(generateRandomCarsThunk.fulfilled, (state, action) => {
        state.isCreating = false;

        if (action.payload.failedCount > 0) {
          state.error = `${action.payload.failedCount} car(s) failed to generate`;
        }
      })

      .addCase(generateRandomCarsThunk.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const {
  setCurrentPage,
  selectCar,
  updateCreateDraft,
  resetCreateDraft,
  updateUpdateDraft,
  resetUpdateDraft,
} = garageSlice.actions;

export const garageReducer = garageSlice.reducer;
