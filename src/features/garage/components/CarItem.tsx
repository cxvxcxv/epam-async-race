import clsx from 'clsx';
import { useLayoutEffect, useRef } from 'react';

import { useAppSelector } from '@/app/store';

import { selectCarRaceState } from '@/features/race/selectors';

import type { Car } from '@/shared/types';
import { CarIcon } from '@/shared/ui';

import { getCarStyle } from '../lib/getCarStyle';
import { selectSelectedCarId } from '../selectors';

import { CarControls } from './CarControls';
import { FinishLine } from './FinishLine';
import { StartLine } from './StartLine';

interface Props {
  car: Car;
}

export function CarItem({ car }: Props) {
  const selectedCarId = useAppSelector(selectSelectedCarId);
  const raceState = useAppSelector(selectCarRaceState(car.id));
  const isSelected = selectedCarId === car.id;

  const carRef = useRef<HTMLDivElement>(null);
  const brokenPositionRef = useRef<string | null>(null);

  const { status, duration } = raceState;

  useLayoutEffect(() => {
    if (status === 'broken' && carRef.current && !brokenPositionRef.current) {
      const computedStyle = window.getComputedStyle(carRef.current);
      brokenPositionRef.current = computedStyle.left;
    }

    if (status === 'stopped') {
      brokenPositionRef.current = null;
    }
  }, [status]);

  if (status === 'broken' && carRef.current && !brokenPositionRef.current) {
    const computedStyle = window.getComputedStyle(carRef.current);
    if (computedStyle.left !== 'auto') {
      brokenPositionRef.current = computedStyle.left;
    }
  }

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

        <div
          ref={carRef}
          style={getCarStyle({
            status,
            duration,
            brokenPosition: brokenPositionRef.current,
          })}
          className="absolute flex items-center justify-start"
        >
          <CarIcon color={car.color} className="h-10 w-20" />
        </div>
      </div>

      <FinishLine />
    </div>
  );
}
