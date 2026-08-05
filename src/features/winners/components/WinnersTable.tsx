import { ArrowDown, ArrowUp } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/app/store';

import { CarIcon } from '@/shared/ui';

import type { WinnerSortField } from '@/api/winners';
import {
  selectWinners,
  selectWinnersSortBy,
  selectWinnersSortOrder,
} from '../selectors';
import { setSorting } from '../slice';
import { fetchWinners } from '../thunks';

export function WinnersTable() {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const sortBy = useAppSelector(selectWinnersSortBy);
  const sortOrder = useAppSelector(selectWinnersSortOrder);

  const handleSort = (field: WinnerSortField) => {
    dispatch(setSorting(field));
    dispatch(fetchWinners());
  };

  const renderSortIndicator = (field: WinnerSortField) => {
    if (sortBy !== field) return null;
    return sortOrder === 'ASC' ? (
      <ArrowUp className="inline h-4 w-4" />
    ) : (
      <ArrowDown className="inline h-4 w-4" />
    );
  };

  return (
    <div className="border-border bg-surface/60 w-full overflow-hidden rounded-xl border backdrop-blur-md">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-125 text-left font-sans text-sm">
          <thead className="border-border font-orbitron text-primary border-b text-xs tracking-wider">
            <tr>
              <th scope="col" className="px-3 py-3 sm:px-6 sm:py-4">
                №
              </th>
              <th scope="col" className="px-3 py-3 sm:px-6 sm:py-4">
                Car
              </th>
              <th scope="col" className="px-3 py-3 sm:px-6 sm:py-4">
                Name
              </th>
              <th
                scope="col"
                className="text-success hover:text-success/80 cursor-pointer px-3 py-3 transition-colors sm:px-6 sm:py-4"
                onClick={() => handleSort('wins')}
              >
                Wins {renderSortIndicator('wins')}
              </th>
              <th
                scope="col"
                className="text-warning hover:text-warning/80 cursor-pointer px-3 py-3 transition-colors sm:px-6 sm:py-4"
                onClick={() => handleSort('time')}
              >
                Best Time (s) {renderSortIndicator('time')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/50 text-foreground divide-y">
            {winners.map(winner => (
              <tr
                key={winner.id}
                className="hover:bg-surface-hover/50 transition-colors"
              >
                <td className="text-muted px-3 py-3 font-semibold sm:px-6">
                  {winner.id}
                </td>
                <td className="px-3 py-3 sm:px-6">
                  <CarIcon
                    color={winner.car?.color ?? '#ffffff'}
                    size={36}
                    className="sm:h-10 sm:w-10"
                  />
                </td>
                <td className="text-foreground max-w-30 truncate px-3 py-3 font-medium tracking-wide sm:max-w-none sm:px-6">
                  {winner.car?.name ?? 'Unknown Car'}
                </td>
                <td className="text-success px-3 py-3 font-semibold sm:px-6">
                  {winner.wins}
                </td>
                <td className="text-warning px-3 py-3 font-semibold sm:px-6">
                  {winner.time.toFixed(2)}
                </td>
              </tr>
            ))}
            {winners.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-muted-foreground py-8 text-center"
                >
                  No winners registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
