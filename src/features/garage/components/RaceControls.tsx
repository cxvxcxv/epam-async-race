import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button } from '@/shared/ui';
import { selectGarageCurrentPage } from '../selectors';
import { fetchCars, generateRandomCarsThunk } from '../thunks';
import { CreateCarForm } from './CreateCarForm';
import { UpdateCarForm } from './UpdateCarForm';

export function RaceControls() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectGarageCurrentPage);

  const handleGenerateCars = async () => {
    await dispatch(generateRandomCarsThunk());
    dispatch(fetchCars(currentPage));
  };

  return (
    <header className="flex flex-col items-center justify-between lg:flex-row">
      <div className="flex gap-2">
        <Button>Race</Button>
        <Button>Reset</Button>
      </div>
      <CreateCarForm />
      <UpdateCarForm />
      <Button onClick={handleGenerateCars}>Generate cars</Button>
    </header>
  );
}
