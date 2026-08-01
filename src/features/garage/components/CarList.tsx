import { useAppSelector } from '@/app/store';
import { selectCars, selectGarageLoading } from '../selectors';

import { CarItem } from './CarItem';

export function CarList() {
  const cars = useAppSelector(selectCars);
  const isLoading = useAppSelector(selectGarageLoading);

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (!cars.length) {
    return <p>No Cars</p>;
  }

  return (
    <div>
      {cars.map(car => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}
