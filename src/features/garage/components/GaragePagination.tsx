import { getTotalPages } from '@/api/helpers';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { GARAGE_PAGE_SIZE } from '@/shared/constants';

import { Button } from '@/shared/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { selectGarageCurrentPage, selectGarageTotalCount } from '../selectors';
import { setCurrentPage } from '../slice';

export function GaragePagination() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectGarageCurrentPage);
  const totalCount = useAppSelector(selectGarageTotalCount);

  const totalPages = getTotalPages(totalCount, GARAGE_PAGE_SIZE);

  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <nav className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={isFirstPage}
        aria-label="Previous page"
        className="text-primary p-1"
      >
        <ChevronLeft />
      </Button>

      <span>
        Page {currentPage} / {totalPages}
      </span>

      <Button
        variant="ghost"
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Next page"
        className="text-primary p-1"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
