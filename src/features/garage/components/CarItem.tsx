import { useAppSelector } from '@/app/store';
import type { Car } from '@/shared/types';
import { CarIcon } from '@/shared/ui';
import clsx from 'clsx';

import { selectSelectedCarId } from '../selectors';
import { CarControls } from './CarControls';
import { FinishLine } from './FinishLine';
import { StartLine } from './StartLine';

interface Props {
  car: Car;
}

export function CarItem({ car }: Props) {
  const selectedCarId = useAppSelector(selectSelectedCarId);
  const isSelected = selectedCarId === car.id;

  return (
    <div
      className={clsx(
        'border-border relative flex h-24 w-full items-center border-b transition-colors',
        isSelected && 'bg-primary/5',
      )}
    >
      <CarControls car={car} />

      <StartLine />

      <div className="relative flex h-full flex-1 items-center overflow-hidden px-4">
        <span className="text-foreground/7 pointer-events-none absolute left-28 text-4xl font-extrabold tracking-widest select-none">
          {car.name}
        </span>

        <CarIcon color={car.color} className="h-10 w-20" />
      </div>

      <FinishLine />
    </div>
  );
}
