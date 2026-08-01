import type { Winner } from '@/shared/types';

export type WinnerSortField = 'id' | 'wins' | 'time';
export type WinnerSortOrder = 'ASC' | 'DESC';

export interface GetWinnersParams {
  page: number;
  limit: number;
  sort?: WinnerSortField;
  order?: WinnerSortOrder;
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export type CreateWinnerDto = Omit<Winner, 'id'>;
export type UpdateWinnerDto = Partial<Winner>;
