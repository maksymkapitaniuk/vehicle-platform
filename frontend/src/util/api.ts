const environment = import.meta.env.VITE_ENV ?? 'LOCAL';

export const USERS_API_URL =
  environment === 'LOCAL'
    ? (import.meta.env.VITE_USERS_API_URL ?? 'http://localhost:3000')
    : '/api/users';

export const VEHICLES_API_URL =
  environment === 'LOCAL'
    ? (import.meta.env.VITE_VEHICLES_API_URL ?? 'http://localhost:3001')
    : '/api/vehicles';
