export function getTotalCount(headers: Headers): number {
  return Number(headers.get('X-Total-Count') ?? 0);
}

export function getTotalPages(totalCount: number, pageSize: number): number {
  return Math.ceil(totalCount / pageSize);
}

export function getValidPage(
  currentPage: number,
  totalCount: number,
  pageSize: number,
): number {
  const totalPages = getTotalPages(totalCount, pageSize);

  return Math.max(1, Math.min(currentPage, totalPages));
}
