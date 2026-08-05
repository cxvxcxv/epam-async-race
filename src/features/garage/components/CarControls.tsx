import { useAppDispatch, useAppSelector } from '@/app/store';
import { GARAGE_PAGE_SIZE } from '@/shared/constants';
import type { Car } from '@/shared/types';
import { Button } from '@/shared/ui';
import { selectGarageCurrentPage, selectGarageTotalCount } from '../selectors';
import { selectCar, setCurrentPage } from '../slice';
import { deleteCar } from '../thunks';

interface Props {
  car: Car;
}

export function CarControls({ car }: Props) {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectGarageCurrentPage);
  const totalCount = useAppSelector(selectGarageTotalCount);

  const handleDelete = async () => {
    await dispatch(deleteCar(car.id)).unwrap();

    const isLastCarOnPage = totalCount % GARAGE_PAGE_SIZE === 1;

    if (isLastCarOnPage && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className="inline-flex shrink-0 items-center gap-2 rounded-xl p-2 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-1.5">
        <Button
          variant="outline"
          onClick={() => dispatch(selectCar(car.id))}
          className="border-info/60 text-info hover:bg-info/10 h-7 px-2.5 text-xs font-bold tracking-wider"
        >
          Select
        </Button>

        <Button
          variant="outline"
          onClick={handleDelete}
          className="border-danger/60 text-danger hover:bg-danger/10 h-7 px-2.5 text-xs font-bold tracking-wider"
        >
          Delete
        </Button>
      </div>

      <div className="flex flex-col gap-1.5">
        <Button
          variant="outline"
          className="border-success/60 text-success hover:bg-success/10 h-7 w-7 p-0 text-xs font-extrabold shadow-[0_0_8px_rgba(34,197,94,0.2)]"
        >
          A
        </Button>
        <Button
          variant="outline"
          className="border-warning/60 text-warning hover:bg-warning/10 h-7 w-7 p-0 text-xs font-extrabold"
        >
          B
        </Button>
      </div>
    </div>
  );
}
