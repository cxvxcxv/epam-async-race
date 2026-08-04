import { useAppDispatch, useAppSelector } from '@/app/store';
import type { Car } from '@/shared/types';
import { Button } from '@/shared/ui';
import clsx from 'clsx';

import { GARAGE_PAGE_SIZE } from '@/shared/constants';

import {
  selectGarageCurrentPage,
  selectGarageTotalCount,
  selectSelectedCarId,
} from '../selectors';
import { selectCar, setCurrentPage } from '../slice';
import { deleteCar } from '../thunks';

interface Props {
  car: Car;
}

export function CarItem({ car }: Props) {
  const dispatch = useAppDispatch();

  const selectedCarId = useAppSelector(selectSelectedCarId);
  const currentPage = useAppSelector(selectGarageCurrentPage);
  const totalCount = useAppSelector(selectGarageTotalCount);

  const isSelected = selectedCarId === car.id;

  const handleDelete = async () => {
    await dispatch(deleteCar(car.id)).unwrap();

    const isLastCarOnPage = totalCount % GARAGE_PAGE_SIZE === 1;

    if (isLastCarOnPage && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <article
      className={clsx(
        'rounded-lg border p-4',
        isSelected ? 'border-primary' : 'border-border',
      )}
    >
      <h2>{car.name}</h2>

      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: car.color,
        }}
      />

      <Button
        variant="secondary"
        size="sm"
        onClick={() => dispatch(selectCar(car.id))}
      >
        Select
      </Button>

      <Button size="sm" variant="danger" onClick={handleDelete}>
        Delete
      </Button>

      <Button size="sm">A</Button>
      <Button size="sm">B</Button>
    </article>
  );
}
