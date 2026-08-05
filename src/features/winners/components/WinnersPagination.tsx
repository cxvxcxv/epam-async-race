import { useAppDispatch, useAppSelector } from '@/app/store';

import { getTotalPages } from '@/api/helpers';

import { WINNERS_PAGE_SIZE } from '@/shared/constants';
import { Pagination } from '@/shared/ui';

import {
  selectWinnersCurrentPage,
  selectWinnersTotalCount,
} from '../selectors';
import { setCurrentPage } from '../slice';
import { fetchWinners } from '../thunks';

export function WinnersPagination() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectWinnersCurrentPage);
  const totalCount = useAppSelector(selectWinnersTotalCount);

  const totalPages = getTotalPages(totalCount, WINNERS_PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchWinners());
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
