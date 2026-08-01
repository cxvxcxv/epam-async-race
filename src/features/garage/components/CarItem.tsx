import type { Car } from '@/shared/types';

interface Props {
  car: Car;
}

export function CarItem({ car }: Props) {
  return (
    <article>
      <h2>{car.name}</h2>

      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: car.color,
        }}
      />

      <button type="button">Select</button>

      <button type="button">Delete</button>

      <button type="button">Start</button>
    </article>
  );
}
