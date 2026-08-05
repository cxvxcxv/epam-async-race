import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className={`text-primary mt-4 flex items-center justify-end gap-2 ${className}`}
    >
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className="p-1"
      >
        <ChevronLeft />
      </Button>

      <span className="font-semibold tracking-wider">Page #{currentPage}</span>

      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className="p-1"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
