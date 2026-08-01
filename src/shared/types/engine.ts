export type EngineStatus = 'started' | 'drive' | 'stopped';

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}
