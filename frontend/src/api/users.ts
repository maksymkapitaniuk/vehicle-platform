import { User } from '../dto/User';
import type { UserType, UserDtoType } from '../dto/User';

const USERS_API_URL =
  import.meta.env.VITE_USERS_API_URL ?? 'http://localhost:3000';

export async function getUsers() {
  const usersRes = await fetch(`${USERS_API_URL}/users`);
  if (!usersRes.ok) {
    return [];
  }

  const users = await usersRes.json();
  return users.map((user: UserType) => User.parse(user));
}

export async function getUserById(id: number) {
  const userRes = await fetch(`${USERS_API_URL}/users/${id}`);
  if (!userRes.ok) {
    return null;
  }

  const user = await userRes.json();
  return User.parseAsync(user);
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

export async function deleteUser(id: number) {
  const deleteRes = await fetch(`${USERS_API_URL}/users/${id}`, {
    method: 'DELETE',
  });

  return deleteRes.ok;
}
