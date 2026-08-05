import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/app/store';

import { resetAllCars, selectIsRacing, startAllCars } from '@/features/race';

import { Button } from '@/shared/ui';

import { selectCars, selectGarageCurrentPage } from '../selectors';
import { fetchCars, generateRandomCarsThunk } from '../thunks';

import { CreateCarForm } from './CreateCarForm';
import { UpdateCarForm } from './UpdateCarForm';

export function RaceControls() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectGarageCurrentPage);
  const cars = useAppSelector(selectCars);
  const isRacing = useAppSelector(selectIsRacing);

  const handleRace = () => {
    if (cars.length === 0) return;
    dispatch(startAllCars(cars));
  };

  const handleReset = () => {
    dispatch(resetAllCars(cars));
  };

  const handleGenerateCars = async () => {
    await dispatch(generateRandomCarsThunk());
    dispatch(fetchCars(currentPage));
    toast.success('Sucessfully generated!');
  };

  return (
    <section className="bg-surface/80 border-border w-full rounded-2xl border p-4 shadow-2xl backdrop-blur-md sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRace}
            disabled={isRacing || cars.length === 0}
            className="border-success text-success hover:bg-success/10 flex-1 sm:flex-none"
          >
            Race
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!isRacing}
            className="border-danger text-danger hover:bg-danger/10 flex-1 sm:flex-none"
          >
            Reset
          </Button>
        </div>

        <div className="flex max-w-3xl flex-1 flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:gap-12">
          <div className="flex-1">
            <CreateCarForm />
          </div>
          <div className="flex-1">
            <UpdateCarForm />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            onClick={handleGenerateCars}
            className="border-info text-info hover:bg-info/10 w-full whitespace-nowrap sm:w-auto"
          >
            Generate cars
          </Button>
        </div>
      </div>
    </section>
  );
}
