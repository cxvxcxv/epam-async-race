import { MAX_CAR_NAME_LENGTH } from '@/shared/constants';

export function validateName(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return 'Name is required';
  }

  if (trimmed.length > MAX_CAR_NAME_LENGTH) {
    return `Maximum ${MAX_CAR_NAME_LENGTH} characters`;
  }

  return null;
}
