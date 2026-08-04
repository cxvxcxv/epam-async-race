import type { CreateCarDto } from '@/api/cars/types';

const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'BMW',
  'Audi',
  'Toyota',
  'Honda',
  'Chevrolet',
  'Mazda',
  'Kia',
  'Volvo',
] as const;

const CAR_MODELS = [
  'Model S',
  'Mustang',
  'M3',
  'A4',
  'Corolla',
  'Civic',
  'Camaro',
  'MX-5',
  'Sportage',
  'XC90',
] as const;

const HEX_DIGITS = '0123456789ABCDEF';
const HEX_COLOR_LENGTH = 6;

function getRandomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomColor(): string {
  let hex = '';
  for (let i = 0; i < HEX_COLOR_LENGTH; i += 1) {
    hex += HEX_DIGITS[Math.floor(Math.random() * HEX_DIGITS.length)];
  }
  return `#${hex}`;
}

export function generateRandomCar(): CreateCarDto {
  return {
    name: `${getRandomItem(CAR_BRANDS)} ${getRandomItem(CAR_MODELS)}`,
    color: getRandomColor(),
  };
}

export function generateRandomCars(count: number): CreateCarDto[] {
  return Array.from({ length: count }, () => generateRandomCar());
}
