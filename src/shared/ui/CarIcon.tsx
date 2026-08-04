import clsx from 'clsx';
import type { SVGProps } from 'react';

interface CarIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number | string;
}

export function CarIcon({
  color = '#000000',
  size = 48,
  className = '',
  ...props
}: CarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('drop-shadow-[0_0_6px_currentColor]', className)}
      style={{ color }}
      {...props}
    >
      <rect
        x="5"
        y="5"
        width="90"
        height="40"
        rx="14"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
      />

      <path
        d="M 62 3.5 L 62 0 M 62 46.5 L 62 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M 60 11 C 67 11, 70 17, 70 25 C 70 33, 67 39, 60 39 C 64 33, 64 17, 60 11 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M 32 11 C 25 11, 22 17, 22 25 C 22 33, 25 39, 32 39 C 28 33, 28 17, 32 11 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />

      <line
        x1="34"
        y1="11"
        x2="58"
        y2="11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="39"
        x2="58"
        y2="39"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
