export type EngineStatus =
  'stopped' | 'starting' | 'driving' | 'broken' | 'finished';

export interface CarRaceState {
  status: EngineStatus;
  duration: number; // in seconds
  velocity: number;
  distance: number;
}

export interface RaceWinner {
  id: number;
  name: string;
  time: number; // in seconds
}

export interface RaceState {
  cars: Record<number, CarRaceState>;
  isRacing: boolean;
  winner: RaceWinner | null;
}
