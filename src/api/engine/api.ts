import { patch } from '@/api/client';

import { ENDPOINTS } from '@/shared/constants';

import { ENGINE_STATUS } from './constants';
import type { DriveResponse, EngineResponse } from './types';

async function startEngine(id: number): Promise<EngineResponse> {
  const response = await patch<EngineResponse>(ENDPOINTS.ENGINE, undefined, {
    query: {
      id,
      status: ENGINE_STATUS.STARTED,
    },
  });

  return response.data;
}

async function stopEngine(id: number): Promise<EngineResponse> {
  const response = await patch<EngineResponse>(ENDPOINTS.ENGINE, undefined, {
    query: {
      id,
      status: ENGINE_STATUS.STOPPED,
    },
  });

  return response.data;
}

async function drive(id: number): Promise<DriveResponse> {
  const response = await patch<DriveResponse>(ENDPOINTS.ENGINE, undefined, {
    query: {
      id,
      status: ENGINE_STATUS.DRIVE,
    },
  });

  return response.data;
}

export const engineApi = {
  startEngine,
  stopEngine,
  drive,
};
