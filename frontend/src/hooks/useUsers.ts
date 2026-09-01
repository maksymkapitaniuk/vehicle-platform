import { useState, useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';
import { getUsers } from '../api/users';
import { processUnknownError } from '../util/errors';
import type { AppError } from '../util/errors';

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
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        setError(processUnknownError(err));
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [setUsers]);

  return { users, loading, error };
}
