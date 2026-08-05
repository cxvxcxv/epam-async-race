import type { CSSProperties } from 'react';

import type { EngineStatus } from '@/features/race';

interface GetCarStyleParams {
  status: EngineStatus;
  duration: number;
  brokenPosition: string | null;
}

export function getCarStyle({
  status,
  duration,
  brokenPosition,
}: GetCarStyleParams): CSSProperties {
  switch (status) {
    case 'driving':
      return {
        left: 'calc(100% - 80px)',
        transitionProperty: 'left',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: 'linear',
      };
    case 'broken':
      return {
        left: brokenPosition ?? '0px',
        transition: 'none',
      };
    case 'finished':
      return {
        left: 'calc(100% - 80px)',
        transition: 'none',
      };
    case 'stopped':
    case 'starting':
    default:
      return {
        left: '0px',
        transition: 'left 0.3s ease-out',
      };
  }
}
