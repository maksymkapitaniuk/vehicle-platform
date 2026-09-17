import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDataStore } from '../store/useDataStore';
import { USERS_API_URL } from '../util/api';
import { User, type UserType } from '../dto/User';
import { processHttpError, type AppError } from '../util/errors';
import { getAdminToken } from '../util/auth';

export function useUsers(onAuthError?: (() => void) | undefined) {
  const users = useDataStore((state) => state.users);
  const setUsers = useDataStore((state) => state.setUsers);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const token = getAdminToken();

        const usersRes = await axios.get<UserType[]>(`${USERS_API_URL}/users`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const usersData = usersRes.data.map((user: UserType) =>
          User.parse(user),
        );

        setUsers(usersData);
      } catch (err) {
        setError(
          processHttpError(err, { requestTarget: 'users', onAuthError }),
        );
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [setUsers, onAuthError]);

  return { users, loading, error };
}
