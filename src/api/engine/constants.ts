export const ENGINE_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  DRIVE: 'drive',
} as const;

export type EngineStatus = (typeof ENGINE_STATUS)[keyof typeof ENGINE_STATUS];
