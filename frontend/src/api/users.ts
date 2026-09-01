import axios from 'axios';
import { User } from '../dto/User';
import type { UserType, UserDtoType } from '../dto/User';
import { processHttpError } from '../util/errors';

const USERS_API_URL =
  import.meta.env.VITE_USERS_API_URL ?? 'http://localhost:3000';

export async function getUsers() {
  try {
    const usersRes = await axios.get<UserType[]>(`${USERS_API_URL}/users`);
    return usersRes.data.map((user: UserType) => User.parse(user));
  } catch (err) {
    throw processHttpError(err, { requestTarget: 'users' });
  }
}

export async function getUserById(id: number) {
  try {
    const userRes = await axios.get(`${USERS_API_URL}/users/${id}`);
    return User.parse(userRes.data);
  } catch (err) {
    throw processHttpError(err, { requestTarget: 'user' });
  }
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
