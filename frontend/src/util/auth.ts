const ADMIN_TOKEN_STORAGE_KEY = 'admin_token';

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}
