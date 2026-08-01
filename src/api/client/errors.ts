export class ApiError extends Error {
  public readonly status: number;

  public readonly statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super(message ?? `Request failed: ${status} ${statusText}`);

    this.status = status;
    this.statusText = statusText;
    this.name = 'ApiError';

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
