import { ENDPOINTS } from '@/shared/constants';
import type { Winner } from '@/shared/types';

import { get, post, put, remove } from '../client';
import { getTotalCount } from '../helpers';

import type {
  CreateWinnerDto,
  GetWinnersParams,
  GetWinnersResponse,
  UpdateWinnerDto,
} from './types';

async function getWinners({
  page,
  limit,
  sort,
  order,
}: GetWinnersParams): Promise<GetWinnersResponse> {
  const response = await get<Winner[]>(ENDPOINTS.WINNERS, {
    query: { _page: page, _limit: limit, _sort: sort, _order: order },
  });

  return {
    winners: response.data,
    totalCount: getTotalCount(response.headers),
  };
}

async function getWinner(id: number): Promise<Winner> {
  const response = await get<Winner>(`${ENDPOINTS.WINNERS}/${id}`);

  return response.data;
}

async function createWinner(winner: CreateWinnerDto): Promise<Winner> {
  const response = await post<Winner>(ENDPOINTS.WINNERS, winner);

  return response.data;
}

async function updateWinner(
  id: number,
  winner: UpdateWinnerDto,
): Promise<Winner> {
  const response = await put<Winner>(`${ENDPOINTS.WINNERS}/${id}`, winner);

  return response.data;
}

async function deleteWinner(id: number): Promise<void> {
  await remove(`${ENDPOINTS.WINNERS}/${id}`);
}

export const winnersApi = {
  getWinners,
  getWinner,
  createWinner,
  updateWinner,
  deleteWinner,
};
