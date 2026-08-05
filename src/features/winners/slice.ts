import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { WinnerSortField } from '@/api/winners';

import { fetchWinners } from './thunks';
import type { WinnersState } from './types';

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortBy: 'wins',
  sortOrder: 'DESC',
  isLoading: false,
  error: null,
};

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSorting(state, action: PayloadAction<WinnerSortField>) {
      const field = action.payload;
      if (state.sortBy === field) {
        state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sortBy = field;
        state.sortOrder = 'DESC';
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWinners.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'An error occurred';
      });
  },
});

export const { setCurrentPage, setSorting } = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer;
