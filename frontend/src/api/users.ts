import type { UserDtoType } from '../dto/User';

const USERS_API_URL =
  import.meta.env.VITE_USERS_API_URL ?? 'http://localhost:3000';

export async function getUsers() {
  const usersRes = await fetch(`${USERS_API_URL}/users`);
  if (!usersRes.ok) {
    return [];
  }

  return usersRes.json();
}

export async function createUser(dto: UserDtoType) {
  const createRes = await fetch(`${USERS_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  return createRes.ok;
}

export async function updateUser(id: number, dto: Partial<UserDtoType>) {
  const updateRes = await fetch(`${USERS_API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  return updateRes.ok;
}
