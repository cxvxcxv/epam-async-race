import { useAppSelector } from '@/app/store';
import { selectCars, selectIsFetching } from '../selectors';

import { CarItem } from './CarItem';

export function CarList() {
  const cars = useAppSelector(selectCars);
  const isLoading = useAppSelector(selectIsFetching);

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (!cars.length) {
    return <p>No Cars</p>;
  }

  return (
    <ul>
      {cars.map(car => (
        <li key={car.id}>
          <CarItem car={car} />
        </li>
      ))}
    </ul>
  );
}
