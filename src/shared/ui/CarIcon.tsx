interface Props {
  color: string;
  className?: string;
}

export function CarIcon({ color, className }: Props) {
  return (
    <svg
      className={className}
      width="90"
      height="45"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
        M20 35
        L35 20
        H75
        L95 35
        H105
        V45
        H15
        V35
        Z
        "
        fill={color}
      />

      <circle cx="35" cy="45" r="8" fill="#020617" />

      <circle cx="85" cy="45" r="8" fill="#020617" />

      <rect x="45" y="25" width="25" height="10" rx="2" fill="#e2e8f0" />
    </svg>
  );
}
