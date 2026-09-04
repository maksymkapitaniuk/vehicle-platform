import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDataStore } from '../store/useDataStore';
import { USERS_API_URL } from '../util/api';
import { User, type UserType } from '../dto/User';
import { processHttpError, type AppError } from '../util/errors';

export function useUsers() {
  const users = useDataStore((state) => state.users);
  const setUsers = useDataStore((state) => state.setUsers);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const usersRes = await axios.get<UserType[]>(`${USERS_API_URL}/users`);
        const usersData = usersRes.data.map((user: UserType) =>
          User.parse(user),
        );

        setUsers(usersData);
      } catch (err) {
        setError(processHttpError(err, { requestTarget: 'users' }));
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [setUsers]);

  return { users, loading, error };
}
