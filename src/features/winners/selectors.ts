import type { RootState } from '@/app/store';

export const selectWinners = (state: RootState) => state.winners.winners;
export const selectWinnersTotalCount = (state: RootState) =>
  state.winners.totalCount;
export const selectWinnersCurrentPage = (state: RootState) =>
  state.winners.currentPage;
export const selectWinnersSortBy = (state: RootState) => state.winners.sortBy;
export const selectWinnersSortOrder = (state: RootState) =>
  state.winners.sortOrder;
export const selectWinnersIsLoading = (state: RootState) =>
  state.winners.isLoading;
