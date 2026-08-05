import { useAppSelector } from '@/app/store';
import type { Car } from '@/shared/types';
import { CarIcon } from '@/shared/ui';
import clsx from 'clsx';

import { selectSelectedCarId } from '../selectors';
import { CarControls } from './CarControls';

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

      <div className="border-primary text-primary relative flex h-full items-center justify-center border-r-2 border-dashed px-1 pl-2 text-xs font-bold tracking-widest uppercase [writing-mode:vertical-lr]">
        Start
      </div>

      <div className="relative flex h-full flex-1 items-center overflow-hidden px-4">
        <span className="font-orbitron pointer-events-none absolute left-28 text-4xl font-extrabold tracking-widest text-slate-400/10 select-none">
          {car.name}
        </span>

        <CarIcon color={car.color} className="h-10 w-20" />
      </div>

      <div className="border-success text-success relative z-10 flex h-full items-center justify-center border-l-2 border-dashed px-1 text-xs font-bold tracking-widest [writing-mode:vertical-lr]">
        Finish
      </div>
    </div>
  );
}
