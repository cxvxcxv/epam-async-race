export interface Car {
  id: number;
  name: string;
  color: string;
}

export type CreateCarDto = Omit<Car, 'id'>;
export type UpdateCarDto = Partial<Car>;
