import type { WinnerSortField, WinnerSortOrder } from '@/api/winners';

import type { Car, Winner } from '@/shared/types';

export interface WinnerWithCar extends Winner {
  car?: Car;
}

export interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortBy: WinnerSortField;
  sortOrder: WinnerSortOrder;
  isLoading: boolean;
  error: string | null;
}
