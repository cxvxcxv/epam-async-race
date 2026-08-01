export function getTotalCount(headers: Headers): number {
  return Number(headers.get('X-Total-Count') ?? 0);
}
